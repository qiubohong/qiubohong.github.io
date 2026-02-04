import React from "react";
import { staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { LightLeak } from "@remotion/light-leaks";
import { Scene1_Introduction } from "./scenes/Scene1_Introduction";
import { Scene2_Definition } from "./scenes/Scene2_Definition";
import { Scene3_Types } from "./scenes/Scene3_Types";
import { Scene4_Regression } from "./scenes/Scene4_Regression";
import { Scene5_Classification } from "./scenes/Scene5_Classification";
import { Scene6_HandsOn } from "./scenes/Scene6_HandsOn";
import { Scene7_FunFact } from "./scenes/Scene7_FunFact";
import { CaptionComponent } from "./components/CaptionComponent";

interface SupervisedLearningVideoProps {
  title: string;
}

export const SupervisedLearningVideo: React.FC<SupervisedLearningVideoProps> = ({
  title
}) => {
  const { fps } = useVideoConfig();
  
  return (
    <>
      {/* 背景音乐 - 暂时移除，待后续添加 */}
      {/* <Audio
        src={staticFile("background-music.mp3")}
        volume={0.3}
        loop
      /> */}
      
      <TransitionSeries>
        {/* 场景1: 介绍 */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene1_Introduction title={title} />
          <Audio
            src={staticFile("scene1-intro.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="scene1-intro.mp3"
            captionFile="scene1-intro-captions.json"
          />
        </TransitionSeries.Sequence>
        
        {/* 转场1: 淡出效果 */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        {/* 场景2: 定义 */}
        <TransitionSeries.Sequence durationInFrames={240}>
          <Scene2_Definition />
          <Audio
            src={staticFile("scene2-definition.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="scene2-definition.mp3"
            captionFile="scene2-definition-captions.json"
          />
        </TransitionSeries.Sequence>
        
        {/* 转场2: 从左侧滑动 */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
        />

        {/* 场景3: 类型 */}
        <TransitionSeries.Sequence durationInFrames={210}>
          <Scene3_Types />
          <Audio
            src={staticFile("scene3-types.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="scene3-types.mp3"
            captionFile="scene3-types-captions.json"
          />
        </TransitionSeries.Sequence>
        
        {/* 转场3: 擦除效果 */}
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        {/* 场景4: 回归 */}
        <TransitionSeries.Sequence durationInFrames={210}>
          <Scene4_Regression />
          <Audio
            src={staticFile("scene4-regression.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="scene4-regression.mp3"
            captionFile="scene4-regression-captions.json"
          />
        </TransitionSeries.Sequence>
        
        {/* 转场4: 翻转效果 */}
        <TransitionSeries.Transition
          presentation={flip()}
          timing={springTiming({ config: { damping: 150 }, durationInFrames: 30 })}
        />

        {/* 场景5: 分类 */}
        <TransitionSeries.Sequence durationInFrames={195}>
          <Scene5_Classification />
          <Audio
            src={staticFile("scene5-classification.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="scene5-classification.mp3"
            captionFile="scene5-classification-captions.json"
          />
        </TransitionSeries.Sequence>
        
        {/* 转场5: 从顶部滑动 */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-top" })}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        {/* 场景6: 动手试试 */}
        <TransitionSeries.Sequence durationInFrames={210}>
          <Scene6_HandsOn />
          <Audio
            src={staticFile("scene6-hands-on.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="scene6-hands-on.mp3"
            captionFile="scene6-hands-on-captions.json"
          />
        </TransitionSeries.Sequence>
        
        {/* 转场6: 从右侧滑动 */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
        />

        {/* 场景7: 冷知识 */}
        <TransitionSeries.Sequence durationInFrames={195}>
          <Scene7_FunFact />
          <Audio
            src={staticFile("scene7-fun-fact.mp3")}
            volume={0.8}
          />
          <CaptionComponent
            audioFile="scene7-fun-fact.mp3"
            captionFile="scene7-fun-fact-captions.json"
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};