import * as React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { FC_Scene1_Introduction } from "./scenes/functioncalling/Scene1_Introduction";
import { FC_Scene2_HowItWorks } from "./scenes/functioncalling/Scene2_HowItWorks";
import { FC_Scene3_WeatherCase } from "./scenes/functioncalling/Scene3_WeatherCase";
import { FC_Scene4_AdvancedCases } from "./scenes/functioncalling/Scene4_AdvancedCases";
import { FC_Scene5_CodeDemo } from "./scenes/functioncalling/Scene5_CodeDemo";
import { FC_Scene6_FunFacts } from "./scenes/functioncalling/Scene6_FunFacts";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

// 场景时长配置（单位：帧，30fps）
// 基于实际音频时长 + 30帧缓冲
const SCENE_DURATIONS = {
    scene1: 932,  // 30.09s + 30帧缓冲
    scene2: 980,  // 31.69s + 30帧缓冲
    scene3: 937,  // 30.25s + 30帧缓冲
    scene4: 1059, // 34.33s + 30帧缓冲
    scene5: 1254, // 40.81s + 30帧缓冲
    scene6: 1184, // 38.49s + 30帧缓冲
    ending: 120,  // 3.03s + 30帧缓冲
};

// 计算总时长
const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

interface FunctionCallingVideoProps {
    title?: string;
    showCaptions?: boolean;
    backgroundMusicVolume?: number;
}

export const FunctionCallingVideo: React.FC<FunctionCallingVideoProps> = ({
    title = "AI 函数调用 Function Calling - 让大模型真正动起来！",
    showCaptions = true,
    backgroundMusicVolume = 0.15,
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
            {/* 场景1：开场介绍 */}
            <Sequence from={0} durationInFrames={SCENE_DURATIONS.scene1}>
                <AbsoluteFill>
                    <FC_Scene1_Introduction title={title} />
                    <Audio
                        src={staticFile("FunctionCallingVideo/scene1-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="FunctionCallingVideo/scene1-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景2：工作原理 */}
            <Sequence
                from={SCENE_DURATIONS.scene1}
                durationInFrames={SCENE_DURATIONS.scene2}
            >
                <AbsoluteFill>
                    <FC_Scene2_HowItWorks />
                    <Audio
                        src={staticFile("FunctionCallingVideo/scene2-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="FunctionCallingVideo/scene2-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景3：天气查询案例 */}
            <Sequence
                from={SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2}
                durationInFrames={SCENE_DURATIONS.scene3}
            >
                <AbsoluteFill>
                    <FC_Scene3_WeatherCase />
                    <Audio
                        src={staticFile("FunctionCallingVideo/scene3-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="FunctionCallingVideo/scene3-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景4：进阶案例 */}
            <Sequence
                from={
                    SCENE_DURATIONS.scene1 +
                    SCENE_DURATIONS.scene2 +
                    SCENE_DURATIONS.scene3
                }
                durationInFrames={SCENE_DURATIONS.scene4}
            >
                <AbsoluteFill>
                    <FC_Scene4_AdvancedCases />
                    <Audio
                        src={staticFile("FunctionCallingVideo/scene4-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="FunctionCallingVideo/scene4-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景5：实战代码演示 */}
            <Sequence
                from={
                    SCENE_DURATIONS.scene1 +
                    SCENE_DURATIONS.scene2 +
                    SCENE_DURATIONS.scene3 +
                    SCENE_DURATIONS.scene4
                }
                durationInFrames={SCENE_DURATIONS.scene5}
            >
                <AbsoluteFill>
                    <FC_Scene5_CodeDemo />
                    <Audio
                        src={staticFile("FunctionCallingVideo/scene5-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="FunctionCallingVideo/scene5-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景6：冷知识 */}
            <Sequence
                from={
                    SCENE_DURATIONS.scene1 +
                    SCENE_DURATIONS.scene2 +
                    SCENE_DURATIONS.scene3 +
                    SCENE_DURATIONS.scene4 +
                    SCENE_DURATIONS.scene5
                }
                durationInFrames={SCENE_DURATIONS.scene6}
            >
                <AbsoluteFill>
                    <FC_Scene6_FunFacts />
                    <Audio
                        src={staticFile("FunctionCallingVideo/scene6-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="FunctionCallingVideo/scene6-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 结束场景 */}
            <Sequence
                from={
                    SCENE_DURATIONS.scene1 +
                    SCENE_DURATIONS.scene2 +
                    SCENE_DURATIONS.scene3 +
                    SCENE_DURATIONS.scene4 +
                    SCENE_DURATIONS.scene5 +
                    SCENE_DURATIONS.scene6
                }
                durationInFrames={SCENE_DURATIONS.ending}
            >
                <AbsoluteFill>
                    <EndingScene
                        mainTitle="5分钟 AI"
                        subtitle="每天搞懂一个知识点！"
                        description="AI 函数调用 Function Calling"
                    />
                    <Audio
                        src={staticFile("FunctionCallingVideo/ending-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="FunctionCallingVideo/ending-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};

// 导出配置信息
export const FUNCTIONCALLING_CONFIG = {
    totalDuration: TOTAL_DURATION,
    totalSeconds: Math.round(TOTAL_DURATION / 30),
    sceneDurations: SCENE_DURATIONS,
    fps: 30,
    width: 1920,
    height: 1080,
};
