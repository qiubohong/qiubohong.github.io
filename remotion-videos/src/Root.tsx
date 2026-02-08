import React from "react";
import { Composition } from "remotion";
import { SupervisedLearningVideo } from "./SupervisedLearningVideo";

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