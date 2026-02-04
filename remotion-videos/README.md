# 监督学习动画视频项目

这是一个使用Remotion创建的监督学习概念讲解动画视频项目。

## 项目结构

```
src/
├── components/          # 通用组件
│   └── Transition.tsx   # 过渡效果组件
├── scenes/             # 视频场景组件
│   ├── Scene1_Introduction.tsx
│   ├── Scene2_Definition.tsx
│   ├── Scene3_Types.tsx
│   ├── Scene4_Regression.tsx
│   ├── Scene5_Classification.tsx
│   ├── Scene6_HandsOn.tsx
│   └── Scene7_FunFact.tsx
├── Root.tsx            # Remotion根配置
├── SupervisedLearningVideo.tsx  # 主视频组件
└── index.ts           # 入口文件
```

## 音频文件准备

项目需要以下音频文件，请将它们放置在 `public/` 目录下：

### 背景音乐
- `background-music.mp3` - 轻柔的背景音乐，会在整个视频中循环播放

### 场景解说音频
- `scene1-intro.mp3` - 场景1介绍解说（约6秒）
- `scene2-definition.mp3` - 场景2定义解说（约6秒）
- `scene3-types.mp3` - 场景3类型解说（约6秒）
- `scene4-regression.mp3` - 场景4回归解说（约6秒）
- `scene5-classification.mp3` - 场景5分类解说（约6秒）
- `scene6-hands-on.mp3` - 场景6动手试试解说（约6秒）
- `scene7-fun-fact.mp3` - 场景7冷知识解说（约6秒）

### 音频制作建议

1. **音频时长**：每个场景解说音频建议控制在6秒左右
2. **音频格式**：使用MP3格式，采样率44.1kHz
3. **音量控制**：解说音频音量应比背景音乐高，确保清晰可听
4. **音质要求**：使用清晰的语音录制，避免背景噪音

## 安装依赖

```bash
npm install
```

## 开发预览

```bash
npm start
```

## 渲染视频

```bash
npm run build
```

## 视频结构优化

项目已经过优化：

- **减少空白帧**：每个场景从8秒（240帧）优化到6秒（180帧）
- **缩短过渡效果**：从2秒（60帧）优化到1秒（30帧）
- **添加音频解说**：每个场景都有对应的解说音频
- **背景音乐**：添加了循环播放的背景音乐

## 总时长

优化后的视频总时长为：
- 7个场景 × 6秒 = 42秒
- 6个过渡效果 × 1秒 = 6秒
- **总计：48秒**

## 自定义配置

可以在 `Root.tsx` 中修改视频参数：

```tsx
<Composition
  id="SupervisedLearningVideo"
  component={SupervisedLearningVideo}
  durationInFrames={1440} // 48秒 × 30fps
  fps={30}
  width={1920}
  height={1080}
  defaultProps={{
    title: "5分钟AI，每天搞懂一个知识点(1) - 监督学习"
  }}
/>
```

## 📚 学习资源

- [原文章](https://qborfy.com) - 监督学习概念详解
- [Google Teachable Machine](https://teachablemachine.withgoogle.com/) - 动手实践工具
- [Remotion文档](https://www.remotion.dev/docs/) - 动画视频开发框架

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License


## python

```shell
conda create -n qwen3-tts python=3.12 -y
conda activate qwen3-tts
pip install -U modelscope
# 
modelscope download --model Qwen/Qwen3-TTS-Tokenizer-12Hz  --local_dir ./Qwen3-TTS-Tokenizer-12Hz 
modelscope download --model Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice --local_dir ./Qwen3-TTS-12Hz-1.7B-CustomVoice
modelscope download --model Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign --local_dir ./Qwen3-TTS-12Hz-1.7B-VoiceDesign
modelscope download --model Qwen/Qwen3-TTS-12Hz-1.7B-Base --local_dir ./Qwen3-TTS-12Hz-1.7B-Base
modelscope download --model Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice --local_dir ./Qwen3-TTS-12Hz-0.6B-CustomVoice
modelscope download --model Qwen/Qwen3-TTS-12Hz-0.6B-Base --local_dir ./Qwen3-TTS-12Hz-0.6B-Base
```

