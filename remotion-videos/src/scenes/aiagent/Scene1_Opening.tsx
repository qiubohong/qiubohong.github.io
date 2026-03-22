import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  primary: "#58a6ff",
  secondary: "#c9d1d9",
  accent: "#f0883e",
  red: "#ff5555",
  cardBg: "rgba(255,255,255,0.06)",
};

export const Scene1_Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  // 背景弥散光动画
  const leftBallOpacity = interpolate(frame, [0, 30], [0, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightBallOpacity = interpolate(frame, [15, 45], [0, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // 弥散光缓慢脉动
  const ballPulse = 0.85 + Math.sin(frame * 0.05) * 0.15;

  // 标题淡入
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 左侧卡片滑入动画
  const leftCardSpring = spring({
    frame: frame - 10,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const leftCardX = interpolate(leftCardSpring, [0, 1], [-300, 0]);
  const leftCardOpacity = interpolate(leftCardSpring, [0, 1], [0, 1]);

  // 右侧卡片滑入动画
  const rightCardSpring = spring({
    frame: frame - 20,
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const rightCardX = interpolate(rightCardSpring, [0, 1], [300, 0]);
  const rightCardOpacity = interpolate(rightCardSpring, [0, 1], [0, 1]);

  // 箭头缩放动画
  const arrowSpring = spring({
    frame: frame - 35,
    fps,
    config: { stiffness: 120, damping: 18 },
  });
  const arrowScale = interpolate(arrowSpring, [0, 1], [0, 1]);
  const arrowOpacity = interpolate(arrowSpring, [0, 1], [0, 1]);

  // 关键词高亮闪烁
  const highlight1 = 0.7 + Math.sin(frame * 0.15) * 0.3;
  const highlight2 = 0.7 + Math.sin(frame * 0.15 + 1) * 0.3;

  // 底部标签淡入
  const tagOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        padding: "64px 80px",
        fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
        overflow: "hidden",
      }}
    >
      {/* 背景弥散光球 - 左侧红色 */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,85,85,0.4) 0%, transparent 70%)",
          filter: "blur(100px)",
          left: "15%",
          top: "40%",
          opacity: leftBallOpacity * ballPulse,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
      {/* 背景弥散光球 - 右侧蓝色 */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(88,166,255,0.4) 0%, transparent 70%)",
          filter: "blur(100px)",
          right: "15%",
          top: "40%",
          opacity: rightBallOpacity * ballPulse,
          transform: "translate(50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* 主标题 */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
        }}
      >
        AI Agent 核心转变
      </div>

      {/* 对比卡片容器 */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          gap: 48,
          width: "100%",
          maxWidth: 1400,
        }}
      >
        {/* 左侧：传统 AI */}
        <div
          style={{
            flex: 1,
            maxWidth: 520,
            padding: "40px 32px",
            background: "rgba(255,85,85,0.06)",
            borderRadius: 24,
            border: "2px solid rgba(255,85,85,0.4)",
            backdropFilter: "blur(16px)",
            transform: `translateX(${leftCardX}px)`,
            opacity: leftCardOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            boxShadow: "0 0 60px rgba(255,85,85,0.15)",
          }}
        >
          {/* 红色 ❌ 标记 */}
          <div
            style={{
              position: "absolute" as const,
              top: -16,
              right: -16,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#ff5555",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 900,
              color: "#fff",
              boxShadow: "0 0 20px rgba(255,85,85,0.5)",
            }}
          >
            ✕
          </div>
          <div style={{ fontSize: 72 }}>🤖❓</div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 900,
              color: `rgba(255,85,85,${highlight1})`,
              textAlign: "center",
            }}
          >
            答题机器
          </div>
          <div
            style={{
              width: "100%",
              height: 2,
              background: "rgba(255,85,85,0.3)",
              borderRadius: 1,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              width: "100%",
            }}
          >
            {["被动响应", "单一指令执行", "文本生成"].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 24,
                  color: "#c9d1d9",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "rgba(255,85,85,0.6)",
                    flexShrink: 0,
                  }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* 中间箭头 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transform: `scale(${arrowScale})`,
            opacity: arrowOpacity,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: "#8b949e",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
            }}
          >
            进化为
          </div>
          <div
            style={{
              fontSize: 80,
              background: "linear-gradient(90deg, #ff5555, #58a6ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}
          >
            →
          </div>
        </div>

        {/* 右侧：AI Agent */}
        <div
          style={{
            flex: 1,
            maxWidth: 520,
            padding: "40px 32px",
            background: "rgba(88,166,255,0.06)",
            borderRadius: 24,
            border: "2px solid rgba(88,166,255,0.4)",
            backdropFilter: "blur(16px)",
            transform: `translateX(${rightCardX}px)`,
            opacity: rightCardOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            boxShadow: "0 0 60px rgba(88,166,255,0.15)",
            position: "relative" as const,
          }}
        >
          {/* 绿色 ✅ 标记 */}
          <div
            style={{
              position: "absolute" as const,
              top: -16,
              right: -16,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#3fb950",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              color: "#fff",
              boxShadow: "0 0 20px rgba(63,185,80,0.5)",
            }}
          >
            ✓
          </div>
          <div style={{ fontSize: 72 }}>🤖⚙️🔧</div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 900,
              color: `rgba(88,166,255,${highlight2})`,
              textAlign: "center",
            }}
          >
            会思考的执行者
          </div>
          <div
            style={{
              width: "100%",
              height: 2,
              background: "rgba(88,166,255,0.3)",
              borderRadius: 1,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              width: "100%",
            }}
          >
            {["主动规划", "复杂目标分解", "多工具调用"].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 24,
                  color: "#c9d1d9",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "rgba(88,166,255,0.6)",
                    flexShrink: 0,
                  }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部标签 */}
      <div
        style={{
          display: "flex",
          gap: 24,
          opacity: tagOpacity,
        }}
      >
        {["自主性", "反应性", "目标导向", "学习能力"].map((tag, i) => (
          <div
            key={i}
            style={{
              padding: "8px 24px",
              background: "rgba(88,166,255,0.1)",
              border: "1px solid rgba(88,166,255,0.3)",
              borderRadius: 32,
              fontSize: 24,
              color: THEME.primary,
              fontWeight: 600,
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
