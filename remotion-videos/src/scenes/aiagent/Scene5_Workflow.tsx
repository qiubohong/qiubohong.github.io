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

const STEP_COLORS = [
  "#58a6ff",
  "#79c0ff",
  "#3fb950",
  "#f0883e",
  "#f778ba",
  "#a371f7",
  "#ffd200",
];

const STEP_ICONS = ["👁️", "🎯", "🔀", "🔧", "▶️", "📊", "🎓"];

const StepCard: React.FC<{
  number: number;
  icon: string;
  title: string;
  description: string;
  color: string;
  delay: number;
  isActive: boolean;
}> = ({ number, icon, title, description, color, delay, isActive }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);
  const cardScale = interpolate(cardSpring, [0, 1], [0.85, 1]);

  // 当前步骤高亮脉冲
  const pulseIntensity = isActive
    ? 0.15 + Math.sin(frame * 0.12) * 0.1
    : 0.05;

  return (
    <div
      style={{
        background: isActive ? `${color}10` : THEME.cardBg,
        border: `2px solid ${isActive ? color : color + "30"}`,
        borderRadius: 16,
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        boxShadow: `0 0 30px ${color}${Math.floor(pulseIntensity * 255).toString(16).padStart(2, "0")}`,
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* 步骤编号圆圈 */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: isActive
            ? `linear-gradient(135deg, ${color}, ${color}80)`
            : `${color}20`,
          border: `2px solid ${color}60`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: 900,
          color: isActive ? "#fff" : color,
          flexShrink: 0,
          boxShadow: isActive ? `0 0 20px ${color}60` : "none",
        }}
      >
        {number}
      </div>

      {/* 图标 */}
      <div style={{ fontSize: 32, flexShrink: 0 }}>{icon}</div>

      {/* 内容 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: isActive ? color : THEME.primary,
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 16,
            color: THEME.secondary,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>

      {/* 右侧箭头（非最后一步） */}
      {number < 7 && (
        <div
          style={{
            fontSize: 24,
            color: `${color}60`,
            flexShrink: 0,
          }}
        >
          →
        </div>
      )}
    </div>
  );
};

export const Scene5_Workflow: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleSpring = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // 背景弥散光球 - 蓝色系
  const bgOpacity = interpolate(frame, [0, 30], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 当前高亮步骤（随时间推进）
  const activeStep = Math.floor(
    interpolate(frame, [30, 200], [0, 6], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const steps = [
    { title: "环境感知", description: "接收用户指令和环境信息" },
    { title: "目标解析", description: "理解用户意图和期望结果" },
    { title: "任务分解", description: "将复杂目标拆解为可执行步骤" },
    { title: "工具选择", description: "确定完成任务所需的方法和资源" },
    { title: "行动执行", description: "按计划执行具体操作" },
    { title: "结果评估", description: "检查是否达成目标" },
    { title: "经验学习", description: "优化未来的决策策略" },
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
          width: 800,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(88,166,255,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: bgOpacity,
          pointerEvents: "none",
        }}
      />

      {/* 标题区域 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
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
          WORKFLOW
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            letterSpacing: "-0.03em",
          }}
        >
          AI Agent 工作流程
        </div>
      </div>

      {/* 七个步骤 - 单列布局 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {steps.map((step, index) => (
          <StepCard
            key={index}
            number={index + 1}
            icon={STEP_ICONS[index]}
            title={step.title}
            description={step.description}
            color={STEP_COLORS[index]}
            delay={20 + index * 6}
            isActive={activeStep === index}
          />
        ))}
      </div>

      {/* 底部循环提示 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: interpolate(frame, [80, 100], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#8b949e",
          }}
        >
          🔄
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#8b949e",
          }}
        >
          持续循环，不断优化
        </div>
      </div>
    </AbsoluteFill>
  );
};
