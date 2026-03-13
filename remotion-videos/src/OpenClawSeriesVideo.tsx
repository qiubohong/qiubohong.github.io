import * as React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { OpenClawSeries_Scene1_Introduction } from "./scenes/openclaw-series/Scene1_Introduction";
import { OpenClawSeries_Scene2_FreeModels } from "./scenes/openclaw-series/Scene2_FreeModels";
import { OpenClawSeries_Scene3_Installation } from "./scenes/openclaw-series/Scene3_Installation";
import { OpenClawSeries_Scene4_Instructions } from "./scenes/openclaw-series/Scene4_Instructions";
import { OpenClawSeries_Scene5_Skills } from "./scenes/openclaw-series/Scene5_Skills";
import { OpenClawSeries_Scene6_Workflow } from "./scenes/openclaw-series/Scene6_Workflow";
import { OpenClawSeries_Scene7_Examples } from "./scenes/openclaw-series/Scene7_Examples";
import { OpenClawSeries_Scene8_Results } from "./scenes/openclaw-series/Scene8_Results";
import { EndingScene } from "./components/EndingScene";
import { CaptionDisplay } from "./components/CaptionDisplay";

// 场景时长配置（单位：帧，30fps）
// 基于实际音频时长 + 30帧缓冲
const SCENE_DURATIONS = {
    scene1: 981,   // 31.73秒 + 30帧缓冲
    scene2: 1020,  // 33.02秒 + 30帧缓冲
    scene3: 1521,  // 49.73秒 + 30帧缓冲
    scene4: 1627,  // 53.26秒 + 30帧缓冲
    scene5: 1701,  // 55.73秒 + 30帧缓冲
    scene6: 700,   // 23.33秒（工作流程）
    scene7: 700,   // 23.33秒（实战案例）
    scene8: 609,   // 20.3秒（效果对比）
    ending: 180,   // EndingScene固定6秒
};

// 过渡动画时长（15帧 = 0.5秒）
const TRANSITION_DURATION = 15;

// 计算总时长（减去过渡重叠部分）
const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0) - (8 * TRANSITION_DURATION);

interface OpenClawSeriesVideoProps {
    title?: string;
    showCaptions?: boolean;
    backgroundMusicVolume?: number;
}

export const OpenClawSeriesVideo: React.FC<OpenClawSeriesVideoProps> = ({
    title = "OpenClaw系列：让AI真正帮你干活的神器",
    showCaptions = true,
    backgroundMusicVolume = 0.15,
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
            <TransitionSeries>
                {/* 场景1：认识龙虾——OpenClaw是什么？ */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene1}>
                    <AbsoluteFill>
                        <OpenClawSeries_Scene1_Introduction />
                        <Audio
                            src={staticFile("OpenClawSeries/scene1-audio.mp3")}
                            volume={0.8}
                        />
                        {showCaptions && (
                            <CaptionDisplay captionFile="OpenClawSeries/scene1-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>

                {/* 过渡动画：淡入淡出 */}
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
                />

                {/* 场景2：白嫖大模型——免费额度获取 */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene2}>
                    <AbsoluteFill>
                        <OpenClawSeries_Scene2_FreeModels />
                        <Audio
                            src={staticFile("OpenClawSeries/scene2-audio.mp3")}
                            volume={0.8}
                        />
                        {showCaptions && (
                            <CaptionDisplay captionFile="OpenClawSeries/scene2-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
                />

                {/* 场景3：安装龙虾——5种安装方式 */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene3}>
                    <AbsoluteFill>
                        <OpenClawSeries_Scene3_Installation />
                        <Audio
                            src={staticFile("OpenClawSeries/scene3-audio.mp3")}
                            volume={0.8}
                        />
                        {showCaptions && (
                            <CaptionDisplay captionFile="OpenClawSeries/scene3-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
                />

                {/* 场景4：学会下指令——让AI听懂你 */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene4}>
                    <AbsoluteFill>
                        <OpenClawSeries_Scene4_Instructions />
                        <Audio
                            src={staticFile("OpenClawSeries/scene4-audio.mp3")}
                            volume={0.8}
                        />
                        {showCaptions && (
                            <CaptionDisplay captionFile="OpenClawSeries/scene4-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
                />

                {/* 场景5：装上技能包——扩展AI能力 */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene5}>
                    <AbsoluteFill>
                        <OpenClawSeries_Scene5_Skills />
                        <Audio
                            src={staticFile("OpenClawSeries/scene5-audio.mp3")}
                            volume={0.8}
                        />
                        {showCaptions && (
                            <CaptionDisplay captionFile="OpenClawSeries/scene5-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
                />

                {/* 场景6：工作流程揭秘——4步搞定 */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene6}>
                    <AbsoluteFill>
                        <OpenClawSeries_Scene6_Workflow />
                        <Audio
                            src={staticFile("OpenClawSeries/scene6-audio.mp3")}
                            volume={0.8}
                        />
                        {showCaptions && (
                            <CaptionDisplay captionFile="OpenClawSeries/scene6-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
                />

                {/* 场景7：实战案例演示——邮件与文档处理 */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene7}>
                    <AbsoluteFill>
                        <OpenClawSeries_Scene7_Examples />
                        <Audio
                            src={staticFile("OpenClawSeries/scene7-audio.mp3")}
                            volume={0.8}
                        />
                        {showCaptions && (
                            <CaptionDisplay captionFile="OpenClawSeries/scene7-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
                />

                {/* 场景8：效率对比分析——OpenClaw vs 传统方式 */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene8}>
                    <AbsoluteFill>
                        <OpenClawSeries_Scene8_Results />
                        <Audio
                            src={staticFile("OpenClawSeries/scene8-audio.mp3")}
                            volume={0.8}
                        />
                        {showCaptions && (
                            <CaptionDisplay captionFile="OpenClawSeries/scene8-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
                />

                {/* EndingScene：固定6秒结尾 */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.ending}>
                    <AbsoluteFill>
                        <EndingScene />
                        <Audio
                            src={staticFile("OpenClawSeries/ending-audio.mp3")}
                            volume={0.8}
                        />
                        {showCaptions && (
                            <CaptionDisplay captionFile="OpenClawSeries/ending-captions.json" />
                        )}
                    </AbsoluteFill>
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};

export const OPENCLAW_SERIES_CONFIG = {
    totalDuration: TOTAL_DURATION,
    totalSeconds: Math.round(TOTAL_DURATION / 30),
    sceneDurations: SCENE_DURATIONS,
    fps: 30,
    width: 1920,
    height: 1080,
};