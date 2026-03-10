import * as React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { MCP_Scene1_Introduction } from "./scenes/mcp/Scene1_Introduction";
import { MCP_Scene2_Architecture } from "./scenes/mcp/Scene2_Architecture";
import { MCP_Scene3_ServerSetup } from "./scenes/mcp/Scene3_ServerSetup";
import { MCP_Scene4_ClientCall } from "./scenes/mcp/Scene4_ClientCall";
import { MCP_Scene5_Ecosystem } from "./scenes/mcp/Scene5_Ecosystem";
import { MCP_Scene6_FunFacts } from "./scenes/mcp/Scene6_FunFacts";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

// 场景时长配置（单位：帧，30fps）
// 基于实际音频时长 + 30帧缓冲
const SCENE_DURATIONS = {
    scene1: 932,  // 30.09s + 30帧缓冲
    scene2: 1098, // 35.61s + 30帧缓冲
    scene3: 978,  // 31.61s + 30帧缓冲
    scene4: 1007, // 32.57s + 30帧缓冲
    scene5: 1000, // 32.36s + 30帧缓冲
    scene6: 1223, // 39.77s + 30帧缓冲
    ending: 120,  // 3.03s + 30帧缓冲
};

const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

interface MCPVideoProps {
    title?: string;
    showCaptions?: boolean;
    backgroundMusicVolume?: number;
}

export const MCPVideo: React.FC<MCPVideoProps> = ({
    title = "MCP 协议 - AI 世界的 USB-C 接口",
    showCaptions = true,
    backgroundMusicVolume = 0.15,
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
            {/* 场景1：开场介绍 */}
            <Sequence from={0} durationInFrames={SCENE_DURATIONS.scene1}>
                <AbsoluteFill>
                    <MCP_Scene1_Introduction />
                    <Audio
                        src={staticFile("MCPVideo/scene1-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="MCPVideo/scene1-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景2：核心架构 */}
            <Sequence
                from={SCENE_DURATIONS.scene1}
                durationInFrames={SCENE_DURATIONS.scene2}
            >
                <AbsoluteFill>
                    <MCP_Scene2_Architecture />
                    <Audio
                        src={staticFile("MCPVideo/scene2-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="MCPVideo/scene2-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景3：服务器搭建 */}
            <Sequence
                from={SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2}
                durationInFrames={SCENE_DURATIONS.scene3}
            >
                <AbsoluteFill>
                    <MCP_Scene3_ServerSetup />
                    <Audio
                        src={staticFile("MCPVideo/scene3-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="MCPVideo/scene3-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景4：客户端调用 */}
            <Sequence
                from={
                    SCENE_DURATIONS.scene1 +
                    SCENE_DURATIONS.scene2 +
                    SCENE_DURATIONS.scene3
                }
                durationInFrames={SCENE_DURATIONS.scene4}
            >
                <AbsoluteFill>
                    <MCP_Scene4_ClientCall />
                    <Audio
                        src={staticFile("MCPVideo/scene4-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="MCPVideo/scene4-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景5：MCP 生态 */}
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
                    <MCP_Scene5_Ecosystem />
                    <Audio
                        src={staticFile("MCPVideo/scene5-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="MCPVideo/scene5-captions.json" />
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
                    <MCP_Scene6_FunFacts />
                    <Audio
                        src={staticFile("MCPVideo/scene6-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="MCPVideo/scene6-captions.json" />
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
                        description="MCP 协议 - AI 世界的 USB-C 接口"
                    />
                    <Audio
                        src={staticFile("MCPVideo/ending-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="MCPVideo/ending-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};

export const MCP_CONFIG = {
    totalDuration: TOTAL_DURATION,
    totalSeconds: Math.round(TOTAL_DURATION / 30),
    sceneDurations: SCENE_DURATIONS,
    fps: 30,
    width: 1920,
    height: 1080,
};
