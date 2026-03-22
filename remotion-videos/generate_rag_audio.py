#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
RAG视频音频生成脚本
生成9个场景的MP3音频文件
"""

import os
import asyncio
import aiohttp
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

# 配音文案 - 各场景的音频内容
VOCAL_TEXTS = [
    # Scene 1 - Intro
    "今天我们来学习检索增强生成，简称RAG。想象一下，大模型参加开卷考试，RAG就是它的知识库。让AI既懂推理，又能查资料，知识永远不会过期。",
    
    # Scene 2 - Value
    "为什么需要RAG？大模型有知识截止的局限，也不了解企业私有数据。RAG通过实时从外部知识库检索信息，与模型能力结合，完美解决了这些问题。",
    
    # Scene 3 - Architecture
    "RAG系统架构分为离线阶段和在线阶段。离线阶段构建知识库，在线阶段实时检索回答，两个流程协同工作。",
    
    # Scene 4 - Flow
    "离线阶段包括文本分割、向量化和存储。在线阶段包括查询向量化、相似度检索和增强生成。流程清晰，分工明确。",
    
    # Scene 5 - Embedding
    "知识库构建的核心是文本向量化。将文档切分成固定长度的文本块，使用嵌入模型转换为高维向量，存储到向量数据库中。",
    
    # Scene 6 - Search
    "检索系统使用语义搜索技术。将用户查询向量化，利用余弦相似度在向量数据库中搜索，返回最相关的Top-K个文本块。",
    
    # Scene 7 - Example
    "来看一个实战案例，企业知识库问答系统。使用LangChain框架，只需几步代码就能构建完整的RAG应用，加载文档、创建向量库、配置检索器和问答链。",
    
    # Scene 8 - Comparison
    "RAG与微调方法应该如何选择？RAG适合实时准确的知识问答，成本低且可追溯。微调适合提升深层能力，但成本高且知识静态。两者各有优势，可以结合使用。",
    
    # Scene 9 - Ending
    "今天我们学习了RAG完整技术栈，包括知识库构建、语义检索和大模型生成。RAG等于大模型的超级搜索技能，让AI拥有永不过期的记忆。"
]

# 输出目录
OUTPUT_DIR = Path("public/RAGVideo/audios")

async def generate_audio(session: aiohttp.ClientSession, api_key: str, text: str, output_file: Path) -> bool:
    """生成单个音频文件"""
    try:
        payload = {
            "tts_item": {
                "text": text,
                "voice_id": "vd_1d38d0d2c3cb47e6adcdcf524e0c3e2b",
                "identifier": str(output_file.absolute())
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
                            output_file.parent.mkdir(parents=True, exist_ok=True)
                            with open(output_file, 'wb') as f:
                                f.write(content)
                            print(f"✅ 生成成功: {output_file.name}")
                            return True
            
            print(f"❌ 生成失败: {output_file.name} - 状态码: {response.status}")
            return False
            
    except Exception as e:
        print(f"❌ 生成失败: {output_file.name} - 错误: {str(e)}")
        return False

async def main():
    """主函数"""
    print("🎙️ 生成RAG视频音频...")
    print(f"📁 输出目录: {OUTPUT_DIR.absolute()}")
    
    # 创建输出目录
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # 检查已有的音频文件，避免重复生成
    existing_files = list(OUTPUT_DIR.glob("scene*.mp3"))
    existing_names = {f.stem for f in existing_files}
    
    if existing_names:
        print(f"⚠️  跳过已存在的音频: {', '.join(sorted(existing_names))}")
    
    async with aiohttp.ClientSession() as session:
        tasks = []
        for i, text in enumerate(VOCAL_TEXTS, 1):
            output_file = OUTPUT_DIR / f"scene{i}.mp3"
            if output_file.stem in existing_names:
                continue
            api_key = API_KEYS[(i - 1) % len(API_KEYS)]
            task = generate_audio(session, api_key, text, output_file)
            tasks.append(task)
        
        if tasks:
            results = await asyncio.gather(*tasks, return_exceptions=True)
            success_count = sum(1 for r in results if r is True)
            print(f"\n✨ 完成! 成功生成 {success_count}/{len(tasks)} 个音频文件")
        else:
            print("\n✨ 所有音频文件已存在，无需生成")
    
    # 列出所有音频文件
    print(f"\n📂 输出目录中的音频文件:")
    for mp3_file in sorted(OUTPUT_DIR.glob("*.mp3")):
        size = mp3_file.stat().st_size / 1024  # KB
        print(f"   • {mp3_file.name} ({size:.1f} KB)")

if __name__ == "__main__":
    asyncio.run(main())
