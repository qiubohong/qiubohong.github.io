import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { Scene1_Introduction } from "./scenes/selfattention/Scene1_Introduction";
import { Scene2_Applications } from "./scenes/selfattention/Scene2_Applications";
import { Scene3_CoreConcepts } from "./scenes/selfattention/Scene3_CoreConcepts";
import { Scene4_Workflow } from "./scenes/selfattention/Scene4_Workflow";
import { Scene5_Formula } from "./scenes/selfattention/Scene5_Formula";
import { Scene6_Example } from "./scenes/selfattention/Scene6_Example";
import { Scene7_MultiHead } from "./scenes/selfattention/Scene7_MultiHead";
import { Scene8_Comparison } from "./scenes/selfattention/Scene8_Comparison";
import { Scene9_Summary } from "./scenes/selfattention/Scene9_Summary";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";
import { CaptionComponent } from "./components/CaptionComponent";

interface SelfAttentionVideoProps {
    title?: string;
    showCaptions?: boolean;
    backgroundMusicVolume?: number;
}

export const SelfAttentionVideo: React.FC<SelfAttentionVideoProps> = ({
    title,
    showCaptions = true,
    backgroundMusicVolume = 0.15
}) => {
    // 场景帧数配置（基于实际音频时长 + 30帧缓冲）
    const sceneDurations = {
        scene1: 485,  // 15.19s * 30fps + 30帧缓冲
        scene2: 488,  // 15.29s * 30fps + 30帧缓冲
        scene3: 532,  // 16.75s * 30fps + 30帧缓冲
        scene4: 613,  // 19.46s * 30fps + 30帧缓冲
        scene5: 568,  // 17.95s * 30fps + 30帧缓冲
        scene6: 628,  // 19.94s * 30fps + 30帧缓冲
        scene7: 564,  // 17.81s * 30fps + 30帧缓冲
        scene8: 531,  // 16.73s * 30fps + 30帧缓冲
        scene9: 411,  // 12.72s * 30fps + 30帧缓冲
        endingScene: 140,  // 6秒结尾场景
    };

    const transitionDuration = 15; // 转场时长：15帧（0.5秒）

    // 场景配置数组
    const scenes = [
        {
            id: 'scene1',
            Component: Scene1_Introduction,
            audioFile: 'SelfAttentionVideo/scene1-audio.mp3',
            captionFile: 'SelfAttentionVideo/scene1-captions.json',
            duration: sceneDurations.scene1,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene2',
            Component: Scene2_Applications,
            audioFile: 'SelfAttentionVideo/scene2-audio.mp3',
            captionFile: 'SelfAttentionVideo/scene2-captions.json',
            duration: sceneDurations.scene2,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: 'scene3',
            Component: Scene3_CoreConcepts,
            audioFile: 'SelfAttentionVideo/scene3-audio.mp3',
            captionFile: 'SelfAttentionVideo/scene3-captions.json',
            duration: sceneDurations.scene3,
            transition: fade(),
        },
        {
            id: 'scene4',
            Component: Scene4_Workflow,
            audioFile: 'SelfAttentionVideo/scene4-audio.mp3',
            captionFile: 'SelfAttentionVideo/scene4-captions.json',
            duration: sceneDurations.scene4,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene5',
            Component: Scene5_Formula,
            audioFile: 'SelfAttentionVideo/scene5-audio.mp3',
            captionFile: 'SelfAttentionVideo/scene5-captions.json',
            duration: sceneDurations.scene5,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: 'scene6',
            Component: Scene6_Example,
            audioFile: 'SelfAttentionVideo/scene6-audio.mp3',
            captionFile: 'SelfAttentionVideo/scene6-captions.json',
            duration: sceneDurations.scene6,
            transition: fade(),
        },
        {
            id: 'scene7',
            Component: Scene7_MultiHead,
            audioFile: 'SelfAttentionVideo/scene7-audio.mp3',
            captionFile: 'SelfAttentionVideo/scene7-captions.json',
            duration: sceneDurations.scene7,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene8',
            Component: Scene8_Comparison,
            audioFile: 'SelfAttentionVideo/scene8-audio.mp3',
            captionFile: 'SelfAttentionVideo/scene8-captions.json',
            duration: sceneDurations.scene8,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: 'scene9',
            Component: Scene9_Summary,
            audioFile: 'SelfAttentionVideo/scene9-audio.mp3',
            captionFile: 'SelfAttentionVideo/scene9-captions.json',
            duration: sceneDurations.scene9,
            transition: fade(), // 场景9使用淡入淡出转场
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
                        {scene.transition && (
                            <TransitionSeries.Transition
                                presentation={scene.transition}
                                timing={linearTiming({ durationInFrames: transitionDuration })}
                            />
                        )}
                    </React.Fragment>
                ))}

                {/* 场景8: 结尾收尾 */}
                <TransitionSeries.Sequence durationInFrames={sceneDurations.endingScene}>
                    <AbsoluteFill>
                        <EndingScene />
                        <Audio src={staticFile("scene8-ending.mp3")} volume={0.8} />
                        {showCaptions && (
                            <CaptionComponent
                                audioFile=" scene8-ending.mp3"
                                captionFile=" scene8-ending-captions.json"
                                startTimeMs={57000}
                            />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>
            </TransitionSeries>

        </AbsoluteFill>
    );
};
