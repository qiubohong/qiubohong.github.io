#!/usr/bin/env python3
"""
场景帧数自动更新脚本

根据音频文件的实际时长，自动计算并更新 Remotion 视频配置文件（如 RAGVideo.tsx）中的场景帧数。

使用方法:
    # 激活 conda 环境后执行
    conda activate qwen3-tts
    python update_scene_frames.py --audio-dir <音频目录> --tsx-file <TSX文件路径>

示例:
    conda activate qwen3-tts
    python update_scene_frames.py \
        --audio-dir remotion-videos/public/RAGVideo/audios \
        --tsx-file remotion-videos/src/scenes/RAGVideo/RAGVideo.tsx \
        --scenes 9 \
        --fps 30 \
        --buffer 30

Requirements:
    conda activate qwen3-tts  (包含 pydub)
    或: pip install pydub
    ffmpeg 已安装
"""

import sys
import os
import re
import argparse
from pydub.utils import mediainfo


def get_audio_duration(file_path):
    """获取音频文件时长（秒）"""
    try:
        info = mediainfo(file_path)
        return float(info['duration'])
    except Exception as e:
        print(f"  ❌ 无法读取: {file_path} -> {e}")
        return None


def seconds_to_frames(seconds, fps=30, buffer=30):
    """秒数转帧数（含缓冲帧）"""
    return int(seconds * fps) + buffer


def calculate_all_durations(audio_dir, scene_count, fps=30, buffer=30):
    """
    批量计算所有场景音频时长

    Returns:
        list of dict: [{scene, file, duration, frames}, ...]
    """
    results = []
    for i in range(1, scene_count + 1):
        audio_file = os.path.join(audio_dir, f"scene{i}.mp3")
        if not os.path.exists(audio_file):
            print(f"  ⚠️  scene{i}.mp3 不存在，跳过")
            continue

        duration = get_audio_duration(audio_file)
        if duration is None:
            continue

        frames = seconds_to_frames(duration, fps, buffer)
        results.append({
            'scene': i,
            'file': audio_file,
            'duration': duration,
            'frames': frames,
        })
        print(f"  scene{i}: {duration:.2f}s → {frames} 帧 (@ {fps}fps + {buffer}帧缓冲)")

    return results


def update_tsx_file(tsx_file, results, dry_run=False):
    """
    更新 TSX 文件中的 SCENE_CONFIG duration 值和注释

    支持格式:
        { id: 'intro', component: Scene1_Intro, duration: 246, ... }
    """
    if not os.path.exists(tsx_file):
        print(f"❌ TSX 文件不存在: {tsx_file}")
        return False

    with open(tsx_file, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 更新注释块（// scene1: 7.22s → 246 frames）
    comment_lines = []
    for r in results:
        comment_lines.append(f"// scene{r['scene']}: {r['duration']:.2f}s → {r['frames']} frames")

    # 替换注释区域
    comment_pattern = re.compile(
        r'(// 视频片段配置.*?\n)((?:// scene\d+:.*?\n)+)',
        re.DOTALL
    )
    new_comment_block = "".join(f"{line}\n" for line in comment_lines)

    def replace_comments(m):
        return m.group(1) + new_comment_block

    content = comment_pattern.sub(replace_comments, content)

    # 替换 SCENE_CONFIG 中每个 duration 值
    for r in results:
        # 匹配 scene{i} 对应行中的 duration: <数字>
        # 例如: { id: 'intro', component: Scene1_Intro, duration: 246, audio: ...
        # 用场景序号定位（通过 audio: 'RAGVideo/audios/scene{i}.mp3' 定位）
        pattern = re.compile(
            r"(audio:\s*['\"](?:RAGVideo/audios/)?scene" + str(r['scene']) + r"\.mp3['\"].*?duration:\s*)(\d+)",
            re.DOTALL
        )
        # 也支持 duration 在 audio 前面的情况
        pattern2 = re.compile(
            r"(duration:\s*)(\d+)(,\s*audio:\s*['\"](?:RAGVideo/audios/)?scene" + str(r['scene']) + r"\.mp3['\"])",
        )

        if pattern2.search(content):
            content = pattern2.sub(lambda m: f"{m.group(1)}{r['frames']}{m.group(3)}", content)
        elif pattern.search(content):
            content = pattern.sub(lambda m: f"{m.group(1)}{r['frames']}", content)
        else:
            # 通用方式：按行查找包含 scene{i}.mp3 的行，替换该行的 duration
            lines = content.split('\n')
            for idx, line in enumerate(lines):
                if f"scene{r['scene']}.mp3" in line and 'duration:' in line:
                    lines[idx] = re.sub(r'duration:\s*\d+', f"duration: {r['frames']}", line)
            content = '\n'.join(lines)

    if content == original_content:
        print("⚠️  TSX 文件内容未发生变化，请检查文件格式是否匹配")
        return False

    if dry_run:
        print("\n[DRY RUN] 以下是将要写入的内容片段（SCENE_CONFIG 部分）:")
        # 只打印 SCENE_CONFIG 区域
        start = content.find('const SCENE_CONFIG')
        end = content.find('];', start) + 2
        print(content[start:end])
        return True

    with open(tsx_file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"\n✅ 已更新: {tsx_file}")
    return True


def main():
    parser = argparse.ArgumentParser(
        description='根据音频时长自动更新 Remotion 场景帧数配置',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  # 激活 conda 环境
  conda activate qwen3-tts

  # 更新 RAGVideo 帧数
  python update_scene_frames.py \\
      --audio-dir remotion-videos/public/RAGVideo/audios \\
      --tsx-file remotion-videos/src/scenes/RAGVideo/RAGVideo.tsx

  # 预览不写入
  python update_scene_frames.py \\
      --audio-dir remotion-videos/public/RAGVideo/audios \\
      --tsx-file remotion-videos/src/scenes/RAGVideo/RAGVideo.tsx \\
      --dry-run
        """
    )

    parser.add_argument('--audio-dir', required=True,
                        help='音频文件目录（包含 scene1.mp3 ~ sceneN.mp3）')
    parser.add_argument('--tsx-file', required=True,
                        help='要更新的 TSX 配置文件路径')
    parser.add_argument('--scenes', type=int, default=9,
                        help='场景数量（默认: 9）')
    parser.add_argument('--fps', type=int, default=30,
                        help='帧率（默认: 30）')
    parser.add_argument('--buffer', type=int, default=30,
                        help='缓冲帧数（默认: 30）')
    parser.add_argument('--dry-run', action='store_true',
                        help='仅预览，不写入文件')

    args = parser.parse_args()

    print(f"🎵 正在计算音频时长...")
    print(f"   音频目录: {args.audio_dir}")
    print(f"   场景数量: {args.scenes}")
    print(f"   帧率: {args.fps} fps，缓冲: {args.buffer} 帧\n")

    results = calculate_all_durations(args.audio_dir, args.scenes, args.fps, args.buffer)

    if not results:
        print("❌ 未找到任何音频文件")
        sys.exit(1)

    total_frames = sum(r['frames'] for r in results)
    total_seconds = sum(r['duration'] for r in results)
    print(f"\n📊 汇总: 共 {len(results)} 个场景，总时长 {total_seconds:.1f}s，总帧数 {total_frames}")

    print(f"\n📝 正在更新 TSX 文件: {args.tsx_file}")
    update_tsx_file(args.tsx_file, results, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
