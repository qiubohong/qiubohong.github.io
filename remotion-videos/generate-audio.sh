#!/bin/bash

# 监督学习动画视频 - Qwen3-TTS音频生成脚本
# 一键生成所有场景的高质量解说音频

echo "🎵 监督学习动画视频 - Qwen3-TTS音频生成工具"
echo "================================================"
echo "🤖 使用Qwen3-TTS模型生成高质量语音解说"
echo "🎯 每个场景包含定制化的语音风格"
echo "================================================"

# 检查Python环境
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3未安装，请先安装Python3"
    exit 1
fi

echo "✅ Python3已安装"

# 检查依赖
if [ ! -f "requirement.txt" ]; then
    echo "❌ requirement.txt文件不存在"
    exit 1
fi

echo "📋 安装Qwen3-TTS依赖包..."

# 先安装基础依赖（不含flash-attn）
echo "🔧 安装基础依赖..."
pip3 install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm -i https://pypi.tuna.tsinghua.edu.cn/simple

if [ $? -ne 0 ]; then
    echo "⚠️  尝试使用默认源安装基础依赖..."
    pip3 install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm
    
    if [ $? -ne 0 ]; then
        echo "❌ 基础依赖安装失败，请检查网络连接"
        exit 1
    fi
fi

echo "✅ 基础依赖安装完成"

# 尝试安装flash-attn（可选加速包）
# echo "🚀 尝试安装Flash Attention加速包..."
# pip3 install flash-attn --no-build-isolation -i https://pypi.tuna.tsinghua.edu.cn/simple

# if [ $? -eq 0 ]; then
#     echo "✅ Flash Attention安装成功，性能优化已启用"
# else
#     echo "⚠️  Flash Attention安装失败，将使用标准注意力机制"
#     echo "💡 这不会影响基本功能，但性能可能稍慢"
# fi

echo "✅ Qwen3-TTS依赖安装完成"

# 创建public目录（如果不存在）
mkdir -p public

echo "🎬 开始使用Qwen3-TTS生成音频..."

# 运行Python脚本
python3 tts.py

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Qwen3-TTS音频生成完成！"
    echo "📁 音频文件位置: public/"
    echo ""
    echo "🎯 下一步操作:"
    echo "   1. 运行 'npm start' 预览视频效果"
    echo "   2. 运行 'npm run build' 渲染最终视频"
    echo ""
    echo "💡 技术特点:"
    echo "   • 使用Qwen3-TTS 1.7B模型"
    echo "   • 支持语音风格定制"
    echo "   • 自动时长和音量优化"
    echo ""
    echo "📊 生成的音频文件列表:"
    ls -la public/*.mp3 2>/dev/null || echo "   暂无音频文件"
else
    echo "❌ 音频生成失败"
    exit 1
fi