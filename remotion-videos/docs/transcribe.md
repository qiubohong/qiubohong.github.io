# transcribe.py — MP3 转 Remotion 字幕 JSON 工具

基于 [whisper-timestamped](https://github.com/linto-ai/whisper-timestamped) 实现逐字时间戳对齐，将音频文件转换为 Remotion 可直接使用的字幕 JSON。

---

## 安装依赖

```bash
# 安装 Python 依赖
pip install whisper-timestamped

# 安装 ffmpeg（音频处理必备）
brew install ffmpeg        # Mac
choco install ffmpeg       # Windows
```

---

## 使用方式

### 基础用法

```bash
# 转换音频，自动生成同名 .json 文件（audio.mp3 → audio.json）
python transcribe.py audio.mp3
```

### 指定输出路径

```bash
# 直接输出到 Remotion src 目录
python transcribe.py audio.mp3 -o src/captions/scene1.json
```

### 指定模型精度

```bash
# 使用 medium 模型（精度更高，适合背景音嘈杂的场景）
python transcribe.py audio.mp3 -m medium
```

### 指定语言

```bash
# 英文音频
python transcribe.py audio.mp3 -l en

# 自动检测语言
python transcribe.py audio.mp3 -l auto
```

### 转换后打印预览

```bash
python transcribe.py audio.mp3 --preview
```

### 完整参数示例

```bash
python transcribe.py audio.mp3 -o src/captions/scene1.json -m medium -l zh --preview
```

---

## 参数说明

| 参数 | 简写 | 默认值 | 说明 |
|------|------|--------|------|
| `audio` | — | 必填 | 输入音频文件路径（支持 mp3/wav/m4a 等） |
| `--output` | `-o` | 同名 .json | 输出 JSON 文件路径 |
| `--model` | `-m` | `base` | Whisper 模型大小，见下表 |
| `--language` | `-l` | `zh` | 语言代码，`zh` 中文 / `en` 英文 |
| `--preview` | — | 关闭 | 转换完成后打印前 3 条字幕预览 |

### 模型选择

| 模型 | 速度 | 精度 | 推荐场景 |
|------|------|------|----------|
| `tiny` | 最快 | 一般 | 快速验证 |
| `base` | 快 | 一般 | 安静环境（默认） |
| `small` | 中 | 较好 | 日常使用推荐 |
| `medium` | 慢 | 高 | 背景音嘈杂 |
| `large` | 最慢 | 最高 | 高精度需求 |

> 💡 有 NVIDIA 显卡时，可在脚本中将 `device="cpu"` 改为 `device="cuda"`，速度提升 10 倍以上。

---

## 输出格式

生成的 JSON 文件结构如下：

```json
[
  {
    "text": "让AI给自己的代码做Code Review",
    "start": 0.0,
    "end": 3.5,
    "words": [
      { "word": "让", "start": 0.0, "end": 0.2 },
      { "word": "AI", "start": 0.2, "end": 0.5 },
      { "word": "给", "start": 0.5, "end": 0.65 }
    ]
  }
]
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `text` | string | 整句文本 |
| `start` | number | 句子开始时间（秒） |
| `end` | number | 句子结束时间（秒） |
| `words[].word` | string | 单字文本（已去除附着标点） |
| `words[].start` | number | 单字开始时间（秒） |
| `words[].end` | number | 单字结束时间（秒） |

---

## 在 Remotion 中使用

1. 运行脚本，将生成的 JSON 放到 `src/` 目录下：

```bash
python transcribe.py borfy.mp3 -o src/captions/borfy.json
```

2. 在 React 组件中导入：

```ts
import captions from "./captions/borfy.json";
```

3. 配合 `useCurrentFrame` 实现卡拉 OK 高亮效果：

```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();
const currentTime = frame / fps;

// 找到当前时间对应的句子
const currentSegment = captions.find(
  (seg) => currentTime >= seg.start && currentTime <= seg.end
);

// 找到当前高亮的字
const currentWord = currentSegment?.words.find(
  (w) => currentTime >= w.start && currentTime <= w.end
);
```
