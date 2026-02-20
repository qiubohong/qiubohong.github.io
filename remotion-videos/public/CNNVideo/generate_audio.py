#!/usr/bin/env python3
"""
CNN视频音频生成脚本
使用Qwen3-TTS模型生成高质量场景解说音频

🎯 功能特点：
• 自动读取字幕JSON文件，合并为完整解说文本
• 音频时长控制：避免音频过长，自动裁剪超过30秒的音频
• 语音质量优化：降低温度参数，提高语音稳定性
• 严格采样策略：减少语音乱码和重复问题
• 音频后处理：音量标准化、低通滤波提高清晰度
• 重试机制：自动重试失败的任务，提高成功率

语音角色：统一使用温柔女生角色，确保语音风格一致
音频时长：智能控制，避免过长音频，确保与视频同步
模型配置：使用本地下载的Qwen3-TTS模型，优化内存使用
"""

import os
import sys
import json
import time
from pathlib import Path
import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel
import librosa
import numpy as np
from tqdm import tqdm

# 场景配置：场景名称和对应的字幕文件
SCENE_CONFIG = {
    "scene1": {
        "name": "介绍",
        "caption_file": "scene1-captions.json",
        "output_file": "scene1-audio.mp3"
    },
    "scene2": {
        "name": "定义",
        "caption_file": "scene2-captions.json",
        "output_file": "scene2-audio.mp3"
    },
    "scene3": {
        "name": "对比",
        "caption_file": "scene3-captions.json",
        "output_file": "scene3-audio.mp3"
    },
    "scene4": {
        "name": "三层功能",
        "caption_file": "scene4-captions.json",
        "output_file": "scene4-audio.mp3"
    },
    "scene5": {
        "name": "实际应用",
        "caption_file": "scene5-captions.json",
        "output_file": "scene5-audio.mp3"
    },
    "scene6": {
        "name": "冷知识",
        "caption_file": "scene6-captions.json",
        "output_file": "scene6-audio.mp3"
    }
}

# Qwen3-TTS模型实例
_qwen_model = None

def get_qwen_model():
    """获取或初始化Qwen3-TTS模型"""
    global _qwen_model
    if _qwen_model is None:
        try:
            print("🔧 加载Qwen3-TTS模型...")
            
            model_kwargs = {
                "pretrained_model_name_or_path": "../../Qwen3-TTS-12Hz-1.7B-Base",
                "device_map": "auto",
                "torch_dtype": torch.bfloat16,
                "low_cpu_mem_usage": True,
            }
            
            _qwen_model = Qwen3TTSModel.from_pretrained(**model_kwargs)
            print("✅ Qwen3-TTS模型加载完成")
            
        except Exception as e:
            print(f"❌ Qwen3-TTS模型加载失败: {e}")
            print("💡 建议检查：")
            print("   1. 模型路径是否正确（../../Qwen3-TTS-12Hz-1.7B-Base）")
            print("   2. 网络连接是否正常")
            print("   3. 磁盘空间是否充足")
            return None
    return _qwen_model

def load_caption_text(caption_file):
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

def update_caption_timestamps(caption_file, audio_duration_ms):
    """根据音频时长更新字幕时间戳"""
    try:
        with open(caption_file, 'r', encoding='utf-8') as f:
            captions = json.load(f)
        
        if not captions:
            print(f"⚠️  字幕文件为空: {caption_file}")
            return False
        
        # 使用新的字段名：startMs 和 endMs
        original_duration_ms = captions[-1]['endMs']
        
        duration_diff_ratio = abs(audio_duration_ms - original_duration_ms) / original_duration_ms
        if duration_diff_ratio < 0.1:
            print(f"   字幕时长与音频时长接近，无需更新 (差异: {duration_diff_ratio*100:.1f}%)")
            return True
        
        scale_ratio = audio_duration_ms / original_duration_ms
        print(f"   原始时长: {original_duration_ms}ms, 音频时长: {audio_duration_ms}ms, 缩放比例: {scale_ratio:.2f}")
        
        for caption in captions:
            caption['startMs'] = int(caption['startMs'] * scale_ratio)
            caption['endMs'] = int(caption['endMs'] * scale_ratio)
        
        with open(caption_file, 'w', encoding='utf-8') as f:
            json.dump(captions, f, ensure_ascii=False, indent=2)
        
        print(f"✓ 字幕时间戳已更新: {caption_file}")
        return True
        
    except Exception as e:
        print(f"❌ 更新字幕时间戳失败 {caption_file}: {e}")
        return False

def generate_tts_audio(text, output_path, scene_name=None):
    """使用Qwen3-TTS生成音频"""
    max_retries = 3
    
    for attempt in range(max_retries):
        model = get_qwen_model()
        if model is None:
            return False, 0
        
        print(f"🔄 尝试生成语音 (第{attempt + 1}次)...")
        
        try:
            wavs, sr = model.generate_voice_clone(
                ref_audio="../../borfy.mp3",
                ref_text="5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。",
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
            
            sf.write(output_path, wavs[0], sr)
            
            audio_duration_seconds = 0
            try:
                audio, sr_loaded = librosa.load(output_path, sr=None)
                
                audio_duration_seconds = len(audio) / sr_loaded
                print(f"📊 音频时长: {audio_duration_seconds:.2f}秒")
                
                if audio_duration_seconds > 30:
                    print("⚠️  音频过长，进行裁剪...")
                    max_samples = int(30 * sr_loaded)
                    audio = audio[:max_samples]
                    audio_duration_seconds = len(audio) / sr_loaded
                    print(f"✓ 裁剪后时长: {audio_duration_seconds:.2f}秒")
                
                audio_normalized = librosa.util.normalize(audio) * 0.7
                audio_filtered = librosa.effects.preemphasis(audio_normalized, coef=0.97)
                sf.write(output_path, audio_filtered, sr_loaded)
                print(f"✓ 音频后处理完成: {output_path}")
                
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
                time.sleep(2)
    
    return False, 0

def get_audio_duration_ms(audio_path):
    """获取音频文件的时长（毫秒）"""
    try:
        audio, sr = librosa.load(audio_path, sr=None)
        duration_seconds = len(audio) / sr
        duration_ms = int(duration_seconds * 1000)
        return duration_ms
    except Exception as e:
        print(f"❌ 读取音频时长失败 {audio_path}: {e}")
        return None

def generate_all_scene_audios():
    """生成所有场景的音频文件"""
    print("🎵 开始处理CNN视频音频...")
    print("🤖 使用Qwen3-TTS模型生成高质量语音")
    print("🎯 优化参数：严格控制音频时长和语音质量")
    
    success_count = 0
    updated_caption_count = 0
    skipped_count = 0
    
    for scene_id, config in tqdm(SCENE_CONFIG.items(), desc="处理音频"):
        scene_name = config['name']
        caption_file = config['caption_file']
        output_path = config['output_file']
        
        print(f"\n📝 处理场景: {scene_id} - {scene_name}")
        
        if Path(output_path).exists():
            print(f"✓ 音频文件已存在: {output_path}")
            
            audio_duration_ms = get_audio_duration_ms(output_path)
            if audio_duration_ms is not None:
                print(f"📊 音频时长: {audio_duration_ms/1000:.2f}秒")
                
                print(f"🔄 更新字幕时间戳...")
                if update_caption_timestamps(caption_file, audio_duration_ms):
                    updated_caption_count += 1
                    success_count += 1
                    skipped_count += 1
                    print(f"✅ 场景处理完成（使用已存在音频）")
                    continue
                else:
                    print(f"⚠️  字幕更新失败，将重新生成音频")
            else:
                print(f"⚠️  无法读取音频时长，将重新生成音频")
        
        print(f"🎤 生成新音频...")
        
        script_text = load_caption_text(caption_file)
        if script_text is None:
            print(f"❌ 跳过场景 {scene_id}：无法读取字幕文件")
            continue
        
        print(f"   文本: {script_text}")
        
        if len(script_text) > 200:
            print("⚠️  文本过长，可能影响音频质量")
        
        result = generate_tts_audio(script_text, output_path, scene_name)
        if isinstance(result, tuple) and result[0]:
            success, audio_duration_ms = result
            print(f"✅ 场景音频生成完成: {output_path}")
            success_count += 1
            
            print(f"🔄 更新字幕时间戳...")
            if update_caption_timestamps(caption_file, audio_duration_ms):
                updated_caption_count += 1
        else:
            print(f"❌ 场景音频生成失败: {scene_id}")
    
    print(f"\n📊 处理结果:")
    print(f"   总场景数: {len(SCENE_CONFIG)}")
    print(f"   成功处理: {success_count}/{len(SCENE_CONFIG)}")
    print(f"   使用已存在音频: {skipped_count}")
    print(f"   新生成音频: {success_count - skipped_count}")
    print(f"   字幕更新成功: {updated_caption_count}/{success_count}")
    print(f"   失败: {len(SCENE_CONFIG) - success_count}")
    
    if success_count == len(SCENE_CONFIG):
        print("🎉 所有场景处理完成！")
        print("📁 音频文件位置: ./")
        print("🎬 现在可以运行 'npm start' 预览视频效果")
    else:
        print("⚠️  部分场景处理失败，请检查错误信息")
    
    return success_count == len(SCENE_CONFIG)

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
        print("💡 请运行: pip install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm")
        return False
    
    print("✅ 所有必需依赖包已安装")
    
    if torch.cuda.is_available():
        print(f"🎮 GPU可用: {torch.cuda.get_device_name(0)}")
    else:
        print("⚠️  GPU不可用，将使用CPU运行（速度较慢）")
    
    return True

def check_caption_files():
    """检查所有字幕文件是否存在"""
    print("\n🔍 检查字幕文件...")
    all_exist = True
    
    for scene_id, config in SCENE_CONFIG.items():
        caption_file = config['caption_file']
        if Path(caption_file).exists():
            print(f"✓ {scene_id}: {caption_file}")
        else:
            print(f"✗ {scene_id}: {caption_file} (文件不存在)")
            all_exist = False
    
    if not all_exist:
        print("\n❌ 部分字幕文件不存在，请先创建字幕文件")
        return False
    
    print("✅ 所有字幕文件检查通过")
    return True

if __name__ == "__main__":
    print("=" * 60)
    print("CNN视频 - Qwen3-TTS音频生成工具")
    print("=" * 60)
    print("🤖 使用Qwen3-TTS模型生成高质量语音解说")
    print("🎯 统一使用温柔女生角色，语音风格一致")
    print("📝 自动读取字幕JSON文件，生成对应音频")
    print("=" * 60)
    
    if not check_dependencies():
        sys.exit(1)
    
    if not check_caption_files():
        sys.exit(1)
    
    success = generate_all_scene_audios()
    
    if success:
        print("\n🎯 使用说明:")
        print("1. 运行 'npm start' 预览视频效果")
        print("2. 运行 'npm run render -- CNNVideo' 渲染最终视频")
        print("3. 音频文件位置: public/CNNVideo/")
    
    sys.exit(0 if success else 1)
