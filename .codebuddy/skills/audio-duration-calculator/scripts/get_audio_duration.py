#!/usr/bin/env python3
"""
Audio Duration Calculator Script

This script calculates the duration of audio files (MP3, WAV, M4A, etc.)
using the pydub library.

Usage:
    python get_audio_duration.py <audio_file_path>
    python get_audio_duration.py <audio_file_path> --frames --fps 30

Requirements:
    pip install pydub

Note: pydub requires ffmpeg or libav to be installed on the system.
"""

import sys
import argparse
from pydub.utils import mediainfo


def get_audio_duration(file_path):
    """
    获取音频文件的时长（秒）
    
    Args:
        file_path: 音频文件路径
        
    Returns:
        float: 音频时长（秒）
    """
    try:
        # 获取音频信息
        info = mediainfo(file_path)
        # 时长单位通常是秒，返回为字符串，需要转换
        duration_seconds = float(info['duration'])
        return duration_seconds
    except Exception as e:
        print(f"错误: 无法读取音频文件 '{file_path}'")
        print(f"详细信息: {str(e)}")
        sys.exit(1)


def seconds_to_frames(seconds, fps=30):
    """
    将秒数转换为帧数
    
    Args:
        seconds: 秒数
        fps: 帧率（默认30fps）
        
    Returns:
        int: 帧数
    """
    return int(seconds * fps)


def format_time(seconds):
    """
    将秒数格式化为 HH:MM:SS.mmm 格式
    
    Args:
        seconds: 秒数
        
    Returns:
        str: 格式化的时间字符串
    """
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = seconds % 60
    
    if hours > 0:
        return f"{hours:02d}:{minutes:02d}:{secs:06.3f}"
    else:
        return f"{minutes:02d}:{secs:06.3f}"


def main():
    parser = argparse.ArgumentParser(
        description='计算音频文件的时长',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  python get_audio_duration.py audio.mp3
  python get_audio_duration.py audio.mp3 --frames --fps 30
  python get_audio_duration.py audio.wav --format
        """
    )
    
    parser.add_argument('file_path', help='音频文件路径')
    parser.add_argument('--frames', action='store_true', 
                       help='同时显示帧数（默认30fps）')
    parser.add_argument('--fps', type=int, default=30,
                       help='帧率（默认: 30）')
    parser.add_argument('--format', action='store_true',
                       help='以 HH:MM:SS.mmm 格式显示时长')
    
    args = parser.parse_args()
    
    # 获取音频时长
    duration = get_audio_duration(args.file_path)
    
    # 输出结果
    print(f"文件: {args.file_path}")
    print(f"时长: {duration:.2f} 秒")
    
    if args.format:
        print(f"格式化时长: {format_time(duration)}")
    
    if args.frames:
        frames = seconds_to_frames(duration, args.fps)
        print(f"帧数: {frames} 帧 (@ {args.fps} fps)")
        print(f"建议缓冲帧数: {frames + 30} 帧 (原始帧数 + 30帧缓冲)")


if __name__ == "__main__":
    main()
