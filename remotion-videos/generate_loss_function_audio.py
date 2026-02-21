#!/usr/bin/env python3
"""
损失函数视频音频生成脚本（优化版）
使用Qwen3-TTS模型生成高质量场景解说音频

🎯 优化重点：
• 音频时长控制：避免音频过长，自动裁剪超过30秒的音频
• 语音质量优化：降低温度参数，提高语音稳定性
• 严格采样策略：减少语音乱码和重复问题
• 音频后处理：音量标准化、低通滤波提高清晰度
• 重试机制：自动重试失败的任务，提高成功率

语音角色：使用语音克隆技术，确保语音风格一致
音频时长：智能控制，避免过长音频，确保与视频同步
模型配置：使用本地下载的Qwen3-TTS模型，优化内存使用
"""

import os
import sys
from pathlib import Path
import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel
import librosa
import numpy as np
from tqdm import tqdm

# 音频脚本内容
SCRIPTS = {
    "scene1": """大家好，五分钟学习AI！
今天我们来聊聊损失函数。
AI模型为什么总能"猜对"？
秘密就藏在损失函数里！
损失函数就像AI的考试评分标准，
预测值离真实值越远，扣分越多，
模型通过降低扣分来变聪明。""",
    
    "scene2": """损失函数有三大核心要素：
第一，量化误差，计算预测结果与真实值的差距。
第二，优化导向，为梯度下降提供更新方向。
第三，任务适配，不同任务需要匹配专属损失函数。
生活化理解：就像驾校教练根据学员压线距离扣分，
损失函数就是那套评分标准，让学员学会不压线。""",
    
    "scene3": """损失函数主要分为三大类：
回归，适用连续可导数据，常用于房价预测。
分类，适用离散类别数据，常用于图像识别。
生成，适用生成新数据样本，常用于AI绘画。""",
    
    "scene4": """接下来看五大经典损失函数。
第一，均方误差MSE，用于回归任务，抗噪性弱。
第二，交叉熵，用于分类任务，抗噪性强。
第三，合页损失Hinge Loss，用于文本分类和支持向量机。""",
    
    "scene5": """第四，焦点损失Focal Loss，用于医学图像分析。
第五，Huber损失，用于自动驾驶，抗噪性强。""",
    
    "scene6": """如何选择损失函数？记住三条黄金准则：
分类任务优先交叉熵，样本不平衡时升级为Focal Loss。
回归任务首选MSE，需抗噪时切Huber。
生成任务需组合损失，比如GAN用对抗损失加L1像素损失。""",
    
    "scene7": """最后分享几个冷知识：
蜜蜂采蜜路径天然符合TSP最短路径损失，误差小于2%。
谷歌用量子退火算法优化损失函数，训练速度提升1000倍。
Contrastive Loss推动自监督学习崛起，无需人工标注。
AlphaGo Zero的损失函数包含赢棋概率预测和落子分布KL散度。""",
    
    "scene8": """关注我，每天5分钟，AI从入门到精通！"""
}

# 输出目录
OUTPUT_DIR = "public/LossFunctionVideo"
OUTPUT_DIR_SCENE8 = "public"  # scene8 在上级目录

# Qwen3-TTS模型实例
_qwen_model = None

def get_qwen_model():
    """获取或初始化Qwen3-TTS模型"""
    global _qwen_model
    if _qwen_model is None:
        try:
            print("🔧 加载Qwen3-TTS模型...")
            
            model_kwargs = {
                "pretrained_model_name_or_path": "./Qwen3-TTS-12Hz-1.7B-Base",
                "device_map": "auto",
                "torch_dtype": torch.bfloat16,
                "low_cpu_mem_usage": True,  # 减少CPU内存使用
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
        
        # 优化生成参数：更严格的参数控制，避免音频过长和语音乱码
        try:
            wavs, sr = model.generate_voice_clone(
                ref_audio="./borfy.mp3",
                ref_text="5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。",
                text=text,
                language="chinese",
                max_new_tokens=512,    # 减少token限制，避免过长音频
                do_sample=True,
                top_k=10,              # 更严格的采样，提高语音稳定性
                top_p=0.7,             # 更保守的采样策略
                temperature=0.3,       # 更低的温度，减少随机性，提高语音质量
                repetition_penalty=1.5,  # 更强的重复惩罚，避免语音重复
                subtalker_dosample=True,
                subtalker_top_k=10,
                subtalker_top_p=0.7,
                subtalker_temperature=0.3,
            )
            
            # 保存音频
            sf.write(output_path, wavs[0], sr)
            
            # 音频后处理：音量标准化和时长检查
            try:
                audio, sr_loaded = librosa.load(output_path, sr=None)
                
                # 检查音频时长，避免过长
                audio_duration = len(audio) / sr_loaded
                print(f"📊 音频时长: {audio_duration:.2f}秒")
                
                # 如果音频过长，进行裁剪（最大30秒）
                if audio_duration > 30:
                    print("⚠️  音频过长，进行裁剪...")
                    max_samples = int(30 * sr_loaded)
                    audio = audio[:max_samples]
                    print(f"✓ 裁剪后时长: {len(audio) / sr_loaded:.2f}秒")
                
                # 音量标准化到-3dB
                audio_normalized = librosa.util.normalize(audio) * 0.7
                
                # 添加轻微的低通滤波，提高语音清晰度
                audio_filtered = librosa.effects.preemphasis(audio_normalized, coef=0.97)
                
                sf.write(output_path, audio_filtered, sr_loaded)
                print(f"✓ 音频后处理完成: {output_path}")
                
                # 检查音频质量
                if audio_duration < 1.0:
                    print("⚠️  音频过短，可能生成失败")
                    continue
                    
            except Exception as e:
                print(f"⚠️  音频后处理失败，但原始音频已保存: {e}")
            
            print(f"✓ 生成音频: {output_path}")
            return True
            
        except Exception as e:
            print(f"❌ 第{attempt + 1}次生成失败: {e}")
            if attempt < max_retries - 1:
                print("🔄 等待2秒后重试...")
                import time
                time.sleep(2)
    
    return False


def generate_all_audios():
    """生成所有音频文件"""
    print("🎵 开始生成损失函数视频音频解说...")
    print("🤖 使用Qwen3-TTS模型生成高质量语音")
    print("🎯 优化参数：严格控制音频时长和语音质量")
    print("⚡ 新增功能：音频时长检查、语音稳定性优化、自动重试机制")
    
    # 确保输出目录存在
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(OUTPUT_DIR_SCENE8, exist_ok=True)
    
    print("=" * 60)
    print("损失函数视频音频生成工具")
    print("=" * 60)
    print(f"输出目录: {OUTPUT_DIR}")
    print("=" * 60)
    print()
    
    success_count = 0
    
    for scene_num, script_text in tqdm(SCRIPTS.items(), desc="生成音频"):
        if scene_num == "scene8":
            # scene8 在上级目录
            output_path = os.path.join(OUTPUT_DIR_SCENE8, "scene8-ending.mp3")
        else:
            output_path = os.path.join(OUTPUT_DIR, f"{scene_num}-audio.mp3")
        
        print(f"\n📝 处理场景: {scene_num}")
        print(f"   文本: {script_text}")
        
        # 检查文本长度，避免过长文本
        if len(script_text) > 200:
            print("⚠️  文本过长，可能影响音频质量")
        
        # 生成TTS音频
        if generate_tts_audio(script_text, output_path, scene_num):
            print(f"✅ 场景音频完成: {os.path.basename(output_path)}")
            success_count += 1
        else:
            print(f"❌ 场景音频生成失败: {scene_num}")
    
    print()
    print("=" * 60)
    print("✓ 所有音频文件生成完成！")
    print("=" * 60)
    print()
    print("生成的文件列表：")
    
    # 列出场景1-7的文件
    for i in range(1, 8):
        filename = f"scene{i}-audio.mp3"
        filepath = os.path.join(OUTPUT_DIR, filename)
        if os.path.exists(filepath):
            size = os.path.getsize(filepath) / 1024  # KB
            print(f"  ✓ {filename} ({size:.1f} KB)")
    
    # 列出scene8文件
    scene8_file = os.path.join(OUTPUT_DIR_SCENE8, "scene8-ending.mp3")
    if os.path.exists(scene8_file):
        size = os.path.getsize(scene8_file) / 1024  # KB
        print(f"  ✓ scene8-ending.mp3 ({size:.1f} KB)")
    
    print()
    print(f"📊 生成结果:")
    print(f"   成功: {success_count}/{len(SCRIPTS)}")
    print(f"   失败: {len(SCRIPTS) - success_count}")
    
    if success_count == len(SCRIPTS):
        print("🎉 所有音频生成完成！")
        print("📁 音频文件已保存到: public/LossFunctionVideo/")
        print("🎬 现在可以运行 'npm start' 预览视频效果")
    else:
        print("⚠️  部分音频生成失败，请检查错误信息")
    
    print()
    print("下一步操作：")
    print("1. 字幕文件已生成在 public/LossFunctionVideo/ 目录下")
    print("2. 根据实际音频时长调整字幕 JSON 文件中的时间戳")
    print("3. 运行 npm start 预览视频")
    print("4. 运行 npx remotion render LossFunctionVideo out/loss-function.mp4 渲染视频")
    
    return success_count == len(SCRIPTS)


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
    print("=" * 60)
    print("损失函数视频 - Qwen3-TTS音频生成工具")
    print("=" * 60)
    print("🤖 使用Qwen3-TTS模型生成高质量语音解说")
    print("🎯 使用语音克隆技术，语音风格一致")
    print("=" * 60)
    
    # 检查依赖
    if not check_dependencies():
        sys.exit(1)
    
    # 生成音频
    success = generate_all_audios()
    
    if success:
        print("\n🎯 使用说明:")
        print("1. 运行 'npm start' 预览视频效果")
        print("2. 运行 'npm run build' 渲染最终视频")
        print("3. 音频文件位置: public/LossFunctionVideo/")
        print("\n💡 技术特点:")
        print("   • 使用Qwen3-TTS 1.7B模型")
        print("   • 支持语音克隆，确保音色一致性")
        print("   • 根据文本内容自然生成音频时长")
        print("   • 自动音量标准化优化")
        print("   • 高质量中文语音合成")
        print("   • 使用本地模型，无需额外加速包")
    
    sys.exit(0 if success else 1)
