#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
DeepSeekVideo - 音频生成脚本
使用 Qwen3-TTS 模型生成高质量场景解说音频
"""

import os
import sys
import json
from pathlib import Path

import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel
import librosa
import numpy as np

# 脚本所在目录（public/DeepSeekVideo）
SCRIPT_DIR = Path(os.path.dirname(os.path.abspath(__file__)))
# 项目根目录（remotion-videos）
PROJECT_ROOT = SCRIPT_DIR.parent.parent
OUTPUT_DIR = SCRIPT_DIR

# 场景配置：从字幕文件读取文本
SCENES = {
    "scene1": {"name": "开场引入", "caption_file": "scene1-captions.json", "output_file": "scene1-audio.mp3"},
    "scene2": {"name": "DeepSeek 是什么", "caption_file": "scene2-captions.json", "output_file": "scene2-audio.mp3"},
    "scene3": {"name": "国产崛起的意义", "caption_file": "scene3-captions.json", "output_file": "scene3-audio.mp3"},
    "scene4": {"name": "核心功能介绍", "caption_file": "scene4-captions.json", "output_file": "scene4-audio.mp3"},
    "scene5": {"name": "本地部署演示", "caption_file": "scene5-captions.json", "output_file": "scene5-audio.mp3"},
    "scene6": {"name": "总结与展望", "caption_file": "scene6-captions.json", "output_file": "scene6-audio.mp3"},
    "ending": {"name": "结尾", "caption_file": "ending-captions.json", "output_file": "ending-audio.mp3"},
}

# Qwen3-TTS模型实例（单例）
_qwen_model = None

def get_tts_model():
    """获取或初始化 Qwen3-TTS 模型"""
    global _tts_model
    if _tts_model is None:
        try:
            print("🔧 加载 Qwen3-TTS 模型...")
            model_kwargs = {
                "pretrained_model_name_or_path": str(PROJECT_ROOT / "Qwen3-TTS-12Hz-1.7B-Base"),
                "device_map": "auto",
                "torch_dtype": torch.bfloat16,
                "low_cpu_mem_usage": True,
            }
            _tts_model = Qwen3TTSModel.from_pretrained(**model_kwargs)
            print("✅ Qwen3-TTS 模型加载完成")
        except Exception as e:
            print(f"❌ Qwen3-TTS 模型加载失败: {e}")
            print("💡 建议检查模型路径和网络连接")
            return None
    return _tts_model

def extract_text_from_captions(captions_file):
    """从字幕文件中提取完整文本"""
    with open(captions_file, 'r', encoding='utf-8') as f:
        captions = json.load(f)
    sorted_captions = sorted(captions, key=lambda x: x.get('startMs', 0))
    text = ''.join([c['text'] for c in sorted_captions])
    return text

def generate_audio_with_tts(text, output_path, max_retries=3):
    """使用 Qwen3-TTS 生成音频"""
    for attempt in range(max_retries):
        model = get_tts_model()
        if model is None:
            return False
        
        print(f"🔄 尝试生成语音 (第{attempt + 1}次)...")
        
        try:
            wavs, sr = model.generate_voice_clone(
                ref_audio=REFERENCE_AUDIO,
                ref_text=REFERENCE_TEXT,
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
            
            # 保存原始音频
            sf.write(output_path, wavs[0], sr)
            
            # 音频后处理
            try:
                audio, sr_loaded = librosa.load(output_path, sr=None)
                audio_duration = len(audio) / sr_loaded
                print(f"📊 音频时长: {audio_duration:.2f}秒")
                
                # 音频过长时裁剪
                if audio_duration > 45:
                    print("⚠️ 音频过长，进行裁剪...")
                    max_samples = int(45 * sr_loaded)
                    audio = audio[:max_samples]
                    print(f"✓ 裁剪后时长: {len(audio) / sr_loaded:.2f}秒")
                
                # 音量标准化
                audio_normalized = librosa.util.normalize(audio) * 0.7
                audio_filtered = librosa.effects.preemphasis(audio_normalized, coef=0.97)
                sf.write(output_path, audio_filtered, sr_loaded)
                print(f"✓ 音频后处理完成")
                
                if audio_duration < 1.0:
                    print("⚠️ 音频过短，可能生成失败")
                    continue
                    
            except Exception as e:
                print(f"⚠️ 音频后处理失败，但原始音频已保存: {e}")
            
            print(f"✓ 生成音频: {output_path}")
            return True
            
        except Exception as e:
            print(f"❌ 第{attempt + 1}次生成失败: {e}")
            if attempt < max_retries - 1:
                print("🔄 等待2秒后重试...")
                import time
                time.sleep(2)
    
    return False

def generate_all_audios():
    """生成所有场景的音频文件"""
    current_dir = Path(__file__).parent
    
    # 查找所有字幕文件
    caption_files = sorted(list(current_dir.glob("scene*-captions.json")))
    
    print("=" * 60)
    print("🎵 DeepSeekVideo - Qwen3-TTS 音频生成工具")
    print("=" * 60)
    print(f"📋 找到 {len(caption_files)} 个字幕文件\n")
    
    success_count = 0
    
    for caption_file in tqdm(caption_files, desc="生成音频"):
        scene_name = caption_file.stem.replace("-captions", "")
        audio_file = current_dir / f"{scene_name}-audio.mp3"
        
        # 提取文本
        text = extract_text_from_captions(caption_file)
        
        print(f"\n📝 {scene_name}:")
        print(f"   文本: {text[:60]}...")
        
        # 检查文本长度
        if len(text) > 300:
            print("⚠️ 文本较长，可能影响音频质量")
        
        # 生成音频
        if generate_audio_with_tts(text, audio_file):
            print(f"✅ 已生成: {audio_file.name}\n")
            success_count += 1
        else:
            print(f"❌ 生成失败: {scene_name}\n")
    
    print("=" * 60)
    print(f"📊 生成结果: {success_count}/{len(caption_files)} 成功")
    if success_count == len(caption_files):
        print("🎉 所有音频生成完成！")
    else:
        print(f"⚠️ {len(caption_files) - success_count} 个音频生成失败")
    print("=" * 60)
    
    return success_count == len(caption_files)

def check_dependencies():
    """检查依赖是否安装"""
    required_packages = ["torch", "qwen_tts", "soundfile", "librosa", "numpy", "tqdm"]
    
    print("🔍 检查依赖包...")
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✓ {package}")
        except ImportError:
            missing_packages.append(package)
            print(f"✗ {package}")
    
    if missing_packages:
        print(f"\n❌ 缺少依赖包: {', '.join(missing_packages)}")
        print("💡 请运行: pip install -r requirement.txt")
        return False
    
    print("✅ 所有依赖包已安装")
    
    if torch.cuda.is_available():
        print(f"🎮 GPU可用: {torch.cuda.get_device_name(0)}")
    else:
        print("⚠️ GPU不可用，将使用CPU运行（速度较慢）")
    
    # 检查参考音频是否存在
    ref_path = Path(REFERENCE_AUDIO)
    if ref_path.is_absolute() or (Path(__file__).parent / REFERENCE_AUDIO).exists():
        print(f"✓ 参考音频: {REFERENCE_AUDIO}")
    else:
        print(f"⚠️ 参考音频可能不存在: {REFERENCE_AUDIO}")
    
    return True

if __name__ == "__main__":
    # 检查依赖
    if not check_dependencies():
        sys.exit(1)
    
    # 生成音频
    success = generate_all_audios()
    
    sys.exit(0 if success else 1)
