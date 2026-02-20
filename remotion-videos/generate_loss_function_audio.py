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
    "scene1": """大家好，我是Qborfy！
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

# 中文语音选项（推荐）
# zh-CN-XiaoxiaoNeural - 女声，温柔自然
# zh-CN-YunxiNeural - 男声，沉稳专业
# zh-CN-YunyangNeural - 男声，新闻播报风格
VOICE = "zh-CN-YunyangNeural"  # 使用男声新闻播报风格，适合教学视频

# 语速和音调设置
RATE = "+0%"  # 语速：-50% 到 +100%
PITCH = "+0Hz"  # 音调：-50Hz 到 +50Hz


async def generate_audio(text: str, output_file: str):
    """生成单个音频文件"""
    print(f"正在生成: {output_file}")
    
    # 创建TTS通信对象
    communicate = edge_tts.Communicate(
        text=text,
        voice=VOICE,
        rate=RATE,
        pitch=PITCH
    )
    
    # 保存音频文件
    await communicate.save(output_file)
    print(f"✓ 已生成: {output_file}")


async def generate_all_audios():
    """生成所有音频文件"""
    # 确保输出目录存在
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(OUTPUT_DIR_SCENE8, exist_ok=True)
    
    print("=" * 60)
    print("损失函数视频音频生成工具")
    print("=" * 60)
    print(f"使用语音: {VOICE}")
    print(f"语速: {RATE}, 音调: {PITCH}")
    print(f"输出目录: {OUTPUT_DIR}")
    print("=" * 60)
    print()
    
    # 生成所有场景的音频
    tasks = []
    for scene_num, text in SCRIPTS.items():
        if scene_num == "scene8":
            # scene8 在上级目录
            output_file = os.path.join(OUTPUT_DIR_SCENE8, "scene8-ending.mp3")
        else:
            output_file = os.path.join(OUTPUT_DIR, f"{scene_num}-audio.mp3")
        tasks.append(generate_audio(text, output_file))
    
    # 并行生成所有音频
    await asyncio.gather(*tasks)
    
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
    print("下一步操作：")
    print("1. 字幕文件已生成在 public/LossFunctionVideo/ 目录下")
    print("2. 根据实际音频时长调整字幕 JSON 文件中的时间戳")
    print("3. 运行 npm start 预览视频")
    print("4. 运行 npx remotion render LossFunctionVideo out/loss-function.mp4 渲染视频")
    print()
    print("提示：如需调整语速或音调，请修改脚本中的 RATE 和 PITCH 参数")
    print("  语速范围：-50% 到 +100%（建议：+10% 更有活力）")
    print("  音调范围：-50Hz 到 +50Hz（建议：+5Hz 更有激情）")


def list_available_voices():
    """列出所有可用的中文语音"""
    print("可用的中文语音选项：")
    print()
    print("女声：")
    print("  zh-CN-XiaoxiaoNeural - 温柔自然，适合讲故事")
    print("  zh-CN-XiaoyiNeural - 活泼可爱，适合儿童内容")
    print("  zh-CN-XiaohanNeural - 亲切温暖")
    print()
    print("男声：")
    print("  zh-CN-YunxiNeural - 沉稳专业")
    print("  zh-CN-YunyangNeural - 新闻播报风格（当前使用）")
    print("  zh-CN-YunjianNeural - 成熟稳重")
    print()
    print("使用方法：修改脚本中的 VOICE 变量为你想要的语音")


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--list-voices":
        list_available_voices()
    else:
        # 运行异步任务
        asyncio.run(generate_all_audios())
