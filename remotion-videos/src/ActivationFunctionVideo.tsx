import React from "react";
import { staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { ActivationScene1_Introduction } from "./scenes/activation/Scene1_Introduction";
import { ActivationScene2_Definition } from "./scenes/activation/Scene2_Definition";
import { ActivationScene3a_Functions_Part1 } from "./scenes/activation/Scene3a_Functions_Part1";
import { ActivationScene3a2_Functions_Part2 } from "./scenes/activation/Scene3a2_Functions_Part2";
import { ActivationScene3c_Functions_Part3 } from "./scenes/activation/Scene3c_Functions_Part3";
import { ActivationScene4_Comparison } from "./scenes/activation/Scene4_Comparison";
import { ActivationScene5a_HandsOn_Code } from "./scenes/activation/Scene5a_HandsOn_Code";
import { ActivationScene5b_HandsOn_Points } from "./scenes/activation/Scene5b_HandsOn_Points";
import { ActivationScene6a_FunFacts_Part1 } from "./scenes/activation/Scene6a_FunFacts_Part1";
import { ActivationScene6b_FunFacts_Part2 } from "./scenes/activation/Scene6b_FunFacts_Part2";
import { EndingScene } from "./components/EndingScene";
import { CaptionComponent } from "./components/CaptionComponent";
import { Html5Audio } from "remotion";

interface ActivationFunctionVideoProps {
    title: string;
}

export const ActivationFunctionVideo: React.FC<ActivationFunctionVideoProps> = ({ title }) => {
    const { fps } = useVideoConfig();

    return (
        <TransitionSeries>
            {/* 场景1: 介绍 - 预估17秒 (510帧) - 抖音风格开场：90%的AI模型都在用它！ */}
            <TransitionSeries.Sequence durationInFrames={510}>
                <ActivationScene1_Introduction title={title} />
                <Html5Audio src={staticFile("ActivationVideo/scene1-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="ActivationVideo/scene1-audio.mp3"
                    captionFile="ActivationVideo/scene1-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场1: 淡出效果 */}
            <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: 20 })}
            />

            {/* 场景2: 定义和三大核心功能 - 预估22秒 (660帧) - 简化版本，更符合抖音节奏 */}
            <TransitionSeries.Sequence durationInFrames={690}>
                <ActivationScene2_Definition />
                <Html5Audio src={staticFile("ActivationVideo/scene2-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="ActivationVideo/scene2-audio.mp3"
                    captionFile="ActivationVideo/scene2-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场2: 从左侧滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-left" })}
                timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
            />

            {/* 场景3a: 5个经典激活函数（前2个：Sigmoid、Tanh）- 预估17秒 (510帧) */}
            <TransitionSeries.Sequence durationInFrames={820}>
                <ActivationScene3a_Functions_Part1 />
                <Html5Audio src={staticFile("ActivationVideo/scene3a-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="ActivationVideo/scene3a-audio.mp3"
                    captionFile="ActivationVideo/scene3a-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场3a: 擦除效果 */}
            <TransitionSeries.Transition
                presentation={wipe({ direction: "from-left" })}
                timing={linearTiming({ durationInFrames: 15 })}
            />

            {/* 场景3a2: 第3个激活函数（ReLU）- 预估14秒 (420帧) */}
            <TransitionSeries.Sequence durationInFrames={440}>
                <ActivationScene3a2_Functions_Part2 />
                <Html5Audio src={staticFile("ActivationVideo/scene3a2-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="ActivationVideo/scene3a2-audio.mp3"
                    captionFile="ActivationVideo/scene3a2-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场3a2: 擦除效果 */}
            <TransitionSeries.Transition
                presentation={wipe({ direction: "from-left" })}
                timing={linearTiming({ durationInFrames: 15 })}
            />

            {/* 场景3c: 后2个激活函数（Leaky ReLU、Swish）- 预估17秒 (510帧) */}
            <TransitionSeries.Sequence durationInFrames={780}>
                <ActivationScene3c_Functions_Part3 />
                <Html5Audio src={staticFile("ActivationVideo/scene3c-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="ActivationVideo/scene3c-audio.mp3"
                    captionFile="ActivationVideo/scene3c-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场3c: 擦除效果 */}
            <TransitionSeries.Transition
                presentation={wipe({ direction: "from-left" })}
                timing={linearTiming({ durationInFrames: 15 })}
            />

            {/* 场景4: 函数性能对比 - 预估20秒 (600帧) - 简洁对比，突出结论 */}
            <TransitionSeries.Sequence durationInFrames={740}>
                <ActivationScene4_Comparison />
                <Html5Audio src={staticFile("ActivationVideo/scene4-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="ActivationVideo/scene4-audio.mp3"
                    captionFile="ActivationVideo/scene4-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场4: 从顶部滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-top" })}
                timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
            />

            {/* 场景5a: 动手实验（代码展示）- 预估10秒 (330帧) */}
            <TransitionSeries.Sequence durationInFrames={330}>
                <ActivationScene5a_HandsOn_Code />
                <Html5Audio src={staticFile("ActivationVideo/scene5a-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="ActivationVideo/scene5a-audio.mp3"
                    captionFile="ActivationVideo/scene5a-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场5a: 擦除效果 */}
            <TransitionSeries.Transition
                presentation={wipe({ direction: "from-top" })}
                timing={linearTiming({ durationInFrames: 15 })}
            />

            {/* 场景5b: 动手实验（观察重点）- 预估8秒 (270帧) */}
            <TransitionSeries.Sequence durationInFrames={430}>
                <ActivationScene5b_HandsOn_Points />
                <Html5Audio src={staticFile("ActivationVideo/scene5b-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="ActivationVideo/scene5b-audio.mp3"
                    captionFile="ActivationVideo/scene5b-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场5b: 从右侧滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-right" })}
                timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
            />

            {/* 场景6a: 冷知识（前2个）- 预估14秒 (420帧) */}
            <TransitionSeries.Sequence durationInFrames={620}>
                <ActivationScene6a_FunFacts_Part1 />
                <Html5Audio src={staticFile("ActivationVideo/scene6a-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="ActivationVideo/scene6a-audio.mp3"
                    captionFile="ActivationVideo/scene6a-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场6a: 从右侧滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-right" })}
                timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
            />

            {/* 场景6b: 冷知识（后2个）- 预估13秒 (420帧) */}
            <TransitionSeries.Sequence durationInFrames={580}>
                <ActivationScene6b_FunFacts_Part2 />
                <Html5Audio src={staticFile("ActivationVideo/scene6b-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="ActivationVideo/scene6b-audio.mp3"
                    captionFile="ActivationVideo/scene6b-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场6b: 淡入淡出效果 */}
            <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: 30 })}
            />

            {/* 场景7: 结尾收尾 - 8.33秒 (250帧) */}
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
