import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { KGScene1_Introduction } from "./scenes/knowledgegarden/Scene1_Introduction";
import { KGScene2_WhyMess } from "./scenes/knowledgegarden/Scene2_WhyMess";
import { KGScene3_Step1_Folders } from "./scenes/knowledgegarden/Scene3_Step1_Folders";
import { KGScene4_Step2_PDF } from "./scenes/knowledgegarden/Scene4_Step2_PDF";
import { KGScene5_Step3_Dept } from "./scenes/knowledgegarden/Scene5_Step3_Dept";
import { KGScene6_Maintenance } from "./scenes/knowledgegarden/Scene6_Maintenance";
import { KGScene7_Summary } from "./scenes/knowledgegarden/Scene7_Summary";
import { CaptionDisplay } from "./components/CaptionDisplay";

interface KnowledgeGardenVideoProps {
    title?: string;
    showCaptions?: boolean;
}

export const KnowledgeGardenVideo: React.FC<KnowledgeGardenVideoProps> = ({
    title,
    showCaptions = true,
}) => {
    // 场景帧数配置（基于音频实际时长 @30fps + 30帧缓冲）
    const sceneDurations = {
        scene1: 597,   // 18.93s
        scene2: 732,   // 23.40s
        scene3: 734,   // 23.48s
        scene4: 741,   // 23.72s
        scene5: 776,   // 24.89s
        scene6: 767,   // 24.58s
        scene7: 813,   // 26.12s
    };

    const transitionDuration = 15;

    const scenes = [
        {
            id: "scene1",
            Component: KGScene1_Introduction,
            audioFile: "KnowledgeGarden/scene1-audio.mp3",
            captionFile: "KnowledgeGarden/scene1-captions.json",
            duration: sceneDurations.scene1,
            transition: fade(),
        },
        {
            id: "scene2",
            Component: KGScene2_WhyMess,
            audioFile: "KnowledgeGarden/scene2-audio.mp3",
            captionFile: "KnowledgeGarden/scene2-captions.json",
            duration: sceneDurations.scene2,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene3",
            Component: KGScene3_Step1_Folders,
            audioFile: "KnowledgeGarden/scene3-audio.mp3",
            captionFile: "KnowledgeGarden/scene3-captions.json",
            duration: sceneDurations.scene3,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene4",
            Component: KGScene4_Step2_PDF,
            audioFile: "KnowledgeGarden/scene4-audio.mp3",
            captionFile: "KnowledgeGarden/scene4-captions.json",
            duration: sceneDurations.scene4,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene5",
            Component: KGScene5_Step3_Dept,
            audioFile: "KnowledgeGarden/scene5-audio.mp3",
            captionFile: "KnowledgeGarden/scene5-captions.json",
            duration: sceneDurations.scene5,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene6",
            Component: KGScene6_Maintenance,
            audioFile: "KnowledgeGarden/scene6-audio.mp3",
            captionFile: "KnowledgeGarden/scene6-captions.json",
            duration: sceneDurations.scene6,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene7",
            Component: KGScene7_Summary,
            audioFile: "KnowledgeGarden/scene7-audio.mp3",
            captionFile: "KnowledgeGarden/scene7-captions.json",
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
            </TransitionSeries>
        </AbsoluteFill>
    );
};
