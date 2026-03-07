import * as React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { Scene1_Introduction } from "./Scene1_Introduction";
import { Scene2_Definition } from "./Scene2_Definition";
import { Scene3_Types } from "./Scene3_Types";
import { Scene4_CostCalculation } from "./Scene4_CostCalculation";
import { Scene5_Applications } from "./Scene5_Applications";
import { Scene6_Conclusion } from "./Scene6_Conclusion";
import { EndingScene } from "../../components/EndingScene";
import { CaptionDisplay } from "../../components/CaptionDisplay";

// 场景时长配置（单位：帧，30fps）
// 基于实际音频时长 + 30帧缓冲
const SCENE_DURATIONS = {
  scene1: 769, // 24.64秒音频 + 30帧缓冲
  scene2: 939, // 30.32秒音频 + 30帧缓冲
  scene3: 886, // 28.56秒音频 + 30帧缓冲
  scene4: 1256, // 40.88秒音频 + 30帧缓冲
  scene5: 1198, // 38.96秒音频 + 30帧缓冲
  scene6: 1078, // 34.96秒音频 + 30帧缓冲
  ending: 121, // 3.04秒音频 + 30帧缓冲
};

// 计算总时长
const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

interface TokenVideoVideoProps {
  title: string;
  showCaptions?: boolean;
  backgroundMusicVolume?: number;
}

export const TokenVideoVideo: React.FC<TokenVideoVideoProps> = ({
  title = "大模型 Token 是什么？3 分钟搞懂 AI 计费秘密！",
  showCaptions = true,
  backgroundMusicVolume = 0.15
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
      {/* 场景1：介绍 */}
      <Sequence from={0} durationInFrames={SCENE_DURATIONS.scene1}>
        <AbsoluteFill>
          <Scene1_Introduction title={title} />
          <Audio
            src={staticFile("TokenVideo/scene1-audio.mp3")}
            volume={0.8}
          />
          {showCaptions && (
            <CaptionDisplay captionFile="TokenVideo/scene1-captions.json" />
          )}
        </AbsoluteFill>
      </Sequence>
      
      {/* 场景2：定义 */}
      <Sequence from={SCENE_DURATIONS.scene1} durationInFrames={SCENE_DURATIONS.scene2}>
        <AbsoluteFill>
          <Scene2_Definition title="Token 定义与工作原理" />
          <Audio
            src={staticFile("TokenVideo/scene2-audio.mp3")}
            volume={0.8}
          />
          {showCaptions && (
            <CaptionDisplay captionFile="TokenVideo/scene2-captions.json" />
          )}
        </AbsoluteFill>
      </Sequence>
      
      {/* 场景3：类型 */}
      <Sequence from={SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2} durationInFrames={SCENE_DURATIONS.scene3}>
        <AbsoluteFill>
          <Scene3_Types title="不同模型的 Token 策略" />
          <Audio
            src={staticFile("TokenVideo/scene3-audio.mp3")}
            volume={0.8}
          />
          {showCaptions && (
            <CaptionDisplay captionFile="TokenVideo/scene3-captions.json" />
          )}
        </AbsoluteFill>
      </Sequence>
      
      {/* 场景4：成本计算 */}
      <Sequence from={SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2 + SCENE_DURATIONS.scene3} durationInFrames={SCENE_DURATIONS.scene4}>
        <AbsoluteFill>
          <Scene4_CostCalculation title="成本计算实战" />
          <Audio
            src={staticFile("TokenVideo/scene4-audio.mp3")}
            volume={0.8}
          />
          {showCaptions && (
            <CaptionDisplay captionFile="TokenVideo/scene4-captions.json" />
          )}
        </AbsoluteFill>
      </Sequence>
      
      {/* 场景5：应用案例 */}
      <Sequence from={SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2 + SCENE_DURATIONS.scene3 + SCENE_DURATIONS.scene4} durationInFrames={SCENE_DURATIONS.scene5}>
        <AbsoluteFill>
          <Scene5_Applications title="实际应用案例" />
          <Audio
            src={staticFile("TokenVideo/scene5-audio.mp3")}
            volume={0.8}
          />
          {showCaptions && (
            <CaptionDisplay captionFile="TokenVideo/scene5-captions.json" />
          )}
        </AbsoluteFill>
      </Sequence>
      
      {/* 场景6：总结 */}
      <Sequence from={SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2 + SCENE_DURATIONS.scene3 + SCENE_DURATIONS.scene4 + SCENE_DURATIONS.scene5} durationInFrames={SCENE_DURATIONS.scene6}>
        <AbsoluteFill>
          <Scene6_Conclusion title="总结与展望" />
          <Audio
            src={staticFile("TokenVideo/scene6-audio.mp3")}
            volume={0.8}
          />
          {showCaptions && (
            <CaptionDisplay captionFile="TokenVideo/scene6-captions.json" />
          )}
        </AbsoluteFill>
      </Sequence>
      
      {/* 结束场景 */}
      <Sequence from={SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2 + SCENE_DURATIONS.scene3 + SCENE_DURATIONS.scene4 + SCENE_DURATIONS.scene5 + SCENE_DURATIONS.scene6} durationInFrames={SCENE_DURATIONS.ending}>
        <AbsoluteFill>
          <EndingScene 
            mainTitle="5分钟 AI"
            subtitle="每天搞懂一个知识点！"
            description="大模型 Token - AI计费与分词的核心秘密"
          />
          <Audio
            src={staticFile("TokenVideo/ending-audio.mp3")}
            volume={0.8}
          />
          {showCaptions && (
            <CaptionDisplay captionFile="TokenVideo/ending-captions.json" />
          )}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

// 导出配置信息
export const TOKENVIDEO_CONFIG = {
  totalDuration: TOTAL_DURATION,
  totalSeconds: Math.round(TOTAL_DURATION / 30),
  sceneDurations: SCENE_DURATIONS,
  fps: 30,
  width: 1920,
  height: 1080,
};

// 导出场景顺序
export const SCENE_SEQUENCE = [
  { id: "TokenVideo-Scene1", name: "介绍", duration: SCENE_DURATIONS.scene1 },
  { id: "TokenVideo-Scene2", name: "定义", duration: SCENE_DURATIONS.scene2 },
  { id: "TokenVideo-Scene3", name: "类型", duration: SCENE_DURATIONS.scene3 },
  { id: "TokenVideo-Scene4", name: "成本计算", duration: SCENE_DURATIONS.scene4 },
  { id: "TokenVideo-Scene5", name: "应用案例", duration: SCENE_DURATIONS.scene5 },
  { id: "TokenVideo-Scene6", name: "总结", duration: SCENE_DURATIONS.scene6 },
  { id: "TokenVideo-Ending", name: "结束", duration: SCENE_DURATIONS.ending },
];

console.log(`🎬 TokenVideo 视频配置：`);
console.log(`   总时长：${Math.round(TOTAL_DURATION / 30)}秒 (${TOTAL_DURATION}帧)`);
console.log(`   场景数：${SCENE_SEQUENCE.length}个`);
console.log(`   分辨率：1920x1080`);
console.log(`   帧率：30fps`);