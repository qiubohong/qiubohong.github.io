import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile } from "remotion";

export const Scene5_Ethics: React.FC = () => {
  const frame = useCurrentFrame();

  // 背景图淡入
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 叠加层淡入
  const overlayOpacity = interpolate(frame, [10, 25], [0, 0.6], {
    extrapolateRight: "clamp",
  });

  // 警示图标脉冲
  const pulseOpacity = interpolate(
    frame,
    [20, 40, 60],
    [0.5, 1, 0.5],
    { extrapolateRight: "clamp" }
  );

  // 标题淡入
  const titleOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 文字逐条淡入
  const textOpacity = (delay: number) =>
    interpolate(frame, [40 + delay, 55 + delay], [0, 1], {
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill
      style={{
        position: "relative",
        fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
        overflow: "hidden",
      }}
    >
      {/* 背景图片 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: bgOpacity,
        }}
      >
        <Img
          src={staticFile("assets/img/ailearn/deepseek/ethical-dark-matter.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 暗色叠加层 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(13,17,23,0.7) 0%, rgba(22,27,34,0.8) 100%)",
          opacity: overlayOpacity,
        }}
      />

      {/* 内容区域 */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "60px",
          textAlign: "center",
        }}
      >
        {/* 警示图标 */}
        <div
          style={{
            fontSize: 80,
            marginBottom: 24,
            opacity: pulseOpacity,
          }}
        >
          ⚠️
        </div>

        {/* 标题 */}
        <h2
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: "#f778ba",
            marginBottom: 16,
            opacity: titleOpacity,
            textShadow: "0 0 40px rgba(247,120,186,0.5)",
          }}
        >
          伦理暗物质
        </h2>
        <p
          style={{
            fontSize: 28,
            color: "#c9d1d9",
            marginBottom: 48,
            opacity: titleOpacity,
          }}
        >
          大模型隐藏的安全隐患
        </p>

        {/* 说明文字 */}
        <div style={{ maxWidth: 800 }}>
          <p
            style={{
              fontSize: 26,
              color: "#c9d1d9",
              marginBottom: 20,
              lineHeight: 1.6,
              opacity: textOpacity(0),
            }}
          >
            最新研究发现：预训练时嵌入的
            <strong style={{ color: "#f778ba" }}>有害知识可能永久存留</strong>
          </p>
          <p
            style={{
              fontSize: 24,
              color: "#8b949e",
              marginBottom: 20,
              lineHeight: 1.6,
              opacity: textOpacity(10),
            }}
          >
            如果 R2 推理能力比 R1 强 10 倍，
            <br />
            安全风险也可能强 10 倍
          </p>
          <p
            style={{
              fontSize: 26,
              color: "#ffd200",
              fontWeight: 600,
              opacity: textOpacity(20),
            }}
          >
            延迟发布，也许是在做更深入的安全加固
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
