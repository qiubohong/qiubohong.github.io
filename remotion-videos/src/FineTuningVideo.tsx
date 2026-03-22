import { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Sequence, useVideoConfig, staticFile } from "remotion";
import { Scene1_Opening } from "./scenes/finetuning/Scene1_Opening";
import { Scene2_Concept } from "./scenes/finetuning/Scene2_Concept";
import { Scene3_Workflow } from "./scenes/finetuning/Scene3_Workflow";
import { Scene4_Summary } from "./scenes/finetuning/Scene4_Summary";
import { Scene5_Strategy } from "./scenes/finetuning/Scene5_Strategy";
import { Scene6_Case } from "./scenes/finetuning/Scene6_Case";
import { Scene7_Comparison } from "./scenes/finetuning/Scene7_Comparison";
import { Scene8_Ending } from "./scenes/finetuning/Scene8_Ending";
import { EndingScene } from "./components/EndingScene";

// Scene durations calculated from audio (with 30fps + 30 frames buffer)
const INITIAL_SCENE_DURATIONS = {
  scene1: 481,  // 15.04s → 451 + 30 buffer
  scene2: 894,  // 28.80s → 864 + 30 buffer
  scene3: 937,  // 30.24s → 907 + 30 buffer
  scene4: 447,  // 13.92s → 417 + 30 buffer
  scene5: 766,  // 24.56s → 736 + 30 buffer
  scene6: 966,  // 31.20s → 936 + 30 buffer
  scene7: 733,  // 23.44s → 703 + 30 buffer
  scene8: 466,  // 14.56s → 436 + 30 buffer
  ending: 180,  // EndingScene fixed 6s
};

export const FineTuningVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  const [durations, setDurations] = useState(INITIAL_SCENE_DURATIONS);

  useEffect(() => {
    // Load audio durations from file if available
    const loadDurations = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/FineTuningVideo/durations.json"
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
          src={staticFile("FineTuningVideo/scene1-audio.mp3")}
          volume={0.9}
        />
      </Sequence>

      {/* Scene 2: Concept */}
      <Sequence
        from={seq(2)}
        durationInFrames={durations.scene2}
        name="Scene2_Concept"
      >
        <Scene2_Concept />
        <Audio
          src={staticFile("FineTuningVideo/scene2-audio.mp3")}
          volume={0.9}
        />
      </Sequence>

      {/* Scene 3: Workflow */}
      <Sequence
        from={seq(3)}
        durationInFrames={durations.scene3}
        name="Scene3_Workflow"
      >
        <Scene3_Workflow />
        <Audio
          src={staticFile("FineTuningVideo/scene3-audio.mp3")}
          volume={0.9}
        />
      </Sequence>

      {/* Scene 4: Summary */}
      <Sequence
        from={seq(4)}
        durationInFrames={durations.scene4}
        name="Scene4_Summary"
      >
        <Scene4_Summary />
        <Audio
          src={staticFile("FineTuningVideo/scene4-audio.mp3")}
          volume={0.9}
        />
      </Sequence>

      {/* Scene 5: Strategy */}
      <Sequence
        from={seq(5)}
        durationInFrames={durations.scene5}
        name="Scene5_Strategy"
      >
        <Scene5_Strategy />
        <Audio
          src={staticFile("FineTuningVideo/scene5-audio.mp3")}
          volume={0.9}
        />
      </Sequence>

      {/* Scene 6: Case */}
      <Sequence
        from={seq(6)}
        durationInFrames={durations.scene6}
        name="Scene6_Case"
      >
        <Scene6_Case />
        <Audio
          src={staticFile("FineTuningVideo/scene6-audio.mp3")}
          volume={0.9}
        />
      </Sequence>

      {/* Scene 7: Comparison */}
      <Sequence
        from={seq(7)}
        durationInFrames={durations.scene7}
        name="Scene7_Comparison"
      >
        <Scene7_Comparison />
        <Audio
          src={staticFile("FineTuningVideo/scene7-audio.mp3")}
          volume={0.9}
        />
      </Sequence>

      {/* Scene 8: Ending */}
      <Sequence
        from={seq(8)}
        durationInFrames={durations.scene8}
        name="Scene8_Ending"
      >
        <Scene8_Ending />
        <Audio
          src={staticFile("FineTuningVideo/scene8-audio.mp3")}
          volume={0.9}
        />
      </Sequence>

      {/* Ending Scene */}
      <Sequence
        from={seq(9)}
        durationInFrames={durations.ending}
        name="EndingScene"
      >
        <EndingScene />
        <Audio
          src={staticFile("FineTuningVideo/ending-audio.mp3")}
          volume={0.9}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
