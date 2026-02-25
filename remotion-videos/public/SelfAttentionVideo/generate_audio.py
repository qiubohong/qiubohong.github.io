#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自我注意力机制视频音频生成脚本
使用字幕模式从字幕文件生成音频
"""

import os
import sys

# 获取项目根目录（remotion-videos）
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, project_root)

from audio_generator import AudioGenerator, AudioGeneratorConfig

def main():
    print("=" * 60)
    print("自我注意力机制视频音频生成")
    print("=" * 60)
    
    # 配置
    config = AudioGeneratorConfig(
        video_name="SelfAttentionVideo",
        output_dir="./public/SelfAttentionVideo",
        model_path="./Qwen3-TTS-12Hz-1.7B-Base",
        reference_audio="./borfy.mp3",
        reference_text="5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。",
        mode="caption"  # 使用字幕模式
    )
    
    # 场景配置
    scenes = {
        "scene1": {
            "name": "开场引入",
            "output_file": "scene1-audio.mp3",
            "caption_file": "scene1-captions.json"
        },
        "scene2": {
            "name": "应用场景",
            "output_file": "scene2-audio.mp3",
            "caption_file": "scene2-captions.json"
        },
        "scene3": {
            "name": "核心概念",
            "output_file": "scene3-audio.mp3",
            "caption_file": "scene3-captions.json"
        },
        "scene4": {
            "name": "工作流程",
            "output_file": "scene4-audio.mp3",
            "caption_file": "scene4-captions.json"
        },
        "scene5": {
            "name": "核心公式",
            "output_file": "scene5-audio.mp3",
            "caption_file": "scene5-captions.json"
        },
        "scene6": {
            "name": "工作原理示例",
            "output_file": "scene6-audio.mp3",
            "caption_file": "scene6-captions.json"
        },
        "scene7": {
            "name": "多头注意力",
            "output_file": "scene7-audio.mp3",
            "caption_file": "scene7-captions.json"
        },
        "scene8": {
            "name": "与传统方法对比",
            "output_file": "scene8-audio.mp3",
            "caption_file": "scene8-captions.json"
        },
        "scene9": {
            "name": "总结与展望",
            "output_file": "scene9-audio.mp3",
            "caption_file": "scene9-captions.json"
        }
    }
    
    # 创建生成器并生成音频
    generator = AudioGenerator(config)
    success_count, skipped_count, failed_count = generator.generate_from_config(scenes)
    
    print("\n" + "=" * 60)
    print("音频生成完成！")
    print(f"✅ 成功: {success_count}")
    print(f"⏭️  跳过: {skipped_count}")
    print(f"❌ 失败: {failed_count}")
    print("=" * 60)

if __name__ == "__main__":
    main()
