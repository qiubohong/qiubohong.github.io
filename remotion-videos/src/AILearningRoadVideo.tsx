import React from "react";
import { Html5Audio, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { Scene1_Introduction } from "./scenes/ailroad/Scene1_Introduction";
import { Scene2_Prerequisites } from "./scenes/ailroad/Scene2_Prerequisites";
import { Scene3_Beginner } from "./scenes/ailroad/Scene3_Beginner";
import { Scene4_Intermediate } from "./scenes/ailroad/Scene4_Intermediate";
import { Scene5_Advanced } from "./scenes/ailroad/Scene5_Advanced";
import { Scene6_Career } from "./scenes/ailroad/Scene6_Career";
import { Scene7_Summary } from "./scenes/ailroad/Scene7_Summary";
import { EndingScene } from "./components/EndingScene";
import { CaptionComponent } from "./components/CaptionComponent";

interface AILearningRoadVideoProps {
  title: string;
}

export const AILearningRoadVideo: React.FC<AILearningRoadVideoProps> = ({
  title
}) => {
  const { fps } = useVideoConfig();
  
  return (
    <TransitionSeries>
      {/* 场景1: 介绍 */}
      <TransitionSeries.Sequence durationInFrames={573}>
        <Scene1_Introduction title={title} />
        <Html5Audio src={staticFile("ailroad/scene1-intro.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="ailroad/scene1-intro.mp3"
          captionFile="ailroad/scene1-intro-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场1: 淡出效果 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景2: 前置知识 */}
      <TransitionSeries.Sequence durationInFrames={772}>
        <Scene2_Prerequisites />
        <Html5Audio src={staticFile("ailroad/scene2-prerequisites.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="ailroad/scene2-prerequisites.mp3"
          captionFile="ailroad/scene2-prerequisites-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场2: 从左侧滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-left" })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
      />

      {/* 场景3: 入门能力 */}
      <TransitionSeries.Sequence durationInFrames={720}>
        <Scene3_Beginner />
        <Html5Audio src={staticFile("ailroad/scene3-beginner.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="ailroad/scene3-beginner.mp3"
          captionFile="ailroad/scene3-beginner-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场3: 擦除效果 */}
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* 场景4: 进阶能力 */}
      <TransitionSeries.Sequence durationInFrames={705}>
        <Scene4_Intermediate />
        <Html5Audio src={staticFile("ailroad/scene4-intermediate.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="ailroad/scene4-intermediate.mp3"
          captionFile="ailroad/scene4-intermediate-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场4: 翻转效果 */}
      <TransitionSeries.Transition
        presentation={flip()}
        timing={springTiming({ config: { damping: 150 }, durationInFrames: 30 })}
      />

      {/* 场景5: 高级能力 */}
      <TransitionSeries.Sequence durationInFrames={735}>
        <Scene5_Advanced />
        <Html5Audio src={staticFile("ailroad/scene5-advanced.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="ailroad/scene5-advanced.mp3"
          captionFile="ailroad/scene5-advanced-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场5: 从顶部滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-top" })}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景6: 后续发展 */}
      <TransitionSeries.Sequence durationInFrames={479}>
        <Scene6_Career />
        <Html5Audio src={staticFile("ailroad/scene6-career.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="ailroad/scene6-career.mp3"
          captionFile="ailroad/scene6-career-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场6: 从右侧滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
      />

      {/* 场景7: 总结 */}
      <TransitionSeries.Sequence durationInFrames={675}>
        <Scene7_Summary />
        <Html5Audio src={staticFile("ailroad/scene7-summary.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="ailroad/scene7-summary.mp3"
          captionFile="ailroad/scene7-summary-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>

      {/* 转场7: 淡入淡出效果 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />  
    </TransitionSeries>
  );
};
