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
  cardBg: "rgba(255,255,255,0.06)",
};

export const Scene7_Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const orbOpacity = interpolate(frame, [0, 30], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleSpring = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const contentProgress = interpolate(frame, [40, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const keyPoints = [
    { icon: "🎯", text: "核心能力：代码理解、生成、优化、调试、审查" },
    { icon: "🔧", text: "工作流程：需求分析→架构设计→代码生成→测试→优化" },
    { icon: "🚀", text: "主流产品：GitHub Copilot、Claude Code、Cursor" },
    { icon: "💡", text: "未来趋势：AI成为开发标配，代码质量大幅提升" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 64px",
      }}
    >
      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,136,62,0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "30%",
          opacity: orbOpacity,
        }}
      />

      {/* Title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          fontSize: 48,
          fontWeight: 900,
          background: THEME.titleGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.02em",
          marginTop: 40,
          marginBottom: 48,
        }}
      >
        核心要点回顾
      </div>

      {/* Key Points */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 900,
          width: "100%",
          opacity: contentProgress,
        }}
      >
        {keyPoints.map((point, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              background: THEME.cardBg,
              borderRadius: 16,
              padding: "24px 32px",
              fontSize: 28,
              color: THEME.textPrimary,
              lineHeight: 1.5,
            }}
          >
            <span style={{ fontSize: 40 }}>{point.icon}</span>
            <span>{point.text}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: interpolate(frame, [120, 140], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          marginTop: 48,
          fontSize: 32,
          color: THEME.accentOrange,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        让AI成为你的编程搭档，提升开发效率！
      </div>
    </AbsoluteFill>
  );
};