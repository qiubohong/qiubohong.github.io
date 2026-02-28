import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { ASSScene1_Intro } from "./scenes/aiskillsummary/Scene1_Intro";
import { ASSScene2_NineSkills } from "./scenes/aiskillsummary/Scene2_NineSkills";
import { ASSScene3_Case1_Weekly } from "./scenes/aiskillsummary/Scene3_Case1_Weekly";
import { ASSScene4_Case2_Story } from "./scenes/aiskillsummary/Scene4_Case2_Story";
import { ASSScene5_Case3_Decision } from "./scenes/aiskillsummary/Scene5_Case3_Decision";
import { ASSScene6_Case4_Team } from "./scenes/aiskillsummary/Scene6_Case4_Team";
import { ASSScene7_Case5_Learning } from "./scenes/aiskillsummary/Scene7_Case5_Learning";
import { ASSScene8_ComboCard } from "./scenes/aiskillsummary/Scene8_ComboCard";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

interface AISkillSummaryVideoProps {
    title?: string;
    showCaptions?: boolean;
}

export const AISkillSummaryVideo: React.FC<AISkillSummaryVideoProps> = ({
    title,
    showCaptions = true,
}) => {
    // 场景帧数配置（根据实际音频时长计算，30fps，+30帧缓冲）
    const sceneDurations = {
        scene1: 832,   // 开场对比，26.74s
        scene2: 858,   // 九技能回顾，27.60s
        scene3: 819,   // 职场周报案例，26.30s
        scene4: 934,   // 编故事案例，30.14s
        scene5: 1091,  // 决策案例，35.38s
        scene6: 922,   // 团队案例，29.76s
        scene7: 899,   // 学习案例，28.99s
        scene8: 1083,  // 组合卡+金句，35.11s
    };

    const transitionDuration = 15;

    const scenes = [
        {
            id: "scene1",
            Component: ASSScene1_Intro,
            audioFile: "AISkillSummary/scene1-audio.mp3",
            captionFile: "AISkillSummary/scene1-captions.json",
            duration: sceneDurations.scene1,
            transition: fade(),
        },
        {
            id: "scene2",
            Component: ASSScene2_NineSkills,
            audioFile: "AISkillSummary/scene2-audio.mp3",
            captionFile: "AISkillSummary/scene2-captions.json",
            duration: sceneDurations.scene2,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene3",
            Component: ASSScene3_Case1_Weekly,
            audioFile: "AISkillSummary/scene3-audio.mp3",
            captionFile: "AISkillSummary/scene3-captions.json",
            duration: sceneDurations.scene3,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene4",
            Component: ASSScene4_Case2_Story,
            audioFile: "AISkillSummary/scene4-audio.mp3",
            captionFile: "AISkillSummary/scene4-captions.json",
            duration: sceneDurations.scene4,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene5",
            Component: ASSScene5_Case3_Decision,
            audioFile: "AISkillSummary/scene5-audio.mp3",
            captionFile: "AISkillSummary/scene5-captions.json",
            duration: sceneDurations.scene5,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene6",
            Component: ASSScene6_Case4_Team,
            audioFile: "AISkillSummary/scene6-audio.mp3",
            captionFile: "AISkillSummary/scene6-captions.json",
            duration: sceneDurations.scene6,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: "scene7",
            Component: ASSScene7_Case5_Learning,
            audioFile: "AISkillSummary/scene7-audio.mp3",
            captionFile: "AISkillSummary/scene7-captions.json",
            duration: sceneDurations.scene7,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: "scene8",
            Component: ASSScene8_ComboCard,
            audioFile: "AISkillSummary/scene8-audio.mp3",
            captionFile: "AISkillSummary/scene8-captions.json",
            duration: sceneDurations.scene8,
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
