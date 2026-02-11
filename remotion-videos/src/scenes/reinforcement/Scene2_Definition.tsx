import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ReinforcementScene2_Definition: React.FC = () => {
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

  // 定义框动画
  const defOpacity = interpolate(
    frame,
    [30, 60],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 特征动画
  const featureOpacity = interpolate(
    frame,
    [90, 120],
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
        backgroundColor: "#16213e",
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
          background: "linear-gradient(45deg, #4facfe, #00f2fe)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        什么是强化学习？
      </h1>

      {/* 定义框 */}
      <div
        style={{
          fontSize: 36,
          lineHeight: 1.8,
          textAlign: "left",
          opacity: defOpacity,
          backgroundColor: "rgba(79, 172, 254, 0.15)",
          padding: 50,
          borderRadius: 20,
          borderLeft: "8px solid #4facfe",
          maxWidth: "85%",
          width: "100%",
          marginBottom: 50
        }}
      >
        <p style={{ margin: 0, marginBottom: 30 }}>
          <strong style={{ fontSize: 42, color: "#4facfe" }}>定义</strong>
        </p>
        <p style={{ margin: 0 }}>
          强化学习（Reinforcement Learning）是一种重要的机器学习方法，<br/>
          在智能控制、机器人及分析预测等领域有许多应用。
        </p>
      </div>

      {/* 关键特征 */}
      <div
        style={{
          fontSize: 42,
          textAlign: "center",
          opacity: featureOpacity,
          backgroundColor: "rgba(255, 215, 0, 0.15)",
          padding: 40,
          borderRadius: 20,
          border: "3px solid #ffd700",
          maxWidth: "70%",
          width: "100%"
        }}
      >
        <p style={{ margin: 0 }}>
          ✅ <strong style={{ color: "#ffd700" }}>关键特征</strong>：奖励与惩罚
        </p>
      </div>
    </div>
  );
};
