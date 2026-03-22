#!/usr/bin/env python3
"""
FineTuning 视频封面图生成脚本
生成 16:9 横版和 9:16 竖版两种封面
"""

import os
from pathlib import Path

# 设计 Token - 与视频设计保持一致
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
}


def generate_16x9_cover():
    """生成 16:9 横版封面"""
    width = 1920
    height = 1080

    # SVG 内容
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
      <stop offset="50%" stop-color="{THEME['accentBlue']}"/>
      <stop offset="100%" stop-color="{THEME['accentGreen']}"/>
    </linearGradient>
    
    <!-- 光球滤镜 -->
    <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="80"/>
    </filter>
    <filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="60"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect width="{width}" height="{height}" fill="url(#bgGradient)"/>
  
  <!-- 背景网格 -->
  <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  </pattern>
  <rect width="{width}" height="{height}" fill="url(#grid)"/>
  
  <!-- 光球装饰 - 左上 -->
  <circle cx="280" cy="220" r="300" fill="rgba(88,166,255,0.25)" filter="url(#blur1)"/>
  
  <!-- 光球装饰 - 右下 -->
  <circle cx="{width-200}" cy="{height-200}" r="250" fill="rgba(240,136,62,0.2)" filter="url(#blur2)"/>
  
  <!-- 光球装饰 - 右中 -->
  <circle cx="{width-300}" cy="{height//2}" r="200" fill="rgba(63,185,80,0.15)" filter="url(#blur2)"/>
  
  <!-- 系列徽章 -->
  <g transform="translate({width//2}, 200)">
    <rect x="-110" y="-24" width="220" height="48" rx="24" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)"/>
    <circle cx="-85" cy="0" r="5" fill="{THEME['accentGreen']}"/>
    <text x="0" y="8" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="500" fill="{THEME['textSecondary']}">5分钟 AI · 第19期</text>
  </g>
  
  <!-- 主标题 Fine-tuning -->
  <text x="{width//2}" y="400" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, Arial, sans-serif" font-size="120" font-weight="900" fill="url(#titleGradient)" letter-spacing="-2">Fine-tuning</text>
  
  <!-- 副标题 -->
  <text x="{width//2}" y="490" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="56" font-weight="600" fill="{THEME['textPrimary']}" letter-spacing="4">模型微调技术</text>
  
  <!-- 标语 -->
  <text x="{width//2}" y="600" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="36" font-weight="500" fill="{THEME['accentOrange']}">让通用AI成为你的领域专家</text>
  
  <!-- 装饰线 -->
  <rect x="{width//2 - 120}" y="660" width="240" height="4" rx="2" fill="url(#lineGradient)"/>
  
  <!-- 关键词标签 -->
  <g transform="translate({width//2 - 300}, 740)">
    <!-- 预训练 -->
    <rect x="0" y="0" width="120" height="48" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
    <text x="60" y="32" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="600" fill="{THEME['accentOrange']}">预训练</text>
    
    <!-- 微调 -->
    <rect x="140" y="0" width="100" height="48" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
    <text x="190" y="32" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="600" fill="{THEME['accentBlue']}">微调</text>
    
    <!-- PEFT -->
    <rect x="260" y="0" width="100" height="48" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
    <text x="310" y="32" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="600" fill="{THEME['accentGreen']}">PEFT</text>
    
    <!-- LoRA -->
    <rect x="380" y="0" width="100" height="48" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
    <text x="430" y="32" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="600" fill="{THEME['accentYellow']}">LoRA</text>
  </g>
  
  <!-- 底部渐变条 -->
  <rect x="0" y="{height-6}" width="{width}" height="6" fill="url(#bottomGradient)"/>
</svg>'''

    return svg_content


def generate_9x16_cover():
    """生成 9:16 竖版封面"""
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
      <stop offset="50%" stop-color="{THEME['accentBlue']}"/>
      <stop offset="100%" stop-color="{THEME['accentGreen']}"/>
    </linearGradient>
    
    <!-- 光球滤镜 -->
    <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="100"/>
    </filter>
    <filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="80"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect width="{width}" height="{height}" fill="url(#bgGradient)"/>
  
  <!-- 装饰圆环 -->
  <circle cx="100" cy="300" r="100" fill="none" stroke="rgba(88,166,255,0.1)" stroke-width="2"/>
  <circle cx="{width-80}" cy="{height-400}" r="75" fill="none" stroke="rgba(240,136,62,0.1)" stroke-width="2"/>
  
  <!-- 光球装饰 - 中上 -->
  <circle cx="{width//2}" y="350" r="350" fill="rgba(88,166,255,0.3)" filter="url(#blur1)"/>
  
  <!-- 光球装饰 - 左下 -->
  <circle cx="180" cy="{height-300}" r="300" fill="rgba(240,136,62,0.25)" filter="url(#blur2)"/>
  
  <!-- 光球装饰 - 右中 -->
  <circle cx="{width-150}" cy="{height//2}" r="250" fill="rgba(63,185,80,0.18)" filter="url(#blur2)"/>
  
  <!-- 系列徽章 -->
  <g transform="translate({width//2}, 320)">
    <rect x="-125" y="-28" width="250" height="56" rx="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)"/>
    <circle cx="-95" cy="0" r="6" fill="{THEME['accentGreen']}"/>
    <text x="0" y="10" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="26" font-weight="500" fill="{THEME['textSecondary']}">5分钟 AI · 第19期</text>
  </g>
  
  <!-- 主标题 Fine-tuning -->
  <text x="{width//2}" y="550" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, Arial, sans-serif" font-size="100" font-weight="900" fill="url(#titleGradient)" letter-spacing="-1">Fine-tuning</text>
  
  <!-- 副标题 -->
  <text x="{width//2}" y="660" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="64" font-weight="600" fill="{THEME['textPrimary']}" letter-spacing="6">模型微调</text>
  
  <!-- 标语 -->
  <text x="{width//2}" y="820" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="40" font-weight="600" fill="{THEME['accentOrange']}">让通用AI成为你的</text>
  <text x="{width//2}" y="880" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="40" font-weight="600" fill="{THEME['accentOrange']}">领域专家</text>
  
  <!-- 装饰线 -->
  <rect x="{width//2 - 100}" y="960" width="200" height="4" rx="2" fill="url(#lineGradient)"/>
  
  <!-- 关键词标签 - 垂直排列 -->
  <g transform="translate({width//2}, 1080)">
    <!-- 预训练 → 微调 -->
    <rect x="-140" y="0" width="280" height="60" rx="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
    <text x="0" y="38" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="600" fill="{THEME['accentOrange']}">预训练 → 微调</text>
    
    <!-- PEFT 参数高效微调 -->
    <rect x="-165" y="90" width="330" height="60" rx="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
    <text x="0" y="128" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="600" fill="{THEME['accentGreen']}">PEFT 参数高效微调</text>
    
    <!-- LoRA 低秩适应 -->
    <rect x="-150" y="180" width="300" height="60" rx="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
    <text x="0" y="218" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="600" fill="{THEME['accentYellow']}">LoRA 低秩适应</text>
  </g>
  
  <!-- 底部渐变条 -->
  <rect x="0" y="{height-8}" width="{width}" height="8" fill="url(#bottomGradient)"/>
  
  <!-- 账号信息 -->
  <text x="{width//2}" y="{height-40}" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="24" font-weight="500" fill="rgba(255,255,255,0.4)">@5分钟AI</text>
</svg>'''

    return svg_content


def save_svg(content, filepath):
    """保存 SVG 文件"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ 已生成: {filepath}")


def main():
    """主函数"""
    # 获取输出目录
    script_dir = Path(__file__).parent
    output_dir = script_dir.parent / "public" / "FineTuningVideo"
    output_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 50)
    print("FineTuning 视频封面图生成")
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
