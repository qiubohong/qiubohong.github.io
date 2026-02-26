import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { PromptScene1_Introduction } from "./scenes/promptengineering/Scene1_Introduction";
import { PromptScene2_WhyAsk } from "./scenes/promptengineering/Scene2_WhyAsk";
import { PromptScene3_FourSteps } from "./scenes/promptengineering/Scene3_FourSteps";
import { PromptScene4_Role } from "./scenes/promptengineering/Scene4_Role";
import { PromptScene5_Background } from "./scenes/promptengineering/Scene5_Background";
import { PromptScene6_Task } from "./scenes/promptengineering/Scene6_Task";
import { PromptScene7_Format } from "./scenes/promptengineering/Scene7_Format";
import { PromptScene8_HiddenTip } from "./scenes/promptengineering/Scene8_HiddenTip";
import { PromptScene9_Example } from "./scenes/promptengineering/Scene9_Example";
import { PromptScene10_Summary } from "./scenes/promptengineering/Scene10_Summary";
import { CaptionDisplay } from "./components/CaptionDisplay";

interface PromptEngineeringVideoProps {
    title?: string;
    showCaptions?: boolean;
}

export const PromptEngineeringVideo: React.FC<PromptEngineeringVideoProps> = ({
    title,
    showCaptions = true,
}) => {
    // 场景帧数配置（基于实际音频时长 + 30帧缓冲）
    const sceneDurations = {
        scene1: 634,   // 19.139s * 30fps + 30帧缓冲
        scene2: 748,   // 23.936s * 30fps + 30帧缓冲
        scene3: 519,   // 16.303s * 30fps + 30帧缓冲
        scene4: 782,   // 25.083s * 30fps + 30帧缓冲
        scene5: 613,   // 19.459s * 30fps + 30帧缓冲
        scene6: 563,   // 17.780s * 30fps + 30帧缓冲
        scene7: 647,   // 20.578s * 30fps + 30帧缓冲
        scene8: 709,   // 22.657s * 30fps + 30帧缓冲
        scene9: 1081,  // 35.052s * 30fps + 30帧缓冲
        scene10: 668,  // 21.297s * 30fps + 30帧缓冲
    };

    const transitionDuration = 15; // 转场时长：15帧（0.5秒）

    // 场景配置数组
    const scenes = [
        {
            id: 'scene1',
            Component: PromptScene1_Introduction,
            audioFile: 'PromptEngineering/scene1-audio.mp3',
            captionFile: 'PromptEngineering/scene1-captions.json',
            duration: sceneDurations.scene1,
            transition: fade(),
        },
        {
            id: 'scene2',
            Component: PromptScene2_WhyAsk,
            audioFile: 'PromptEngineering/scene2-audio.mp3',
            captionFile: 'PromptEngineering/scene2-captions.json',
            duration: sceneDurations.scene2,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene3',
            Component: PromptScene3_FourSteps,
            audioFile: 'PromptEngineering/scene3-audio.mp3',
            captionFile: 'PromptEngineering/scene3-captions.json',
            duration: sceneDurations.scene3,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: 'scene4',
            Component: PromptScene4_Role,
            audioFile: 'PromptEngineering/scene4-audio.mp3',
            captionFile: 'PromptEngineering/scene4-captions.json',
            duration: sceneDurations.scene4,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene5',
            Component: PromptScene5_Background,
            audioFile: 'PromptEngineering/scene5-audio.mp3',
            captionFile: 'PromptEngineering/scene5-captions.json',
            duration: sceneDurations.scene5,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: 'scene6',
            Component: PromptScene6_Task,
            audioFile: 'PromptEngineering/scene6-audio.mp3',
            captionFile: 'PromptEngineering/scene6-captions.json',
            duration: sceneDurations.scene6,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene7',
            Component: PromptScene7_Format,
            audioFile: 'PromptEngineering/scene7-audio.mp3',
            captionFile: 'PromptEngineering/scene7-captions.json',
            duration: sceneDurations.scene7,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: 'scene8',
            Component: PromptScene8_HiddenTip,
            audioFile: 'PromptEngineering/scene8-audio.mp3',
            captionFile: 'PromptEngineering/scene8-captions.json',
            duration: sceneDurations.scene8,
            transition: fade(),
        },
        {
            id: 'scene9',
            Component: PromptScene9_Example,
            audioFile: 'PromptEngineering/scene9-audio.mp3',
            captionFile: 'PromptEngineering/scene9-captions.json',
            duration: sceneDurations.scene9,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene10',
            Component: PromptScene10_Summary,
            audioFile: 'PromptEngineering/scene10-audio.mp3',
            captionFile: 'PromptEngineering/scene10-captions.json',
            duration: sceneDurations.scene10,
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
