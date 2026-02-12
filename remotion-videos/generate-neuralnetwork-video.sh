#!/bin/bash
# 神经网络视频生成快速启动脚本

set -e  # 遇到错误立即退出

echo "=========================================="
echo "  神经网络视频生成工具"
echo "=========================================="
echo ""

# 检查 Python 环境
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: 未找到 python3，请先安装 Python 3"
    exit 1
fi

# 检查 Node.js 环境
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm，请先安装 Node.js"
    exit 1
fi

# 步骤1: 生成音频文件
echo "📢 步骤1: 生成音频文件..."
echo ""
python3 generate-neuralnetwork-audio.py

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 音频生成失败，请检查错误信息"
    exit 1
fi

echo ""
echo "✅ 音频文件生成成功！"
echo ""

# 询问用户是否预览
read -p "是否启动预览服务器？(y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 启动预览服务器..."
    echo "   浏览器将打开 http://localhost:3000"
    echo "   选择 'NeuralNetworkVideo' 进行预览"
    echo ""
    echo "   按 Ctrl+C 停止服务器"
    echo ""
    npm run dev
else
    echo ""
    echo "跳过预览，您可以稍后运行以下命令："
    echo "  npm run dev          # 预览视频"
    echo "  npm run render NeuralNetworkVideo  # 渲染视频"
    echo ""
fi

echo ""
echo "=========================================="
echo "  完成！"
echo "=========================================="