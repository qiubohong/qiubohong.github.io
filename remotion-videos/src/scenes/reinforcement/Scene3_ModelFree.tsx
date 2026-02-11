import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ReinforcementScene3_ModelFree: React.FC = () => {
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

  // 案例框动画
  const caseOpacity = interpolate(
    frame,
    [40, 70],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 特点动画
  const featureOpacity = interpolate(
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
          marginBottom: 50,
          textAlign: "center",
          opacity: titleOpacity,
          background: "linear-gradient(45deg, #43e97b, #38f9d7)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        免模型学习 (Model-Free)
      </h1>

      {/* 案例框 */}
      <div
        style={{
          fontSize: 36,
          lineHeight: 1.8,
          textAlign: "left",
          opacity: caseOpacity,
          backgroundColor: "rgba(67, 233, 123, 0.15)",
          padding: 50,
          borderRadius: 20,
          borderLeft: "8px solid #43e97b",
          maxWidth: "85%",
          width: "100%",
          marginBottom: 40
        }}
      >
        <p style={{ margin: 0, marginBottom: 30 }}>
          <strong style={{ fontSize: 42, color: "#43e97b" }}>🚴 案例：学骑电动车</strong>
        </p>
        <p style={{ margin: 0, marginBottom: 20 }}>
          • 右转时摔倒 → <span style={{ color: "#ff6b6b" }}>惩罚</span>（痛觉信号）
        </p>
        <p style={{ margin: 0 }}>
          • 保持平衡前进 → <span style={{ color: "#51cf66" }}>奖励</span>（速度感）
        </p>
      </div>

      {/* 关键特点 */}
      <div
        style={{
          fontSize: 38,
          textAlign: "center",
          opacity: featureOpacity,
          backgroundColor: "rgba(56, 249, 215, 0.15)",
          padding: 40,
          borderRadius: 20,
          border: "3px solid #38f9d7",
          maxWidth: "80%",
          width: "100%"
        }}
      >
        <p style={{ margin: 0 }}>
          💡 <strong style={{ color: "#38f9d7" }}>核心思想</strong>：直接学习策略<br/>
          无需理解机械原理，靠肌肉记忆学习
        </p>
      </div>
    </div>
  );
};
