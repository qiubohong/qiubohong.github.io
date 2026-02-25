---
name: video-generator
description: 自动化Remotion视频生成工作流。当用户需要创建技术教学视频时使用此skill。支持从文案输入到视频构建的完整流程：(1)文案优化与标题生成 (2)场景文件与字幕生成 (3)音频文件生成 (4)帧数计算与Root.tsx更新 (5)视频构建验证。适用于AI教学、技术讲解类视频制作。
---

# Remotion 视频生成工作流

## 概述

本 skill 提供完整的 Remotion 技术教学视频生成流程，从文案输入到最终视频构建。

## 前置条件

执行任何步骤前，必须先切换环境：

```bash
cd remotion-videos
conda activate qwen3-tts
nvm use ai
```

所有命令均在 `remotion-videos` 目录下执行。

## 工作流程

### 步骤 1：文案优化（抖音教学运营专家角色）

**输入**：用户提供的文案文件（如 `xx.md`）

**任务**：

1. 读取用户输入的文案文件
2. **检测文案中的图片资源**：
   - 扫描 Markdown 文件中的图片引用（格式：`![alt](path)` 或 `<img src="path">`）
   - 判断图片是否与教学内容相关（如：流程图、架构图、示例图、对比图等）
   - 确定哪些图片需要在视频中展示
   - 记录图片路径和建议展示的场景位置
3. 以抖音教学运营专家角色优化文案，输出：
   - 视频标题（吸引眼球、适合短视频平台）
   - 视频主题和核心要点
   - 分场景文案（每个场景对应一个知识点，时长控制在 15-45 秒）
   - **图片使用计划**（标注哪些场景需要展示图片）

**图片判断标准**：

- ✅ **需要引入**：流程图、架构图、代码示例截图、对比图表、关键概念示意图
- ❌ **不需要引入**：装饰性图片、无关配图、低质量图片
- 📝 **展示方式**：图片应在讲解相关内容时出现，可作为背景或叠加层展示

**输出格式**：

```markdown
# 视频标题：[吸引眼球的标题]

## 视频主题

[一句话概括视频核心内容]

## 图片资源清单

| 图片路径           | 用途说明 | 建议展示场景 | 是否使用 |
| ------------------ | -------- | ------------ | -------- |
| assets/img/xxx.png | 流程图   | Scene 2      | ✓        |
| assets/img/yyy.png | 架构图   | Scene 3      | ✓        |

## 分场景文案

### Scene 1: [场景名称]

[文案内容]

**图片**：无

### Scene 2: [场景名称]

[文案内容]

**图片**：`assets/img/xxx.png` - 流程图展示

### Scene 3: [场景名称]

[文案内容]

**图片**：`assets/img/yyy.png` - 架构图展示
...
```

**参考**：[references/content-writer-guide.md](references/content-writer-guide.md)

### 步骤 2：场景文件与字幕生成

**输入**：步骤 1 生成的分场景文案（含图片使用计划）

**任务**：

1. 基于文案生成场景组件（TypeScript React 组件）
2. **在需要的场景中集成图片展示**
3. 生成对应的字幕 JSON 文件
4. 创建视频主组件（如 `XXXVideo.tsx`）

**场景组件模板**：

```typescript
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Img,
  staticFile,
} from "remotion";

interface SceneProps {
  title?: string;
}

export const SceneName: React.FC<SceneProps> = ({ title }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-gray-900">
      {/* 场景内容 */}

      {/* 如果该场景需要展示图片 */}
      <Img
        src={staticFile("path/to/image.png")}
        className="absolute w-3/4 h-auto"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: interpolate(frame, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
```

**图片集成要点**：

1. **图片路径**：将图片复制到 `public/` 目录下，使用 `staticFile()` 引用
2. **图片动画**：使用 `interpolate` 添加淡入淡出效果
3. **图片布局**：
   - 全屏展示：`w-full h-full object-contain`
   - 部分展示：`w-3/4 h-auto` 配合绝对定位
   - 叠加展示：使用 `absolute` 定位，调整 `z-index`
4. **图片时机**：根据讲解内容，在合适的帧数显示图片

**图片展示模式**：

```typescript
// 模式1: 全屏背景图
<Img
  src={staticFile("VideoName/scene-bg.png")}
  className="w-full h-full object-cover opacity-30"
/>

// 模式2: 居中展示（适合流程图、架构图）
<Img
  src={staticFile("VideoName/diagram.png")}
  className="absolute w-4/5 h-auto"
  style={{
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }}
/>

// 模式3: 分屏展示（左文字右图片）
<div className="absolute right-0 w-1/2 h-full flex items-center justify-center">
  <Img
    src={staticFile("VideoName/example.png")}
    className="w-11/12 h-auto"
  />
</div>
```

**字幕文件格式** (`public/VideoName/sceneX-captions.json`)：

```json
[
  {
    "text": "字幕文本",
    "startMs": 0,
    "endMs": 2000,
    "timestampMs": 0,
    "confidence": 0.95
  }
]
```

**重要规则**：

- 字幕按行显示，每句完整的话作为一个字幕条目
- 时长需与音频同步
- 参考 [[memory:3g4lzqdy]] 字幕规则
- **图片文件命名**：建议使用 `sceneX-image.png` 或描述性名称

### 步骤 3：音频文件生成

**输入**：步骤 2 生成的字幕文件

**任务**：基于字幕内容生成各场景的音频文件

**使用脚本**：

```bash
python scripts/generate_audio_from_captions.py --video-name <视频名称> --captions-dir public/<VideoName>
```

**脚本功能**：

- 读取字幕 JSON 文件
- 使用 Qwen3-TTS 模型生成语音
- 自动音量标准化和后处理
- 输出 MP3 音频文件

**脚本详情**：[scripts/generate_audio_from_captions.py](scripts/generate_audio_from_captions.py)

### 步骤 4：音频时长计算

**输入**：步骤 3 生成的音频文件

**任务**：计算每个音频文件的时长，转换为帧数

**使用 audio-duration-calculator skill**：

```bash
python .codebuddy/skills/audio-duration-calculator/scripts/get_audio_duration.py public/<VideoName>/sceneX-audio.mp3 --frames --fps 30
```

**帧数计算公式**：

```
场景帧数 = 音频时长(秒) × FPS + 30帧缓冲
```

**参考**：[references/frame-calculation.md](references/frame-calculation.md)

### 步骤 5：更新视频组件帧数

**输入**：步骤 4 计算的各场景帧数

**任务**：

1. 更新视频主组件中各场景的 `durationInFrames`
2. 更新 `Root.tsx` 中的总帧数

**主组件更新示例**：

```typescript
// 场景1: 音频时长7.66秒 (229帧) + 30帧缓冲 = 259帧
<TransitionSeries.Sequence durationInFrames={259}>
  <Scene1 />
  <Html5Audio src={staticFile("VideoName/scene1-audio.mp3")} volume={0.8} />
  <CaptionComponent ... />
</TransitionSeries.Sequence>
```

**Root.tsx 总帧数计算**：

```typescript
总帧数 = Σ(各场景帧数) + Σ(转场帧数);
```

### 步骤 5.5：Root.tsx 帧数校验（重要）

**输入**：更新后的视频主组件和 Root.tsx

**任务**：多次校验 Root.tsx 中的总帧数是否与场景时长总数一致

**校验流程**：

1. **第一次校验**：读取视频主组件（如 `XXXVideo.tsx`）

   - 提取所有 `<TransitionSeries.Sequence durationInFrames={xxx}>` 的帧数
   - 计算场景总帧数：`场景总帧数 = Σ(各场景durationInFrames)`
   - 计算转场总帧数：`转场总帧数 = (场景数 - 1) × 转场帧数`（通常每个转场 15-30 帧）
   - 计算预期总帧数：`预期总帧数 = 场景总帧数 + 转场总帧数`

2. **第二次校验**：读取 Root.tsx

   - 找到对应视频的 `<Composition>` 定义
   - 提取 `durationInFrames` 属性值
   - 对比：`Root.tsx中的durationInFrames === 预期总帧数`

3. **第三次校验**：逐场景验证
   - 逐个检查每个场景的帧数是否正确计算
   - 验证公式：`场景帧数 = Math.ceil(音频时长秒数 × 30) + 30`
   - 确保没有遗漏或重复计算

**校验示例**：

```typescript
// 视频主组件中的场景定义
<TransitionSeries.Sequence durationInFrames={259}>  // 场景1
<TransitionSeries.Sequence durationInFrames={320}>  // 场景2
<TransitionSeries.Sequence durationInFrames={280}>  // 场景3

// 计算过程
场景总帧数 = 259 + 320 + 280 = 859帧
转场总帧数 = (3 - 1) × 15 = 30帧
预期总帧数 = 859 + 30 = 889帧

// Root.tsx 中应该是
<Composition
  id="VideoName"
  component={VideoNameVideo}
  durationInFrames={889}  // ✓ 必须等于 889
  fps={30}
  width={1080}
  height={1920}
/>
```

**不一致处理**：

- 如果发现不一致，必须重新计算并更新 Root.tsx
- 输出详细的校验报告，说明差异原因
- 更新后再次执行完整的三次校验流程

### 步骤 6：视频构建验证

**任务**：验证视频是否正常构建

```bash
npm run build -- --id=<VideoId>
```

**成功标志**：

- 无 TypeScript 编译错误
- 无 Remotion 渲染错误
- 输出视频文件到 `out/` 目录

## 文件结构

```
remotion-videos/
├── src/
│   ├── Root.tsx                    # 视频组合入口
│   ├── <VideoName>Video.tsx        # 视频主组件
│   └── scenes/
│       └── <videoTopic>/
│           ├── Scene1_xxx.tsx
│           ├── Scene2_xxx.tsx
│           └── ...
├── public/
│   └── <VideoName>/
│       ├── scene1-audio.mp3
│       ├── scene1-captions.json
│       ├── scene1-image.png        # 场景1的图片（如需要）
│       ├── scene2-audio.mp3
│       ├── scene2-captions.json
│       ├── scene2-image.png        # 场景2的图片（如需要）
│       └── ...
└── scripts/
    └── generate_audio_from_captions.py
```

**图片资源管理**：

- 所有图片统一放在 `public/<VideoName>/` 目录下
- 图片命名建议：`sceneX-image.png` 或 `sceneX-diagram.png`
- 支持格式：PNG、JPG、SVG
- 建议尺寸：宽度 1080px（匹配视频宽度）

## 常用依赖

- **Remotion**: 视频渲染框架
- **Qwen3-TTS**: 文本转语音模型
- **pydub/librosa**: 音频处理
- **@remotion/transitions**: 场景转场效果

## 注意事项

1. **环境依赖**：确保已激活 `qwen3-tts` conda 环境和 `ai` node 版本
2. **音频时长**：每个场景音频建议控制在 15-45 秒
3. **帧数缓冲**：每个场景需额外添加 30 帧缓冲
4. **字幕同步**：字幕时长需与音频实际播放时长匹配
5. **转场效果**：场景间转场通常 15-30 帧
6. **Root.tsx 校验**：必须执行三次校验确保总帧数与场景时长一致
7. **图片资源**：
   - 图片必须放在 `public/<VideoName>/` 目录下
   - 使用 `staticFile()` 引用图片路径
   - 图片展示时机要与讲解内容同步
   - 添加适当的动画效果（淡入淡出）
   - 注意图片文件大小，避免影响渲染性能

## 相关 Skills

- [audio-duration-calculator](../audio-duration-calculator/SKILL.md) - 音频时长计算
- [remotion-best-practices](../remotion-best-practices/SKILL.md) - Remotion 最佳实践
