---
entity: 监督学习
aliases: [Supervised Learning]
category: clusters/01-ml-basics
source: source/source/_posts/ailearn/daily/01.md
date: 2025-06-25
---

# 监督学习（Supervised Learning）

> 让 AI 像学生一样，通过「带答案的习题集」学习总结出规律，然后根据规律应用到新的习题中。

## 核心定义
把已分类/已标注的数据喂给模型，让模型自己学习输入到输出的映射规律，再对新的、未分类数据做预测。

## 关键要点
- 两大子类型：**回归**（连续数值预测，如天气温度，`Y=f(A,B,C,D)`）、**分类**（离散类别判断，如猫狗识别）
- 回归常用算法：线性回归、决策树回归；分类常用算法：逻辑回归、支持向量机
- ImageNet 数据集含 1400 万张标注图片，AI 学习它相当于人类不眠不休看 16 年照片

## 关联概念
- 同级：[无监督学习](./02-unsupervised-learning.md)、[强化学习](./03-reinforcement-learning.md)
- 下游：[Fine-tuning 总览](./19-fine-tuning.md)（微调本质是监督学习范式的延续）
- 所属聚类：[机器学习基础](../clusters/01-ml-basics.md)

## 来源
- `daily/01.md` 《5分钟AI，每天搞懂一个知识点(1) - 监督学习》（2025-06-25）
