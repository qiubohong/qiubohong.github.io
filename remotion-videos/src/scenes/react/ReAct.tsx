import React from "react";
import { Series, Audio } from "remotion";
import { Scene1_Hook } from "./Scene1_Hook";
import { Scene2_Concept } from "./Scene2_Concept";
import { Scene3_LoopDiagram } from "./Scene3_LoopDiagram";
import { Scene4_CaseStudy } from "./Scene4_CaseStudy";
import { Scene5_Architecture } from "./Scene5_Architecture";
import { Scene6_FunFacts } from "./Scene6_FunFacts";
import { EndingScene } from "../../components/EndingScene";

export const ReAct: React.FC = () => {
    // 场景时长配置（基于音频实际时长预估）
    const sceneDurations = {
        scene1: 135,  // 2.25秒
        scene2: 465,  // 7.75秒
        scene3: 450,  // 7.5秒
        scene4: 645,  // 10.75秒
        scene5: 534,  // 8.9秒
        scene6: 765,  // 12.75秒
        ending: 240,  // 4秒
    };

    let currentFrame = 0;

    return (
        <>
            {/* 为每个场景添加音频 */}
            <Audio src="/ReAct/scene1-audio.mp3" startFrame={0} />
            <Audio src="/ReAct/scene2-audio.mp3" startFrame={currentFrame += sceneDurations.scene1} />
            <Audio src="/ReAct/scene3-audio.mp3" startFrame={currentFrame += sceneDurations.scene2} />
            <Audio src="/ReAct/scene4-audio.mp3" startFrame={currentFrame += sceneDurations.scene3} />
            <Audio src="/ReAct/scene5-audio.mp3" startFrame={currentFrame += sceneDurations.scene4} />
            <Audio src="/ReAct/scene6-audio.mp3" startFrame={currentFrame += sceneDurations.scene5} />
            <Audio src="/ReAct/ending-audio.mp3" startFrame={currentFrame += sceneDurations.scene6} />

            <Series>
                <Series.Sequence durationInFrames={sceneDurations.scene1}>
                    <Scene1_Hook />
                </Series.Sequence>
                <Series.Sequence durationInFrames={sceneDurations.scene2}>
                    <Scene2_Concept />
                </Series.Sequence>
                <Series.Sequence durationInFrames={sceneDurations.scene3}>
                    <Scene3_LoopDiagram />
                </Series.Sequence>
                <Series.Sequence durationInFrames={sceneDurations.scene4}>
                    <Scene4_CaseStudy />
                </Series.Sequence>
                <Series.Sequence durationInFrames={sceneDurations.scene5}>
                    <Scene5_Architecture />
                </Series.Sequence>
                <Series.Sequence durationInFrames={sceneDurations.scene6}>
                    <Scene6_FunFacts />
                </Series.Sequence>
                <Series.Sequence durationInFrames={sceneDurations.ending}>
                    <EndingScene
                        mainTitle="5分钟AI"
                        subtitle="每天搞懂一个知识点"
                        description="你觉得 ReAct 会如何改变我们与 AI 的交互方式？"
                        backgroundImage="ReAct/backgrounds/ending-bg.png"
                    />
                </Series.Sequence>
            </Series>
        </>
    );
};