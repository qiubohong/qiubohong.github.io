# 快速开始 - 无监督学习视频

## 🎬 视频已创建完成！

基于文章《5分钟AI，每天搞懂一个知识点(2) - 无监督学习》，我已经为你创建了一个完整的视频项目。

## 📋 视频信息

- **视频ID**: `UnsupervisedLearningVideo`
- **时长**: 约59.6秒
- **分辨率**: 1920x1080 (Full HD)
- **帧率**: 30 FPS
- **场景数**: 8个场景

## 🚀 快速预览

1. **启动预览服务器**（如果还没启动）：
   ```bash
   cd /Users/borfyqiu/Desktop/self/qiubohong.github.io/remotion-videos
   npm start
   ```

2. **在浏览器中打开**：
   - 访问：http://localhost:3001
   - 在视频列表中选择 `UnsupervisedLearningVideo`

## 🎥 渲染视频

渲染为MP4文件：

```bash
npm run build:unsupervised
```

输出文件：`out/unsupervised-learning.mp4`

## 📝 视频内容概览

### 场景1：介绍 (6秒)
- 标题和核心概念
- 渐变色标题动画

### 场景2：定义 (8秒)
- 什么是无监督学习
- 关键特征和常见误区

### 场景3：三种方法 (6秒)
- 聚类、降维、关联
- 三卡片并排展示

### 场景4-6：方法详解 (各10秒)
- 聚类：自助餐厅例子
- 降维：购房决策例子
- 关联：便利店例子

### 场景7：动手实验 (8秒)
- 三个在线工具推荐

### 场景8：实际案例 (8秒)
- 亚马逊、NASA、7-Eleven案例

## 🎨 设计亮点

- ✨ 紫粉渐变配色方案
- 🎭 丰富的转场效果（淡入淡出、滑动、擦除、翻转）
- 📊 卡片式信息展示
- 🎯 渐进式动画引导
- 💡 图标和emoji增强视觉

## 🔧 自定义修改

### 修改场景时长

编辑 `src/UnsupervisedLearningVideo.tsx`，调整 `durationInFrames` 值：
- 1秒 = 30帧
- 例如：180帧 = 6秒

### 修改颜色

在各个场景文件中修改颜色值：
- 主色：`#f093fb`, `#f5576c`
- 辅助色：`#4ecdc4`
- 背景：`#1a1a2e`, `#16213e`, `#0f3460`

### 添加音频

参考 `SupervisedLearningVideo.tsx` 的实现：
1. 准备音频文件（MP3）
2. 放入 `public/` 目录
3. 在场景中添加 `<Html5Audio>` 组件

## 📚 更多信息

详细文档请查看：`UNSUPERVISED_LEARNING_VIDEO.md`

## ✅ 下一步

1. ✅ 视频结构已创建
2. ✅ 所有场景已实现
3. ✅ 转场效果已配置
4. ✅ 字幕已添加（8个场景全部配置）
5. 🎵 **生成音频旁白**（推荐）
6. ⏳ 可选：调整动画时长和效果

## 🎵 生成音频旁白

### 快速生成（推荐）

使用自动化脚本为所有场景生成音频：

```bash
# 1. 安装依赖（首次使用）
pip install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm

# 2. 下载模型（首次使用，约3GB）
git lfs install
git clone https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base

# 3. 生成音频
python3 tts_unsupervised.py
```

脚本会自动：
- ✅ 读取所有字幕文件
- ✅ 使用Qwen3-TTS生成高质量中文语音
- ✅ 保存音频到 `public/UnsupervisedLearningVideo/`
- ✅ 视频已配置好音频引用，无需手动修改

详细说明：
- [音频生成快速指南](./AUDIO_QUICKSTART.md)
- [完整音频生成文档](./AUDIO_GENERATION_UNSUPERVISED.md)

## 📝 字幕说明

视频已为所有8个场景添加了字幕：
- 字幕文件位置：`public/UnsupervisedLearningVideo/scene[1-8]-captions.json`
- 字幕样式：TikTok风格，底部居中显示
- 详细说明：查看 `CAPTIONS_UNSUPERVISED.md`

---

**提示**：服务器正在运行中，你可以直接在浏览器中预览视频效果！
