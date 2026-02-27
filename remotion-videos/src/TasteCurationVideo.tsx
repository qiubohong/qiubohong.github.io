import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { TasteScene1_Introduction } from "./scenes/tastecuration/Scene1_Introduction";
import { TasteScene2_WhySelect } from "./scenes/tastecuration/Scene2_WhySelect";
import { TasteScene3_ThreeSteps } from "./scenes/tastecuration/Scene3_ThreeSteps";
import { TasteScene4_TasteLibrary } from "./scenes/tastecuration/Scene4_TasteLibrary";
import { TasteScene5_PreciseExpression } from "./scenes/tastecuration/Scene5_PreciseExpression";
import { TasteScene6_PersonalRules } from "./scenes/tastecuration/Scene6_PersonalRules";
import { TasteScene7_Summary } from "./scenes/tastecuration/Scene7_Summary";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

interface TasteCurationVideoProps {
    title?: string;
    showCaptions?: boolean;
}

export const TasteCurationVideo: React.FC<TasteCurationVideoProps> = ({
    title,
    showCaptions = true,
}) => {
    // 场景帧数配置（基于实际音频时长 + 30帧缓冲）
    const sceneDurations = {
        scene1: 925,   // 29.86s * 30fps = 895帧 + 30缓冲
        scene2: 757,   // 24.24s * 30fps = 727帧 + 30缓冲
        scene3: 644,   // 20.47s * 30fps = 614帧 + 30缓冲
        scene4: 853,   // 27.46s * 30fps = 823帧 + 30缓冲
        scene5: 842,   // 27.07s * 30fps = 812帧 + 30缓冲
        scene6: 714,   // 22.82s * 30fps = 684帧 + 30缓冲
        scene7: 669,   // 21.31s * 30fps = 639帧 + 30缓冲
        ending: 169,   // 4.66s * 30fps = 139帧 + 30缓冲
    };

    const transitionDuration = 15; // 转场时长：15帧（0.5秒）

    // 场景配置数组
    const scenes = [
        {
            id: 'scene1',
            Component: TasteScene1_Introduction,
            audioFile: 'TasteCuration/scene1-audio.mp3',
            captionFile: 'TasteCuration/scene1-captions.json',
            duration: sceneDurations.scene1,
            transition: fade(),
        },
        {
            id: 'scene2',
            Component: TasteScene2_WhySelect,
            audioFile: 'TasteCuration/scene2-audio.mp3',
            captionFile: 'TasteCuration/scene2-captions.json',
            duration: sceneDurations.scene2,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene3',
            Component: TasteScene3_ThreeSteps,
            audioFile: 'TasteCuration/scene3-audio.mp3',
            captionFile: 'TasteCuration/scene3-captions.json',
            duration: sceneDurations.scene3,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: 'scene4',
            Component: TasteScene4_TasteLibrary,
            audioFile: 'TasteCuration/scene4-audio.mp3',
            captionFile: 'TasteCuration/scene4-captions.json',
            duration: sceneDurations.scene4,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene5',
            Component: TasteScene5_PreciseExpression,
            audioFile: 'TasteCuration/scene5-audio.mp3',
            captionFile: 'TasteCuration/scene5-captions.json',
            duration: sceneDurations.scene5,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: 'scene6',
            Component: TasteScene6_PersonalRules,
            audioFile: 'TasteCuration/scene6-audio.mp3',
            captionFile: 'TasteCuration/scene6-captions.json',
            duration: sceneDurations.scene6,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene7',
            Component: TasteScene7_Summary,
            audioFile: 'TasteCuration/scene7-audio.mp3',
            captionFile: 'TasteCuration/scene7-captions.json',
            duration: sceneDurations.scene7,
            transition: fade(),
        },
        {
            id: 'ending',
            Component: EndingScene,
            audioFile: 'TasteCuration/ending-audio.mp3',
            captionFile: 'TasteCuration/ending-captions.json',
            duration: sceneDurations.ending,
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
