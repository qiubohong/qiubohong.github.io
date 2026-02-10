import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface EndingSceneProps {
  mainTitle?: string;
  subtitle?: string;
  description?: string;
}

export const EndingScene: React.FC<EndingSceneProps> = ({
  mainTitle = "感谢观看",
  subtitle = "若喜欢请关注",
  description = "每天5分钟，轻松学AI"
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 淡入效果
  const opacity = interpolate(
    frame,
    [0, 30],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 结尾时的缩放效果
  const scale = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 1.2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill style={{ 
      backgroundColor: "#1a1a1a",
      justifyContent: "center", 
      alignItems: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        opacity,
        transform: `scale(${scale})`,
        textAlign: "center",
        color: "white"
      }}>
        <h1 style={{
          fontSize: 60,
          fontWeight: "bold",
          marginBottom: 40,
          textShadow: "0 4px 8px rgba(0,0,0,0.5)",
          background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          {mainTitle}
        </h1>
        <p style={{
          fontSize: 36,
          fontWeight: "600",
          marginBottom: 20,
          opacity: interpolate(frame, [15, 45], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }}>
          {subtitle}
        </p>
        <div style={{
          fontSize: 24,
          opacity: interpolate(frame, [30, 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }}>
          {description}
        </div>
      </div>
    </AbsoluteFill>
  );
};
