# generate_audio.py 更新说明

## 📋 更新内容

根据场景拆分方案，已更新 `generate_audio.py` 中的场景配置。

## ✅ 场景配置更新

### 原配置（6 个场景）

1. scene1 - 介绍
2. scene2 - 定义
3. scene3 - 5 个经典激活函数（合并）
4. scene4 - 函数性能对比
5. scene5 - 动手实验（合并）
6. scene6 - 冷知识（合并）

### 新配置（9 个场景）

1. **scene1** - 介绍
2. **scene2** - 定义
3. **scene3a** - 5 个经典激活函数-前 3 个（Sigmoid、Tanh、ReLU）✅ 新增
4. **scene3b** - 5 个经典激活函数-后 2 个（Leaky ReLU、Swish）✅ 新增
5. **scene4** - 函数性能对比
6. **scene5a** - 动手实验-代码展示 ✅ 新增
7. **scene5b** - 动手实验-观察重点 ✅ 新增
8. **scene6a** - 冷知识-前 2 个 ✅ 新增
9. **scene6b** - 冷知识-后 2 个 ✅ 新增

---

## 📝 音频脚本详情

### Scene3a（前 3 个激活函数）

**时长**：约 20 秒

**内容**：

```
接下来看5个经典激活函数！
第一个，Sigmoid。
公式是 f(x) = 1/(1+e^(-x))，
输出范围 0 到 1，适合二分类。
但要注意梯度消失问题。
第二个，Tanh。
公式是 f(x) = (e^x - e^(-x))/(e^x + e^(-x))，
输出范围 -1 到 1，常用于 RNN 和 LSTM。
梯度消失问题依然存在。
第三个，ReLU，90%现代网络首选！
公式超简单，f(x) = max(0, x)，
解决了梯度消失，
但要注意 Dead ReLU 问题。
```

**输出文件**：`scene3a-audio.mp3`

---

### Scene3b（后 2 个激活函数）

**时长**：约 15 秒

**内容**：

```
第四个，Leaky ReLU。
公式是 f(x) = max(0.01x, x)，
解决了 Dead ReLU 问题，
在负数区保留微小梯度，更稳定。
第五个，Swish，Google 黑科技！
公式是 f(x) = x * σ(x)，
Google Brain 用 AI 找到的，
精度超越 ReLU，移动端首选！
```

**输出文件**：`scene3b-audio.mp3`

---

### Scene5a（代码展示）

**时长**：约 10 秒

**内容**：

```
动手实验时间！
用 Python 可视化这些函数超简单！
只需要几行代码，
就能看到所有激活函数的曲线。
```

**输出文件**：`scene5a-audio.mp3`

---

### Scene5b（观察重点）

**时长**：约 8 秒

**内容**：

```
观察重点有两个。
第一，Sigmoid 和 Tanh 的饱和区，
两端平坦部分就是梯度消失的根源。
第二，ReLU 的负数截断，
直观看到 Dead ReLU 问题。
```

**输出文件**：`scene5b-audio.mp3`

---

### Scene6a（前 2 个冷知识）

**时长**：约 12 秒

**内容**：

```
最后分享几个超酷的冷知识！
第一个，神经元激活率。
Sigmoid 网络只有 3-5% 的神经元激活，太浪费了！
ReLU 网络激活率高达 50%，效率爆表！
第二个，Swish 的灵感来自生物。
它的平滑性源于神经突触的离子通道动力学。
```

**输出文件**：`scene6a-audio.mp3`

---

### Scene6b（后 2 个冷知识）

**时长**：约 13 秒

**内容**：

```
第三个，谷歌用 AI 找函数。
强化学习在 10 万种函数中发现 Swish，
超越人类设计！
第四个，宇宙级应用。
欧洲核子中心 CERN 用 GELU 处理粒子碰撞数据，
误差降低 38%！
```

**输出文件**：`scene6b-audio.mp3`

---

## 🚀 使用方法

### 1. 生成所有音频文件

```bash
cd public/ActivationVideo
python generate_audio.py
```

脚本将自动生成以下音频文件：

- ✅ scene1-audio.mp3
- ✅ scene2-audio.mp3
- ✅ scene3a-audio.mp3 ⭐ 新增
- ✅ scene3b-audio.mp3 ⭐ 新增
- ✅ scene4-audio.mp3
- ✅ scene5a-audio.mp3 ⭐ 新增
- ✅ scene5b-audio.mp3 ⭐ 新增
- ✅ scene6a-audio.mp3 ⭐ 新增
- ✅ scene6b-audio.mp3 ⭐ 新增

### 2. 生成字幕文件（可选）

如果需要使用 Remotion 自动生成字幕：

```bash
cd ../../remotion-videos

# 为新场景生成字幕
npx remotion transcribe ActivationVideo/scene3a-audio.mp3 ActivationVideo/scene3a-captions.json
npx remotion transcribe ActivationVideo/scene3b-audio.mp3 ActivationVideo/scene3b-captions.json
npx remotion transcribe ActivationVideo/scene5a-audio.mp3 ActivationVideo/scene5a-captions.json
npx remotion transcribe ActivationVideo/scene5b-audio.mp3 ActivationVideo/scene5b-captions.json
npx remotion transcribe ActivationVideo/scene6a-audio.mp3 ActivationVideo/scene6a-captions.json
npx remotion transcribe ActivationVideo/scene6b-audio.mp3 ActivationVideo/scene6b-captions.json
```

**注意**：字幕文件已经手动创建，遵循一行一句原则 [[memory:3g4lzqdy]]，可以直接使用。

### 3. 预览视频

```bash
cd remotion-videos
npm start
# 在浏览器中选择 ActivationFunctionVideo 预览
```

### 4. 渲染最终视频

```bash
npx remotion render ActivationFunctionVideo out/activation-function.mp4
```

---

## 📊 音频文件统计

| 场景 ID  | 场景名称        | 预计时长   | 输出文件          | 状态    |
| -------- | --------------- | ---------- | ----------------- | ------- |
| scene1   | 介绍            | 15 秒      | scene1-audio.mp3  | ✅      |
| scene2   | 定义            | 20 秒      | scene2-audio.mp3  | ✅      |
| scene3a  | 前 3 个激活函数 | 20 秒      | scene3a-audio.mp3 | ⭐ 新增 |
| scene3b  | 后 2 个激活函数 | 15 秒      | scene3b-audio.mp3 | ⭐ 新增 |
| scene4   | 性能对比        | 18 秒      | scene4-audio.mp3  | ✅      |
| scene5a  | 代码展示        | 10 秒      | scene5a-audio.mp3 | ⭐ 新增 |
| scene5b  | 观察重点        | 8 秒       | scene5b-audio.mp3 | ⭐ 新增 |
| scene6a  | 前 2 个冷知识   | 12 秒      | scene6a-audio.mp3 | ⭐ 新增 |
| scene6b  | 后 2 个冷知识   | 13 秒      | scene6b-audio.mp3 | ⭐ 新增 |
| **总计** | **9 个场景**    | **131 秒** | **9 个文件**      | -       |

---

## ⚙️ 技术参数

### Qwen3-TTS 配置

- **模型**：Qwen3-TTS-12Hz-1.7B-Base
- **语音角色**：温柔女生（统一风格）
- **参考音频**：borfy.mp3
- **采样策略**：
  - `temperature=0.3`（降低随机性，提高稳定性）
  - `top_k=10`（严格采样）
  - `top_p=0.7`（核采样）
  - `repetition_penalty=1.5`（减少重复）

### 音频后处理

- ✅ 音量标准化（0.7 倍）
- ✅ 预加重滤波（coef=0.97）
- ✅ 自动裁剪（超过 30 秒）
- ✅ 时长检测和验证

### 重试机制

- 最多重试 3 次
- 失败后等待 2 秒
- 自动跳过已存在的音频文件

---

## 🎯 优化特点

### 1. 音频时长控制

- ✅ 避免音频过长（自动裁剪超过 30 秒）
- ✅ 检测音频过短（小于 1 秒视为失败）
- ✅ 实时显示音频时长

### 2. 语音质量优化

- ✅ 降低温度参数（0.3），提高稳定性
- ✅ 严格采样策略，减少乱码
- ✅ 重复惩罚，避免语音重复

### 3. 音频后处理

- ✅ 音量标准化，确保音量一致
- ✅ 预加重滤波，提高清晰度
- ✅ 自动保存处理后的音频

### 4. 智能重试

- ✅ 自动重试失败的任务
- ✅ 跳过已存在的音频文件
- ✅ 详细的错误提示和建议

---

## 📝 与字幕文件的对应关系

| 音频文件          | 字幕文件              | 场景组件                    |
| ----------------- | --------------------- | --------------------------- |
| scene1-audio.mp3  | scene1-captions.json  | Scene1_Introduction.tsx     |
| scene2-audio.mp3  | scene2-captions.json  | Scene2_Definition.tsx       |
| scene3a-audio.mp3 | scene3a-captions.json | Scene3a_Functions_Part1.tsx |
| scene3b-audio.mp3 | scene3b-captions.json | Scene3b_Functions_Part2.tsx |
| scene4-audio.mp3  | scene4-captions.json  | Scene4_Comparison.tsx       |
| scene5a-audio.mp3 | scene5a-captions.json | Scene5a_HandsOn_Code.tsx    |
| scene5b-audio.mp3 | scene5b-captions.json | Scene5b_HandsOn_Points.tsx  |
| scene6a-audio.mp3 | scene6a-captions.json | Scene6a_FunFacts_Part1.tsx  |
| scene6b-audio.mp3 | scene6b-captions.json | Scene6b_FunFacts_Part2.tsx  |

---

## ⚠️ 注意事项

### 1. 模型路径

确保 Qwen3-TTS 模型路径正确：

```
../../../Qwen3-TTS-12Hz-1.7B-Base
```

### 2. 参考音频

确保参考音频文件存在：

```
../../../borfy.mp3
```

### 3. 依赖包

确保已安装所有依赖：

```bash
pip install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm
```

### 4. GPU 支持

- 如果有 GPU，将自动使用 GPU 加速
- 如果没有 GPU，将使用 CPU（速度较慢）

### 5. 字幕同步

- 字幕文件已手动创建，遵循一行一句原则
- 时间轴基于音频脚本估算
- 生成音频后，需要根据实际音频时长调整字幕时间轴

---

## ✅ 完成状态

- ✅ 场景配置已更新（6 个 → 9 个）
- ✅ 音频脚本已拆分
- ✅ 字幕文件已创建
- ✅ 场景组件已创建
- ✅ 主视频组件已更新
- ⏳ 等待生成音频文件

---

## 🚀 下一步操作

1. **生成音频文件**

   ```bash
   cd public/ActivationVideo
   python generate_audio.py
   ```

2. **验证音频时长**

   - 检查每个音频文件的时长
   - 确保与预期时长接近

3. **调整字幕时间轴**（如需要）

   - 根据实际音频时长调整字幕
   - 或使用 Remotion 自动生成字幕

4. **预览视频**

   ```bash
   cd remotion-videos
   npm start
   ```

5. **渲染最终视频**
   ```bash
   npx remotion render ActivationFunctionVideo out/activation-function.mp4
   ```

---

**generate_audio.py 更新完成！准备生成音频文件。** 🎉
