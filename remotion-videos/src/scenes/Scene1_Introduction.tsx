import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

interface Scene1_IntroductionProps {
  title: string;
}

export const Scene1_Introduction: React.FC<Scene1_IntroductionProps> = ({ title }) => {
  const frame = useCurrentFrame();
  
  // 标题动画
  const titleOpacity = interpolate(
    frame,
    [0, 30],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  const titleScale = interpolate(
    frame,
    [0, 30],
    [0.8, 1],
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
        backgroundColor: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        fontFamily: "Arial, sans-serif",
        color: "white"
      }}
    >
      {/* 主标题 */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: "bold",
          marginBottom: 40,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}
      >
        {title}
      </h1>

      {/* 副标题 */}
      <h2
        style={{
          fontSize: 48,
          fontWeight: "normal",
          marginBottom: 60,
          textAlign: "center",
          opacity: titleOpacity,
          color: "#cccccc"
        }}
      >
        每天搞懂一个AI知识点
      </h2>

      {/* 作者信息 */}
      <div
        style={{
          fontSize: 24,
          textAlign: "center",
          opacity: titleOpacity,
          color: "#888888"
        }}
      >
        <p>做一个有温度和有干货的技术分享作者</p>
        <p style={{ marginTop: 10, fontSize: 20 }}>
          —— <a href="https://qborfy.com" style={{ color: "#4ecdc4" }}>Qborfy</a>
        </p>
      </div>
    </div>
  );
};