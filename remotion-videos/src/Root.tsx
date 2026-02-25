import React from "react";
import { Composition } from "remotion";
import { SupervisedLearningVideo } from "./SupervisedLearningVideo";
import { UnsupervisedLearningVideo } from "./UnsupervisedLearningVideo";
import { ReinforcementLearningVideo } from "./ReinforcementLearningVideo";
import { NeuralNetworkVideo } from "./NeuralNetworkVideo";
import { DeepLearningVideo } from "./DeepLearningVideo";
import { AILearningRoadVideo } from "./AILearningRoadVideo";
import { CNNVideo } from "./CNNVideo";
import { ActivationFunctionVideo } from "./ActivationFunctionVideo";
import { LossFunctionVideo } from "./LossFunctionVideo";
import { RNNVideo } from "./RNNVideo";
import { TransformerVideo } from "./TransformerVideo";

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

      {/* CNN卷积网络视频 */}
      <Composition
        id="CNNVideo"
        component={CNNVideo}
        durationInFrames={4223} // 总帧数：4523帧，约150.77秒（7个场景+6个转场，每场景+30帧缓冲）
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "卷积网络CNN"
        }}
      />

      {/* 激活函数视频 */}
      <Composition
        id="ActivationFunctionVideo"
        component={ActivationFunctionVideo}
        durationInFrames={5921} // 总帧数：510+660+510+420+510+600+330+270+420+420+250+转场201=5101帧，约170.03秒（除Scene5和Scene6b外每场景+30帧）
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "激活函数"
        }}
      />

      {/* 损失函数视频 */}
      <Composition
        id="LossFunctionVideo"
        component={LossFunctionVideo}
        durationInFrames={3849} // 总帧数：480+660+480+630+390+510+660+180+转场149=4139帧，约137.97秒（每场景=音频时长+30帧）
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "损失函数"
        }}
      />

      {/* RNN循环网络视频 */}
      <Composition
        id="RNNVideo"
        component={RNNVideo}
        durationInFrames={6139} // 总帧数：259+20+827+25+868+15+894+22+730+22+1174+15+1398+30+140=6439帧，约214.63秒（基于实际音频时长+30帧缓冲）
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "循环网络 RNN"
        }}
      />

      {/* Transformer视频 */}
      <Composition
        id="TransformerVideo"
        component={TransformerVideo}
        durationInFrames={3635} // 总帧数：493+501+570+443+584+791+363+转场90=3835帧，约127.83秒（7个场景+6个转场，每场景+30帧缓冲）
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Transformer",
          showCaptions: true,
          backgroundMusicVolume: 0.15
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