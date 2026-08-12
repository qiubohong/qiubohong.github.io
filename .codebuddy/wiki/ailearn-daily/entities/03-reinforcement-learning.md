---
entity: 强化学习
aliases: [Reinforcement Learning, RL]
category: clusters/01-ml-basics
source: source/source/_posts/ailearn/daily/03.md
date: 2025-06-26
---

# 强化学习（Reinforcement Learning）

> AI 在试错中成长，像小孩学走路，通过奖励/惩罚信号找到最优行为策略。

## 核心定义
通过与环境交互获得奖励/惩罚反馈，不断调整策略以最大化长期收益。分为免模型学习（Model-Free）与
有模型学习（Model-Based）两大类。

## 关键要点
- **免模型**：直接学习策略，试错→记下最佳动作，计算成本低（如 Q-Learning、DQN），案例：学骑电动车
- **有模型**：先理解环境规则→构建模拟器→规划行动，计算成本高（如动态规划、MCTS），案例：国际象棋推演
- 经典案例：AlphaGo走棋网络（免模型，每秒决策 100+ 次）、特斯拉自动驾驶仿真（有模型，CARLA 平台）
- DeepMind 用免模型 DQN 玩打砖块，2 小时超越人类水平，4 小时发现"挖地道"隐藏技巧

## 关联概念
- 同级：[监督学习](./01-supervised-learning.md)、[无监督学习](./02-unsupervised-learning.md)
- 思想关联：[Reflection](./24-reflection.md)（自我评估反馈机制与强化学习的"策略调整"思想同源）
- 所属聚类：[机器学习基础](../clusters/01-ml-basics.md)

## 来源
- `daily/03.md` 《5分钟AI，每天搞懂一个知识点(3) - 强化学习》（2025-06-26）
