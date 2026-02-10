# 无监督学习视频 - 音频生成指南

## 📝 概述

本指南介绍如何为无监督学习视频的8个场景生成高质量的音频旁白。

## 🎯 功能特点

- ✅ **自动读取字幕**：从JSON字幕文件自动提取文本
- ✅ **高质量语音**：使用Qwen3-TTS 1.7B模型生成自然流畅的中文语音
- ✅ **统一音色**：所有场景使用相同的语音角色，确保风格一致
- ✅ **智能时长控制**：自动控制音频时长，避免过长
- ✅ **音频优化**：音量标准化、低通滤波提高清晰度
- ✅ **重试机制**：自动重试失败的任务，提高成功率

## 📋 前置要求

### 1. 安装依赖包

```bash
pip install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm
```

或使用项目的 requirements.txt：

```bash
pip install -r requirement.txt
```

### 2. 下载模型

需要下载 Qwen3-TTS-12Hz-1.7B-Base 模型到项目根目录：

```bash
# 使用 git-lfs 下载模型
git lfs install
git clone https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base
```

### 3. 准备参考音频

需要一个参考音频文件 `borfy.mp3` 用于语音克隆（可选，如果没有会使用默认音色）。

## 🚀 使用方法

### 快速开始

在 `remotion-videos` 目录下运行：

```bash
python3 tts_unsupervised.py
```

### 生成流程

脚本会自动执行以下步骤：

1. **检查依赖**：验证所有必需的Python包是否已安装
2. **检查字幕文件**：确认所有8个场景的字幕JSON文件存在
3. **加载模型**：加载Qwen3-TTS模型（首次运行较慢）
4. **生成音频**：为每个场景生成音频文件
   - 读取字幕JSON文件
   - 合并字幕文本
   - 使用TTS模型生成语音
   - 音频后处理（标准化、滤波）
   - 保存到 `public/UnsupervisedLearningVideo/`
5. **输出报告**：显示成功/失败统计

## 📁 输出文件

生成的音频文件将保存在 `public/UnsupervisedLearningVideo/` 目录：

```
public/UnsupervisedLearningVideo/
├── scene1-audio.mp3  # 场景1：介绍 (约6秒)
├── scene2-audio.mp3  # 场景2：定义 (约8秒)
├── scene3-audio.mp3  # 场景3：三种方法 (约6秒)
├── scene4-audio.mp3  # 场景4：聚类详解 (约10秒)
├── scene5-audio.mp3  # 场景5：降维详解 (约10秒)
├── scene6-audio.mp3  # 场景6：关联详解 (约10秒)
├── scene7-audio.mp3  # 场景7：动手实验 (约8秒)
└── scene8-audio.mp3  # 场景8：实际案例 (约8秒)
```

## 🎬 集成到视频

音频生成后，需要更新视频文件以使用这些音频：

### 方法1：自动集成（推荐）

编辑 `src/UnsupervisedLearningVideo.tsx`，为每个场景的 `CaptionComponent` 添加 `audioFile` 参数：

```tsx
<CaptionComponent 
  audioFile="UnsupervisedLearningVideo/scene1-audio.mp3" 
  captionFile="UnsupervisedLearningVideo/scene1-captions.json"
  startTimeMs={0}
/>
```

### 方法2：批量更新

运行以下命令自动更新所有场景：

```bash
# 待实现：自动更新脚本
npm run update-audio
```

## ⚙️ 配置说明

### 场景配置

在 `tts_unsupervised.py` 中的 `SCENE_CONFIG` 定义了所有场景：

```python
SCENE_CONFIG = {
    "scene1": {
        "name": "介绍",
        "caption_file": "public/UnsupervisedLearningVideo/scene1-captions.json",
        "output_file": "public/UnsupervisedLearningVideo/scene1-audio.mp3"
    },
    # ... 其他场景
}
```

### TTS参数优化

关键参数说明：

- `max_new_tokens=512`：控制最大生成长度，避免音频过长
- `temperature=0.3`：较低温度提高语音稳定性
- `top_k=10`, `top_p=0.7`：严格采样策略，减少语音乱码
- `repetition_penalty=1.5`：避免语音重复

## 🔧 故障排除

### 问题1：模型加载失败

**症状**：提示找不到模型文件

**解决方案**：
```bash
# 确认模型目录存在
ls -la Qwen3-TTS-12Hz-1.7B-Base/

# 重新下载模型
git clone https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base
```

### 问题2：音频过长或过短

**症状**：生成的音频时长与场景不匹配

**解决方案**：
1. 调整字幕文本长度
2. 修改 `max_new_tokens` 参数
3. 手动裁剪音频文件

### 问题3：语音质量差

**症状**：语音有杂音、重复或不自然

**解决方案**：
1. 降低 `temperature` 参数（当前0.3）
2. 增加 `repetition_penalty`（当前1.5）
3. 检查参考音频质量
4. 重新生成该场景音频

### 问题4：GPU内存不足

**症状**：CUDA out of memory

**解决方案**：
```python
# 修改模型加载参数
model_kwargs = {
    "device_map": "cpu",  # 使用CPU
    "torch_dtype": torch.float32,  # 使用float32
}
```

### 问题5：依赖包安装失败

**症状**：pip install 报错

**解决方案**：
```bash
# 使用国内镜像源
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple torch transformers

# 或使用conda
conda install pytorch transformers -c pytorch
```

## 📊 性能优化

### GPU加速

如果有NVIDIA GPU：

```bash
# 安装CUDA版本的PyTorch
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

### 批量生成

脚本已支持批量生成，会自动处理所有8个场景。

### 缓存模型

模型加载后会缓存在内存中，避免重复加载。

## 🎨 自定义语音

### 更换语音角色

修改 `generate_tts_audio` 函数中的 `ref_audio` 和 `ref_text`：

```python
wavs, sr = model.generate_voice_clone(
    ref_audio="./your-voice.mp3",  # 你的参考音频
    ref_text="参考音频的文本内容",
    text=text,
    # ... 其他参数
)
```

### 调整语速

修改采样参数：

```python
# 加快语速
temperature=0.2  # 降低温度

# 减慢语速
temperature=0.4  # 提高温度
```

## 📝 最佳实践

1. **字幕文本优化**：
   - 保持每个场景的文本简洁
   - 避免过长的句子
   - 使用标点符号控制停顿

2. **音频质量检查**：
   - 生成后试听每个音频
   - 检查音量是否一致
   - 确认时长与场景匹配

3. **版本控制**：
   - 保存原始音频文件
   - 记录生成参数
   - 便于后续调整

4. **预览测试**：
   ```bash
   npm start
   # 在浏览器中预览视频效果
   ```

## 🔗 相关文档

- [字幕使用说明](./CAPTIONS_UNSUPERVISED.md)
- [视频快速开始](./QUICKSTART_UNSUPERVISED.md)
- [Qwen3-TTS文档](https://github.com/QwenLM/Qwen-TTS)
- [Remotion音频指南](https://www.remotion.dev/docs/audio)

## 💡 提示

- 首次运行会下载模型，需要较长时间
- GPU加速可显著提升生成速度
- 建议在生成前备份现有音频文件
- 可以只生成特定场景的音频（修改脚本）

## 🎉 完成后

音频生成完成后：

1. ✅ 运行 `npm start` 预览视频
2. ✅ 检查音频与字幕是否同步
3. ✅ 调整音量和时长（如需要）
4. ✅ 运行 `npm run build:unsupervised` 渲染最终视频
