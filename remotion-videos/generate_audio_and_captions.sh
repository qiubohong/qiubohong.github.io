#!/bin/bash

# 激活函数视频音频生成一键脚本
# 自动安装依赖、生成音频、生成字幕

set -e  # 遇到错误立即退出

echo "=========================================="
echo "激活函数视频音频生成工具"
echo "=========================================="
echo ""

# 检查Python是否安装
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: 未找到 python3，请先安装 Python 3"
    exit 1
fi

echo "✓ Python 3 已安装"

# 检查pip是否安装
if ! command -v pip3 &> /dev/null; then
    echo "❌ 错误: 未找到 pip3，请先安装 pip"
    exit 1
fi

echo "✓ pip3 已安装"
echo ""

# 安装edge-tts
echo "步骤 1/3: 安装 edge-tts..."
echo "----------------------------------------"
if pip3 show edge-tts &> /dev/null; then
    echo "✓ edge-tts 已安装"
else
    echo "正在安装 edge-tts..."
    pip3 install edge-tts
    echo "✓ edge-tts 安装完成"
fi
echo ""

# 生成音频文件
echo "步骤 2/3: 生成音频文件..."
echo "----------------------------------------"
python3 generate_audio.py
echo ""

# 检查音频文件是否生成成功
AUDIO_DIR="public/ActivationVideo"
AUDIO_COUNT=$(ls -1 ${AUDIO_DIR}/scene*-audio.mp3 2>/dev/null | wc -l)

if [ "$AUDIO_COUNT" -eq 6 ]; then
    echo "✓ 所有6个音频文件已生成"
else
    echo "⚠️  警告: 只生成了 $AUDIO_COUNT 个音频文件（预期6个）"
fi
echo ""

# 生成字幕文件
echo "步骤 3/3: 生成字幕文件..."
echo "----------------------------------------"
echo "正在使用 Remotion 生成字幕..."
echo ""

# 检查是否安装了remotion
if ! command -v npx &> /dev/null; then
    echo "❌ 错误: 未找到 npx，请先安装 Node.js"
    exit 1
fi

# 生成每个场景的字幕
for i in {1..6}; do
    AUDIO_FILE="ActivationVideo/scene${i}-audio.mp3"
    CAPTION_FILE="ActivationVideo/scene${i}-captions.json"
    
    echo "正在生成 scene${i} 的字幕..."
    
    if npx remotion transcribe "$AUDIO_FILE" "$CAPTION_FILE" 2>/dev/null; then
        echo "✓ scene${i}-captions.json 生成完成"
    else
        echo "⚠️  scene${i} 字幕生成失败（可能需要手动生成）"
    fi
done

echo ""
echo "=========================================="
echo "✓ 音频和字幕生成完成！"
echo "=========================================="
echo ""

# 显示生成的文件
echo "生成的文件："
echo ""
echo "音频文件："
for i in {1..6}; do
    FILE="${AUDIO_DIR}/scene${i}-audio.mp3"
    if [ -f "$FILE" ]; then
        SIZE=$(du -h "$FILE" | cut -f1)
        echo "  ✓ scene${i}-audio.mp3 ($SIZE)"
    fi
done

echo ""
echo "字幕文件："
for i in {1..6}; do
    FILE="${AUDIO_DIR}/scene${i}-captions.json"
    if [ -f "$FILE" ]; then
        echo "  ✓ scene${i}-captions.json"
    else
        echo "  ⚠️  scene${i}-captions.json (未生成)"
    fi
done

echo ""
echo "=========================================="
echo "下一步操作："
echo "=========================================="
echo ""
echo "1. 检查音频质量："
echo "   open ${AUDIO_DIR}/scene1-audio.mp3"
echo ""
echo "2. 调整场景时长（根据实际音频时长）："
echo "   编辑 src/ActivationFunctionVideo.tsx"
echo ""
echo "3. 预览视频："
echo "   npm start"
echo ""
echo "4. 渲染视频："
echo "   npx remotion render ActivationFunctionVideo out/activation-function.mp4"
echo ""
echo "详细说明请查看 AUDIO_GENERATION_GUIDE.md"
echo ""
