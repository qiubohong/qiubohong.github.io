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

const VALUE_COLORS = ["#58a6ff", "#3fb950", "#f0883e", "#f778ba"];
const VALUE_STATS = ["3x", "95%", "24/7", "80%"];
const VALUE_STAT_LABELS = ["效率提升", "准确率", "在线服务", "错误减少"];

const ValueCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  color: string;
  delay: number;
}> = ({ icon, title, description, stat, statLabel, color, delay }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const cardX = interpolate(cardSpring, [0, 1], [-120, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // 进度条动画
  const progressSpring = spring({
    frame: frame - delay - 15,
    fps,
    config: { stiffness: 50, damping: 15 },
  });
  const progressWidth = interpolate(progressSpring, [0, 1], [0, 100]);

  // 数字计数动画
  const countProgress = interpolate(frame, [delay + 15, delay + 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        background: THEME.cardBg,
        border: `1px solid ${color}30`,
        borderRadius: 20,
        padding: "32px 32px",
        display: "flex",
        alignItems: "center",
        gap: 32,
        transform: `translateX(${cardX}px)`,
        opacity: cardOpacity,
        width: "100%",
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

      {/* 图标区域 */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: `${color}15`,
          border: `2px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 40,
          flexShrink: 0,
          boxShadow: `0 0 30px ${color}20`,
        }}
      >
        {icon}
      </div>

      {/* 内容区域 */}
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
            marginBottom: 16,
          }}
        >
          {description}
        </div>
        {/* 进度条 */}
        <div
          style={{
            width: "100%",
            height: 8,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressWidth}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${color}, ${color}80)`,
              borderRadius: 4,
              boxShadow: `0 0 10px ${color}60`,
            }}
          />
        </div>
      </div>

      {/* 右侧数字统计 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          minWidth: 96,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: color,
            lineHeight: 1,
            textShadow: `0 0 20px ${color}60`,
          }}
        >
          {stat}
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#8b949e",
            marginTop: 8,
            textAlign: "center",
          }}
        >
          {statLabel}
        </div>
      </div>
    </div>
  );
};

export const Scene4_Value: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleSpring = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // 背景弥散光球 - 橙色系
  const bgOpacity = interpolate(frame, [0, 30], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgPulse = 0.8 + Math.sin(frame * 0.05) * 0.2;

  const values = [
    {
      icon: "⚡",
      title: "效率提升",
      description: "自动完成重复性任务，让人从繁琐工作中解放出来",
    },
    {
      icon: "🧠",
      title: "智能决策",
      description: "基于数据分析做出最优选择，提高决策质量",
    },
    {
      icon: "🕐",
      title: "24小时服务",
      description: "不间断的智能助手服务，随时响应需求",
    },
    {
      icon: "✅",
      title: "错误减少",
      description: "标准化流程降低人为失误，提高工作质量",
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
        gap: 40,
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
          background: "radial-gradient(circle, rgba(240,136,62,0.25) 0%, transparent 70%)",
          filter: "blur(100px)",
          right: "10%",
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
            color: THEME.accent,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
          }}
        >
          CORE VALUE
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
          AI Agent 的核心价值
        </div>
      </div>

      {/* 四个价值卡片 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "100%",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {values.map((value, index) => (
          <ValueCard
            key={index}
            icon={value.icon}
            title={value.title}
            description={value.description}
            stat={VALUE_STATS[index]}
            statLabel={VALUE_STAT_LABELS[index]}
            color={VALUE_COLORS[index]}
            delay={20 + index * 8}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
