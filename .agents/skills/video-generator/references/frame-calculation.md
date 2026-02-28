# 帧数计算指南

## 基本公式

```
场景帧数 = 音频时长(秒) × FPS + 缓冲帧数
```

**标准参数**：

- FPS: 30 帧/秒
- 缓冲帧数: 30 帧（约 1 秒）

## 计算示例

### 单场景计算

```
音频时长: 7.66秒
帧数 = 7.66 × 30 = 229.8 ≈ 230帧
加上缓冲: 230 + 30 = 260帧
```

### 总帧数计算

```
总帧数 = Σ(各场景帧数) + Σ(转场帧数) + 结尾帧数
```

**示例（RNN 视频）**：

- Scene1: 259 帧
- 转场 1: 20 帧
- Scene2: 827 帧
- 转场 2: 25 帧
- ...
- Scene7: 1398 帧
- 转场 7: 30 帧
- Ending: 140 帧

**总计**: 6139 帧 ≈ 204.6 秒

## 使用 audio-duration-calculator

```bash
# 计算单个音频
python .codebuddy/skills/audio-duration-calculator/scripts/get_audio_duration.py public/RNNVideo/scene1-audio.mp3 --frames --fps 30

# 批量计算
for file in public/RNNVideo/*-audio.mp3; do
    python .codebuddy/skills/audio-duration-calculator/scripts/get_audio_duration.py "$file" --frames --fps 30
done
```

## 输出解读

```
文件: scene1-intro-audio.mp3
时长: 7.66 秒
帧数: 229 帧 (@ 30 fps)
建议缓冲帧数: 259 帧 (原始帧数 + 30帧缓冲)
```

## 更新代码

### 视频组件更新

```typescript
// 更新 durationInFrames
<TransitionSeries.Sequence durationInFrames={259}>
  <Scene1 />
  <Html5Audio src={staticFile("VideoName/scene1-audio.mp3")} />
</TransitionSeries.Sequence>
```

### Root.tsx 更新

```typescript
<Composition
  id="VideoName"
  component={VideoName}
  durationInFrames={总帧数} // 更新这里
  fps={30}
  width={1920}
  height={1080}
/>
```

## 转场帧数参考

| 转场类型 | 建议帧数 | 时长(秒)  |
| -------- | -------- | --------- |
| fade     | 20-30    | 0.67-1.0  |
| slide    | 22-25    | 0.73-0.83 |
| wipe     | 15-20    | 0.5-0.67  |

## 注意事项

1. **四舍五入**：帧数取整数，向上取整更安全
2. **缓冲必要**：30 帧缓冲确保音频播放完整
3. **转场叠加**：转场帧数不计入场景帧数，需单独计算
4. **结尾处理**：结尾场景通常不需要额外缓冲
