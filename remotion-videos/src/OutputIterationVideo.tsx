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
    // 场景帧数配置（基于实际音频时长 + 30帧缓冲）
    const sceneDurations = {
        scene1: 832,   // 26.74s * 30 + 30缓冲
        scene2: 788,   // 25.27s * 30 + 30缓冲
        scene3: 791,   // 25.39s * 30 + 30缓冲
        scene4: 858,   // 27.62s * 30 + 30缓冲
        scene5: 993,   // 32.11s * 30 + 30缓冲
        ending: 120,   // 3.02s * 30 + 30缓冲
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
            </TransitionSeries>
        </AbsoluteFill>
    );
};
