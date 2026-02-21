#!/usr/bin/env python3
"""
计算RNN视频每个场景的音频时长和视频帧数
根据文本长度估算时长，或读取实际音频文件时长
"""

import os
from pathlib import Path
import json

# 场景文本（从tts_rnn.py复制）
SCENE_SCRIPTS = {
    "scene1-intro": "5分钟 AI，每天搞懂一个知识点！今天我们学习，循环网络 RNN。",
    
    "scene2-definition": """什么是 RNN？
RNN 等于 循环神经网络，它有两个核心特点。
第一，记忆状态，就像分拣中心的传送带，持续传递包裹，也就是信息。
第二，关键突破，传统神经网络每步独立处理，而 RNN 利用上一步结果辅助当前决策。
正如吴恩达所说，RNN的循环连接，是AI从静态画像走向动态影像的关键一跃。""",
    
    "scene3-keymodels": """关键算法模型有两个。
第一个是 LSTM，长短期记忆网络。
它的核心机制是三重门控加细胞状态。
创新点是遗忘门主动丢弃无用记忆，就像清理过期快递。
第二个是 GRU，门控循环单元。
它的核心机制是两重门控，包括更新门和重置门。
创新点是合并记忆与隐藏状态，参数比LSTM少百分之二十五。""",
    
    "scene4-lstm": """LSTM，长短期记忆网络的详细介绍。
核心目标是解决传统RNN的长期依赖问题，也就是梯度消失和梯度爆炸。
通过门控机制选择性保留关键历史信息。
结构创新有两点。
第一，记忆细胞，也叫 Cell State，它贯穿时间步的信息高速公路，稳定传递长期记忆。
第二，三重门控，包括遗忘门、输入门、输出门，动态调控信息流。""",
    
    "scene5-gru": """GRU，门控循环单元的详细介绍。
核心目标是在保留LSTM优势的同时，简化结构、提升计算效率。
结构创新也有两点。
第一，双门设计，合并遗忘门与输入门为更新门，新增重置门，取消独立记忆细胞。
第二，隐藏状态融合，直接操作隐藏状态，参数减少约百分之二十五。""",
    
    "scene6-applications": """实际应用场景有四个。
第一，实时语音识别，推荐模型是 GRU，案例是智能音箱指令解析，关键优势是低延迟，参数少。
第二，长文本翻译，推荐模型是 LSTM，案例是 ChatGPT 早期版本，关键优势是长期依赖捕捉。
第三，股票价格预测，推荐模型是双向RNN，案例是高频交易波动分析，关键优势是结合历史与未来趋势。
第四，视频动作生成，推荐模型是堆叠LSTM，案例是抖音AI跳舞视频，关键优势是多层抽象时序特征。""",
    
    "scene7-funfacts": """冷知识炸场，有四个有趣的事实。
第一，ImageNet冠军的陪跑。
2012年AlexNet夺冠引爆深度学习，而LSTM论文同年发表却无人问津，直至5年后成为NLP基石。
第二，人脑 versus LSTM 能耗比。
人脑处理一句话耗能约等于零点三卡路里，同等任务LSTM耗能约等于一点二万倍，但错误率低百分之四十。
第三，梯度消失的物理隐喻。
RNN梯度消失就像山洞回声传递，距离越远，声音越微弱，10步后几乎消失。
第四，工业界的返祖现象。
特斯拉自动驾驶放弃Transformer，回归GRU，因实时处理需求更高，GRU比LSTM快百分之三十七。""",
}

FPS = 30  # 视频帧率
BUFFER_FRAMES = 30  # 每个场景的缓冲帧数

def estimate_duration_from_text(text):
    """根据文本长度估算音频时长（中文语速约3.5字/秒）"""
    # 移除空白字符
    clean_text = text.replace('\n', '').replace(' ', '').replace('\t', '')
    char_count = len(clean_text)
    
    # 中文语速：约3.5字/秒（考虑标点停顿）
    estimated_duration = char_count / 3.5
    
    return estimated_duration

def get_actual_duration(audio_path):
    """获取实际音频文件时长"""
    try:
        import librosa
        audio, sr = librosa.load(audio_path, sr=None)
        duration = len(audio) / sr
        return duration
    except Exception as e:
        print(f"⚠️  无法读取音频文件 {audio_path}: {e}")
        return None

def calculate_frames(duration_seconds, fps=FPS, buffer_frames=BUFFER_FRAMES):
    """计算视频帧数"""
    audio_frames = int(duration_seconds * fps)
    total_frames = audio_frames + buffer_frames
    return audio_frames, total_frames

def main():
    print("=" * 60)
    print("RNN视频场景时长和帧数计算")
    print("=" * 60)
    
    public_dir = Path("public/RNNVideo")
    results = []
    total_duration = 0
    total_frames = 0
    
    print(f"\n📊 视频配置:")
    print(f"   帧率: {FPS} fps")
    print(f"   缓冲帧数: {BUFFER_FRAMES} 帧")
    print(f"\n{'场景':<20} {'文本字数':<10} {'预估时长':<12} {'音频帧数':<12} {'总帧数(+缓冲)':<15}")
    print("-" * 80)
    
    for scene_name, script_text in SCENE_SCRIPTS.items():
        # 尝试读取实际音频文件
        audio_path = public_dir / f"{scene_name}-audio.mp3"
        
        if audio_path.exists():
            duration = get_actual_duration(audio_path)
            if duration:
                source = "实际"
            else:
                duration = estimate_duration_from_text(script_text)
                source = "预估"
        else:
            duration = estimate_duration_from_text(script_text)
            source = "预估"
        
        # 计算帧数
        audio_frames, total_frames_scene = calculate_frames(duration)
        
        # 统计
        char_count = len(script_text.replace('\n', '').replace(' ', ''))
        total_duration += duration
        total_frames += total_frames_scene
        
        # 保存结果
        results.append({
            "scene": scene_name,
            "char_count": char_count,
            "duration": round(duration, 2),
            "audio_frames": audio_frames,
            "total_frames": total_frames_scene,
            "source": source
        })
        
        print(f"{scene_name:<20} {char_count:<10} {duration:>6.2f}秒({source}) {audio_frames:>10} {total_frames_scene:>13}")
    
    print("-" * 80)
    print(f"{'总计':<20} {'':<10} {total_duration:>10.2f}秒 {'':<12} {total_frames:>13}")
    
    # 计算转场帧数（从RNNVideo.tsx中提取）
    transition_frames = [20, 25, 15, 22, 22, 15, 30]  # 7个转场
    total_transition_frames = sum(transition_frames)
    
    # 结尾场景
    ending_frames = 140
    
    # 总帧数
    grand_total_frames = total_frames + total_transition_frames + ending_frames
    grand_total_duration = grand_total_frames / FPS
    
    print(f"\n📊 完整视频统计:")
    print(f"   场景总帧数: {total_frames}")
    print(f"   转场总帧数: {total_transition_frames}")
    print(f"   结尾帧数: {ending_frames}")
    print(f"   视频总帧数: {grand_total_frames}")
    print(f"   视频总时长: {grand_total_duration:.2f}秒 ({grand_total_duration/60:.2f}分钟)")
    
    # 生成TypeScript配置代码
    print(f"\n📝 RNNVideo.tsx 帧数配置:")
    print("-" * 60)
    
    for i, result in enumerate(results, 1):
        scene_name = result['scene'].replace('scene', '场景').replace('-intro', '介绍').replace('-definition', '定义').replace('-keymodels', '关键算法模型').replace('-lstm', 'LSTM详解').replace('-gru', 'GRU详解').replace('-applications', '实际应用').replace('-funfacts', '冷知识')
        print(f"// {scene_name} - {result['source']}时长 {result['duration']}秒 ({result['audio_frames']}帧) + {BUFFER_FRAMES}帧缓冲 = {result['total_frames']}帧")
        print(f"<TransitionSeries.Sequence durationInFrames={{{result['total_frames']}}}>")
        print()
    
    print(f"\n📝 Root.tsx 总帧数配置:")
    print("-" * 60)
    print(f"// RNN视频总时长: {grand_total_duration:.2f}秒 ({grand_total_duration/60:.2f}分钟)")
    print(f"durationInFrames: {grand_total_frames},")
    
    # 保存JSON配置
    config_path = Path("rnn_video_config.json")
    config = {
        "fps": FPS,
        "buffer_frames": BUFFER_FRAMES,
        "scenes": results,
        "transition_frames": total_transition_frames,
        "ending_frames": ending_frames,
        "total_frames": grand_total_frames,
        "total_duration": round(grand_total_duration, 2)
    }
    
    with open(config_path, 'w', encoding='utf-8') as f:
        json.dump(config, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ 配置已保存到: {config_path}")
    
    return results, grand_total_frames

if __name__ == "__main__":
    try:
        results, total_frames = main()
        print("\n🎉 计算完成！")
    except Exception as e:
        print(f"\n❌ 计算失败: {e}")
        import traceback
        traceback.print_exc()
