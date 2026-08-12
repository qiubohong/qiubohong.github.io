---
entity: 深度学习
aliases: [Deep Learning]
category: clusters/02-neural-network
source: source/source/_posts/ailearn/daily/05.md
date: 无日期
---

# 深度学习（Deep Learning）

> 让计算机像人类大脑一样，通过堆叠多层的"神经元网络"，从原始数据中自动学习由简单到复杂的多层次特征表达，
> 最终实现智能决策。

## 核心定义
基于学习数据表示的更广泛机器学习方法系列，而非特定任务算法；学习范式可以是监督、半监督或无监督。
核心差别在于特征提取环节由机器自动完成，不需要人工设计特征。

## 关键要点
- 与传统机器学习对比：特征工程从"人工设计"变为"自动学习"，数据利用率从"小样本有效"变为"需大规模数据"，
  非结构化数据（图像等）处理效果是核心优势领域
- 关键步骤：海量数据 → 神经网络算法（正则化 Dropout、反向传播优化Adam/SGD）→ 逐层特征抽象（ReLU）→
  智能输出 → 计算损失优化
- 三大里程碑：2012 AlexNet（ImageNet 错误率 26%→15%）、2016 AlphaGo（战胜李世石）、
  2020 GPT-3（1750 亿参数）

## 关联概念
- 上级：[神经网络](./04-neural-network.md)
- 下游：[卷积网络CNN](./06-cnn.md)、[循环网络RNN](./09-rnn.md)、[Transformer](./10-transformer.md)
- 所属聚类：[神经网络与深度学习](../clusters/02-neural-network.md)

## 来源
- `daily/05.md` 《5分钟AI，每天搞懂一个知识点(5) - 深度学习》（原文frontmatter 缺失 date 字段）
