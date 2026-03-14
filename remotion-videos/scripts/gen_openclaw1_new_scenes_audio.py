#!/usr/bin/env python3
"""为 OpenClaw1Video 新增的三个图片场景生成音频"""
import subprocess
import sys
import os

# 音频输出目录
OUTPUT_DIR = "/Users/borfyqiu/Desktop/self/qiubohong.github.io/remotion-videos/public/OpenClaw1Video"

# 三个新场景的文案
SCENES = {
    "scene2b": "来看一下 OpenClaw 的完整工作流程图。整个流程非常清晰：你在聊天工具里发一条消息，OpenClaw 理解你的意图之后，调用对应的工具真实执行任务，最后把结果反馈给你。整个过程就像你有一个随时待命的数字助手，你说话，它干活。",
    "scene4b": "这是一个真实的邮件自动处理案例。龙虾会实时监听你的邮箱，收到新邮件后自动分析内容，判断需要做什么操作，然后自动回复、归档或者转发，最后把处理结果记录到飞书或者发消息通知你。全程无需人工干预，这就是真正的数字员工。",
    "scene5b": "这张图展示了 AI 的发展历程。从最早只能回答问题的工具 AI，到 ChatGPT 时代的对话 AI，再到能帮你写代码写文章的助手 AI，现在我们进入了智能体 AI 时代。OpenClaw 就是这个时代的代表，它不只是聊天，而是真正帮你把事情做完。",
}

def generate_audio(scene_key, text):
    output_path = os.path.join(OUTPUT_DIR, f"{scene_key}-audio.mp3")
    print(f"生成 {scene_key} 音频: {output_path}")
    
    script = f"""
import sys
sys.path.insert(0, '/Users/borfyqiu/Desktop/self/qiubohong.github.io/remotion-videos/scripts')
from gen_audio import generate_tts

generate_tts(
    text={repr(text)},
    output_path={repr(output_path)},
    reference_text="5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。"
)
"""
    result = subprocess.run([sys.executable, "-c", script], capture_output=True, text=True)
    if result.returncode != 0:
        print(f"ERROR: {result.stderr}")
        return False
    print(f"✅ {scene_key} 音频生成成功")
    return True

if __name__ == "__main__":
    for key, text in SCENES.items():
        generate_audio(key, text)
    print("\n所有新场景音频生成完毕！")
