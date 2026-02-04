# 监督学习视频 - 音频生成工具

## 快速音频生成方案

### 方案1：使用AI语音合成（推荐）

#### 使用Azure Speech Services

```bash
# 安装Azure Speech SDK
pip install azure-cognitiveservices-speech
```

```python
# azure_speech_generator.py
import azure.cognitiveservices.speech as speechsdk
import os

# Azure配置
speech_key = "YOUR_AZURE_KEY"
service_region = "eastasia"

# 场景解说文本
scenes = {
    "scene1-intro": "欢迎来到5分钟AI系列！今天我们来学习监督学习的基本概念。",
    "scene2-definition": "监督学习就像老师指导学生，通过带答案的数据集让AI学习规律。",
    "scene3-types": "监督学习主要分为回归和分类两种类型，分别处理连续和离散数据。",
    "scene4-regression": "回归任务预测连续数值，比如天气预报中的温度预测。",
    "scene5-classification": "分类任务判断离散类别，比如识别图片中是猫还是狗。",
    "scene6-hands-on": "使用Google Teachable Machine，亲自体验监督学习的实际应用！",
    "scene7-fun-fact": "ImageNet数据集包含1400万张图片，AI学习它相当于人类看16年照片！"
}

def generate_audio(text, filename):
    speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
    
    # 使用中文语音合成
    speech_config.speech_synthesis_voice_name = "zh-CN-XiaoxiaoNeural"
    
    # 音频输出配置
    audio_config = speechsdk.audio.AudioOutputConfig(filename=f"public/{filename}.mp3")
    
    synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)
    
    # 设置语音合成参数
    ssml = f"""
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-CN">
        <voice name="zh-CN-XiaoxiaoNeural">
            <prosody rate="0.9" volume="0.8">{text}</prosody>
        </voice>
    </speak>
    """
    
    result = synthesizer.speak_ssml_async(ssml).get()
    
    if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        print(f"成功生成: {filename}.mp3")
    else:
        print(f"生成失败: {filename}")

# 生成所有音频
for scene_name, text in scenes.items():
    generate_audio(text, scene_name)
```

#### 使用Google Text-to-Speech

```python
# google_tts_generator.py
from gtts import gTTS
import os

# 场景解说文本
scenes = {
    "scene1-intro": "欢迎来到5分钟AI系列！今天我们来学习监督学习的基本概念。",
    "scene2-definition": "监督学习就像老师指导学生，通过带答案的数据集让AI学习规律。",
    "scene3-types": "监督学习主要分为回归和分类两种类型，分别处理连续和离散数据。",
    "scene4-regression": "回归任务预测连续数值，比如天气预报中的温度预测。",
    "scene5-classification": "分类任务判断离散类别，比如识别图片中是猫还是狗。",
    "scene6-hands-on": "使用Google Teachable Machine，亲自体验监督学习的实际应用！",
    "scene7-fun-fact": "ImageNet数据集包含1400万张图片，AI学习它相当于人类看16年照片！"
}

def generate_audio(text, filename):
    tts = gTTS(text=text, lang='zh-cn', slow=False)
    tts.save(f"public/{filename}.mp3")
    print(f"成功生成: {filename}.mp3")

# 生成所有音频
for scene_name, text in scenes.items():
    generate_audio(text, scene_name)
```

### 方案2：使用在线音频编辑工具

#### 推荐工具：
1. **Descript** - 专业音频编辑，支持AI语音克隆
2. **Audacity** - 免费开源音频编辑器
3. **Adobe Audition** - 专业音频处理软件
4. **在线录音工具** - 如Voice Recorder、Online Voice Recorder

#### 使用Audacity的批量处理脚本：

```bash
# 使用Audacity命令行处理
# 1. 录制音频文件
# 2. 应用标准化效果：
#   - 标准化音量到-16 LUFS
#   - 应用压缩效果
#   - 降噪处理
#   - 导出为MP3格式
```

### 方案3：使用专业配音服务

#### 推荐平台：
- **喜马拉雅** - 专业配音服务
- **配音圈** - 中文配音平台
- **Fiverr** - 国际配音服务

#### 要求规格：
- **语言**：普通话
- **语速**：适中（约180字/分钟）
- **音色**：清晰、专业、亲和
- **格式**：MP3，44.1kHz，128kbps

## 背景音乐制作

### 推荐音乐来源：

#### 免费音乐库：
- **YouTube Audio Library** - 免费背景音乐
- **Bensound** - 免费背景音乐
- **Free Music Archive** - 免费音乐库

#### 推荐音乐类型：
- **轻柔电子** - 适合科技主题
- **环境音乐** - 营造学习氛围
- **轻音乐** - 不干扰解说

### 背景音乐要求：
- **时长**：至少48秒（可循环）
- **音量**：-20dB以下，不干扰解说
- **风格**：轻柔、科技感、无歌词
- **版权**：确保可商用

## 音频文件检查清单

### 文件命名检查：
```bash
# 检查音频文件是否存在
ls -la public/*.mp3

# 预期输出：
# background-music.mp3
# scene1-intro.mp3
# scene2-definition.mp3
# scene3-types.mp3
# scene4-regression.mp3
# scene5-classification.mp3
# scene6-hands-on.mp3
# scene7-fun-fact.mp3
```

### 音频质量检查：
```bash
# 使用ffmpeg检查音频信息
ffmpeg -i public/scene1-intro.mp3

# 检查时长（应为6秒左右）
ffprobe -i public/scene1-intro.mp3 -show_entries format=duration -v quiet -of csv="p=0"

# 检查音量水平
ffmpeg -i public/scene1-intro.mp3 -af "volumedetect" -f null /dev/null
```

### 批量处理脚本：
```bash
#!/bin/bash
# audio_check.sh

# 检查所有音频文件
echo "=== 音频文件检查 ==="

for file in public/*.mp3; do
    if [ -f "$file" ]; then
        duration=$(ffprobe -i "$file" -show_entries format=duration -v quiet -of csv="p=0")
        echo "文件: $(basename $file)"
        echo "时长: ${duration}秒"
        echo "大小: $(du -h "$file" | cut -f1)"
        echo "---"
    else
        echo "缺失文件: $(basename $file)"
    fi
done
```

## 快速开始指南

### 步骤1：选择生成方案
- **推荐**：使用Google TTS（最简单）
- **专业**：使用Azure Speech Services（质量更好）
- **定制**：专业配音服务（最佳效果）

### 步骤2：安装依赖
```bash
# Google TTS方案
pip install gtts

# Azure方案
pip install azure-cognitiveservices-speech
```

### 步骤3：生成音频
```bash
# 运行生成脚本
python google_tts_generator.py

# 或
python azure_speech_generator.py
```

### 步骤4：测试音频
```bash
# 运行检查脚本
bash audio_check.sh

# 预览音频效果
npm start
```

## 故障排除

### 常见问题：

1. **音频时长过长**：调整语速或精简文本
2. **音量不匹配**：使用音频编辑工具标准化音量
3. **背景噪音**：应用降噪效果
4. **文件格式错误**：确保导出为MP3格式

### 质量优化建议：
- 使用专业录音设备
- 在安静环境中录制
- 应用音频后期处理
- 测试不同播放设备的效果

## 最终验证

完成音频制作后，运行以下命令验证：

```bash
# 1. 检查文件完整性
bash audio_check.sh

# 2. 预览视频效果
npm start

# 3. 渲染测试视频
npm run build -- --sequence=0-100
```

现在您可以开始制作高质量的音频解说了！