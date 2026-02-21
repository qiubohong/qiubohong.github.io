# 损失函数视频音频生成工具

快速为损失函数视频生成所有音频文件的 Python 脚本（使用 Qwen3-TTS）。

## 🚀 快速开始

### 1. 安装依赖

```bash
pip3 install torch transformers accelerate qwen_tts soundfile librosa numpy tqdm
```

### 2. 准备参考音频

确保 `borfy.mp3` 文件存在于 `remotion-videos` 目录下（用于语音克隆）。

### 3. 生成音频

```bash
python3 generate_loss_function_audio.py
```

## 📁 生成的文件

- `public/LossFunctionVideo/scene1-audio.mp3` - 介绍（约 15 秒）
- `public/LossFunctionVideo/scene2-audio.mp3` - 定义（约 20 秒）
- `public/LossFunctionVideo/scene3-audio.mp3` - 分类（约 15 秒）
- `public/LossFunctionVideo/scene4-audio.mp3` - 函数前 3 个（约 20 秒）
- `public/LossFunctionVideo/scene5-audio.mp3` - 函数后 2 个（约 12 秒）
- `public/LossFunctionVideo/scene6-audio.mp3` - 黄金准则（约 15 秒）
- `public/LossFunctionVideo/scene7-audio.mp3` - 冷知识（约 20 秒）
- `public/scene8-ending.mp3` - 结尾（约 6 秒）

## ⚙️ 自定义配置

编辑脚本中的以下参数：

```python
# 参考音频配置
ref_audio="./borfy.mp3"
ref_text="大家好，我是Qborfy！今天我们来聊聊损失函数。"

# 生成参数
max_new_tokens=512         # 控制音频长度
top_k=10                   # 采样策略
top_p=0.7                  # 采样概率
temperature=0.3            # 随机性（越低越稳定）
repetition_penalty=1.5     # 重复惩罚
```

## 📚 详细文档

查看 [LOSS_FUNCTION_AUDIO_GUIDE.md](./LOSS_FUNCTION_AUDIO_GUIDE.md) 获取完整使用指南。

## ⏭️ 下一步

1. 检查生成的音频质量
2. 根据实际音频时长调整字幕时间轴
3. 运行 `npm run dev` 预览视频
4. 运行 `npx remotion render LossFunctionVideo out/loss-function.mp4` 渲染视频

## 💡 技术特点

- 使用 Qwen3-TTS 1.7B 模型
- 支持语音克隆技术
- 自动音频时长控制和质量优化
- 音量标准化和低通滤波
- 自动重试机制

---

**提示**：字幕文件已生成在 `public/LossFunctionVideo/` 目录下，可能需要根据实际音频时长微调时间戳。
