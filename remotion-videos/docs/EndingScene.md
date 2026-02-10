# EndingScene 公共组件

## 概述
`EndingScene` 是一个可复用的视频结尾场景组件，用于所有视频的结尾部分。

## 位置
`src/components/EndingScene.tsx`

## 特性
- 淡入动画效果
- 结尾缩放效果
- 渐变色标题
- 可自定义文本内容

## Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `mainTitle` | `string` | `"感谢观看"` | 主标题文本 |
| `subtitle` | `string` | `"若喜欢请关注"` | 副标题文本 |
| `description` | `string` | `"每天5分钟，轻松学AI"` | 描述文本 |

## 使用示例

### 基本使用（使用默认文本）
```tsx
import { EndingScene } from "./components/EndingScene";

<TransitionSeries.Sequence durationInFrames={180}>
  <EndingScene />
  <Html5Audio src={staticFile("scene8-ending.mp3")} volume={0.8} />
  <CaptionComponent
    audioFile="scene8-ending.mp3"
    captionFile="scene8-ending-captions.json"
    startTimeMs={0}
  />
</TransitionSeries.Sequence>
```

### 自定义文本
```tsx
<TransitionSeries.Sequence durationInFrames={180}>
  <EndingScene 
    mainTitle="谢谢收看"
    subtitle="记得点赞关注"
    description="持续更新中"
  />
  <Html5Audio src={staticFile("ending.mp3")} volume={0.8} />
</TransitionSeries.Sequence>
```

## 推荐配置
- **持续时间**: 180 帧（6秒）
- **转场效果**: 淡入淡出（fade）
- **转场时长**: 30 帧（1秒）

## 已应用的视频
- SupervisedLearningVideo（监督学习）
- UnsupervisedLearningVideo（无监督学习）

## 注意事项
1. 确保在使用前添加转场效果，推荐使用 `fade()` 转场
2. 音频和字幕文件需要单独准备
3. 建议使用 6 秒（180帧）的持续时间以配合动画效果
