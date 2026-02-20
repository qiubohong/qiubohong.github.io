# 场景拆分方案说明

## 📋 问题描述

场景 3、5、6 的布局太满，导致内容无法完整显示。

## ✅ 解决方案

### 方案 1：拆分场景 3（5 个激活函数）

**原场景**：Scene3_Functions.tsx（5 个函数，35 秒）

**拆分后**：

- **Scene3a_Functions_Part1.tsx**（前 3 个函数，20 秒）
  - Sigmoid
  - Tanh
  - ReLU（90%现代网络首选！）
- **Scene3b_Functions_Part2.tsx**（后 2 个重点函数，15 秒）
  - Leaky ReLU
  - Swish（Google 黑科技！）

**优化点**：

- 增大 padding：35-45px
- 增大字体：32-48px
- 增大间距：marginBottom 30-50px
- 更宽松的布局，内容更清晰

---

### 方案 2：拆分场景 5（动手实验）

**原场景**：Scene5_HandsOn.tsx（代码+观察重点，15 秒）

**拆分后**：

- **Scene5a_HandsOn_Code.tsx**（代码展示，10 秒）
  - 标题：动手实验时间！
  - Python 代码块（14 行代码）
- **Scene5b_HandsOn_Points.tsx**（观察重点，8 秒）
  - 标题：观察重点
  - 第一个重点：Sigmoid 和 Tanh 的饱和区
  - 第二个重点：ReLU 的负数截断

**优化点**：

- 增大标题字体：72px → 80px
- 增大代码字体：22px → 26px
- 增大 padding：30px → 40-45px
- 增大观察重点字体：30px → 38-48px
- 每个重点独立显示，间距更大
- 添加阴影效果，视觉层次更清晰

---

### 方案 3：拆分场景 6（冷知识）

**原场景**：Scene6_FunFacts.tsx（4 个冷知识，25 秒）

**拆分后**：

- **Scene6a_FunFacts_Part1.tsx**（前 2 个冷知识，12 秒）
  - 🔥 神经元激活率
  - 🧬 Swish 的灵感来自生物
- **Scene6b_FunFacts_Part2.tsx**（后 2 个冷知识，13 秒）
  - 🤖 谷歌用 AI 找函数
  - 🌌 宇宙级应用

**优化点**：

- 增大 padding：35px → 45px
- 增大字体：32px → 36px
- 增大标题字体：48px → 52px
- 增大间距：marginBottom 25-40px
- 更宽松的布局

---

## 🎬 视频结构调整

### 原结构（7 个场景）

1. Scene1_Introduction（15 秒）
2. Scene2_Definition（20 秒）
3. Scene3_Functions（35 秒）⚠️ 太满
4. Scene4_Comparison（18 秒）
5. Scene5_HandsOn（15 秒）⚠️ 太满
6. Scene6_FunFacts（25 秒）⚠️ 太满
7. EndingScene（6 秒）

**总时长**：134 秒（2 分 14 秒）

### 新结构（11 个场景）

1. Scene1_Introduction（15 秒）
2. Scene2_Definition（20 秒）
3. Scene3a_Functions_Part1（20 秒）✅ 优化
4. Scene3b_Functions_Part2（15 秒）✅ 优化
5. Scene4_Comparison（18 秒）
6. Scene5a_HandsOn_Code（10 秒）✅ 优化
7. Scene5b_HandsOn_Points（8 秒）✅ 优化
8. Scene6a_FunFacts_Part1（12 秒）✅ 优化
9. Scene6b_FunFacts_Part2（13 秒）✅ 优化
10. EndingScene（6 秒）

## **总时长**：137 秒（2 分 17 秒）

## 📝 音频脚本调整

### Scene3a 音频脚本（scene3a-audio.mp3）

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

### Scene3b 音频脚本（scene3b-audio.mp3）

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

### Scene5a 音频脚本（scene5a-audio.mp3）

```
动手实验时间！

用 Python 可视化这些函数超简单！
只需要几行代码，
就能看到所有激活函数的曲线。
```

### Scene5b 音频脚本（scene5b-audio.mp3）

```
观察重点有两个。

第一，Sigmoid 和 Tanh 的饱和区，
两端平坦部分就是梯度消失的根源。

第二，ReLU 的负数截断，
直观看到 Dead ReLU 问题。
```

### Scene6a 音频脚本（scene6a-audio.mp3）

```
最后分享几个超酷的冷知识！

第一个，神经元激活率。
Sigmoid 网络只有 3-5% 的神经元激活，太浪费了！
ReLU 网络激活率高达 50%，效率爆表！

第二个，Swish 的灵感来自生物。
它的平滑性源于神经突触的离子通道动力学。
```

### Scene6b 音频脚本（scene6b-audio.mp3）

```
第三个，谷歌用 AI 找函数。
强化学习在 10 万种函数中发现 Swish，
超越人类设计！

第四个，宇宙级应用。
欧洲核子中心 CERN 用 GELU 处理粒子碰撞数据，
误差降低 38%！
```

---

## 🚀 下一步操作

### 1. 生成新的音频文件

需要根据上述脚本生成以下音频文件：

```bash
cd public/ActivationVideo

# 需要生成的新音频文件：
# - scene3a-audio.mp3（替代原 scene3-audio.mp3 的前半部分）
# - scene3b-audio.mp3（替代原 scene3-audio.mp3 的后半部分）
# - scene5a-audio.mp3（替代原 scene5-audio.mp3 的前半部分）
# - scene5b-audio.mp3（替代原 scene5-audio.mp3 的后半部分）
# - scene6a-audio.mp3（替代原 scene6-audio.mp3 的前半部分）
# - scene6b-audio.mp3（替代原 scene6-audio.mp3 的后半部分）
```

### 2. 生成字幕文件

```bash
cd remotion-videos

# 为新场景生成字幕
npx remotion transcribe ActivationVideo/scene3a-audio.mp3 ActivationVideo/scene3a-captions.json
npx remotion transcribe ActivationVideo/scene3b-audio.mp3 ActivationVideo/scene3b-captions.json
npx remotion transcribe ActivationVideo/scene5a-audio.mp3 ActivationVideo/scene5a-captions.json
npx remotion transcribe ActivationVideo/scene5b-audio.mp3 ActivationVideo/scene5b-captions.json
npx remotion transcribe ActivationVideo/scene6a-audio.mp3 ActivationVideo/scene6a-captions.json
npx remotion transcribe ActivationVideo/scene6b-audio.mp3 ActivationVideo/scene6b-captions.json
```

### 3. 预览视频

```bash
npm start
# 在浏览器中选择 ActivationFunctionVideo 预览
```

### 4. 渲染最终视频

```bash
npx remotion render ActivationFunctionVideo out/activation-function.mp4
```

---

## 📊 布局对比

### 场景 3 - 优化前 vs 优化后

| 项目     | 优化前  | 优化后（3a/3b） |
| -------- | ------- | --------------- |
| 函数数量 | 5 个    | 3 个 / 2 个     |
| padding  | 25px    | 35-45px         |
| 字体大小 | 28-36px | 32-48px         |
| 间距     | 15px    | 30-50px         |
| 布局     | 拥挤    | 宽松 ✅         |

### 场景 5 - 优化前 vs 优化后

| 项目         | 优化前        | 优化后（5a/5b） |
| ------------ | ------------- | --------------- |
| 内容分布     | 代码+观察重点 | 代码 / 观察重点 |
| 标题字体     | 72px          | 80px            |
| 代码字体     | 22px          | 26px            |
| padding      | 30px          | 40-45px         |
| 观察重点字体 | 30px          | 38-48px         |
| 布局         | 拥挤          | 宽松 ✅         |
| 视觉效果     | 普通          | 添加阴影 ✅     |

### 场景 6 - 优化前 vs 优化后

| 项目       | 优化前  | 优化后（6a/6b） |
| ---------- | ------- | --------------- |
| 冷知识数量 | 4 个    | 2 个 / 2 个     |
| padding    | 35px    | 45px            |
| 字体大小   | 32-48px | 36-52px         |
| 间距       | 25px    | 40px            |
| 布局       | 拥挤    | 宽松 ✅         |

---

## ✅ 已完成的文件

### 新增场景组件

- ✅ `Scene3a_Functions_Part1.tsx`
- ✅ `Scene3b_Functions_Part2.tsx`
- ✅ `Scene5a_HandsOn_Code.tsx`
- ✅ `Scene5b_HandsOn_Points.tsx`
- ✅ `Scene6a_FunFacts_Part1.tsx`
- ✅ `Scene6b_FunFacts_Part2.tsx`

### 更新的主组件

- ✅ `ActivationFunctionVideo.tsx`

### 文档

- ✅ `SCENE_SPLIT_PLAN.md`（本文档）

---

## 🎯 预期效果

### 视觉效果

- ✅ 内容完整显示，不再被裁剪
- ✅ 布局更宽松，阅读体验更好
- ✅ 字体大小适中，清晰易读
- ✅ 间距合理，层次分明

### 用户体验

- ✅ 信息密度降低，更易理解
- ✅ 重点内容突出（ReLU、Swish）
- ✅ 节奏更流畅，不会感觉拥挤
- ✅ 完播率预期提升至 65%+

---

**拆分完成！准备生成音频和字幕文件。** 🎉
