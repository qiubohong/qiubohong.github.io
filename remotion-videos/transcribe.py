#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MP3 转 Remotion 字幕 JSON 工具
基于 whisper-timestamped 实现逐字时间戳对齐

安装依赖：
    pip install whisper-timestamped
    brew install ffmpeg  # Mac
    choco install ffmpeg  # Windows
"""

import json
import os
import sys
from pathlib import Path


def mp3_to_remotion_json(audio_path: str, output_json: str, model_size: str = "base", language: str = "zh"):
    """
    将 MP3 音频转换为 Remotion 字幕 JSON 文件

    Args:
        audio_path:  输入音频文件路径（支持 mp3/wav/m4a 等格式）
        output_json: 输出 JSON 文件路径
        model_size:  Whisper 模型大小，可选 tiny/base/small/medium/large
                     - base/small：速度快，适合普通场景
                     - medium/large：精度高，适合背景音嘈杂的场景
        language:    语言代码，中文传 "zh"，英文传 "en"，None 则自动检测
    """
    try:
        import whisper_timestamped as whisper
    except ImportError:
        print("❌ 缺少依赖：whisper-timestamped")
        print("   请运行：pip install whisper-timestamped")
        sys.exit(1)

    if not os.path.exists(audio_path):
        print(f"❌ 找不到音频文件：{audio_path}")
        sys.exit(1)

    # 1. 加载模型
    print(f"⏳ 正在加载 Whisper 模型（{model_size}）...")
    # 有 NVIDIA 显卡可将 device 改为 "cuda"，速度提升 10 倍以上
    model = whisper.load_model(model_size, device="cpu")

    # 2. 转录音频
    print(f"🎙️  正在转录音频：{audio_path} ...")
    result = whisper.transcribe(model, audio_path, language=language)

    # 3. 提取 Remotion 所需结构
    formatted_data = []

    for segment in result["segments"]:
        sentence_data = {
            "text": segment["text"].strip(),
            "start": round(segment["start"], 3),
            "end": round(segment["end"], 3),
            "words": [],
        }

        # 提取逐字时间戳
        for word in segment.get("words", []):
            # 去除标点符号附着（whisper-timestamped 有时会将标点附在字后）
            clean_word = word["text"].strip(",.，。！？!?、；;：:")
            if not clean_word:
                continue
            sentence_data["words"].append({
                "word": clean_word,
                "start": round(word["start"], 3),
                "end": round(word["end"], 3),
            })

        formatted_data.append(sentence_data)

    # 4. 保存为 JSON
    output_path = Path(output_json)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(formatted_data, f, ensure_ascii=False, indent=2)

    print(f"✅ 转换完成！共 {len(formatted_data)} 条字幕")
    print(f"📄 文件已保存至：{output_json}")
    return formatted_data


def print_preview(data: list, max_items: int = 3):
    """打印前几条字幕预览"""
    print("\n📋 字幕预览（前 {} 条）：".format(min(max_items, len(data))))
    print("-" * 60)
    for i, item in enumerate(data[:max_items]):
        print(f"[{item['start']:.2f}s → {item['end']:.2f}s] {item['text']}")
        if item["words"]:
            words_preview = " | ".join(
                f"{w['word']}({w['start']:.2f}s)" for w in item["words"][:5]
            )
            print(f"  逐字：{words_preview}{'...' if len(item['words']) > 5 else ''}")
    print("-" * 60)


def main():
    """命令行入口"""
    import argparse

    parser = argparse.ArgumentParser(
        description="MP3 转 Remotion 字幕 JSON 工具",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
使用示例：
  python transcribe.py audio.mp3
  python transcribe.py audio.mp3 -o captions.json
  python transcribe.py audio.mp3 -m medium -l zh
  python transcribe.py audio.mp3 -o src/captions/scene1.json
        """,
    )
    parser.add_argument("audio", help="输入音频文件路径（mp3/wav/m4a 等）")
    parser.add_argument(
        "-o", "--output",
        default=None,
        help="输出 JSON 文件路径（默认与音频同名，后缀改为 .json）",
    )
    parser.add_argument(
        "-m", "--model",
        default="base",
        choices=["tiny", "base", "small", "medium", "large"],
        help="Whisper 模型大小（默认：base）",
    )
    parser.add_argument(
        "-l", "--language",
        default="zh",
        help="语言代码，如 zh（中文）、en（英文），默认 zh",
    )
    parser.add_argument(
        "--preview",
        action="store_true",
        help="转换完成后打印字幕预览",
    )

    args = parser.parse_args()

    # 自动生成输出路径
    if args.output is None:
        audio_path = Path(args.audio)
        args.output = str(audio_path.with_suffix(".json"))

    data = mp3_to_remotion_json(
        audio_path=args.audio,
        output_json=args.output,
        model_size=args.model,
        language=args.language,
    )

    if args.preview and data:
        print_preview(data)


if __name__ == "__main__":
    main()
