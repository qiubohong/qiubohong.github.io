---
cluster: 机器学习基础
members: [监督学习, 无监督学习, 强化学习]
sources: [daily/01, daily/02, daily/03]
---

# 机器学习基础

机器学习是 AI 算法脉络的第一层分支，按"学习信号的来源"分为三大范式。三篇原文（`daily/01~03`）
在结构上完全对称：都是"是什么 → 怎么做（含子类型）→ 动手案例 → 冷知识"。

## 三大范式对比

| 维度 | [监督学习](../entities/01-supervised-learning.md) | [无监督学习](../entities/02-unsupervised-learning.md) | [强化学习](../entities/03-reinforcement-learning.md) |
|---|---|---|---|
| 数据形态 | 带标签 | 无标签 | 无标签，但有奖励信号 |
| 学习目标 | 拟合输入→输出映射 | 发现隐藏模式 | 找到最优行为策略 |
| 子类型 | 回归/ 分类 | 聚类 / 降维 / 关联 | 免模型 / 有模型 |
| 代表算法 | 线性回归、逻辑回归、SVM | K-means、PCA、关联规则挖掘 | Q-Learning/DQN、动态规划/MCTS |
| 典型场景 | 天气预测、图片分类 | 用户分群、词向量降维 | AlphaGo、自动驾驶仿真 |

## 下游关系

- 监督学习是 [Fine-tuning 家族](./06-fine-tuning.md) 的方法论基础——微调本质是"用带标签数据继续做监督学习"。
- 强化学习中的"策略梯度"思想（`daily/03` 提到的PPO）与 [Reflection](../entities/24-reflection.md)
  的"自我评估"机制同源，均来自"通过反馈信号迭代改进"这一底层逻辑。
- 三大范式共同构成了 [神经网络与深度学习](./02-neural-network.md) 的训练范式选项——`daily/05.md`
  明确指出"深度学习的学习可以是监督、半监督或无监督"。

## 关联聚类

- 下游：[神经网络与深度学习](./02-neural-network.md)、[模型微调技术](./06-fine-tuning.md)
