---
name: audio-duration-calculator
description: Calculate the duration of audio files (MP3, WAV, M4A, etc.) in seconds, frames, or formatted time. Use when you need to determine audio file length for video editing, subtitle timing, or frame calculation in video projects (especially Remotion videos). Supports conversion to frames at specified FPS rates.
---

# Audio Duration Calculator

## Overview

This skill provides a Python script to calculate audio file durations using the pydub library. It's particularly useful for video editing workflows where you need to synchronize audio with video frames, calculate subtitle timings, or determine the exact duration of audio segments.

## Quick Start

Use the `get_audio_duration.py` script to calculate audio duration:

```bash
# Basic usage - get duration in seconds
python scripts/get_audio_duration.py path/to/audio.mp3

# Get duration with frame count (30fps default)
python scripts/get_audio_duration.py path/to/audio.mp3 --frames

# Get duration with custom FPS
python scripts/get_audio_duration.py path/to/audio.mp3 --frames --fps 60

# Get formatted time (HH:MM:SS.mmm)
python scripts/get_audio_duration.py path/to/audio.mp3 --format

# Combine options
python scripts/get_audio_duration.py path/to/audio.mp3 --frames --fps 30 --format
```

## Output Examples

**Basic output:**

```
文件: audio.mp3
时长: 8.86 秒
```

**With frames (30fps):**

```
文件: audio.mp3
时长: 8.86 秒
帧数: 265 帧 (@ 30 fps)
建议缓冲帧数: 295 帧 (原始帧数 + 30帧缓冲)
```

**With formatted time:**

```
文件: audio.mp3
时长: 8.86 秒
格式化时长: 00:08.860
```

## Common Use Cases

### 1. Video Editing (Remotion)

When creating videos with Remotion, you need to calculate frame durations for each scene:

```typescript
// Calculate frames for a scene with audio
// If audio is 8.86 seconds at 30fps:
// 8.86 * 30 = 265 frames + 30 buffer = 295 frames
<TransitionSeries.Sequence durationInFrames={295}>
  <Scene1 />
  <Html5Audio src={staticFile("scene1-audio.mp3")} />
</TransitionSeries.Sequence>
```

Use the script to get exact frame counts:

```bash
python scripts/get_audio_duration.py public/scene1-audio.mp3 --frames --fps 30
```

### 2. Subtitle Timing

Calculate precise timing for subtitle synchronization:

```bash
python scripts/get_audio_duration.py narration.mp3 --format
# Output: 格式化时长: 01:23.456
```

### 3. Batch Processing

Process multiple audio files in a workflow:

```bash
for file in audio/*.mp3; do
    python scripts/get_audio_duration.py "$file" --frames
done
```

## Requirements

The script requires:

- Python 3.6+
- pydub library: `pip install pydub`
- ffmpeg or libav installed on the system

**Install ffmpeg:**

- macOS: `brew install ffmpeg`
- Ubuntu/Debian: `sudo apt-get install ffmpeg`
- Windows: Download from https://ffmpeg.org/

## Script Details

The `scripts/get_audio_duration.py` script provides:

- **get_audio_duration(file_path)**: Returns duration in seconds
- **seconds_to_frames(seconds, fps)**: Converts seconds to frame count
- **format_time(seconds)**: Formats seconds as HH:MM:SS.mmm

Supported audio formats: MP3, WAV, M4A, AAC, FLAC, OGG, and any format supported by ffmpeg.
