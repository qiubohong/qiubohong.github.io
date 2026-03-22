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
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
  accentRed: "#ff5555",
  accentGreen: "#3fb950",
  accentYellow: "#ffd200",
  cardBg: "rgba(255,255,255,0.06)",
  cardBorder: "rgba(255,255,255,0.1)",
};

export const Scene5_Strategy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const strategies = [
    {
      title: "全量微调",
      subtitle: "Full Fine-tuning",
      color: THEME.accentRed,
      features: ["更新所有参数", "效果最好", "成本最高", "需要大量计算资源"],
      cost: "高",
    },
    {
      title: "参数高效微调",
      subtitle: "PEFT / LoRA",
      color: THEME.accentGreen,
      features: ["只更新部分参数", "成本较低", "效果接近全量", "性价比高"],
      cost: "低",
      recommended: true,
    },
  ];

  // Left panel animation
  const leftSpring = spring({
    frame: Math.max(0, frame - 0),
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const leftX = interpolate(leftSpring, [0, 1], [-100, 0]);
  const leftOpacity = interpolate(leftSpring, [0, 1], [0, 1]);

  // Right panel animation
  const rightSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const rightX = interpolate(rightSpring, [0, 1], [100, 0]);
  const rightOpacity = interpolate(rightSpring, [0, 1], [0, 1]);

  // Image animation
  const imageOpacity = interpolate(frame, [65, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const imageScale = interpolate(frame, [65, 90], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Recommended badge pulse
  const badgePulse = 0.7 + Math.sin(frame * 0.2) * 0.3;

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "column",
        padding: "40px 50px",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 40,
          fontWeight: 700,
          background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        Fine-tuning 训练策略对比
      </div>

      {/* Split screen panels */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          flex: 1,
        }}
      >
        {/* Left - Full Fine-tuning */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${leftX}px)`,
            opacity: leftOpacity,
            background: `${THEME.accentRed}08`,
            backdropFilter: "blur(16px)",
            border: `2px solid ${THEME.accentRed}40`,
            borderRadius: 16,
            padding: 28,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: THEME.accentRed,
              marginBottom: 4,
            }}
          >
            {strategies[0].title}
          </div>
          <div
            style={{
              fontSize: 16,
              color: THEME.textSecondary,
              marginBottom: 20,
            }}
          >
            {strategies[0].subtitle}
          </div>

          {strategies[0].features.map((feature, i) => (
            <div
              key={i}
              style={{
                opacity: interpolate(frame, [25 + i * 5, 40 + i * 5], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${interpolate(
                  frame,
                  [25 + i * 5, 40 + i * 5],
                  [10, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )}px)`,
                padding: "10px 12px",
                background: `${THEME.accentRed}15`,
                borderRadius: 8,
                marginBottom: 8,
                fontSize: 18,
                color: THEME.textPrimary,
              }}
            >
              {feature}
            </div>
          ))}

          <div style={{ marginTop: "auto" }}>
            <div
              style={{
                background: `${THEME.accentRed}20`,
                padding: "8px 16px",
                borderRadius: 20,
                display: "inline-block",
                fontSize: 14,
                color: THEME.accentRed,
              }}
            >
              成本: {strategies[0].cost}
            </div>
          </div>
        </div>

        {/* Right - LoRA */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${rightX}px)`,
            opacity: rightOpacity,
            background: `${THEME.accentGreen}10`,
            backdropFilter: "blur(16px)",
            border: `2px solid ${THEME.accentGreen}60`,
            borderRadius: 16,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            boxShadow: `0 0 30px ${THEME.accentGreen}20`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: THEME.accentGreen,
                marginBottom: 4,
              }}
            >
              {strategies[1].title}
            </div>
            {strategies[1].recommended && (
              <div
                style={{
                  background: `rgba(255,210,0,${badgePulse})`,
                  color: "#000",
                  padding: "4px 12px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                推荐
              </div>
            )}
          </div>
          <div
            style={{
              fontSize: 16,
              color: THEME.textSecondary,
              marginBottom: 20,
            }}
          >
            {strategies[1].subtitle}
          </div>

          {strategies[1].features.map((feature, i) => (
            <div
              key={i}
              style={{
                opacity: interpolate(frame, [40 + i * 5, 55 + i * 5], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${interpolate(
                  frame,
                  [40 + i * 5, 55 + i * 5],
                  [10, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )}px)`,
                padding: "10px 12px",
                background: `${THEME.accentGreen}20`,
                borderRadius: 8,
                marginBottom: 8,
                fontSize: 18,
                color: THEME.textPrimary,
              }}
            >
              {feature}
            </div>
          ))}

          <div style={{ marginTop: "auto" }}>
            <div
              style={{
                background: `${THEME.accentGreen}30`,
                padding: "8px 16px",
                borderRadius: 20,
                display: "inline-block",
                fontSize: 14,
                color: THEME.accentGreen,
              }}
            >
              成本: {strategies[1].cost} · 性价比高
            </div>
          </div>
        </div>
      </div>

      {/* LoRA comparison image */}
      <div
        style={{
          opacity: imageOpacity,
          transform: `scale(${imageScale})`,
          marginTop: 20,
          background: THEME.cardBg,
          borderRadius: 12,
          padding: 16,
          border: `1px solid ${THEME.cardBorder}`,
        }}
      >
        <Img
          src={staticFile("FineTuningVideo/lora-peft.png")}
          style={{
            width: "100%",
            height: 180,
            objectFit: "contain",
            borderRadius: 8,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
