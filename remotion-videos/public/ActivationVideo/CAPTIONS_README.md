# 激活函数视频字幕文件说明

## 📋 字幕文件列表

根据场景拆分方案，已创建以下字幕文件：

### ✅ 已创建的字幕文件

1. **scene3a-captions.json** - 场景 3a（前 3 个激活函数）

   - 时长：约 20 秒
   - 内容：Sigmoid、Tanh、ReLU
   - 字幕条目：13 条

2. **scene3b-captions.json** - 场景 3b（后 2 个激活函数）

   - 时长：约 15 秒
   - 内容：Leaky ReLU、Swish
   - 字幕条目：8 条

3. **scene5a-captions.json** - 场景 5a（代码展示）

   - 时长：约 10 秒
   - 内容：动手实验介绍
   - 字幕条目：4 条

4. **scene5b-captions.json** - 场景 5b（观察重点）

   - 时长：约 8 秒
   - 内容：两个观察重点
   - 字幕条目：5 条

5. **scene6a-captions.json** - 场景 6a（前 2 个冷知识）

   - 时长：约 12 秒
   - 内容：神经元激活率、Swish 的生物灵感
   - 字幕条目：6 条

6. **scene6b-captions.json** - 场景 6b（后 2 个冷知识）
   - 时长：约 13 秒
   - 内容：谷歌 AI 找函数、宇宙级应用
   - 字幕条目：6 条

---

## 📝 字幕规则

根据记忆要求，所有字幕文件遵循以下规则：

### 1. 一行一句原则

- ✅ 每个字幕条目显示一句完整的话
- ✅ 不将多句话合并在一起
- ✅ 保持语义完整性

### 2. 时间同步

- ✅ 每句话的时长根据音频实际时长设置
- ✅ 确保字幕与语音同步
- ✅ startMs 和 endMs 精确对应音频时间点

### 3. JSON 格式

```json
[
  {
    "text": "字幕文本",
    "startMs": 0,
    "endMs": 2000,
    "confidence": 1
  }
]
```

---

## 🎬 字幕与场景对应关系

| 场景文件                    | 字幕文件              | 音频文件          | 时长  |
| --------------------------- | --------------------- | ----------------- | ----- |
| Scene3a_Functions_Part1.tsx | scene3a-captions.json | scene3a-audio.mp3 | 20 秒 |
| Scene3b_Functions_Part2.tsx | scene3b-captions.json | scene3b-audio.mp3 | 15 秒 |
| Scene5a_HandsOn_Code.tsx    | scene5a-captions.json | scene5a-audio.mp3 | 10 秒 |
| Scene5b_HandsOn_Points.tsx  | scene5b-captions.json | scene5b-audio.mp3 | 8 秒  |
| Scene6a_FunFacts_Part1.tsx  | scene6a-captions.json | scene6a-audio.mp3 | 12 秒 |
| Scene6b_FunFacts_Part2.tsx  | scene6b-captions.json | scene6b-audio.mp3 | 13 秒 |

---

## ⚠️ 注意事项

### 1. 音频文件依赖

当前字幕文件的时间轴是基于音频脚本估算的。**实际使用前需要：**

1. 生成真实的音频文件（使用 generate_audio.py）
2. 根据实际音频时长调整字幕时间轴
3. 确保字幕与音频完全同步

### 2. 时间轴调整方法

如果实际音频时长与估算不同，需要按比例调整所有字幕的时间点：

```python
# 示例：如果实际音频是22秒，而估算是20秒
scale_factor = 22000 / 20000  # 1.1

for caption in captions:
    caption['startMs'] = int(caption['startMs'] * scale_factor)
    caption['endMs'] = int(caption['endMs'] * scale_factor)
```

### 3. 使用 Remotion 自动生成（推荐）

更精确的方法是使用 Remotion 的自动字幕生成功能：

```bash
# 生成音频后，使用 Remotion 自动生成字幕
npx remotion transcribe ActivationVideo/scene3a-audio.mp3 ActivationVideo/scene3a-captions.json
npx remotion transcribe ActivationVideo/scene3b-audio.mp3 ActivationVideo/scene3b-captions.json
npx remotion transcribe ActivationVideo/scene5a-audio.mp3 ActivationVideo/scene5a-captions.json
npx remotion transcribe ActivationVideo/scene5b-audio.mp3 ActivationVideo/scene5b-captions.json
npx remotion transcribe ActivationVideo/scene6a-audio.mp3 ActivationVideo/scene6a-captions.json
npx remotion transcribe ActivationVideo/scene6b-audio.mp3 ActivationVideo/scene6b-captions.json
```

---

## 🚀 下一步操作

### 1. 生成音频文件

```bash
cd public/ActivationVideo
python generate_audio.py
```

### 2. 验证字幕同步

```bash
cd ../../remotion-videos
npm start
# 在浏览器中预览，检查字幕与音频是否同步
```

### 3. 如需调整

- 如果字幕提前或延迟，调整 startMs 和 endMs
- 如果字幕显示时间过短或过长，调整时间间隔
- 确保每句话有足够的显示时间（建议至少 1.5 秒）

---

## 📊 字幕统计

| 场景     | 字幕条目数 | 平均每条时长 | 总时长      |
| -------- | ---------- | ------------ | ----------- |
| Scene3a  | 13 条      | 2.3 秒       | 30 秒       |
| Scene3b  | 8 条       | 2.25 秒      | 18 秒       |
| Scene5a  | 4 条       | 2 秒         | 8 秒        |
| Scene5b  | 5 条       | 2.1 秒       | 10.5 秒     |
| Scene6a  | 6 条       | 2.7 秒       | 16 秒       |
| Scene6b  | 6 条       | 2.3 秒       | 14 秒       |
| **总计** | **42 条**  | **2.3 秒**   | **96.5 秒** |

---

## ✅ 完成状态

- ✅ 所有字幕文件已创建
- ✅ 遵循一行一句原则
- ✅ 时间轴已初步设置
- ⚠️ 等待音频文件生成后进行最终调整

---

**字幕文件创建完成！** 🎉
