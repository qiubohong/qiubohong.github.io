#!/usr/bin/env python3
"""
测试音频检测和字幕更新功能
"""

import sys
import json
from pathlib import Path

# 场景配置
SCENE_CONFIG = {
    "scene1": {
        "name": "介绍",
        "caption_file": "public/UnsupervisedLearningVideo/scene1-captions.json",
        "output_file": "public/UnsupervisedLearningVideo/scene1-audio.mp3"
    },
    "scene2": {
        "name": "定义",
        "caption_file": "public/UnsupervisedLearningVideo/scene2-captions.json",
        "output_file": "public/UnsupervisedLearningVideo/scene2-audio.mp3"
    },
    "scene3": {
        "name": "三种方法",
        "caption_file": "public/UnsupervisedLearningVideo/scene3-captions.json",
        "output_file": "public/UnsupervisedLearningVideo/scene3-audio.mp3"
    },
    "scene4": {
        "name": "聚类详解",
        "caption_file": "public/UnsupervisedLearningVideo/scene4-captions.json",
        "output_file": "public/UnsupervisedLearningVideo/scene4-audio.mp3"
    },
    "scene5": {
        "name": "降维详解",
        "caption_file": "public/UnsupervisedLearningVideo/scene5-captions.json",
        "output_file": "public/UnsupervisedLearningVideo/scene5-audio.mp3"
    },
    "scene6": {
        "name": "关联详解",
        "caption_file": "public/UnsupervisedLearningVideo/scene6-captions.json",
        "output_file": "public/UnsupervisedLearningVideo/scene6-audio.mp3"
    },
    "scene7": {
        "name": "动手实验",
        "caption_file": "public/UnsupervisedLearningVideo/scene7-captions.json",
        "output_file": "public/UnsupervisedLearningVideo/scene7-audio.mp3"
    },
    "scene8": {
        "name": "实际案例",
        "caption_file": "public/UnsupervisedLearningVideo/scene8-captions.json",
        "output_file": "public/UnsupervisedLearningVideo/scene8-audio.mp3"
    }
}

def get_audio_duration_ms(audio_path):
    """获取音频文件的时长（毫秒）- 使用pydub"""
    try:
        from pydub import AudioSegment
        audio = AudioSegment.from_mp3(audio_path)
        return len(audio)  # pydub返回的就是毫秒
    except ImportError:
        # 如果pydub不可用，尝试使用ffprobe
        try:
            import subprocess
            result = subprocess.run(
                ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', 
                 '-of', 'default=noprint_wrappers=1:nokey=1', audio_path],
                capture_output=True,
                text=True
            )
            duration_sec = float(result.stdout.strip())
            return int(duration_sec * 1000)
        except:
            # 最后尝试使用文件大小估算（不准确，仅供参考）
            file_size = Path(audio_path).stat().st_size
            # 假设128kbps的MP3，粗略估算
            estimated_duration_sec = file_size / (128 * 1024 / 8)
            return int(estimated_duration_sec * 1000)
    except Exception as e:
        print(f"❌ 读取音频时长失败 {audio_path}: {e}")
        return None

def get_caption_duration_ms(caption_file):
    """获取字幕文件的总时长（毫秒）"""
    try:
        with open(caption_file, 'r', encoding='utf-8') as f:
            captions = json.load(f)
        if captions:
            return captions[-1]['endMs']
        return 0
    except Exception as e:
        print(f"❌ 读取字幕时长失败 {caption_file}: {e}")
        return None

def main():
    print("=" * 80)
    print("音频检测和字幕时长对比测试")
    print("=" * 80)
    
    print(f"\n{'场景':<10} {'音频文件':<10} {'音频时长':<12} {'字幕时长':<12} {'差异':<10} {'状态'}")
    print("-" * 80)
    
    total_scenes = len(SCENE_CONFIG)
    audio_exists = 0
    needs_update = 0
    
    for scene_id, config in SCENE_CONFIG.items():
        scene_name = config['name']
        caption_file = config['caption_file']
        audio_file = config['output_file']
        
        # 检查音频文件是否存在
        audio_status = "✓" if Path(audio_file).exists() else "✗"
        
        if Path(audio_file).exists():
            audio_exists += 1
            
            # 获取音频时长
            audio_duration_ms = get_audio_duration_ms(audio_file)
            
            # 获取字幕时长
            caption_duration_ms = get_caption_duration_ms(caption_file)
            
            if audio_duration_ms and caption_duration_ms:
                audio_sec = audio_duration_ms / 1000
                caption_sec = caption_duration_ms / 1000
                diff_sec = abs(audio_sec - caption_sec)
                diff_ratio = diff_sec / audio_sec * 100
                
                # 判断是否需要更新
                status = "✅ 同步" if diff_ratio < 10 else "⚠️  需更新"
                if diff_ratio >= 10:
                    needs_update += 1
                
                print(f"{scene_name:<10} {audio_status:<10} {audio_sec:>6.2f}秒    {caption_sec:>6.2f}秒    {diff_sec:>5.2f}秒 ({diff_ratio:>4.1f}%)  {status}")
            else:
                print(f"{scene_name:<10} {audio_status:<10} {'错误':<12} {'错误':<12} {'-':<10} ❌ 错误")
        else:
            print(f"{scene_name:<10} {audio_status:<10} {'不存在':<12} {'-':<12} {'-':<10} 🎤 需生成")
    
    print("-" * 80)
    print(f"\n📊 统计:")
    print(f"   总场景数: {total_scenes}")
    print(f"   音频已存在: {audio_exists}")
    print(f"   音频不存在: {total_scenes - audio_exists}")
    print(f"   需要更新字幕: {needs_update}")
    print(f"   已同步: {audio_exists - needs_update}")
    
    print(f"\n💡 建议:")
    if audio_exists == total_scenes:
        if needs_update > 0:
            print(f"   ✅ 所有音频文件已存在")
            print(f"   ⚠️  有 {needs_update} 个场景的字幕需要更新")
            print(f"   🔄 运行 'python3 tts_unsupervised.py' 更新字幕时间戳")
        else:
            print(f"   ✅ 所有音频和字幕已同步，无需操作")
    else:
        print(f"   🎤 有 {total_scenes - audio_exists} 个场景需要生成音频")
        print(f"   🔄 运行 'python3 tts_unsupervised.py' 生成音频并更新字幕")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  用户中断")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ 错误: {e}")
        sys.exit(1)
