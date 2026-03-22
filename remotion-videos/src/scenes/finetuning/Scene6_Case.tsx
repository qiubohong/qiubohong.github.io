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

  // Chat panel expansion
  const chatWidth = interpolate(frame, [60, 90], [0, 420], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Chat message animations
  const messages = [
    { type: "user", text: "你好，请问怎么退款？" },
    { type: "ai", text: "您好！我是您的专属客服助手。关于退款问题，我需要先了解您的订单情况。请问您的订单号是多少呢？" },
    { type: "user", text: "订单号是 123456789" },
    { type: "ai", text: "好的，我帮您查询到订单 123456789 符合退款条件。退款将在3-5个工作日内原路返回。还有什么可以帮您的吗？" },
  ];

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
        padding: "40px 40px",
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 38,
          fontWeight: 700,
          background: THEME.titleGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 20,
        }}
      >
        实际案例：客服对话风格微调
      </div>

      <div style={{ display: "flex", flexDirection: "row", flex: 1, gap: 24 }}>
        {/* Left content area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Description cards */}
          <div
            style={{
              transform: `translateY(${cardY}px)`,
              opacity: cardOpacity,
              background: THEME.cardBg,
              backdropFilter: "blur(16px)",
              border: `1px solid ${THEME.cardBorder}`,
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 20,
                color: THEME.textPrimary,
                lineHeight: 1.6,
              }}
            >
              假设公司有特定的话术和回答风格，需要 AI 保持
              <span style={{ color: THEME.accentOrange, fontWeight: 600 }}>
                专业、友好
              </span>
              的语气。
            </div>
          </div>

          <div
            style={{
              transform: `translateY(${cardOpacity === 0 ? 30 : interpolate(
                frame,
                [40, 60],
                [30, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )}px)`,
              opacity: interpolate(frame, [40, 60], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              background: THEME.cardBg,
              backdropFilter: "blur(16px)",
              border: `1px solid ${THEME.cardBorder}`,
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: THEME.textSecondary,
                lineHeight: 1.6,
              }}
            >
              通过 Fine-tuning，我们可以让模型学习标准化的回答模板。
              数据格式：系统角色 + 用户问题 + 标准回答
            </div>
          </div>

          {/* Training config panel */}
          <div
            style={{
              opacity: codeOpacity,
              background: "#0d1117",
              border: `1px solid ${THEME.cardBorder}`,
              borderRadius: 12,
              padding: 16,
              fontFamily: "'Monaco', 'Menlo', monospace",
              fontSize: 14,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                color: THEME.accentOrange,
                marginBottom: 12,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              OpenAI Fine-tuning API
            </div>
            <div style={{ color: THEME.textSecondary, marginBottom: 4 }}>
              <span style={{ color: THEME.accentBlue }}># 上传训练文件</span>
            </div>
            <div style={{ color: THEME.textPrimary, marginBottom: 12 }}>
              openai api fine_tunes.create -t customer_service.jsonl<span style={{ color: THEME.accentYellow }}> \</span>
            </div>
            <div style={{ color: THEME.textSecondary, marginBottom: 4 }}>
              <span style={{ color: THEME.accentBlue }}># 或使用 SDK</span>
            </div>
            <div style={{ color: THEME.textPrimary }}>
              <span style={{ color: "#ff7b72" }}>response</span> = client.fine_tuning.jobs.create<span style={{ color: "#d2a8ff" }}>(</span><br/>
              &nbsp;&nbsp;model=<span style={{ color: "#a5d6ff" }}>"gpt-3.5-turbo"</span>,<br/>
              &nbsp;&nbsp;training_file=<span style={{ color: "#a5d6ff" }}>"file-xxx"</span>,<br/>
              &nbsp;&nbsp;batch_size=<span style={{ color: "#79c0ff" }}>4</span>,<br/>
              &nbsp;&nbsp;learning_rate_multiplier=<span style={{ color: "#79c0ff" }}>0.1</span><br/>
              <span style={{ color: "#d2a8ff" }}>)</span>
            </div>
          </div>
        </div>

        {/* Right chat panel */}
        <div
          style={{
            width: chatWidth,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 420,
              height: "100%",
              background: THEME.cardBg,
              borderRadius: 16,
              border: `1px solid ${THEME.cardBorder}`,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Chat header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderBottom: `1px solid ${THEME.cardBorder}`,
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#ff5f56",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#ffbd2e",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#27ca40",
                }}
              />
            </div>

            {/* Chat messages */}
            <div
              style={{
                flex: 1,
                padding: 16,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {messages.map((msg, i) => {
                const msgOpacity = interpolate(
                  frame,
                  [90 + i * 25, 110 + i * 25],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                return (
                  <div
                    key={i}
                    style={{
                      opacity: msgOpacity,
                      alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                      maxWidth: "80%",
                      background:
                        msg.type === "user"
                          ? THEME.accentOrange
                          : "rgba(88,166,255,0.2)",
                      color: msg.type === "user" ? "#fff" : THEME.textPrimary,
                      padding: "10px 14px",
                      borderRadius: msg.type === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      fontSize: 15,
                      lineHeight: 1.5,
                    }}
                  >
                    {msg.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
