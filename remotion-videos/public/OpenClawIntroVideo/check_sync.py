import librosa, os, json

audio_dir = '/Users/borfyqiu/Desktop/study/self/qiubohong.github.io/remotion-videos/public/OpenClawIntroVideo'

scenes = ['scene1', 'scene2', 'scene3', 'scene4', 'scene5', 'scene6', 'ending']

for scene in scenes:
    audio_path = f'{audio_dir}/{scene}-audio.mp3'
    caption_path = f'{audio_dir}/{scene}-captions.json'

    if not os.path.exists(audio_path):
        print(f'{scene}: 音频文件不存在')
        continue

    audio, sr = librosa.load(audio_path, sr=None)
    audio_duration_ms = int(len(audio) / sr * 1000)

    with open(caption_path) as f:
        captions = json.load(f)

    last_caption_end_ms = captions[-1]['endMs'] if captions else 0

    print(f'{scene}: 音频={audio_duration_ms}ms({audio_duration_ms/1000:.2f}s) 字幕末尾={last_caption_end_ms}ms 差值={audio_duration_ms - last_caption_end_ms}ms')
