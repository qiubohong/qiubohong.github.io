#!/usr/bin/env python3
"""
FunctionCallingVideo - 音频生成脚本
基于字幕 JSON 文件，使用 Qwen3-TTS 模型生成各场景音频

使用方法：
    conda activate qwen3-tts
    python tts_functioncalling.py
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

# 字幕文件配置（从 JSON 文件读取文本）
CAPTION_FILES = {
    "scene1": "public/FunctionCallingVideo/scene1-captions.json",
    "scene2": "public/FunctionCallingVideo/scene2-captions.json",
    "scene3": "public/FunctionCallingVideo/scene3-captions.json",
    "scene4": "public/FunctionCallingVideo/scene4-captions.json",
    "scene5": "public/FunctionCallingVideo/scene5-captions.json",
    "scene6": "public/FunctionCallingVideo/scene6-captions.json",
    "ending": "public/FunctionCallingVideo/ending-captions.json",
}

# Qwen3-TTS 模型实例
_qwen_model = None


def get_qwen_model():
    """获取或初始化 Qwen3-TTS 模型"""
    global _qwen_model
    if _qwen_model is None:
        try:
            print("🔧 加载 Qwen3-TTS 模型...")
            model_kwargs = {
                "pretrained_model_name_or_path": "./Qwen3-TTS-12Hz-1.7B-Base",
                "device_map": "auto",
                "torch_dtype": torch.bfloat16,
                "low_cpu_mem_usage": True,
            }
            _qwen_model = Qwen3TTSModel.from_pretrained(**model_kwargs)
            print("✅ Qwen3-TTS 模型加载完成")
        except Exception as e:
            print(f"❌ Qwen3-TTS 模型加载失败: {e}")
            return None
    return _qwen_model


def load_captions_text(caption_file):
    """从字幕 JSON 文件中提取所有文本，合并为一段话"""
    with open(caption_file, "r", encoding="utf-8") as f:
        captions = json.load(f)
    texts = [item["text"] for item in captions]
    return "".join(texts)


def generate_tts_audio(text, output_path, scene_name=None):
    """使用 Qwen3-TTS 生成音频"""
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

            print(f"✅ 生成音频: {output_path}")
            return True

        except Exception as e:
            print(f"❌ 第{attempt + 1}次生成失败: {e}")
            if attempt < max_retries - 1:
                import time
                time.sleep(2)

    return False


def generate_all_audios():
    """生成所有场景的音频文件"""
    print("🎵 开始生成 FunctionCallingVideo 音频...")
    print("🤖 使用 Qwen3-TTS 模型生成高质量语音")

    success_count = 0

    for scene_name, caption_file in tqdm(CAPTION_FILES.items(), desc="生成音频"):
        output_path = f"public/FunctionCallingVideo/{scene_name}-audio.mp3"

        print(f"\n📝 处理场景: {scene_name}")

        # 从字幕文件读取文本
        try:
            text = load_captions_text(caption_file)
            print(f"   文本: {text[:80]}{'...' if len(text) > 80 else ''}")
        except Exception as e:
            print(f"❌ 读取字幕文件失败: {e}")
            continue

        # 跳过已存在的音频文件
        if os.path.exists(output_path):
            print(f"⏭️  跳过已存在的音频: {scene_name}-audio.mp3")
            success_count += 1
            continue

        # 生成 TTS 音频
        if generate_tts_audio(text, output_path, scene_name):
            print(f"✅ 场景音频完成: {scene_name}-audio.mp3")
            success_count += 1
        else:
            print(f"❌ 场景音频生成失败: {scene_name}")

    print(f"\n📊 生成结果:")
    print(f"   成功: {success_count}/{len(CAPTION_FILES)}")
    print(f"   失败: {len(CAPTION_FILES) - success_count}")

    if success_count == len(CAPTION_FILES):
        print("🎉 所有音频生成完成！")
    else:
        print("⚠️  部分音频生成失败，请检查错误信息")

    return success_count == len(CAPTION_FILES)


if __name__ == "__main__":
    print("=" * 60)
    print("FunctionCallingVideo - Qwen3-TTS 音频生成工具")
    print("=" * 60)

    success = generate_all_audios()
    sys.exit(0 if success else 1)
