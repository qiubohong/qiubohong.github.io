import React from "react";
import { Html5Audio, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { Scene1_Introduction } from "./scenes/deeplearning/Scene1_Introduction";
import { Scene2_Definition } from "./scenes/deeplearning/Scene2_Definition";
import { Scene3_Process } from "./scenes/deeplearning/Scene3_Process";
import { Scene4_CaseStudy } from "./scenes/deeplearning/Scene4_CaseStudy";
import { Scene5_Experience } from "./scenes/deeplearning/Scene5_Experience";
import { Scene6_Milestones } from "./scenes/deeplearning/Scene6_Milestones";
import { Scene7_Conclusion } from "./scenes/deeplearning/Scene7_Conclusion";
import { EndingScene } from "./components/EndingScene";
import { CaptionComponent } from "./components/CaptionComponent";

interface DeepLearningVideoProps {
  title: string;
}

export const DeepLearningVideo: React.FC<DeepLearningVideoProps> = ({
  title
}) => {
  const { fps } = useVideoConfig();
  
  return (
    <TransitionSeries>
      {/* 场景1: 介绍 */}
      <TransitionSeries.Sequence durationInFrames={420}>
        <Scene1_Introduction title={title} />
        <Html5Audio src={staticFile("deeplearning/scene1-intro.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="deeplearning/scene1-intro.mp3"
          captionFile="deeplearning/scene1-intro-captions.json"
          startTimeMs={0}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场1: 淡出效果 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景2: 定义和对比 */}
      <TransitionSeries.Sequence durationInFrames={484}>
        <Scene2_Definition />
        <Html5Audio src={staticFile("deeplearning/scene2-definition.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="deeplearning/scene2-definition.mp3"
          captionFile="deeplearning/scene2-definition-captions.json"
          startTimeMs={13000}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场2: 从左侧滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-left" })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
      />

      {/* 场景3: 深度学习步骤 */}
      <TransitionSeries.Sequence durationInFrames={438}>
        <Scene3_Process />
        <Html5Audio src={staticFile("deeplearning/scene3-process.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="deeplearning/scene3-process.mp3"
          captionFile="deeplearning/scene3-process-captions.json"
          startTimeMs={28120}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场3: 擦除效果 */}
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* 场景4: 经典案例 */}
      <TransitionSeries.Sequence durationInFrames={472}>
        <Scene4_CaseStudy />
        <Html5Audio src={staticFile("deeplearning/scene4-case-study.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="deeplearning/scene4-case-study.mp3"
          captionFile="deeplearning/scene4-case-study-captions.json"
          startTimeMs={41720}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场4: 翻转效果 */}
      <TransitionSeries.Transition
        presentation={flip()}
        timing={springTiming({ config: { damping: 150 }, durationInFrames: 30 })}
      />

      {/* 场景5: 体验深度模型 */}
      <TransitionSeries.Sequence durationInFrames={424}>
        <Scene5_Experience />
        <Html5Audio src={staticFile("deeplearning/scene5-experience.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="deeplearning/scene5-experience.mp3"
          captionFile="deeplearning/scene5-experience-captions.json"
          startTimeMs={56440}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场5: 从顶部滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-top" })}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景6: 里程碑 */}
      <TransitionSeries.Sequence durationInFrames={551}>
        <Scene6_Milestones />
        <Html5Audio src={staticFile("deeplearning/scene6-milestones.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="deeplearning/scene6-milestones.mp3"
          captionFile="deeplearning/scene6-milestones-captions.json"
          startTimeMs={69560}
        />
      </TransitionSeries.Sequence>
      
      {/* 转场6: 从右侧滑动 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
      />

      {/* 场景7: 总结与参考资料 */}
      <TransitionSeries.Sequence durationInFrames={409}>
        <Scene7_Conclusion />
        <Html5Audio src={staticFile("deeplearning/scene7-references.mp3")} volume={0.8} />
        <CaptionComponent
          audioFile="deeplearning/scene7-references.mp3"
          captionFile="deeplearning/scene7-references-captions.json"
          startTimeMs={86920}
        />
      </TransitionSeries.Sequence>

      {/* 转场7: 淡入淡出效果 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />

      {/* 场景8: 结尾收尾 */}
      <TransitionSeries.Sequence durationInFrames={205}>
        <EndingScene />
        <Html5Audio src={staticFile("scene8-ending.mp3")} volume={0.8} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};