#!/usr/bin/env python3
"""
Pexels 图片搜索脚本
根据关键词调用 Pexels API 搜索图片，从环境变量 PEXELS_API_KEY 读取 API Key。

用法：
    python3 search_images.py "AI productivity"
    python3 search_images.py "AI productivity" --count 10
    python3 search_images.py "AI productivity" --orientation landscape
"""

import os
import sys
import json
import argparse

import subprocess
import requests


def load_zshrc_env():
    """
    执行 source ~/.zshrc 并将其中导出的环境变量加载到当前进程。
    """
    zshrc_path = os.path.expanduser("~/.zshrc")
    if not os.path.exists(zshrc_path):
        return
    try:
        # 用 zsh 执行 source ~/.zshrc 后打印所有环境变量
        result = subprocess.run(
            ["zsh", "-c", f"source {zshrc_path} && env"],
            capture_output=True,
            text=True,
            timeout=10,
        )
        if result.returncode == 0:
            for line in result.stdout.splitlines():
                if "=" in line:
                    key, _, value = line.partition("=")
                    os.environ.setdefault(key, value)
    except Exception:
        pass  # 加载失败时静默跳过，不影响主流程


# 每次运行前自动加载 ~/.zshrc 中的环境变量
load_zshrc_env()


def search_pexels_images(query: str, count: int = 5, orientation: str = None) -> list:
    """
    调用 Pexels API 搜索图片。

    Args:
        query: 搜索关键词（建议使用英文）
        count: 返回图片数量，默认 5，最大 80
        orientation: 图片方向，可选 landscape / portrait / square

    Returns:
        图片信息列表
    """
    api_key = os.environ.get("PEXELS_API_KEY")
    if not api_key:
        print("错误：未找到环境变量 PEXELS_API_KEY，请先设置：", file=sys.stderr)
        print("  export PEXELS_API_KEY=your_api_key_here", file=sys.stderr)
        sys.exit(1)

    # 构建请求参数
    params = {
        "query": query,
        "per_page": min(count, 80),
        "page": 1,
    }
    if orientation in ("landscape", "portrait", "square"):
        params["orientation"] = orientation

    try:
        response = requests.get(
            "https://api.pexels.com/v1/search",
            headers={"Authorization": api_key},
            params=params,
            timeout=15,
        )
        if response.status_code == 401:
            print("错误：API Key 无效或已过期，请检查 PEXELS_API_KEY。", file=sys.stderr)
            sys.exit(1)
        elif response.status_code == 429:
            print("错误：请求频率超限（200次/小时），请稍后再试。", file=sys.stderr)
            sys.exit(1)
        elif response.status_code != 200:
            print(f"错误：HTTP {response.status_code} - {response.reason}", file=sys.stderr)
            sys.exit(1)
        data = response.json()
    except requests.exceptions.ConnectionError as e:
        print(f"错误：网络连接失败 - {e}", file=sys.stderr)
        sys.exit(1)
    except requests.exceptions.Timeout:
        print("错误：请求超时，请检查网络连接。", file=sys.stderr)
        sys.exit(1)
    except requests.exceptions.RequestException as e:
        print(f"错误：请求失败 - {e}", file=sys.stderr)
        sys.exit(1)

    photos = data.get("photos", [])
    results = []
    for photo in photos:
        results.append({
            "id": photo["id"],
            "description": photo.get("alt", ""),
            "photographer": photo["photographer"],
            "photographer_url": photo["photographer_url"],
            "pexels_url": photo["url"],
            "preview_url": photo["src"]["medium"],
            "original_url": photo["src"]["original"],
            "width": photo["width"],
            "height": photo["height"],
        })

    return results


def main():
    parser = argparse.ArgumentParser(
        description="根据关键词从 Pexels 搜索图片"
    )
    parser.add_argument("query", help="搜索关键词（建议英文）")
    parser.add_argument(
        "--count", type=int, default=5,
        help="返回图片数量（默认 5，最大 80）"
    )
    parser.add_argument(
        "--orientation", choices=["landscape", "portrait", "square"],
        help="图片方向：landscape（横向）/ portrait（纵向）/ square（正方形）"
    )

    args = parser.parse_args()

    results = search_pexels_images(
        query=args.query,
        count=args.count,
        orientation=args.orientation,
    )

    if not results:
        print(f"未找到与 '{args.query}' 相关的图片。", file=sys.stderr)
        print("[]")
        return

    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
