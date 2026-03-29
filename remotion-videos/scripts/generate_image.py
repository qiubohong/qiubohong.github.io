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
    """从JSON文件或环境变量获取大模型配置"""
    
    # 优先尝试从JSON文件加载配置
    config_file = Path(__file__).parent / 'generate_image.json'
    if config_file.exists():
        try:
            with open(config_file, 'r', encoding='utf-8') as f:
                json_config = json.load(f)
            
            base_url = json_config.get('LLM_BASE_URL')
            model = json_config.get('LLM_MODEL')
            api_key = json_config.get('LLM_API_KEY', '')
            
            if base_url and model:
                print(f"✅ 使用JSON配置文件: {config_file}")
                return {
                    'base_url': base_url,
                    'model': model,
                    'api_key': api_key
                }
            else:
                print("⚠️ JSON配置文件缺少必要字段，回退到环境变量")
        except Exception as e:
            print(f"⚠️ JSON配置文件读取失败: {e}，回退到环境变量")
    
    # 回退到环境变量
    base_url = os.getenv('LLM_BASE_URL')
    model = os.getenv('LLM_MODEL')
    api_key = os.getenv('LLM_API_KEY', '')
    
    if not base_url or not model:
        print("错误：请设置环境变量 LLM_BASE_URL 和 LLM_MODEL")
        print("或创建 generate_image.json 配置文件")
        print("示例JSON配置：")
        print('''{
    "LLM_BASE_URL": "http://dev.fit-ai.woa.com/api/llmproxy",
    "LLM_MODEL": "gemini-3-pro-image",
    "LLM_API_KEY": "your-api-key"
}''')
        print("\n环境变量示例：")
        print("export LLM_BASE_URL=\"https://api.deepseek.com/v1\"")
        print("export LLM_MODEL=\"deepseek-chat\"")
        sys.exit(1)
    
    print("✅ 使用环境变量配置")
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
文字：清楚可见，不要重叠
所有文字内容必须使用中文展示，不要包含英文文字
""".strip()
    
    print(f"优化后的提示词：{optimized_prompt}")
    return optimized_prompt


def call_image_generation_api(config, prompt, size="1K", aspect_ratio="1:1"):
    """
    调用大模型图片生成API
    
    Args:
        config: 大模型配置字典
        prompt: 图片生成提示词
        size: 图片尺寸（如1K、2K等）
        aspect_ratio: 图片宽高比（如1:1、16:9等）
    
    Returns:
        API响应结果
    """
    
    # 构建API请求URL
    url = f"{config['base_url']}/chat/completions"
    
    # 构建请求头
    headers = {
        'Content-Type': 'application/json',
    }
    if config['api_key']:
        headers['Authorization'] = f"Bearer {config['api_key']}"
    
    # 构建请求体 - 使用messages数组格式
    payload = {
        'model': config['model'],
        'messages': [
            {
                'role': 'system',
                'content': '你是一个图像生成助手，根据用户的描述生成高质量的图片，中文文字要保证清晰可见。'
            },
            {
                'role': 'user',
                'content': prompt
            }
        ],
        'image_config': {
            'aspect_ratio': aspect_ratio,
            'image_size': size
        }
    }
    
    try:
        print(f"调用API: {url}")
        print(f"模型: {config['model']}")
        print(f"图片尺寸: {size}")
        print(f"宽高比: {aspect_ratio}")
        
        response = requests.post(url, headers=headers, json=payload, timeout=600)
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
    
    try:
        # 处理图片数据（可能是URL、base64编码或result.json格式）
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
                
        elif isinstance(image_data, str) and image_data.startswith('data:image/'):
            # 处理result.json格式的base64数据URL
            base64_data = image_data.split(',')[1] if ',' in image_data else image_data
            image_bytes = base64.b64decode(base64_data)
            
            with open(output_path, 'wb') as f:
                f.write(image_bytes)
                
        else:
            print("错误：不支持的图片数据格式")
            print(f"数据格式: {type(image_data)}")
            if isinstance(image_data, dict):
                print(f"数据键: {image_data.keys()}")
            return False
        
        print(f"图片已保存: {output_path}")
        return True
        
    except Exception as e:
        print(f"保存图片失败: {e}")
        return False


def main():
    """主函数"""
    parser = argparse.ArgumentParser(description='大模型图片生成工具')
    parser.add_argument('--prompt', required=True, help='图片生成提示词')
    parser.add_argument('--size', default='1K', help='图片尺寸，默认1K（支持1K、2K等）')
    parser.add_argument('--aspect-ratio', default='1:1', choices=['1:1', '16:9', '9:16', '4:3', '3:4'], help='图片宽高比，默认1:1')
    parser.add_argument('--output', default='./generated_image.png', help='输出文件路径')
    parser.add_argument('--format', default='png', choices=['png', 'jpg', 'jpeg'], help='图片格式')
    parser.add_argument('--article-name', help='文章名称，用于创建子目录（如01、02等）')
    
    args = parser.parse_args()
    
    # 获取环境配置
    config = get_env_config()
    
    # 使用nano-banana skill优化提示词
    optimized_prompt = generate_prompt_with_nano_banana(args.prompt)
    
    # 调用API生成图片
    result = call_image_generation_api(config, optimized_prompt, args.size, args.aspect_ratio)
    
    if not result:
        print("图片生成失败")
        sys.exit(1)
    
    # 解析API响应格式（适配result.json格式）
    image_data = None
    
    if 'choices' in result and len(result['choices']) > 0:
        # result.json格式：包含choices数组
        choice = result['choices'][0]
        if 'message' in choice and 'content' in choice['message']:
            content = choice['message']['content']
            
            # 处理content为数组的情况（result.json格式）
            if isinstance(content, list) and len(content) > 0:
                for item in content:
                    if isinstance(item, dict) and item.get('type') == 'venus_multimodal_url':
                        venus_url = item.get('venus_multimodal_url', {})
                        if 'url' in venus_url:
                            image_data = venus_url['url']
                            break
            # 处理content为字符串的情况（直接base64数据）
            elif isinstance(content, str) and content.startswith('data:image/'):
                image_data = content
    elif 'data' in result and len(result['data']) > 0:
        # 旧格式：直接包含data数组
        image_data = result['data'][0]
    
    if not image_data:
        print("无法解析API响应中的图片数据")
        print(f"API响应: {json.dumps(result, indent=2, ensure_ascii=False)}")
        sys.exit(1)
    
    # 确保输出文件有正确的扩展名
    output_path = Path(args.output)
    if output_path.suffix == '':
        output_path = output_path.with_suffix(f'.{args.format}')
    
    # 如果指定了文章名，则按文章名创建子目录
    if args.article_name:
        # 获取输出目录和文件名
        output_dir = output_path.parent
        filename = output_path.name
        
        # 创建文章名子目录
        article_dir = output_dir / args.article_name
        article_dir.mkdir(parents=True, exist_ok=True)
        
        # 更新输出路径到子目录
        output_path = article_dir / filename
        print(f"📁 创建文章目录: {article_dir}")
    
    success = save_image(image_data, output_path, args.format)
    
    if success:
        print(f"\n✅ 图片生成成功！")
        print(f"📁 文件位置: {output_path.absolute()}")
        print(f"📏 图片尺寸: {args.size}")
        print(f"📐 宽高比: {args.aspect_ratio}")
        print(f"🎨 图片格式: {args.format}")
        if args.article_name:
            print(f"📄 文章目录: {args.article_name}")
    else:
        print("❌ 图片保存失败")
        sys.exit(1)


if __name__ == "__main__":
    main()
