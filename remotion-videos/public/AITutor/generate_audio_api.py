#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI私人老师视频音频生成脚本（技能九）- API版本
使用HTTP API从字幕文件生成音频，无需本地模型
"""

import os
import asyncio
import aiohttp
import json
from pathlib import Path

# API配置
API_URL = "https://audio.htapi.net/pulse/v1/tts"
API_KEYS = [
    "sk-4e7c74f9c0e545f6a1c6a11c66f0c62d",
    "sk-7cc03a75f6eb46b097c7bc6c80e4bf07",
    "sk-a3f0d2dc42a94a9f96e8db9f42d2e38c",
    "sk-0b1c9a8fe7b34f3c8c3a9e7e6b4c8d7e"
]

# 参考语音文本
REFERENCE_TEXT = "5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。"

# 脚本所在目录（public/AITutor）
SCRIPT_DIR = Path(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = SCRIPT_DIR

# 场景配置：从字幕文件读取文本
SCENES = {
    "scene1": {"name": "开场痛点",         "caption_file": "scene1-captions.json", "output_file": "scene1-audio.mp3"},
    "scene2": {"name": "为什么AI是最好老师", "caption_file": "scene2-captions.json", "output_file": "scene2-audio.mp3"},
    "scene3": {"name": "第一步告诉AI",      "caption_file": "scene3-captions.json", "output_file": "scene3-audio.mp3"},
    "scene4": {"name": "第二步调整难度",    "caption_file": "scene4-captions.json", "output_file": "scene4-audio.mp3"},
    "scene5": {"name": "第三步边走边听",    "caption_file": "scene5-captions.json", "output_file": "scene5-audio.mp3"},
    "scene6": {"name": "成长伙伴",          "caption_file": "scene6-captions.json", "output_file": "scene6-audio.mp3"},
    "scene7": {"name": "九技能总结",        "caption_file": "scene7-captions.json", "output_file": "scene7-audio.mp3"},
    "ending": {"name": "结尾",              "caption_file": "ending-captions.json", "output_file": "ending-audio.mp3"},
}

def load_captions_text(caption_file: Path) -> str:
    """从字幕文件读取并拼接所有文本"""
    with open(caption_file, "r", encoding="utf-8") as f:
        captions = json.load(f)
    return "".join(item["text"] for item in captions)

async def generate_audio(session: aiohttp.ClientSession, api_key: str, text: str, output_path: Path) -> bool:
    """使用API生成单个音频文件"""
    try:
        payload = {
            "tts_item": {
                "text": text,
                "voice_id": "vd_1d38d0d2c3cb47e6adcdcf524e0c3e2b",
                "identifier": str(output_path.absolute())
            },
            "api_key": api_key,
            "reference_text": REFERENCE_TEXT
        }
        
        async with session.post(API_URL, json=payload) as response:
            if response.status == 200:
                data = await response.json()
                audio_url = data.get("data", {}).get("audio_url")
                
                if audio_url:
                    async with session.get(audio_url) as audio_response:
                        if audio_response.status == 200:
                            content = await audio_response.read()
                            output_path.parent.mkdir(parents=True, exist_ok=True)
                            with open(output_path, 'wb') as f:
                                f.write(content)
                            print(f"  ✅ 生成成功: {output_path.name}")
                            return True
            
            print(f"  ❌ 生成失败: {output_path.name} - 状态码: {response.status}")
            return False
            
    except Exception as e:
        print(f"  ❌ 生成失败: {output_path.name} - 错误: {str(e)}")
        return False

async def main():
    print("=" * 60)
    print("AI私人老师视频音频生成（技能九）- API版本")
    print("=" * 60)

    success_count = 0
    skipped_count = 0
    failed_count = 0
    
    # 收集需要生成的任务
    tasks = []
    task_info = []

    for scene_id, scene in SCENES.items():
        caption_file = OUTPUT_DIR / scene["caption_file"]
        output_file = OUTPUT_DIR / scene["output_file"]

        print(f"\n📝 [{scene_id}] {scene['name']}")

        # 跳过已存在的音频
        if output_file.exists():
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
        
        tasks.append((text, output_file))
        task_info.append((scene_id, scene['name']))

    # 异步生成音频
    if tasks:
        async with aiohttp.ClientSession() as session:
            print(f"\n🎙️ 开始生成 {len(tasks)} 个音频文件...")
            
            for i, (text, output_path) in enumerate(tasks):
                api_key = API_KEYS[i % len(API_KEYS)]
                scene_id, scene_name = task_info[i]
                
                print(f"\n[{scene_id}] {scene_name}")
                if await generate_audio(session, api_key, text, output_path):
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
    asyncio.run(main())
