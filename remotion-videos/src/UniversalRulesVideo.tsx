import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { URScene1_Introduction } from "./scenes/universalrules/Scene1_Introduction";
import { URScene2_WhatAreRules } from "./scenes/universalrules/Scene2_WhatAreRules";
import { URScene3_WhyImportant } from "./scenes/universalrules/Scene3_WhyImportant";
import { URScene4_ThreeSteps } from "./scenes/universalrules/Scene4_ThreeSteps";
import { URScene5_Example } from "./scenes/universalrules/Scene5_Example";
import { URScene6_Summary } from "./scenes/universalrules/Scene6_Summary";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

interface UniversalRulesVideoProps {
    title?: string;
    showCaptions?: boolean;
}

export const UniversalRulesVideo: React.FC<UniversalRulesVideoProps> = ({
    title,
    showCaptions = true,
}) => {
    // 场景帧数配置（待音频生成后更新）
    const sceneDurations = {
        scene1: 870,   // 占位，待更新
        scene2: 930,   // 占位，待更新
        scene3: 720,   // 占位，待更新
        scene4: 960,   // 占位，待更新
        scene5: 900,   // 占位，待更新
        scene6: 810,   // 占位，待更新
        ending: 180,   // 固定6秒
    };

    const transitionDuration = 15;

    const scenes = [
        {
            id: "scene1",
            Component: URScene1_Introduction,
            audioFile: "UniversalRules/scene1-audio.mp3",
            captionFile: "UniversalRules/scene1-captions.json",
            duration: sceneDurations.scene1,
            transition: fade(),
        },
        {
            id: "scene2",
            Component: URScene2_WhatAreRules,
            audioFile: "UniversalRules/scene2-audio.mp3",
            captionFile: "UniversalRules/scene2-captions.json",
            duration: sceneDurations.scene2,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene3",
            Component: URScene3_WhyImportant,
            audioFile: "UniversalRules/scene3-audio.mp3",
            captionFile: "UniversalRules/scene3-captions.json",
            duration: sceneDurations.scene3,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene4",
            Component: URScene4_ThreeSteps,
            audioFile: "UniversalRules/scene4-audio.mp3",
            captionFile: "UniversalRules/scene4-captions.json",
            duration: sceneDurations.scene4,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene5",
            Component: URScene5_Example,
            audioFile: "UniversalRules/scene5-audio.mp3",
            captionFile: "UniversalRules/scene5-captions.json",
            duration: sceneDurations.scene5,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene6",
            Component: URScene6_Summary,
            audioFile: "UniversalRules/scene6-audio.mp3",
            captionFile: "UniversalRules/scene6-captions.json",
            duration: sceneDurations.scene6,
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

                {/* EndingScene：固定6秒（180帧） */}
                <TransitionSeries.Sequence durationInFrames={sceneDurations.ending}>
                    <AbsoluteFill>
                        <EndingScene />
                        <Audio src={staticFile("UniversalRules/ending-audio.mp3")} volume={0.8} />
                        {showCaptions && (
                            <CaptionDisplay captionFile="UniversalRules/ending-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
