import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  primary: "#58a6ff",
  secondary: "#c9d1d9",
  accent: "#f0883e",
  cardBg: "rgba(255,255,255,0.06)",
  cardBorder: "rgba(255,255,255,0.1)",
  purple: "#a371f7",
};

const TREND_ICONS = ["🎭", "🧠", "🔬", "🤝"];
const TREND_COLORS = ["#58a6ff", "#3fb950", "#f0883e", "#a371f7"];

const TrendCard: React.FC<{
  number: number;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  delay: number;
  isLast: boolean;
}> = ({ number, icon, title, description, tags, color, delay, isLast }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const cardX = interpolate(cardSpring, [0, 1], [120, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // 最后一个趋势高亮脉冲
  const pulseIntensity = isLast
    ? 0.15 + Math.sin(frame * 0.1) * 0.1
    : 0.05;

  return (
    <div
      style={{
        background: isLast ? `${color}08` : THEME.cardBg,
        border: `2px solid ${isLast ? color : color + "30"}`,
        borderRadius: 20,
        padding: "28px 32px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        transform: `translateX(${cardX}px)`,
        opacity: cardOpacity,
        boxShadow: `0 0 40px ${color}${Math.floor(pulseIntensity * 255).toString(16).padStart(2, "0")}`,
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* 编号 + 图标 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: isLast
              ? `linear-gradient(135deg, ${color}, ${color}80)`
              : `${color}20`,
            border: `2px solid ${color}60`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 900,
            color: isLast ? "#fff" : color,
            boxShadow: isLast ? `0 0 20px ${color}60` : "none",
          }}
        >
          {number}
        </div>
        <div style={{ fontSize: 32 }}>{icon}</div>
      </div>

      {/* 内容 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: isLast ? color : THEME.primary,
            marginBottom: 8,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: THEME.secondary,
            lineHeight: 1.5,
            marginBottom: 12,
          }}
        >
          {description}
        </div>
        {/* 标签 */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
          {tags.map((tag, i) => (
            <div
              key={i}
              style={{
                padding: "4px 16px",
                background: `${color}15`,
                border: `1px solid ${color}40`,
                borderRadius: 16,
                fontSize: 16,
                color: color,
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* 右侧"最新"标记 */}
      {isLast && (
        <div
          style={{
            padding: "8px 16px",
            background: `${color}20`,
            border: `1px solid ${color}60`,
            borderRadius: 8,
            fontSize: 16,
            color: color,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          🔮 前沿
        </div>
      )}
    </div>
  );
};

export const Scene7_Trends: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleSpring = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // 背景弥散光球 - 紫色系
  const bgOpacity = interpolate(frame, [0, 30], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgPulse = 0.8 + Math.sin(frame * 0.04) * 0.2;

  // 时间轴线动画
  const timelineHeight = interpolate(frame, [20, 80], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const trends = [
    {
      title: "多模态能力增强",
      description: "整合视觉、听觉等多模态感知，更全面的环境理解",
      tags: ["视觉理解", "语音交互", "多模态融合"],
    },
    {
      title: "长期记忆与上下文理解",
      description: "建立长期记忆机制，实现持续学习，提供个性化服务",
      tags: ["长期记忆", "持续学习", "个性化"],
    },
    {
      title: "工具使用专业化",
      description: "从通用工具到专业领域深度集成，如医疗、法律工具",
      tags: ["专业工具", "领域集成", "深度定制"],
    },
    {
      title: "协作与群体智能",
      description: "从单个Agent到多Agent协作，分工解决复杂问题",
      tags: ["多Agent", "协作分工", "群体智能"],
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "56px 80px 48px",
        gap: 32,
        fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
        overflow: "hidden",
      }}
    >
      {/* 背景弥散光球 */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163,113,247,0.2) 0%, transparent 70%)",
          filter: "blur(120px)",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: bgOpacity * bgPulse,
          pointerEvents: "none",
        }}
      />

      {/* 标题区域 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontSize: 16,
            color: THEME.purple,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
          }}
        >
          FUTURE TRENDS
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            background: "linear-gradient(45deg, #58a6ff, #a371f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            letterSpacing: "-0.03em",
          }}
        >
          AI Agent 四大发展趋势
        </div>
      </div>

      {/* 时间轴 + 卡片 */}
      <div
        style={{
          display: "flex",
          gap: 32,
          width: "100%",
          flex: 1,
          alignItems: "stretch",
        }}
      >
        {/* 时间轴线 */}
        <div
          style={{
            width: 4,
            background: `linear-gradient(180deg, ${THEME.primary}, ${THEME.purple})`,
            borderRadius: 2,
            flexShrink: 0,
            height: `${timelineHeight}%`,
            alignSelf: "flex-start",
            marginTop: 28,
            boxShadow: `0 0 10px rgba(88,166,255,0.4)`,
          }}
        />

        {/* 卡片列表 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            flex: 1,
          }}
        >
          {trends.map((trend, index) => (
            <TrendCard
              key={index}
              number={index + 1}
              icon={TREND_ICONS[index]}
              title={trend.title}
              description={trend.description}
              tags={trend.tags}
              color={TREND_COLORS[index]}
              delay={20 + index * 10}
              isLast={index === trends.length - 1}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
