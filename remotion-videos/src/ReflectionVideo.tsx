import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Scene1_Hook } from "./scenes/reflection/Scene1_Hook";
import { Scene2_Flow } from "./scenes/reflection/Scene2_Flow";
import { Scene3_Implementation } from "./scenes/reflection/Scene3_Implementation";
import { Scene4_Case } from "./scenes/reflection/Scene4_Case";
import { Scene5_Tips } from "./scenes/reflection/Scene5_Tips";
import { EndingScene } from "./components/EndingScene";
import { CaptionComponent } from "./components/CaptionComponent";

// 场景帧数定义（基于实际音频时长计算，30fps）
// Scene1: 12.40s × 30 = 372帧 + 30缓冲 = 402帧
// Scene2: 12.88s × 30 = 386帧 + 30缓冲 = 416帧
// Scene3: 10.80s × 30 = 324帧 + 30缓冲 = 354帧
// Scene4: 12.88s × 30 = 386帧 + 30缓冲 = 416帧
// Scene5: 21.92s × 30 = 657帧 + 30缓冲 = 687帧
// Ending: 7.76s × 30 = 232帧 + 30缓冲 = 262帧
export const REFLECTION_SCENES = {
  scene1: { duration: 402 },
  scene2: { duration: 416 },
  scene3: { duration: 354 },
  scene4: { duration: 416 },
  scene5: { duration: 687 },
  ending: { duration: 262 },
};

// 各场景起始帧（顺序排列，无重叠）
const s1 = 0;
const s2 = s1 + REFLECTION_SCENES.scene1.duration;
const s3 = s2 + REFLECTION_SCENES.scene2.duration;
const s4 = s3 + REFLECTION_SCENES.scene3.duration;
const s5 = s4 + REFLECTION_SCENES.scene4.duration;
const sEnding = s5 + REFLECTION_SCENES.scene5.duration;

// 总时长（无转场重叠）
export const REFLECTION_TOTAL_DURATION =
  REFLECTION_SCENES.scene1.duration +
  REFLECTION_SCENES.scene2.duration +
  REFLECTION_SCENES.scene3.duration +
  REFLECTION_SCENES.scene4.duration +
  REFLECTION_SCENES.scene5.duration +
  REFLECTION_SCENES.ending.duration;

export const ReflectionVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 1: Hook引入 (12.40s) */}
      <Sequence from={s1} durationInFrames={REFLECTION_SCENES.scene1.duration}>
        <AbsoluteFill>
          <Scene1_Hook />
          <Audio
            src={staticFile("Reflection/scene1-audio.mp3")}
            volume={0.9}
          />
          <CaptionComponent
            audioFile="Reflection/scene1-audio.mp3"
            captionFile="Reflection/scene1-captions.json"
            startTimeMs={0}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: 流程图 (12.88s) */}
      <Sequence from={s2} durationInFrames={REFLECTION_SCENES.scene2.duration}>
        <AbsoluteFill>
          <Scene2_Flow />
          <Audio
            src={staticFile("Reflection/scene2-audio.mp3")}
            volume={0.9}
          />
          <CaptionComponent
            audioFile="Reflection/scene2-audio.mp3"
            captionFile="Reflection/scene2-captions.json"
            startTimeMs={0}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: 基础实现 (10.80s) */}
      <Sequence from={s3} durationInFrames={REFLECTION_SCENES.scene3.duration}>
        <AbsoluteFill>
          <Scene3_Implementation />
          <Audio
            src={staticFile("Reflection/scene3-audio.mp3")}
            volume={0.9}
          />
          <CaptionComponent
            audioFile="Reflection/scene3-audio.mp3"
            captionFile="Reflection/scene3-captions.json"
            startTimeMs={0}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: 实战案例 (12.88s) */}
      <Sequence from={s4} durationInFrames={REFLECTION_SCENES.scene4.duration}>
        <AbsoluteFill>
          <Scene4_Case />
          <Audio
            src={staticFile("Reflection/scene4-audio.mp3")}
            volume={0.9}
          />
          <CaptionComponent
            audioFile="Reflection/scene4-audio.mp3"
            captionFile="Reflection/scene4-captions.json"
            startTimeMs={0}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: 冷知识 (21.92s) */}
      <Sequence from={s5} durationInFrames={REFLECTION_SCENES.scene5.duration}>
        <AbsoluteFill>
          <Scene5_Tips />
          <Audio
            src={staticFile("Reflection/scene5-audio.mp3")}
            volume={0.9}
          />
          <CaptionComponent
            audioFile="Reflection/scene5-audio.mp3"
            captionFile="Reflection/scene5-captions.json"
            startTimeMs={0}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Ending 结尾 (7.76s) */}
      <Sequence from={sEnding} durationInFrames={REFLECTION_SCENES.ending.duration}>
        <AbsoluteFill>
          <EndingScene
            title="你觉得 Reflection 模式会让 AI 变得更靠谱吗？"
            subtitle="评论区聊聊！"
          />
          <Audio
            src={staticFile("Reflection/ending-audio.mp3")}
            volume={0.9}
          />
          <CaptionComponent
            audioFile="Reflection/ending-audio.mp3"
            captionFile="Reflection/ending-captions.json"
            startTimeMs={0}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
