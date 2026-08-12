---
entity: 激活函数
aliases: [Activation Function]
category: clusters/02-neural-network
source: source/source/_posts/ailearn/daily/07.md
date: 2025-07-02
---

# 激活函数（Activation Function）

> 神经网络的"智能开关"：在 `f(x)=wx+b` 中，`f` 就是激活函数，负责把激活的神经元特征保留并映射输出。

## 核心定义
运行在人工神经网络神经元上的函数，负责将神经元输入映射到输出端。三大核心功能：引入非线性、特征过滤、
梯度调控。

## 关键要点
- 五大经典函数：Sigmoid（`(0,1)`，梯度消失严重）、Tanh（`(-1,1)`，输出中心化）、
  ReLU（`max(0,x)`，无梯度消失但有Dead ReLU 问题，现代网络首选）、Leaky ReLU（解决 Dead ReLU）、
  Swish（Google Brain 自动搜索发现，超越 ReLU 基准精度）
- Sigmoid 网络仅 3~5% 神经元激活，ReLU 网络激活率可达 50%
- CERN 用 GELU 函数处理粒子碰撞数据，误差降低 38%

## 关联概念
- 所属：[神经网络](./04-neural-network.md) 的训练机制组件
- 关联：[损失函数](./08-loss-function.md)（共同构成"神经元计算→激活→算损失"的训练三步）
- 所属聚类：[神经网络与深度学习](../clusters/02-neural-network.md)

## 来源
- `daily/07.md` 《5分钟AI，每天搞懂一个知识点(6) - 激活函数》（2025-07-02，原文标题序号"(6)"与文件序号 07 不一致，属原文笔误）
