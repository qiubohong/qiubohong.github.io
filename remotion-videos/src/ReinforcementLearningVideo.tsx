import React from "react";
import { staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { ReinforcementScene1_Introduction } from "./scenes/reinforcement/Scene1_Introduction";
import { ReinforcementScene2_Definition } from "./scenes/reinforcement/Scene2_Definition";
import { ReinforcementScene3_ModelFree } from "./scenes/reinforcement/Scene3_ModelFree";
import { ReinforcementScene4_ModelBased } from "./scenes/reinforcement/Scene4_ModelBased";
import { ReinforcementScene5_Comparison } from "./scenes/reinforcement/Scene5_Comparison";
import { ReinforcementScene6_Applications } from "./scenes/reinforcement/Scene6_Applications";
import { ReinforcementScene7_FunFacts } from "./scenes/reinforcement/Scene7_FunFacts";
import { EndingScene } from "./components/EndingScene";
import { CaptionComponent } from "./components/CaptionComponent";
import { Html5Audio } from "remotion";

interface ReinforcementLearningVideoProps {
  title: string;
}

export const ReinforcementLearningVideo: React.FC<ReinforcementLearningVideoProps> = ({
  title
}) => {
  const { fps } = useVideoConfig();
  
  return (
    <TransitionSeries>
      {/* 场景1: 介绍 - 音频13.92秒 + 30帧缓冲 = 447帧 */}
      <TransitionSeries.Sequence durationInFrames={447}>
        <ReinforcementScene1_Introduction title={title} />
        <Html5Audio src={staticFile("ReinforcementLearningVideo/scene1-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="ReinforcementLearningVideo/scene1-audio.mp3" 
          captionFile="ReinforcementLearningVideo/scene1-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场1: 淡出效果 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景2: 定义 - 音频12.4秒 + 30帧缓冲 = 402帧 */}
      <TransitionSeries.Sequence durationInFrames={402}>
        <ReinforcementScene2_Definition />
        <Html5Audio src={staticFile("ReinforcementLearningVideo/scene2-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="ReinforcementLearningVideo/scene2-audio.mp3" 
          captionFile="ReinforcementLearningVideo/scene2-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场2: 从左侧滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-left" })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
      />

      {/* 场景3: 免模型学习 - 音频13秒 + 30帧缓冲 = 420帧 */}
      <TransitionSeries.Sequence durationInFrames={420}>
        <ReinforcementScene3_ModelFree />
        <Html5Audio src={staticFile("ReinforcementLearningVideo/scene3-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="ReinforcementLearningVideo/scene3-audio.mp3" 
          captionFile="ReinforcementLearningVideo/scene3-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场3: 擦除效果 */}
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* 场景4: 有模型学习 - 音频15.2秒 + 30帧缓冲 = 486帧 */}
      <TransitionSeries.Sequence durationInFrames={486}>
        <ReinforcementScene4_ModelBased />
        <Html5Audio src={staticFile("ReinforcementLearningVideo/scene4-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="ReinforcementLearningVideo/scene4-audio.mp3" 
          captionFile="ReinforcementLearningVideo/scene4-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场4: 翻转效果 */}
      <TransitionSeries.Transition
        presentation={flip()}
        timing={springTiming({ config: { damping: 150 }, durationInFrames: 30 })}
      />

      {/* 场景5: 对比 - 音频20.88秒 + 30帧缓冲 = 656帧 */}
      <TransitionSeries.Sequence durationInFrames={656}>
        <ReinforcementScene5_Comparison />
        <Html5Audio src={staticFile("ReinforcementLearningVideo/scene5-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="ReinforcementLearningVideo/scene5-audio.mp3" 
          captionFile="ReinforcementLearningVideo/scene5-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场5: 从顶部滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-top" })}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景6: 应用案例 - 音频21.76秒 + 30帧缓冲 = 683帧 */}
      <TransitionSeries.Sequence durationInFrames={683}>
        <ReinforcementScene6_Applications />
        <Html5Audio src={staticFile("ReinforcementLearningVideo/scene6-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="ReinforcementLearningVideo/scene6-audio.mp3" 
          captionFile="ReinforcementLearningVideo/scene6-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场6: 从右侧滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
      />

      {/* 场景7: 冷知识 - 音频17.12秒 + 30帧缓冲 = 544帧 */}
      <TransitionSeries.Sequence durationInFrames={544}>
        <ReinforcementScene7_FunFacts />
        <Html5Audio src={staticFile("ReinforcementLearningVideo/scene7-audio.mp3")} volume={0.8} />
        <CaptionComponent 
          audioFile="ReinforcementLearningVideo/scene7-audio.mp3" 
          captionFile="ReinforcementLearningVideo/scene7-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>

      {/* 转场7: 淡入淡出效果 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />

      {/* 场景8: 结尾收尾 - 6秒 */}
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
