---
entity: 无监督学习
aliases: [Unsupervised Learning]
category: clusters/01-ml-basics
source: source/source/_posts/ailearn/daily/02.md
date: 2025-06-26
---

# 无监督学习（Unsupervised Learning）

> 让 AI 在「没有标准答案」的数据中自己发现规律——像人类探索未知世界！

## 核心定义
从未标记数据中挖掘隐藏模式，通常采用聚类、降维、关联等算法发现数据中的规律。关键特征：无老师指导、数据无标签；
但≠完全不需要人类（仍需设计算法目标）。

## 关键要点
- **聚类**（K-means）：解决"哪些东西本质相似"，如自助餐厅菜品自动分区
- **降维**（PCA）：解决"如何简化复杂信息"，如购房决策 20 维参数压缩为2 维
- **关联**（Association Rules）：解决"哪些事总一起发生"，如"薯片+可乐→纸巾"的购物篮分析
- 实际案例：亚马逊DeepCluster 商品分类、NASA t-SNE 星系图像分析、7-Eleven 关东煮+清酒关联销售

## 关联概念
- 同级：[监督学习](./01-supervised-learning.md)、[强化学习](./03-reinforcement-learning.md)
- 相关：[Embedding](./13-embedding.md)（降维与向量表示在数学本质上相通）
- 所属聚类：[机器学习基础](../clusters/01-ml-basics.md)

## 来源
- `daily/02.md` 《5分钟AI，每天搞懂一个知识点(2) - 无监督学习》（2025-06-26）
