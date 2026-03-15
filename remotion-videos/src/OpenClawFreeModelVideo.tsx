import * as React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { OpenClawFreeModel_Scene1_Hook } from "./scenes/openclawfreemodel/Scene1_Hook";
import { OpenClawFreeModel_Scene2_WhyNeed, OpenClawFreeModel_Scene2_5_RegistrationFlow } from "./scenes/openclawfreemodel/Scene2_WhyNeed";
import { OpenClawFreeModel_Scene3_Platforms, OpenClawFreeModel_Scene3_5_PlatformChart } from "./scenes/openclawfreemodel/Scene3_Platforms";
import { OpenClawFreeModel_Scene4_ZhipuTutorial } from "./scenes/openclawfreemodel/Scene4_ZhipuTutorial";
import { OpenClawFreeModel_Scene5_ThirdParty } from "./scenes/openclawfreemodel/Scene5_ThirdParty";
import { OpenClawFreeModel_Scene6_ModelSelection, OpenClawFreeModel_Scene6_5_SelectionGuide } from "./scenes/openclawfreemodel/Scene6_ModelSelection";
import { OpenClawFreeModel_Scene7_TokensUsage, OpenClawFreeModel_Scene7_5_TokensChart } from "./scenes/openclawfreemodel/Scene7_TokensUsage";
import { OpenClawFreeModel_Scene8_Summary } from "./scenes/openclawfreemodel/Scene8_Summary";
import { CaptionDisplay } from "./components/CaptionDisplay";

// 场景时长配置（单位：帧，30fps）
// 基于实际音频时长 + 30帧缓冲
// scene1: 13.76秒 → 413帧 + 30 = 443帧
// scene2: 19.52秒 → 586帧 + 30 = 616帧
// scene2.5: 图片展示场景 → 90帧（3秒）
// scene3: 25.76秒 → 773帧 + 30 = 803帧
// scene3.5: 图片展示场景 → 90帧（3秒）
// scene4: 26.80秒 → 804帧 + 30 = 834帧
// scene5: 26.48秒 → 794帧 + 30 = 824帧
// scene6: 18.16秒 → 545帧 + 30 = 575帧
// scene6.5: 图片展示场景 → 90帧（3秒）
// scene7: 20.96秒 → 629帧 + 30 = 659帧
// scene7.5: 图片展示场景 → 90帧（3秒）
// scene8: 28.80秒 → 864帧 + 30 = 894帧
const SCENE_DURATIONS = {
    scene1: 443,   // 13.76秒 + 30帧缓冲
    scene2: 616,   // 19.52秒 + 30帧缓冲
    scene2_5: 90,  // 图片展示场景（3秒）
    scene3: 803,   // 25.76秒 + 30帧缓冲
    scene3_5: 90,  // 图片展示场景（3秒）
    scene4: 834,   // 26.80秒 + 30帧缓冲
    scene5: 824,   // 26.48秒 + 30帧缓冲
    scene6: 575,   // 18.16秒 + 30帧缓冲
    scene6_5: 90,  // 图片展示场景（3秒）
    scene7: 659,   // 20.96秒 + 30帧缓冲
    scene7_5: 90,  // 图片展示场景（3秒）
    scene8: 894,   // 28.80秒 + 30帧缓冲
};

// 累计帧数计算
const s1Start = 0;
const s2Start = s1Start + SCENE_DURATIONS.scene1;
const s2_5Start = s2Start + SCENE_DURATIONS.scene2;
const s3Start = s2_5Start + SCENE_DURATIONS.scene2_5;
const s3_5Start = s3Start + SCENE_DURATIONS.scene3;
const s4Start = s3_5Start + SCENE_DURATIONS.scene3_5;
const s5Start = s4Start + SCENE_DURATIONS.scene4;
const s6Start = s5Start + SCENE_DURATIONS.scene5;
const s6_5Start = s6Start + SCENE_DURATIONS.scene6;
const s7Start = s6_5Start + SCENE_DURATIONS.scene6_5;
const s7_5Start = s7Start + SCENE_DURATIONS.scene7;
const s8Start = s7_5Start + SCENE_DURATIONS.scene7_5;

export const OPENCLAWFREEMODEL_TOTAL_DURATION =
    SCENE_DURATIONS.scene1 +
    SCENE_DURATIONS.scene2 +
    SCENE_DURATIONS.scene2_5 +
    SCENE_DURATIONS.scene3 +
    SCENE_DURATIONS.scene3_5 +
    SCENE_DURATIONS.scene4 +
    SCENE_DURATIONS.scene5 +
    SCENE_DURATIONS.scene6 +
    SCENE_DURATIONS.scene6_5 +
    SCENE_DURATIONS.scene7 +
    SCENE_DURATIONS.scene7_5 +
    SCENE_DURATIONS.scene8;

interface OpenClawFreeModelVideoProps {
    showCaptions?: boolean;
}

export const OpenClawFreeModelVideo: React.FC<OpenClawFreeModelVideoProps> = ({
    showCaptions = true,
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
            {/* 场景1：开场钩子 */}
            <Sequence from={s1Start} durationInFrames={SCENE_DURATIONS.scene1}>
                <AbsoluteFill>
                    <OpenClawFreeModel_Scene1_Hook />
                    <Audio src={staticFile("OpenClawFreeModelVideo/scene1-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawFreeModelVideo/scene1-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景2：为什么需要大模型 */}
            <Sequence from={s2Start} durationInFrames={SCENE_DURATIONS.scene2}>
                <AbsoluteFill>
                    <OpenClawFreeModel_Scene2_WhyNeed />
                    <Audio src={staticFile("OpenClawFreeModelVideo/scene2-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawFreeModelVideo/scene2-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景2.5：大模型注册流程图 */}
            <Sequence from={s2_5Start} durationInFrames={SCENE_DURATIONS.scene2_5}>
                <AbsoluteFill>
                    <OpenClawFreeModel_Scene2_5_RegistrationFlow />
                </AbsoluteFill>
            </Sequence>

            {/* 场景3：免费平台大盘点 */}
            <Sequence from={s3Start} durationInFrames={SCENE_DURATIONS.scene3}>
                <AbsoluteFill>
                    <OpenClawFreeModel_Scene3_Platforms />
                    <Audio src={staticFile("OpenClawFreeModelVideo/scene3-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawFreeModelVideo/scene3-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景3.5：平台对比图 */}
            <Sequence from={s3_5Start} durationInFrames={SCENE_DURATIONS.scene3_5}>
                <AbsoluteFill>
                    <OpenClawFreeModel_Scene3_5_PlatformChart />
                </AbsoluteFill>
            </Sequence>

            {/* 场景4：智谱AI注册教程 */}
            <Sequence from={s4Start} durationInFrames={SCENE_DURATIONS.scene4}>
                <AbsoluteFill>
                    <OpenClawFreeModel_Scene4_ZhipuTutorial />
                    <Audio src={staticFile("OpenClawFreeModelVideo/scene4-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawFreeModelVideo/scene4-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景5：第三方平台薅羊毛 */}
            <Sequence from={s5Start} durationInFrames={SCENE_DURATIONS.scene5}>
                <AbsoluteFill>
                    <OpenClawFreeModel_Scene5_ThirdParty />
                    <Audio src={staticFile("OpenClawFreeModelVideo/scene5-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawFreeModelVideo/scene5-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景6：不同模型怎么选 */}
            <Sequence from={s6Start} durationInFrames={SCENE_DURATIONS.scene6}>
                <AbsoluteFill>
                    <OpenClawFreeModel_Scene6_ModelSelection />
                    <Audio src={staticFile("OpenClawFreeModelVideo/scene6-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawFreeModelVideo/scene6-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景6.5：模型选择指南图 */}
            <Sequence from={s6_5Start} durationInFrames={SCENE_DURATIONS.scene6_5}>
                <AbsoluteFill>
                    <OpenClawFreeModel_Scene6_5_SelectionGuide />
                </AbsoluteFill>
            </Sequence>

            {/* 场景7：tokens是什么 */}
            <Sequence from={s7Start} durationInFrames={SCENE_DURATIONS.scene7}>
                <AbsoluteFill>
                    <OpenClawFreeModel_Scene7_TokensUsage />
                    <Audio src={staticFile("OpenClawFreeModelVideo/scene7-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawFreeModelVideo/scene7-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>

            {/* 场景7.5：tokens用量估算图表 */}
            <Sequence from={s7_5Start} durationInFrames={SCENE_DURATIONS.scene7_5}>
                <AbsoluteFill>
                    <OpenClawFreeModel_Scene7_5_TokensChart />
                </AbsoluteFill>
            </Sequence>

            {/* 场景8：结尾互动 */}
            <Sequence from={s8Start} durationInFrames={SCENE_DURATIONS.scene8}>
                <AbsoluteFill>
                    <OpenClawFreeModel_Scene8_Summary />
                    <Audio src={staticFile("OpenClawFreeModelVideo/scene8-audio.mp3")} volume={0.8} />
                    {showCaptions && (
                        <CaptionDisplay captionFile="OpenClawFreeModelVideo/scene8-captions.json" />
                    )}
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};

export const OPENCLAWFREEMODEL_CONFIG = {
    totalDuration: OPENCLAWFREEMODEL_TOTAL_DURATION,
    totalSeconds: Math.round(OPENCLAWFREEMODEL_TOTAL_DURATION / 30),
    sceneDurations: SCENE_DURATIONS,
    fps: 30,
    width: 1920,
    height: 1080,
};
