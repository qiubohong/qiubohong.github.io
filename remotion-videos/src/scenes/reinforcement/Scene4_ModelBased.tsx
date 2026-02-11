import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ReinforcementScene4_ModelBased: React.FC = () => {
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
        backgroundColor: "#533483",
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
          background: "linear-gradient(45deg, #fa709a, #fee140)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        有模型学习 (Model-Based)
      </h1>

      {/* 案例框 */}
      <div
        style={{
          fontSize: 36,
          lineHeight: 1.8,
          textAlign: "left",
          opacity: caseOpacity,
          backgroundColor: "rgba(250, 112, 154, 0.15)",
          padding: 50,
          borderRadius: 20,
          borderLeft: "8px solid #fa709a",
          maxWidth: "85%",
          width: "100%",
          marginBottom: 40
        }}
      >
        <p style={{ margin: 0, marginBottom: 30 }}>
          <strong style={{ fontSize: 42, color: "#fa709a" }}>♟️ 案例：国际象棋对战</strong>
        </p>
        <p style={{ margin: 0, marginBottom: 20 }}>
          • 先背棋谱（学习"兵走直线，象飞斜角"规则）
        </p>
        <p style={{ margin: 0 }}>
          • 大脑推演："如果走车，对方可能有3种回应..."
        </p>
      </div>

      {/* 关键特点 */}
      <div
        style={{
          fontSize: 38,
          textAlign: "center",
          opacity: featureOpacity,
          backgroundColor: "rgba(254, 225, 64, 0.15)",
          padding: 40,
          borderRadius: 20,
          border: "3px solid #fee140",
          maxWidth: "80%",
          width: "100%"
        }}
      >
        <p style={{ margin: 0 }}>
          💡 <strong style={{ color: "#fee140" }}>核心思想</strong>：先理解环境运作规则<br/>
          依赖对环境的精确认知
        </p>
      </div>
    </div>
  );
};
