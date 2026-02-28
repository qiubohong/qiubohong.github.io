import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { CCScene1_Introduction } from "./scenes/contextcompression/Scene1_Introduction";
import { CCScene2_WhyOverload } from "./scenes/contextcompression/Scene2_WhyOverload";
import { CCScene3_WhatIsCompression } from "./scenes/contextcompression/Scene3_WhatIsCompression";
import { CCScene4_ThreeSteps } from "./scenes/contextcompression/Scene4_ThreeSteps";
import { CCScene5_Advanced } from "./scenes/contextcompression/Scene5_Advanced";
import { CCScene6_UseCases } from "./scenes/contextcompression/Scene6_UseCases";
import { CCScene7_Summary } from "./scenes/contextcompression/Scene7_Summary";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

interface ContextCompressionVideoProps {
    title?: string;
    showCaptions?: boolean;
}

export const ContextCompressionVideo: React.FC<ContextCompressionVideoProps> = ({
    title,
    showCaptions = true,
}) => {
    // 场景帧数配置（待音频生成后更新）
    const sceneDurations = {
        scene1: 780,   // 占位，待更新
        scene2: 810,   // 占位，待更新
        scene3: 810,   // 占位，待更新
        scene4: 840,   // 占位，待更新
        scene5: 660,   // 占位，待更新
        scene6: 810,   // 占位，待更新
        scene7: 780,   // 占位，待更新
    };

    const transitionDuration = 15;

    const scenes = [
        {
            id: "scene1",
            Component: CCScene1_Introduction,
            audioFile: "ContextCompression/scene1-audio.mp3",
            captionFile: "ContextCompression/scene1-captions.json",
            duration: sceneDurations.scene1,
            transition: fade(),
        },
        {
            id: "scene2",
            Component: CCScene2_WhyOverload,
            audioFile: "ContextCompression/scene2-audio.mp3",
            captionFile: "ContextCompression/scene2-captions.json",
            duration: sceneDurations.scene2,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene3",
            Component: CCScene3_WhatIsCompression,
            audioFile: "ContextCompression/scene3-audio.mp3",
            captionFile: "ContextCompression/scene3-captions.json",
            duration: sceneDurations.scene3,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene4",
            Component: CCScene4_ThreeSteps,
            audioFile: "ContextCompression/scene4-audio.mp3",
            captionFile: "ContextCompression/scene4-captions.json",
            duration: sceneDurations.scene4,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene5",
            Component: CCScene5_Advanced,
            audioFile: "ContextCompression/scene5-audio.mp3",
            captionFile: "ContextCompression/scene5-captions.json",
            duration: sceneDurations.scene5,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene6",
            Component: CCScene6_UseCases,
            audioFile: "ContextCompression/scene6-audio.mp3",
            captionFile: "ContextCompression/scene6-captions.json",
            duration: sceneDurations.scene6,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene7",
            Component: CCScene7_Summary,
            audioFile: "ContextCompression/scene7-audio.mp3",
            captionFile: "ContextCompression/scene7-captions.json",
            duration: sceneDurations.scene7,
            transition: fade(),
        },
    ];

    return (
        <AbsoluteFill style={{ backgroundColor: "#000000" }}>
            <TransitionSeries>
                {scenes.map((scene, index) => (
                    <React.Fragment key={scene.id}>
                        <TransitionSeries.Sequence durationInFrames={scene.duration}>
                            <AbsoluteFill>
                                <scene.Component />
                                <Audio src={staticFile(scene.audioFile)} volume={0.8} />
                                {showCaptions && (
                                    <CaptionDisplay captionFile={scene.captionFile} />
                                )}
                            </AbsoluteFill>
                        </TransitionSeries.Sequence>

                        {index < scenes.length - 1 && scene.transition && (
                            <TransitionSeries.Transition
                                presentation={scene.transition}
                                timing={linearTiming({ durationInFrames: transitionDuration })}
                            />
                        )}
                    </React.Fragment>
                ))}

                {/* 转场到 EndingScene */}
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: transitionDuration })}
                />

                {/* EndingScene：固定 180 帧（6秒） */}
                <TransitionSeries.Sequence durationInFrames={180}>
                    <AbsoluteFill>
                        <EndingScene />
                        <Audio src={staticFile("ContextCompression/ending-audio.mp3")} volume={0.8} />
                        {showCaptions && (
                            <CaptionDisplay captionFile="ContextCompression/ending-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
