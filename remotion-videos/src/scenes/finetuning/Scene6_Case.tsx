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
  accentOrange: "#f0883e",
  accentBlue: "#58a6ff",
  cardBg: "rgba(255,255,255,0.06)",
  cardBorder: "rgba(255,255,255,0.1)",
};

export const Scene6_Case: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Content card animation
  const cardSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { stiffness: 100, damping: 20, mass: 1.2 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [30, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // Code panel animation
  const codeOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "column",
        padding: "40px",
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
          marginBottom: 24,
        }}
      >
        实际案例：客服对话风格微调
      </div>

      {/* Content area - fills entire space */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 24 }}>
        {/* Description cards */}
        <div
          style={{
            transform: `translateY(${cardY}px)`,
            opacity: cardOpacity,
            background: THEME.cardBg,
            backdropFilter: "blur(16px)",
            border: `1px solid ${THEME.cardBorder}`,
            borderRadius: 16,
            padding: 32,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: THEME.textPrimary,
              lineHeight: 1.8,
              marginBottom: 24,
            }}
          >
            假设公司有特定的
            <span style={{ color: THEME.accentOrange, fontWeight: 600 }}>
              话术和回答风格
            </span>
            ，需要 AI 保持
            <span style={{ color: THEME.accentOrange, fontWeight: 600 }}>
              专业、友好
            </span>
            的语气。
          </div>

          <div
            style={{
              transform: `translateY(${cardOpacity === 0 ? 30 : interpolate(frame, [40, 60], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
              opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              fontSize: 24,
              color: THEME.textSecondary,
              lineHeight: 1.8,
            }}
          >
            通过 Fine-tuning，我们可以让模型学习
            <span style={{ color: THEME.accentBlue, fontWeight: 600 }}>标准化的回答模板</span>。
            数据格式：<span style={{ color: THEME.accentGreen, fontWeight: 600 }}>系统角色 + 用户问题 + 标准回答</span>
          </div>
        </div>

        {/* Training config panel */}
        <div
          style={{
            opacity: codeOpacity,
            background: "#0d1117",
            border: `1px solid ${THEME.cardBorder}`,
            borderRadius: 16,
            padding: 32,
            fontFamily: "'Monaco', 'Menlo', monospace",
            fontSize: 18,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: THEME.accentOrange,
              marginBottom: 24,
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            OpenAI Fine-tuning API
          </div>
          <div style={{ color: THEME.textSecondary, marginBottom: 8 }}>
            <span style={{ color: THEME.accentBlue }}># 上传训练文件</span>
          </div>
          <div style={{ color: THEME.textPrimary, marginBottom: 24, fontSize: 18, lineHeight: 1.8 }}>
            openai api fine_tunes.create -t customer_service.jsonl<span style={{ color: THEME.accentYellow }}> \</span>
          </div>
          <div style={{ color: THEME.textSecondary, marginBottom: 8 }}>
            <span style={{ color: THEME.accentBlue }}># 或使用 SDK</span>
          </div>
          <div style={{ color: THEME.textPrimary, lineHeight: 1.8 }}>
            <span style={{ color: "#ff7b72" }}>response</span> = client.fine_tuning.jobs.create<span style={{ color: "#d2a8ff" }}>(</span><br/>
            &nbsp;&nbsp;model=<span style={{ color: "#a5d6ff" }}>"gpt-3.5-turbo"</span>,<br/>
            &nbsp;&nbsp;training_file=<span style={{ color: "#a5d6ff" }}>"file-xxx"</span>,<br/>
            &nbsp;&nbsp;batch_size=<span style={{ color: "#79c0ff" }}>4</span>,<br/>
            &nbsp;&nbsp;learning_rate_multiplier=<span style={{ color: "#79c0ff" }}>0.1</span><br/>
            <span style={{ color: "#d2a8ff" }}>)</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
