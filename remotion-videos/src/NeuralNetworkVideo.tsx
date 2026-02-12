import React from "react";
import { staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { NeuralNetworkScene1_Introduction } from "./scenes/neuralnetwork/Scene1_Introduction";
import { NeuralNetworkScene2_Definition } from "./scenes/neuralnetwork/Scene2_Definition";
import { NeuralNetworkScene3_ThreeLayers } from "./scenes/neuralnetwork/Scene3_ThreeLayers";
import { NeuralNetworkScene4_HowItWorks } from "./scenes/neuralnetwork/Scene4_HowItWorks";
import { NeuralNetworkScene5_Types } from "./scenes/neuralnetwork/Scene5_Types";
import { NeuralNetworkScene6_LifeExample } from "./scenes/neuralnetwork/Scene6_LifeExample";
import { NeuralNetworkScene7_FunFact } from "./scenes/neuralnetwork/Scene7_FunFact";
import { EndingScene } from "./components/EndingScene";
import { CaptionComponent } from "./components/CaptionComponent";
import { Html5Audio } from "remotion";

interface NeuralNetworkVideoProps {
    title: string;
}

export const NeuralNetworkVideo: React.FC<NeuralNetworkVideoProps> = ({
    title
}) => {
    const { fps } = useVideoConfig();

    return (
        <TransitionSeries>
            {/* 场景1: 介绍 - 音频13.99秒 + 1秒缓冲 = 15秒 (450帧) */}
            <TransitionSeries.Sequence durationInFrames={450}>
                <NeuralNetworkScene1_Introduction title={title} />
                <Html5Audio src={staticFile("NeuralNetworkVideo/scene1-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="NeuralNetworkVideo/scene1-audio.mp3"
                    captionFile="NeuralNetworkVideo/scene1-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场1: 淡出效果 */}
            <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: 20 })}
            />

            {/* 场景2: 定义 - 音频17.04秒 + 1秒缓冲 = 18.07秒 (542帧) */}
            <TransitionSeries.Sequence durationInFrames={542}>
                <NeuralNetworkScene2_Definition />
                <Html5Audio src={staticFile("NeuralNetworkVideo/scene2-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="NeuralNetworkVideo/scene2-audio.mp3"
                    captionFile="NeuralNetworkVideo/scene2-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场2: 从左侧滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-left" })}
                timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
            />

            {/* 场景3: 三层功能 - 音频17.95秒 + 1秒缓冲 = 18.97秒 (569帧) */}
            <TransitionSeries.Sequence durationInFrames={569}>
                <NeuralNetworkScene3_ThreeLayers />
                <Html5Audio src={staticFile("NeuralNetworkVideo/scene3-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="NeuralNetworkVideo/scene3-audio.mp3"
                    captionFile="NeuralNetworkVideo/scene3-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场3: 擦除效果 */}
            <TransitionSeries.Transition
                presentation={wipe({ direction: "from-left" })}
                timing={linearTiming({ durationInFrames: 15 })}
            />

            {/* 场景4: 怎么做 - 音频28.03秒 + 1秒缓冲 = 29.03秒 (871帧) */}
            <TransitionSeries.Sequence durationInFrames={871}>
                <NeuralNetworkScene4_HowItWorks />
                <Html5Audio src={staticFile("NeuralNetworkVideo/scene4-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="NeuralNetworkVideo/scene4-audio.mp3"
                    captionFile="NeuralNetworkVideo/scene4-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场4: 翻转效果 */}
            <TransitionSeries.Transition
                presentation={flip()}
                timing={springTiming({ config: { damping: 150 }, durationInFrames: 30 })}
            />

            {/* 场景5: 算法类型 - 音频22.08秒 + 1秒缓冲 = 23.10秒 (693帧) */}
            <TransitionSeries.Sequence durationInFrames={693}>
                <NeuralNetworkScene5_Types />
                <Html5Audio src={staticFile("NeuralNetworkVideo/scene5-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="NeuralNetworkVideo/scene5-audio.mp3"
                    captionFile="NeuralNetworkVideo/scene5-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场5: 从顶部滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-top" })}
                timing={linearTiming({ durationInFrames: 20 })}
            />

            {/* 场景6: 生活案例 - 音频22.90秒 + 1秒缓冲 = 23.90秒 (717帧) */}
            <TransitionSeries.Sequence durationInFrames={717}>
                <NeuralNetworkScene6_LifeExample />
                <Html5Audio src={staticFile("NeuralNetworkVideo/scene6-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="NeuralNetworkVideo/scene6-audio.mp3"
                    captionFile="NeuralNetworkVideo/scene6-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场6: 从右侧滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-right" })}
                timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
            />

            {/* 场景7: 冷知识 - 音频17.59秒 + 1秒缓冲 = 18.60秒 (558帧) */}
            <TransitionSeries.Sequence durationInFrames={558}>
                <NeuralNetworkScene7_FunFact />
                <Html5Audio src={staticFile("NeuralNetworkVideo/scene7-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="NeuralNetworkVideo/scene7-audio.mp3"
                    captionFile="NeuralNetworkVideo/scene7-captions.json"
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