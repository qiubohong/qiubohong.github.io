import { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Sequence, useVideoConfig, staticFile } from "remotion";
import { Scene1_Opening } from "./scenes/codeagent/Scene1_Opening";
import { Scene2_VisualComparison } from "./scenes/codeagent/Scene2_VisualComparison";
import { Scene3_Architecture } from "./scenes/codeagent/Scene3_Architecture";
import { Scene4_Workflow } from "./scenes/codeagent/Scene4_Workflow";
import { Scene5_CodeExample } from "./scenes/codeagent/Scene5_CodeExample";
import { Scene6_Products } from "./scenes/codeagent/Scene6_Products";
import { Scene7_Summary } from "./scenes/codeagent/Scene7_Summary";
import { EndingScene } from "./components/EndingScene";

// Scene durations calculated from audio (with 30fps + 30 frames buffer)
const INITIAL_SCENE_DURATIONS = {
  scene1: 246,  // 7.20s → 216 + 30 buffer
  scene2: 543,  // 17.12s → 513 + 30 buffer
  scene3: 598,  // 18.96s → 568 + 30 buffer
  scene4: 507,  // 15.92s → 477 + 30 buffer
  scene5: 579,  // 18.32s → 549 + 30 buffer
  scene6: 800,  // 25.68s → 770 + 30 buffer
  scene7: 598,  // 18.96s → 568 + 30 buffer
  ending: 180,  // EndingScene fixed 6s
};

// Code example for scene 5
const CODE_EXAMPLE = `from github_agent import CodeAgent

# 初始化 AI 代码助手
agent = CodeAgent(api_key="your-key")

# 发送需求，自动生成代码
result = agent.generate_code(
    prompt="实现一个用户认证系统，添加登录和注册功能",
    language="python"
)

# 获取生成的代码
print(result.code)
# 获取优化建议
print(result.suggestions)`;

export const CodeAgentVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  const [durations, setDurations] = useState(INITIAL_SCENE_DURATIONS);

  useEffect(() => {
    // Load audio durations from file if available
    const loadDurations = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/CodeAgent21/durations.json"
        );
        if (response.ok) {
          const data = await response.json();
          setDurations(data);
        }
      } catch {
        // Use initial durations if file not available
      }
    };
    loadDurations();
  }, []);

  const seq = (sceneNumber: number): number => {
    const keys = Object.keys(durations) as Array<keyof typeof durations>;
    let total = 0;
    for (let i = 1; i < sceneNumber; i++) {
      total += durations[`scene${i}` as keyof typeof durations] || 0;
    }
    return total;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
      {/* Background music */}

      {/* Scene 1: Opening */}
      <Sequence
        from={seq(1)}
        durationInFrames={durations.scene1}
        name="Scene1_Opening"
      >
        <Scene1_Opening />
        <Audio
src={staticFile("CodeAgent21/scene1.mp3")}
          volume={1}
        />
      </Sequence>

      {/* Scene 2: Visual Comparison */}
      <Sequence
        from={seq(2)}
        durationInFrames={durations.scene2}
        name="Scene2_VisualComparison"
      >
        <Scene2_VisualComparison />
        <Audio
src={staticFile("CodeAgent21/scene2.mp3")}
          volume={1}
        />
      </Sequence>

      {/* Scene 3: Architecture */}
      <Sequence
        from={seq(3)}
        durationInFrames={durations.scene3}
        name="Scene3_Architecture"
      >
        <Scene3_Architecture />
        <Audio
src={staticFile("CodeAgent21/scene3.mp3")}
          volume={1}
        />
      </Sequence>

      {/* Scene 4: Workflow */}
      <Sequence
        from={seq(4)}
        durationInFrames={durations.scene4}
        name="Scene4_Workflow"
      >
        <Scene4_Workflow />
        <Audio
src={staticFile("CodeAgent21/scene4.mp3")}
          volume={1}
        />
      </Sequence>

      {/* Scene 5: Code Example */}
      <Sequence
        from={seq(5)}
        durationInFrames={durations.scene5}
        name="Scene5_CodeExample"
      >
        <Scene5_CodeExample code={CODE_EXAMPLE} />
        <Audio
src={staticFile("CodeAgent21/scene5.mp3")}
          volume={1}
        />
      </Sequence>

      {/* Scene 6: Products */}
      <Sequence
        from={seq(6)}
        durationInFrames={durations.scene6}
        name="Scene6_Products"
      >
        <Scene6_Products />
        <Audio
src={staticFile("CodeAgent21/scene6.mp3")}
          volume={1}
        />
      </Sequence>

      {/* Scene 7: Summary */}
      <Sequence
        from={seq(7)}
        durationInFrames={durations.scene7}
        name="Scene7_Summary"
      >
        <Scene7_Summary />
        <Audio
src={staticFile("CodeAgent21/scene7.mp3")}
          volume={1}
        />
      </Sequence>

      {/* Ending Scene */}
      <Sequence
        from={seq(8)}
        durationInFrames={durations.ending}
        name="EndingScene"
      >
        <EndingScene
          mainTitle="Code Agent"
          subtitle="AI程序员助手"
          description="让AI成为你的编程搭档，从此告别996！"
        />
      </Sequence>
    </AbsoluteFill>
  );
};