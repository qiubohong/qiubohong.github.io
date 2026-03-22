import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";
import { CaptionDisplay } from "../../components/CaptionDisplay";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
  accentOrange: "#f0883e",
};

export const Scene2_VisualComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imageSpring = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 20, mass: 1.5 },
  });

  const imageY = interpolate(imageSpring, [0, 1], [80, 0]);
  const imageOpacity = interpolate(imageSpring, [0, 1], [0, 1]);
  const imageScale = interpolate(imageSpring, [0, 1], [0.92, 1]);

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
        padding: 48,
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 40,
          fontWeight: 700,
          color: THEME.textPrimary,
          marginBottom: 32,
          marginTop: 16,
        }}
      >
        传统代码工具 <span style={{ color: THEME.accentOrange }}>VS</span> Code Agent 能力对比
      </div>

      {/* Image Container */}
      <div
        style={{
          transform: `translateY(${imageY}px) scale(${imageScale})`,
          opacity: imageOpacity,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          background: "rgba(255,255,255,0.03)",
          padding: 8,
          maxWidth: 1200,
          width: "100%",
        }}
      >
        <Img
          src={staticFile("CodeAgent21/code-agent-vs-traditional.png")}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: 12,
          }}
        />
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
<CaptionDisplay captionFile="CodeAgent21/scene2-captions.json" />
      </div>
    </AbsoluteFill>
  );
};