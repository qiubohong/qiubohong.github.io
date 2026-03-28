import React from "react";
import { Series, Audio, staticFile } from "remotion";
import { Scene1_Hook } from "./Scene1_Hook";
import { Scene2_Concept } from "./Scene2_Concept";
import { Scene3_LoopDiagram } from "./Scene3_LoopDiagram";
import { Scene4_CaseStudy } from "./Scene4_CaseStudy";
import { Scene5_Architecture } from "./Scene5_Architecture";
import { Scene6_FunFacts } from "./Scene6_FunFacts";
import { EndingScene } from "../../components/EndingScene";

export const ReAct: React.FC = () => {
    // 场景时长配置（基于音频实际时长计算，30fps + 30帧缓冲）
    // scene1: 5.76s → 202帧 | scene2: 25.44s → 793帧 | scene3: 25.20s → 786帧
    // scene4: 31.84s → 985帧 | scene5: 31.52s → 975帧 | scene6: 42.72s → 1311帧
    // ending: 9.04s → 301帧 | 总时长: 171.52s → 总帧数: 5353
    const sceneDurations = {
        scene1: 202,   // 5.76秒
        scene2: 793,   // 25.44秒
        scene3: 786,   // 25.20秒
        scene4: 985,   // 31.84秒
        scene5: 975,   // 31.52秒
        scene6: 1311,  // 42.72秒
        ending: 301,   // 9.04秒
    };

    return (
        <Series>
            <Series.Sequence durationInFrames={sceneDurations.scene1}>
                <Scene1_Hook />
                <Audio src={staticFile("ReAct/scene1-audio.mp3")} />
            </Series.Sequence>
            <Series.Sequence durationInFrames={sceneDurations.scene2}>
                <Scene2_Concept />
                <Audio src={staticFile("ReAct/scene2-audio.mp3")} />
            </Series.Sequence>
            <Series.Sequence durationInFrames={sceneDurations.scene3}>
                <Scene3_LoopDiagram />
                <Audio src={staticFile("ReAct/scene3-audio.mp3")} />
            </Series.Sequence>
            <Series.Sequence durationInFrames={sceneDurations.scene4}>
                <Scene4_CaseStudy />
                <Audio src={staticFile("ReAct/scene4-audio.mp3")} />
            </Series.Sequence>
            <Series.Sequence durationInFrames={sceneDurations.scene5}>
                <Scene5_Architecture />
                <Audio src={staticFile("ReAct/scene5-audio.mp3")} />
            </Series.Sequence>
            <Series.Sequence durationInFrames={sceneDurations.scene6}>
                <Scene6_FunFacts />
                <Audio src={staticFile("ReAct/scene6-audio.mp3")} />
            </Series.Sequence>
            <Series.Sequence durationInFrames={sceneDurations.ending}>
                <EndingScene
                    mainTitle="5分钟AI"
                    subtitle="每天搞懂一个知识点"
                    description="你觉得 ReAct 会如何改变我们与 AI 的交互方式？"
                    backgroundImage="ReAct/backgrounds/ending-bg.png"
                />
                <Audio src={staticFile("ReAct/ending-audio.mp3")} />
            </Series.Sequence>
        </Series>
    );
};