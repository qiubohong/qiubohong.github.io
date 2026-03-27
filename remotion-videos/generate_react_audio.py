#!/usr/bin/env python3
"""
ReAct视频 - 音频生成脚本
使用Qwen3-TTS模型生成高质量场景解说音频
"""

import os
import sys
import json
from pathlib import Path
import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel
from pydub import AudioSegment
import librosa
import numpy as np
from tqdm import tqdm

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

def merge_captions_text(captions):
    """合并字幕文本为一段连续的文本"""
    texts = [cap["text"] for cap in captions]
    return " ".join(texts)

def generate_tts_audio(text, output_path):
    """使用Qwen3-TTS生成音频"""
    max_retries = 3
    
    for attempt in range(max_retries):
        model = get_qwen_model()
        if model is None:
            return False
        
        print(f"🔄 尝试生成语音 (第{attempt + 1}次)...")
        
        try:
            wavs, sr = model.generate_voice_clone(
                ref_audio="./borfy.mp3",
                ref_text="5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。",
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
                
                # 检查音频时长
                audio_duration = len(audio) / sr_loaded
                print(f"📊 音频时长: {audio_duration:.2f}秒")
                
                # 音量标准化
                audio_normalized = librosa.util.normalize(audio) * 0.7
                audio_filtered = librosa.effects.preemphasis(audio_normalized, coef=0.97)
                
                sf.write(output_path, audio_filtered, sr_loaded)
                print(f"✓ 音频后处理完成: {output_path}")
                
                if audio_duration < 1.0:
                    print("⚠️  音频过短，可能生成失败")
                    continue
                    
            except Exception as e:
                print(f"⚠️  音频后处理失败，但原始音频已保存: {e}")
            
            print(f"✓ 生成音频: {output_path}")
            return True
            
        except Exception as e:
            print(f"❌ 第{attempt + 1}次生成失败: {e}")
            if attempt < max_retries - 1:
                print("🔄 等待2秒后重试...")
                import time
                time.sleep(2)
    
    return False

def generate_all_scene_audios():
    """生成所有场景的音频文件"""
    print("🎵 开始生成 ReAct 视频音频解说...")
    
    captions_dir = Path("public/ReAct")
    
    # 定义场景文件映射
    scene_files = {
        "scene1": "scene1-captions.json",
        "scene2": "scene2-captions.json",
        "scene3": "scene3-captions.json",
        "scene4": "scene4-captions.json",
        "scene5": "scene5-captions.json",
        "scene6": "scene6-captions.json",
        "ending": "ending-captions.json",
    }
    
    success_count = 0
    
    for scene_name, caption_file in tqdm(scene_files.items(), desc="生成音频"):
        caption_path = captions_dir / caption_file
        output_path = captions_dir / f"{scene_name}-audio.mp3"
        
        # 读取字幕文件
        try:
            with open(caption_path, 'r', encoding='utf-8') as f:
                captions = json.load(f)
        except Exception as e:
            print(f"❌ 读取字幕文件失败: {caption_path}, {e}")
            continue
        
        # 合并文本
        text = merge_captions_text(captions)
        print(f"\n📝 处理场景: {scene_name}")
        print(f"   文本: {text[:50]}...")
        
        # 生成TTS音频
        if generate_tts_audio(text, output_path):
            print(f"✅ 场景音频完成: {output_path.name}")
            success_count += 1
        else:
            print(f"❌ 场景音频生成失败: {scene_name}")
    
    print(f"\n📊 生成结果:")
    print(f"   成功: {success_count}/{len(scene_files)}")
    print(f"   失败: {len(scene_files) - success_count}")
    
    return success_count == len(scene_files)

def check_dependencies():
    """检查依赖是否安装"""
    required_packages = ["torch", "transformers", "accelerate", "qwen_tts", "soundfile", "librosa", "numpy", "tqdm"]
    
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
    
    if torch.cuda.is_available():
        print(f"🎮 GPU可用: {torch.cuda.get_device_name(0)}")
    else:
        print("⚠️  GPU不可用，将使用CPU运行（速度较慢）")
    
    return True

if __name__ == "__main__":
    print("=" * 50)
    print("ReAct 视频 - Qwen3-TTS音频生成工具")
    print("=" * 50)
    
    if not check_dependencies():
        sys.exit(1)
    
    success = generate_all_scene_audios()
    
    if success:
        print("\n🎉 所有音频生成完成！")
        print("📁 音频文件已保存到: public/ReAct/")
    else:
        print("\n⚠️  部分音频生成失败，请检查错误信息")
    
    sys.exit(0 if success else 1)