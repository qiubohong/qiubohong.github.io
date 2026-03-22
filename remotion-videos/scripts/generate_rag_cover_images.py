#!/usr/bin/env python3
"""
RAGVideo 视频封面图生成脚本
生成 16:9 横版和 9:16 竖版两种封面
5分钟AI系列·第18期 - RAG 检索增强生成
"""

import os
from pathlib import Path

# 设计 Token - 与视频设计保持一致（GitHub 暗色风格）
THEME = {
    "background": "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    "titleGradient_start": "#58a6ff",
    "titleGradient_end": "#79c0ff",
    "textPrimary": "#c9d1d9",
    "textSecondary": "#8b949e",
    "accentOrange": "#f0883e",
    "accentGreen": "#3fb950",
    "accentYellow": "#ffd200",
    "accentBlue": "#58a6ff",
    "accentPurple": "#a371f7",
}


def generate_16x9_cover():
    """生成 16:9 横版封面 (1920x1080)"""
    width = 1920
    height = 1080

    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 背景渐变 -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d1117"/>
      <stop offset="50%" stop-color="#161b22"/>
      <stop offset="100%" stop-color="#1c2333"/>
    </linearGradient>

    <!-- 标题渐变 -->
    <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{THEME['titleGradient_start']}"/>
      <stop offset="100%" stop-color="{THEME['titleGradient_end']}"/>
    </linearGradient>

    <!-- 装饰线渐变 -->
    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="50%" stop-color="{THEME['accentOrange']}"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>

    <!-- 底部渐变条 -->
    <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="{THEME['accentOrange']}"/>
      <stop offset="33%" stop-color="{THEME['accentBlue']}"/>
      <stop offset="66%" stop-color="{THEME['accentPurple']}"/>
      <stop offset="100%" stop-color="{THEME['accentGreen']}"/>
    </linearGradient>

    <!-- RAG流程连接线渐变 -->
    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="{THEME['accentBlue']}"/>
      <stop offset="100%" stop-color="{THEME['accentPurple']}"/>
    </linearGradient>

    <!-- 光球滤镜 -->
    <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="80"/>
    </filter>
    <filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="60"/>
    </filter>
    <filter id="blur3" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="40"/>
    </filter>
  </defs>

  <!-- 背景 -->
  <rect width="{width}" height="{height}" fill="url(#bgGradient)"/>

  <!-- 背景网格 -->
  <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  </pattern>
  <rect width="{width}" height="{height}" fill="url(#grid)"/>

  <!-- 光球装饰 - 左上蓝色 -->
  <circle cx="300" cy="200" r="320" fill="rgba(88,166,255,0.22)" filter="url(#blur1)"/>

  <!-- 光球装饰 - 右下橙色 -->
  <circle cx="{width-200}" cy="{height-180}" r="280" fill="rgba(240,136,62,0.18)" filter="url(#blur2)"/>

  <!-- 光球装饰 - 右上紫色 -->
  <circle cx="{width-300}" cy="250" r="220" fill="rgba(163,113,247,0.15)" filter="url(#blur2)"/>

  <!-- 光球装饰 - 左下绿色 -->
  <circle cx="200" cy="{height-200}" r="200" fill="rgba(63,185,80,0.12)" filter="url(#blur3)"/>

  <!-- 系列徽章 -->
  <g transform="translate({width//2}, 200)">
    <rect x="-130" y="-26" width="260" height="52" rx="26" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <circle cx="-100" cy="0" r="6" fill="{THEME['accentGreen']}"/>
    <text x="0" y="9" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="24" font-weight="500" fill="{THEME['textSecondary']}">5分钟 AI · 第18期</text>
  </g>

  <!-- 主标题 RAG -->
  <text x="{width//2}" y="390" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, Arial, sans-serif" font-size="160" font-weight="900" fill="url(#titleGradient)" letter-spacing="8">RAG</text>

  <!-- 副标题 -->
  <text x="{width//2}" y="490" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="52" font-weight="600" fill="{THEME['textPrimary']}" letter-spacing="6">检索增强生成</text>

  <!-- 英文全称 -->
  <text x="{width//2}" y="560" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="400" fill="{THEME['textSecondary']}" letter-spacing="2">Retrieval-Augmented Generation</text>

  <!-- 标语 -->
  <text x="{width//2}" y="650" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="36" font-weight="500" fill="{THEME['accentOrange']}">让AI既懂推理，又能查资料</text>

  <!-- 装饰线 -->
  <rect x="{width//2 - 140}" y="700" width="280" height="4" rx="2" fill="url(#lineGradient)"/>

  <!-- RAG 流程图示 - 三个节点 -->
  <g transform="translate({width//2 - 380}, 760)">
    <!-- 知识库节点 -->
    <rect x="0" y="0" width="180" height="72" rx="12" fill="rgba(88,166,255,0.12)" stroke="rgba(88,166,255,0.4)" stroke-width="1.5"/>
    <text x="90" y="28" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="24" fill="{THEME['accentBlue']}">📚</text>
    <text x="90" y="56" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="20" font-weight="600" fill="{THEME['textPrimary']}">知识库</text>

    <!-- 箭头 -->
    <line x1="190" y1="36" x2="230" y2="36" stroke="url(#flowGradient)" stroke-width="2.5"/>
    <polygon points="230,30 244,36 230,42" fill="{THEME['accentPurple']}"/>

    <!-- 向量检索节点 -->
    <rect x="250" y="0" width="200" height="72" rx="12" fill="rgba(163,113,247,0.12)" stroke="rgba(163,113,247,0.4)" stroke-width="1.5"/>
    <text x="350" y="28" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="24" fill="{THEME['accentPurple']}">🔍</text>
    <text x="350" y="56" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="20" font-weight="600" fill="{THEME['textPrimary']}">语义检索</text>

    <!-- 箭头 -->
    <line x1="460" y1="36" x2="500" y2="36" stroke="url(#flowGradient)" stroke-width="2.5"/>
    <polygon points="500,30 514,36 500,42" fill="{THEME['accentOrange']}"/>

    <!-- 生成回答节点 -->
    <rect x="520" y="0" width="200" height="72" rx="12" fill="rgba(240,136,62,0.12)" stroke="rgba(240,136,62,0.4)" stroke-width="1.5"/>
    <text x="620" y="28" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="24" fill="{THEME['accentOrange']}">🤖</text>
    <text x="620" y="56" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="20" font-weight="600" fill="{THEME['textPrimary']}">生成回答</text>
  </g>

  <!-- 底部渐变条 -->
  <rect x="0" y="{height-6}" width="{width}" height="6" fill="url(#bottomGradient)"/>
</svg>'''

    return svg_content


def generate_9x16_cover():
    """生成 9:16 竖版封面 (1080x1920)"""
    width = 1080
    height = 1920

    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 背景渐变 -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d1117"/>
      <stop offset="50%" stop-color="#161b22"/>
      <stop offset="100%" stop-color="#1c2333"/>
    </linearGradient>

    <!-- 标题渐变 -->
    <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{THEME['titleGradient_start']}"/>
      <stop offset="100%" stop-color="{THEME['titleGradient_end']}"/>
    </linearGradient>

    <!-- 装饰线渐变 -->
    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="50%" stop-color="{THEME['accentOrange']}"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>

    <!-- 底部渐变条 -->
    <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="{THEME['accentOrange']}"/>
      <stop offset="33%" stop-color="{THEME['accentBlue']}"/>
      <stop offset="66%" stop-color="{THEME['accentPurple']}"/>
      <stop offset="100%" stop-color="{THEME['accentGreen']}"/>
    </linearGradient>

    <!-- 光球滤镜 -->
    <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="100"/>
    </filter>
    <filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="80"/>
    </filter>
    <filter id="blur3" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="50"/>
    </filter>
  </defs>

  <!-- 背景 -->
  <rect width="{width}" height="{height}" fill="url(#bgGradient)"/>

  <!-- 背景网格 -->
  <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  </pattern>
  <rect width="{width}" height="{height}" fill="url(#grid)"/>

  <!-- 装饰圆环 -->
  <circle cx="100" cy="350" r="120" fill="none" stroke="rgba(88,166,255,0.08)" stroke-width="2"/>
  <circle cx="{width-80}" cy="{height-450}" r="90" fill="none" stroke="rgba(240,136,62,0.08)" stroke-width="2"/>

  <!-- 光球装饰 - 中上蓝色 -->
  <circle cx="{width//2}" cy="400" r="380" fill="rgba(88,166,255,0.28)" filter="url(#blur1)"/>

  <!-- 光球装饰 - 左下橙色 -->
  <circle cx="180" cy="{height-350}" r="320" fill="rgba(240,136,62,0.22)" filter="url(#blur2)"/>

  <!-- 光球装饰 - 右中紫色 -->
  <circle cx="{width-150}" cy="{height//2}" r="260" fill="rgba(163,113,247,0.16)" filter="url(#blur2)"/>

  <!-- 光球装饰 - 左中绿色 -->
  <circle cx="120" cy="{height//2 + 200}" r="200" fill="rgba(63,185,80,0.12)" filter="url(#blur3)"/>

  <!-- 系列徽章 -->
  <g transform="translate({width//2}, 340)">
    <rect x="-145" y="-30" width="290" height="60" rx="30" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <circle cx="-110" cy="0" r="7" fill="{THEME['accentGreen']}"/>
    <text x="0" y="11" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="500" fill="{THEME['textSecondary']}">5分钟 AI · 第18期</text>
  </g>

  <!-- 主标题 RAG -->
  <text x="{width//2}" y="600" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, Arial, sans-serif" font-size="180" font-weight="900" fill="url(#titleGradient)" letter-spacing="12">RAG</text>

  <!-- 副标题 -->
  <text x="{width//2}" y="710" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="72" font-weight="600" fill="{THEME['textPrimary']}" letter-spacing="8">检索增强生成</text>

  <!-- 英文全称 -->
  <text x="{width//2}" y="790" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="30" font-weight="400" fill="{THEME['textSecondary']}" letter-spacing="1">Retrieval-Augmented Generation</text>

  <!-- 标语 -->
  <text x="{width//2}" y="910" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="44" font-weight="600" fill="{THEME['accentOrange']}">让AI既懂推理</text>
  <text x="{width//2}" y="970" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="44" font-weight="600" fill="{THEME['accentOrange']}">又能查资料</text>

  <!-- 装饰线 -->
  <rect x="{width//2 - 120}" y="1040" width="240" height="4" rx="2" fill="url(#lineGradient)"/>

  <!-- RAG 流程图示 - 竖向三节点 -->
  <g transform="translate({width//2}, 1120)">
    <!-- 知识库节点 -->
    <rect x="-160" y="0" width="320" height="80" rx="16" fill="rgba(88,166,255,0.12)" stroke="rgba(88,166,255,0.4)" stroke-width="1.5"/>
    <text x="-80" y="50" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="32" fill="{THEME['accentBlue']}">📚</text>
    <text x="30" y="50" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="600" fill="{THEME['textPrimary']}">知识库构建</text>

    <!-- 向下箭头 -->
    <line x1="0" y1="90" x2="0" y2="130" stroke="{THEME['accentPurple']}" stroke-width="2.5"/>
    <polygon points="-8,130 8,130 0,148" fill="{THEME['accentPurple']}"/>

    <!-- 语义检索节点 -->
    <rect x="-160" y="155" width="320" height="80" rx="16" fill="rgba(163,113,247,0.12)" stroke="rgba(163,113,247,0.4)" stroke-width="1.5"/>
    <text x="-80" y="205" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="32" fill="{THEME['accentPurple']}">🔍</text>
    <text x="30" y="205" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="600" fill="{THEME['textPrimary']}">语义检索</text>

    <!-- 向下箭头 -->
    <line x1="0" y1="245" x2="0" y2="285" stroke="{THEME['accentOrange']}" stroke-width="2.5"/>
    <polygon points="-8,285 8,285 0,303" fill="{THEME['accentOrange']}"/>

    <!-- 生成回答节点 -->
    <rect x="-160" y="310" width="320" height="80" rx="16" fill="rgba(240,136,62,0.12)" stroke="rgba(240,136,62,0.4)" stroke-width="1.5"/>
    <text x="-80" y="360" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="32" fill="{THEME['accentOrange']}">🤖</text>
    <text x="30" y="360" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="600" fill="{THEME['textPrimary']}">生成回答</text>
  </g>

  <!-- 关键词标签 -->
  <g transform="translate({width//2}, 1660)">
    <rect x="-200" y="0" width="400" height="60" rx="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <text x="0" y="38" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="600" fill="{THEME['accentBlue']}">向量数据库 · LLM · Embedding</text>
  </g>

  <!-- 底部渐变条 -->
  <rect x="0" y="{height-8}" width="{width}" height="8" fill="url(#bottomGradient)"/>

  <!-- 账号信息 -->
  <text x="{width//2}" y="{height-30}" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="26" font-weight="500" fill="rgba(255,255,255,0.4)">@5分钟AI</text>
</svg>'''

    return svg_content


def save_svg(content, filepath):
    """保存 SVG 文件"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ 已生成: {filepath}")


def main():
    """主函数"""
    script_dir = Path(__file__).parent
    output_dir = script_dir.parent / "public" / "RAGVideo"
    output_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 50)
    print("RAGVideo 视频封面图生成（5分钟AI系列·第18期）")
    print("=" * 50)

    # 生成 16:9 封面
    print("\n生成 16:9 横版封面...")
    svg_16x9 = generate_16x9_cover()
    save_svg(svg_16x9, output_dir / "cover-16x9.svg")

    # 生成 9:16 封面
    print("\n生成 9:16 竖版封面...")
    svg_9x16 = generate_9x16_cover()
    save_svg(svg_9x16, output_dir / "cover-9x16.svg")

    print("\n" + "=" * 50)
    print("封面图生成完成!")
    print(f"输出目录: {output_dir}")
    print("\n注意: 生成的是 SVG 格式，可以使用浏览器打开查看")
    print("如需 PNG 格式，可以使用 Chrome 打开 SVG 后截图")
    print("=" * 50)


if __name__ == "__main__":
    main()
