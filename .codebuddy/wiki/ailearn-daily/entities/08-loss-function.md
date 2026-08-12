---
entity: 损失函数
aliases: [Loss Function]
category: clusters/02-neural-network
source: source/source/_posts/ailearn/daily/08.md
date: 2025-07-03
---

# 损失函数（Loss Function）

> 用来衡量模型预测值与真实值之间差异的函数，是优化算法的目标。生活化理解：驾校教练根据学员压线距离扣分。

## 核心定义
将随机事件的取值映射为非负实数以表示"风险/损失"的函数。三要素：量化误差、优化导向（为梯度下降提供更新方向）、
任务适配（分类→交叉熵，回归→MSE）。

## 关键要点
- 五大经典损失函数：MSE（回归，抗噪弱）、交叉熵（分类，抗噪强）、Hinge Loss（分类，SVM）、
  Focal Loss（不平衡样本分类）、Huber Loss（生成任务，抗噪强）
- 选择黄金准则：分类优先交叉熵→样本不平衡升级 Focal Loss；回归首选 MSE→需抗噪切 Huber；
  生成任务需组合损失（如 GAN 的对抗损失+L1 像素损失）
- AlphaGo Zero 损失函数包含"赢棋概率预测"+"落子分布 KL 散度"双目标驱动进化

## 关联概念
- 所属：[神经网络](./04-neural-network.md) 的训练机制组件
- 关联：[激活函数](./07-activation-function.md)
- 下游：[Fine-tuning](./19-fine-tuning.md) 中的困惑度/BLEU 等评估指标本质是损失函数的应用延伸
- 所属聚类：[神经网络与深度学习](../clusters/02-neural-network.md)

## 来源
- `daily/08.md` 《5分钟AI，每天搞懂一个知识点(8) - 损失函数》（2025-07-03）
