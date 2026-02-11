import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ReinforcementScene6_Applications: React.FC = () => {
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

  // 案例1动画
  const case1Opacity = interpolate(
    frame,
    [40, 70],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 案例2动画
  const case2Opacity = interpolate(
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
          background: "linear-gradient(45deg, #f093fb, #f5576c)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        应用案例
      </h1>

      {/* 案例1：AlphaGo */}
      <div
        style={{
          fontSize: 32,
          lineHeight: 1.8,
          textAlign: "left",
          opacity: case1Opacity,
          backgroundColor: "rgba(67, 233, 123, 0.15)",
          padding: 45,
          borderRadius: 20,
          borderLeft: "8px solid #43e97b",
          maxWidth: "85%",
          width: "100%",
          marginBottom: 40
        }}
      >
        <p style={{ margin: 0, marginBottom: 25 }}>
          <strong style={{ fontSize: 40, color: "#43e97b" }}>🎮 免模型案例：AlphaGo的走棋网络</strong>
        </p>
        <p style={{ margin: 0, marginBottom: 15 }}>
          • <strong>输入</strong>：棋盘当前状态
        </p>
        <p style={{ margin: 0, marginBottom: 15 }}>
          • <strong>输出</strong>：直接评估落子位置价值
        </p>
        <p style={{ margin: 0 }}>
          • <strong>优势</strong>：省去推演计算，每秒决策100+次
        </p>
      </div>

      {/* 案例2：特斯拉 */}
      <div
        style={{
          fontSize: 32,
          lineHeight: 1.8,
          textAlign: "left",
          opacity: case2Opacity,
          backgroundColor: "rgba(250, 112, 154, 0.15)",
          padding: 45,
          borderRadius: 20,
          borderLeft: "8px solid #fa709a",
          maxWidth: "85%",
          width: "100%"
        }}
      >
        <p style={{ margin: 0, marginBottom: 25 }}>
          <strong style={{ fontSize: 40, color: "#fa709a" }}>🚗 有模型案例：特斯拉自动驾驶仿真</strong>
        </p>
        <p style={{ margin: 0, marginBottom: 15 }}>
          • <strong>环境模型</strong>：物理引擎模拟雨天路滑
        </p>
        <p style={{ margin: 0, marginBottom: 15 }}>
          • <strong>神经网络</strong>：生成行人行为
        </p>
        <p style={{ margin: 0 }}>
          • <strong>优势</strong>：0风险试错百亿次
        </p>
      </div>
    </div>
  );
};
