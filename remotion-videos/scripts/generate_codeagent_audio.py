#!/usr/bin/env python3
"""
为 CodeAgent 视频生成所有场景的音频
使用 Qwen3-TTS 进行语音合成
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

# 项目路径
SCRIPT_DIR = Path(os.path.dirname(os.path.abspath(__file__))).parent
OUTPUT_DIR = SCRIPT_DIR / "public" / "CodeAgent21"

# 定义所有场景的文案
SCENES = {
    "scene1": """大家好！欢迎来到AI编程新视界！今天我们来认识一位程序员的新搭档——Code Agent！""",
    
    "scene2": """传统的代码工具就像一个简单的计算器，你需要明确告诉它每一步该怎么做。而Code Agent更像是一个真正的编程搭档，它能够理解上下文，主动提供智能建议。从简单的代码补全到复杂的架构设计，Code Agent都能帮上大忙！""",
    
    "scene3": """Code Agent由五大核心模块组成，像一个完整的开发团队。代码理解模块负责读懂你的意图，代码生成模块帮你写代码，代码优化模块提升代码质量。调试修复模块帮你解决错误，代码审查模块则扮演代码审核员的角色。""",
    
    "scene4": """Code Agent的工作流程分为七个阶段。首先是需求分析，然后是架构设计、代码生成、测试验证。如果测试失败，它会自动诊断问题并重新生成代码。经过代码优化和审查后，最终就能部署集成了！""",
    
    "scene5": """下面我们来看一个实际的代码示例。这段代码展示了如何使用Python结合GitHub Copilot API进行代码分析。首先导入必要的库，然后初始化Copilot分析器对象。接着可以调用分析函数，传入代码和需求，Copilot就会返回优化建议。""",
    
    "scene6": """市场上主流的Code Agent产品各有特色。GitHub Copilot由OpenAI Codex驱动，是最受欢迎的代码补全工具。Claude Code出自Anthropic，拥有强大的代码生成和对话能力。Cursor是AI-first代码编辑器，基于GPT-4深度集成。Tabnine则是本地优先的个人代码助手，支持多种IDE。""",
    
    "scene7": """今天我们一起学习了Code Agent的核心要点。它拥有代码理解、生成、优化、调试、审查五大核心能力。主流产品包括GitHub Copilot、Claude Code、Cursor等。让我们拥抱AI编程新时代，让Code Agent成为你的得力助手！""",
}

# Qwen3-TTS模型实例（单例）
_qwen_model = None

def get_qwen_model():
    """获取或初始化Qwen3-TTS模型"""
    global _qwen_model
    if _qwen_model is None:
        model_path = str(SCRIPT_DIR / "Qwen3-TTS-12Hz-1.7B-Base")
        print(f"🔧 加载Qwen3-TTS模型: {model_path}")
        _qwen_model = Qwen3TTSModel.from_pretrained(
            pretrained_model_name_or_path=model_path,
            device_map="auto",
            torch_dtype=torch.bfloat16,
            low_cpu_mem_usage=True,
        )
        print("✅ 模型加载完成")
    return _qwen_model

def generate_audio(text: str, output_path: Path, max_retries: int = 3) -> bool:
    """使用Qwen3-TTS生成音频"""
    ref_audio = str(SCRIPT_DIR / "borfy.mp3")

    for attempt in range(max_retries):
        try:
            print(f"  🔄 生成语音 (第{attempt + 1}次)...")
            model = get_qwen_model()
            wavs, sr = model.generate_voice_clone(
                ref_audio=ref_audio,
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
            sf.write(str(output_path), wavs[0], sr)

            # 后处理：音量标准化
            audio, sr_loaded = librosa.load(str(output_path), sr=None)
            duration = len(audio) / sr_loaded
            print(f"  📊 音频时长: {duration:.2f}秒")

            if duration < 1.0:
                print("  ⚠️  音频过短，重试...")
                continue

            if duration > 40:
                print("  ⚠️  音频过长，裁剪至40秒...")
                audio = audio[:int(40 * sr_loaded)]

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
    print("CodeAgent视频音频生成（5分钟AI系列）")
    print("=" * 60)

    # 确保输出目录存在
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    success_count = 0
    skipped_count = 0
    failed_count = 0

    for scene_id, text in SCENES.items():
        output_file = OUTPUT_DIR / f"{scene_id}.mp3"

        print(f"\n📝 [{scene_id}]")

        # 跳过已存在的音频
        if output_file.exists():
            print(f"  ⏭️  已存在，跳过: {output_file.name}")
            skipped_count += 1
            continue

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