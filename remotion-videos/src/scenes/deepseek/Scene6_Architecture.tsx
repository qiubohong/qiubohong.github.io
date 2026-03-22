import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
  primary: "#58a6ff",
  secondary: "#79c0ff",
  accent: "#f0883e",
  highlight: "#3fb950",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
};

export const Scene6_Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 标题栏
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 左侧旧架构
  const oldOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 中央箭头流动
  const arrowProgress = interpolate(frame, [25, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 右侧新架构
  const newOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateRight: "clamp",
  });
  const newTranslate = spring({
    frame: frame - 45,
    fps,
    config: { stiffness: 100, damping: 20 },
  });

  // 论文卡片
  const paperCard = spring({
    frame: frame - 65,
    fps,
    config: { stiffness: 100, damping: 20 },
  });

  // 辩论卡片
  const leftDebate = spring({
    frame: frame - 80,
    fps,
    config: { stiffness: 100, damping: 20 },
  });

  const rightDebate = spring({
    frame: frame - 90,
    fps,
    config: { stiffness: 100, damping: 20 },
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        fontFamily: THEME.fontFamily,
        display: "flex",
        flexDirection: "column",
        padding: "40px",
      }}
    >
      {/* 标题栏 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(88,166,255,0.15)",
            border: `1px solid ${THEME.primary}40`,
            borderRadius: 20,
            padding: "8px 24px",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 18, color: THEME.primary }}>第四轮辩论</span>
        </div>
        <h2
          style={{
            fontSize: 36,
            color: THEME.textPrimary,
            fontWeight: "bold",
            margin: 0,
          }}
        >
          R2推迟背后的架构反思
        </h2>
      </div>

      {/* 架构对比图 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          height: 160,
        }}
      >
        {/* 旧架构 */}
        <div
          style={{
            width: 200,
            padding: 20,
            background: "rgba(139,148,158,0.1)",
            borderRadius: 16,
            border: "2px solid rgba(139,148,158,0.3)",
            textAlign: "center",
            opacity: oldOpacity,
            filter: "grayscale(0.4)",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 8 }}>📚</div>
          <div style={{ fontSize: 20, color: THEME.textSecondary, fontWeight: "bold" }}>
            参数堆叠
          </div>
          <div style={{ fontSize: 14, color: THEME.textSecondary, marginTop: 4 }}>
            GPT-5 效果不及预期
          </div>
        </div>

        {/* 箭头 */}
        <div style={{ width: 80, display: "flex", justifyContent: "center" }}>
          <svg width="60" height="30" viewBox="0 0 60 30">
            <defs>
              <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b949e" stopOpacity={arrowProgress > 0.5 ? 0.5 : arrowProgress} />
                <stop offset="100%" stopColor="#58a6ff" stopOpacity={arrowProgress} />
              </linearGradient>
            </defs>
            <path
              d="M 5 15 L 45 15 L 40 10 M 45 15 L 40 20"
              stroke="url(#arrowGrad)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* 新架构 */}
        <div
          style={{
            width: 200,
            padding: 20,
            background: "rgba(88,166,255,0.15)",
            borderRadius: 16,
            border: `2px solid ${THEME.primary}60`,
            textAlign: "center",
            opacity: newOpacity,
            transform: `translateX(${(1 - newTranslate) * 30}px)`,
            boxShadow: "0 0 40px rgba(88,166,255,0.2)",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 8 }}>🧠</div>
          <div style={{ fontSize: 20, color: THEME.primary, fontWeight: "bold" }}>
            架构创新
          </div>
          <div style={{ fontSize: 14, color: THEME.textPrimary, marginTop: 4 }}>
            mHC · Conditional Memory
          </div>
        </div>
      </div>

      {/* 论文引用 */}
      <div
        style={{
          background: "rgba(255,210,0,0.08)",
          borderRadius: 16,
          padding: 16,
          marginBottom: 20,
          border: "1px solid rgba(255,210,0,0.3)",
          transform: `translateY(${(1 - paperCard) * 30}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 20, marginRight: 8 }}>📄</span>
          <span style={{ fontSize: 16, color: "#ffd200", fontWeight: "bold" }}>
            梁文锋署名论文
          </span>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, fontSize: 16, color: THEME.textPrimary }}>
            <strong style={{ color: THEME.primary }}>Conditional Memory</strong>
            <br />
            <span style={{ fontSize: 14, color: THEME.textSecondary }}>条件记忆机制</span>
          </div>
          <div style={{ flex: 1, fontSize: 16, color: THEME.textPrimary }}>
            <strong style={{ color: THEME.primary }}>mHC</strong>
            <br />
            <span style={{ fontSize: 14, color: THEME.textSecondary }}>流形约束超连接</span>
          </div>
          <div style={{ flex: 1, fontSize: 16, color: THEME.textPrimary }}>
            <strong style={{ color: THEME.accent }}>目标</strong>
            <br />
            <span style={{ fontSize: 14, color: THEME.textSecondary }}>解决Transformer记忆瓶颈</span>
          </div>
        </div>
      </div>

      {/* 辩论观点 */}
      <div style={{ display: "flex", gap: 12, flex: 1 }}>
        {/* 观点一：架构升级 */}
        <div
          style={{
            flex: 1,
            background: "rgba(88,166,255,0.08)",
            borderRadius: 16,
            padding: 16,
            border: `2px solid ${THEME.primary}40`,
            transform: `translateY(${(1 - leftDebate) * 40}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 20, marginRight: 8 }}>🚀</span>
            <span style={{ fontSize: 17, fontWeight: "bold", color: THEME.primary }}>
              观点一：架构升级
            </span>
          </div>
          <p
            style={{
              fontSize: 15,
              color: THEME.textPrimary,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            R2推迟是<strong style={{ color: THEME.primary }}>架构升级</strong>。
            mHC能解决神经网络层数增加时的信号衰减，让模型真正拥有长期记忆。
            R2不是没做出来，是在做一件<strong style={{ color: "#ffd200" }}>更难的事</strong>。
          </p>
        </div>

        {/* 观点二：路线摇摆 */}
        <div
          style={{
            flex: 1,
            background: "rgba(248,81,73,0.08)",
            borderRadius: 16,
            padding: 16,
            border: "2px solid rgba(248,81,73,0.3)",
            transform: `translateY(${(1 - rightDebate) * 40}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 20, marginRight: 8 }}>🔄</span>
            <span style={{ fontSize: 17, fontWeight: "bold", color: "#f85149" }}>
              观点二：路线摇摆
            </span>
          </div>
          <p
            style={{
              fontSize: 15,
              color: THEME.textPrimary,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            mHC需要<strong style={{ color: "#f85149" }}>全新的训练框架</strong>。
            整个pipeline都要推翻重来，这不是"战略升级"，是
            <strong style={{ color: "#f85149" }}>技术路线摇摆</strong>。
            R2项目至少被推倒重来两次。
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
