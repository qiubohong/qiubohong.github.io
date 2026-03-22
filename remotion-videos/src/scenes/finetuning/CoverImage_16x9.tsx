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

export const CoverImage_16x9: React.FC = () => {
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
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(88,166,255,0.3) 0%, transparent 70%)",
          filter: "blur(100px)",
          left: "15%",
          top: "20%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(240,136,62,0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
          right: "5%",
          bottom: "10%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(63,185,80,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          left: "60%",
          top: "60%",
        }}
      />

      {/* Decorative grid lines */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
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
        }}
      >
        {/* Series badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
            padding: "8px 24px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: THEME.accentGreen,
            }}
          />
          <span
            style={{
              fontSize: 20,
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
            fontSize: 96,
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
            fontSize: 48,
            color: THEME.textPrimary,
            marginTop: 16,
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          模型微调技术
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: THEME.accentOrange,
            marginTop: 32,
            fontWeight: 500,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          让通用AI成为你的领域专家
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: 240,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${THEME.accentOrange}, transparent)`,
            marginTop: 40,
            borderRadius: 2,
          }}
        />

        {/* Keywords */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 48,
          }}
        >
          {["预训练", "微调", "PEFT", "LoRA"].map((keyword, index) => (
            <div
              key={keyword}
              style={{
                padding: "10px 24px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                fontSize: 20,
                color:
                  index === 0
                    ? THEME.accentOrange
                    : index === 1
                    ? "#58a6ff"
                    : index === 2
                    ? THEME.accentGreen
                    : THEME.accentYellow,
                fontWeight: 600,
              }}
            >
              {keyword}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom corner accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${THEME.accentOrange}, #58a6ff, ${THEME.accentGreen})`,
        }}
      />
    </AbsoluteFill>
  );
};
