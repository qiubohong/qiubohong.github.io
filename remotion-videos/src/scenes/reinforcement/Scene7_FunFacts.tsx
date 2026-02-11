import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ReinforcementScene7_FunFacts: React.FC = () => {
  const frame = useCurrentFrame();
  
  // 标题动画
  const titleOpacity = interpolate(
    frame,
    [0, 20],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 冷知识1动画
  const fact1Opacity = interpolate(
    frame,
    [40, 70],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 冷知识2动画
  const fact2Opacity = interpolate(
    frame,
    [100, 130],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#0f3460",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        fontFamily: "Arial, sans-serif",
        color: "white",
        width: "100%",
        height: "100%"
      }}
    >
      {/* 标题 */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: "bold",
          marginBottom: 60,
          textAlign: "center",
          opacity: titleOpacity,
          background: "linear-gradient(45deg, #ffd89b, #19547b)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        🎯 冷知识
      </h1>

      {/* 冷知识1 */}
      <div
        style={{
          fontSize: 34,
          lineHeight: 1.8,
          textAlign: "left",
          opacity: fact1Opacity,
          backgroundColor: "rgba(255, 216, 155, 0.15)",
          padding: 45,
          borderRadius: 20,
          borderLeft: "8px solid #ffd89b",
          maxWidth: "85%",
          width: "100%",
          marginBottom: 40
        }}
      >
        <p style={{ margin: 0 }}>
          💡 DeepMind用免模型 <strong style={{ color: "#ffd89b" }}>DQN</strong> 玩打砖块游戏，<br/>
          2小时超越人类水平，4小时发现开发者未预设的<br/>
          <strong style={{ color: "#ffd89b" }}>挖地道秘籍</strong>！
        </p>
      </div>

      {/* 冷知识2 */}
      <div
        style={{
          fontSize: 34,
          lineHeight: 1.8,
          textAlign: "left",
          opacity: fact2Opacity,
          backgroundColor: "rgba(25, 84, 123, 0.3)",
          padding: 45,
          borderRadius: 20,
          borderLeft: "8px solid #19547b",
          maxWidth: "85%",
          width: "100%"
        }}
      >
        <p style={{ margin: 0 }}>
          🤖 波士顿动力机器人摔倒时<strong style={{ color: "#4facfe" }}>调整姿态的算法</strong>，<br/>
          本质是免模型的 <strong style={{ color: "#4facfe" }}>策略梯度（PPO）</strong>
        </p>
      </div>
    </div>
  );
};
