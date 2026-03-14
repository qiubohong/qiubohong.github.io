import * as React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { OpenClaw1_Scene1_Hook } from "./scenes/openclaw1/Scene1_Hook";
import { OpenClaw1_Scene2_WhatIs } from "./scenes/openclaw1/Scene2_WhatIs";
import { OpenClaw1_Scene2b_WorkflowImg } from "./scenes/openclaw1/Scene2b_WorkflowImg";
import { OpenClaw1_Scene3_Components } from "./scenes/openclaw1/Scene3_Components";
import { OpenClaw1_Scene4_Comparison } from "./scenes/openclaw1/Scene4_Comparison";
import { OpenClaw1_Scene4b_MailWorkflow } from "./scenes/openclaw1/Scene4b_MailWorkflow";
import { OpenClaw1_Scene5_Cases } from "./scenes/openclaw1/Scene5_Cases";
import { OpenClaw1_Scene5b_AITimeline } from "./scenes/openclaw1/Scene5b_AITimeline";
import { OpenClaw1_Scene6_Summary } from "./scenes/openclaw1/Scene6_Summary";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

// 场景时长配置（单位：帧，30fps）
// 基于实际音频时长 + 30帧缓冲
const SCENE_DURATIONS = {
    scene1: 454,   // 14.16s + 30帧缓冲
    scene2: 637,   // 20.24s + 30帧缓冲
    scene2b: 606,  // 19.20s + 30帧缓冲（workflow.png 工作流程图）
    scene3: 699,   // 22.32s + 30帧缓冲
    scene4: 801,   // 13.37s + 30帧缓冲
    scene4b: 615,  // 19.52s + 30帧缓冲（mail_workflow.png 邮件流程图）
    scene5: 889,   // 28.64s + 30帧缓冲
    scene5b: 637,  // 20.24s + 30帧缓冲（ai_timeline.png AI发展史）
    scene6: 780,   // 23.36s + 30帧缓冲
};

// 累计帧数计算
const s1Start = 0;
const s2Start = s1Start + SCENE_DURATIONS.scene1;
const s2bStart = s2Start + SCENE_DURATIONS.scene2;
const s3Start = s2bStart + SCENE_DURATIONS.scene2b;
const s4Start = s3Start + SCENE_DURATIONS.scene3;
const s4bStart = s4Start + SCENE_DURATIONS.scene4;
const s5Start = s4bStart + SCENE_DURATIONS.scene4b;
const s5bStart = s5Start + SCENE_DURATIONS.scene5;
const s6Start = s5bStart + SCENE_DURATIONS.scene5b;
const endingStart = s6Start + SCENE_DURATIONS.scene6;

export const OPENCLAW1_TOTAL_DURATION =
    SCENE_DURATIONS.scene1 +
    SCENE_DURATIONS.scene2 +
    SCENE_DURATIONS.scene2b +
    SCENE_DURATIONS.scene3 +
    SCENE_DURATIONS.scene4 +
    SCENE_DURATIONS.scene4b +
    SCENE_DURATIONS.scene5 +
    SCENE_DURATIONS.scene5b +
    SCENE_DURATIONS.scene6 +
    SCENE_DURATIONS.ending;

interface OpenClaw1VideoProps {
    showCaptions?: boolean;
}

export const OpenClaw1Video: React.FC<OpenClaw1VideoProps> = ({
    showCaptions = true,
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
            {/* 场景1：开场钩子 */}
            <Sequence from={s1Start} durationInFrames={SCENE_DURATIONS.scene1}>
                <AbsoluteFill>
                    <OpenClaw1_Scene1_Hook />
                    <Audio src={staticFile("OpenClaw1Video/scene1-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClaw1Video/scene1-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景2：是什么 */}
            <Sequence from={s2Start} durationInFrames={SCENE_DURATIONS.scene2}>
                <AbsoluteFill>
                    <OpenClaw1_Scene2_WhatIs />
                    <Audio src={staticFile("OpenClaw1Video/scene2-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClaw1Video/scene2-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景2b：工作流程图 */}
            <Sequence from={s2bStart} durationInFrames={SCENE_DURATIONS.scene2b}>
                <AbsoluteFill>
                    <OpenClaw1_Scene2b_WorkflowImg />
                    <Audio src={staticFile("OpenClaw1Video/scene2b-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClaw1Video/scene2b-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景3：四大组成 */}
            <Sequence from={s3Start} durationInFrames={SCENE_DURATIONS.scene3}>
                <AbsoluteFill>
                    <OpenClaw1_Scene3_Components />
                    <Audio src={staticFile("OpenClaw1Video/scene3-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClaw1Video/scene3-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景4：对比分屏 */}
            <Sequence from={s4Start} durationInFrames={SCENE_DURATIONS.scene4}>
                <AbsoluteFill>
                    <OpenClaw1_Scene4_Comparison />
                    <Audio src={staticFile("OpenClaw1Video/scene4-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClaw1Video/scene4-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景4b：邮件处理流程图 */}
            <Sequence from={s4bStart} durationInFrames={SCENE_DURATIONS.scene4b}>
                <AbsoluteFill>
                    <OpenClaw1_Scene4b_MailWorkflow />
                    <Audio src={staticFile("OpenClaw1Video/scene4b-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClaw1Video/scene4b-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景5：案例演示 */}
            <Sequence from={s5Start} durationInFrames={SCENE_DURATIONS.scene5}>
                <AbsoluteFill>
                    <OpenClaw1_Scene5_Cases />
                    <Audio src={staticFile("OpenClaw1Video/scene5-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClaw1Video/scene5-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景5b：AI发展史时间线 */}
            <Sequence from={s5bStart} durationInFrames={SCENE_DURATIONS.scene5b}>
                <AbsoluteFill>
                    <OpenClaw1_Scene5b_AITimeline />
                    <Audio src={staticFile("OpenClaw1Video/scene5b-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClaw1Video/scene5b-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景6：结尾互动 */}
            <Sequence from={s6Start} durationInFrames={SCENE_DURATIONS.scene6}>
                <AbsoluteFill>
                    <OpenClaw1_Scene6_Summary />
                    <Audio src={staticFile("OpenClaw1Video/scene6-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClaw1Video/scene6-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};

export const OPENCLAW1_CONFIG = {
    totalDuration: OPENCLAW1_TOTAL_DURATION,
    totalSeconds: Math.round(OPENCLAW1_TOTAL_DURATION / 30),
    sceneDurations: SCENE_DURATIONS,
    fps: 30,
    width: 1920,
    height: 1080,
};
