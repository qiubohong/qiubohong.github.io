#!/usr/bin/env python3
"""
激活函数视频音频生成脚本
使用 edge-tts (Microsoft Edge TTS) 生成音频文件
完全免费，支持中文，音质优秀
"""

import asyncio
import edge_tts
import os

# 音频脚本内容
SCRIPTS = {
    "scene1": """今天我们来学习激活函数。
激活函数，简单理解就是神经网络的"智能开关"。它在神经元上运行，负责将输入映射到输出端。
就像大脑神经元超过阈值才放电一样，激活函数决定信号是否向下传递。""",
    
    "scene2": """那么，激活函数到底是什么呢？
根据百科定义，激活函数就是在人工神经网络的神经元上运行的函数，负责将神经元的输入映射到输出端。
它有三大核心功能：
第一，引入非线性，使网络能够拟合任意复杂函数。否则，多层网络就等同于单层线性模型。
第二，特征过滤，抑制噪声信号，保留有效特征。比如ReLU会过滤负值。
第三，梯度调控，控制反向传播时的参数更新强度，防止梯度消失或爆炸。""",
    
    "scene3": """目前有5个经典主流激活函数：
第一个是Sigmoid，也叫逻辑函数。公式是f(x)等于1除以1加e的负x次方。输出范围是0到1，适用于二分类输出层，比如信用风险预测。但存在梯度消失和梯度爆炸问题。
第二个是Tanh，双曲正切函数。输出范围是负1到1，常用于RNN和LSTM的隐藏层，用于时序数据建模。但梯度消失问题仍然存在。
第三个是ReLU，修正线性单元。公式是f(x)等于x和0的最大值。输出范围是0到正无穷。这是90%现代网络的首选，用于CNN和Transformer的隐藏层。它解决了梯度消失问题，但存在Dead ReLU问题，也就是负输入会永久失活。
第四个是Leaky ReLU，带泄露的修正线性单元。它解决了Dead ReLU问题，在负数区保留微小梯度。
第五个是Swish，自门控函数。这是Google Brain提出的，参数β可学习，超越了ReLU的基准精度，主要用于移动端高效模型，比如MobileNetV3。""",
    
    "scene4": """让我们来看看这5个函数的性能对比。
从梯度消失角度看，Sigmoid和Tanh问题严重，而ReLU、Leaky ReLU和Swish都没有这个问题。
从计算效率看，ReLU最高，达到5星，Leaky ReLU是4星，Swish是3星。
从输出中心化看，只有Tanh做到了。
从SOTA精度看，Swish最高达到95%，Leaky ReLU是92%，ReLU是90%。
总的来说，Swish在精度上表现最佳，ReLU在效率上最优。""",
    
    "scene5": """接下来是动手实验环节。
我们可以用Python来可视化这些激活函数的效果。代码很简单，导入numpy和matplotlib，定义x的范围，然后创建一个字典包含各个激活函数，最后用matplotlib画出它们的曲线。
观察重点有两个：
第一，Sigmoid和Tanh的饱和区，也就是两端平坦的部分，这是梯度消失的根源。
第二，ReLU的负数截断，这可以直观地看到Dead ReLU问题。""",
    
    "scene6": """最后分享几个有趣的冷知识。
第一个，神经元激活率实验。Sigmoid网络仅有3%到5%的神经元激活，效率低下。而ReLU网络激活率可达50%，资源利用更高效。
第二个，生物化学启发。Swish函数的平滑性灵感源于神经突触的离子通道动力学。
第三个，谷歌的自动搜索。他们用强化学习在10万种函数中发现了Swish函数，超越了人类设计。
第四个，宇宙学级应用。欧洲核子研究中心CERN用GELU函数，也就是高斯误差线性单元，处理粒子碰撞数据，误差降低了38%。"""
}

# 输出目录
OUTPUT_DIR = "public/ActivationVideo"

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
    
    print("=" * 60)
    print("激活函数视频音频生成工具")
    print("=" * 60)
    print(f"使用语音: {VOICE}")
    print(f"语速: {RATE}, 音调: {PITCH}")
    print(f"输出目录: {OUTPUT_DIR}")
    print("=" * 60)
    print()
    
    # 生成所有场景的音频
    tasks = []
    for scene_num, text in SCRIPTS.items():
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
    for i in range(1, 7):
        filename = f"scene{i}-audio.mp3"
        filepath = os.path.join(OUTPUT_DIR, filename)
        if os.path.exists(filepath):
            size = os.path.getsize(filepath) / 1024  # KB
            print(f"  ✓ {filename} ({size:.1f} KB)")
    
    print()
    print("下一步操作：")
    print("1. 使用以下命令生成字幕文件：")
    print()
    for i in range(1, 7):
        print(f"   npx remotion transcribe ActivationVideo/scene{i}-audio.mp3 ActivationVideo/scene{i}-captions.json")
    print()
    print("2. 根据实际音频时长调整 ActivationFunctionVideo.tsx 中的 durationInFrames")
    print("3. 运行 npm start 预览视频")
    print("4. 运行 npx remotion render ActivationFunctionVideo out/activation-function.mp4 渲染视频")


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


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--list-voices":
        list_available_voices()
    else:
        # 运行异步任务
        asyncio.run(generate_all_audios())
