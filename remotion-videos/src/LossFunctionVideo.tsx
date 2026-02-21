import React from "react";
import { staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { LossScene1_Introduction } from "./scenes/lossfunction/Scene1_Introduction";
import { LossScene2_Definition } from "./scenes/lossfunction/Scene2_Definition";
import { LossScene3_Categories } from "./scenes/lossfunction/Scene3_Categories";
import { LossScene4_Functions_Part1 } from "./scenes/lossfunction/Scene4_Functions_Part1";
import { LossScene5_Functions_Part2 } from "./scenes/lossfunction/Scene5_Functions_Part2";
import { LossScene6_GoldenRules } from "./scenes/lossfunction/Scene6_GoldenRules";
import { LossScene7_FunFacts } from "./scenes/lossfunction/Scene7_FunFacts";
import { EndingScene } from "./components/EndingScene";
import { CaptionComponent } from "./components/CaptionComponent";
import { Html5Audio } from "remotion";

interface LossFunctionVideoProps {
    title: string;
}

export const LossFunctionVideo: React.FC<LossFunctionVideoProps> = ({ title }) => {
    const { fps } = useVideoConfig();

    return (
        <TransitionSeries>
            {/* 场景1: 介绍 - 15秒音频 (450帧) + 30帧缓冲 = 480帧 - 抖音风格开场：AI模型为什么总能"猜对"？ */}
            <TransitionSeries.Sequence durationInFrames={560}>
                <LossScene1_Introduction title={title} />
                <Html5Audio src={staticFile("LossFunctionVideo/scene1-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="LossFunctionVideo/scene1-audio.mp3"
                    captionFile="LossFunctionVideo/scene1-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场1: 淡出效果 */}
            <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: 20 })}
            />

            {/* 场景2: 定义和核心三要素 - 21秒音频 (630帧) + 30帧缓冲 = 660帧 */}
            <TransitionSeries.Sequence durationInFrames={720}>
                <LossScene2_Definition />
                <Html5Audio src={staticFile("LossFunctionVideo/scene2-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="LossFunctionVideo/scene2-audio.mp3"
                    captionFile="LossFunctionVideo/scene2-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场2: 从左侧滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-left" })}
                timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
            />

            {/* 场景3: 三大分类 - 预估15秒 (450帧) */}
            <TransitionSeries.Sequence durationInFrames={480}>
                <LossScene3_Categories />
                <Html5Audio src={staticFile("LossFunctionVideo/scene3-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="LossFunctionVideo/scene3-audio.mp3"
                    captionFile="LossFunctionVideo/scene3-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场3: 擦除效果 */}
            <TransitionSeries.Transition
                presentation={wipe({ direction: "from-left" })}
                timing={linearTiming({ durationInFrames: 15 })}
            />

            {/* 场景4: 五大经典损失函数（前3个）- 预估20秒 (600帧) */}
            <TransitionSeries.Sequence durationInFrames={530}>
                <LossScene4_Functions_Part1 />
                <Html5Audio src={staticFile("LossFunctionVideo/scene4-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="LossFunctionVideo/scene4-audio.mp3"
                    captionFile="LossFunctionVideo/scene4-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场4: 擦除效果 */}
            <TransitionSeries.Transition
                presentation={wipe({ direction: "from-left" })}
                timing={linearTiming({ durationInFrames: 15 })}
            />

            {/* 场景5: 五大经典损失函数（后2个）- 预估12秒 (360帧) */}
            <TransitionSeries.Sequence durationInFrames={280}>
                <LossScene5_Functions_Part2 />
                <Html5Audio src={staticFile("LossFunctionVideo/scene5-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="LossFunctionVideo/scene5-audio.mp3"
                    captionFile="LossFunctionVideo/scene5-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场5: 从顶部滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-top" })}
                timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
            />

            {/* 场景6: 选择黄金准则 - 16秒音频 (480帧) + 30帧缓冲 = 510帧 */}
            <TransitionSeries.Sequence durationInFrames={560}>
                <LossScene6_GoldenRules />
                <Html5Audio src={staticFile("LossFunctionVideo/scene6-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="LossFunctionVideo/scene6-audio.mp3"
                    captionFile="LossFunctionVideo/scene6-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场6: 从右侧滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-right" })}
                timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
            />

            {/* 场景7: 冷知识 - 21秒音频 (630帧) + 30帧缓冲 = 660帧 */}
            <TransitionSeries.Sequence durationInFrames={720}>
                <LossScene7_FunFacts />
                <Html5Audio src={staticFile("LossFunctionVideo/scene7-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="LossFunctionVideo/scene7-audio.mp3"
                    captionFile="LossFunctionVideo/scene7-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场7: 淡入淡出效果 */}
            <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: 30 })}
            />

            {/* 场景8: 结尾收尾 - 6秒 (180帧) */}
            <TransitionSeries.Sequence durationInFrames={140}>
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
