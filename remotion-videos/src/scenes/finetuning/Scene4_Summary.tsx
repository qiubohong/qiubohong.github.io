import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const THEME = {
  background: "linear-gradient(135deg, #0a1628 0%, #121d35 50%, #1a2744 100%)",
  titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
  accentOrange: "#f0883e",
  accentBlue: "#58a6ff",
};

export const Scene4_Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card animation
  const cardSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const cardScale = interpolate(cardSpring, [0, 1], [0.95, 1]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // Background glow animation
  const bgOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text line animations
  const line1Opacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line1Y = interpolate(frame, [30, 50], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const line2Opacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Y = interpolate(frame, [50, 70], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Keyword highlight pulse
  const highlight = 0.7 + Math.sin(frame * 0.15) * 0.3;

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
      {/* Background glow effect */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(88,166,255,0.25) 0%, transparent 70%)",
          filter: "blur(100px)",
          opacity: bgOpacity,
        }}
      />

      {/* Center summary card */}
      <div
        style={{
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
          background: "rgba(88,166,255,0.1)",
          backdropFilter: "blur(16px)",
          border: "2px solid rgba(88,166,255,0.3)",
          borderRadius: 20,
          padding: "48px 56px",
          maxWidth: 900,
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Decorative corner accents */}
        <div
          style={{
            position: "absolute",
            top: -2,
            left: -2,
            width: 40,
            height: 40,
            borderTop: `3px solid ${THEME.accentBlue}`,
            borderLeft: `3px solid ${THEME.accentBlue}`,
            borderTopLeftRadius: 20,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            width: 40,
            height: 40,
            borderBottom: `3px solid ${THEME.accentBlue}`,
            borderRight: `3px solid ${THEME.accentBlue}`,
            borderBottomRightRadius: 20,
          }}
        />

        {/* Summary text */}
        <div
          style={{
            fontSize: 32,
            color: THEME.textPrimary,
            lineHeight: 1.8,
            letterSpacing: "0.02em",
          }}
        >
          <div
            style={{
              opacity: line1Opacity,
              transform: `translateY(${line1Y}px)`,
            }}
          >
            简单来说，Fine-tuning 就是给 AI 做
            <span
              style={{
                color: THEME.accentOrange,
                fontWeight: 700,
                textShadow: `0 0 ${highlight * 20}px ${THEME.accentOrange}50`,
              }}
            >
              "专业培训"
            </span>
            ，
          </div>
          <div
            style={{
              opacity: line1Opacity,
              transform: `translateY(${line1Y}px)`,
              marginTop: 8,
            }}
          >
            让它在你的领域更专业、更准确。
          </div>

          <div
            style={{
              opacity: line2Opacity,
              transform: `translateY(${line2Y}px)`,
              marginTop: 32,
              fontSize: 26,
              color: THEME.textSecondary,
            }}
          >
            核心收益：提高准确率 · 学习领域知识 · 适应输出格式 · 降低推理成本
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div
        style={{
          width: 120,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${THEME.accentBlue}, transparent)`,
          marginTop: 48,
          opacity: interpolate(frame, [70, 90], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
