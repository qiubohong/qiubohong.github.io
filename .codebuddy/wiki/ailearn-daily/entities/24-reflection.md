---
entity: Reflection
aliases: [反思模式]
category: clusters/05-agent-patterns
source: source/source/_posts/ailearn/daily/24.md
date: 2026-03-25
---

# Reflection（反思）

> 让 AI 学会"自我检讨"——做完任务回头看看做得怎么样，哪里可以改进，然后迭代优化。类比写代码"写-跑-改"循环。

## 核心定义
三步核心流程：**生成（Generate）**完成任务输出初始结果 → **反思（Reflect）**审视输出找出问题 →
**优化（Refine）**根据反思重新生成，可循环多次直到质量满意。

## 关键要点
- 与 ReAct 的关系：ReAct 是"边想边做"（过程优化），Reflection 是"做完再想"（结果优化），两者结合使用效果更好
- 进阶实现：结构化反思（JSON 格式评分：completeness/accuracy/clarity），设定质量阈值达标即停止
- 出自 2023 年论文《Reflexion: Language Agents with Verbal Reinforcement Learning》
- 与 Self-Consistency 不同：Self-Consistency 是"广度"（多答案取最优），Reflection 是"深度"（同一答案反复打磨）
- GPT-4 比 GPT-3.5 反思效果好很多，弱模型做Reflection 有时会越改越差

## 关联概念
- 对照：[ReAct](./23-react.md)
- 思想同源：[强化学习](./03-reinforcement-learning.md)（自我评估反馈机制）
- 所属聚类：[AI Agent 与设计模式](../clusters/05-agent-patterns.md)

## 来源
- `daily/24.md` 《5分钟AI，每天搞懂一个知识点(24) - Reflection》（2026-03-25）
