#!/usr/bin/env python3
"""
监督学习动画视频 - 音频生成脚本
使用Qwen3-TTS模型生成高质量场景解说音频
语音角色：统一使用温柔女生角色，确保语音风格一致
音频时长：根据文本内容自然生成，不再限制为固定时长
模型配置：使用本地下载的Qwen3-TTS模型，无需额外加速包
脚本调整：根据实际生成的字幕内容优化脚本文本，确保音频与字幕完美同步
"""

import os
import sys
from pathlib import Path
import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel
from pydub import AudioSegment
import librosa
import numpy as np
from tqdm import tqdm

# 场景解说文本配置（根据实际字幕内容调整）
SCENE_SCRIPTS = {
    "scene1-intro": "5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。",
    "scene2-definition": "什么是监督学习？监督学习是一种机器学习方法，通过标记数据训练模型，模型学习输入特征与输出标签之间的映射关系。",
    "scene3-types": "监督学习主要分为两大类回归和分类问题，回归预测连续值，分类预测离散类别。",
    "scene4-regression": "回归问题示例预测房价、股票价格等连续数值，线性回归、决策树回归是常用算法。",
    "scene5-classification": "分类问题示例垃圾邮件识别、图像分类等，逻辑回归、支持向量机是常用算法。",
    "scene6-hands-on": "动手试试监督学习使用Python和scikit-learn库，快速构建你的第一个机器学习模型。",
    "scene7-fun-fact": "监督学习冷知识监督学习是应用最广泛的机器学习类型，占实际应用的70%以上。"
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
                "pretrained_model_name_or_path": "Qwen3-TTS-12Hz-1.7B-Base",
                "device_map": "auto",
                "torch_dtype": torch.bfloat16,
            }
            
            _qwen_model = Qwen3TTSModel.from_pretrained(**model_kwargs)
            print("✅ Qwen3-TTS模型加载完成")
            
        except Exception as e:
            print(f"❌ Qwen3-TTS模型加载失败: {e}")
            print("💡 建议检查：")
            print("   1. 网络连接是否正常")
            print("   2. 磁盘空间是否充足")
            print("   3. 尝试使用国内镜像源")
            return None
    return _qwen_model

def generate_tts_audio(text, output_path, scene_name=None):
    """使用Qwen3-TTS生成音频"""
    max_retries = 3
    
    for attempt in range(max_retries):
        model = get_qwen_model()
        if model is None:
            return False
        
        print(f"🔄 尝试生成语音 (第{attempt + 1}次)...")
        
        common_gen_kwargs = dict(
            max_new_tokens=1024,  # 减少token限制，避免过长音频
            do_sample=True,
            top_k=20,            # 更严格的采样，提高语音质量
            top_p=0.8,           # 更保守的采样策略
            temperature=0.6,     # 更低的温度，减少随机性
            repetition_penalty=1.2,  # 更强的重复惩罚
            subtalker_dosample=True,
            subtalker_top_k=20,
            subtalker_top_p=0.8,
            subtalker_temperature=0.6,
        )
        wavs, sr = model.generate_voice_clone(
            ref_audio="./demo.wav",
            ref_text="欢迎来到监督学习的世界！在这个视频中，我们将一起探索机器学习的重要分支监督学习的基本概念、类型和应用场景。",
            text=text,
            language="chinese",
            **common_gen_kwargs
        )
        
        # 保存音频
        sf.write(output_path, wavs[0], sr)
        
        # 音频后处理：音量标准化
        try:
            audio, sr_loaded = librosa.load(output_path, sr=None)
            # 音量标准化到-3dB
            audio_normalized = librosa.util.normalize(audio) * 0.7
            sf.write(output_path, audio_normalized, sr_loaded)
            print(f"✓ 音频后处理完成: {output_path}")
        except Exception as e:
            print(f"⚠️  音频后处理失败，但原始音频已保存: {e}")
        
            print(f"✓ 生成音频: {output_path}")
            return True
    
    return False
def generate_all_scene_audios():
    """生成所有场景的音频文件"""
    print("🎵 开始生成监督学习视频音频解说...")
    print("🤖 使用Qwen3-TTS模型生成高质量语音")
    print("🎯 根据文本内容自然生成音频时长，确保音色一致性")
    
    # 确保public目录存在
    public_dir = Path("public")
    public_dir.mkdir(exist_ok=True)
    
    success_count = 0
    
    for scene_name, script_text in tqdm(SCENE_SCRIPTS.items(), desc="生成音频"):
        output_path = public_dir / f"{scene_name}.mp3"
        
        print(f"\n📝 处理场景: {scene_name}")
        print(f"   文本: {script_text}")
        
        # 生成TTS音频（传递scene_name用于语音风格控制）
        if generate_tts_audio(script_text, output_path, scene_name):
            print(f"✅ 场景音频完成: {output_path.name}")
            success_count += 1
        else:
            print(f"❌ 场景音频生成失败: {scene_name}")
    
    print(f"\n📊 生成结果:")
    print(f"   成功: {success_count}/{len(SCENE_SCRIPTS)}")
    print(f"   失败: {len(SCENE_SCRIPTS) - success_count}")
    
    if success_count == len(SCENE_SCRIPTS):
        print("🎉 所有音频生成完成！")
        print("📁 音频文件已保存到: public/")
        print("🎬 现在可以运行 'npm start' 预览视频效果")
    else:
        print("⚠️  部分音频生成失败，请检查错误信息")
    
    return success_count == len(SCENE_SCRIPTS)

def check_dependencies():
    """检查依赖是否安装"""
    # Qwen3-TTS核心依赖（必需）
    required_packages = ["torch", "transformers", "accelerate", "qwen_tts", "soundfile", "librosa", "numpy", "tqdm"]
    
    print("🔍 检查Qwen3-TTS依赖包...")
    
    missing_packages = []
    
    # 检查必需依赖
    for package in required_packages:
        try:
            __import__(package)
            print(f"✓ {package}")
        except ImportError:
            missing_packages.append(package)
            print(f"✗ {package}")
    
    if missing_packages:
        print(f"\n❌ 缺少必需依赖包: {', '.join(missing_packages)}")
        print("💡 请运行: pip install -r requirement.txt")
        return False
    
    print("✅ 所有必需依赖包已安装")
    
    # 检查GPU可用性
    if torch.cuda.is_available():
        print(f"🎮 GPU可用: {torch.cuda.get_device_name(0)}")
    else:
        print("⚠️  GPU不可用，将使用CPU运行（速度较慢）")
    
    return True

if __name__ == "__main__":
    print("=" * 50)
    print("监督学习动画视频 - Qwen3-TTS音频生成工具")
    print("=" * 50)
    print("🤖 使用Qwen3-TTS模型生成高质量语音解说")
    print("🎯 统一使用温柔女生角色，语音风格一致")
    print("=" * 50)
    
    # 检查依赖
    if not check_dependencies():
        sys.exit(1)
    
    # 生成音频
    success = generate_all_scene_audios()
    
    if success:
        print("\n🎯 使用说明:")
        print("1. 运行 'npm start' 预览视频效果")
        print("2. 运行 'npm run build' 渲染最终视频")
        print("3. 音频文件位置: public/")
        print("\n💡 技术特点:")
        print("   • 使用Qwen3-TTS 1.7B模型")
        print("   • 支持语音风格定制，确保音色一致性")
        print("   • 根据文本内容自然生成音频时长")
        print("   • 自动音量标准化优化")
        print("   • 高质量中文语音合成")
        print("   • 使用本地模型，无需额外加速包")
    
    sys.exit(0 if success else 1)