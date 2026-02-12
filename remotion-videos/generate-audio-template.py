#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
示例：使用通用音频生成工具为新视频生成音频

这个脚本展示了如何使用 audio_generator.py 为任意视频生成音频。
支持两种模式：
1. 文本模式：直接提供文本内容
2. 字幕模式：从字幕JSON文件读取文本

使用方法：
1. 复制这个文件并重命名（如 generate-myvideo-audio.py）
2. 修改 VIDEO_NAME 和 OUTPUT_DIR
3. 修改 SCENES 配置
4. 运行脚本：python3 generate-myvideo-audio.py
"""

import sys
from audio_generator import AudioGenerator, AudioGeneratorConfig, check_dependencies

# ============================================================================
# 配置区域 - 根据你的视频修改以下内容
# ============================================================================

# 视频名称
VIDEO_NAME = "MyVideo"

# 输出目录
OUTPUT_DIR = "public/MyVideo"

# 生成模式：
# - "text": 文本模式，直接从配置的文本生成音频
# - "caption": 字幕模式，从字幕JSON文件读取文本生成音频
MODE = "text"  # 或 "caption"

# 场景配置
# 文本模式示例：
SCENES_TEXT_MODE = {
    "scene1": {
        "name": "场景1名称",
        "text": "这是场景1的文本内容...",
        "output_file": "scene1-audio.mp3",
        "caption_file": "scene1-captions.json"  # 可选，不指定则自动生成
    },
    "scene2": {
        "name": "场景2名称",
        "text": "这是场景2的文本内容...",
        "output_file": "scene2-audio.mp3",
        "caption_file": "scene2-captions.json"
    },
    # 添加更多场景...
}

# 字幕模式示例：
SCENES_CAPTION_MODE = {
    "scene1": {
        "name": "场景1名称",
        "caption_file": "scene1-captions.json",  # 相对于 OUTPUT_DIR 的路径
        "output_file": "scene1-audio.mp3"
    },
    "scene2": {
        "name": "场景2名称",
        "caption_file": "scene2-captions.json",
        "output_file": "scene2-audio.mp3"
    },
    # 添加更多场景...
}

# 根据模式选择场景配置
SCENES = SCENES_TEXT_MODE if MODE == "text" else SCENES_CAPTION_MODE

# TTS模型路径（通常不需要修改）
MODEL_PATH = "./Qwen3-TTS-12Hz-1.7B-Base"

# 参考音频路径（用于克隆语音风格）
REFERENCE_AUDIO = "./borfy.mp3"

# 参考文本（与参考音频对应的文本）
REFERENCE_TEXT = "5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。"

# ============================================================================
# 主程序 - 通常不需要修改
# ============================================================================

def main():
    """生成所有场景的音频文件"""
    
    print("=" * 60)
    print(f"{VIDEO_NAME} 音频生成工具")
    print("=" * 60)
    print("🤖 使用Qwen3-TTS模型生成高质量语音解说")
    print(f"🎯 模式：{'文本模式（自动生成字幕）' if MODE == 'text' else '字幕模式（更新时间戳）'}")
    print("📝 字幕规则：按句子分割，一行一行显示")
    print("=" * 60)
    
    # 检查依赖
    if not check_dependencies():
        print("\n❌ 依赖检查失败，请先安装必要的依赖包")
        sys.exit(1)
    
    # 创建配置
    config = AudioGeneratorConfig(
        video_name=VIDEO_NAME,
        output_dir=OUTPUT_DIR,
        model_path=MODEL_PATH,
        reference_audio=REFERENCE_AUDIO,
        reference_text=REFERENCE_TEXT,
        mode=MODE
    )
    
    # 创建生成器
    generator = AudioGenerator(config)
    
    # 生成音频
    print(f"\n开始生成 {len(SCENES)} 个场景的音频...")
    success_count, skipped_count, failed_count = generator.generate_from_config(SCENES)
    
    # 输出结果
    print(f"\n📊 生成结果:")
    print(f"   总场景数: {len(SCENES)}")
    print(f"   成功处理: {success_count}/{len(SCENES)}")
    print(f"   使用已存在音频: {skipped_count}")
    print(f"   新生成音频: {success_count - skipped_count}")
    print(f"   失败: {failed_count}")
    
    if success_count == len(SCENES):
        print("\n🎉 所有音频文件生成完成！")
        print(f"📁 音频文件位置: {config.output_dir}/")
        if skipped_count > 0:
            print(f"💡 跳过了 {skipped_count} 个已存在的音频文件")
        print("\n下一步:")
        print("1. 检查生成的音频文件")
        print("2. 运行 'npm run dev' 预览视频")
        print(f"3. 运行 'npm run render {VIDEO_NAME}' 渲染视频")
        sys.exit(0)
    else:
        print("\n⚠️  部分音频生成失败，请检查错误信息")
        print("\n💡 常见问题：")
        print("   1. 检查模型路径是否正确")
        print("   2. 检查参考音频文件是否存在")
        print("   3. 检查文本内容是否过长（建议<200字符）")
        print("   4. 检查字幕文件格式是否正确（字幕模式）")
        sys.exit(1)


if __name__ == "__main__":
    main()