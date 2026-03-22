import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  primary: "#58a6ff",
  secondary: "#c9d1d9",
  accent: "#f0883e",
  cardBg: "rgba(255,255,255,0.06)",
  blue: "#58a6ff",
  green: "#3fb950",
  orange: "#f0883e",
  pink: "#f778ba",
};

const APP_COLORS = ["#58a6ff", "#3fb950", "#f0883e", "#f778ba"];

const AppCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  products: string[];
  color: string;
  delay: number;
}> = ({ icon, title, description, products, color, delay }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const cardScale = interpolate(cardSpring, [0, 1], [0.8, 1]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // 光晕脉冲效果
  const glowIntensity = 0.1 + Math.sin((frame - delay) * 0.07) * 0.07;

  return (
    <div
      style={{
        background: THEME.cardBg,
        border: `2px solid ${color}40`,
        borderRadius: 24,
        padding: "40px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transform: `scale(${cardScale})`,
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
          background: `linear-gradient(90deg, ${color}, ${color}40)`,
          borderRadius: "24px 24px 0 0",
        }}
      />

      {/* 图标 + 标题 */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: `${color}15`,
            border: `2px solid ${color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: color,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
      </div>

      {/* 描述 */}
      <div
        style={{
          fontSize: 24,
          color: THEME.secondary,
          lineHeight: 1.6,
        }}
      >
        {description}
      </div>

      {/* 产品标签 */}
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginTop: "auto" }}>
        {products.map((product, i) => (
          <div
            key={i}
            style={{
              padding: "6px 16px",
              background: `${color}15`,
              border: `1px solid ${color}40`,
              borderRadius: 20,
              fontSize: 16,
              color: color,
              fontWeight: 600,
            }}
          >
            {product}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Scene6_Applications: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleSpring = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // 背景弥散光球 - 四色
  const bgOpacity = interpolate(frame, [0, 30], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const apps = [
    {
      icon: "💻",
      title: "智能代码助手",
      description: "自动编写、调试、优化代码，提升开发效率",
      products: ["Codebuddy", "QwenCode", "通义灵码"],
    },
    {
      icon: "📊",
      title: "数据分析 Agent",
      description: "自动分析数据、生成报告，提供商业洞察",
      products: ["商业智能", "市场分析", "数据可视化"],
    },
    {
      icon: "✍️",
      title: "内容创作 Agent",
      description: "自动生成文章、设计图像，制作视频内容",
      products: ["通义千问", "可灵AI", "即梦AI"],
    },
    {
      icon: "🎧",
      title: "客户服务 Agent",
      description: "24小时自动客服，问题解决、订单处理",
      products: ["响应速度↑", "运营成本↓", "满意度↑"],
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
      {/* 背景弥散光球 - 四色 */}
      {[
        { color: "88,166,255", x: "20%", y: "30%" },
        { color: "63,185,80", x: "80%", y: "30%" },
        { color: "240,136,62", x: "20%", y: "70%" },
        { color: "247,120,186", x: "80%", y: "70%" },
      ].map((ball, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(${ball.color},0.2) 0%, transparent 70%)`,
            filter: "blur(80px)",
            left: ball.x,
            top: ball.y,
            transform: "translate(-50%, -50%)",
            opacity: bgOpacity,
            pointerEvents: "none",
          }}
        />
      ))}

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
          APPLICATIONS
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
          AI Agent 四大应用场景
        </div>
      </div>

      {/* 2x2 网格布局 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 32,
          width: "100%",
          flex: 1,
        }}
      >
        {apps.map((app, index) => (
          <AppCard
            key={index}
            icon={app.icon}
            title={app.title}
            description={app.description}
            products={app.products}
            color={APP_COLORS[index]}
            delay={20 + index * 8}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
