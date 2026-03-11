import * as React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { OpenClaw_Scene1_Introduction } from "./scenes/openclaw/Scene1_Introduction";
import { OpenClaw_Scene2_Comparison } from "./scenes/openclaw/Scene2_Comparison";
import { OpenClaw_Scene3_HowToStart } from "./scenes/openclaw/Scene3_HowToStart";
import { OpenClaw_Scene4_Roadmap } from "./scenes/openclaw/Scene4_Roadmap";
import { OpenClaw_Scene5_CaseStudy } from "./scenes/openclaw/Scene5_CaseStudy";
import { OpenClaw_Scene6_Summary } from "./scenes/openclaw/Scene6_Summary";
import { CaptionDisplay } from "./components/CaptionDisplay";

// 场景时长配置（单位：帧，30fps）
// 基于实际音频时长 + 30帧缓冲
const SCENE_DURATIONS = {
    scene1: 975,  // 31.51s + 30帧缓冲
    scene2: 844,  // 27.14s + 30帧缓冲
    scene3: 1018, // 32.95s + 30帧缓冲
    scene4: 1090, // 35.35s + 30帧缓冲
    scene5: 842,  // 27.07s + 30帧缓冲
    scene6: 762,  // 24.43s + 30帧缓冲
};

const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

interface OpenClawIntroVideoProps {
    title?: string;
    showCaptions?: boolean;
    backgroundMusicVolume?: number;
}

export const OpenClawIntroVideo: React.FC<OpenClawIntroVideoProps> = ({
    title = "普通人也能用好 OpenClaw（龙虾）—— 系列介绍",
    showCaptions = true,
    backgroundMusicVolume = 0.15,
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
            {/* 场景1：开场介绍 */}
            <Sequence from={0} durationInFrames={SCENE_DURATIONS.scene1}>
                <AbsoluteFill>
                    <OpenClaw_Scene1_Introduction />
                    <Audio
                        src={staticFile("OpenClawIntroVideo/scene1-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawIntroVideo/scene1-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景2：对比说明 */}
            <Sequence
                from={SCENE_DURATIONS.scene1}
                durationInFrames={SCENE_DURATIONS.scene2}
            >
                <AbsoluteFill>
                    <OpenClaw_Scene2_Comparison />
                    <Audio
                        src={staticFile("OpenClawIntroVideo/scene2-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawIntroVideo/scene2-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景3：入门方式 */}
            <Sequence
                from={SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2}
                durationInFrames={SCENE_DURATIONS.scene3}
            >
                <AbsoluteFill>
                    <OpenClaw_Scene3_HowToStart />
                    <Audio
                        src={staticFile("OpenClawIntroVideo/scene3-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawIntroVideo/scene3-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景4：路线图 */}
            <Sequence
                from={SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2 + SCENE_DURATIONS.scene3}
                durationInFrames={SCENE_DURATIONS.scene4}
            >
                <AbsoluteFill>
                    <OpenClaw_Scene4_Roadmap />
                    <Audio
                        src={staticFile("OpenClawIntroVideo/scene4-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawIntroVideo/scene4-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景5：案例演示 */}
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
                    <OpenClaw_Scene5_CaseStudy />
                    <Audio
                        src={staticFile("OpenClawIntroVideo/scene5-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawIntroVideo/scene5-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景6：总结互动 */}
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
                    <OpenClaw_Scene6_Summary />
                    <Audio
                        src={staticFile("OpenClawIntroVideo/scene6-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawIntroVideo/scene6-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>


        </AbsoluteFill>
    );
};

export const OPENCLAW_INTRO_CONFIG = {
    totalDuration: TOTAL_DURATION,
    totalSeconds: Math.round(TOTAL_DURATION / 30),
    sceneDurations: SCENE_DURATIONS,
    fps: 30,
    width: 1920,
    height: 1080,
};
