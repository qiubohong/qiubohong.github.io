import * as React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { AgentSkill_Scene1_Introduction } from "./scenes/agentskill/Scene1_Introduction";
import { AgentSkill_Scene2_Structure } from "./scenes/agentskill/Scene2_Structure";
import { AgentSkill_Scene3_HowItWorks } from "./scenes/agentskill/Scene3_HowItWorks";
import { AgentSkill_Scene4_CaseStudy } from "./scenes/agentskill/Scene4_CaseStudy";
import { AgentSkill_Scene5_BestPractices } from "./scenes/agentskill/Scene5_BestPractices";
import { AgentSkill_Scene6_Summary } from "./scenes/agentskill/Scene6_Summary";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

// 场景时长配置（单位：帧，30fps）
// 基于实际音频时长 + 30帧缓冲
const SCENE_DURATIONS = {
    scene1: 1261, // 41.06s + 30帧缓冲
    scene2: 1108, // 35.95s + 30帧缓冲
    scene3: 1385, // 45.19s + 30帧缓冲
    scene4: 1117, // 36.24s + 30帧缓冲
    scene5: 976,  // 31.54s + 30帧缓冲
    scene6: 1527, // 49.92s + 30帧缓冲
    ending: 117,  // 2.93s + 30帧缓冲
};

const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

interface AgentSkillVideoProps {
    title?: string;
    showCaptions?: boolean;
    backgroundMusicVolume?: number;
}

export const AgentSkillVideo: React.FC<AgentSkillVideoProps> = ({
    title = "Agent Skill - 给 AI 准备专属工作说明书",
    showCaptions = true,
    backgroundMusicVolume = 0.15,
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
            {/* 场景1：开场介绍 */}
            <Sequence from={0} durationInFrames={SCENE_DURATIONS.scene1}>
                <AbsoluteFill>
                    <AgentSkill_Scene1_Introduction />
                    <Audio
                        src={staticFile("AgentSkillVideo/scene1-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="AgentSkillVideo/scene1-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景2：组成部分 */}
            <Sequence
                from={SCENE_DURATIONS.scene1}
                durationInFrames={SCENE_DURATIONS.scene2}
            >
                <AbsoluteFill>
                    <AgentSkill_Scene2_Structure />
                    <Audio
                        src={staticFile("AgentSkillVideo/scene2-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="AgentSkillVideo/scene2-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景3：核心原理 */}
            <Sequence
                from={SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2}
                durationInFrames={SCENE_DURATIONS.scene3}
            >
                <AbsoluteFill>
                    <AgentSkill_Scene3_HowItWorks />
                    <Audio
                        src={staticFile("AgentSkillVideo/scene3-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="AgentSkillVideo/scene3-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景4：案例实战 */}
            <Sequence
                from={
                    SCENE_DURATIONS.scene1 +
                    SCENE_DURATIONS.scene2 +
                    SCENE_DURATIONS.scene3
                }
                durationInFrames={SCENE_DURATIONS.scene4}
            >
                <AbsoluteFill>
                    <AgentSkill_Scene4_CaseStudy />
                    <Audio
                        src={staticFile("AgentSkillVideo/scene4-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="AgentSkillVideo/scene4-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景5：最佳实践 */}
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
                    <AgentSkill_Scene5_BestPractices />
                    <Audio
                        src={staticFile("AgentSkillVideo/scene5-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="AgentSkillVideo/scene5-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景6：总结 */}
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
                    <AgentSkill_Scene6_Summary />
                    <Audio
                        src={staticFile("AgentSkillVideo/scene6-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="AgentSkillVideo/scene6-captions.json" />
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
                        description="Agent Skill - 给 AI 准备专属工作说明书"
                    />
                    <Audio
                        src={staticFile("AgentSkillVideo/ending-audio.mp3")}
                        volume={0.8}
                    />
                    {showCaptions && (
                        <CaptionDisplay captionFile="AgentSkillVideo/ending-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};

export const AGENT_SKILL_CONFIG = {
    totalDuration: TOTAL_DURATION,
    totalSeconds: Math.round(TOTAL_DURATION / 30),
    sceneDurations: SCENE_DURATIONS,
    fps: 30,
    width: 1920,
    height: 1080,
};
