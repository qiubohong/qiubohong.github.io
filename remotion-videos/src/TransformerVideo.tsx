import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { Scene1_Introduction } from "./scenes/transformer/Scene1_Introduction";
import { Scene2_CoreConcept } from "./scenes/transformer/Scene2_CoreConcept";
import { Scene3_Structure } from "./scenes/transformer/Scene3_Structure";
import { Scene4_Innovation } from "./scenes/transformer/Scene4_Innovation";
import { Scene5_Applications } from "./scenes/transformer/Scene5_Applications";
import { Scene6_FunFacts } from "./scenes/transformer/Scene6_FunFacts";
import { Scene7_Ending } from "./scenes/transformer/Scene7_Ending";
import { CaptionDisplay } from "./components/CaptionDisplay";

interface TransformerVideoProps {
    title?: string;
    showCaptions?: boolean;
    backgroundMusicVolume?: number;
}

export const TransformerVideo: React.FC<TransformerVideoProps> = ({
    title,
    showCaptions = true,
    backgroundMusicVolume = 0.15
}) => {
    // 场景帧数配置（基于实际音频时长 + 30帧缓冲）
    const sceneDurations = {
        scene1: 493,  // 15.46秒音频 (463帧) + 30帧缓冲
        scene2: 501,  // 15.70秒音频 (471帧) + 30帧缓冲
        scene3: 570,  // 18.02秒音频 (540帧) + 30帧缓冲
        scene4: 443,  // 13.78秒音频 (413帧) + 30帧缓冲
        scene5: 584,  // 18.50秒音频 (554帧) + 30帧缓冲
        scene6: 791,  // 25.38秒音频 (761帧) + 30帧缓冲
        scene7: 363,  // 11.10秒音频 (333帧) + 30帧缓冲
    };

    const transitionDuration = 15; // 转场时长：15帧（0.5秒）

    // 场景配置数组，便于管理
    const scenes = [
        {
            id: 'scene1',
            Component: Scene1_Introduction,
            audioFile: 'TransformerVideo/scene1-audio.mp3',
            captionFile: 'TransformerVideo/scene1-captions.json',
            duration: sceneDurations.scene1,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene2',
            Component: Scene2_CoreConcept,
            audioFile: 'TransformerVideo/scene2-audio.mp3',
            captionFile: 'TransformerVideo/scene2-captions.json',
            duration: sceneDurations.scene2,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: 'scene3',
            Component: Scene3_Structure,
            audioFile: 'TransformerVideo/scene3-audio.mp3',
            captionFile: 'TransformerVideo/scene3-captions.json',
            duration: sceneDurations.scene3,
            transition: fade(),
        },
        {
            id: 'scene4',
            Component: Scene4_Innovation,
            audioFile: 'TransformerVideo/scene4-audio.mp3',
            captionFile: 'TransformerVideo/scene4-captions.json',
            duration: sceneDurations.scene4,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene5',
            Component: Scene5_Applications,
            audioFile: 'TransformerVideo/scene5-audio.mp3',
            captionFile: 'TransformerVideo/scene5-captions.json',
            duration: sceneDurations.scene5,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: 'scene6',
            Component: Scene6_FunFacts,
            audioFile: 'TransformerVideo/scene6-audio.mp3',
            captionFile: 'TransformerVideo/scene6-captions.json',
            duration: sceneDurations.scene6,
            transition: fade(),
        },
        {
            id: 'scene7',
            Component: Scene7_Ending,
            audioFile: 'TransformerVideo/scene7-audio.mp3',
            captionFile: 'TransformerVideo/scene7-captions.json',
            duration: sceneDurations.scene7,
            transition: null, // 最后一个场景不需要转场
        },
    ];

    return (
        <AbsoluteFill style={{ backgroundColor: "#000000" }}>
            {/* 背景音乐（如果存在） */}
            {/* <Audio 
                src={staticFile("background-music.mp3")} 
                volume={backgroundMusicVolume}
                loop
            /> */}

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
            </TransitionSeries>
        </AbsoluteFill>
    );
};
