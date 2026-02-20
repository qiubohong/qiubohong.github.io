#!/usr/bin/env python3
"""
激活函数视频音频生成脚本
使用Qwen3-TTS模型生成高质量场景解说音频

🎯 功能特点：
• 根据audio-scripts.md中的文本生成音频
• 音频时长控制：避免音频过长，自动裁剪超过30秒的音频
• 语音质量优化：降低温度参数，提高语音稳定性
• 严格采样策略：减少语音乱码和重复问题
• 音频后处理：音量标准化、低通滤波提高清晰度
• 重试机制：自动重试失败的任务，提高成功率

语音角色：统一使用温柔女生角色，确保语音风格一致
音频时长：智能控制，避免过长音频，确保与视频同步
模型配置：使用本地下载的Qwen3-TTS模型，优化内存使用
"""

import os
import sys
import time
from pathlib import Path
import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel
import librosa
import numpy as np
from tqdm import tqdm

# 场景配置：场景名称和对应的文本内容
SCENE_CONFIG = {
    "scene1": {
        "name": "介绍",
        "text": """你知道吗？90%的AI模型都在用它！
今天我们来学习激活函数。
激活函数，简单理解就是神经网络的"智能开关"。
就像大脑神经元超过阈值才放电一样，激活函数决定信号是否向下传递。""",
        "output_file": "scene1-audio.mp3"
    },
    "scene2": {
        "name": "定义",
        "text": """那么，激活函数到底是什么呢？
简单说，它就是神经网络的智能开关，负责将输入映射到输出。
它有三大核心功能：
第一，引入非线性，使网络能够拟合复杂函数。
第二，特征过滤，抑制噪声，保留有效特征。
第三，梯度调控，防止梯度消失或爆炸。""",
        "output_file": "scene2-audio.mp3"
    },
    "scene3a": {
        "name": "5个经典激活函数-前2个",
        "text": """接下来看5个经典激活函数！
第一个，Sigmoid。
公式是 1 除以 1 加 e 的负 x 次方，
输出范围 0 到 1，适合二分类。
但有梯度消失问题。
第二个，Tanh。
公式是 e 的 x 次方减 e 的负 x 次方，
除以 e 的 x 次方加 e 的负 x 次方，
输出范围负 1 到 1，常用于 RNN 和 LSTM。
但梯度消失问题依然存在。""",
        "output_file": "scene3a-audio.mp3"
    },
    "scene3a2": {
        "name": "第3个激活函数-ReLU",
        "text": """第三个：最流行的激活函数！
ReLU，90%现代网络首选！
公式超简单，f(x) 等于 max(0, x)，
解决了梯度消失问题，
但有 Dead ReLU 问题。""",
        "output_file": "scene3a2-audio.mp3"
    },
    "scene3c": {
        "name": "后2个激活函数",
        "text": """最后2个：进阶版激活函数！
第四个，Leaky ReLU。
公式是 max(0.01x, x)，
解决了 Dead ReLU 问题，
在负数区保留微小梯度，更稳定。
第五个，Swish，Google 黑科技！
公式是 x 乘以 σ(x)，
Google Brain 用 AI 找到的，
精度超越 ReLU，移动端首选！""",
        "output_file": "scene3c-audio.mp3"
    },
    "scene4": {
        "name": "函数性能对比",
        "text": """来看性能对比！
梯度消失：Sigmoid和Tanh问题严重，ReLU系列完全没问题。
计算效率：ReLU五星最高，Leaky ReLU四星，Swish三星。
精度对比：Swish最高95%，Leaky ReLU 92%，ReLU 90%。
结论：Swish精度最高，ReLU效率最优！""",
        "output_file": "scene4-audio.mp3"
    },
    "scene5a": {
        "name": "动手实验-代码展示",
        "text": """动手实验时间！
用 Python 可视化这些函数超简单！
只需要几行代码，
就能看到所有激活函数的曲线。""",
        "output_file": "scene5a-audio.mp3"
    },
    "scene5b": {
        "name": "动手实验-观察重点",
        "text": """观察重点有两个。
第一，Sigmoid 和 Tanh 的饱和区，
两端平坦部分就是梯度消失的根源。
第二，ReLU 的负数截断，
直观看到 Dead ReLU 问题。""",
        "output_file": "scene5b-audio.mp3"
    },
    "scene6a": {
        "name": "冷知识-前2个",
        "text": """最后分享几个超酷的冷知识！
第一个，神经元激活率。
Sigmoid 网络只有 3-5% 的神经元激活，太浪费了！
ReLU 网络激活率高达 50%，效率爆表！
第二个，Swish 的灵感来自生物。
它的平滑性源于神经突触的离子通道动力学。""",
        "output_file": "scene6a-audio.mp3"
    },
    "scene6b": {
        "name": "冷知识-后2个",
        "text": """第三个，谷歌用 AI 找函数。
强化学习在 10 万种函数中发现 Swish，
超越人类设计！
第四个，宇宙级应用。
欧洲核子中心 CERN 用 GELU 处理粒子碰撞数据，
误差降低 38%！""",
        "output_file": "scene6b-audio.mp3"
    }
}

# Qwen3-TTS模型实例
_qwen_model = None

def get_qwen_model():
    """获取或初始化Qwen3-TTS模型"""
    global _qwen_model
    if _qwen_model is None:
        try:
            print("🔧 加载Qwen3-TTS模型...")
            
            model_kwargs = {
                "pretrained_model_name_or_path": "../../Qwen3-TTS-12Hz-1.7B-Base",
                "device_map": "auto",
                "torch_dtype": torch.bfloat16,
                "low_cpu_mem_usage": True,
            }
            
            _qwen_model = Qwen3TTSModel.from_pretrained(**model_kwargs)
            print("✅ Qwen3-TTS模型加载完成")
            
        except Exception as e:
            print(f"❌ Qwen3-TTS模型加载失败: {e}")
            print("💡 建议检查：")
            print("   1. 模型路径是否正确（../../Qwen3-TTS-12Hz-1.7B-Base")
            print("   2. 网络连接是否正常")
            print("   3. 磁盘空间是否充足")
            return None
    return _qwen_model

def generate_tts_audio(text, output_path, scene_name=None):
    """使用Qwen3-TTS生成音频"""
    max_retries = 3
    
    for attempt in range(max_retries):
        model = get_qwen_model()
        if model is None:
            return False, 0
        
        print(f"🔄 尝试生成语音 (第{attempt + 1}次)...")
        
        try:
            wavs, sr = model.generate_voice_clone(
                ref_audio="../../borfy.mp3",
                ref_text="5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。",
                text=text,
                language="chinese",
                max_new_tokens=512,
                do_sample=True,
                top_k=10,
                top_p=0.7,
                temperature=0.3,
                repetition_penalty=1.5,
                subtalker_dosample=True,
                subtalker_top_k=10,
                subtalker_top_p=0.7,
                subtalker_temperature=0.3,
            )
            
            sf.write(output_path, wavs[0], sr)
            
            audio_duration_seconds = 0
            try:
                audio, sr_loaded = librosa.load(output_path, sr=None)
                
                audio_duration_seconds = len(audio) / sr_loaded
                print(f"📊 音频时长: {audio_duration_seconds:.2f}秒")
                
                if audio_duration_seconds > 30:
                    print("⚠️  音频过长，进行裁剪...")
                    max_samples = int(30 * sr_loaded)
                    audio = audio[:max_samples]
                    audio_duration_seconds = len(audio) / sr_loaded
                    print(f"✓ 裁剪后时长: {audio_duration_seconds:.2f}秒")
                
                audio_normalized = librosa.util.normalize(audio) * 0.7
                audio_filtered = librosa.effects.preemphasis(audio_normalized, coef=0.97)
                sf.write(output_path, audio_filtered, sr_loaded)
                print(f"✓ 音频后处理完成: {output_path}")
                
                if audio_duration_seconds < 1.0:
                    print("⚠️  音频过短，可能生成失败")
                    continue
                    
            except Exception as e:
                print(f"⚠️  音频后处理失败，但原始音频已保存: {e}")
            
            print(f"✓ 生成音频: {output_path}")
            return True, int(audio_duration_seconds * 1000)
            
        except Exception as e:
            print(f"❌ 第{attempt + 1}次生成失败: {e}")
            if attempt < max_retries - 1:
                print("🔄 等待2秒后重试...")
                time.sleep(2)
    
    return False, 0

def get_audio_duration_ms(audio_path):
    """获取音频文件的时长（毫秒）"""
    try:
        audio, sr = librosa.load(audio_path, sr=None)
        duration_seconds = len(audio) / sr
        duration_ms = int(duration_seconds * 1000)
        return duration_ms
    except Exception as e:
        print(f"❌ 读取音频时长失败 {audio_path}: {e}")
        return None

def generate_all_scene_audios():
    """生成所有场景的音频文件"""
    print("🎵 开始处理激活函数视频音频...")
    print("🤖 使用Qwen3-TTS模型生成高质量语音")
    print("🎯 优化参数：严格控制音频时长和语音质量")
    
    success_count = 0
    skipped_count = 0
    
    for scene_id, config in tqdm(SCENE_CONFIG.items(), desc="处理音频"):
        scene_name = config['name']
        text = config['text']
        output_path = config['output_file']
        
        print(f"\n📝 处理场景: {scene_id} - {scene_name}")
        
        if Path(output_path).exists():
            print(f"✓ 音频文件已存在: {output_path}")
            
            audio_duration_ms = get_audio_duration_ms(output_path)
            if audio_duration_ms is not None:
                print(f"📊 音频时长: {audio_duration_ms/1000:.2f}秒")
                success_count += 1
                skipped_count += 1
                print(f"✅ 场景处理完成（使用已存在音频）")
                continue
            else:
                print(f"⚠️  无法读取音频时长，将重新生成音频")
        
        print(f"🎤 生成新音频...")
        print(f"   文本: {text[:100]}...")
        
        if len(text) > 200:
            print("⚠️  文本过长，可能影响音频质量")
        
        result = generate_tts_audio(text, output_path, scene_name)
        if isinstance(result, tuple) and result[0]:
            success, audio_duration_ms = result
            print(f"✅ 场景音频生成完成: {output_path}")
            print(f"📊 音频时长: {audio_duration_ms/1000:.2f}秒")
            success_count += 1
        else:
            print(f"❌ 场景音频生成失败: {scene_id}")
    
    print(f"\n📊 处理结果:")
    print(f"   总场景数: {len(SCENE_CONFIG)}")
    print(f"   成功处理: {success_count}/{len(SCENE_CONFIG)}")
    print(f"   使用已存在音频: {skipped_count}")
    print(f"   新生成音频: {success_count - skipped_count}")
    print(f"   失败: {len(SCENE_CONFIG) - success_count}")
    
    if success_count == len(SCENE_CONFIG):
        print("🎉 所有场景处理完成！")
        print("📁 音频文件位置: ./")
        print("\n📝 下一步操作：")
        print("1. 使用Remotion生成字幕文件：")
        for scene_id in SCENE_CONFIG.keys():
            print(f"   npx remotion transcribe ActivationVideo/{scene_id}-audio.mp3 ActivationVideo/{scene_id}-captions.json")
        print("\n2. 运行 'npm start' 预览视频效果")
        print("3. 根据实际音频时长调整视频场景的durationInFrames")
    else:
        print("⚠️  部分场景处理失败，请检查错误信息")
    
    return success_count == len(SCENE_CONFIG)

def check_dependencies():
    """检查依赖是否安装"""
    required_packages = ["torch", "transformers", "accelerate", "qwen_tts", "soundfile", "librosa", "numpy", "tqdm"]
    
    print("🔍 检查Qwen3-TTS依赖包...")
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✓ {package}")
        except ImportError:
            missing_packages.append(package)
            print(f"✗ {package}")
    
    if missing_packages:
        print(f"\n❌ 缺少必需依赖包: {', '.join(missing_packages)}")
        print("💡 请运行: pip install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm")
        return False
    
    print("✅ 所有必需依赖包已安装")
    
    if torch.cuda.is_available():
        print(f"🎮 GPU可用: {torch.cuda.get_device_name(0)}")
    else:
        print("⚠️  GPU不可用，将使用CPU运行（速度较慢）")
    
    return True

if __name__ == "__main__":
    print("=" * 60)
    print("激活函数视频 - Qwen3-TTS音频生成工具")
    print("=" * 60)
    print("🤖 使用Qwen3-TTS模型生成高质量语音解说")
    print("🎯 统一使用温柔女生角色，语音风格一致")
    print("📝 根据场景拆分方案生成9个场景音频")
    print("=" * 60)    
    if not check_dependencies():
        sys.exit(1)
    
    success = generate_all_scene_audios()
    
    if success:
        print("\n🎯 使用说明:")
        print("1. 运行 'npm start' 预览视频效果")
        print("2. 运行 'npm run render -- ActivationFunctionVideo' 渲染最终视频")
        print("3. 音频文件位置: public/ActivationVideo/")
    
    sys.exit(0 if success else 1)
