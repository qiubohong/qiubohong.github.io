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

      {/* Main content - Image as primary focus with text overlays */}
      <div style={{ display: "flex", flexDirection: "row", gap: 32, flex: 1 }}>
        {/* Left - Full Fine-tuning Badge */}
        <div
          style={{
            width: 200,
            transform: `translateX(${leftX}px)`,
            opacity: leftOpacity,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              background: `${THEME.accentRed}15`,
              backdropFilter: "blur(16px)",
              border: `2px solid ${THEME.accentRed}50`,
              borderRadius: 16,
              padding: 24,
              transform: `translateY(${interpolate(frame, [25, 45], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
              opacity: interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: THEME.accentRed,
                marginBottom: 8,
              }}
            >
              {strategies[0].title}
            </div>
            <div
              style={{
                fontSize: 18,
                color: THEME.textSecondary,
                marginBottom: 16,
              }}
            >
              {strategies[0].subtitle}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {strategies[0].features.slice(0, 2).map((feature, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 16,
                    color: THEME.textPrimary,
                    padding: "8px 12px",
                    background: `${THEME.accentRed}10`,
                    borderRadius: 8,
                  }}
                >
                  {feature}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 16,
                background: `${THEME.accentRed}25`,
                padding: "10px 16px",
                borderRadius: 20,
                textAlign: "center",
                fontSize: 16,
                fontWeight: 600,
                color: THEME.accentRed,
              }}
            >
              成本高 · 全参数更新
            </div>
          </div>
        </div>

        {/* Center - Large Image */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: imageOpacity,
            transform: `scale(${imageScale})`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: THEME.cardBg,
              borderRadius: 20,
              padding: 24,
              border: `1px solid ${THEME.cardBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Img
              src={staticFile("FineTuningVideo/lora-peft.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: 12,
              }}
            />
          </div>
        </div>

        {/* Right - LoRA Badge */}
        <div
          style={{
            width: 200,
            transform: `translateX(${rightX}px)`,
            opacity: rightOpacity,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              background: `${THEME.accentGreen}15`,
              backdropFilter: "blur(16px)",
              border: `2px solid ${THEME.accentGreen}60`,
              borderRadius: 16,
              padding: 24,
              boxShadow: `0 0 30px ${THEME.accentGreen}20`,
              transform: `translateY(${interpolate(frame, [40, 60], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
              opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: THEME.accentGreen,
                }}
              >
                {strategies[1].title}
              </div>
              <div
                style={{
                  background: `rgba(255,210,0,${badgePulse})`,
                  color: "#000",
                  padding: "4px 10px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                推荐
              </div>
            </div>
            <div
              style={{
                fontSize: 18,
                color: THEME.textSecondary,
                marginBottom: 16,
              }}
            >
              {strategies[1].subtitle}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {strategies[1].features.slice(0, 2).map((feature, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 16,
                    color: THEME.textPrimary,
                    padding: "8px 12px",
                    background: `${THEME.accentGreen}10`,
                    borderRadius: 8,
                  }}
                >
                  {feature}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 16,
                background: `${THEME.accentGreen}25`,
                padding: "10px 16px",
                borderRadius: 20,
                textAlign: "center",
                fontSize: 16,
                fontWeight: 600,
                color: THEME.accentGreen,
              }}
            >
              成本低 · 高效微调
            </div>
          </div>
        </div>
      </div>

      {/* Bottom summary text */}
      <div
        style={{
          marginTop: 20,
          textAlign: "center",
          opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [80, 100], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: `${THEME.cardBg}`,
            padding: "16px 32px",
            borderRadius: 12,
            border: `1px solid ${THEME.cardBorder}`,
          }}
        >
          <span style={{ fontSize: 20, color: THEME.textPrimary }}>
            <span style={{ color: THEME.accentGreen, fontWeight: 700 }}>LoRA</span>
            {" "}在保持高性能的同时，大幅降低训练成本，是企业的首选方案
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
