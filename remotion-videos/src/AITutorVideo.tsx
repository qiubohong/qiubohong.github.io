import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { ATScene1_Introduction } from "./scenes/aitutor/Scene1_Introduction";
import { ATScene2_WhyAI } from "./scenes/aitutor/Scene2_WhyAI";
import { ATScene3_Step1_Tell } from "./scenes/aitutor/Scene3_Step1_Tell";
import { ATScene4_Step2_Adjust } from "./scenes/aitutor/Scene4_Step2_Adjust";
import { ATScene5_Step3_Listen } from "./scenes/aitutor/Scene5_Step3_Listen";
import { ATScene6_GrowthPartner } from "./scenes/aitutor/Scene6_GrowthPartner";
import { ATScene7_Summary } from "./scenes/aitutor/Scene7_Summary";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

interface AITutorVideoProps {
    title?: string;
    showCaptions?: boolean;
}

export const AITutorVideo: React.FC<AITutorVideoProps> = ({
    title,
    showCaptions = true,
}) => {
    // 场景帧数配置（根据字幕文件时间计算，30fps + 30帧缓冲）
    const sceneDurations = {
        scene1: 750,   // 24s × 30fps + 30帧缓冲
        scene2: 780,   // 25s × 30fps + 30帧缓冲
        scene3: 930,   // 30s × 30fps + 30帧缓冲
        scene4: 930,   // 30s × 30fps + 30帧缓冲
        scene5: 870,   // 28s × 30fps + 30帧缓冲
        scene6: 750,   // 24s × 30fps + 30帧缓冲
        scene7: 870,   // 28s × 30fps + 30帧缓冲
    };

    const transitionDuration = 15;

    const scenes = [
        {
            id: "scene1",
            Component: ATScene1_Introduction,
            audioFile: "AITutor/scene1-audio.mp3",
            captionFile: "AITutor/scene1-captions.json",
            duration: sceneDurations.scene1,
            transition: fade(),
        },
        {
            id: "scene2",
            Component: ATScene2_WhyAI,
            audioFile: "AITutor/scene2-audio.mp3",
            captionFile: "AITutor/scene2-captions.json",
            duration: sceneDurations.scene2,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene3",
            Component: ATScene3_Step1_Tell,
            audioFile: "AITutor/scene3-audio.mp3",
            captionFile: "AITutor/scene3-captions.json",
            duration: sceneDurations.scene3,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene4",
            Component: ATScene4_Step2_Adjust,
            audioFile: "AITutor/scene4-audio.mp3",
            captionFile: "AITutor/scene4-captions.json",
            duration: sceneDurations.scene4,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene5",
            Component: ATScene5_Step3_Listen,
            audioFile: "AITutor/scene5-audio.mp3",
            captionFile: "AITutor/scene5-captions.json",
            duration: sceneDurations.scene5,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene6",
            Component: ATScene6_GrowthPartner,
            audioFile: "AITutor/scene6-audio.mp3",
            captionFile: "AITutor/scene6-captions.json",
            duration: sceneDurations.scene6,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene7",
            Component: ATScene7_Summary,
            audioFile: "AITutor/scene7-audio.mp3",
            captionFile: "AITutor/scene7-captions.json",
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
            </TransitionSeries>
        </AbsoluteFill>
    );
};
