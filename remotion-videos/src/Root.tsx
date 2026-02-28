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
import { SelfAttentionVideo } from "./SelfAttentionVideo";
import { PromptEngineeringVideo } from "./PromptEngineeringVideo";
import { TasteCurationVideo } from "./TasteCurationVideo";
import { MasterPromptVideo } from "./MasterPromptVideo";
import { OutputIterationVideo } from "./OutputIterationVideo";
import { UniversalRulesVideo } from "./UniversalRulesVideo";

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

      {/* 自我注意力机制视频 */}
      <Composition
        id="SelfAttentionVideo"
        component={SelfAttentionVideo}
        durationInFrames={4835} // 总帧数：485+488+532+613+568+628+564+531+411+180+转场135=5135帧，约171.17秒（9个场景+1个结尾+9个转场，基于实际音频时长+30帧）
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "自我注意力机制",
          showCaptions: true,
          backgroundMusicVolume: 0.15
        }}
      />

      {/* 提示词工程视频（普通人也能用好AI系列·技能一） */}
      <Composition
        id="PromptEngineeringVideo"
        component={PromptEngineeringVideo}
        durationInFrames={6819} // 总帧数：604+748+519+782+613+563+647+709+1081+668=6934帧，减去9个转场×15帧=135帧，实际6799帧，约226.6秒
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "学会和AI好好说话——四步提问法",
          showCaptions: true,
        }}
      />

      {/* AI审美鉴赏视频（普通人也能用好AI系列·技能二） */}
      <Composition
        id="TasteCurationVideo"
        component={TasteCurationVideo}
        durationInFrames={5468} // 实际帧数：925+757+644+853+842+714+669+169=5573帧，减去7个转场×15帧=105帧，实际5468帧
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "培养你的AI审美——审美鉴赏（Taste Curation）",
          showCaptions: true,
        }}
      />

      {/* 大师提示词视频（普通人也能用好AI系列·技能三） */}
      <Composition
        id="MasterPromptVideo"
        component={MasterPromptVideo}
        durationInFrames={5033} // 813+730+678+980+909+860+153=5123帧，减去6个转场×15帧=90帧，实际5033帧
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "给AI办一张身份证——大师提示词（Master Prompt）",
          showCaptions: true,
        }}
      />

      {/* 输出迭代视频（普通人也能用好AI系列·技能四） */}
      <Composition
        id="OutputIterationVideo"
        component={OutputIterationVideo}
        durationInFrames={4207} // 832+788+791+858+993+120=4382帧，减去5个转场×15帧=75帧，实际4307帧
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "学会和AI掰手腕——输出迭代（Output Iteration）",
          showCaptions: true,
        }}
      />

      {/* 通用规则视频（普通人也能用好AI系列·技能五） */}
      <Composition
        id="UniversalRulesVideo"
        component={UniversalRulesVideo}
        durationInFrames={5280} // 870+930+720+960+900+810+180=5370帧，减去6个转场×15帧=90帧，实际5280帧（待音频生成后更新）
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "给AI立个规矩——通用规则（Universal Rules）",
          showCaptions: true,
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