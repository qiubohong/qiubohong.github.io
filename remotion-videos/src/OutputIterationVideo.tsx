import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { OutputScene1_Introduction } from "./scenes/outputiteration/Scene1_Introduction";
import { OutputScene2_WhySettle } from "./scenes/outputiteration/Scene2_WhySettle";
import { OutputScene3_SpecificFeedback } from "./scenes/outputiteration/Scene3_SpecificFeedback";
import { OutputScene4_CanvasFeature } from "./scenes/outputiteration/Scene4_CanvasFeature";
import { OutputScene5_Summary } from "./scenes/outputiteration/Scene5_Summary";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

interface OutputIterationVideoProps {
    title?: string;
    showCaptions?: boolean;
}

export const OutputIterationVideo: React.FC<OutputIterationVideoProps> = ({
    title,
    showCaptions = true,
}) => {
    // 场景帧数配置（基于实际音频时长 + 30帧缓冲，待音频生成后更新）
    const sceneDurations = {
        scene1: 780,   // 约25s，待更新
        scene2: 840,   // 约27s，待更新
        scene3: 900,   // 约29s，待更新
        scene4: 900,   // 约29s，待更新
        scene5: 990,   // 约32s，待更新
        ending: 180,   // 固定6秒
    };

    const transitionDuration = 15;

    const scenes = [
        {
            id: "scene1",
            Component: OutputScene1_Introduction,
            audioFile: "OutputIteration/scene1-audio.mp3",
            captionFile: "OutputIteration/scene1-captions.json",
            duration: sceneDurations.scene1,
            transition: fade(),
        },
        {
            id: "scene2",
            Component: OutputScene2_WhySettle,
            audioFile: "OutputIteration/scene2-audio.mp3",
            captionFile: "OutputIteration/scene2-captions.json",
            duration: sceneDurations.scene2,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene3",
            Component: OutputScene3_SpecificFeedback,
            audioFile: "OutputIteration/scene3-audio.mp3",
            captionFile: "OutputIteration/scene3-captions.json",
            duration: sceneDurations.scene3,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene4",
            Component: OutputScene4_CanvasFeature,
            audioFile: "OutputIteration/scene4-audio.mp3",
            captionFile: "OutputIteration/scene4-captions.json",
            duration: sceneDurations.scene4,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene5",
            Component: OutputScene5_Summary,
            audioFile: "OutputIteration/scene5-audio.mp3",
            captionFile: "OutputIteration/scene5-captions.json",
            duration: sceneDurations.scene5,
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

                {/* 最后一个场景的转场 */}
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: transitionDuration })}
                />

                {/* EndingScene：固定6秒（180帧） */}
                <TransitionSeries.Sequence durationInFrames={sceneDurations.ending}>
                    <AbsoluteFill>
                        <EndingScene />
                        <Audio src={staticFile("OutputIteration/ending-audio.mp3")} volume={0.8} />
                        {showCaptions && (
                            <CaptionDisplay captionFile="OutputIteration/ending-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
