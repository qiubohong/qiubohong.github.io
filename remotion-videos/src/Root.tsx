import React from "react";
import { Composition } from "remotion";
import { SupervisedLearningVideo } from "./SupervisedLearningVideo";
import { UnsupervisedLearningVideo } from "./UnsupervisedLearningVideo";
import { ReinforcementLearningVideo } from "./ReinforcementLearningVideo";
import { NeuralNetworkVideo } from "./NeuralNetworkVideo";
import { DeepLearningVideo } from "./DeepLearningVideo";
import { AILearningRoadVideo } from "./AILearningRoadVideo";

export const RemotionRoot = () => {
  return (
    <>
      {/* 简单的音频测试 */}
      <Composition
        id="AudioTest"
        component={AudioTest}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 主视频 */}
      <Composition
        id="SupervisedLearningVideo"
        component={SupervisedLearningVideo}
        durationInFrames={1892} // 总帧数：1892帧，约63.07秒
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "监督学习概念讲解"
        }}
      />

      {/* 无监督学习视频 */}
      <Composition
        id="UnsupervisedLearningVideo"
        component={UnsupervisedLearningVideo}
        durationInFrames={3120} // 总帧数：3501帧，约116.71秒（含30帧缓冲规则）
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "无监督学习"
        }}
      />

      {/* 强化学习视频 */}
      <Composition
        id="ReinforcementLearningVideo"
        component={ReinforcementLearningVideo}
        durationInFrames={3728} // 总帧数：3728帧，约124.27秒（7个场景+转场+每场景30帧缓冲）
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "强化学习"
        }}
      />

      {/* 神经网络视频 */}
      <Composition
        id="NeuralNetworkVideo"
        component={NeuralNetworkVideo}
        durationInFrames={4402} // 总帧数：4742帧，约158.07秒（7个场景+转场+结尾+每场景30帧缓冲）
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "神经网络"
        }}
      />

      {/* 深度学习视频 */}
      <Composition
        id="DeepLearningVideo"
        component={DeepLearningVideo}
        durationInFrames={3200} // 总帧数：3625帧，约120.83秒（8个场景+转场+每场景30帧缓冲）
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "深度学习"
        }}
      />

      {/* AI学习路线视频 */}
      <Composition
        id="AILearningRoadVideo"
        component={AILearningRoadVideo}
        durationInFrames={4471} // 总帧数：4821帧，约160.7秒（7个场景+转场，每场景帧数=音频时长+30帧）
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "AI学习路线"
        }}
      />
    </>
  );
};

// 简单的音频测试组件
const AudioTest: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 60
      }}
    >
      <Audio src={staticFile("scene1-intro.mp3")} volume={1} />
      音频测试中...
    </div>
  );
};

import { staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";