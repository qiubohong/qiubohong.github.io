import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { MasterScene1_Introduction } from "./scenes/masterprompt/Scene1_Introduction";
import { MasterScene2_WhyStranger } from "./scenes/masterprompt/Scene2_WhyStranger";
import { MasterScene3_WhatToWrite } from "./scenes/masterprompt/Scene3_WhatToWrite";
import { MasterScene4_LazyTip } from "./scenes/masterprompt/Scene4_LazyTip";
import { MasterScene5_MultiIdentity } from "./scenes/masterprompt/Scene5_MultiIdentity";
import { MasterScene6_Summary } from "./scenes/masterprompt/Scene6_Summary";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

interface MasterPromptVideoProps {
    title?: string;
    showCaptions?: boolean;
}

export const MasterPromptVideo: React.FC<MasterPromptVideoProps> = ({
    title,
    showCaptions = true,
}) => {
    // 场景帧数配置（基于实际音频时长 + 30帧缓冲）
    const sceneDurations = {
        scene1: 813,   // 26.11s → 783帧 + 30缓冲
        scene2: 730,   // 23.35s → 700帧 + 30缓冲
        scene3: 678,   // 21.60s → 648帧 + 30缓冲
        scene4: 980,   // 31.68s → 950帧 + 30缓冲
        scene5: 909,   // 29.30s → 879帧 + 30缓冲
        scene6: 860,   // 27.67s → 830帧 + 30缓冲
        ending: 153,   // 4.10s → 123帧 + 30缓冲
    };

    const transitionDuration = 15; // 转场时长：15帧（0.5秒）

    // 场景配置数组
    const scenes = [
        {
            id: "scene1",
            Component: MasterScene1_Introduction,
            audioFile: "MasterPrompt/scene1-audio.mp3",
            captionFile: "MasterPrompt/scene1-captions.json",
            duration: sceneDurations.scene1,
            transition: fade(),
        },
        {
            id: "scene2",
            Component: MasterScene2_WhyStranger,
            audioFile: "MasterPrompt/scene2-audio.mp3",
            captionFile: "MasterPrompt/scene2-captions.json",
            duration: sceneDurations.scene2,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene3",
            Component: MasterScene3_WhatToWrite,
            audioFile: "MasterPrompt/scene3-audio.mp3",
            captionFile: "MasterPrompt/scene3-captions.json",
            duration: sceneDurations.scene3,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene4",
            Component: MasterScene4_LazyTip,
            audioFile: "MasterPrompt/scene4-audio.mp3",
            captionFile: "MasterPrompt/scene4-captions.json",
            duration: sceneDurations.scene4,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene5",
            Component: MasterScene5_MultiIdentity,
            audioFile: "MasterPrompt/scene5-audio.mp3",
            captionFile: "MasterPrompt/scene5-captions.json",
            duration: sceneDurations.scene5,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene6",
            Component: MasterScene6_Summary,
            audioFile: "MasterPrompt/scene6-audio.mp3",
            captionFile: "MasterPrompt/scene6-captions.json",
            duration: sceneDurations.scene6,
            transition: fade(),
        },
    ];

    return (
        <AbsoluteFill style={{ backgroundColor: "#000000" }}>
            <TransitionSeries>
                {scenes.map((scene, index) => (
                    <React.Fragment key={scene.id}>
                        {/* 场景内容 */}
                        <TransitionSeries.Sequence durationInFrames={scene.duration}>
                            <AbsoluteFill>
                                {/* 场景组件 */}
                                <scene.Component />

                                {/* 场景音频 */}
                                <Audio
                                    src={staticFile(scene.audioFile)}
                                    volume={0.8}
                                />

                                {/* 字幕显示 */}
                                {showCaptions && (
                                    <CaptionDisplay captionFile={scene.captionFile} />
                                )}
                            </AbsoluteFill>
                        </TransitionSeries.Sequence>

                        {/* 转场效果（最后一个场景除外） */}
                        {index < scenes.length - 1 && scene.transition && (
                            <TransitionSeries.Transition
                                presentation={scene.transition}
                                timing={linearTiming({ durationInFrames: transitionDuration })}
                            />
                        )}
                    </React.Fragment>
                ))}
            </TransitionSeries>
        </AbsoluteFill>
    );
};
