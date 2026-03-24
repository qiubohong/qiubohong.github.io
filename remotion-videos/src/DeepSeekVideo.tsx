import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Sequence, useVideoConfig, staticFile } from "remotion";
import { EndingScene } from "./components/EndingScene";

// 使用动态导入场景组件
const Scene1_Opening = React.lazy(() => import("./scenes/deepseek/Scene1_Opening").then(m => ({ default: m.Scene1_Opening })));
const Scene2_Background = React.lazy(() => import("./scenes/deepseek/Scene2_Background").then(m => ({ default: m.Scene2_Background })));
const Scene3_SweetSpot = React.lazy(() => import("./scenes/deepseek/Scene3_SweetSpot").then(m => ({ default: m.Scene3_SweetSpot })));
const Scene4_Computing = React.lazy(() => import("./scenes/deepseek/Scene4_Computing").then(m => ({ default: m.Scene4_Computing })));
const Scene5_Ethics = React.lazy(() => import("./scenes/deepseek/Scene5_Ethics").then(m => ({ default: m.Scene5_Ethics })));
const Scene6_Architecture = React.lazy(() => import("./scenes/deepseek/Scene6_Architecture").then(m => ({ default: m.Scene6_Architecture })));
const Scene7_Ending = React.lazy(() => import("./scenes/deepseek/Scene7_Ending").then(m => ({ default: m.Scene7_Ending })));

// Scene durations (基于音频时长计算)
// 30fps: 音频秒数 * 30 + 30帧缓冲
const INITIAL_SCENE_DURATIONS = {
  scene1: 658,  // 20.96s + 30帧缓冲
  scene2: 666,  // 21.20s + 30帧缓冲
  scene3: 610,  // 19.36s + 30帧缓冲
  scene4: 754,  // 24.16s + 30帧缓冲
  scene5: 668,  // 21.28s + 30帧缓冲
  scene6: 649,  // 20.64s + 30帧缓冲
  scene7: 870,  // 26s（整合第五、六、七轮辩论+尾声）
  ending: 180,  // EndingScene 6秒固定
};

export const DeepSeekVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  const [durations, setDurations] = useState(INITIAL_SCENE_DURATIONS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 加载音频时长
    const loadDurations = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/DeepSeekVideo/durations.json"
        );
        if (response.ok) {
          const data = await response.json();
          setDurations(data);
        }
      } catch {
        // 使用初始时长
      }
      setIsLoading(false);
    };
    loadDurations();
  }, []);

  const seq = (sceneNumber: number): number => {
    const keys = Object.keys(durations) as Array<keyof typeof durations>;
    let total = 0;
    for (let i = 1; i < sceneNumber; i++) {
      const key = `scene${i}` as keyof typeof durations;
      if (key in durations) {
        total += durations[key] || 0;
      }
    }
    return total;
  };

  if (isLoading) {
    return (
      <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
        <div style={{ color: "white", textAlign: "center", marginTop: 40 }}>
          加载中...
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
      {/* 背景音乐 */}

      {/* Scene 1: 开场引入 */}
      <Sequence
        from={seq(1)}
        durationInFrames={durations.scene1}
        name="Scene1_Opening"
      >
<React.Suspense fallback={<AbsoluteFill style={{ backgroundColor: "#0d1117" }} />}>
          <Scene1_Opening />
        </React.Suspense>
        <Audio src={staticFile("DeepSeekVideo/scene1-audio.mp3")} volume={1} />
      </Sequence>

      {/* Scene 2: 背景知识 */}
      <Sequence
        from={seq(2)}
        durationInFrames={durations.scene2}
        name="Scene2_Background"
      >
<React.Suspense fallback={<AbsoluteFill style={{ backgroundColor: "#0d1117" }} />}>
          <Scene2_Background />
        </React.Suspense>
        <Audio src={staticFile("DeepSeekVideo/scene2-audio.mp3")} volume={1} />
      </Sequence>

      {/* Scene 3: 推理甜点区 */}
      <Sequence
        from={seq(3)}
        durationInFrames={durations.scene3}
        name="Scene3_SweetSpot"
      >
<React.Suspense fallback={<AbsoluteFill style={{ backgroundColor: "#0d1117" }} />}>
          <Scene3_SweetSpot />
        </React.Suspense>
        <Audio src={staticFile("DeepSeekVideo/scene3-audio.mp3")} volume={1} />
      </Sequence>

      {/* Scene 4: 国产算力 */}
      <Sequence
        from={seq(4)}
        durationInFrames={durations.scene4}
        name="Scene4_Computing"
      >
<React.Suspense fallback={<AbsoluteFill style={{ backgroundColor: "#0d1117" }} />}>
          <Scene4_Computing />
        </React.Suspense>
        <Audio src={staticFile("DeepSeekVideo/scene4-audio.mp3")} volume={1} />
      </Sequence>

      {/* Scene 5: 安全伦理 */}
      <Sequence
        from={seq(5)}
        durationInFrames={durations.scene5}
        name="Scene5_Ethics"
      >
<React.Suspense fallback={<AbsoluteFill style={{ backgroundColor: "#0d1117" }} />}>
          <Scene5_Ethics />
        </React.Suspense>
        <Audio src={staticFile("DeepSeekVideo/scene5-audio.mp3")} volume={1} />
      </Sequence>

      {/* Scene 6: 架构升级 */}
      <Sequence
        from={seq(6)}
        durationInFrames={durations.scene6}
        name="Scene6_Architecture"
      >
<React.Suspense fallback={<AbsoluteFill style={{ backgroundColor: "#0d1117" }} />}>
          <Scene6_Architecture />
        </React.Suspense>
        <Audio src={staticFile("DeepSeekVideo/scene6-audio.mp3")} volume={1} />
      </Sequence>

      {/* Scene 7: 尾声 */}
      <Sequence
        from={seq(7)}
        durationInFrames={durations.scene7}
        name="Scene7_Ending"
      >
<React.Suspense fallback={<AbsoluteFill style={{ backgroundColor: "#0d1117" }} />}>
          <Scene7_Ending />
        </React.Suspense>
        <Audio src={staticFile("DeepSeekVideo/scene7-audio.mp3")} volume={1} />
      </Sequence>

      {/* 通用结束场景 */}
      <Sequence
        from={seq(8)}
        durationInFrames={durations.ending}
        name="EndingScene"
      >
        <EndingScene
          mainTitle="DeepSeek"
          subtitle="V4/R2 发展观察"
          description="感谢观看｜你觉得 V4 和 R2 何时能发布？评论区见！"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
