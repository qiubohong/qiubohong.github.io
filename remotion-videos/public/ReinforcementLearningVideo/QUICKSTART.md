# 强化学习视频 - 快速启动指南

## 📋 项目概述

基于文章《5分钟AI，每天搞懂一个知识点(3) - 强化学习》创建的视频项目。

## 🎬 视频结构

视频共包含8个场景：

1. **场景1 - 介绍** (11秒): 标题和核心概念
2. **场景2 - 定义** (9秒): 什么是强化学习
3. **场景3 - 免模型学习** (13秒): 学骑电动车案例
4. **场景4 - 有模型学习** (13秒): 国际象棋案例
5. **场景5 - 对比** (16秒): 免模型 vs 有模型
6. **场景6 - 应用案例** (19秒): AlphaGo和特斯拉
7. **场景7 - 冷知识** (13秒): 有趣的应用案例
8. **场景8 - 结尾** (6秒): 感谢观看

**总时长**: 约100秒（1分40秒）

## 🚀 快速开始

### 步骤1: 生成音频文件

```bash
# 进入音频目录
cd remotion-videos/public/ReinforcementLearningVideo

# 安装依赖（首次运行）
pip install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm

# 运行音频生成脚本（使用 Qwen3-TTS）
python generate_audio.py
```

**新特性**：
- ✅ 自动从字幕文件读取文本
- ✅ 自动更新字幕时间戳
- ✅ 智能跳过已存在的音频
- ✅ 音频质量优化和后处理
- ✅ 重试机制，提高成功率

### 步骤2: 预览视频

```bash
# 返回项目根目录
cd ../..

# 启动Remotion Studio
npm start
```

在浏览器中打开 http://localhost:3000，选择 "ReinforcementLearningVideo" 进行预览。

### 步骤3: 调整字幕时间

1. 播放视频，记录每个场景的实际音频时长
2. 编辑对应的字幕文件（scene1-captions.json 到 scene7-captions.json）
3. 调整 `start` 和 `end` 时间戳，确保字幕与语音同步

### 步骤4: 渲染视频

```bash
# 渲染单个场景（用于测试）
npm run render -- ReinforcementLearningVideo --frames=0-330

# 渲染完整视频
npm run render -- ReinforcementLearningVideo
```

## 📁 文件结构

```
remotion-videos/
├── src/
│   ├── ReinforcementLearningVideo.tsx          # 主视频组件
│   ├── Root.tsx                                 # 视频注册
│   └── scenes/reinforcement/                    # 场景组件
│       ├── Scene1_Introduction.tsx
│       ├── Scene2_Definition.tsx
│       ├── Scene3_ModelFree.tsx
│       ├── Scene4_ModelBased.tsx
│       ├── Scene5_Comparison.tsx
│       ├── Scene6_Applications.tsx
│       └── Scene7_FunFacts.tsx
└── public/ReinforcementLearningVideo/           # 资源文件
    ├── scene1-audio.mp3                         # 音频文件
    ├── scene1-captions.json                     # 字幕文件
    ├── generate_audio.py                        # 音频生成脚本
    ├── README.md                                # 详细说明
    └── QUICKSTART.md                            # 本文件
```

## 🎨 视频特点

- **渐变色主题**: 使用蓝色系渐变，符合AI科技感
- **动画效果**: 标题、内容淡入淡出，平滑过渡
- **转场效果**: 淡入淡出、滑动、擦除、翻转等多种转场
- **字幕同步**: 每句话独立显示，与语音精确同步
- **视觉层次**: 清晰的标题、内容、案例分层展示

## 🔧 自定义修改

### 修改场景内容

编辑对应的场景文件，例如 `Scene1_Introduction.tsx`：

```typescript
// 修改文字内容
<p style={{ margin: 0 }}>
  你的新内容
</p>

// 修改颜色
background: "linear-gradient(45deg, #你的颜色1, #你的颜色2)"
```

### 修改动画时长

在场景文件中调整 `interpolate` 的帧数范围：

```typescript
const titleOpacity = interpolate(
  frame,
  [0, 30],  // 修改这里：[开始帧, 结束帧]
  [0, 1],
  // ...
);
```

### 修改转场效果

在 `ReinforcementLearningVideo.tsx` 中修改转场：

```typescript
<TransitionSeries.Transition
  presentation={fade()}  // 可选: fade(), slide(), wipe(), flip()
  timing={linearTiming({ durationInFrames: 20 })}
/>
```

## 📝 注意事项

1. **音频时长**: 生成音频后，需要根据实际时长更新 `durationInFrames`
2. **字幕同步**: 字幕时间戳需要与音频精确对应
3. **转场时长**: 转场效果会增加总时长，已在计算中考虑
4. **帧率**: 视频使用30fps，1秒 = 30帧

## 🐛 常见问题

### Q: 音频生成失败？
A: 
- 确保已安装依赖：`pip install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm`
- 检查模型路径是否正确（../../Qwen3-TTS-12Hz-1.7B-Base）
- 检查参考音频是否存在（../../borfy.mp3）

### Q: 字幕不显示？
A: 
- 检查字幕文件路径和JSON格式是否正确
- 脚本会自动更新字幕时间戳，确保与音频同步

### Q: 视频时长不对？
A: 
- 脚本会自动更新字幕时间戳
- 检查每个场景的 `durationInFrames` 是否与音频时长匹配

### Q: 预览卡顿？
A: 这是正常的，渲染后的视频会很流畅

### Q: GPU 不可用？
A: 脚本会自动使用 CPU，但速度会较慢（每个场景约 2-5 分钟）

## 📚 相关资源

- [Remotion 文档](https://www.remotion.dev/)
- [Edge-TTS 文档](https://github.com/rany2/edge-tts)
- [原文章链接](file:///Users/borfyqiu/Desktop/self/qiubohong.github.io/source/source/_posts/ailearn/daily/03.md)

## 🎉 完成

现在你可以开始生成音频并预览视频了！祝你创作愉快！
