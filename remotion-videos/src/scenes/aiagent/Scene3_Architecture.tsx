import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  primary: "#58a6ff",
  secondary: "#c9d1d9",
  accent: "#f0883e",
  cardBg: "rgba(255,255,255,0.06)",
  orange: "#f0883e",
  blue: "#58a6ff",
  green: "#3fb950",
  pink: "#f778ba",
};

const MODULE_CONFIG = [
  {
    icon: "👁️",
    title: "感知模块",
    subtitle: "Perception",
    items: ["自然语言理解", "上下文感知", "多模态输入"],
    color: "#f0883e",
    gridArea: "tl",
  },
  {
    icon: "🧠",
    title: "规划模块",
    subtitle: "Planning",
    items: ["目标导向规划", "约束条件处理", "风险评估"],
    color: "#58a6ff",
    gridArea: "tr",
  },
  {
    icon: "⚡",
    title: "行动模块",
    subtitle: "Action",
    items: ["工具调用能力", "多步骤协调", "错误处理"],
    color: "#3fb950",
    gridArea: "bl",
  },
  {
    icon: "📈",
    title: "学习模块",
    subtitle: "Learning",
    items: ["经验积累", "策略调整", "适应性改进"],
    color: "#f778ba",
    gridArea: "br",
  },
];

const ModuleCard: React.FC<{
  icon: string;
  title: string;
  subtitle: string;
  items: string[];
  color: string;
  delay: number;
  direction: "left" | "right" | "top" | "bottom";
}> = ({ icon, title, subtitle, items, color, delay, direction }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const offset = interpolate(cardSpring, [0, 1], [-80, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);
  const cardScale = interpolate(cardSpring, [0, 1], [0.9, 1]);

  const translateStyle =
    direction === "left"
      ? `translateX(${offset}px) scale(${cardScale})`
      : direction === "right"
      ? `translateX(${-offset}px) scale(${cardScale})`
      : direction === "top"
      ? `translateY(${offset}px) scale(${cardScale})`
      : `translateY(${-offset}px) scale(${cardScale})`;

  // 光晕脉冲
  const glowIntensity = 0.12 + Math.sin((frame - delay) * 0.07) * 0.08;

  return (
    <div
      style={{
        background: THEME.cardBg,
        border: `2px solid ${color}50`,
        borderRadius: 20,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transform: translateStyle,
        opacity: cardOpacity,
        boxShadow: `0 0 50px ${color}${Math.floor(glowIntensity * 255).toString(16).padStart(2, "0")}`,
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* 背景装饰 */}
      <div
        style={{
          position: "absolute" as const,
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* 图标 + 标题行 */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: `${color}20`,
            border: `2px solid ${color}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
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
          <div
            style={{
              fontSize: 16,
              color: `${color}80`,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>

      {/* 分割线 */}
      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, ${color}40, transparent)`,
        }}
      />

      {/* 功能列表 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              color: THEME.secondary,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: color,
                flexShrink: 0,
                boxShadow: `0 0 8px ${color}`,
              }}
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Scene3_Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  // 中心图标动画
  const centerSpring = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const centerScale = interpolate(centerSpring, [0, 1], [0, 1]);
  const centerOpacity = interpolate(centerSpring, [0, 1], [0, 1]);

  // 中心旋转光环
  const rotateAngle = frame * 0.5;

  // 连接线动画
  const lineProgress = interpolate(frame, [40, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 标题动画
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 背景弥散光球
  const bgOpacity = interpolate(frame, [0, 30], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const directions: Array<"left" | "right" | "top" | "bottom"> = ["left", "right", "left", "right"];

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 80px",
        gap: 32,
        fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
        overflow: "hidden",
      }}
    >
      {/* 背景弥散光球 - 四色 */}
      {[
        { color: "255,136,62", x: "20%", y: "30%" },
        { color: "88,166,255", x: "80%", y: "30%" },
        { color: "63,185,80", x: "20%", y: "70%" },
        { color: "247,120,186", x: "80%", y: "70%" },
      ].map((ball, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(${ball.color},0.25) 0%, transparent 70%)`,
            filter: "blur(80px)",
            left: ball.x,
            top: ball.y,
            transform: "translate(-50%, -50%)",
            opacity: bgOpacity,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 标题 */}
      <div
        style={{
          fontSize: 16,
          color: THEME.primary,
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase" as const,
          opacity: titleOpacity,
        }}
      >
        ARCHITECTURE
      </div>

      {/* 主体：2列布局 + 中心 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 32,
          width: "100%",
          flex: 1,
          alignItems: "center",
        }}
      >
        {/* 左上：感知模块 */}
        <ModuleCard
          {...MODULE_CONFIG[0]}
          delay={35}
          direction="left"
        />

        {/* 中心区域 - 跨两行 */}
        <div
          style={{
            gridRow: "1 / 3",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            transform: `scale(${centerScale})`,
            opacity: centerOpacity,
            width: 200,
          }}
        >
          {/* 旋转光环 */}
          <div
            style={{
              position: "relative" as const,
              width: 160,
              height: 160,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute" as const,
                inset: 0,
                borderRadius: "50%",
                border: "2px dashed rgba(88,166,255,0.3)",
                transform: `rotate(${rotateAngle}deg)`,
              }}
            />
            <div
              style={{
                position: "absolute" as const,
                inset: 12,
                borderRadius: "50%",
                border: "2px solid rgba(88,166,255,0.15)",
                transform: `rotate(${-rotateAngle * 0.7}deg)`,
              }}
            />
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.2) 0%, rgba(88,166,255,0.05) 60%, transparent 100%)",
                border: "2px solid rgba(88,166,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 56,
                boxShadow: "0 0 40px rgba(88,166,255,0.3)",
              }}
            >
              🤖
            </div>
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: THEME.primary,
              textAlign: "center",
              letterSpacing: "-0.02em",
            }}
          >
            AI Agent
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#8b949e",
              textAlign: "center",
            }}
          >
            核心引擎
          </div>
        </div>

        {/* 右上：规划模块 */}
        <ModuleCard
          {...MODULE_CONFIG[1]}
          delay={45}
          direction="right"
        />

        {/* 左下：行动模块 */}
        <ModuleCard
          {...MODULE_CONFIG[2]}
          delay={55}
          direction="left"
        />

        {/* 右下：学习模块 */}
        <ModuleCard
          {...MODULE_CONFIG[3]}
          delay={65}
          direction="right"
        />
      </div>
    </AbsoluteFill>
  );
};
