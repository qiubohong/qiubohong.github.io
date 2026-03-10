#!/usr/bin/env python3
"""
大模型图片生成脚本

调用大模型API生成图片，支持多种大模型服务商。
提示词由nano-banana-pro-prompts-recommend-skill生成。
"""

import os
import sys
import json
import argparse
import requests
import base64
from pathlib import Path
from datetime import datetime


def get_env_config():
    """从环境变量获取大模型配置"""
    base_url = os.getenv('LLM_BASE_URL')
    model = os.getenv('LLM_MODEL')
    api_key = os.getenv('LLM_API_KEY', '')
    
    if not base_url or not model:
        print("错误：请设置环境变量 LLM_BASE_URL 和 LLM_MODEL")
        print("示例：")
        print("export LLM_BASE_URL=\"https://api.deepseek.com/v1\"")
        print("export LLM_MODEL=\"deepseek-chat\"")
        sys.exit(1)
    
    return {
        'base_url': base_url,
        'model': model,
        'api_key': api_key
    }


def generate_prompt_with_nano_banana(prompt_text):
    """
    使用nano-banana-pro-prompts-recommend-skill生成优化提示词
    这里模拟调用skill的过程，实际使用时需要集成skill调用
    """
    # 模拟nano-banana skill的提示词优化
    optimized_prompt = f"""
生成一张高质量的图片，要求：
{prompt_text}

图片风格：现代、专业、清晰
色彩搭配：协调、美观
构图：平衡、有层次感
细节：精细、无瑕疵
""".strip()
    
    print(f"优化后的提示词：{optimized_prompt}")
    return optimized_prompt


def call_image_generation_api(config, prompt, size="1024x1024", quality="standard"):
    """调用大模型图片生成API"""
    
    # 构建API请求URL
    url = f"{config['base_url']}/images/generations"
    
    # 构建请求头
    headers = {
        'Content-Type': 'application/json',
    }
    if config['api_key']:
        headers['Authorization'] = f"Bearer {config['api_key']}"
    
    # 构建请求体
    payload = {
        'model': config['model'],
        'prompt': prompt,
        'size': size,
        'quality': quality,
        'n': 1
    }
    
    try:
        print(f"调用API: {url}")
        print(f"模型: {config['model']}")
        print(f"图片尺寸: {size}")
        
        response = requests.post(url, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
        
        result = response.json()
        return result
        
    except Exception as e:
        print(f"API调用失败: {e}")
        return None


def save_image(image_data, output_path, image_format="png"):
    """保存生成的图片"""
    
    # 确保输出目录存在
    output_dir = Path(output_path).parent
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # 处理图片数据（可能是URL或base64编码）
    if isinstance(image_data, dict) and 'url' in image_data:
        # 从URL下载图片
        image_url = image_data['url']
        print(f"下载图片: {image_url}")
        
        response = requests.get(image_url)
        response.raise_for_status()
        
        with open(output_path, 'wb') as f:
            f.write(response.content)
            
    elif isinstance(image_data, dict) and 'b64_json' in image_data:
        # 解码base64图片数据
        image_bytes = base64.b64decode(image_data['b64_json'])
        
        with open(output_path, 'wb') as f:
            f.write(image_bytes)
            
    else:
        print("错误：不支持的图片数据格式")
        return False
    
    print(f"图片已保存: {output_path}")
    return True


def main():
    """主函数"""
    parser = argparse.ArgumentParser(description='大模型图片生成工具')
    parser.add_argument('--prompt', required=True, help='图片生成提示词')
    parser.add_argument('--size', default='1024x1024', help='图片尺寸，默认1024x1024')
    parser.add_argument('--output', default='./generated_image.png', help='输出文件路径')
    parser.add_argument('--format', default='png', choices=['png', 'jpg', 'jpeg'], help='图片格式')
    parser.add_argument('--quality', default='standard', choices=['standard', 'hd'], help='图片质量')
    
    args = parser.parse_args()
    
    # 获取环境配置
    config = get_env_config()
    
    # 使用nano-banana skill优化提示词
    optimized_prompt = generate_prompt_with_nano_banana(args.prompt)
    
    # 调用API生成图片
    result = call_image_generation_api(config, optimized_prompt, args.size, args.quality)
    
    if not result or 'data' not in result or not result['data']:
        print("图片生成失败")
        sys.exit(1)
    
    # 保存图片
    image_data = result['data'][0]
    
    # 确保输出文件有正确的扩展名
    output_path = Path(args.output)
    if output_path.suffix == '':
        output_path = output_path.with_suffix(f'.{args.format}')
    
    success = save_image(image_data, output_path, args.format)
    
    if success:
        print(f"\n✅ 图片生成成功！")
        print(f"📁 文件位置: {output_path.absolute()}")
        print(f"📏 图片尺寸: {args.size}")
        print(f"🎨 图片格式: {args.format}")
    else:
        print("❌ 图片保存失败")
        sys.exit(1)


if __name__ == "__main__":
    main()
