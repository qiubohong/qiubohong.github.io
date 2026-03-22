import React from "react";
import {
  AbsoluteFill,
  staticFile,
  Audio,
} from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { CaptionComponent } from "./components/CaptionComponent";
import { EndingScene } from "./components/EndingScene";
import { Scene1_Opening } from "./scenes/aiagent/Scene1_Opening";
import { Scene2_Features } from "./scenes/aiagent/Scene2_Features";
import { Scene3_Architecture } from "./scenes/aiagent/Scene3_Architecture";
import { Scene4_Value } from "./scenes/aiagent/Scene4_Value";
import { Scene5_Workflow } from "./scenes/aiagent/Scene5_Workflow";
import { Scene6_Applications } from "./scenes/aiagent/Scene6_Applications";
import { Scene7_Trends } from "./scenes/aiagent/Scene7_Trends";
import { Scene8_Summary } from "./scenes/aiagent/Scene8_Summary";

export const AIAgentVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0d1117" }}>
      <TransitionSeries>
        {/* Scene 1: 开场 - 核心转变 */}
        <TransitionSeries.Sequence durationInFrames={854}> {/* 27.44s × 30 + 30 = 854帧 */}
          <Scene1_Opening />
          <Audio
            src={staticFile("AIAgentVideo/scene1-audio.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="AIAgentVideo/scene1-audio.mp3"
            captionFile="AIAgentVideo/scene1-captions.json"
            startTimeMs={0}
          />
        </TransitionSeries.Sequence>

        {/* Scene 2: 核心特征 */}
        <TransitionSeries.Sequence durationInFrames={844}> {/* 27.12s × 30 + 30 = 844帧 */}
          <Scene2_Features />
          <Audio
            src={staticFile("AIAgentVideo/scene2-audio.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="AIAgentVideo/scene2-audio.mp3"
            captionFile="AIAgentVideo/scene2-captions.json"
            startTimeMs={0}
          />
        </TransitionSeries.Sequence>

        {/* Scene 3: 架构组成 */}
        <TransitionSeries.Sequence durationInFrames={1058}> {/* 34.24s × 30 + 30 = 1058帧 */}
          <Scene3_Architecture />
          <Audio
            src={staticFile("AIAgentVideo/scene3-audio.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="AIAgentVideo/scene3-audio.mp3"
            captionFile="AIAgentVideo/scene3-captions.json"
            startTimeMs={0}
          />
        </TransitionSeries.Sequence>

        {/* Scene 4: 核心价值 */}
        <TransitionSeries.Sequence durationInFrames={789}> {/* 25.28s × 30 + 30 = 789帧 */}
          <Scene4_Value />
          <Audio
            src={staticFile("AIAgentVideo/scene4-audio.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="AIAgentVideo/scene4-audio.mp3"
            captionFile="AIAgentVideo/scene4-captions.json"
            startTimeMs={0}
          />
        </TransitionSeries.Sequence>

        {/* Scene 5: 工作原理 */}
        <TransitionSeries.Sequence durationInFrames={1242}> {/* 40.40s × 30 + 30 = 1242帧 */}
          <Scene5_Workflow />
          <Audio
            src={staticFile("AIAgentVideo/scene5-audio.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="AIAgentVideo/scene5-audio.mp3"
            captionFile="AIAgentVideo/scene5-captions.json"
            startTimeMs={0}
          />
        </TransitionSeries.Sequence>

        {/* Scene 6: 应用场景 */}
        <TransitionSeries.Sequence durationInFrames={1067}> {/* 34.56s × 30 + 30 = 1067帧 */}
          <Scene6_Applications />
          <Audio
            src={staticFile("AIAgentVideo/scene6-audio.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="AIAgentVideo/scene6-audio.mp3"
            captionFile="AIAgentVideo/scene6-captions.json"
            startTimeMs={0}
          />
        </TransitionSeries.Sequence>

        {/* Scene 7: 发展趋势 */}
        <TransitionSeries.Sequence durationInFrames={1254}> {/* 40.80s × 30 + 30 = 1254帧 */}
          <Scene7_Trends />
          <Audio
            src={staticFile("AIAgentVideo/scene7-audio.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="AIAgentVideo/scene7-audio.mp3"
            captionFile="AIAgentVideo/scene7-captions.json"
            startTimeMs={0}
          />
        </TransitionSeries.Sequence>

        {/* Scene 8: 总结 */}
        <TransitionSeries.Sequence durationInFrames={1091}> {/* 35.36s × 30 + 30 = 1091帧 */}
          <Scene8_Summary />
          <Audio
            src={staticFile("AIAgentVideo/scene8-audio.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="AIAgentVideo/scene8-audio.mp3"
            captionFile="AIAgentVideo/scene8-captions.json"
            startTimeMs={0}
          />
        </TransitionSeries.Sequence>

        {/* EndingScene */}
        <TransitionSeries.Sequence durationInFrames={126}> {/* 3.20s × 30 + 30 = 126帧 */}
          <EndingScene />
          <Audio
            src={staticFile("AIAgentVideo/ending-audio.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="AIAgentVideo/ending-audio.mp3"
            captionFile="AIAgentVideo/ending-captions.json"
            startTimeMs={0}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
