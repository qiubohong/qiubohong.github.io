# 音频字幕功能说明

## 概述

本功能为监督学习动画视频添加了音频字幕功能，支持TikTok风格的动态字幕显示效果。

## 功能特性

- ✅ **动态字幕显示**：支持逐词高亮效果
- ✅ **时间同步**：字幕与音频完美同步
- ✅ **多种样式**：支持自定义字体、颜色和位置
- ✅ **自动加载**：从JSON文件自动加载字幕数据

## 文件结构

```
remotion-videos/
├── src/
│   ├── components/
│   │   └── CaptionComponent.tsx    # 字幕组件
│   ├── scenes/                      # 视频场景组件
│   └── SupervisedLearningVideo.tsx  # 主视频组件（已集成字幕）
├── public/
│   ├── scene1-intro.mp3             # 音频文件
│   ├── scene1-intro-captions.json   # 字幕文件（自动生成）
│   └── ...其他音频和字幕文件
├── generate-captions.js             # 字幕生成脚本
└── README-captions.md              # 本说明文档
```

## 使用方法

### 1. 安装依赖

```bash
npm install
```

### 2. 生成字幕文件

```bash
npm run generate-captions
```

这将自动在`public/`目录下生成所有场景的字幕JSON文件。

### 3. 自定义字幕内容

编辑`generate-captions.js`文件中的`captionsData`对象，根据实际音频内容调整：

```javascript
const captionsData = {
  "scene1-intro": [
    { text: "你的字幕文本", startMs: 0, endMs: 2000 },
    // 更多字幕片段...
  ],
  // 其他场景...
};
```

### 4. 预览和渲染

```bash
# 预览视频（带字幕）
npm start

# 渲染最终视频
npm run build
```

## 字幕文件格式

字幕文件使用JSON格式，每个字幕片段包含：

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

- `text`: 字幕文本内容
- `startMs`: 字幕开始时间（毫秒）
- `endMs`: 字幕结束时间（毫秒）
- `timestampMs`: 时间戳（通常与startMs相同）
- `confidence`: 置信度（0-1之间）

## 字幕组件特性

### 动态高亮效果
字幕组件支持逐词高亮效果，当前播放的词会以绿色高亮显示。

### 自动时间同步
组件会自动计算当前帧对应的音频时间，确保字幕与音频完美同步。

### 错误处理
如果字幕文件加载失败，组件会优雅地不显示任何内容，避免影响视频渲染。

## 自定义配置

### 修改高亮颜色
在`CaptionComponent.tsx`中修改`HIGHLIGHT_COLOR`常量：

```typescript
const HIGHLIGHT_COLOR = "#FF0000"; // 改为红色
```

### 调整字幕显示频率
修改`SWITCH_CAPTIONS_EVERY_MS`常量控制字幕切换频率：

```typescript
const SWITCH_CAPTIONS_EVERY_MS = 2000; // 每2秒切换一次
```

### 修改字幕样式
在`CaptionComponent.tsx`中调整样式对象：

```typescript
style={{
  fontSize: 48,                    // 字体大小
  fontWeight: "bold",              // 字体粗细
  color: "white",                 // 字体颜色
  textShadow: "2px 2px 4px rgba(0,0,0,0.8)", // 文字阴影
  backgroundColor: "rgba(0,0,0,0.6)", // 背景颜色
  padding: "20px 40px",           // 内边距
  borderRadius: 10,                // 圆角
  maxWidth: "80%",                // 最大宽度
  lineHeight: 1.4                 // 行高
}}
```

## 注意事项

1. **时间戳精度**：确保字幕时间戳与音频内容精确匹配
2. **文件命名**：字幕文件必须与对应的音频文件命名一致（scene1-intro.mp3对应scene1-intro-captions.json）
3. **编码格式**：字幕文件使用UTF-8编码，支持中文
4. **性能优化**：字幕组件已优化，不会影响视频渲染性能

## 故障排除

### 字幕不显示
- 检查字幕文件路径是否正确
- 确认字幕文件格式是否有效JSON
- 检查音频文件是否存在

### 字幕不同步
- 检查字幕时间戳是否准确
- 确认音频文件时长与字幕时间范围匹配

### 高亮效果异常
- 检查字幕文本中的空格是否正确
- 确认时间戳没有重叠

## 扩展功能

如需更高级的字幕功能，可考虑：

- 集成语音识别自动生成字幕
- 添加多语言字幕支持
- 实现字幕搜索和跳转功能
- 添加字幕导出功能（SRT格式）