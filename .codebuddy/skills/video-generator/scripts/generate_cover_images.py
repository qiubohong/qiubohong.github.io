#!/usr/bin/env python3
"""
封面图生成脚本
为视频项目生成16:9和9:16两种比例的封面图
支持参考现有封面图风格进行生成
"""

import os
import sys
import json
import argparse
from pathlib import Path

# 添加项目根目录到路径，以便导入其他模块
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

def find_existing_covers(video_name: str, project_root: str) -> dict:
    """
    查找项目中已存在的封面图，用于参考风格
    
    Args:
        video_name: 视频名称
        project_root: 项目根目录路径
        
    Returns:
        dict: 包含找到的封面图信息的字典
    """
    covers_info = {
        'found': False,
        '16_9': None,
        '9_16': None,
        'style_description': None
    }
    
    # 搜索目录
    search_dirs = [
        project_root,  # 项目根目录
        os.path.join(project_root, 'public'),  # public目录
        os.path.join(project_root, 'public', video_name),  # 视频特定目录
    ]
    
    # 可能的封面图文件名模式
    cover_patterns = [
        f'{video_name}_cover_16_9.png',
        f'{video_name}_cover_9_16.png',
        f'{video_name}_cover.png',
        'cover_16_9.png',
        'cover_9_16.png',
        'cover.png'
    ]
    
    for search_dir in search_dirs:
        if not os.path.exists(search_dir):
            continue
            
        for pattern in cover_patterns:
            cover_path = os.path.join(search_dir, pattern)
            if os.path.exists(cover_path):
                if '16_9' in pattern:
                    covers_info['16_9'] = cover_path
                elif '9_16' in pattern:
                    covers_info['9_16'] = cover_path
                covers_info['found'] = True
    
    # 生成风格描述
    if covers_info['found']:
        covers_info['style_description'] = generate_style_description(covers_info)
    
    return covers_info

def generate_style_description(covers_info: dict) -> str:
    """
    基于找到的封面图生成风格描述
    
    Args:
        covers_info: 封面图信息字典
        
    Returns:
        str: 风格描述文本
    """
    # 这里可以添加更复杂的风格分析逻辑
    # 目前返回一个通用的风格描述
    return "现代科技风格，蓝色调为主，简洁专业的设计"

def generate_cover_prompt(video_name: str, video_title: str, existing_covers: dict) -> dict:
    """
    生成封面图的提示词
    
    Args:
        video_name: 视频名称
        video_title: 视频标题
        existing_covers: 现有封面图信息
        
    Returns:
        dict: 包含两种比例封面图提示词的字典
    """
    
    # 基础提示词模板
    base_prompt = f"""
创建视频封面图，主题：{video_title}

设计要求：
- 现代科技风格，专业简洁
- 蓝色调为主，可搭配橙色或紫色作为强调色
- 包含AI、技术相关元素
- 文字清晰易读，适合短视频平台

视频内容：{video_title}
""".strip()
    
    # 如果找到现有封面图，添加风格参考
    if existing_covers['found'] and existing_covers['style_description']:
        base_prompt += f"\n\n风格参考：请参考现有封面图的{existing_covers['style_description']}风格"
    
    # 16:9 横版封面图提示词
    prompt_16_9 = f"""{base_prompt}

格式要求：
- 比例：16:9（横版）
- 尺寸：1920×1080像素
- 适合电脑端和YouTube等平台
- 标题位置：居中或左侧
- 可包含技术图表或AI相关图标元素
""".strip()
    
    # 9:16 竖版封面图提示词
    prompt_9_16 = f"""{base_prompt}

格式要求：
- 比例：9:16（竖版）
- 尺寸：1080×1920像素
- 适合抖音、快手等短视频平台
- 标题位置：上部，留出底部空间
- 设计更紧凑，适合手机竖屏观看
""".strip()
    
    return {
        '16_9': prompt_16_9,
        '9_16': prompt_9_16
    }

def save_cover_info(video_name: str, output_dir: str, cover_paths: dict):
    """
    保存封面图信息到JSON文件
    
    Args:
        video_name: 视频名称
        output_dir: 输出目录
        cover_paths: 封面图路径字典
    """
    info = {
        'video_name': video_name,
        'cover_images': cover_paths,
        'generated_at': str(Path(__file__).parent),
        'aspect_ratios': ['16:9', '9:16']
    }
    
    info_file = os.path.join(output_dir, f'{video_name}_cover_info.json')
    with open(info_file, 'w', encoding='utf-8') as f:
        json.dump(info, f, indent=2, ensure_ascii=False)
    
    print(f"封面图信息已保存到：{info_file}")

def main():
    """主函数"""
    parser = argparse.ArgumentParser(description='生成视频封面图')
    parser.add_argument('--video-name', required=True, help='视频名称')
    parser.add_argument('--video-title', required=True, help='视频标题')
    parser.add_argument('--output-dir', required=True, help='输出目录路径')
    parser.add_argument('--project-root', default='.', help='项目根目录路径')
    
    args = parser.parse_args()
    
    # 确保输出目录存在
    os.makedirs(args.output_dir, exist_ok=True)
    
    print(f"开始为视频 '{args.video_name}' 生成封面图...")
    print(f"视频标题：{args.video_title}")
    print(f"输出目录：{args.output_dir}")
    
    # 查找现有封面图
    print("\n查找现有封面图...")
    existing_covers = find_existing_covers(args.video_name, args.project_root)
    
    if existing_covers['found']:
        print("✓ 找到现有封面图，将参考其风格")
        if existing_covers['16_9']:
            print(f"  - 16:9封面：{existing_covers['16_9']}")
        if existing_covers['9_16']:
            print(f"  - 9:16封面：{existing_covers['9_16']}")
    else:
        print("ℹ 未找到现有封面图，将使用默认风格")
    
    # 生成提示词
    print("\n生成封面图提示词...")
    prompts = generate_cover_prompt(args.video_name, args.video_title, existing_covers)
    
    print("\n16:9封面图提示词：")
    print("-" * 50)
    print(prompts['16_9'])
    print("-" * 50)
    
    print("\n9:16封面图提示词：")
    print("-" * 50)
    print(prompts['9_16'])
    print("-" * 50)
    
    # 这里应该调用 image-generator 技能生成图片
    # 由于技能调用需要在 Claude 环境中进行，这里只输出提示词
    print("\n⚠ 注意：实际图片生成需要通过 image-generator 技能完成")
    print("请将上述提示词复制到 image-generator 技能中生成图片")
    
    # 生成预期的文件路径
    cover_paths = {
        '16_9': os.path.join(args.output_dir, f'{args.video_name}_cover_16_9.png'),
        '9_16': os.path.join(args.output_dir, f'{args.video_name}_cover_9_16.png')
    }
    
    # 保存封面图信息
    save_cover_info(args.video_name, args.output_dir, cover_paths)
    
    print(f"\n✓ 封面图生成流程完成")
    print(f"预期生成文件：")
    print(f"  - 16:9封面：{cover_paths['16_9']}")
    print(f"  - 9:16封面：{cover_paths['9_16']}")
    print(f"  - 信息文件：{args.output_dir}/{args.video_name}_cover_info.json")

if __name__ == "__main__":
    main()