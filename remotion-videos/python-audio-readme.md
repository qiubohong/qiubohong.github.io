# Python音频生成项目使用说明

## 项目概述

本项目为监督学习动画视频提供音频生成功能，使用Python脚本自动生成所有场景的解说音频。

## 文件结构

```
remotion-videos/
├── tts.py                 # 主音频生成脚本
├── requirement.txt        # Python依赖配置
├── generate-audio.sh     # 一键生成脚本
├── audio-scripts.md      # 音频脚本和制作要求
├── audio-generation-tool.md # 详细音频生成方案
└── public/               # 生成的音频文件目录
    ├── scene1-intro.mp3
    ├── scene2-definition.mp3
    ├── scene3-types.mp3
    ├── scene4-regression.mp3
    ├── scene5-classification.mp3
    ├── scene6-hands-on.mp3
    └── scene7-fun-fact.mp3
```

## 快速开始

### 方法1：使用一键脚本（推荐）

```bash
# 给脚本执行权限
chmod +x generate-audio.sh

# 运行音频生成脚本
./generate-audio.sh
```

### 方法2：手动运行

```bash
# 安装依赖
pip3 install -r requirement.txt

# 运行Python脚本
python3 tts.py
```

## 音频配置

### 场景解说文本

每个场景的解说文本已预设：

- **场景1**：欢迎来到5分钟AI系列！今天我们来学习监督学习的基本概念。
- **场景2**：监督学习就像老师指导学生，通过带答案的数据集让AI学习规律。
- **场景3**：监督学习主要分为回归和分类两种类型，分别处理连续和离散数据。
- **场景4**：回归任务预测连续数值，比如天气预报中的温度预测。
- **场景5**：分类任务判断离散类别，比如识别图片中是猫还是狗。
- **场景6**：使用Google Teachable Machine，亲自体验监督学习的实际应用！
- **场景7**：ImageNet数据集包含1400万张图片，AI学习它相当于人类看16年照片！

### 音频技术规格

- **时长**：每个音频6秒
- **格式**：MP3格式
- **采样率**：44.1kHz
- **比特率**：128kbps
- **音量标准化**：-16 LUFS

## 依赖说明

### 核心依赖

- **gtts**：Google Text-to-Speech语音合成
- **pydub**：音频编辑和处理
- **librosa**：音频分析和处理
- **soundfile**：音频文件读写
- **numpy**：数值计算

### 可选依赖

如需使用其他TTS服务，可安装：
- **elevenlabs**：ElevenLabs语音合成
- **openai-whisper**：OpenAI语音识别
- **transformers**：HuggingFace模型（用于Qwen TTS）

## 自定义配置

### 修改解说文本

编辑`tts.py`文件中的`SCENE_SCRIPTS`字典：

```python
SCENE_SCRIPTS = {
    "scene1-intro": "你的自定义文本...",
    # ... 其他场景
}
```

### 调整音频参数

修改`tts.py`文件中的`AUDIO_CONFIG`：

```python
AUDIO_CONFIG = {
    "target_duration": 7.0,  # 修改目标时长
    "sample_rate": 48000,     # 修改采样率
    "bitrate": "192k",       # 修改比特率
}
```

### 使用其他TTS服务

当前使用Google TTS，如需使用其他服务：

1. **ElevenLabs**：
```python
from elevenlabs import generate, play
audio = generate(text="你的文本", voice="Rachel")
```

2. **Azure Speech**：
```python
import azure.cognitiveservices.speech as speechsdk
# Azure语音合成代码
```

## 故障排除

### 常见问题

1. **依赖安装失败**
   ```bash
   # 使用国内镜像源
   pip3 install -r requirement.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
   ```

2. **音频生成失败**
   - 检查网络连接（Google TTS需要网络）
   - 检查Python版本（需要Python 3.7+）
   - 检查依赖是否正确安装

3. **音频时长不准确**
   - 调整`target_duration`参数
   - 检查文本长度是否合适

### 调试模式

如需调试，可修改`tts.py`文件：

```python
# 在generate_tts_audio函数中添加调试信息
print(f"调试信息: {text}")
```

## 高级功能

### 批量处理多个项目

如需为多个视频项目生成音频，可创建配置文件：

```python
PROJECTS = {
    "supervised-learning": {
        "scene1": "文本1",
        "scene2": "文本2",
    },
    "unsupervised-learning": {
        "scene1": "文本3",
        "scene2": "文本4",
    }
}
```

### 音频质量优化

1. **降噪处理**：使用librosa的降噪功能
2. **均衡器调整**：使用pydub的均衡器
3. **多语言支持**：修改gtts的lang参数

## 集成到CI/CD

可将音频生成集成到自动化流程中：

```yaml
# GitHub Actions示例
name: Generate Audio
on:
  push:
    paths:
      - 'scripts/**'

jobs:
  generate-audio:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      - name: Install dependencies
        run: pip install -r requirement.txt
      - name: Generate audio
        run: python tts.py
```

## 性能优化

### 缓存机制

为避免重复生成相同音频，可添加缓存：

```python
import hashlib

def get_audio_hash(text):
    return hashlib.md5(text.encode()).hexdigest()

def check_cache(text, output_path):
    audio_hash = get_audio_hash(text)
    cache_file = f"cache/{audio_hash}.mp3"
    
    if os.path.exists(cache_file):
        shutil.copy(cache_file, output_path)
        return True
    return False
```

### 并行处理

使用多线程加速音频生成：

```python
from concurrent.futures import ThreadPoolExecutor

def generate_audio_parallel():
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = []
        for scene_name, script_text in SCENE_SCRIPTS.items():
            future = executor.submit(generate_scene_audio, scene_name, script_text)
            futures.append(future)
        
        # 等待所有任务完成
        for future in futures:
            future.result()
```

## 技术支持

如有问题，请检查：

1. Python版本和依赖是否正确安装
2. 网络连接是否正常
3. 文件权限是否正确
4. 查看错误日志信息

## 更新日志

- v1.0.0：初始版本，支持Google TTS音频生成
- v1.1.0：添加音频时长调整和音量标准化
- v1.2.0：添加一键生成脚本和详细文档

---

**注意**：本项目使用Google TTS服务，需要网络连接。音频质量取决于网络状况和TTS服务稳定性。