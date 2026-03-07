import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { Scene1_Introduction } from "./scenes/embedding/Scene1_Introduction";
import { Scene2_CoreFeatures } from "./scenes/embedding/Scene2_CoreFeatures";
import { Scene3_Workflow } from "./scenes/embedding/Scene3_Workflow";
import { Scene4_Ecosystem } from "./scenes/embedding/Scene4_Ecosystem";
import { Scene5_UseCase } from "./scenes/embedding/Scene5_UseCase";
import { Scene6_Models } from "./scenes/embedding/Scene6_Models";
import { Scene7_CodeExample } from "./scenes/embedding/Scene7_CodeExample";
import { Scene8_FunFacts } from "./scenes/embedding/Scene8_FunFacts";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

interface EmbeddingVideoProps {
    title?: string;
    showCaptions?: boolean;
    backgroundMusicVolume?: number;
}

export const EmbeddingVideo: React.FC<EmbeddingVideoProps> = ({
    title,
    showCaptions = true,
    backgroundMusicVolume = 0.15
}) => {
    // 场景帧数配置（基于实际音频时长 + 30帧缓冲）
    const sceneDurations = {
        scene1: 649,  // 20.66秒音频 + 30帧缓冲
        scene2: 618,  // 19.61秒音频 + 30帧缓冲
        scene3: 752,  // 24.10秒音频 + 30帧缓冲
        scene4: 524,  // 16.49秒音频 + 30帧缓冲
        scene5: 622,  // 19.75秒音频 + 30帧缓冲
        scene6: 754,  // 24.14秒音频 + 30帧缓冲
        scene7: 634,  // 20.16秒音频 + 30帧缓冲
        scene8: 1170,  // 38秒音频 + 30帧缓冲（待音频生成后更新）
        ending: 120,  // 3.02秒音频 + 30帧缓冲
    };

    const transitionDuration = 15; // 转场时长：15帧（0.5秒）

    // 场景配置数组
    const scenes = [
        {
            id: 'scene1',
            Component: Scene1_Introduction,
            audioFile: 'EmbeddingVideo/scene1-audio.mp3',
            captionFile: 'EmbeddingVideo/scene1-captions.json',
            duration: sceneDurations.scene1,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene2',
            Component: Scene2_CoreFeatures,
            audioFile: 'EmbeddingVideo/scene2-audio.mp3',
            captionFile: 'EmbeddingVideo/scene2-captions.json',
            duration: sceneDurations.scene2,
            transition: fade(),
        },
        {
            id: 'scene3',
            Component: Scene3_Workflow,
            audioFile: 'EmbeddingVideo/scene3-audio.mp3',
            captionFile: 'EmbeddingVideo/scene3-captions.json',
            duration: sceneDurations.scene3,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: 'scene4',
            Component: Scene4_Ecosystem,
            audioFile: 'EmbeddingVideo/scene4-audio.mp3',
            captionFile: 'EmbeddingVideo/scene4-captions.json',
            duration: sceneDurations.scene4,
            transition: fade(),
        },
        {
            id: 'scene5',
            Component: Scene5_UseCase,
            audioFile: 'EmbeddingVideo/scene5-audio.mp3',
            captionFile: 'EmbeddingVideo/scene5-captions.json',
            duration: sceneDurations.scene5,
            transition: slide({ direction: "from-right" }),
        },
        {
            id: 'scene6',
            Component: Scene6_Models,
            audioFile: 'EmbeddingVideo/scene6-audio.mp3',
            captionFile: 'EmbeddingVideo/scene6-captions.json',
            duration: sceneDurations.scene6,
            transition: fade(),
        },
        {
            id: 'scene7',
            Component: Scene7_CodeExample,
            audioFile: 'EmbeddingVideo/scene7-audio.mp3',
            captionFile: 'EmbeddingVideo/scene7-captions.json',
            duration: sceneDurations.scene7,
            transition: slide({ direction: "from-left" }),
        },
        {
            id: 'scene8',
            Component: Scene8_FunFacts,
            audioFile: 'EmbeddingVideo/scene8-audio.mp3',
            captionFile: 'EmbeddingVideo/scene8-captions.json',
            duration: sceneDurations.scene8,
            transition: fade(),
        },
    ];

    return (
        <AbsoluteFill style={{ backgroundColor: "#000000" }}>
            <TransitionSeries>
                {/* 内容场景 */}
                {scenes.map((scene, index) => (
                    <React.Fragment key={scene.id}>
                        <TransitionSeries.Sequence durationInFrames={scene.duration}>
                            <AbsoluteFill>
                                <scene.Component />
                                <Audio
                                    src={staticFile(scene.audioFile)}
                                    volume={0.8}
                                />
                                {showCaptions && (
                                    <CaptionDisplay captionFile={scene.captionFile} />
                                )}
                            </AbsoluteFill>
                        </TransitionSeries.Sequence>

                        {/* 转场效果 */}
                        {scene.transition && (
                            <TransitionSeries.Transition
                                presentation={scene.transition}
                                timing={linearTiming({ durationInFrames: transitionDuration })}
                            />
                        )}
                    </React.Fragment>
                ))}

                {/* 结尾场景 */}
                <TransitionSeries.Sequence durationInFrames={sceneDurations.ending}>
                    <AbsoluteFill>
                        <EndingScene
                            mainTitle="5分钟 AI"
                            subtitle="每天搞懂一个知识点！"
                            description="Embedding - AI理解世界的语义密码本"
                        />
                        <Audio
                            src={staticFile("EmbeddingVideo/ending-audio.mp3")}
                            volume={0.8}
                        />
                        {showCaptions && (
                            <CaptionDisplay captionFile="EmbeddingVideo/ending-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
