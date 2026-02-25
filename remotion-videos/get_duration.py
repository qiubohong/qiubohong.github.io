#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简单的音频时长计算工具
"""

import sys
import os
from pathlib import Path

def get_audio_duration(audio_file):
    """使用 soundfile 获取音频时长"""
    try:
        import soundfile as sf
        info = sf.info(audio_file)
        duration_seconds = info.duration
        return duration_seconds
    except Exception as e:
        print(f"❌ 读取音频失败 {audio_file}: {e}")
        return None

def main():
    if len(sys.argv) < 2:
        print("用法: python get_duration.py <audio_file1> [audio_file2] ...")
        sys.exit(1)
    
    fps = 30
    buffer_frames = 30
    
    print("=" * 70)
    print("音频时长计算")
    print("=" * 70)
    print(f"帧率: {fps} fps")
    print(f"缓冲帧数: {buffer_frames} 帧")
    print()
    
    total_frames = 0
    results = []
    
    for audio_file in sys.argv[1:]:
        if not os.path.exists(audio_file):
            print(f"⚠️  文件不存在: {audio_file}")
            continue
        
        duration = get_audio_duration(audio_file)
        if duration is None:
            continue
        
        frames = int(duration * fps)
        total_with_buffer = frames + buffer_frames
        total_frames += total_with_buffer
        
        filename = Path(audio_file).name
        results.append({
            'file': filename,
            'duration': duration,
            'frames': frames,
            'total': total_with_buffer
        })
        
        print(f"📄 {filename}")
        print(f"   时长: {duration:.2f}秒")
        print(f"   帧数: {frames}帧")
        print(f"   总帧数(+缓冲): {total_with_buffer}帧")
        print()
    
    print("=" * 70)
    print(f"总帧数: {total_frames}帧")
    print(f"总时长: {total_frames/fps:.2f}秒 ({total_frames/fps/60:.2f}分钟)")
    print("=" * 70)

if __name__ == "__main__":
    main()
