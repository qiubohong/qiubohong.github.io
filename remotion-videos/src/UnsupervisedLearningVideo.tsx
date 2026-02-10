import React from "react";
import { staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { UnsupervisedScene1_Introduction } from "./scenes/unsupervised/Scene1_Introduction";
import { UnsupervisedScene2_Definition } from "./scenes/unsupervised/Scene2_Definition";
import { UnsupervisedScene3_Methods } from "./scenes/unsupervised/Scene3_Methods";
import { UnsupervisedScene4_Clustering } from "./scenes/unsupervised/Scene4_Clustering";
import { UnsupervisedScene5_Dimensionality } from "./scenes/unsupervised/Scene5_Dimensionality";
import { UnsupervisedScene6_Association } from "./scenes/unsupervised/Scene6_Association";
import { UnsupervisedScene7_HandsOn } from "./scenes/unsupervised/Scene7_HandsOn";
import { UnsupervisedScene8_Cases } from "./scenes/unsupervised/Scene8_Cases";
import { EndingScene } from "./components/EndingScene";
import { CaptionComponent } from "./components/CaptionComponent";
import { Html5Audio } from "remotion";

interface UnsupervisedLearningVideoProps {
  title: string;
}

export const UnsupervisedLearningVideo: React.FC<UnsupervisedLearningVideoProps> = ({
  title
}) => {
  const { fps } = useVideoConfig();
  
  return (
    <TransitionSeries>
      {/* 场景1: 介绍 - 8.72秒 + 1秒缓冲 = 9.73秒 */}
      <TransitionSeries.Sequence durationInFrames={292}>
        <UnsupervisedScene1_Introduction title={title} />
        <Html5Audio src={staticFile("UnsupervisedLearningVideo/scene1-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="UnsupervisedLearningVideo/scene1-audio.mp3" 
          captionFile="UnsupervisedLearningVideo/scene1-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场1: 淡出效果 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景2: 定义 - 10.88秒 + 1秒缓冲 = 11.87秒 */}
      <TransitionSeries.Sequence durationInFrames={356}>
        <UnsupervisedScene2_Definition />
        <Html5Audio src={staticFile("UnsupervisedLearningVideo/scene2-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="UnsupervisedLearningVideo/scene2-audio.mp3" 
          captionFile="UnsupervisedLearningVideo/scene2-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场2: 从左侧滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-left" })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
      />

      {/* 场景3: 三种方法概览 - 8.48秒 + 1秒缓冲 = 9.47秒 */}
      <TransitionSeries.Sequence durationInFrames={284}>
        <UnsupervisedScene3_Methods />
        <Html5Audio src={staticFile("UnsupervisedLearningVideo/scene3-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="UnsupervisedLearningVideo/scene3-audio.mp3" 
          captionFile="UnsupervisedLearningVideo/scene3-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场3: 擦除效果 */}
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* 场景4: 聚类详解 - 15.28秒 + 1秒缓冲 = 16.27秒 */}
      <TransitionSeries.Sequence durationInFrames={488}>
        <UnsupervisedScene4_Clustering />
        <Html5Audio src={staticFile("UnsupervisedLearningVideo/scene4-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="UnsupervisedLearningVideo/scene4-audio.mp3" 
          captionFile="UnsupervisedLearningVideo/scene4-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场4: 翻转效果 */}
      <TransitionSeries.Transition
        presentation={flip()}
        timing={springTiming({ config: { damping: 150 }, durationInFrames: 30 })}
      />

      {/* 场景5: 降维详解 - 14.4秒 + 1秒缓冲 = 15.4秒 */}
      <TransitionSeries.Sequence durationInFrames={462}>
        <UnsupervisedScene5_Dimensionality />
        <Html5Audio src={staticFile("UnsupervisedLearningVideo/scene5-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="UnsupervisedLearningVideo/scene5-audio.mp3" 
          captionFile="UnsupervisedLearningVideo/scene5-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场5: 从顶部滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-top" })}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景6: 关联详解 - 14.8秒 + 1秒缓冲 = 15.8秒 */}
      <TransitionSeries.Sequence durationInFrames={474}>
        <UnsupervisedScene6_Association />
        <Html5Audio src={staticFile("UnsupervisedLearningVideo/scene6-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="UnsupervisedLearningVideo/scene6-audio.mp3" 
          captionFile="UnsupervisedLearningVideo/scene6-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场6: 从右侧滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
      />

      {/* 场景7: 动手实验 - 11.36秒 + 1秒缓冲 = 12.37秒 */}
      <TransitionSeries.Sequence durationInFrames={371}>
        <UnsupervisedScene7_HandsOn />
        <Html5Audio src={staticFile("UnsupervisedLearningVideo/scene7-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="UnsupervisedLearningVideo/scene7-audio.mp3" 
          captionFile="UnsupervisedLearningVideo/scene7-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>

      {/* 转场7: 淡入淡出效果 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />

      {/* 场景8: 实际案例 - 12.4秒 + 1秒缓冲 = 13.4秒 */}
      <TransitionSeries.Sequence durationInFrames={402}>
        <UnsupervisedScene8_Cases />
        <Html5Audio src={staticFile("UnsupervisedLearningVideo/scene8-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="UnsupervisedLearningVideo/scene8-audio.mp3" 
          captionFile="UnsupervisedLearningVideo/scene8-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>

      {/* 转场8: 淡入淡出效果 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />

      {/* 场景9: 结尾收尾 - 6秒 */}
      <TransitionSeries.Sequence durationInFrames={180}>
        <EndingScene />
        <Html5Audio src={staticFile("scene8-ending.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="scene8-ending.mp3" 
          captionFile="scene8-ending-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
