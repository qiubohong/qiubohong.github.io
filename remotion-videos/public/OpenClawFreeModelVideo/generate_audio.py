#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
OpenClawFreeModelVideo 音频生成脚本（普通人也能用好 OpenClaw（龙虾）—— 白嫖大模型）
使用Qwen3-TTS模型从字幕文件生成音频
"""

import os
import json
from pathlib import Path

import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel
import librosa

# 脚本所在目录（public/OpenClawFreeModelVideo）
SCRIPT_DIR = Path(os.path.dirname(os.path.abspath(__file__)))
# 项目根目录（remotion-videos）
PROJECT_ROOT = SCRIPT_DIR.parent.parent
OUTPUT_DIR = SCRIPT_DIR

# 场景配置：从字幕文件读取文本
SCENES = {
    "scene1": {"name": "开场钩子",   "caption_file": "scene1-captions.json", "output_file": "scene1-audio.mp3"},
    "scene2": {"name": "为什么需要大模型", "caption_file": "scene2-captions.json", "output_file": "scene2-audio.mp3"},
    "scene3": {"name": "免费平台大盘点", "caption_file": "scene3-captions.json", "output_file": "scene3-audio.mp3"},
    "scene4": {"name": "智谱AI注册教程", "caption_file": "scene4-captions.json", "output_file": "scene4-audio.mp3"},
    "scene5": {"name": "第三方平台薅羊毛", "caption_file": "scene5-captions.json", "output_file": "scene5-audio.mp3"},
    "scene6": {"name": "不同模型怎么选", "caption_file": "scene6-captions.json", "output_file": "scene6-audio.mp3"},
    "scene7": {"name": "tokens是什么", "caption_file": "scene7-captions.json", "output_file": "scene7-audio.mp3"},
    "scene8": {"name": "结尾互动", "caption_file": "scene8-captions.json", "output_file": "scene8-audio.mp3"},
}

# 需要强制重新生成的场景（字幕已更新时使用）
FORCE_REGENERATE = set()

# Qwen3-TTS模型实例（单例）
_qwen_model = None

def get_qwen_model():
    """获取或初始化Qwen3-TTS模型"""
    global _qwen_model
    if _qwen_model is None:
        model_path = str(PROJECT_ROOT / "Qwen3-TTS-12Hz-1.7B-Base")
        print(f"🔧 加载Qwen3-TTS模型: {model_path}")
        _qwen_model = Qwen3TTSModel.from_pretrained(
            pretrained_model_name_or_path=model_path,
            device_map="auto",
            torch_dtype=torch.bfloat16,
            low_cpu_mem_usage=True,
        )
        print("✅ 模型加载完成")
    return _qwen_model

def load_captions_text(caption_file: Path) -> str:
    """从字幕文件读取并拼接所有文本"""
    with open(caption_file, "r", encoding="utf-8") as f:
        captions = json.load(f)
    return "".join(item["text"] for item in captions)

def generate_audio(text: str, output_path: Path, max_retries: int = 3) -> bool:
    """使用Qwen3-TTS生成音频"""
    ref_audio = str(PROJECT_ROOT / "borfy.mp3")

    for attempt in range(max_retries):
        try:
            print(f"  🔄 生成语音 (第{attempt + 1}次)...")
            model = get_qwen_model()
            wavs, sr = model.generate_voice_clone(
                ref_audio=ref_audio,
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
                subtalker_temperature=0.3
            )
            sf.write(str(output_path), wavs[0], sr)

            # 后处理：音量标准化
            audio, sr_loaded = librosa.load(str(output_path), sr=None)
            duration = len(audio) / sr_loaded
            print(f"  📊 音频时长: {duration:.2f}秒")

            if duration < 1.0:
                print("  ⚠️  音频过短，重试...")
                continue

            audio = librosa.util.normalize(audio) * 0.7
            audio = librosa.effects.preemphasis(audio, coef=0.97)
            sf.write(str(output_path), audio, sr_loaded)
            print(f"  ✅ 已保存: {output_path.name}")
            return True

        except Exception as e:
            print(f"  ❌ 第{attempt + 1}次失败: {e}")
            import time
            time.sleep(2)

    return False

def main():
    print("=" * 60)
    print("OpenClawFreeModelVideo 音频生成（普通人也能用好 OpenClaw（龙虾）—— 白嫖大模型）")
    print("=" * 60)

    success_count = 0
    skipped_count = 0
    failed_count = 0

    for scene_id, scene in SCENES.items():
        caption_file = OUTPUT_DIR / scene["caption_file"]
        output_file = OUTPUT_DIR / scene["output_file"]

        print(f"\n📝 [{scene_id}] {scene['name']}")

        # 跳过已存在的音频（强制重新生成的场景除外）
        if output_file.exists():
            if scene_id in FORCE_REGENERATE:
                print(f"  🔄 字幕已更新，强制重新生成: {output_file.name}")
                output_file.unlink()
            else:
                print(f"  ⏭️  已存在，跳过: {output_file.name}")
                skipped_count += 1
                continue

        # 读取字幕文本
        if not caption_file.exists():
            print(f"  ❌ 字幕文件不存在: {caption_file}")
            failed_count += 1
            continue

        text = load_captions_text(caption_file)
        print(f"  📄 文本: {text[:60]}{'...' if len(text) > 60 else ''}")

        if generate_audio(text, output_file):
            success_count += 1
        else:
            failed_count += 1

    print("\n" + "=" * 60)
    print("音频生成完成！")
    print(f"✅ 成功: {success_count}")
    print(f"⏭️  跳过: {skipped_count}")
    print(f"❌ 失败: {failed_count}")
    print("=" * 60)

if __name__ == "__main__":
    main()
