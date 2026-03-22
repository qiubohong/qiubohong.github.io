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
  accentBlue: "#58a6ff",
  accentOrange: "#f0883e",
  accentGreen: "#3fb950",
  cardBg: "rgba(255,255,255,0.06)",
  cardBorder: "rgba(255,255,255,0.1)",
};

export const Scene7_Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Table animation
  const tableSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const tableY = interpolate(tableSpring, [0, 1], [30, 0]);
  const tableOpacity = interpolate(tableSpring, [0, 1], [0, 1]);

  const methods = [
    {
      name: "Prompt Engineering",
      color: THEME.accentBlue,
      cost: "低",
      barrier: "低",
      knowledgeUpdate: "不能",
      useCase: "简单任务",
      stability: "不稳定",
      speed: "快",
    },
    {
      name: "RAG",
      color: THEME.accentOrange,
      cost: "中",
      barrier: "中",
      knowledgeUpdate: "能实时更新",
      useCase: "知识密集型",
      stability: "稳定",
      speed: "慢",
    },
    {
      name: "Fine-tuning",
      color: THEME.accentGreen,
      cost: "中高",
      barrier: "高",
      knowledgeUpdate: "需重新训练",
      useCase: "特定格式/风格",
      stability: "稳定",
      speed: "快",
      current: true,
    },
  ];

  const rows = [
    { label: "成本", key: "cost" },
    { label: "门槛", key: "barrier" },
    { label: "知识更新", key: "knowledgeUpdate" },
    { label: "适用场景", key: "useCase" },
    { label: "效果稳定性", key: "stability" },
    { label: "推理速度", key: "speed" },
  ];

  // Row animation stagger
  const getRowAnimation = (rowIndex: number) => {
    const rowOpacity = interpolate(
      frame,
      [50 + rowIndex * 15, 70 + rowIndex * 15],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    const rowSlide = interpolate(
      frame,
      [50 + rowIndex * 15, 70 + rowIndex * 15],
      [15, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    return { opacity: rowOpacity, y: rowSlide };
  };

  // Pulse animation for current method
  const pulse = 0.6 + Math.sin(frame * 0.15) * 0.4;

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "column",
        padding: "40px 40px",
        alignItems: "center",
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
          marginBottom: 32,
        }}
      >
        Fine-tuning vs 其他方法
      </div>

      {/* Comparison table */}
      <div
        style={{
          transform: `translateY(${tableY}px)`,
          opacity: tableOpacity,
          background: THEME.cardBg,
          backdropFilter: "blur(16px)",
          border: `1px solid ${THEME.cardBorder}`,
          borderRadius: 16,
          overflow: "hidden",
          width: "100%",
          maxWidth: 960,
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "140px repeat(3, 1fr)",
            borderBottom: `1px solid ${THEME.cardBorder}`,
          }}
        >
          <div
            style={{
              padding: "16px",
              fontSize: 16,
              fontWeight: 600,
              color: THEME.textSecondary,
              borderRight: `1px solid ${THEME.cardBorder}`,
            }}
          >
            对比维度
          </div>
          {methods.map((method, i) => (
            <div
              key={i}
              style={{
                padding: "16px",
                fontSize: 18,
                fontWeight: 700,
                color: method.color,
                textAlign: "center",
                borderRight: i < 2 ? `1px solid ${THEME.cardBorder}` : "none",
                background: method.current ? `${method.color}15` : "transparent",
                boxShadow: method.current
                  ? `inset 0 0 20px ${method.color}20`
                  : "none",
              }}
            >
              {method.current && (
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: method.color,
                    marginRight: 8,
                    boxShadow: `0 0 ${pulse * 10}px ${method.color}`,
                  }}
                />
              )}
              {method.name}
            </div>
          ))}
        </div>

        {/* Table rows */}
        {rows.map((row, rowIndex) => {
          const anim = getRowAnimation(rowIndex);
          return (
            <div
              key={rowIndex}
              style={{
                display: "grid",
                gridTemplateColumns: "140px repeat(3, 1fr)",
                borderBottom:
                  rowIndex < rows.length - 1 ? `1px solid ${THEME.cardBorder}` : "none",
                opacity: anim.opacity,
                transform: `translateY(${anim.y}px)`,
              }}
            >
              <div
                style={{
                  padding: "14px 16px",
                  fontSize: 16,
                  fontWeight: 600,
                  color: THEME.textPrimary,
                  borderRight: `1px solid ${THEME.cardBorder}`,
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {row.label}
              </div>
              {methods.map((method, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 12px",
                    fontSize: 16,
                    color: THEME.textPrimary,
                    textAlign: "center",
                    borderRight: i < 2 ? `1px solid ${THEME.cardBorder}` : "none",
                    background: method.current
                      ? `${method.color}08`
                      : "transparent",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: 12,
                      fontSize: 14,
                      background: method.current
                        ? `${method.color}20`
                        : "rgba(255,255,255,0.05)",
                      color: method.current ? method.color : THEME.textSecondary,
                      fontWeight: method.current ? 600 : 400,
                    }}
                  >
                    {/* @ts-ignore */}
                    {method[row.key]}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <div
        style={{
          opacity: interpolate(frame, [160, 180], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          marginTop: 24,
          fontSize: 20,
          color: THEME.textSecondary,
          textAlign: "center",
        }}
      >
        💡 三者可以<span style={{ color: THEME.accentOrange, fontWeight: 600 }}>结合使用</span>，发挥各自优势
      </div>
    </AbsoluteFill>
  );
};
