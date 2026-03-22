import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
  accentOrange: "#f0883e",
};

export const Scene1_Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Glow orb animation
  const orbOpacity = interpolate(frame, [0, 30], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title animation
  const titleSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Subtitle animation
  const subtitleSpring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [40, 0]);
  const subtitleOpacity = interpolate(subtitleSpring, [0, 1], [0, 1]);

  // Intro text animation (typewriter-like)
  const introProgress = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative line animation
  const lineWidth = interpolate(frame, [70, 90], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(88,166,255,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
          left: "20%",
          top: "30%",
          transform: "translate(-50%, -50%)",
          opacity: orbOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(240,136,62,0.35) 0%, transparent 70%)",
          filter: "blur(80px)",
          right: "10%",
          bottom: "20%",
          opacity: orbOpacity,
        }}
      />

      {/* Main title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          fontSize: 72,
          fontWeight: 900,
          background: THEME.titleGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.02em",
        }}
      >
        Fine-tuning
      </div>

      {/* Subtitle */}
      <div
        style={{
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleOpacity,
          fontSize: 40,
          color: THEME.textSecondary,
          marginTop: 16,
          fontWeight: 300,
        }}
      >
        模型微调技术
      </div>

      {/* Intro text */}
      <div
        style={{
          opacity: introProgress,
          fontSize: 32,
          color: THEME.textPrimary,
          marginTop: 48,
          textAlign: "center",
          maxWidth: 880,
          lineHeight: 1.6,
        }}
      >
        <div style={{ marginBottom: 16 }}>
          5分钟 AI，每天搞懂一个知识点！今天我们学习，Fine-tuning 模型微调。
        </div>
        <div
          style={{
            color: THEME.accentOrange,
            fontWeight: 600,
          }}
        >
          掌握 Fine-tuning，你就能让通用的AI大模型，变成精通你业务的专业助手！
        </div>
      </div>

      {/* Decorative line */}
      <div
        style={{
          width: lineWidth,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${THEME.accentOrange}, transparent)`,
          marginTop: 40,
          borderRadius: 2,
        }}
      />
    </AbsoluteFill>
  );
};
