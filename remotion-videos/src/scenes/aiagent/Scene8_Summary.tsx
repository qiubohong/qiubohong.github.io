import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  primary: "#58a6ff",
  secondary: "#c9d1d9",
  accent: "#f0883e",
  cardBg: "rgba(255,255,255,0.06)",
  cardBorder: "rgba(255,255,255,0.1)",
};

const SUMMARY_COLORS = ["#58a6ff", "#3fb950", "#f0883e", "#a371f7"];

const SummaryCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  keyword: string;
  color: string;
  delay: number;
}> = ({ icon, title, description, keyword, color, delay }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);
  const cardY = interpolate(cardSpring, [0, 1], [40, 0]);

  // 背景脉冲效果
  const pulseIntensity = 0.05 + Math.sin((frame - delay) * 0.06) * 0.03;

  return (
    <div
      style={{
        background: THEME.cardBg,
        border: `1px solid ${color}30`,
        borderRadius: 20,
        padding: "24px 32px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        opacity: cardOpacity,
        transform: `translateY(${cardY}px)`,
        boxShadow: `0 0 30px ${color}${Math.floor(pulseIntensity * 255).toString(16).padStart(2, "0")}`,
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* 左侧彩色竖条 */}
      <div
        style={{
          position: "absolute" as const,
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: `linear-gradient(180deg, ${color}, ${color}40)`,
          borderRadius: "20px 0 0 20px",
        }}
      />

      {/* 图标 */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: `${color}15`,
          border: `2px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      {/* 内容 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: color,
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
          }}
        >
          {description}
        </div>
      </div>

      {/* 右侧关键词标签 */}
      <div
        style={{
          padding: "8px 20px",
          background: `${color}15`,
          border: `1px solid ${color}40`,
          borderRadius: 12,
          fontSize: 16,
          color: color,
          fontWeight: 700,
          flexShrink: 0,
          textAlign: "center" as const,
          whiteSpace: "nowrap" as const,
        }}
      >
        {keyword}
      </div>
    </div>
  );
};

export const Scene8_Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleSpring = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const questionSpring = spring({
    frame: frame - 60,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const questionOpacity = interpolate(questionSpring, [0, 1], [0, 1]);
  const questionScale = interpolate(questionSpring, [0, 1], [0.9, 1]);

  // 互动问题闪烁
  const flashIntensity = 0.3 + Math.sin(frame * 0.1) * 0.2;

  // 背景弥散光球 - 蓝色系
  const bgOpacity = interpolate(frame, [0, 30], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgPulse = 0.8 + Math.sin(frame * 0.04) * 0.2;

  const summaries = [
    {
      icon: "🔄",
      title: "核心转变",
      description: '从"回答问题"到"完成任务"，这是AI Agent与传统AI最大的区别',
      keyword: "自主执行",
    },
    {
      icon: "🏗️",
      title: "架构关键",
      description: "感知、规划、行动、学习的完整循环，构成AI Agent的核心能力",
      keyword: "四大模块",
    },
    {
      icon: "💎",
      title: "价值所在",
      description: "自动化复杂工作流程，提升效率，减少错误，提供24小时不间断服务",
      keyword: "效率革命",
    },
    {
      icon: "🔮",
      title: "发展趋势",
      description: "多模态、长期记忆、专业化工具使用，以及群体智能协作",
      keyword: "未来已来",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 80px 40px",
        gap: 32,
        fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
        overflow: "hidden",
      }}
    >
      {/* 背景弥散光球 */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(88,166,255,0.15) 0%, transparent 70%)",
          filter: "blur(100px)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
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
            color: THEME.primary,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
          }}
        >
          KEY TAKEAWAYS
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            letterSpacing: "-0.03em",
          }}
        >
          关键要点总结
        </div>
      </div>

      {/* 四个要点卡片 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {summaries.map((summary, index) => (
          <SummaryCard
            key={index}
            icon={summary.icon}
            title={summary.title}
            description={summary.description}
            keyword={summary.keyword}
            color={SUMMARY_COLORS[index]}
            delay={20 + index * 6}
          />
        ))}
      </div>

      {/* 互动问题 */}
      <div
        style={{
          padding: "24px 48px",
          background: `linear-gradient(135deg, rgba(88,166,255,0.08), rgba(240,136,62,0.08))`,
          border: `2px solid ${THEME.accent}`,
          borderRadius: 20,
          opacity: questionOpacity,
          transform: `scale(${questionScale})`,
          boxShadow: `0 0 40px rgba(240,136,62,${flashIntensity * 0.4})`,
          width: "100%",
          textAlign: "center" as const,
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: THEME.accent,
            fontWeight: 700,
            lineHeight: 1.6,
          }}
        >
          💬 你觉得 AI Agent 会如何改变你的工作方式？
        </div>
        <div
          style={{
            fontSize: 24,
            color: THEME.secondary,
            marginTop: 8,
          }}
        >
          欢迎在评论区分享你的想法！👇
        </div>
      </div>
    </AbsoluteFill>
  );
};
