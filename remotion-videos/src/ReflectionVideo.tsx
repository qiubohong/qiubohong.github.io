import React from "react";
import { Series, TransitionSeries } from "@remotion/transitions";
import { linear } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { Scene1_Hook } from "./scenes/reflection/Scene1_Hook";
import { Scene2_Flow } from "./scenes/reflection/Scene2_Flow";
import { Scene3_Implementation } from "./scenes/reflection/Scene3_Implementation";
import { Scene4_Case } from "./scenes/reflection/Scene4_Case";
import { Scene5_Tips } from "./scenes/reflection/Scene5_Tips";
import { EndingScene } from "./components/EndingScene";

// 场景帧数定义（基于字幕时长计算，30fps）
// Scene1: 8.5s × 30 = 255帧 + 30缓冲 = 285帧
// Scene2: 10.5s × 30 = 315帧 + 30缓冲 = 345帧
// Scene3: 11s × 30 = 330帧 + 30缓冲 = 360帧
// Scene4: 11.5s × 30 = 345帧 + 30缓冲 = 375帧
// Scene5: 20s × 30 = 600帧 + 30缓冲 = 630帧
// Ending: 6s × 30 = 180帧（固定）
export const REFLECTION_SCENES = {
  scene1: { duration: 285 },
  scene2: { duration: 345 },
  scene3: { duration: 360 },
  scene4: { duration: 375 },
  scene5: { duration: 630 },
  ending: { duration: 180 },
};

// 总时长（包含转场）
// 5个转场 × 30帧 = 150帧
export const REFLECTION_TOTAL_DURATION = 
  REFLECTION_SCENES.scene1.duration +
  REFLECTION_SCENES.scene2.duration +
  REFLECTION_SCENES.scene3.duration +
  REFLECTION_SCENES.scene4.duration +
  REFLECTION_SCENES.scene5.duration +
  REFLECTION_SCENES.ending.duration +
  150; // 转场合计

export const ReflectionVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Hook引入 (8.5s) */}
        <TransitionSeries.Sequence
          durationInFrames={REFLECTION_SCENES.scene1.duration}
          layout="none"
        >
          <Scene1_Hook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={linear}
          durationInFrames={30}
        />

        {/* Scene 2: 流程图 (10.5s) */}
        <TransitionSeries.Sequence
          durationInFrames={REFLECTION_SCENES.scene2.duration}
          layout="none"
        >
          <Scene2_Flow />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={linear}
          durationInFrames={30}
        />

        {/* Scene 3: 基础实现 (11s) */}
        <TransitionSeries.Sequence
          durationInFrames={REFLECTION_SCENES.scene3.duration}
          layout="none"
        >
          <Scene3_Implementation />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={linear}
          durationInFrames={30}
        />

        {/* Scene 4: 实战案例 (11.5s) */}
        <TransitionSeries.Sequence
          durationInFrames={REFLECTION_SCENES.scene4.duration}
          layout="none"
        >
          <Scene4_Case />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={linear}
          durationInFrames={30}
        />

        {/* Scene 5: 冷知识 (20s) */}
        <TransitionSeries.Sequence
          durationInFrames={REFLECTION_SCENES.scene5.duration}
          layout="none"
        >
          <Scene5_Tips />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={linear}
          durationInFrames={30}
        />

        {/* Ending 结尾 (6s) */}
        <TransitionSeries.Sequence
          durationInFrames={REFLECTION_SCENES.ending.duration}
          layout="none"
          name="EndingScene"
        >
          <EndingScene
            title="你觉得 Reflection 模式会让 AI 变得更靠谱吗？"
            subtitle="评论区聊聊！"
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
