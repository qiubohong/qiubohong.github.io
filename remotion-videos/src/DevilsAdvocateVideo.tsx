import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { DAScene1_Introduction } from "./scenes/devilsadvocate/Scene1_Introduction";
import { DAScene2_AIPersonality } from "./scenes/devilsadvocate/Scene2_AIPersonality";
import { DAScene3_ThreeSteps } from "./scenes/devilsadvocate/Scene3_ThreeSteps";
import { DAScene4_DeepDive } from "./scenes/devilsadvocate/Scene4_DeepDive";
import { DAScene5_Benefits } from "./scenes/devilsadvocate/Scene5_Benefits";
import { DAScene6_Summary } from "./scenes/devilsadvocate/Scene6_Summary";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

interface DevilsAdvocateVideoProps {
    title?: string;
    showCaptions?: boolean;
}

export const DevilsAdvocateVideo: React.FC<DevilsAdvocateVideoProps> = ({
    title,
    showCaptions = true,
}) => {
    // 场景帧数配置（基于实际音频时长 @30fps + 30帧缓冲）
    const sceneDurations = {
        scene1: 782,   // 25.056s * 30 + 30
        scene2: 623,   // 19.776s * 30 + 30
        scene3: 680,   // 21.672s * 30 + 30
        scene4: 700,   // 22.320s * 30 + 30
        scene5: 743,   // 23.760s * 30 + 30
        scene6: 602,   // 19.056s * 30 + 30
    };

    const transitionDuration = 15;

    const scenes = [
        {
            id: "scene1",
            Component: DAScene1_Introduction,
            audioFile: "DevilsAdvocate/scene1-audio.mp3",
            captionFile: "DevilsAdvocate/scene1-captions.json",
            duration: sceneDurations.scene1,
            transition: fade(),
        },
        {
            id: "scene2",
            Component: DAScene2_AIPersonality,
            audioFile: "DevilsAdvocate/scene2-audio.mp3",
            captionFile: "DevilsAdvocate/scene2-captions.json",
            duration: sceneDurations.scene2,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene3",
            Component: DAScene3_ThreeSteps,
            audioFile: "DevilsAdvocate/scene3-audio.mp3",
            captionFile: "DevilsAdvocate/scene3-captions.json",
            duration: sceneDurations.scene3,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene4",
            Component: DAScene4_DeepDive,
            audioFile: "DevilsAdvocate/scene4-audio.mp3",
            captionFile: "DevilsAdvocate/scene4-captions.json",
            duration: sceneDurations.scene4,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene5",
            Component: DAScene5_Benefits,
            audioFile: "DevilsAdvocate/scene5-audio.mp3",
            captionFile: "DevilsAdvocate/scene5-captions.json",
            duration: sceneDurations.scene5,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene6",
            Component: DAScene6_Summary,
            audioFile: "DevilsAdvocate/scene6-audio.mp3",
            captionFile: "DevilsAdvocate/scene6-captions.json",
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

            </TransitionSeries>
        </AbsoluteFill>
    );
};
