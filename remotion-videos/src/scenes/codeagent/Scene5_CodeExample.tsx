import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { CaptionDisplay } from "../../components/CaptionDisplay";
import { CodeBlock } from "../../components/CodeBlock";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  textPrimary: "#c9d1d9",
  accentOrange: "#f0883e",
};

interface Scene5Props {
  code: string;
}

export const Scene5_CodeExample: React.FC<Scene5Props> = ({ code }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const codeSpring = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 20, mass: 1.5 },
  });

  const codeY = interpolate(codeSpring, [0, 1], [60, 0]);
  const codeOpacity = interpolate(codeSpring, [0, 1], [0, 1]);

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
          marginBottom: 32,
          marginTop: 16,
        }}
      >
        Code Agent <span style={{ color: THEME.accentOrange }}>代码演示</span>
      </div>

      {/* Code Container */}
      <div
        style={{
          transform: `translateY(${codeY}px)`,
          opacity: codeOpacity,
          width: "100%",
          maxWidth: 1100,
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <CodeBlock code={code} />
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
<CaptionDisplay captionFile="CodeAgent21/scene5-captions.json" />
      </div>
    </AbsoluteFill>
  );
};