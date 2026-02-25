#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Transformer视频音频生成脚本
"""

import sys
from pathlib import Path
from audio_generator import AudioGenerator, AudioGeneratorConfig, check_dependencies

def main():
    print("=" * 60)
    print("Transformer视频音频生成")
    print("=" * 60)
    
    # 检查依赖
    if not check_dependencies():
        sys.exit(1)
    
    # 配置
    config = AudioGeneratorConfig(
        video_name="TransformerVideo",
        output_dir="public/TransformerVideo",
        model_path="./Qwen3-TTS-12Hz-1.7B-Base",
        reference_audio="./borfy.mp3",
        reference_text="5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。",
        mode="caption"  # 使用字幕模式
    )
    
    # 场景配置
    scenes = {
        "scene1": {
            "name": "开场引入",
            "caption_file": "scene1-captions.json",
            "output_file": "scene1-audio.mp3"
        },
        "scene2": {
            "name": "核心概念",
            "caption_file": "scene2-captions.json",
            "output_file": "scene2-audio.mp3"
        },
        "scene3": {
            "name": "结构解析",
            "caption_file": "scene3-captions.json",
            "output_file": "scene3-audio.mp3"
        },
        "scene4": {
            "name": "技术创新",
            "caption_file": "scene4-captions.json",
            "output_file": "scene4-audio.mp3"
        },
        "scene5": {
            "name": "行业应用",
            "caption_file": "scene5-captions.json",
            "output_file": "scene5-audio.mp3"
        },
        "scene6": {
            "name": "冷知识",
            "caption_file": "scene6-captions.json",
            "output_file": "scene6-audio.mp3"
        },
        "scene7": {
            "name": "结尾",
            "caption_file": "scene7-captions.json",
            "output_file": "scene7-audio.mp3"
        }
    }
    
    # 创建生成器
    generator = AudioGenerator(config)
    
    # 生成音频
    print("\n🎬 开始生成音频...")
    success_count, skipped_count, failed_count = generator.generate_from_config(scenes)
    
    # 输出统计
    print("\n" + "=" * 60)
    print("📊 生成统计:")
    print(f"   ✅ 成功: {success_count}")
    print(f"   ⏭️  跳过: {skipped_count}")
    print(f"   ❌ 失败: {failed_count}")
    print("=" * 60)
    
    if failed_count > 0:
        print("\n⚠️  部分音频生成失败，请检查错误信息")
        sys.exit(1)
    else:
        print("\n✅ 所有音频生成完成！")
        print("\n💡 下一步:")
        print("   1. 使用 audio-duration-calculator 计算音频时长")
        print("   2. 更新视频组件的帧数")
        print("   3. 运行 npm run build 构建视频")

if __name__ == "__main__":
    main()
