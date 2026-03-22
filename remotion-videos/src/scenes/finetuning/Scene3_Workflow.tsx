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
  accentBlue: "#58a6ff",
  accentOrange: "#f0883e",
  accentGreen: "#3fb950",
  cardBg: "rgba(255,255,255,0.06)",
  cardBorder: "rgba(255,255,255,0.1)",
};

export const Scene3_Workflow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stage cards data
  const stages = [
    {
      num: "01",
      title: "预训练阶段",
      subtitle: "通用能力学习",
      desc: "海量通用数据训练基础模型",
      color: THEME.accentBlue,
    },
    {
      num: "02",
      title: "微调阶段",
      subtitle: "专业能力训练",
      desc: "特定领域数据训练顶层参数",
      color: THEME.accentOrange,
    },
    {
      num: "03",
      title: "应用阶段",
      subtitle: "实际使用",
      desc: "同时具备通用和专业能力",
      color: THEME.accentGreen,
    },
  ];

  // Image panel animation
  const panelWidth = interpolate(frame, [50, 80], [0, 55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const imageOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const imageScale = interpolate(frame, [70, 90], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "row",
        padding: "50px 30px",
        gap: 30,
      }}
    >
      {/* Left content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            fontSize: 40,
            fontWeight: 700,
            background: THEME.titleGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 24,
          }}
        >
          Fine-tuning 工作流程
        </div>

        {/* Stage cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
          {stages.map((stage, i) => {
            const cardSpring = spring({
              frame: Math.max(0, frame - 15 - i * 15),
              fps,
              config: { stiffness: 100, damping: 20, mass: 1.2 },
            });
            const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
            const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

            // Highlight based on frame (show one stage at a time)
            const highlightStart = 90 + i * 30;
            const isHighlighted = frame >= highlightStart && frame < highlightStart + 30;
            const dimOthers = frame >= 90 && !isHighlighted;

            return (
              <div
                key={i}
                style={{
                  transform: `translateY(${cardY}px)`,
                  opacity: dimOthers ? cardOpacity * 0.5 : cardOpacity,
                  background: isHighlighted
                    ? `${stage.color}15`
                    : THEME.cardBg,
                  backdropFilter: "blur(16px)",
                  border: isHighlighted
                    ? `2px solid ${stage.color}60`
                    : `1px solid ${THEME.cardBorder}`,
                  borderRadius: 12,
                  padding: "24px 28px",
                  borderLeft: `4px solid ${stage.color}`,
                  boxShadow: isHighlighted
                    ? `0 0 20px ${stage.color}30`
                    : "none",
                  transition: "all 0.3s ease",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 900,
                      color: stage.color,
                      opacity: 0.6,
                    }}
                  >
                    {stage.num}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: isHighlighted ? stage.color : THEME.textPrimary,
                      }}
                    >
                      {stage.title}
                    </div>
                    <div
                      style={{
                        fontSize: 24,
                        color: THEME.textSecondary,
                        marginTop: 8,
                      }}
                    >
                      {stage.subtitle}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        color: THEME.textSecondary,
                        marginTop: 8,
                      }}
                    >
                      {stage.desc}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right image panel */}
      <div
        style={{
          width: `${panelWidth}%`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            opacity: imageOpacity,
            transform: `scale(${imageScale})`,
            background: THEME.cardBg,
            borderRadius: 16,
            padding: 20,
            border: `1px solid ${THEME.cardBorder}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <Img
            src={staticFile("FineTuningVideo/finetuning-workflow.png")}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8,
            }}
          />
          <div
            style={{
              textAlign: "center",
              fontSize: 16,
              color: THEME.textSecondary,
              marginTop: 12,
            }}
          >
            Fine-tuning 三阶段工作流程图
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
