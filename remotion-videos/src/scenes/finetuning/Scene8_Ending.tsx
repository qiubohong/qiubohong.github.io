import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const THEME = {
  background: "linear-gradient(135deg, #1a237e 0%, #311b92 50%, #4a148c 100%)",
  titleGradient: "linear-gradient(45deg, #feca57, #ff9ff3)",
  textPrimary: "#ffffff",
  textSecondary: "rgba(255,255,255,0.7)",
  accentOrange: "#ff9ff3",
};

export const Scene8_Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background fade in
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main title animation
  const titleSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.9, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Subtitle animation
  const subtitleSpring = spring({
    frame: Math.max(0, frame - 45),
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);
  const subtitleOpacity = interpolate(subtitleSpring, [0, 1], [0, 1]);

  // Question animation
  const questionOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow orbs
  const glowOpacity = 0.3 + Math.sin(frame * 0.05) * 0.1;

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: bgOpacity,
      }}
    >
      {/* Decorative glow orbs */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(254,202,87,0.3) 0%, transparent 70%)",
          filter: "blur(100px)",
          left: "30%",
          top: "20%",
          opacity: glowOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,159,243,0.25) 0%, transparent 70%)",
          filter: "blur(100px)",
          right: "20%",
          bottom: "30%",
          opacity: glowOpacity,
        }}
      />

      {/* Main title */}
      <div
        style={{
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          opacity: titleOpacity,
          fontSize: 72,
          fontWeight: 900,
          background: THEME.titleGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.02em",
          textAlign: "center",
        }}
      >
        5分钟 AI
      </div>

      {/* Subtitle */}
      <div
        style={{
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleOpacity,
          fontSize: 36,
          color: THEME.textSecondary,
          marginTop: 16,
          textAlign: "center",
        }}
      >
        每天搞懂一个知识点！
      </div>

      {/* Interactive question */}
      <div
        style={{
          opacity: questionOpacity,
          fontSize: 26,
          color: THEME.textPrimary,
          marginTop: 48,
          textAlign: "center",
          maxWidth: 800,
          lineHeight: 1.6,
        }}
      >
        今天我们学习了 Fine-tuning 的核心原理、工作流程和实际应用。
        <br />
        <br />
        <span style={{ color: THEME.accentOrange, fontWeight: 600 }}>
          你觉得 Fine-tuning 会如何改变 AI 在行业中的应用方式？
        </span>
        <br />
        <span style={{ fontSize: 22, color: THEME.textSecondary }}>
          欢迎在评论区分享你的想法！
        </span>
      </div>

      {/* Closing text */}
      <div
        style={{
          opacity: interpolate(frame, [130, 150], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          fontSize: 24,
          color: THEME.textSecondary,
          marginTop: 40,
          textAlign: "center",
        }}
      >
        感谢观看，若喜欢请关注，每天 5 分钟，轻松学AI
      </div>
    </AbsoluteFill>
  );
};
