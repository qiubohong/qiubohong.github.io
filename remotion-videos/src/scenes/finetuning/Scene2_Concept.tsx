import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
  accentOrange: "#f0883e",
  cardBg: "rgba(255,255,255,0.06)",
  cardBorder: "rgba(255,255,255,0.1)",
};

export const Scene2_Concept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleSpring = spring({
    frame: Math.max(0, frame - 0),
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Card animation
  const cardSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [50, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // Text lines stagger animation
  const lines = [
    "就是在预训练好的 AI 模型基础上，",
    "用你特定领域的数据进行二次训练。",
  ];

  // Mermaid diagram animation
  const diagramOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const diagramScale = interpolate(frame, [60, 90], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "column",
        padding: "60px 40px",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 60,
          width: 4,
          height: 200,
          background: "linear-gradient(180deg, #58a6ff, transparent)",
        }}
      />

      {/* Title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          fontSize: 48,
          fontWeight: 700,
          background: THEME.titleGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 24,
        }}
      >
        什么是 Fine-tuning？
      </div>

      {/* Definition card */}
      <div
        style={{
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
          background: THEME.cardBg,
          backdropFilter: "blur(16px)",
          border: `1px solid ${THEME.cardBorder}`,
          borderRadius: 16,
          padding: "24px 32px",
          marginBottom: 16,
          maxWidth: 900,
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: THEME.textPrimary,
            lineHeight: 1.6,
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                opacity: interpolate(
                  frame,
                  [30 + i * 5, 45 + i * 5],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                transform: `translateY(${interpolate(
                  frame,
                  [30 + i * 5, 45 + i * 5],
                  [20, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )}px)`,
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Main Diagram - Large */}
      <div
        style={{
          opacity: diagramOpacity,
          transform: `scale(${diagramScale})`,
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 24,
          marginBottom: 24,
        }}
      >
        <Img
          src={staticFile("diagrams/fine-tuning-concept.svg")}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: 1100,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Analogy text */}
      <div
        style={{
          opacity: interpolate(frame, [50, 70], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${interpolate(
            frame,
            [50, 70],
            [30, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )}px)`,
          fontSize: 24,
          color: THEME.textSecondary,
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.8,
          marginBottom: 16,
        }}
      >
        打个比方：预训练模型就像刚毕业的<span style={{ color: THEME.accentOrange, fontWeight: 600 }}>通才大学生</span>，
        而 Fine-tuning 就像是让他去你的公司实习，通过实际工作训练，成为这个领域的<span style={{ color: THEME.accentOrange, fontWeight: 600 }}>专业人才</span>。
      </div>
    </AbsoluteFill>
  );
};
