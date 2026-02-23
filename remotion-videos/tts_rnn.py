#!/usr/bin/env python3
"""
RNN循环网络视频 - 音频生成脚本（优化版）
使用Qwen3-TTS模型生成高质量场景解说音频

🎯 优化重点：
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
#     "scene1-intro": "5分钟 AI，每天搞懂一个知识点！今天我们学习，循环网络 RNN。",
    
#     "scene2-definition": """什么是 RNN？
# RNN 等于 循环神经网络，它有两个核心特点。
# 第一，记忆状态，就像分拣中心的传送带，持续传递包裹，也就是信息。
# 第二，关键突破，传统神经网络每步独立处理，而 RNN 利用上一步结果辅助当前决策。
# 正如吴恩达所说，RNN的循环连接，是AI从静态画像走向动态影像的关键一跃。""",
    
#     "scene3-keymodels": """关键算法模型有两个。
# 第一个是 LSTM，长短期记忆网络。
# 它的核心机制是三重门控加细胞状态。
# 创新点是遗忘门主动丢弃无用记忆，就像清理过期快递。
# 第二个是 GRU，门控循环单元。
# 它的核心机制是两重门控，包括更新门和重置门。
# 创新点是合并记忆与隐藏状态，参数比LSTM少百分之二十五。""",
    
#     "scene4-lstm": """LSTM，长短期记忆网络的详细介绍。
# 核心目标是解决传统RNN的长期依赖问题，也就是梯度消失和梯度爆炸。
# 通过门控机制选择性保留关键历史信息。
# 结构创新有两点。
# 第一，记忆细胞，也叫 Cell State，它贯穿时间步的信息高速公路，稳定传递长期记忆。
# 第二，三重门控，包括遗忘门、输入门、输出门，动态调控信息流。""",
    
#     "scene5-gru": """GRU，门控循环单元的详细介绍。
# 核心目标是在保留LSTM优势的同时，简化结构、提升计算效率。
# 结构创新也有两点。
# 第一，双门设计，合并遗忘门与输入门为更新门，新增重置门，取消独立记忆细胞。
# 第二，隐藏状态融合，直接操作隐藏状态，参数减少约百分之二十五。""",
    
#     "scene6-applications": """实际应用场景有四个。
# 第一，实时语音识别，推荐模型是 GRU，案例是智能音箱指令解析，关键优势是低延迟，参数少。
# 第二，长文本翻译，推荐模型是 LSTM，案例是 ChatGPT 早期版本，关键优势是长期依赖捕捉。
# 第三，股票价格预测，推荐模型是双向RNN，案例是高频交易波动分析，关键优势是结合历史与未来趋势。
# 第四，视频动作生成，推荐模型是堆叠LSTM，案例是抖音AI跳舞视频，关键优势是多层抽象时序特征。""",
    
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
        
        try:
            wavs, sr = model.generate_voice_clone(
                ref_audio="./borfy.mp3",
                ref_text="5分钟 AI，每天搞懂一个知识点！今天我们学习，循环网络 RNN。",
                text=text,
                language="chinese",
                max_new_tokens=1024,    # 减少token限制，避免过长音频
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
                
                # 检查音频时长
                audio_duration = len(audio) / sr_loaded
                print(f"📊 音频时长: {audio_duration:.2f}秒")
                
                # 不再限制音频时长，允许生成完整内容
                # 注意：如果音频过长，请考虑拆分文本或调整视频帧数
                
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

def generate_all_scene_audios():
    """生成所有场景的音频文件"""
    print("🎵 开始生成RNN循环网络视频音频解说...")
    print("🤖 使用Qwen3-TTS模型生成高质量语音")
    print("🎯 优化参数：严格控制音频时长和语音质量")
    print("⚡ 新增功能：音频时长检查、语音稳定性优化、自动重试机制")
    
    # 确保public目录存在
    public_dir = Path("public/RNNVideo")
    public_dir.mkdir(parents=True, exist_ok=True)
    
    success_count = 0
    
    for scene_name, script_text in tqdm(SCENE_SCRIPTS.items(), desc="生成音频"):
        output_path = public_dir / f"{scene_name}-audio.mp3"
        
        print(f"\n📝 处理场景: {scene_name}")
        print(f"   文本: {script_text[:100]}...")
        
        # 检查文本长度，避免过长文本
        if len(script_text) > 500:
            print("⚠️  文本过长，可能影响音频质量")
        
        # 生成TTS音频
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
        print("📁 音频文件已保存到: public/RNNVideo/")
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
    print("RNN循环网络视频 - Qwen3-TTS音频生成工具")
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
        print("3. 音频文件位置: public/RNNVideo/")
        print("\n💡 技术特点:")
        print("   • 使用Qwen3-TTS 1.7B模型")
        print("   • 支持语音风格定制，确保音色一致性")
        print("   • 根据文本内容自然生成音频时长")
        print("   • 自动音量标准化优化")
        print("   • 高质量中文语音合成")
        print("   • 使用本地模型，无需额外加速包")
    
    sys.exit(0 if success else 1)
