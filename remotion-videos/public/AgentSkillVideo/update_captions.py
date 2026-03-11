import json

base = '/Users/borfyqiu/Desktop/study/self/qiubohong.github.io/remotion-videos/public/AgentSkillVideo'

audio_durations = {
    'scene1': 34760,
    'scene2': 34920,
    'scene3': 34171,
    'scene4': 35131,
    'scene5': 30013,
    'scene6': 44089,
    'ending': 2872,
}

for scene, total_ms in audio_durations.items():
    caption_file = f'{base}/{scene}-captions.json'
    with open(caption_file, 'r', encoding='utf-8') as f:
        captions = json.load(f)
    n = len(captions)
    interval = total_ms / n
    for i, cap in enumerate(captions):
        start = int(i * interval)
        end = int((i + 1) * interval)
        cap['startMs'] = start
        cap['endMs'] = end
        cap['timestampMs'] = start
    with open(caption_file, 'w', encoding='utf-8') as f:
        json.dump(captions, f, ensure_ascii=False, indent=2)
    print(f'{scene}: {n} captions, total {total_ms}ms, ~{int(interval)}ms each')

print('Done!')
