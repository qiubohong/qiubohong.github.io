import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile } from "remotion";

export const Scene7_Ending: React.FC = () => {
  const frame = useCurrentFrame();

  // 背景图缓慢缩放
  const bgScale = interpolate(frame, [0, 120], [1, 1.1], {
    extrapolateRight: "clamp",
  });

  // 叠加层渐变
  const overlayOpacity = interpolate(frame, [0, 20], [0, 0.4], {
    extrapolateRight: "clamp",
  });

  // 引言淡入
  const introOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 核心问题淡入
  const questionOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  const questionScale = interpolate(frame, [30, 50], [0.9, 1], {
    extrapolateRight: "clamp",
  });

  // 诗意递进逐行显示
  const poeticOpacity = (delay: number) =>
    interpolate(frame, [50 + delay, 65 + delay], [0, 1], {
      extrapolateRight: "clamp",
    });

  // 结尾高亮
  const finalOpacity = interpolate(frame, [85, 100], [0, 1], {
    extrapolateRight: "clamp",
  });

  const finalGlow = interpolate(
    frame,
    [100, 120],
    [0.8, 1.2],
    { extrapolateRight: "clamp" }
  );

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
          transform: `scale(${bgScale})`,
        }}
      >
        <Img
          src={staticFile("assets/img/ailearn/deepseek/future-outlook.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 叠加层 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(13,17,23,0.5) 0%, rgba(13,17,23,0.7) 100%)",
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
          padding: "80px",
          textAlign: "center",
        }}
      >
        {/* 引言 */}
        <p
          style={{
            fontSize: 24,
            color: "#8b949e",
            fontStyle: "italic",
            marginBottom: 32,
            opacity: introOpacity,
          }}
        >
          当我们在追问"为什么还不发"...
        </p>

        {/* 核心问题 */}
        <h2
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "#58a6ff",
            marginBottom: 48,
            maxWidth: 800,
            lineHeight: 1.5,
            opacity: questionOpacity,
            transform: `scale(${questionScale})`,
          }}
        >
          什么样的模型，配得上这个时代的期待？
        </h2>

        {/* 诗意递进 */}
        <div style={{ marginBottom: 48 }}>
          {[
            { text: "参数更大？", delay: 0 },
            { text: "推理更长？", delay: 10 },
            { text: "还是——真正自主可控、真正安全可靠？", delay: 20, highlight: true },
          ].map((item, index) => (
            <p
              key={index}
              style={{
                fontSize: item.highlight ? 28 : 24,
                color: item.highlight ? "#ffd200" : "#c9d1d9",
                fontWeight: item.highlight ? 600 : 400,
                marginBottom: 12,
                opacity: poeticOpacity(item.delay),
              }}
            >
              {item.text}
            </p>
          ))}
        </div>

        {/* 结尾金句 */}
        <div
          style={{
            padding: "20px 48px",
            background: "rgba(255,210,0,0.15)",
            borderRadius: 16,
            border: `2px solid rgba(255,210,0,${0.3 * finalGlow})`,
            boxShadow: `0 0 ${40 * finalGlow}px rgba(255,210,0,0.3)`,
            opacity: finalOpacity,
          }}
        >
          <p
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: "#ffd200",
              margin: 0,
              textShadow: `0 0 ${20 * finalGlow}px rgba(255,210,0,0.8)`,
            }}
          >
            好的东西，值得等待。
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
