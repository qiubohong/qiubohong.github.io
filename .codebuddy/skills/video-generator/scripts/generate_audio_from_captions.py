#!/usr/bin/env python3
"""
基于字幕文件生成音频文件
使用Qwen3-TTS模型生成高质量场景解说音频

用法:
    python generate_audio_from_captions.py --video-name <视频名称> --captions-dir <字幕目录>

示例:
    python generate_audio_from_captions.py --video-name RNNVideo --captions-dir public/RNNVideo
"""

import os
import sys
import json
import argparse
from pathlib import Path
import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel
import librosa
import numpy as np
from tqdm import tqdm

# 默认参考音频配置
DEFAULT_REF_AUDIO = "./borfy.mp3"
DEFAULT_REF_TEXT = "5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。"

# Qwen3-TTS模型实例
_qwen_model = None


def get_qwen_model():
    """获取或初始化Qwen3-TTS模型"""
    global _qwen_model
    if _qwen_model is None:
        try:
            print("🔧 加载Qwen3-TTS模型...")
            
            model_kwargs = {
                "pretrained_model_name_or_path": "./Qwen3-TTS-12Hz-1.7B-Base",
                "device_map": "auto",
                "torch_dtype": torch.bfloat16,
                "low_cpu_mem_usage": True,
            }
            
            _qwen_model = Qwen3TTSModel.from_pretrained(**model_kwargs)
            print("✅ Qwen3-TTS模型加载完成")
            
        except Exception as e:
            print(f"❌ Qwen3-TTS模型加载失败: {e}")
            return None
    return _qwen_model


def generate_tts_audio(text, output_path, ref_audio=None, ref_text=None):
    """使用Qwen3-TTS生成音频"""
    max_retries = 3
    ref_audio = ref_audio or DEFAULT_REF_AUDIO
    ref_text = ref_text or DEFAULT_REF_TEXT
    
    for attempt in range(max_retries):
        model = get_qwen_model()
        if model is None:
            return False
        
        print(f"🔄 尝试生成语音 (第{attempt + 1}次)...")
        
        try:
            wavs, sr = model.generate_voice_clone(
                ref_audio=ref_audio,
                ref_text=ref_text,
                text=text,
                language="chinese",
                max_new_tokens=1024,
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
            try:
                audio, sr_loaded = librosa.load(output_path, sr=None)
                audio_duration = len(audio) / sr_loaded
                print(f"📊 音频时长: {audio_duration:.2f}秒")
                
                # 音量标准化
                audio_normalized = librosa.util.normalize(audio) * 0.7
                # 低通滤波提高清晰度
                audio_filtered = librosa.effects.preemphasis(audio_normalized, coef=0.97)
                
                sf.write(output_path, audio_filtered, sr_loaded)
                print(f"✓ 音频后处理完成: {output_path}")
                
                if audio_duration < 1.0:
                    print("⚠️  音频过短，可能生成失败")
                    continue
                    
            except Exception as e:
                print(f"⚠️  音频后处理失败，但原始音频已保存: {e}")
            
            return True
            
        except Exception as e:
            print(f"❌ 第{attempt + 1}次生成失败: {e}")
            if attempt < max_retries - 1:
                print("🔄 等待2秒后重试...")
                import time
                time.sleep(2)
    
    return False


def extract_text_from_captions(captions_file):
    """从字幕文件中提取完整文本"""
    with open(captions_file, 'r', encoding='utf-8') as f:
        captions = json.load(f)
    
    # 按时间戳排序并合并文本
    sorted_captions = sorted(captions, key=lambda x: x.get('startMs', 0))
    text = ''.join([c['text'] for c in sorted_captions])
    return text


def generate_audio_for_video(video_name, captions_dir, ref_audio=None, ref_text=None):
    """为视频生成所有场景的音频"""
    captions_path = Path(captions_dir)
    
    if not captions_path.exists():
        print(f"❌ 字幕目录不存在: {captions_dir}")
        return False
    
    # 查找所有字幕文件
    caption_files = list(captions_path.glob("*-captions.json"))
    
    if not caption_files:
        print(f"❌ 未找到字幕文件: {captions_dir}/*-captions.json")
        return False
    
    print(f"🎵 开始为 {video_name} 生成音频...")
    print(f"📁 字幕目录: {captions_dir}")
    print(f"📋 找到 {len(caption_files)} 个字幕文件")
    
    success_count = 0
    
    for caption_file in tqdm(sorted(caption_files), desc="生成音频"):
        # 从文件名提取场景名称
        scene_name = caption_file.stem.replace("-captions", "")
        audio_file = captions_path / f"{scene_name}-audio.mp3"
        
        print(f"\n📝 处理场景: {scene_name}")
        
        # 提取字幕文本
        text = extract_text_from_captions(caption_file)
        print(f"   文本: {text[:100]}...")
        
        # 生成音频
        if generate_tts_audio(text, str(audio_file), ref_audio, ref_text):
            print(f"✅ 场景音频完成: {audio_file.name}")
            success_count += 1
        else:
            print(f"❌ 场景音频生成失败: {scene_name}")
    
    print(f"\n📊 生成结果:")
    print(f"   成功: {success_count}/{len(caption_files)}")
    print(f"   失败: {len(caption_files) - success_count}")
    
    return success_count == len(caption_files)


def check_dependencies():
    """检查依赖是否安装"""
    required_packages = ["torch", "transformers", "accelerate", "qwen_tts", "soundfile", "librosa", "numpy"]
    
    print("🔍 检查依赖包...")
    missing = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✓ {package}")
        except ImportError:
            missing.append(package)
            print(f"✗ {package}")
    
    if missing:
        print(f"\n❌ 缺少依赖包: {', '.join(missing)}")
        print("💡 请运行: pip install -r requirement.txt")
        return False
    
    print("✅ 所有依赖包已安装")
    
    if torch.cuda.is_available():
        print(f"🎮 GPU可用: {torch.cuda.get_device_name(0)}")
    else:
        print("⚠️  GPU不可用，将使用CPU运行")
    
    return True


def main():
    parser = argparse.ArgumentParser(
        description="基于字幕文件生成音频",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
    python generate_audio_from_captions.py --video-name RNNVideo --captions-dir public/RNNVideo
    python generate_audio_from_captions.py --video-name CNNVideo --captions-dir public/CNNVideo --ref-audio custom.mp3
        """
    )
    
    parser.add_argument("--video-name", required=True, help="视频名称")
    parser.add_argument("--captions-dir", required=True, help="字幕文件目录")
    parser.add_argument("--ref-audio", default=None, help="参考音频文件路径")
    parser.add_argument("--ref-text", default=None, help="参考音频对应文本")
    
    args = parser.parse_args()
    
    print("=" * 50)
    print(f"视频音频生成工具 - {args.video_name}")
    print("=" * 50)
    
    if not check_dependencies():
        sys.exit(1)
    
    success = generate_audio_for_video(
        args.video_name,
        args.captions_dir,
        args.ref_audio,
        args.ref_text
    )
    
    if success:
        print("\n🎉 所有音频生成完成！")
        print(f"📁 音频文件位置: {args.captions_dir}/")
        print("🎬 下一步: 计算音频时长并更新帧数")
    
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
