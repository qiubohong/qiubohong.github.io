import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile } from "remotion";

export const Scene2_Background: React.FC = () => {
  const frame = useCurrentFrame();

  // 标题淡入
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 列表项逐个弹入
  const itemOpacity = (delay: number) =>
    interpolate(frame, [10 + delay, 25 + delay], [0, 1], {
      extrapolateRight: "clamp",
    });

  const itemTranslate = (delay: number) =>
    interpolate(frame, [10 + delay, 25 + delay], [30, 0], {
      extrapolateRight: "clamp",
    });

  // 图片淡入
  const imageOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 结论高亮
  const conclusionOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: "clamp",
  });

  const conclusionPulse = interpolate(
    frame,
    [70, 90],
    [0.8, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "60px",
        fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
      }}
    >
      {/* 左侧文字区 */}
      <div style={{ flex: 1, paddingRight: 40 }}>
        <h2
          style={{
            fontSize: 36,
            color: "#58a6ff",
            fontWeight: "bold",
            marginBottom: 32,
            opacity: titleOpacity,
          }}
        >
          模型关系解析
        </h2>

        {/* 模型列表 */}
        <div style={{ marginBottom: 32 }}>
          {[
            { name: "DeepSeek-V3", desc: "基座模型", color: "#c9d1d9" },
            { name: "DeepSeek-R1", desc: "基于 V3 的推理模型", color: "#79c0ff" },
            { name: "DeepSeek-V4", desc: "下一代基座（多模态）", color: "#c9d1d9" },
            { name: "DeepSeek-R2", desc: "基于 V4 的推理模型", color: "#79c0ff" },
          ].map((item, index) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                opacity: itemOpacity(index * 8),
                transform: `translateX(${itemTranslate(index * 8)}px)`,
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: item.color,
                  marginRight: 16,
                  minWidth: 180,
                }}
              >
                {item.name}
              </span>
              <span style={{ fontSize: 24, color: "#8b949e" }}>{item.desc}</span>
            </div>
          ))}
        </div>

        {/* 核心结论 */}
        <div
          style={{
            background: "rgba(240,136,62,0.15)",
            borderRadius: 12,
            padding: "20px 24px",
            border: "1px solid rgba(240,136,62,0.3)",
            opacity: conclusionOpacity,
            transform: `scale(${conclusionPulse})`,
          }}
        >
          <p
            style={{
              fontSize: 28,
              color: "#f0883e",
              fontWeight: "bold",
              margin: 0,
              textAlign: "center",
            }}
          >
            ⚡ 核心逻辑：V4 不出，R2 就出不来！
          </p>
        </div>
      </div>

      {/* 右侧图片区 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: imageOpacity,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: 16,
            padding: 20,
            backdropFilter: "blur(10px)",
          }}
        >
          <Img
            src={staticFile("assets/img/ailearn/deepseek/model-architecture.png")}
            style={{
              maxWidth: 480,
              maxHeight: 480,
              borderRadius: 12,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
