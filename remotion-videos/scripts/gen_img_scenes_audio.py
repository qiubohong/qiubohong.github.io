#!/usr/bin/env python3
"""为 OpenClaw1Video 新增的三个图片场景生成音频（直接调用TTS）"""
import os
import sys
import torch
import soundfile as sf
import librosa

OUTPUT_DIR = "/Users/borfyqiu/Desktop/self/qiubohong.github.io/remotion-videos/public/OpenClaw1Video"
REF_AUDIO = "/Users/borfyqiu/Desktop/self/qiubohong.github.io/remotion-videos/borfy.mp3"
REF_TEXT = "5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。"
MODEL_PATH = "/Users/borfyqiu/Desktop/self/qiubohong.github.io/remotion-videos/Qwen3-TTS-12Hz-1.7B-Base"

SCENES = {
    "scene2b": "来看一下 OpenClaw 的完整工作流程图。整个流程非常清晰：你在聊天工具里发一条消息，OpenClaw 理解你的意图之后，调用对应的工具真实执行任务，最后把结果反馈给你。整个过程就像你有一个随时待命的数字助手，你说话，它干活。",
    "scene4b": "这是一个真实的邮件自动处理案例。龙虾会实时监听你的邮箱，收到新邮件后自动分析内容，判断需要做什么操作，然后自动回复、归档或者转发，最后把处理结果记录到飞书或者发消息通知你。全程无需人工干预，这就是真正的数字员工。",
    "scene5b": "这张图展示了 AI 的发展历程。从最早只能回答问题的工具 AI，到 ChatGPT 时代的对话 AI，再到能帮你写代码写文章的助手 AI，现在我们进入了智能体 AI 时代。OpenClaw 就是这个时代的代表，它不只是聊天，而是真正帮你把事情做完。",
}

def load_model():
    from qwen_tts import Qwen3TTSModel
    print("🔧 加载Qwen3-TTS模型...")
    model = Qwen3TTSModel.from_pretrained(
        pretrained_model_name_or_path=MODEL_PATH,
        device_map="auto",
        dtype=torch.bfloat16,
        low_cpu_mem_usage=True,
    )
    print("✅ 模型加载完成")
    return model

def generate_scene_audio(model, scene_key, text):
    output_path = os.path.join(OUTPUT_DIR, f"{scene_key}-audio.mp3")
    print(f"\n🎙️ 生成 {scene_key} 音频...")
    print(f"   文案: {text[:50]}...")
    
    max_retries = 3
    for attempt in range(max_retries):
        try:
            print(f"🔄 尝试生成语音 (第{attempt + 1}次)...")
            wavs, sr = model.generate_voice_clone(
                ref_audio=REF_AUDIO,
                ref_text=REF_TEXT,
                text=text,
                language="chinese",
                max_new_tokens=1024,
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
            
            # 音频后处理
            try:
                audio, sr_loaded = librosa.load(output_path, sr=None)
                audio_duration = len(audio) / sr_loaded
                print(f"📊 音频时长: {audio_duration:.2f}秒")
                
                audio_normalized = librosa.util.normalize(audio) * 0.7
                audio_filtered = librosa.effects.preemphasis(audio_normalized, coef=0.97)
                sf.write(output_path, audio_filtered, sr_loaded)
                print(f"✅ {scene_key} 音频生成成功: {output_path}")
                
                if audio_duration < 1.0:
                    print("⚠️  音频过短，重试...")
                    continue
                break
            except Exception as e:
                print(f"⚠️  后处理失败，原始音频已保存: {e}")
                break
                
        except Exception as e:
            print(f"❌ 第{attempt+1}次失败: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    model = load_model()
    for scene_key, text in SCENES.items():
        generate_scene_audio(model, scene_key, text)
    print("\n🎉 所有新场景音频生成完毕！")
