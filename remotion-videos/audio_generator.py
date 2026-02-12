#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
通用视频音频生成工具
使用Qwen3-TTS模型生成高质量场景解说音频

🎯 功能特点：
• 支持两种模式：文本模式和字幕模式
• 文本模式：直接从配置的文本生成音频
• 字幕模式：从字幕JSON文件读取文本生成音频，并自动更新时间戳
• 音频时长控制：避免音频过长，自动裁剪超过30秒的音频
• 语音质量优化：降低温度参数，提高语音稳定性
• 严格采样策略：减少语音乱码和重复问题
• 音频后处理：音量标准化、低通滤波提高清晰度
• 重试机制：自动重试失败的任务，提高成功率
• 智能跳过：自动检测已存在的音频文件

语音角色：统一使用温柔女生角色，确保语音风格一致
音频时长：智能控制，避免过长音频，确保与视频同步
模型配置：使用本地下载的Qwen3-TTS模型，优化内存使用
"""

import os
import sys
import json
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel
import librosa
import numpy as np
from tqdm import tqdm

# Qwen3-TTS模型实例（全局单例）
_qwen_model = None


class AudioGeneratorConfig:
    """音频生成配置类"""
    
    def __init__(
        self,
        video_name: str,
        output_dir: str,
        model_path: str = "./Qwen3-TTS-12Hz-1.7B-Base",
        reference_audio: str = "./borfy.mp3",
        reference_text: str = "5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。",
        mode: str = "text"  # "text" 或 "caption"
    ):
        """
        初始化配置
        
        Args:
            video_name: 视频名称
            output_dir: 输出目录
            model_path: TTS模型路径
            reference_audio: 参考音频路径
            reference_text: 参考文本
            mode: 生成模式，"text"（文本模式）或 "caption"（字幕模式）
        """
        self.video_name = video_name
        self.output_dir = output_dir
        self.model_path = model_path
        self.reference_audio = reference_audio
        self.reference_text = reference_text
        self.mode = mode


class AudioGenerator:
    """通用音频生成器"""
    
    def __init__(self, config: AudioGeneratorConfig):
        """初始化音频生成器"""
        self.config = config
        self.model = None
    
    def get_model(self) -> Optional[Qwen3TTSModel]:
        """获取或初始化Qwen3-TTS模型"""
        global _qwen_model
        
        if _qwen_model is None:
            try:
                print("🔧 加载Qwen3-TTS模型...")
                
                model_kwargs = {
                    "pretrained_model_name_or_path": self.config.model_path,
                    "device_map": "auto",
                    "torch_dtype": torch.bfloat16,
                    "low_cpu_mem_usage": True,
                }
                
                _qwen_model = Qwen3TTSModel.from_pretrained(**model_kwargs)
                print("✅ Qwen3-TTS模型加载完成")
                
            except Exception as e:
                print(f"❌ Qwen3-TTS模型加载失败: {e}")
                print("💡 建议检查：")
                print(f"   1. 模型路径是否正确（{self.config.model_path}）")
                print("   2. 网络连接是否正常")
                print("   3. 磁盘空间是否充足")
                return None
        
        return _qwen_model
    
    def load_caption_text(self, caption_file: str) -> Optional[str]:
        """从字幕JSON文件中读取并合并文本"""
        try:
            with open(caption_file, 'r', encoding='utf-8') as f:
                captions = json.load(f)
            
            # 合并所有字幕文本，用逗号分隔
            text_parts = [caption['text'] for caption in captions]
            full_text = "，".join(text_parts)
            
            return full_text
        except Exception as e:
            print(f"❌ 读取字幕文件失败 {caption_file}: {e}")
            return None
    
    def update_caption_timestamps(
        self, 
        caption_file: str, 
        audio_duration_ms: int
    ) -> bool:
        """根据音频时长更新字幕时间戳"""
        try:
            # 读取字幕文件
            with open(caption_file, 'r', encoding='utf-8') as f:
                captions = json.load(f)
            
            if not captions:
                print(f"⚠️  字幕文件为空: {caption_file}")
                return False
            
            # 获取原始字幕的总时长（兼容不同的字段名）
            last_caption = captions[-1]
            if 'endMs' in last_caption:
                original_duration_ms = last_caption['endMs']
                time_fields = ['startMs', 'endMs', 'timestampMs']
            elif 'end' in last_caption:
                original_duration_ms = last_caption['end']
                time_fields = ['start', 'end']
            else:
                print(f"⚠️  无法识别字幕时间字段格式")
                return False
            
            # 如果音频时长与原始时长相差不大（±10%），则不更新
            duration_diff_ratio = abs(audio_duration_ms - original_duration_ms) / original_duration_ms
            if duration_diff_ratio < 0.1:
                print(f"   字幕时长与音频时长接近，无需更新 (差异: {duration_diff_ratio*100:.1f}%)")
                return True
            
            # 计算时间缩放比例
            scale_ratio = audio_duration_ms / original_duration_ms
            print(f"   原始时长: {original_duration_ms}ms, 音频时长: {audio_duration_ms}ms, 缩放比例: {scale_ratio:.2f}")
            
            # 更新所有字幕的时间戳
            for caption in captions:
                for field in time_fields:
                    if field in caption:
                        caption[field] = int(caption[field] * scale_ratio)
            
            # 保存更新后的字幕文件
            with open(caption_file, 'w', encoding='utf-8') as f:
                json.dump(captions, f, ensure_ascii=False, indent=2)
            
            print(f"✓ 字幕时间戳已更新: {caption_file}")
            return True
            
        except Exception as e:
            print(f"❌ 更新字幕时间戳失败 {caption_file}: {e}")
            return False
    
    def generate_tts_audio(
        self, 
        text: str, 
        output_path: str, 
        max_retries: int = 3
    ) -> Tuple[bool, int]:
        """
        使用Qwen3-TTS生成音频
        
        Returns:
            (success, audio_duration_ms): 成功标志和音频时长（毫秒）
        """
        for attempt in range(max_retries):
            model = self.get_model()
            if model is None:
                return False, 0
            
            print(f"🔄 尝试生成语音 (第{attempt + 1}次)...")
            
            try:
                wavs, sr = model.generate_voice_clone(
                    ref_audio=self.config.reference_audio,
                    ref_text=self.config.reference_text,
                    text=text,
                    language="chinese",
                    max_new_tokens=512,
                    do_sample=True,
                    top_k=10,
                    top_p=0.7,
                    temperature=0.3,
                    repetition_penalty=1.5,
                    subtalker_dosample=True,
                    subtalker_top_k=10,
                    subtalker_top_p=0.7,
                    subtalker_temperature=0.3,
                )
                
                # 保存音频
                sf.write(output_path, wavs[0], sr)
                
                # 音频后处理
                audio_duration_seconds = 0
                try:
                    audio, sr_loaded = librosa.load(output_path, sr=None)
                    
                    # 检查音频时长
                    audio_duration_seconds = len(audio) / sr_loaded
                    print(f"📊 音频时长: {audio_duration_seconds:.2f}秒")
                    
                    # 如果音频过长，进行裁剪（最大30秒）
                    if audio_duration_seconds > 30:
                        print("⚠️  音频过长，进行裁剪...")
                        max_samples = int(30 * sr_loaded)
                        audio = audio[:max_samples]
                        audio_duration_seconds = len(audio) / sr_loaded
                        print(f"✓ 裁剪后时长: {audio_duration_seconds:.2f}秒")
                    
                    # 音量标准化到-3dB
                    audio_normalized = librosa.util.normalize(audio) * 0.7
                    
                    # 添加轻微的低通滤波，提高语音清晰度
                    audio_filtered = librosa.effects.preemphasis(audio_normalized, coef=0.97)
                    
                    sf.write(output_path, audio_filtered, sr_loaded)
                    print(f"✓ 音频后处理完成: {output_path}")
                    
                    # 检查音频质量
                    if audio_duration_seconds < 1.0:
                        print("⚠️  音频过短，可能生成失败")
                        continue
                        
                except Exception as e:
                    print(f"⚠️  音频后处理失败，但原始音频已保存: {e}")
                
                print(f"✓ 生成音频: {output_path}")
                return True, int(audio_duration_seconds * 1000)
                
            except Exception as e:
                print(f"❌ 第{attempt + 1}次生成失败: {e}")
                if attempt < max_retries - 1:
                    print("🔄 等待2秒后重试...")
                    import time
                    time.sleep(2)
        
        return False, 0
    
    def get_audio_duration_ms(self, audio_path: str) -> Optional[int]:
        """获取音频文件的时长（毫秒）"""
        try:
            audio, sr = librosa.load(audio_path, sr=None)
            duration_seconds = len(audio) / sr
            duration_ms = int(duration_seconds * 1000)
            return duration_ms
        except Exception as e:
            print(f"❌ 读取音频时长失败 {audio_path}: {e}")
            return None
    
    def generate_audio_with_captions(
        self,
        text: str,
        audio_output_path: str,
        caption_output_path: str,
        reference_audio: Optional[str] = None,
        speed: float = 1.0
    ) -> bool:
        """
        生成音频和字幕文件（兼容旧接口）
        
        Args:
            text: 要转换的文本
            audio_output_path: 音频输出路径
            caption_output_path: 字幕输出路径
            reference_audio: 参考音频（可选）
            speed: 语速（暂未实现）
        
        Returns:
            是否成功
        """
        # 如果提供了参考音频，更新配置
        if reference_audio:
            self.config.reference_audio = reference_audio
        
        # 生成音频
        success, audio_duration_ms = self.generate_tts_audio(text, audio_output_path)
        if not success:
            return False
        
        # 生成字幕文件（简单的单句字幕）
        try:
            captions = [{
                "text": text,
                "startMs": 0,
                "endMs": audio_duration_ms,
                "timestampMs": 0
            }]
            
            with open(caption_output_path, 'w', encoding='utf-8') as f:
                json.dump(captions, f, ensure_ascii=False, indent=2)
            
            print(f"✓ 字幕文件生成: {caption_output_path}")
            return True
            
        except Exception as e:
            print(f"❌ 字幕文件生成失败: {e}")
            return False
    
    def generate_from_config(
        self, 
        scenes: Dict[str, Dict[str, str]]
    ) -> Tuple[int, int, int]:
        """
        根据场景配置生成音频
        
        Args:
            scenes: 场景配置字典，格式：
                {
                    "scene1": {
                        "name": "场景名称",
                        "text": "文本内容",  # 文本模式
                        "caption_file": "字幕文件路径",  # 字幕模式
                        "output_file": "输出文件路径"
                    }
                }
        
        Returns:
            (success_count, skipped_count, failed_count): 成功、跳过、失败的数量
        """
        # 确保输出目录存在
        Path(self.config.output_dir).mkdir(parents=True, exist_ok=True)
        
        success_count = 0
        skipped_count = 0
        failed_count = 0
        
        for scene_id, scene_config in tqdm(scenes.items(), desc="处理音频"):
            scene_name = scene_config.get('name', scene_id)
            output_file = scene_config['output_file']
            
            # 构建完整的输出路径
            if not output_file.startswith('/'):
                output_path = os.path.join(self.config.output_dir, output_file)
            else:
                output_path = output_file
            
            print(f"\n📝 处理场景: {scene_id} - {scene_name}")
            
            # 检查音频文件是否已存在
            if Path(output_path).exists():
                print(f"✓ 音频文件已存在: {output_path}")
                
                # 读取音频时长
                audio_duration_ms = self.get_audio_duration_ms(output_path)
                if audio_duration_ms is not None:
                    print(f"📊 音频时长: {audio_duration_ms/1000:.2f}秒")
                    
                    # 如果是字幕模式，更新字幕时间戳
                    if self.config.mode == "caption" and 'caption_file' in scene_config:
                        caption_file = scene_config['caption_file']
                        if not caption_file.startswith('/'):
                            caption_file = os.path.join(self.config.output_dir, caption_file)
                        
                        print(f"🔄 更新字幕时间戳...")
                        if self.update_caption_timestamps(caption_file, audio_duration_ms):
                            success_count += 1
                            skipped_count += 1
                            print(f"✅ 场景处理完成（使用已存在音频）")
                            continue
                    else:
                        success_count += 1
                        skipped_count += 1
                        print(f"✅ 场景处理完成（使用已存在音频）")
                        continue
            
            # 获取文本内容
            if self.config.mode == "caption" and 'caption_file' in scene_config:
                # 字幕模式：从字幕文件读取
                caption_file = scene_config['caption_file']
                if not caption_file.startswith('/'):
                    caption_file = os.path.join(self.config.output_dir, caption_file)
                
                text = self.load_caption_text(caption_file)
                if text is None:
                    print(f"❌ 跳过场景 {scene_id}：无法读取字幕文件")
                    failed_count += 1
                    continue
            elif 'text' in scene_config:
                # 文本模式：直接使用配置的文本
                text = scene_config['text']
            else:
                print(f"❌ 跳过场景 {scene_id}：缺少文本或字幕文件配置")
                failed_count += 1
                continue
            
            print(f"   文本: {text[:50]}...")
            
            # 检查文本长度
            if len(text) > 200:
                print("⚠️  文本过长，可能影响音频质量")
            
            # 生成TTS音频
            success, audio_duration_ms = self.generate_tts_audio(text, output_path)
            if success:
                print(f"✅ 场景音频生成完成: {output_path}")
                success_count += 1
                
                # 如果是字幕模式，更新字幕时间戳
                if self.config.mode == "caption" and 'caption_file' in scene_config:
                    caption_file = scene_config['caption_file']
                    if not caption_file.startswith('/'):
                        caption_file = os.path.join(self.config.output_dir, caption_file)
                    
                    print(f"🔄 更新字幕时间戳...")
                    self.update_caption_timestamps(caption_file, audio_duration_ms)
            else:
                print(f"❌ 场景音频生成失败: {scene_id}")
                failed_count += 1
        
        return success_count, skipped_count, failed_count


def check_dependencies() -> bool:
    """检查依赖是否安装"""
    required_packages = [
        "torch", "transformers", "accelerate", "qwen_tts", 
        "soundfile", "librosa", "numpy", "tqdm"
    ]
    
    print("🔍 检查Qwen3-TTS依赖包...")
    
    missing_packages = []
    for package in required_packages:
        try:
            __import__(package)
            print(f"✓ {package}")
        except ImportError:
            missing_packages.append(package)
            print(f"✗ {package}")
    
    if missing_packages:
        print(f"\n❌ 缺少必需依赖包: {', '.join(missing_packages)}")
        print("💡 请运行: pip install -r requirement.txt")
        return False
    
    print("✅ 所有必需依赖包已安装")
    
    # 检查GPU可用性
    if torch.cuda.is_available():
        print(f"🎮 GPU可用: {torch.cuda.get_device_name(0)}")
    else:
        print("⚠️  GPU不可用，将使用CPU运行（速度较慢）")
    
    return True


# 导出兼容旧接口的函数
def generate_audio_with_captions(
    text: str,
    audio_output_path: str,
    caption_output_path: str,
    reference_audio: str = "./borfy.mp3",
    speed: float = 1.0
) -> bool:
    """
    生成音频和字幕文件（兼容旧接口）
    
    Args:
        text: 要转换的文本
        audio_output_path: 音频输出路径
        caption_output_path: 字幕输出路径
        reference_audio: 参考音频路径
        speed: 语速（暂未实现）
    
    Returns:
        是否成功
    """
    config = AudioGeneratorConfig(
        video_name="default",
        output_dir=os.path.dirname(audio_output_path),
        reference_audio=reference_audio,
        mode="text"
    )
    
    generator = AudioGenerator(config)
    return generator.generate_audio_with_captions(
        text=text,
        audio_output_path=audio_output_path,
        caption_output_path=caption_output_path,
        reference_audio=reference_audio,
        speed=speed
    )


if __name__ == "__main__":
    print("=" * 60)
    print("通用视频音频生成工具")
    print("=" * 60)
    print("🤖 使用Qwen3-TTS模型生成高质量语音解说")
    print("🎯 支持文本模式和字幕模式")
    print("=" * 60)
    
    # 检查依赖
    if not check_dependencies():
        sys.exit(1)
    
    print("\n💡 使用说明:")
    print("   这是一个通用的音频生成工具库")
    print("   请在其他脚本中导入并使用 AudioGenerator 类")
    print("   或使用 generate_audio_with_captions 函数")
    print("\n示例:")
    print("   from audio_generator import AudioGenerator, AudioGeneratorConfig")
    print("   config = AudioGeneratorConfig(...)")
    print("   generator = AudioGenerator(config)")
    print("   generator.generate_from_config(scenes)")
