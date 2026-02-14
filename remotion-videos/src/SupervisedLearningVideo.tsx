import React from "react";
import { Html5Audio, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { Scene1_Introduction } from "./scenes/Scene1_Introduction";
import { Scene2_Definition } from "./scenes/Scene2_Definition";
import { Scene3_Types } from "./scenes/Scene3_Types";
import { Scene4_Regression } from "./scenes/Scene4_Regression";
import { Scene5_Classification } from "./scenes/Scene5_Classification";
import { Scene6_HandsOn } from "./scenes/Scene6_HandsOn";
import { Scene7_FunFact } from "./scenes/Scene7_FunFact";
import { EndingScene } from "./components/EndingScene";
import { CaptionComponent } from "./components/CaptionComponent";

interface SupervisedLearningVideoProps {
  title: string;
}

export const SupervisedLearningVideo: React.FC<SupervisedLearningVideoProps> = ({
  title
}) => {
  const { fps } = useVideoConfig();
  
  return (
    <TransitionSeries>
      {/* 场景1: 介绍 */}
      <TransitionSeries.Sequence durationInFrames={180}>
        <Scene1_Introduction title={title} />
        <Html5Audio src={staticFile("scene1-intro.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="scene1-intro.mp3"
          captionFile="scene1-intro-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场1: 淡出效果 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景2: 定义 */}
      <TransitionSeries.Sequence durationInFrames={380}>
        <Scene2_Definition />
        <Html5Audio src={staticFile("scene2-definition.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="scene2-definition.mp3"
          captionFile="scene2-definition-captions.json"
          startTimeMs={6000}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场2: 从左侧滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-left" })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
      />

      {/* 场景3: 类型 */}
      <TransitionSeries.Sequence durationInFrames={285}>
        <Scene3_Types />
        <Html5Audio src={staticFile("scene3-types.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="scene3-types.mp3"
          captionFile="scene3-types-captions.json"
          startTimeMs={18000}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场3: 擦除效果 */}
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* 场景4: 回归 */}
      <TransitionSeries.Sequence durationInFrames={245}>
        <Scene4_Regression />
        <Html5Audio src={staticFile("scene4-regression.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="scene4-regression.mp3"
          captionFile="scene4-regression-captions.json"
          startTimeMs={25833}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场4: 翻转效果 */}
      <TransitionSeries.Transition
        presentation={flip()}
        timing={springTiming({ config: { damping: 150 }, durationInFrames: 30 })}
      />

      {/* 场景5: 分类 */}
      <TransitionSeries.Sequence durationInFrames={280}>
        <Scene5_Classification />
        <Html5Audio src={staticFile("scene5-classification.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="scene5-classification.mp3"
          captionFile="scene5-classification-captions.json"
          startTimeMs={33333}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场5: 从顶部滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-top" })}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景6: 动手试试 */}
      <TransitionSeries.Sequence durationInFrames={250}>
        <Scene6_HandsOn />
        <Html5Audio src={staticFile("scene6-hands-on.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="scene6-hands-on.mp3"
          captionFile="scene6-hands-on-captions.json"
          startTimeMs={41333}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场6: 从右侧滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
      />

      {/* 场景7: 冷知识 */}
      <TransitionSeries.Sequence durationInFrames={232}>
        <Scene7_FunFact />
        <Html5Audio src={staticFile("scene7-fun-fact.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="scene7-fun-fact.mp3"
          captionFile="scene7-fun-fact-captions.json"
          startTimeMs={49333}
        />
      </TransitionSeries.Sequence>

      {/* 转场7: 淡入淡出效果 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />

      {/* 场景8: 结尾收尾 */}
      <TransitionSeries.Sequence durationInFrames={180}>
        <EndingScene />
        <Html5Audio src={staticFile("scene8-ending.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="scene8-ending.mp3"
          captionFile="scene8-ending-captions.json"
          startTimeMs={57000}
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};