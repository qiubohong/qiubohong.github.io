---
name: video-generator
description: 自动化Remotion视频生成工作流。当用户需要创建技术教学视频时使用此skill。支持从文案输入到视频构建的完整流程：(1)文案优化与标题生成（含抖音短视频标题和文案）(2)场景文件与字幕生成 (3)音频文件生成 (4)帧数计算与Root.tsx更新 (5)视频构建验证。适用于AI教学、技术讲解类视频制作。输出包含适配抖音平台的短视频标题和文案。
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
2. **检测文案中的图片和流程图资源**：
   - 扫描 Markdown 文件中的图片引用（格式：`![alt](path)` 或 `<img src="path">`）
   - 扫描 Markdown 文件中的 Mermaid 代码块（格式：` ```mermaid ... ``` `）
   - 判断图片/流程图是否与教学内容相关（如：流程图、架构图、示例图、对比图等）
   - 确定哪些图片/流程图需要在视频中展示
   - 记录图片路径和 Mermaid 代码，以及建议展示的场景位置
3. 以抖音教学运营专家角色优化文案，输出：
   - 视频标题（吸引眼球、适合短视频平台）
   - **抖音短视频标题**（15-20 字，吸引眼球，可带数字、疑问句、感叹号）
   - **抖音短视频文案**（100-200 字，包含：视频亮点概述、互动引导、相关标签）
   - 视频主题和核心要点
   - 分场景文案（每个场景对应一个知识点，时长控制在 15-45 秒）
   - **图片使用计划**（标注哪些场景需要展示图片）

**文案内容强制规则**（必须遵守）：

1. **前置核心价值（钩子）**：开场白之后，必须立即抛出该技术/概念能为用户带来的**具体好处**，用利益驱动抓住用户注意力。

   - 格式：`"学会[主题]，[具体好处]！"` 或 `"[主题]让你的[工具/工作流]像[通俗比喻]一样简单！"`
   - 示例：`"学会MCP，让你的AI工具像搭积木一样简单！"` / `"掌握Agent Skill，AI再也不用重复解释工作流程！"`

2. **案例演示场景（必须包含）**：讲解完核心理论后，**必须安排至少一个贴近生活的实际应用案例场景**，让抽象技术具体可感。

   - 案例要具体可操作，展示完整的使用步骤
   - 优先选择日常生活场景（天气查询、日程管理、文件处理等）

3. **呼吸点设计（必须包含）**：讲解完复杂知识点后，**必须插入一个简短的总结或通俗类比**，给观众消化信息的时间。

   - 时长约 10-15 秒
   - 格式：`"简单来说，[主题]就像[通俗类比]"` 或 `"记住这个关键点：[一句话总结]"`

4. **结尾互动引导（必须包含）**：视频结尾除总结外，**必须提出一个开放性问题**，引导观众在评论区互动。
   - 格式：`"你觉得[主题]会如何改变[某个场景]？欢迎在评论区分享你的想法！"`
   - 示例：`"你觉得MCP协议会如何改变我们与AI的交互方式？欢迎在评论区讨论！"`

**图片/流程图判断标准**：

- ✅ **需要引入**：流程图、架构图、代码示例截图、对比图表、关键概念示意图
- ✅ **Mermaid 流程图**：文案中的 mermaid 代码块，优先使用 MermaidDiagram 组件渲染
- ❌ **不需要引入**：装饰性图片、无关配图、低质量图片
- 📝 **展示方式**：图片/流程图应在讲解相关内容时出现，可作为背景或叠加层展示

**输出格式**：

```markdown
# 视频标题：[吸引眼球的标题]

## 抖音短视频标题

[15-20 字的吸引眼球标题，可包含数字、疑问句、感叹号]

示例：

- "3 分钟掌握 AI 提示词核心技巧！"
- "为什么你的 AI 总是答非所问？"
- "一招教你写出完美 Prompt！"

## 抖音短视频文案

[100-200 字文案]

示例：
AI 提示词写不好？这个技巧让你秒变高手！🔥

本视频教你掌握 AI 提示词的核心方法：
✅ 角色设定 - 让 AI 更懂你
✅ 背景补充 - 上下文更清晰
✅ 任务明确 - 输出更精准

学会这三招，你的 AI 对话效率提升 10 倍！

点赞收藏，下期分享更多 AI 实用技巧～
#AI 教程 #提示词技巧 #ChatGPT

## 视频主题

[一句话概括视频核心内容]

## 图片资源清单

| 图片路径           | 用途说明       | 建议展示场景 | 是否使用          |
| ------------------ | -------------- | ------------ | ----------------- |
| assets/img/xxx.png | 流程图         | Scene 2      | ✓                 |
| assets/img/yyy.png | 架构图         | Scene 3      | ✓                 |
| mermaid:flow.mmd   | Mermaid 流程图 | Scene 4      | ✓（预渲染为 SVG） |

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

### Scene 4: [场景名称]

[文案内容]

**Mermaid 流程图**：`diagrams/flow.svg`（由 flow.mmd 预渲染生成）
...
```

**参考**：[references/content-writer-guide.md](references/content-writer-guide.md)

### 步骤 1.5：抖音运营文案输出到文档

**强制要求**：步骤 1 生成的抖音短视频标题和文案，必须同步写入对应的文档文件中保存，不能只在对话中输出。

**输出路径规则**：

```
public/<VideoName>/douyin-copy.md
```

**文档内容格式**：

```markdown
# [视频名称] 抖音运营文案

## 抖音短视频标题

[15-20 字标题]

## 抖音短视频文案

[100-200 字文案，含互动引导和标签]
```

**执行时机**：在步骤 1 完成文案优化后，立即创建该文档文件，再继续执行步骤 2。

### 步骤 2：场景文件与字幕生成

**输入**：步骤 1 生成的分场景文案（含图片使用计划）

**任务**：

1. 基于文案生成场景组件（TypeScript React 组件）
2. **在需要的场景中集成图片展示**
3. 生成对应的字幕 JSON 文件
4. 创建视频主组件（如 `XXXVideo.tsx`）
5. **必须导入并使用 EndingScene 组件**：
   - 在视频主组件开头添加：`import { EndingScene } from "./components/EndingScene";`
   - 在所有内容场景之后添加 EndingScene 场景
   - EndingScene 场景时长固定为 6 秒（180 帧）
   - 为 EndingScene 生成对应的音频和字幕文件

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

**视觉增强强制规则**（必须遵守）：

1. **动态高亮引导**：讲解代码或关键概念时，**必须为关键词/关键行添加动态高亮效果**，引导观众视线聚焦重点。

   ```typescript
   // 关键词高亮闪烁
   const highlight = 0.7 + Math.sin(frame * 0.15) * 0.3;
   <span
     style={{ color: `rgba(240, 136, 62, ${highlight})`, fontWeight: "bold" }}
   >
     关键词
   </span>;

   // 代码行高亮（背景色渐变）
   const lineHighlight = interpolate(
     frame,
     [startFrame, startFrame + 20],
     [0, 1],
     {
       extrapolateLeft: "clamp",
       extrapolateRight: "clamp",
     }
   );
   <div
     style={{
       background: `rgba(88,166,255,${lineHighlight * 0.2})`,
       borderLeft: `3px solid rgba(88,166,255,${lineHighlight})`,
     }}
   >
     {codeLine}
   </div>;
   ```

2. **对比场景分屏布局**：当场景内容涉及**两个概念对比、前后对比、有无对比**时，**必须使用分屏布局**展示差异。

   ```typescript
   // 左右分屏对比
   <div style={{ display: "flex", width: "100%", height: "100%", gap: 20 }}>
     <div
       style={{
         flex: 1,
         background: "rgba(255,80,80,0.1)",
         borderRadius: 12,
         padding: 20,
       }}
     >
       <div style={{ color: "#ff5555", fontSize: 24, marginBottom: 12 }}>
         ❌ 没有 MCP
       </div>
       {/* 左侧内容 */}
     </div>
     <div
       style={{
         flex: 1,
         background: "rgba(88,166,255,0.1)",
         borderRadius: 12,
         padding: 20,
       }}
     >
       <div style={{ color: "#58a6ff", fontSize: 24, marginBottom: 12 }}>
         ✅ 使用 MCP
       </div>
       {/* 右侧内容 */}
     </div>
   </div>
   ```

3. **数据流动动画**：当场景涉及**数据传输、信息流转、协议通信**等概念时，**必须添加流动动画**模拟数据流动过程。

   ```typescript
   // 流动点动画（沿路径移动）
   const flowProgress = (frame * 2) % 100; // 0-100 循环
   const dotX = interpolate(flowProgress, [0, 100], [startX, endX]);
   const dotY = interpolate(flowProgress, [0, 100], [startY, endY]);
   <div
     style={{
       position: "absolute",
       left: dotX,
       top: dotY,
       width: 8,
       height: 8,
       borderRadius: "50%",
       background: "#58a6ff",
       boxShadow: "0 0 8px #58a6ff",
     }}
   />;

   // 连接线上的流动效果
   const dashOffset = -(frame * 2) % 20;
   <svg>
     <line
       strokeDasharray="10 10"
       strokeDashoffset={dashOffset}
       stroke="#58a6ff"
     />
   </svg>;
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
- **Mermaid 流程图**：若场景需要展示流程图，使用 `MermaidDiagram` 组件，SVG 文件放在 `public/diagrams/` 目录下

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
2. **必须添加 EndingScene 场景**：
   - 在所有内容场景之后添加 EndingScene
   - EndingScene 固定为 6 秒（180 帧）
   - 为 EndingScene 添加对应的音频和字幕
3. 更新 `Root.tsx` 中的总帧数

**主组件更新示例**：

```typescript
// 场景1: 音频时长7.66秒 (229帧) + 30帧缓冲 = 259帧
<TransitionSeries.Sequence durationInFrames={259}>
  <Scene1 />
  <Html5Audio src={staticFile("VideoName/scene1-audio.mp3")} volume={0.8} />
  <CaptionComponent ... />
</TransitionSeries.Sequence>

// ... 其他内容场景 ...

// EndingScene: 固定6秒 (180帧)
<TransitionSeries.Sequence durationInFrames={180}>
  <EndingScene />
  <Html5Audio src={staticFile("VideoName/ending-audio.mp3")} volume={0.8} />
  <CaptionComponent ... />
</TransitionSeries.Sequence>
```

**Root.tsx 总帧数计算**：

```typescript
总帧数 = Σ(各内容场景帧数) + EndingScene帧数(180) + Σ(转场帧数);
```

**EndingScene 实现要求**：

1. **导入语句**：`import { EndingScene } from "./components/EndingScene";`
2. **音频文件**：`ending-audio.mp3`（固定结束语："5 分钟 AI，每天搞懂一个知识点！"）
3. **字幕文件**：`ending-captions.json`
4. **帧数固定**：180 帧（6 秒）
5. **位置**：必须作为最后一个场景

### 步骤 5.5：Root.tsx 帧数校验（重要）

**输入**：更新后的视频主组件和 Root.tsx

**任务**：多次校验 Root.tsx 中的总帧数是否与场景时长总数一致，**特别检查 EndingScene 场景是否正确添加**

**校验流程**：

1. **第一次校验**：读取视频主组件（如 `XXXVideo.tsx`）

   - 提取所有 `<TransitionSeries.Sequence durationInFrames={xxx}>` 的帧数
   - **验证 EndingScene 存在**：检查最后一个场景是否为 EndingScene
   - **验证 EndingScene 帧数**：确认 EndingScene 帧数为 180 帧（6 秒）
   - 计算场景总帧数：`场景总帧数 = Σ(各内容场景帧数) + EndingScene帧数(180)`
   - 计算转场总帧数：`转场总帧数 = (场景总数 - 1) × 转场帧数`（通常每个转场 15-30 帧）
   - 计算预期总帧数：`预期总帧数 = 场景总帧数 + 转场总帧数`

2. **第二次校验**：读取 Root.tsx

   - 找到对应视频的 `<Composition>` 定义
   - 提取 `durationInFrames` 属性值
   - 对比：`Root.tsx中的durationInFrames === 预期总帧数`

3. **第三次校验**：逐场景验证
   - 逐个检查每个内容场景的帧数是否正确计算
   - 验证公式：`内容场景帧数 = Math.ceil(音频时长秒数 × 30) + 30`
   - **验证 EndingScene 帧数固定为 180 帧**
   - 确保没有遗漏或重复计算

**校验示例**：

```typescript
// 视频主组件中的场景定义
<TransitionSeries.Sequence durationInFrames={259}>  // 场景1
<TransitionSeries.Sequence durationInFrames={320}>  // 场景2
<TransitionSeries.Sequence durationInFrames={280}>  // 场景3
<TransitionSeries.Sequence durationInFrames={180}>  // EndingScene（必须存在）

// 计算过程
内容场景总帧数 = 259 + 320 + 280 = 859帧
EndingScene帧数 = 180帧
场景总帧数 = 859 + 180 = 1039帧
转场总帧数 = (4 - 1) × 15 = 45帧
预期总帧数 = 1039 + 45 = 1084帧

// Root.tsx 中应该是
<Composition
  id="VideoName"
  component={VideoNameVideo}
  durationInFrames={1084}  // ✓ 必须等于 1084
  fps={30}
  width={1080}
  height={1920}
/>
```

**EndingScene 校验要点**：

1. **导入检查**：确认视频主组件导入了 `import { EndingScene } from "./components/EndingScene";`
2. **位置检查**：EndingScene 必须是最后一个场景
3. **帧数检查**：EndingScene 必须使用固定 180 帧
4. **音频检查**：确认有对应的 `ending-audio.mp3` 文件
5. **字幕检查**：确认有对应的 `ending-captions.json` 文件

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
remotionvideos/
├── src/
│   ├── Root.tsx                    # 视频组合入口
│   ├── <VideoName>Video.tsx        # 视频主组件
│   ├── components/
│   │   └── MermaidDiagram.tsx      # Mermaid 流程图组件
│   └── scenes/
│       └── <videoTopic>/
│           ├── Scene1_xxx.tsx
│           ├── Scene2_xxx.tsx
│           └── ...
├── public/
│   ├── diagrams/                   # Mermaid 预渲染 SVG 目录
│   │   ├── example.mmd             # Mermaid 源文件
│   │   └── example.svg             # 预渲染生成的 SVG
│   └── <VideoName>/
│       ├── scene1-audio.mp3
│       ├── scene1-captions.json
│       ├── scene1-image.png        # 场景1的图片（如需要）
│       ├── scene2-audio.mp3
│       ├── scene2-captions.json
│       ├── scene2-image.png        # 场景2的图片（如需要）
│       └── ...
└── scripts/
    ├── generate_audio_from_captions.py
    └── render-mermaid.mjs          # Mermaid 预渲染脚本
```

**图片资源管理**：

- 所有图片统一放在 `public/<VideoName>/` 目录下
- 图片命名建议：`sceneX-image.png` 或 `sceneX-diagram.png`
- 支持格式：PNG、JPG、SVG
- 建议尺寸：宽度 1080px（匹配视频宽度）

**Mermaid 流程图资源管理**：

- Mermaid 源文件（`.mmd`）和预渲染 SVG 统一放在 `public/diagrams/` 目录下
- 渲染命令：`npm run render-mermaid`（需要 Node.js 18+，已配置为 `~/.nvm/versions/node/v20.19.0/bin/node`）
- 生成的 SVG 文件在场景组件中通过 `MermaidDiagram` 组件引用

## 常用依赖

- **Remotion**: 视频渲染框架
- **Qwen3-TTS**: 文本转语音模型
- **pydub/librosa**: 音频处理
- **@remotion/transitions**: 场景转场效果

## EndingScene 实现要求

**每个视频必须包含 EndingScene 场景**，作为视频的标准结尾。

### EndingScene 组件位置

```
src/components/EndingScene.tsx
```

### EndingScene 组件模板

```typescript
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const EndingScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 淡入效果
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-blue-900 to-purple-900">
      <div
        className="flex flex-col items-center justify-center h-full text-white"
        style={{ opacity }}
      >
        <h1 className="text-6xl font-bold mb-8">5分钟 AI</h1>
        <p className="text-3xl">每天搞懂一个知识点！</p>
      </div>
    </AbsoluteFill>
  );
};
```

### EndingScene 音频内容

- **固定文本**："5 分钟 AI，每天搞懂一个知识点！"
- **音频文件**：`ending-audio.mp3`
- **字幕文件**：`ending-captions.json`
- **时长固定**：6 秒（180 帧）

### 在视频主组件中的使用

```typescript
import { EndingScene } from "./components/EndingScene";

// ... 所有内容场景之后 ...

<TransitionSeries.Sequence durationInFrames={180}>
  <EndingScene />
  <Html5Audio src={staticFile("VideoName/ending-audio.mp3")} volume={0.8} />
  <CaptionComponent
    audioFile="VideoName/ending-audio.mp3"
    captionFile="VideoName/ending-captions.json"
    startTimeMs={0}
  />
</TransitionSeries.Sequence>;
```

## AI 对话动画方案

当场景内容涉及 **AI 对话交互**（如展示提示词、演示 AI 问答流程、说明 AI 使用步骤等）时，启用以下标准动画方案。

### 布局结构

采用**左右两栏布局**：

- **左侧**：标题、说明文字、步骤卡片等原有内容（初始占满全宽）
- **右侧**：AI 对话动画窗口（初始宽度为 0，动画展开后为 480px）

### 右侧对话框展开动画

```typescript
const CHAT_SHOW_START = 80; // 对话框开始出现的帧数

// 宽度从 0 展开到 480，配合 overflow:hidden 裁剪
const chatPanelWidth = interpolate(
  frame,
  [CHAT_SHOW_START, CHAT_SHOW_START + 30],
  [0, 480],
  {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }
);
const chatPanelOpacity = interpolate(
  frame,
  [CHAT_SHOW_START, CHAT_SHOW_START + 20],
  [0, 1],
  {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }
);

// 右侧容器
<div
  style={{
    width: chatPanelWidth,
    flexShrink: 0,
    overflow: "hidden", // 关键：裁剪展开过程中的溢出内容
    display: "flex",
    flexDirection: "column",
    opacity: chatPanelOpacity,
  }}
>
  {/* 对话框内容 */}
</div>;
```

> ⚠️ **重要**：右侧宽度必须用动画从 `0` 展开，**不能**直接设置固定宽度，否则左侧内容从一开始就会被压缩。

### 对话框视觉设计

```typescript
// macOS 风格顶部标题栏
<div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "12px 12px 0 0", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
    {/* 红黄绿三色圆点 */}
    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
    <span style={{ marginLeft: 8, color: "#8b949e", fontSize: 13 }}>AI 对话</span>
</div>

// 用户气泡（右对齐，橙色）
<div style={{ alignSelf: "flex-end", background: "#f0883e", color: "#fff", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", maxWidth: "85%" }}>
    {userMessage}
</div>

// AI 气泡（左对齐，蓝色半透明）
<div style={{ alignSelf: "flex-start", background: "rgba(88,166,255,0.15)", border: "1px solid rgba(88,166,255,0.3)", color: "#c9d1d9", borderRadius: "12px 12px 12px 2px", padding: "10px 14px", maxWidth: "85%" }}>
    {aiMessage}
</div>
```

### 打字机效果

```typescript
// 打字机效果：根据帧数截取文字
const getTypingText = (
  text: string,
  startFrame: number,
  charsPerFrame = 1.2
) => {
  const elapsed = Math.max(0, frame - startFrame);
  const charsToShow = Math.floor(elapsed * charsPerFrame);
  return text.slice(0, charsToShow);
};

// 光标闪烁（每7帧切换）
const showCursor = (startFrame: number, text: string, charsPerFrame = 1.2) => {
  const elapsed = Math.max(0, frame - startFrame);
  const isDone = Math.floor(elapsed * charsPerFrame) >= text.length;
  return !isDone && Math.floor(frame / 7) % 2 === 0;
};
```

### 多轮对话时间线设计（以 3 步骤为例）

| 帧数范围  | 内容                       | 说明                       |
| --------- | -------------------------- | -------------------------- |
| 0 ~ 80    | 左侧内容展示               | 右侧宽度为 0，左侧占满全宽 |
| 80 ~ 110  | 右侧对话框展开             | 宽度从 0 → 480px           |
| 90 ~ 150  | 第 1 轮对话（AI 提问）     | 气泡弹性滑入 + 打字机效果  |
| 155 ~ 215 | 第 2 轮对话（用户回答）    | 用户气泡右对齐             |
| 220 ~ 280 | 第 3 轮对话（AI 输出结果） | AI 气泡左对齐              |
| 290+      | 完成提示                   | 底部提示文字淡入           |

### 气泡入场动画

```typescript
// 气泡从下方弹性滑入
const bubbleSlide = interpolate(frame, [startFrame, startFrame + 20], [30, 0], {
    easing: Easing.out(Easing.back(1.5)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
});
const bubbleOpacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
});
// 应用到气泡容器
style={{ transform: `translateY(${bubbleSlide}px)`, opacity: bubbleOpacity }}
```

---

## 小动画增强方案

为提升视频趣味性和观看体验，在场景中适当添加以下小动画效果：

### 1. 元素入场动画

```typescript
// 从下方滑入（卡片、标题等）
const slideUp = interpolate(frame, [startFrame, startFrame + 25], [40, 0], {
  easing: Easing.out(Easing.cubic),
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

// 弹性缩放入场（图标、徽章等）
const scaleIn = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
  easing: Easing.out(Easing.back(2)),
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
```

### 2. 持续循环动画

```typescript
// 上下浮动（装饰元素、图标）
const floatY = Math.sin(frame * 0.05) * 6;

// 脉冲缩放（强调元素）
const pulse = 1 + Math.sin(frame * 0.08) * 0.03;

// 旋转（加载图标等）
const rotate = (frame * 3) % 360;
```

### 3. 数字计数动画

```typescript
// 数字从0增长到目标值
const countUp = (target: number, startFrame: number, duration = 60) => {
  return Math.floor(
    interpolate(frame, [startFrame, startFrame + duration], [0, target], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
};
```

### 4. 进度条动画

```typescript
// 进度条从0%到100%
const progress = interpolate(frame, [startFrame, startFrame + 60], [0, 100], {
  easing: Easing.inOut(Easing.cubic),
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
<div
  style={{
    width: `${progress}%`,
    height: 4,
    background: "#f0883e",
    borderRadius: 2,
  }}
/>;
```

### 5. 粒子/装饰元素

```typescript
// 随机分布的装饰点（背景氛围）
const dots = Array.from({ length: 8 }, (_, i) => ({
  x: (i * 137) % 100, // 伪随机分布
  y: (i * 97) % 100,
  delay: i * 8,
  opacity: interpolate(frame, [i * 8, i * 8 + 20], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }),
}));
```

### 6. 高亮闪烁效果

```typescript
// 关键词高亮闪烁（吸引注意力）
const highlight = 0.7 + Math.sin(frame * 0.15) * 0.3;
<span style={{ color: `rgba(240, 136, 62, ${highlight})` }}>关键词</span>;
```

### 使用原则

- **适度原则**：每个场景最多 2-3 个小动画，避免视觉干扰
- **节奏感**：动画出现时机与讲解内容节奏匹配
- **一致性**：同类元素使用相同的动画风格
- **性能**：优先使用 CSS transform/opacity，避免频繁重排

---

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
8. **EndingScene 强制要求**：
   - 每个视频必须包含 EndingScene 场景
   - EndingScene 必须是最后一个场景
   - EndingScene 帧数固定为 180 帧（6 秒）
   - 必须导入 EndingScene 组件
   - 必须生成对应的音频和字幕文件
9. **AI 对话动画**：当场景涉及 AI 对话交互时，必须启用「AI 对话动画方案」章节中的标准方案，右侧对话框宽度必须从 0 动画展开，不得直接设置固定宽度
10. **小动画增强**：每个场景可适当添加 2-3 个小动画（浮动、脉冲、计数、进度条等），提升视频趣味性，参考「小动画增强方案」章节
11. **视觉引导强制要求**：
    - 讲解代码或关键概念时，必须为关键词添加动态高亮效果
    - 对比类场景必须使用分屏布局，不得用单一列表展示对比内容
    - 涉及数据流转的场景必须添加流动动画
12. **内容结构强制要求**：
    - 开场必须包含核心价值钩子（具体好处）
    - 必须包含至少一个实际应用案例场景
    - 复杂知识点后必须插入呼吸点（总结或类比）
    - 结尾必须包含开放性互动问题
    - 参考 [references/content-writer-guide.md](references/content-writer-guide.md) 中的必须遵守规则
13. **Mermaid 流程图**：
    - 文案中含有 mermaid 代码块时，先将其保存为 `public/diagrams/xxx.mmd` 文件
    - 运行 `npm run render-mermaid` 预渲染为 SVG（需要 Node.js 18+）
    - 在场景组件中使用 `MermaidDiagram` 组件展示，参考「Mermaid 流程图方案」章节

## Mermaid 流程图方案

当场景内容涉及**流程图、架构图、状态图**等可用 Mermaid 语法描述的图表时，使用以下标准方案。

### 工作流程

1. **提取 Mermaid 代码**：从文案 Markdown 中提取 mermaid 代码块
2. **保存为 `.mmd` 文件**：保存到 `public/diagrams/xxx.mmd`
3. **预渲染为 SVG**：运行 `npm run render-mermaid` 生成 SVG
4. **在场景中使用**：通过 `MermaidDiagram` 组件展示

### 预渲染命令

```bash
# 渲染 public/diagrams/ 目录下所有 .mmd 文件
npm run render-mermaid

# 渲染单个文件
~/.nvm/versions/node/v20.19.0/bin/node scripts/render-mermaid.mjs public/diagrams/my-flow.mmd
```

> ⚠️ **注意**：`npm run render-mermaid` 内部使用 Node.js 20，无需手动切换版本。

### MermaidDiagram 组件使用

**组件位置**：`src/components/MermaidDiagram.tsx`

```typescript
import { MermaidDiagram } from "../components/MermaidDiagram";

// 基础用法（居中展示，带淡入动画）
<MermaidDiagram
  svgFile="diagrams/my-flow.svg"
  width="80%"
  fadeInDuration={20}
  scaleIn={true}
/>

// 全宽展示（适合复杂流程图）
<MermaidDiagram
  svgFile="diagrams/architecture.svg"
  width="100%"
  fadeInDuration={15}
  scaleIn={false}
/>

// 带背景卡片
<MermaidDiagram
  svgFile="diagrams/flow.svg"
  width="85%"
  backgroundColor="rgba(255,255,255,0.06)"
  padding={24}
  borderRadius={16}
/>
```

### MermaidDiagram 组件参数

| 参数              | 类型             | 默认值          | 说明                             |
| ----------------- | ---------------- | --------------- | -------------------------------- |
| `svgFile`         | `string`         | 必填            | SVG 文件路径（相对 public 目录） |
| `width`           | `string\|number` | `"100%"`        | 组件宽度                         |
| `height`          | `string\|number` | `"auto"`        | 组件高度                         |
| `maxWidth`        | `string\|number` | `"100%"`        | 最大宽度                         |
| `fadeInDuration`  | `number`         | `20`            | 淡入动画帧数                     |
| `scaleIn`         | `boolean`        | `true`          | 是否启用缩放动画                 |
| `backgroundColor` | `string`         | `"transparent"` | 背景色                           |
| `padding`         | `string\|number` | `0`             | 内边距                           |
| `borderRadius`    | `string\|number` | `12`            | 圆角                             |
| `style`           | `CSSProperties`  | -               | 自定义样式                       |

### 在场景组件中集成

```typescript
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { MermaidDiagram } from "../../components/MermaidDiagram";

export const SceneWithDiagram: React.FC = () => {
  const frame = useCurrentFrame();

  // 文字内容先出现，流程图后出现
  const DIAGRAM_START = 60; // 第60帧开始显示流程图

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
      }}
    >
      {/* 标题区域 */}
      <div style={{ padding: "60px 40px 20px" }}>
        <h2 style={{ color: "#58a6ff", fontSize: 48 }}>流程说明</h2>
      </div>

      {/* Mermaid 流程图（延迟出现） */}
      {frame >= DIAGRAM_START && (
        <div style={{ padding: "0 40px", flex: 1 }}>
          <MermaidDiagram
            svgFile="diagrams/my-flow.svg"
            width="100%"
            fadeInDuration={20}
            scaleIn={true}
            backgroundColor="rgba(255,255,255,0.04)"
            padding={20}
            borderRadius={12}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
```

### 布局模式

**模式 1：全屏流程图**（适合复杂架构图）

```typescript
<AbsoluteFill
  style={{ padding: "80px 40px", display: "flex", flexDirection: "column" }}
>
  <h2>标题</h2>
  <MermaidDiagram
    svgFile="diagrams/arch.svg"
    width="100%"
    style={{ flex: 1 }}
  />
</AbsoluteFill>
```

**模式 2：上文字下流程图**（适合讲解型场景）

```typescript
<AbsoluteFill
  style={{
    padding: "60px 40px",
    display: "flex",
    flexDirection: "column",
    gap: 30,
  }}
>
  <div>{/* 文字说明 */}</div>
  <MermaidDiagram
    svgFile="diagrams/flow.svg"
    width="90%"
    style={{ alignSelf: "center" }}
  />
</AbsoluteFill>
```

**模式 3：左文字右流程图**（适合对比型场景）

```typescript
<AbsoluteFill
  style={{ display: "flex", flexDirection: "row", padding: "60px 30px" }}
>
  <div style={{ flex: 1 }}>{/* 左侧文字 */}</div>
  <div style={{ flex: 1 }}>
    <MermaidDiagram svgFile="diagrams/flow.svg" width="100%" />
  </div>
</AbsoluteFill>
```

### Mermaid 源文件示例

```
# public/diagrams/ai-flow.mmd
flowchart TD
    A[用户输入] --> B[AI 模型]
    B --> C{判断意图}
    C -->|工具调用| D[调用外部工具]
    C -->|直接回答| E[生成回复]
    D --> F[获取结果]
    F --> B
    E --> G[输出给用户]
```

---

## 相关 Skills

- [audio-duration-calculator](../audio-duration-calculator/SKILL.md) - 音频时长计算
- [remotion-best-practices](../remotion-best-practices/SKILL.md) - Remotion 最佳实践
