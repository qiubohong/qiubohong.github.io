import React from "react";
import { staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { CNNScene1_Introduction } from "./scenes/cnn/Scene1_Introduction";
import { CNNScene2_Definition } from "./scenes/cnn/Scene2_Definition";
import { CNNScene3_Comparison } from "./scenes/cnn/Scene3_Comparison";
import { CNNScene4_ThreeLayers } from "./scenes/cnn/Scene4_ThreeLayers";
import { CNNScene5_Applications } from "./scenes/cnn/Scene5_Applications";
import { CNNScene6_FunFacts } from "./scenes/cnn/Scene6_FunFacts";
import { EndingScene } from "./components/EndingScene";
import { CaptionComponent } from "./components/CaptionComponent";
import { Html5Audio } from "remotion";

interface CNNVideoProps {
    title: string;
}

export const CNNVideo: React.FC<CNNVideoProps> = ({ title }) => {
    const { fps } = useVideoConfig();

    return (
        <TransitionSeries>
            {/* 场景1: 介绍 - 15.16秒 (455帧) */}
            <TransitionSeries.Sequence durationInFrames={455}>
                <CNNScene1_Introduction title={title} />
                <Html5Audio src={staticFile("CNNVideo/scene1-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="CNNVideo/scene1-audio.mp3"
                    captionFile="CNNVideo/scene1-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场1: 淡出效果 */}
            <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: 20 })}
            />

            {/* 场景2: 定义 - 17.872秒 (536帧) */}
            <TransitionSeries.Sequence durationInFrames={536}>
                <CNNScene2_Definition />
                <Html5Audio src={staticFile("CNNVideo/scene2-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="CNNVideo/scene2-audio.mp3"
                    captionFile="CNNVideo/scene2-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场2: 从左侧滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-left" })}
                timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
            />

            {/* 场景3: 对比 - 22.552秒 (677帧) */}
            <TransitionSeries.Sequence durationInFrames={677}>
                <CNNScene3_Comparison />
                <Html5Audio src={staticFile("CNNVideo/scene3-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="CNNVideo/scene3-audio.mp3"
                    captionFile="CNNVideo/scene3-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场3: 擦除效果 */}
            <TransitionSeries.Transition
                presentation={wipe({ direction: "from-left" })}
                timing={linearTiming({ durationInFrames: 15 })}
            />

            {/* 场景4: 三层功能 - 31.048秒 (931帧) */}
            <TransitionSeries.Sequence durationInFrames={931}>
                <CNNScene4_ThreeLayers />
                <Html5Audio src={staticFile("CNNVideo/scene4-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="CNNVideo/scene4-audio.mp3"
                    captionFile="CNNVideo/scene4-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场4: 从顶部滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-top" })}
                timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
            />

            {/* 场景5: 实际应用 - 29.224秒 (877帧) */}
            <TransitionSeries.Sequence durationInFrames={877}>
                <CNNScene5_Applications />
                <Html5Audio src={staticFile("CNNVideo/scene5-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="CNNVideo/scene5-audio.mp3"
                    captionFile="CNNVideo/scene5-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场5: 从右侧滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-right" })}
                timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
            />

            {/* 场景6: 冷知识 - 24.112秒 (723帧) */}
            <TransitionSeries.Sequence durationInFrames={723}>
                <CNNScene6_FunFacts />
                <Html5Audio src={staticFile("CNNVideo/scene6-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="CNNVideo/scene6-audio.mp3"
                    captionFile="CNNVideo/scene6-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场6: 淡入淡出效果 */}
            <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: 30 })}
            />

            {/* 场景7: 结尾收尾 - 6.328秒 (190帧) */}
            <TransitionSeries.Sequence durationInFrames={190}>
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
