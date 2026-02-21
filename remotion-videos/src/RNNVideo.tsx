import React from "react";
import { staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { RNNScene1_Introduction } from "./scenes/rnn/Scene1_Introduction";
import { RNNScene2_Definition } from "./scenes/rnn/Scene2_Definition";
import { RNNScene3_KeyModels } from "./scenes/rnn/Scene3_KeyModels";
import { RNNScene4_LSTM } from "./scenes/rnn/Scene4_LSTM";
import { RNNScene5_GRU } from "./scenes/rnn/Scene5_GRU";
import { RNNScene6_Applications } from "./scenes/rnn/Scene6_Applications";
import { RNNScene7_FunFacts } from "./scenes/rnn/Scene7_FunFacts";
import { EndingScene } from "./components/EndingScene";
import { CaptionComponent } from "./components/CaptionComponent";
import { Html5Audio } from "remotion";

interface RNNVideoProps {
    title: string;
}

export const RNNVideo: React.FC<RNNVideoProps> = ({ title }) => {
    const { fps } = useVideoConfig();

    return (
        <TransitionSeries>
            {/* 场景1: 介绍 - 预估8.86秒音频 (265帧) + 30帧缓冲 = 295帧 */}
            <TransitionSeries.Sequence durationInFrames={295}>
                <RNNScene1_Introduction title={title} />
                <Html5Audio src={staticFile("RNNVideo/scene1-intro-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="RNNVideo/scene1-intro-audio.mp3"
                    captionFile="RNNVideo/scene1-intro-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场1: 淡出效果 */}
            <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: 20 })}
            />

            {/* 场景2: 定义 - 27*30 + 30帧 =  */}
            <TransitionSeries.Sequence durationInFrames={840}>
                <RNNScene2_Definition />
                <Html5Audio src={staticFile("RNNVideo/scene2-definition-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="RNNVideo/scene2-definition-audio.mp3"
                    captionFile="RNNVideo/scene2-definition-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场2: 从左侧滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-left" })}
                timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
            />

            {/* 场景3: 关键算法模型 - 预估38.57秒 (1157帧) + 30帧缓冲 = 1187帧 */}
            <TransitionSeries.Sequence durationInFrames={1187}>
                <RNNScene3_KeyModels />
                <Html5Audio src={staticFile("RNNVideo/scene3-keymodels-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="RNNVideo/scene3-keymodels-audio.mp3"
                    captionFile="RNNVideo/scene3-keymodels-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场3: 擦除效果 */}
            <TransitionSeries.Transition
                presentation={wipe({ direction: "from-left" })}
                timing={linearTiming({ durationInFrames: 15 })}
            />

            {/* 场景4: LSTM详解 - 预估42.86秒 (1285帧) + 30帧缓冲 = 1315帧 */}
            <TransitionSeries.Sequence durationInFrames={1315}>
                <RNNScene4_LSTM />
                <Html5Audio src={staticFile("RNNVideo/scene4-lstm-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="RNNVideo/scene4-lstm-audio.mp3"
                    captionFile="RNNVideo/scene4-lstm-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场4: 从顶部滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-top" })}
                timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
            />

            {/* 场景5: GRU详解 - 预估35.14秒 (1054帧) + 30帧缓冲 = 1084帧 */}
            <TransitionSeries.Sequence durationInFrames={1084}>
                <RNNScene5_GRU />
                <Html5Audio src={staticFile("RNNVideo/scene5-gru-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="RNNVideo/scene5-gru-audio.mp3"
                    captionFile="RNNVideo/scene5-gru-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场5: 从右侧滑动 */}
            <TransitionSeries.Transition
                presentation={slide({ direction: "from-right" })}
                timing={springTiming({ config: { damping: 180 }, durationInFrames: 22 })}
            />

            {/* 场景6: 实际应用 - 预估56.0秒 (1680帧) + 30帧缓冲 = 1710帧 */}
            <TransitionSeries.Sequence durationInFrames={1710}>
                <RNNScene6_Applications />
                <Html5Audio src={staticFile("RNNVideo/scene6-applications-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="RNNVideo/scene6-applications-audio.mp3"
                    captionFile="RNNVideo/scene6-applications-captions.json"
                    startTimeMs={0}
                />
            </TransitionSeries.Sequence>

            {/* 转场6: 擦除效果 */}
            <TransitionSeries.Transition
                presentation={wipe({ direction: "from-right" })}
                timing={linearTiming({ durationInFrames: 15 })}
            />

            {/* 场景7: 冷知识 - 预估75.71秒 (2271帧) + 30帧缓冲 = 2301帧 */}
            <TransitionSeries.Sequence durationInFrames={2301}>
                <RNNScene7_FunFacts />
                <Html5Audio src={staticFile("RNNVideo/scene7-funfacts-audio.mp3")} volume={0.8} />
                <CaptionComponent
                    audioFile="RNNVideo/scene7-funfacts-audio.mp3"
                    captionFile="RNNVideo/scene7-funfacts-captions.json"
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
