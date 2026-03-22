import React from "react";
import { AbsoluteFill } from "remotion";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
  accentOrange: "#f0883e",
  accentGreen: "#3fb950",
  accentYellow: "#ffd200",
};

export const CoverImage_9x16: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(88,166,255,0.35) 0%, transparent 70%)",
          filter: "blur(120px)",
          left: "50%",
          top: "20%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(240,136,62,0.3) 0%, transparent 70%)",
          filter: "blur(100px)",
          left: "20%",
          bottom: "10%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(63,185,80,0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
          right: "10%",
          top: "50%",
        }}
      />

      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          border: "2px solid rgba(88,166,255,0.1)",
          borderRadius: "50%",
          left: "10%",
          top: "15%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 150,
          height: 150,
          border: "2px solid rgba(240,136,62,0.1)",
          borderRadius: "50%",
          right: "8%",
          bottom: "20%",
        }}
      />

      {/* Main content container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          position: "relative",
          padding: "0 40px",
        }}
      >
        {/* Series badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 48,
            padding: "10px 28px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 28,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: THEME.accentGreen,
            }}
          />
          <span
            style={{
              fontSize: 24,
              color: THEME.textSecondary,
              fontWeight: 500,
            }}
          >
            5分钟 AI · 第19期
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            background: THEME.titleGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Fine-tuning
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 56,
            color: THEME.textPrimary,
            marginTop: 20,
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          模型微调
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: THEME.accentOrange,
            marginTop: 48,
            fontWeight: 600,
            textAlign: "center",
            maxWidth: 500,
            lineHeight: 1.5,
          }}
        >
          让通用AI成为你的
          <br />
          领域专家
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: 200,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${THEME.accentOrange}, transparent)`,
            marginTop: 48,
            borderRadius: 2,
          }}
        />

        {/* Keywords - vertical stack for mobile */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginTop: 56,
            alignItems: "center",
          }}
        >
          {[
            { text: "预训练 → 微调", color: THEME.accentOrange },
            { text: "PEFT 参数高效微调", color: THEME.accentGreen },
            { text: "LoRA 低秩适应", color: THEME.accentYellow },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                padding: "14px 32px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 40,
                fontSize: 26,
                color: item.color,
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom highlight bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, ${THEME.accentOrange}, #58a6ff, ${THEME.accentGreen})`,
        }}
      />

      {/* Instagram/TikTok style handle */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 22,
          color: "rgba(255,255,255,0.4)",
          fontWeight: 500,
        }}
      >
        @5分钟AI
      </div>
    </AbsoluteFill>
  );
};
