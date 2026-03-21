import * as React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { OpenClawInstall_Scene1_Hook } from "./scenes/openclawinstall/Scene1_Hook";
import { OpenClawInstall_Scene2_Methods } from "./scenes/openclawinstall/Scene2_Methods";
import { OpenClawInstall_Scene3_Script } from "./scenes/openclawinstall/Scene3_Script";
import { OpenClawInstall_Scene2b_NodeJS } from "./scenes/openclawinstall/Scene2b_NodeJS";
import { OpenClawInstall_Scene4_Launch } from "./scenes/openclawinstall/Scene4_Launch";
import { OpenClawInstall_Scene4_5_Breath } from "./scenes/openclawinstall/Scene4_5_Breath";
import { OpenClawInstall_Scene4b_Channel } from "./scenes/openclawinstall/Scene4b_Channel";
import { OpenClawInstall_Scene5_Case } from "./scenes/openclawinstall/Scene5_Case";
import { OpenClawInstall_Scene5b_Alternatives } from "./scenes/openclawinstall/Scene5b_Alternatives";
import { OpenClawInstall_Scene6_FAQ } from "./scenes/openclawinstall/Scene6_FAQ";
import { OpenClawInstall_Scene7_Summary } from "./scenes/openclawinstall/Scene7_Summary";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

// 场景时长配置（单位：帧，30fps）
// 基于实际音频时长 + 30帧缓冲
// scene1: 13.49秒 → 434帧
// scene2: 22.46秒 → 703帧
// scene2b: 33.04秒 → 1021帧（Node.js安装教程）
// scene3: 30.46秒 → 943帧
// scene4: 24.94秒 → 778帧
// scene4_5: 15.50秒 → 495帧
// scene4b: 28.40秒 → 882帧（配置消息渠道）
// scene5: 21.98秒 → 689帧
// scene5b: 39.36秒 → 1210帧（国内替代方案）
// scene6: 19.42秒 → 612帧
// scene7: 17.18秒 → 545帧
// ending: 7.73秒 → 261帧
const SCENE_DURATIONS = {
    scene1: 434,    // 开场钩子（13.49s）
    scene2: 703,    // 五种安装方式（22.46s）
    scene2b: 1021,  // Node.js安装教程（33.04s）
    scene3: 943,    // 一键脚本安装（30.46s）
    scene4: 778,    // 三步启动龙虾（24.94s）
    scene4_5: 495,  // 呼吸点（15.50s）
    scene4b: 882,   // 配置消息渠道（28.40s）
    scene5: 689,    // 实际应用案例（21.98s）
    scene5b: 1210,  // 国内替代方案（39.36s）
    scene6: 612,    // 常见问题（19.42s）
    scene7: 545,    // 结尾总结（17.18s）
    ending: 261,    // 结尾（7.73s）
};

// 累计帧数计算
const s1Start = 0;
const s2Start = s1Start + SCENE_DURATIONS.scene1;
const s2bStart = s2Start + SCENE_DURATIONS.scene2;
const s3Start = s2bStart + SCENE_DURATIONS.scene2b;
const s4Start = s3Start + SCENE_DURATIONS.scene3;
const s4_5Start = s4Start + SCENE_DURATIONS.scene4;
const s4bStart = s4_5Start + SCENE_DURATIONS.scene4_5;
const s5Start = s4bStart + SCENE_DURATIONS.scene4b;
const s5bStart = s5Start + SCENE_DURATIONS.scene5;
const s6Start = s5bStart + SCENE_DURATIONS.scene5b;
const s7Start = s6Start + SCENE_DURATIONS.scene6;
const endingStart = s7Start + SCENE_DURATIONS.scene7;

export const OPENCLAWINSTALL_TOTAL_DURATION =
    SCENE_DURATIONS.scene1 +
    SCENE_DURATIONS.scene2 +
    SCENE_DURATIONS.scene2b +
    SCENE_DURATIONS.scene3 +
    SCENE_DURATIONS.scene4 +
    SCENE_DURATIONS.scene4_5 +
    SCENE_DURATIONS.scene4b +
    SCENE_DURATIONS.scene5 +
    SCENE_DURATIONS.scene5b +
    SCENE_DURATIONS.scene6 +
    SCENE_DURATIONS.scene7 +
    SCENE_DURATIONS.ending;

interface OpenClawInstallVideoProps {
    showCaptions?: boolean;
}

export const OpenClawInstallVideo: React.FC<OpenClawInstallVideoProps> = ({
    showCaptions = true,
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
            {/* 场景1：开场钩子 */}
            <Sequence from={s1Start} durationInFrames={SCENE_DURATIONS.scene1}>
                <AbsoluteFill>
                    <OpenClawInstall_Scene1_Hook />
                    <Audio src={staticFile("OpenClawInstallVideo/scene1-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawInstallVideo/scene1-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景2：五种安装方式 */}
            <Sequence from={s2Start} durationInFrames={SCENE_DURATIONS.scene2}>
                <AbsoluteFill>
                    <OpenClawInstall_Scene2_Methods />
                    <Audio src={staticFile("OpenClawInstallVideo/scene2-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawInstallVideo/scene2-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景2b：Node.js 安装教程 */}
            <Sequence from={s2bStart} durationInFrames={SCENE_DURATIONS.scene2b}>
                <AbsoluteFill>
                    <OpenClawInstall_Scene2b_NodeJS />
                    <Audio src={staticFile("OpenClawInstallVideo/scene2b-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawInstallVideo/scene2b-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景3：一键脚本安装 */}
            <Sequence from={s3Start} durationInFrames={SCENE_DURATIONS.scene3}>
                <AbsoluteFill>
                    <OpenClawInstall_Scene3_Script />
                    <Audio src={staticFile("OpenClawInstallVideo/scene3-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawInstallVideo/scene3-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景4：三步启动龙虾 */}
            <Sequence from={s4Start} durationInFrames={SCENE_DURATIONS.scene4}>
                <AbsoluteFill>
                    <OpenClawInstall_Scene4_Launch />
                    <Audio src={staticFile("OpenClawInstallVideo/scene4-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawInstallVideo/scene4-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景4.5：呼吸点 */}
            <Sequence from={s4_5Start} durationInFrames={SCENE_DURATIONS.scene4_5}>
                <AbsoluteFill>
                    <OpenClawInstall_Scene4_5_Breath />
                    <Audio src={staticFile("OpenClawInstallVideo/scene4_5-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawInstallVideo/scene4_5-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景4b：配置消息渠道 */}
            <Sequence from={s4bStart} durationInFrames={SCENE_DURATIONS.scene4b}>
                <AbsoluteFill>
                    <OpenClawInstall_Scene4b_Channel />
                    <Audio src={staticFile("OpenClawInstallVideo/scene4b-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawInstallVideo/scene4b-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景5：实际应用案例 */}
            <Sequence from={s5Start} durationInFrames={SCENE_DURATIONS.scene5}>
                <AbsoluteFill>
                    <OpenClawInstall_Scene5_Case />
                    <Audio src={staticFile("OpenClawInstallVideo/scene5-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawInstallVideo/scene5-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景5b：国内替代方案 */}
            <Sequence from={s5bStart} durationInFrames={SCENE_DURATIONS.scene5b}>
                <AbsoluteFill>
                    <OpenClawInstall_Scene5b_Alternatives />
                    <Audio src={staticFile("OpenClawInstallVideo/scene5b-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawInstallVideo/scene5b-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景6：常见问题 */}
            <Sequence from={s6Start} durationInFrames={SCENE_DURATIONS.scene6}>
                <AbsoluteFill>
                    <OpenClawInstall_Scene6_FAQ />
                    <Audio src={staticFile("OpenClawInstallVideo/scene6-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawInstallVideo/scene6-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景7：结尾总结 */}
            <Sequence from={s7Start} durationInFrames={SCENE_DURATIONS.scene7}>
                <AbsoluteFill>
                    <OpenClawInstall_Scene7_Summary />
                    <Audio src={staticFile("OpenClawInstallVideo/scene7-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawInstallVideo/scene7-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            
        </AbsoluteFill>
    );
};

export const OPENCLAWINSTALL_CONFIG = {
    totalDuration: OPENCLAWINSTALL_TOTAL_DURATION,
    totalSeconds: Math.round(OPENCLAWINSTALL_TOTAL_DURATION / 30),
    sceneDurations: SCENE_DURATIONS,
    fps: 30,
    width: 1920,
    height: 1080,
};
