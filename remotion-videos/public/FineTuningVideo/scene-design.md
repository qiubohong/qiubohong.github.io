# Fine-tuning 视频场景视觉设计文档

## 设计主题色

```typescript
const THEME = {
  // 背景
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  
  // 文字颜色
  titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
  
  // 强调色
  accentOrange: "#f0883e",
  accentYellow: "#ffd200",
  accentBlue: "#58a6ff",
  accentGreen: "#3fb950",
  
  // 卡片背景
  cardBg: "rgba(255,255,255,0.06)",
  cardBorder: "rgba(255,255,255,0.1)",
};
```

---

## Scene 1: 开场介绍

**构图方案**：全屏居中，大标题 + 副标题 + 开场白文字

**背景层（BG）**：
- 渐变色：linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)
- 弥散光球：
  - 蓝色光球：位置左上 20%, 30%，缓慢移动，blur(100px)，尺寸 400px
  - 橙色光球：位置右下 70%, 80%，缓慢移动，blur(80px)，尺寸 300px
- 装饰元素：半透明网格线（opacity 0.03）

**主体层（Subject）**：
- 大标题 "Fine-tuning"（font-size: 72px，font-weight: 900，渐变文字）
- 副标题 "模型微调技术"（font-size: 40px，color: #8b949e）
- 开场白文字（font-size: 32px，居中）
- 装饰线：标题下方橙色渐变线（宽度动画从0到100%）

**动效时间线**：
| 帧范围 | 动画内容 |
|--------|---------|
| 0~20 | 背景弥散光淡入 |
| 10~40 | 主标题 spring 弹入 |
| 30~50 | 副标题 fade + slideUp |
| 45~65 | 开场白文字 typewriter 效果 |
| 70~90 | 装饰线宽度从0到100% |

---

## Scene 2: 概念定义

**构图方案**：上下分屏，上标题 + 核心概念，下mermaid图展示

**背景层（BG）**：
- 同 Scene 1 背景
- 左侧添加垂直装饰条（宽度4px，渐变蓝色）

**主体层（Subject）**：
- 顶部标题 "什么是 Fine-tuning？"（font-size: 48px，font-weight: 700）
- 核心定义卡片（毛玻璃效果）：
  - 背景：rgba(255,255,255,0.06)
  - backdrop-filter: blur(16px)
  - border: 1px solid rgba(255,255,255,0.1)
  - border-radius: 16px
- 类比说明文字（font-size: 28px，行高 1.6）

**Mermaid 展示区域**：
- 位于画面下方 40% 区域
- 使用 Img 组件展示知识图谱
- 宽度：85%，居中
- 背景卡片：rgba(255,255,255,0.04)
- 圆角：12px

**动效时间线**：
| 帧范围 | 动画内容 |
|--------|---------|
| 0~15 | 标题 spring 滑入 |
| 15~40 | 定义卡片弹入 + 毛玻璃效果 |
| 30~55 | 文字逐行显示（stagger 5帧） |
| 60~90 | Mermaid 图淡入 + 轻微缩放（0.95→1） |

---

## Scene 3: 原理详解（重点场景 - 图片展示）

**构图方案**：左文字 + 右图片，三分法构图

**背景层（BG）**：
- 同 Scene 1
- 添加粒子装饰（8个小点，随机分布，缓慢淡入）

**主体层（Subject）**：
- 左侧区域（占 40%）：
  - 标题 "Fine-tuning 工作流程"（font-size: 40px）
  - 三阶段说明（每阶段一个卡片）
  - 卡片使用阶段专属色：
    - 预训练：蓝色 #58a6ff
    - 微调：橙色 #f0883e
    - 应用：绿色 #3fb950

- 右侧区域（占 60%）：
  - Fine-tuning 工作流程图展示
  - 图片路径：finetuning-workflow.png
  - 使用 Img 组件，width: 95%
  - 背景卡片：rgba(255,255,255,0.06)
  - 圆角：16px
  - 阴影：drop-shadow(0 8px 32px rgba(0,0,0,0.4))

**高亮效果**：
- 讲解到某一阶段时，该阶段卡片高亮（边框发光 + 背景变亮）
- 其他阶段变暗（opacity 0.5）

**动效时间线**：
| 帧范围 | 动画内容 |
|--------|---------|
| 0~20 | 标题淡入 |
| 15~45 | 三阶段卡片 stagger 入场（间隔15帧） |
| 50~70 | 右侧图片区域展开（宽度从0到60%） |
| 70~90 | 图片淡入 + scaleIn |
| 90~150 | 阶段高亮切换动画（配合讲解） |

---

## Scene 4: 呼吸点/总结

**构图方案**：全屏居中，简洁总结卡片

**背景层（BG）**：
- 使用蓝色调为主的渐变
- 弥散光球聚焦在中心区域

**主体层（Subject）**：
- 中心卡片（最大宽度 800px）：
  - 背景：rgba(88,166,255,0.1)
  - 边框：2px solid rgba(88,166,255,0.3)
  - 圆角：20px
  - 内边距：48px
- 总结文字（font-size: 32px，居中，行高 1.8）
- 关键词高亮（使用 accentOrange #f0883e）

**动效时间线**：
| 帧范围 | 动画内容 |
|--------|---------|
| 0~25 | 背景蓝色调渐变过渡 |
| 15~35 | 中心卡片 spring 弹入 |
| 30~60 | 文字逐行淡入 |
| 50~80 | 关键词高亮闪烁（pulse效果） |

---

## Scene 5: 训练策略对比（分屏对比布局）

**构图方案**：左右分屏对比，全量微调 vs LoRA

**背景层（BG）**：
- 中央分割线（1px，渐变）
- 左侧偏红色调（暗示高成本/复杂）
- 右侧偏绿色调（暗示高效/推荐）

**主体层（Subject）**：
- 左侧：全量微调
  - 标题："全量微调"（红色 accent #ff5555）
  - 特点列表（红色系边框卡片）
  - 成本图标（高）
  
- 右侧：参数高效微调（LoRA）
  - 标题："LoRA / PEFT"（绿色 accent #3fb950）
  - 特点列表（绿色系边框卡片）
  - 推荐标签（"推荐"badge）

- 中间对比图
  - 图片路径：lora-peft.png
  - 宽度：90%（跨越左右区域）
  - 位置：在中间偏下区域

**高亮效果**：
- 左右两侧交替高亮
- 推荐方案（右侧）有脉冲光效

**动效时间线**：
| 帧范围 | 动画内容 |
|--------|---------|
| 0~15 | 左右分屏同时滑入 |
| 15~40 | 左侧内容 stagger 入场 |
| 40~65 | 右侧内容 stagger 入场 |
| 65~90 | 中间对比图淡入 + 展开 |
| 90~120 | 推荐标签 pulse 动画 |

---

## Scene 6: 实际案例 - 客服微调

**构图方案**：AI 对话框动画（左文字 + 右对话框展开）

**背景层（BG）**：
- 同 Scene 1
- 添加 subtle grid pattern（opacity 0.02）

**主体层（Subject）**：
- 左侧（初始占 100%，对话框展开后占 55%）：
  - 标题 "实际案例：客服对话微调"
  - 案例说明文字
  - 数据格式示例卡片

- 右侧 AI 对话框（初始 width: 0，展开后 width: 480px）：
  - macOS 风格标题栏（红黄绿按钮）
  - 用户气泡（右对齐，橙色 #f0883e）
  - AI 气泡（左对齐，蓝色半透明）
  - 打字机效果展示对话流程

**图片集成**：
- 代码片段图片展示（OpenAI API 调用）
- 位置：在左侧内容下方
- 使用 Img 组件展示

**动效时间线**：
| 帧范围 | 动画内容 |
|--------|---------|
| 0~60 | 左侧内容展示 |
| 60~90 | 右侧对话框展开（width 0→480） |
| 90~150 | 多轮对话打字机效果 |
| 150~180 | 代码片段图片淡入 |

---

## Scene 7: 方法对比表格

**构图方案**：全屏表格展示 + 高亮行

**背景层（BG）**：
- 同 Scene 1

**主体层（Subject）**：
- 标题 "Fine-tuning vs 其他方法"
- 三列对比表格：
  - Prompt Engineering（蓝色）
  - RAG（橙色）
  - Fine-tuning（绿色，当前高亮）

- 表格行：
  - 成本、门槛、知识更新、适用场景、效果稳定性、推理速度

**高亮效果**：
- Fine-tuning 列有脉冲边框
- 当前讲解的行背景高亮

**动效时间线**：
| 帧范围 | 动画内容 |
|--------|---------|
| 0~20 | 标题淡入 |
| 20~50 | 表格结构展开 |
| 50~150 | 逐行 stagger 入场（每行间隔 15 帧） |
| 90~150 | Fine-tuning 列高亮 pulse |

---

## Scene 8: 结尾（EndingScene）

**构图方案**：全屏居中，简洁有力

**使用组件**：`EndingScene`（标准结尾组件）

**背景层（BG）**：
- 蓝紫渐变：linear-gradient(135deg, #1a237e 0%, #311b92 50%, #4a148c 100%)
- 弥散光球：紫色 + 橙色

**主体层（Subject）**：
- 主标题 "5分钟 AI"（font-size: 64px，渐变文字）
- 副标题 "每天搞懂一个知识点！"（font-size: 36px）
- 互动问题（font-size: 28px，opacity 0.8）

**动效时间线**：
| 帧范围 | 动画内容 |
|--------|---------|
| 0~30 | 背景淡入 |
| 20~50 | 主标题 spring 弹入 |
| 45~70 | 副标题 fadeIn |
| 90~120 | 互动问题淡入 |
| 120~180 | 全部内容 stable |

---

## 通用组件规范

### 弥散光球组件

```typescript
const GlowOrb = ({ color, position, size, delay = 0 }) => {
  const opacity = interpolate(frame, [delay, delay + 30], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = position.x + Math.sin((frame - delay) * 0.01) * 10;
  const y = position.y + Math.cos((frame - delay) * 0.008) * 8;
  
  return (
    <div style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: "blur(80px)",
      left: x + "%",
      top: y + "%",
      transform: "translate(-50%, -50%)",
      opacity,
    }} />
  );
};
```

### 毛玻璃卡片

```typescript
const GlassCard = ({ children, highlight = false }) => (
  <div style={{
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(16px)",
    border: highlight 
      ? "2px solid rgba(88,166,255,0.5)" 
      : "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: highlight ? "0 0 30px rgba(88,166,255,0.2)" : "none",
  }}>
    {children}
  </div>
);
```

### 文字入场 Spring 动画

```typescript
const useSpringIn = (frame, fps, startFrame = 0) => {
  const springValue = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: {
      stiffness: 100,
      damping: 20,
      mass: 1.2,
    },
  });
  
  const y = interpolate(springValue, [0, 1], [40, 0]);
  const opacity = interpolate(springValue, [0, 1], [0, 1]);
  
  return { y, opacity, springValue };
};
```
