#!/usr/bin/env python3
"""
Reflection 视频音频生成脚本
使用 Qwen3-TTS 模型生成高质量场景解说音频
"""

import os
import sys
from pathlib import Path
import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel
import librosa
import numpy as np
from tqdm import tqdm

# 音频文案（已去除AI味道）
AUDIO_SCRIPTS = {
    "scene1": "之前我们学了 ReAct，让 AI 边想边做。今天学另一个神奇模式：Reflection！让 AI 学会自我检讨，做完任务回头看看哪里可以改进。",
    
    "scene2": "Reflection 的核心流程就三步：生成、反思、优化。就像写代码：写完跑一下，发现报错，回头改改再跑。看图，这是完整的工作循环。",
    
    "scene3": "最简单的实现就是两次调用模型。第一次生成答案，第二次让它反思，第三次根据反思优化。核心就是一个循环：生成、反思、优化。",
    
    "scene4": "来看实战案例：用 Reflection 模式让 AI 写代码。先生成一版，然后自我审查找出问题，最后重写优化。看，AI 正在给自己的代码做 code review！",
    
    "scene5": "分享几个冷知识。第一，Reflection 和 ReAct 是绝配，一个负责过程中思考，一个负责结果复盘。第二，理论基础来自 2023 年 Self-Refine 论文。第三，LangChain 有现成实现。第四，简单任务不必反思，复杂任务才值得。第五，反思也可以外包给另一个 AI。",
    
    "ending": "5分钟AI，每天搞懂一个知识点！你觉得 Reflection 模式会让 AI 变得更加靠谱吗？评论区聊聊！"
}

# Qwen3-TTS 模型实例（单例）
_qwen_model = None

# 模型路径（相对于项目根目录）
MODEL_BASE_DIR = Path(__file__).parent.parent.parent  # remotion-videos 目录
MODEL_PATH = MODEL_BASE_DIR / "Qwen3-TTS-12Hz-1.7B-Base"
REF_AUDIO_PATH = MODEL_BASE_DIR / "borfy.mp3"


def get_qwen_model():
    """获取或初始化 Qwen3-TTS 模型"""
    global _qwen_model
    if _qwen_model is None:
        try:
            print(f"🔧 加载 Qwen3-TTS 模型: {MODEL_PATH}")
            _qwen_model = Qwen3TTSModel.from_pretrained(
                pretrained_model_name_or_path=str(MODEL_PATH),
                device_map="auto",
                torch_dtype=torch.bfloat16,
                low_cpu_mem_usage=True,
            )
            print("✅ Qwen3-TTS 模型加载完成")
        except Exception as e:
            print(f"❌ Qwen3-TTS 模型加载失败: {e}")
            return None
    return _qwen_model


def generate_tts_audio(text: str, output_path: str) -> bool:
    """使用 Qwen3-TTS 生成音频"""
    max_retries = 3

    for attempt in range(max_retries):
        model = get_qwen_model()
        if model is None:
            return False

        print(f"🔄 尝试生成语音 (第{attempt + 1}次)...")

        try:
            wavs, sr = model.generate_voice_clone(
                ref_audio=str(REF_AUDIO_PATH),
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

            # 保存原始音频
            sf.write(output_path, wavs[0], sr)

            # 音频后处理
            try:
                audio, sr_loaded = librosa.load(output_path, sr=None)
                audio_duration = len(audio) / sr_loaded
                print(f"📊 音频时长: {audio_duration:.2f}秒")

                # 超过30秒则裁剪
                if audio_duration > 30:
                    print("⚠️  音频过长，进行裁剪...")
                    audio = audio[:int(30 * sr_loaded)]
                    print(f"✓ 裁剪后时长: {len(audio) / sr_loaded:.2f}秒")

                # 音量标准化
                audio_normalized = librosa.util.normalize(audio) * 0.7
                audio_filtered = librosa.effects.preemphasis(audio_normalized, coef=0.97)
                sf.write(output_path, audio_filtered, sr_loaded)
                print(f"✓ 音频后处理完成")

                if audio_duration < 1.0:
                    print("⚠️  音频过短，可能生成失败，重试...")
                    continue

            except Exception as e:
                print(f"⚠️  音频后处理失败，但原始音频已保存: {e}")

            print(f"✅ 已生成: {output_path}")
            return True

        except Exception as e:
            print(f"❌ 第{attempt + 1}次生成失败: {e}")
            if attempt < max_retries - 1:
                import time
                print("🔄 等待2秒后重试...")
                time.sleep(2)

    return False


def check_dependencies() -> bool:
    """检查依赖是否安装"""
    required = ["torch", "soundfile", "qwen_tts", "librosa", "numpy", "tqdm"]
    missing = []
    print("🔍 检查依赖包...")
    for pkg in required:
        try:
            __import__(pkg)
            print(f"  ✓ {pkg}")
        except ImportError:
            missing.append(pkg)
            print(f"  ✗ {pkg}")

    if missing:
        print(f"\n❌ 缺少依赖: {', '.join(missing)}")
        print("💡 请运行: pip install -r requirement.txt")
        return False

    if torch.cuda.is_available():
        print(f"🎮 GPU: {torch.cuda.get_device_name(0)}")
    else:
        print("⚠️  GPU 不可用，将使用 CPU（速度较慢）")

    # 检查模型路径
    if not MODEL_PATH.exists():
        print(f"❌ 模型路径不存在: {MODEL_PATH}")
        print("💡 请先下载模型到项目根目录")
        return False

    if not REF_AUDIO_PATH.exists():
        print(f"❌ 参考音频不存在: {REF_AUDIO_PATH}")
        print("💡 请将 borfy.mp3 放到 remotion-videos/ 目录下")
        return False

    return True


def main():
    """主函数"""
    output_dir = Path(__file__).parent

    print("=" * 50)
    print("Reflection 视频音频生成")
    print("=" * 50)

    if not check_dependencies():
        sys.exit(1)

    success_count = 0

    for scene, text in tqdm(AUDIO_SCRIPTS.items(), desc="生成音频"):
        output_path = str(output_dir / f"{scene}-audio.mp3")
        print(f"\n📝 场景: {scene}")
        print(f"   文本: {text[:50]}...")

        if generate_tts_audio(text, output_path):
            success_count += 1
        else:
            print(f"✗ 生成失败: {output_path}")

    print("\n" + "=" * 50)
    print(f"生成完成: {success_count}/{len(AUDIO_SCRIPTS)}")
    print("=" * 50)

    if success_count == len(AUDIO_SCRIPTS):
        print("🎉 所有音频生成完成！")
        print("🎬 现在可以运行 'npm start' 预览视频效果")
    else:
        print("⚠️  部分音频生成失败，请检查错误信息")

    sys.exit(0 if success_count == len(AUDIO_SCRIPTS) else 1)


if __name__ == "__main__":
    main()
