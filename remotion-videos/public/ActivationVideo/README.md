# 激活函数视频音频生成指南

## 📋 概述

本指南说明如何为激活函数视频生成 6 个场景的音频文件。

## 🎯 抖音运营方案

### 推荐标题（3 选 1）

1. **悬念式**："90%的 AI 模型都在用它！激活函数到底有多重要？"
2. **痛点式**："神经网络训练总失败？可能是激活函数选错了！"
3. **知识点式**："5 分钟搞懂 5 大激活函数：从 Sigmoid 到 Swish"

### 话题标签组合

**主话题**：#激活函数 #神经网络 #深度学习  
**辅助话题**：#AI 学习 #机器学习 #程序员

### 内容特点

- ✅ **开场钩子**：90%的 AI 模型都在用它！（吸引注意力）
- ✅ **快节奏讲解**：简化专业术语，突出核心要点
- ✅ **对比呈现**：直观展示各函数性能差异
- ✅ **冷知识加持**：增强互动性和记忆点
- ✅ **实操引导**：降低学习门槛

### 发布建议

- **最佳时间**：工作日 19:00-21:00 或 周末上午 10:00-12:00
- **封面设计**：科技蓝配色 + 函数曲线对比图
- **互动引导**：结尾提问"你最常用哪个激活函数？"
- **系列规划**：后续可制作 CNN、RNN、Transformer 等主题

## 🎯 场景列表

1. **场景 1：介绍** (约 15 秒)
2. **场景 2：定义** (约 20 秒)
3. **场景 3：5 个经典激活函数** (约 35 秒)
4. **场景 4：函数性能对比** (约 18 秒)
5. **场景 5：动手实验** (约 15 秒)
6. **场景 6：冷知识** (约 25 秒)
7. **场景 7：结尾** - 使用现有音频 `scene8-ending.mp3`

## 🚀 快速开始

### 方法 1：使用 Qwen3-TTS（推荐，高质量）

```bash
cd public/ActivationVideo
python3 generate_audio.py
```

**优点：**

- ✅ 高质量语音，自然流畅
- ✅ 支持语音克隆，风格一致
- ✅ 完全本地运行，无需 API 密钥

**要求：**

- 需要安装 Qwen3-TTS 模型
- 需要较大内存（建议 16GB+）
- 首次运行需要下载模型

### 方法 2：使用 edge-tts（简单快速）

如果 Qwen3-TTS 运行困难，可以使用之前创建的 edge-tts 脚本：

```bash
cd ../../  # 回到remotion-videos目录
python3 generate_audio.py
```

然后将生成的音频文件移动到正确位置：

```bash
mv public/ActivationVideo/scene*-audio.mp3 public/ActivationVideo/
```

## 📦 依赖安装

### Qwen3-TTS 依赖

```bash
pip install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm
```

### edge-tts 依赖

```bash
pip install edge-tts
```

## 📝 生成字幕文件

音频生成完成后，使用 Remotion 生成字幕：

```bash
# 在remotion-videos目录下运行
npx remotion transcribe ActivationVideo/scene1-audio.mp3 ActivationVideo/scene1-captions.json
npx remotion transcribe ActivationVideo/scene2-audio.mp3 ActivationVideo/scene2-captions.json
npx remotion transcribe ActivationVideo/scene3-audio.mp3 ActivationVideo/scene3-captions.json
npx remotion transcribe ActivationVideo/scene4-audio.mp3 ActivationVideo/scene4-captions.json
npx remotion transcribe ActivationVideo/scene5-audio.mp3 ActivationVideo/scene5-captions.json
npx remotion transcribe ActivationVideo/scene6-audio.mp3 ActivationVideo/scene6-captions.json
```

或使用批量脚本：

```bash
for i in {1..6}; do
  npx remotion transcribe ActivationVideo/scene${i}-audio.mp3 ActivationVideo/scene${i}-captions.json
done
```

## 🎬 视频制作流程

1. **生成音频** ✅

   ```bash
   cd public/ActivationVideo
   python3 generate_audio.py
   ```

2. **生成字幕**

   ```bash
   cd ../../
   for i in {1..6}; do
     npx remotion transcribe ActivationVideo/scene${i}-audio.mp3 ActivationVideo/scene${i}-captions.json
   done
   ```

3. **调整场景时长**

   根据实际音频时长，编辑 `src/ActivationFunctionVideo.tsx`，更新每个场景的 `durationInFrames`。

   计算公式：`durationInFrames = (音频时长秒数 + 1) * 30`

4. **预览视频**

   ```bash
   npm start
   ```

5. **渲染视频**
   ```bash
   npx remotion render ActivationFunctionVideo out/activation-function.mp4
   ```

## 🔧 故障排除

### 问题 1：Qwen3-TTS 模型加载失败

**原因：** 模型路径不正确或模型未下载

**解决方案：**

1. 检查模型路径：`../../../Qwen3-TTS-12Hz-1.7B-Base`
2. 确保模型已下载到正确位置
3. 如果模型在其他位置，修改 `generate_audio.py` 中的路径

### 问题 2：内存不足

**原因：** Qwen3-TTS 需要较大内存

**解决方案：**

1. 关闭其他占用内存的程序
2. 使用 edge-tts 替代方案
3. 考虑使用云服务器生成

### 问题 3：音频生成速度慢

**原因：** CPU 运行速度较慢

**解决方案：**

1. 使用 GPU 加速（如果有 NVIDIA 显卡）
2. 使用 edge-tts 替代方案（速度更快）
3. 分批生成音频文件

### 问题 4：音频质量不佳

**原因：** 参数设置或模型问题

**解决方案：**

1. 调整 temperature 参数（降低可提高稳定性）
2. 调整 top_p 和 top_k 参数
3. 尝试不同的参考音频

## 📊 音频文件检查

生成完成后，检查音频文件：

```bash
ls -lh public/ActivationVideo/*.mp3
```

预期输出：

```
scene1-audio.mp3  (约 200-300KB)
scene2-audio.mp3  (约 300-400KB)
scene3-audio.mp3  (约 500-700KB)
scene4-audio.mp3  (约 300-400KB)
scene5-audio.mp3  (约 200-300KB)
scene6-audio.mp3  (约 400-500KB)
```

播放测试：

```bash
open public/ActivationVideo/scene1-audio.mp3
```

## 🎨 自定义设置

### 修改语音风格

编辑 `generate_audio.py`，修改 `generate_voice_clone` 的参数：

```python
# 更快速的语音
temperature=0.2  # 降低温度

# 更自然的语音
temperature=0.5  # 提高温度

# 更稳定的语音
top_k=5  # 减少采样范围
```

### 修改参考音频

如果想使用不同的语音风格，替换参考音频：

```python
ref_audio="../../../your-voice.mp3",
ref_text="你的参考文本",
```

## 📚 参考资源

- [Qwen3-TTS GitHub](https://github.com/QwenLM/Qwen-Audio)
- [edge-tts GitHub](https://github.com/rany2/edge-tts)
- [Remotion 文档](https://www.remotion.dev/docs)
- [Remotion 字幕文档](https://www.remotion.dev/docs/captions)

## 💡 提示

1. **首次运行**：Qwen3-TTS 首次运行需要加载模型，可能需要几分钟
2. **音频时长**：生成的音频时长可能与预期略有差异，需要调整视频场景时长
3. **字幕同步**：使用 Remotion 的 transcribe 功能可以自动生成时间戳准确的字幕
4. **批量处理**：可以一次性生成所有音频，脚本会自动跳过已存在的文件
5. **备份音频**：建议保存生成的音频文件，避免重复生成

## ✅ 检查清单

- [ ] 安装所有依赖包
- [ ] 下载 Qwen3-TTS 模型（或使用 edge-tts）
- [ ] 运行音频生成脚本
- [ ] 检查所有 6 个音频文件已生成
- [ ] 播放测试音频质量
- [ ] 生成字幕文件
- [ ] 调整视频场景时长
- [ ] 预览视频效果
- [ ] 渲染最终视频
