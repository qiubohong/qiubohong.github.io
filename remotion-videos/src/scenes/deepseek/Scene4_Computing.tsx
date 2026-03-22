import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile } from "remotion";

export const Scene4_Computing: React.FC = () => {
  const frame = useCurrentFrame();

  // 图片淡入 + 微缩放
  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const imageScale = interpolate(frame, [0, 60], [1, 1.05], {
    extrapolateRight: "clamp",
  });

  // 标题淡入
  const titleOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 数据卡片错位弹入
  const cardOpacity = (delay: number) =>
    interpolate(frame, [25 + delay, 40 + delay], [0, 1], {
      extrapolateRight: "clamp",
    });

  const cardTranslate = (delay: number) =>
    interpolate(frame, [25 + delay, 40 + delay], [20, 0], {
      extrapolateRight: "clamp",
    });

  // 结论文字淡入
  const conclusionOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
        display: "flex",
        flexDirection: "column",
        fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
        position: "relative",
      }}
    >
      {/* 图片区域 (占 65%) */}
      <div
        style={{
          height: "65%",
          overflow: "hidden",
          position: "relative",
          opacity: imageOpacity,
        }}
      >
        <Img
          src={staticFile("assets/img/ailearn/deepseek/computing-power.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imageScale})`,
          }}
        />
        {/* 渐变遮罩 */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: "linear-gradient(to top, #161b22, transparent)",
          }}
        />
      </div>

      {/* 文字区域 (占 35%) */}
      <div
        style={{
          height: "35%",
          background: "linear-gradient(to top, #0d1117, #161b22)",
          padding: "24px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* 标题 */}
        <h2
          style={{
            fontSize: 32,
            color: "#3fb950",
            fontWeight: "bold",
            marginBottom: 20,
            opacity: titleOpacity,
          }}
        >
          国产算力生态破局
        </h2>

        {/* 数据卡片 */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 20,
          }}
        >
          {[
            { value: "8192", unit: "张卡", desc: "华为昇腾集群" },
            { value: "8E", unit: "FLOPS", desc: "总算力规模" },
            { value: "1/50", unit: "成本", desc: "相比对手" },
          ].map((card, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                background: "rgba(63,185,80,0.1)",
                borderRadius: 12,
                padding: "16px",
                border: "1px solid rgba(63,185,80,0.2)",
                opacity: cardOpacity(index * 6),
                transform: `translateY(${cardTranslate(index * 6)}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: "#3fb950",
                  marginBottom: 4,
                }}
              >
                {card.value}
                <span style={{ fontSize: 16, marginLeft: 4 }}>{card.unit}</span>
              </div>
              <div style={{ fontSize: 14, color: "#8b949e" }}>{card.desc}</div>
            </div>
          ))}
        </div>

        {/* 结论 */}
        <p
          style={{
            fontSize: 22,
            color: "#c9d1d9",
            opacity: conclusionOpacity,
            margin: 0,
          }}
        >
          <strong style={{ color: "#ffd200" }}>
            首次完全跑在国产芯片上，彻底摆脱英伟达依赖！
          </strong>
        </p>
      </div>
    </AbsoluteFill>
  );
};
