#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 字幕数据模板 - 需要根据实际音频内容手动填写
const captionsData = {
  "scene1-intro": [
    { text: "欢迎来到监督学习的世界！", startMs: 0, endMs: 2000 },
    { text: "在这个视频中，我们将一起探索机器学习的重要分支", startMs: 2000, endMs: 5000 },
    { text: "监督学习的基本概念、类型和应用场景", startMs: 5000, endMs: 8000 }
  ],
  "scene2-definition": [
    { text: "什么是监督学习？", startMs: 0, endMs: 1500 },
    { text: "监督学习是一种机器学习方法，通过标记数据训练模型", startMs: 1500, endMs: 5000 },
    { text: "模型学习输入特征与输出标签之间的映射关系", startMs: 5000, endMs: 8000 }
  ],
  "scene3-types": [
    { text: "监督学习主要分为两大类", startMs: 0, endMs: 2000 },
    { text: "回归和分类问题", startMs: 2000, endMs: 4000 },
    { text: "回归预测连续值，分类预测离散类别", startMs: 4000, endMs: 7000 }
  ],
  "scene4-regression": [
    { text: "回归问题示例", startMs: 0, endMs: 1500 },
    { text: "预测房价、股票价格等连续数值", startMs: 1500, endMs: 4000 },
    { text: "线性回归、决策树回归是常用算法", startMs: 4000, endMs: 7000 }
  ],
  "scene5-classification": [
    { text: "分类问题示例", startMs: 0, endMs: 1500 },
    { text: "垃圾邮件识别、图像分类等", startMs: 1500, endMs: 3500 },
    { text: "逻辑回归、支持向量机是常用算法", startMs: 3500, endMs: 6500 }
  ],
  "scene6-hands-on": [
    { text: "动手试试监督学习", startMs: 0, endMs: 2000 },
    { text: "使用Python和scikit-learn库", startMs: 2000, endMs: 4000 },
    { text: "快速构建你的第一个机器学习模型", startMs: 4000, endMs: 7000 }
  ],
  "scene7-fun-fact": [
    { text: "监督学习冷知识", startMs: 0, endMs: 2000 },
    { text: "监督学习是应用最广泛的机器学习类型", startMs: 2000, endMs: 4500 },
    { text: "占实际应用的70%以上", startMs: 4500, endMs: 6500 }
  ]
};

function generateCaptions() {
  console.log("🎯 开始生成字幕文件...\n");
  
  const publicDir = path.join(process.cwd(), 'public');
  
  // 检查public目录是否存在
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  Object.entries(captionsData).forEach(([sceneName, captions]) => {
    const captionFileName = `${sceneName}-captions.json`;
    const captionFilePath = path.join(publicDir, captionFileName);
    
    // 生成带时间戳的字幕数据
    const captionsWithTimestamps = captions.map(caption => ({
      ...caption,
      timestampMs: caption.startMs,
      confidence: 0.95
    }));
    
    // 写入字幕文件
    fs.writeFileSync(captionFilePath, JSON.stringify(captionsWithTimestamps, null, 2));
    console.log(`✅ 生成字幕文件: ${captionFileName}`);
  });
  
  console.log("\n🎉 所有字幕文件生成完成！");
  console.log("💡 提示：这些是示例字幕，请根据实际音频内容调整时间戳和文本");
}

// 运行脚本
generateCaptions();