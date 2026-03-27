import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";

interface EndingSceneProps {
  mainTitle?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
}

export const EndingScene: React.FC<EndingSceneProps> = ({
  mainTitle = "感谢观看",
  subtitle = "若喜欢请关注",
  description = "每天5分钟，轻松学AI",
  backgroundImage,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 背景图淡入效果
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      backgroundColor: backgroundImage ? undefined : "#ffffff",
      background: backgroundImage ? "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)" : undefined,
      justifyContent: "center",
      alignItems: "center",
      fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", Arial, sans-serif',
      overflow: "hidden",
    }}>
      {/* 背景图 */}
      {backgroundImage && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: bgOpacity,
          zIndex: 0,
        }}>
          <Img
            src={staticFile(backgroundImage)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* 遮罩层保证文字可读性 */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(13,17,23,0.75)",
          }} />
        </div>
      )}

      <div style={{
        opacity,
        transform: `scale(${scale})`,
        textAlign: "center",
        color: backgroundImage ? "#c9d1d9" : "#1f2937",
        zIndex: 2,
        position: "relative",
      } as React.CSSProperties}>
        <h1 style={{
          fontSize: 60,
          fontWeight: "bold",
          marginBottom: 40,
          textShadow: backgroundImage ? "0 0 40px rgba(88,166,255,0.4)" : "0 2px 4px rgba(0,0,0,0.1)",
          background: backgroundImage ? "linear-gradient(45deg, #58a6ff, #79c0ff)" : "linear-gradient(45deg, #dc2626, #0891b2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          {mainTitle}
        </h1>
        <p style={{
          fontSize: 36,
          fontWeight: "600",
          marginBottom: 20,
          color: backgroundImage ? "#c9d1d9" : "#374151",
          opacity: interpolate(frame, [15, 45], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }}>
          {subtitle}
        </p>
        <div style={{
          fontSize: 24,
          color: backgroundImage ? "#8b949e" : "#6b7280",
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
