import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile } from "remotion";

export const Scene1_Opening: React.FC = () => {
  const frame = useCurrentFrame();

  // 标题淡入动画
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 副标题淡入
  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 文字说明淡入（逐句）
  const line1Opacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line2Opacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line3Opacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 背景图淡入缩放
  const bgOpacity = interpolate(frame, [20, 60], [0, 0.3], {
    extrapolateRight: "clamp",
  });
  const bgScale = interpolate(frame, [20, 100], [1.1, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 背景图片 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: bgOpacity,
          transform: `scale(${bgScale})`,
        }}
      >
        <Img
          src={staticFile("assets/img/ailearn/deepseek/deepseek-cover.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 内容区域 */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 48px",
          maxWidth: 900,
        }}
      >
        {/* 主标题 */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            marginBottom: 24,
            opacity: titleOpacity,
            background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 60px rgba(88,166,255,0.3)",
          }}
        >
          DeepSeek V4/R2
        </h1>

        {/* 副标题 */}
        <h2
          style={{
            fontSize: 40,
            color: "#c9d1d9",
            fontWeight: 500,
            marginBottom: 48,
            opacity: subtitleOpacity,
          }}
        >
          为何双双难产？
        </h2>

        {/* 说明文字 */}
        <div
          style={{
            fontSize: 32,
            color: "#8b949e",
            lineHeight: 1.8,
          }}
        >
          <p style={{ opacity: line1Opacity, marginBottom: 16 }}>
            2025年1月，DeepSeek R1横空出世
          </p>
          <p style={{ opacity: line2Opacity, marginBottom: 16 }}>
            然而将近一年过去，V4和R2却迟迟不见踪影
          </p>
          <p style={{ opacity: line3Opacity, color: "#f0883e", fontWeight: 600 }}>
            这背后到底是战略定力，还是方向迷失？
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
