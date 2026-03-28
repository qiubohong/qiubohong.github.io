#!/usr/bin/env python3
"""
Reflection 视频音频生成脚本
使用 Volcano Engine TTS API
"""

import requests
import os
import base64

# API配置
API_KEY = "Mcp2YQ6R5aHf8vHfYkXv9V3B"
APP_KEY = "1100093724"
SERVICE_URL = "https://openspeech.bytedance.com/api/v1/tts"

# 音频文案（已去除AI味道）
AUDIO_SCRIPTS = {
    "scene1": "之前我们学了 ReAct，让 AI 边想边做。今天学另一个神奇模式：Reflection！让 AI 学会自我检讨，做完任务回头看看哪里可以改进。",
    
    "scene2": "Reflection 的核心流程就三步：生成、反思、优化。就像写代码：写完跑一下，发现报错，回头改改再跑。看图，这是完整的工作循环。",
    
    "scene3": "最简单的实现就是两次调用模型。第一次生成答案，第二次让它反思，第三次根据反思优化。核心就是一个循环：生成、反思、优化。",
    
    "scene4": "来看实战案例：用 Reflection 模式让 AI 写代码。先生成一版，然后自我审查找出问题，最后重写优化。看，AI 正在给自己的代码做 code review！",
    
    "scene5": "分享几个冷知识。第一，Reflection 和 ReAct 是绝配，一个负责过程中思考，一个负责结果复盘。第二，理论基础来自 2023 年 Self-Refine 论文。第三，LangChain 有现成实现。第四，简单任务不必反思，复杂任务才值得。第五，反思也可以外包给另一个 AI。",
    
    "ending": "5分钟AI，每天搞懂一个知识点！你觉得 Reflection 模式会让 AI 变得更加靠谱吗？评论区聊聊！"
}

def generate_audio(text: str, output_path: str):
    """使用 Volcano Engine TTS API 生成音频"""
    
    headers = {
        "Authorization": f"Bearer;{API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "app": {
            "appid": APP_KEY,
            "token": "access_token",
            "cluster": "volcano_tts"
        },
        "user": {
            "uid": "388808087185088"
        },
        "audio": {
            "voice_type": "BV001_streaming",
            "encoding": "mp3",
            "speed_ratio": 1.0,
            "volume_ratio": 1.0,
            "pitch_ratio": 1.0
        },
        "request": {
            "reqid": str(hash(text)),
            "text": text,
            "text_type": "plain",
            "operation": "query",
            "with_frontend": 1,
            "frontendtype": "unitTson"
        }
    }
    
    try:
        response = requests.post(SERVICE_URL, json=payload, headers=headers)
        response.raise_for_status()
        
        result = response.json()
        
        if result.get("data"):
            audio_data = base64.b64decode(result["data"])
            with open(output_path, "wb") as f:
                f.write(audio_data)
            print(f"✓ 已生成: {output_path}")
            return True
        else:
            print(f"✗ 生成失败: {output_path}")
            print(f"  错误: {result.get('message', '未知错误')}")
            return False
            
    except Exception as e:
        print(f"✗ 生成失败: {output_path}")
        print(f"  错误: {str(e)}")
        return False

def main():
    """主函数"""
    output_dir = os.path.dirname(os.path.abspath(__file__))
    
    print("=" * 50)
    print("Reflection 视频音频生成")
    print("=" * 50)
    
    success_count = 0
    
    for scene, text in AUDIO_SCRIPTS.items():
        output_path = os.path.join(output_dir, f"{scene}-audio.mp3")
        if generate_audio(text, output_path):
            success_count += 1
    
    print("=" * 50)
    print(f"生成完成: {success_count}/{len(AUDIO_SCRIPTS)}")
    print("=" * 50)

if __name__ == "__main__":
    main()
