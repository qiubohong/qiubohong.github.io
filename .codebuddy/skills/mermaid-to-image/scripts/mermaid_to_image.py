#!/usr/bin/env python3
"""
mermaid_to_image.py - 将 Mermaid 代码转换为图片

用法:
    python3 mermaid_to_image.py --input diagram.mmd --output output.png
    python3 mermaid_to_image.py --code "graph TD; A-->B" --output output.svg
    python3 mermaid_to_image.py --input diagram.mmd --output output.png --theme dark --width 1200

依赖:
    - Node.js + @mermaid-js/mermaid-cli (mmdc)
    安装: npm install -g @mermaid-js/mermaid-cli
"""

import argparse
import subprocess
import sys
import os
import tempfile
import shutil


def check_mmdc():
    """检查 mmdc 是否已安装"""
    if shutil.which("mmdc"):
        return True
    # 尝试 npx
    try:
        result = subprocess.run(
            ["npx", "--yes", "@mermaid-js/mermaid-cli", "--version"],
            capture_output=True, text=True, timeout=30
        )
        return result.returncode == 0
    except Exception:
        return False


def get_mmdc_cmd():
    """获取 mmdc 命令"""
    if shutil.which("mmdc"):
        return ["mmdc"]
    return ["npx", "--yes", "@mermaid-js/mermaid-cli"]


def convert_mermaid(
    mermaid_code: str,
    output_path: str,
    theme: str = "default",
    width: int = 1200,
    height: int = 800,
    background_color: str = "white",
    scale: float = 2.0,
):
    """
    将 Mermaid 代码转换为图片

    Args:
        mermaid_code: Mermaid 图表代码
        output_path: 输出文件路径（.png 或 .svg）
        theme: 主题，可选 default / dark / forest / neutral / base
        width: 图片宽度（像素）
        height: 图片高度（像素）
        background_color: 背景色，如 white / transparent / #1a1a2e
        scale: 缩放比例（影响清晰度）
    """
    if not check_mmdc():
        print("❌ 未找到 mmdc，请先安装：npm install -g @mermaid-js/mermaid-cli")
        sys.exit(1)

    # 写入临时 .mmd 文件
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".mmd", delete=False, encoding="utf-8"
    ) as tmp:
        tmp.write(mermaid_code)
        tmp_path = tmp.name

    # 构建 mmdc 配置文件（JSON）
    config = {
        "theme": theme,
        "width": width,
        "height": height,
    }
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".json", delete=False, encoding="utf-8"
    ) as cfg:
        import json
        json.dump(config, cfg)
        cfg_path = cfg.name

    try:
        cmd = get_mmdc_cmd() + [
            "-i", tmp_path,
            "-o", output_path,
            "-t", theme,
            "-w", str(width),
            "-H", str(height),
            "-b", background_color,
            "-s", str(scale),
            "-c", cfg_path,
        ]

        print(f"🔄 正在转换 Mermaid 图表 → {output_path}")
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)

        if result.returncode == 0:
            print(f"✅ 转换成功：{os.path.abspath(output_path)}")
            return True
        else:
            print(f"❌ 转换失败：\n{result.stderr}")
            return False
    except subprocess.TimeoutExpired:
        print("❌ 转换超时（60s），请检查 Node.js 环境")
        return False
    except Exception as e:
        print(f"❌ 发生错误：{e}")
        return False
    finally:
        os.unlink(tmp_path)
        os.unlink(cfg_path)


def main():
    parser = argparse.ArgumentParser(description="将 Mermaid 代码转换为图片")
    
    input_group = parser.add_mutually_exclusive_group(required=True)
    input_group.add_argument("--input", "-i", help="输入 .mmd 文件路径")
    input_group.add_argument("--code", "-c", help="直接传入 Mermaid 代码字符串")

    parser.add_argument("--output", "-o", required=True, help="输出图片路径（.png 或 .svg）")
    parser.add_argument(
        "--theme", "-t",
        default="default",
        choices=["default", "dark", "forest", "neutral", "base"],
        help="图表主题（默认: default）"
    )
    parser.add_argument("--width", "-w", type=int, default=1200, help="图片宽度（默认: 1200）")
    parser.add_argument("--height", "-H", type=int, default=800, help="图片高度（默认: 800）")
    parser.add_argument(
        "--background", "-b", default="white",
        help="背景色，如 white / transparent / #1a1a2e（默认: white）"
    )
    parser.add_argument("--scale", "-s", type=float, default=2.0, help="缩放比例（默认: 2.0，影响清晰度）")

    args = parser.parse_args()

    # 读取 Mermaid 代码
    if args.input:
        with open(args.input, "r", encoding="utf-8") as f:
            mermaid_code = f.read()
    else:
        mermaid_code = args.code

    # 执行转换
    success = convert_mermaid(
        mermaid_code=mermaid_code,
        output_path=args.output,
        theme=args.theme,
        width=args.width,
        height=args.height,
        background_color=args.background,
        scale=args.scale,
    )

    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
