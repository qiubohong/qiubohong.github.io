import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  primary: "#58a6ff",
  secondary: "#c9d1d9",
  accent: "#f0883e",
  green: "#3fb950",
  cardBg: "rgba(255,255,255,0.06)",
  cardBorder: "rgba(255,255,255,0.12)",
};

// 每个特征的专属颜色
const FEATURE_COLORS = ["#58a6ff", "#3fb950", "#f0883e", "#f778ba"];

const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  delay: number;
}> = ({ icon, title, description, tags, color, delay }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const cardY = interpolate(cardSpring, [0, 1], [80, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);
  const cardScale = interpolate(cardSpring, [0, 1], [0.85, 1]);

  // 光晕脉冲效果
  const glowIntensity = 0.15 + Math.sin((frame - delay) * 0.08) * 0.1;

  return (
    <div
      style={{
        background: THEME.cardBg,
        border: `2px solid ${color}40`,
        borderRadius: 24,
        padding: "40px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        transform: `translateY(${cardY}px) scale(${cardScale})`,
        opacity: cardOpacity,
        boxShadow: `0 0 60px ${color}${Math.floor(glowIntensity * 255).toString(16).padStart(2, "0")}`,
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* 顶部彩色条 */}
      <div
        style={{
          position: "absolute" as const,
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
          borderRadius: "24px 24px 0 0",
        }}
      />

      {/* 图标 */}
      <div style={{ fontSize: 64, lineHeight: 1, marginTop: 8 }}>{icon}</div>

      {/* 标题 */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: color,
          textAlign: "center",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </div>

      {/* 分割线 */}
      <div
        style={{
          width: "60%",
          height: 2,
          background: `${color}40`,
          borderRadius: 1,
        }}
      />

      {/* 描述 */}
      <div
        style={{
          fontSize: 24,
          color: THEME.secondary,
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        {description}
      </div>

      {/* 标签 */}
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, justifyContent: "center" }}>
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
  );
};

export const Scene2_Features: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleSpring = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // 背景弥散光球 - 绿色系
  const bgOpacity = interpolate(frame, [0, 30], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgPulse = 0.8 + Math.sin(frame * 0.04) * 0.2;

  const features = [
    {
      icon: "🤖",
      title: "自主性",
      description: "独立完成复杂任务\n无需人工干预",
      tags: ["自主决策", "独立执行"],
    },
    {
      icon: "⚡",
      title: "反应性",
      description: "快速响应环境变化\n和用户需求",
      tags: ["实时感知", "动态适应"],
    },
    {
      icon: "🎯",
      title: "目标导向性",
      description: "以结果为导向\n制定最优策略",
      tags: ["目标分解", "路径规划"],
    },
    {
      icon: "📚",
      title: "学习能力",
      description: "从经验中优化\n行为模式",
      tags: ["持续学习", "策略优化"],
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
        gap: 48,
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
          background: "radial-gradient(circle, rgba(63,185,80,0.3) 0%, transparent 70%)",
          filter: "blur(120px)",
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
            color: THEME.green,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
          }}
        >
          CORE CHARACTERISTICS
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
          AI Agent 的核心特征
        </div>
      </div>

      {/* 四个特征卡片 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 32,
          width: "100%",
          flex: 1,
        }}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            tags={feature.tags}
            color={FEATURE_COLORS[index]}
            delay={20 + index * 10}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
