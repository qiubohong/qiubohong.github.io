import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { CaptionDisplay } from "../../components/CaptionDisplay";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
  accentOrange: "#f0883e",
  cardBg: "rgba(255,255,255,0.06)",
  borderColor: "rgba(255,255,255,0.1)",
};

const products = [
  {
    name: "GitHub Copilot",
    desc: "革命性的代码补全工具，由OpenAI Codex驱动",
    icon: "🚀",
  },
  {
    name: "Claude Code",
    desc: "Anthropic出品，强大的代码生成和对话能力",
    icon: "🤖",
  },
  {
    name: "Cursor",
    desc: "AI-first代码编辑器，基于GPT-4深度集成",
    icon: "⚡",
  },
  {
    name: "Tabnine",
    desc: "本地优先的个人代码助手，支持多种IDE",
    icon: "🛡️",
  },
];

export const Scene6_Products: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
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
        padding: "48px 64px",
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 40,
          fontWeight: 700,
          color: THEME.textPrimary,
          marginBottom: 24,
          marginTop: 16,
        }}
      >
        主流 <span style={{ color: THEME.accentOrange }}>Code Agent</span> 产品
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 32,
          flex: 1,
          width: "100%",
          maxHeight: "calc(100% - 120px)",
        }}
      >
        {products.map((product, index) => {
          const cardSpring = spring({
            frame: Math.max(0, frame - index * 8),
            fps,
            config: { stiffness: 100, damping: 20, mass: 1.2 },
          });

          const cardScale = interpolate(cardSpring, [0, 1], [0.8, 1]);
          const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

          return (
            <div
              key={product.name}
              style={{
                transform: `scale(${cardScale})`,
                opacity: cardOpacity,
                background: THEME.cardBg,
                border: `2px solid ${THEME.borderColor}`,
                borderRadius: 24,
                padding: "40px 48px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 16,
                minHeight: 0,
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  marginBottom: 8,
                }}
              >
                {product.icon}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: THEME.accentOrange,
                }}
              >
                {product.name}
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: THEME.textSecondary,
                  lineHeight: 1.6,
                }}
              >
                {product.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtitles at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          width: "100%",
          padding: "0 64px",
        }}
      >
<CaptionDisplay captionFile="CodeAgent21/scene6-captions.json" />
      </div>
    </AbsoluteFill>
  );
};