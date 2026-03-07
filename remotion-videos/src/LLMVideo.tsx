import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { Scene1_Introduction } from "./scenes/llm/Scene1_Introduction";
import { Scene2_CoreBreakthrough } from "./scenes/llm/Scene2_CoreBreakthrough";
import { Scene3_WhySmart } from "./scenes/llm/Scene3_WhySmart";
import { Scene4_HowItWorks } from "./scenes/llm/Scene4_HowItWorks";
import { Scene5_Architectures } from "./scenes/llm/Scene5_Architectures";
import { Scene6_FunFacts } from "./scenes/llm/Scene6_FunFacts";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

interface LLMVideoProps {
    title?: string;
    showCaptions?: boolean;
    backgroundMusicVolume?: number;
}

export const LLMVideo: React.FC<LLMVideoProps> = ({
    title,
    showCaptions = true,
    backgroundMusicVolume = 0.15
}) => {
    // 场景帧数配置（基于音频时长 + 30帧缓冲）
    const sceneDurations = {
        scene1: 902,  // 29.08秒音频 (872帧) + 30帧缓冲
        scene2: 805,  // 25.86秒音频 (775帧) + 30帧缓冲
        scene3: 1230, // 40.00秒音频 (1200帧) + 30帧缓冲
        scene4: 1016, // 32.89秒音频 (986帧) + 30帧缓冲
        scene5: 1076, // 34.89秒音频 (1046帧) + 30帧缓冲
        scene6: 894,  // 28.81秒音频 (864帧) + 30帧缓冲
        ending: 118,  // 2.95秒音频 (88帧) + 30帧缓冲
    };

    const transitionDuration = 15; // 转场时长：15帧（0.5秒）

    // 场景配置数组
    const scenes = [
        {
            id: 'scene1',
            Component: Scene1_Introduction,
            audioFile: 'LLMVideo/scene1-audio.mp3',
            captionFile: 'LLMVideo/scene1-captions.json',
            duration: sceneDurations.scene1,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene2',
            Component: Scene2_CoreBreakthrough,
            audioFile: 'LLMVideo/scene2-audio.mp3',
            captionFile: 'LLMVideo/scene2-captions.json',
            duration: sceneDurations.scene2,
            transition: fade(),
        },
        {
            id: 'scene3',
            Component: Scene3_WhySmart,
            audioFile: 'LLMVideo/scene3-audio.mp3',
            captionFile: 'LLMVideo/scene3-captions.json',
            duration: sceneDurations.scene3,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: 'scene4',
            Component: Scene4_HowItWorks,
            audioFile: 'LLMVideo/scene4-audio.mp3',
            captionFile: 'LLMVideo/scene4-captions.json',
            duration: sceneDurations.scene4,
            transition: fade(),
        },
        {
            id: 'scene5',
            Component: Scene5_Architectures,
            audioFile: 'LLMVideo/scene5-audio.mp3',
            captionFile: 'LLMVideo/scene5-captions.json',
            duration: sceneDurations.scene5,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene6',
            Component: Scene6_FunFacts,
            audioFile: 'LLMVideo/scene6-audio.mp3',
            captionFile: 'LLMVideo/scene6-captions.json',
            duration: sceneDurations.scene6,
            transition: fade(),
        },
    ];

    return (
        <AbsoluteFill style={{ backgroundColor: "#000000" }}>
            <TransitionSeries>
                {/* 内容场景 */}
                {scenes.map((scene, index) => (
                    <React.Fragment key={scene.id}>
                        <TransitionSeries.Sequence durationInFrames={scene.duration}>
                            <AbsoluteFill>
                                <scene.Component />
                                <Audio
                                    src={staticFile(scene.audioFile)}
                                    volume={0.8}
                                />
                                {showCaptions && (
                                    <CaptionDisplay captionFile={scene.captionFile} />
                                )}
                            </AbsoluteFill>
                        </TransitionSeries.Sequence>

                        {/* 转场效果 */}
                        {scene.transition && (
                            <TransitionSeries.Transition
                                presentation={scene.transition}
                                timing={linearTiming({ durationInFrames: transitionDuration })}
                            />
                        )}
                    </React.Fragment>
                ))}

                {/* 结尾场景 */}
                <TransitionSeries.Sequence durationInFrames={sceneDurations.ending}>
                    <AbsoluteFill>
                        <EndingScene
                            mainTitle="5分钟 AI"
                            subtitle="每天搞懂一个知识点！"
                            description="LLM大模型 - AI技术的通用智能革命"
                        />
                        <Audio
                            src={staticFile("LLMVideo/ending-audio.mp3")}
                            volume={0.8}
                        />
                        {showCaptions && (
                            <CaptionDisplay captionFile="LLMVideo/ending-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
