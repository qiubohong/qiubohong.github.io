import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene3_SweetSpot: React.FC = () => {
  const frame = useCurrentFrame();

  // 标题淡入
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 图表区域淡入
  const chartOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 结论文字淡入
  const conclusionOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 曲线绘制动画 - 使用 SVG stroke-dasharray
  const curveProgress = interpolate(frame, [25, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 甜点区脉冲高亮
  const sweetSpotPulse = interpolate(
    frame,
    [50, 70, 90],
    [0.5, 1, 0.5],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px",
        fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
      }}
    >
      {/* 标题 */}
      <h2
        style={{
          fontSize: 40,
          color: "#f0883e",
          fontWeight: "bold",
          marginBottom: 24,
          opacity: titleOpacity,
        }}
      >
        为什么 V4 没准备好？
      </h2>

      {/* 图表区域 */}
      <div
        style={{
          width: "100%",
          maxWidth: 800,
          height: 400,
          background: "rgba(255,255,255,0.03)",
          borderRadius: 16,
          padding: 40,
          marginBottom: 32,
          opacity: chartOpacity,
        }}
      >
        <svg viewBox="0 0 720 320" style={{ width: "100%", height: "100%" }}>
          {/* 坐标轴 */}
          <line
            x1="60"
            y1="280"
            x2="680"
            y2="280"
            stroke="#8b949e"
            strokeWidth="2"
          />
          <line
            x1="60"
            y1="280"
            x2="60"
            y2="20"
            stroke="#8b949e"
            strokeWidth="2"
          />

          {/* X轴标签 */}
          <text x="360" y="315" fill="#8b949e" fontSize="20" textAnchor="middle">
            思维链长度
          </text>

          {/* Y轴标签 */}
          <text
            x="20"
            y="150"
            fill="#8b949e"
            fontSize="20"
            textAnchor="middle"
            transform="rotate(-90, 20, 150)"
          >
            推理性能
          </text>

          {/* 抛物线路径 - 推理甜点区 */}
          <path
            d="M 100 240 Q 360 40 620 220"
            fill="none"
            stroke="#f0883e"
            strokeWidth="4"
            strokeDasharray="800"
            strokeDashoffset={800 * (1 - curveProgress)}
            strokeLinecap="round"
          />

          {/* 甜点区标注 */}
          <circle
            cx="360"
            cy="40"
            r="15"
            fill="#f0883e"
            opacity={sweetSpotPulse}
          />
          <circle cx="360" cy="40" r="25" fill="none" stroke="#f0883e" strokeWidth="2" opacity={sweetSpotPulse * 0.5} />

          {/* 甜点区文字 */}
          <text
            x="360"
            y="80"
            fill="#f0883e"
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
            opacity={conclusionOpacity}
          >
            甜点区
          </text>

          {/* 箭头标注 */}
          <text x="150" y="200" fill="#8b949e" fontSize="16" opacity={0.7}>
            过短
          </text>
          <text x="550" y="200" fill="#8b949e" fontSize="16" opacity={0.7}>
            过长
          </text>
        </svg>
      </div>

      {/* 结论文字 */}
      <div
        style={{
          textAlign: "center",
          opacity: conclusionOpacity,
          maxWidth: 800,
        }}
      >
        <p
          style={{
            fontSize: 28,
            color: "#c9d1d9",
            lineHeight: 1.6,
            marginBottom: 16,
          }}
        >
          魁北克研究所发现：R1 存在<strong style={{ color: "#f0883e" }}>推理甜点区</strong>
        </p>
        <p style={{ fontSize: 24, color: "#8b949e" }}>
          思维链太长反而性能下降！延迟发布可能是为了攻克：如何让模型知道该何时停止思考
        </p>
      </div>
    </AbsoluteFill>
  );
};
