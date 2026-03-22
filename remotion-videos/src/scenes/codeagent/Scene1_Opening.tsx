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

  const orbOpacity = interpolate(frame, [0, 30], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const subtitleSpring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [40, 0]);

  const introProgress = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(88,166,255,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
          left: "20%",
          top: "30%",
          opacity: orbOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,136,62,0.35) 0%, transparent 70%)",
          filter: "blur(80px)",
          right: "10%",
          bottom: "20%",
          opacity: orbOpacity,
        }}
      />

      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          fontSize: 72,
          fontWeight: 900,
          background: THEME.titleGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.02em",
        }}
      >
        Code Agent
      </div>

      <div
        style={{
          transform: `translateY(${subtitleY}px)`,
          opacity: interpolate(subtitleSpring, [0, 1], [0, 1]),
          fontSize: 40,
          color: THEME.textSecondary,
          marginTop: 16,
          fontWeight: 300,
        }}
      >
        AI程序员助手
      </div>

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
          5分钟 AI，每天搞懂一个知识点！
        </div>
        <div style={{ marginBottom: 16 }}>
          今天我们学习，Code Agent。
        </div>
        <div style={{ color: THEME.accentOrange, fontWeight: 600 }}>
          让AI成为你的编程搭档，从此告别996！
        </div>
      </div>

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