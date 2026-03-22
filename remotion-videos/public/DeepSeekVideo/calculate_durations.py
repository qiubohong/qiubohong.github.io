#!/usr/bin/env python3
"""
计算音频文件时长并生成 durations.json
用法: python calculate_durations.py
"""

import json
import subprocess
from pathlib import Path

def get_audio_duration(filepath):
    """使用 ffprobe 获取音频时长"""
    try:
        result = subprocess.run(
            ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', 
             '-of', 'default=noprint_wrappers=1:nokey=1', str(filepath)],
            capture_output=True,
            text=True
        )
        duration = float(result.stdout.strip())
        return duration
    except Exception as e:
        print(f"⚠️  无法获取 {filepath} 时长: {e}")
        return 0

def calculate_durations():
    """计算所有音频文件的时长并生成 durations.json"""
    current_dir = Path(__file__).parent
    
    durations = {
        "scene1": 690,  # 默认估计值
        "scene2": 780,
        "scene3": 870,
        "scene4": 930,
        "scene5": 870,
        "scene6": 810,
        "scene7": 780,
        "ending": 180,
    }
    
    fps = 30
    
    # 查找所有音频文件
    for scene_num in range(1, 8):
        audio_file = current_dir / f"scene{scene_num}-audio.mp3"
        
        if audio_file.exists():
            duration_seconds = get_audio_duration(audio_file)
            # 音频时长(秒) * fps + 30帧缓冲
            frames = int(duration_seconds * fps + 30)
            durations[f"scene{scene_num}"] = frames
            print(f"✅ Scene {scene_num}: {duration_seconds:.2f}s → {frames} frames")
        else:
            print(f"⚠️  Scene {scene_num}: 音频文件不存在，使用默认值 {durations[f'scene{scene_num}']} frames")
    
    # 保存 durations.json
    output_file = current_dir / "durations.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(durations, f, indent=2)
    
    print(f"\n📊 总帧数: {sum(durations.values())} frames")
    print(f"⏱️  总时长: {sum(durations.values()) / fps:.2f} seconds")
    print(f"💾 已保存到: {output_file}")
    
    return durations

if __name__ == "__main__":
    print("=" * 50)
    print("DeepSeekVideo 音频时长计算工具")
    print("=" * 50)
    calculate_durations()
