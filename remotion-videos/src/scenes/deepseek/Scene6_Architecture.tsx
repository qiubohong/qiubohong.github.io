import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene6_Architecture: React.FC = () => {
  const frame = useCurrentFrame();

  // 左侧旧架构淡入
  const oldOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 中央箭头流动
  const arrowProgress = interpolate(frame, [15, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 右侧新架构淡入
  const newOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 新架构滑入
  const newTranslate = interpolate(frame, [35, 55], [50, 0], {
    extrapolateRight: "clamp",
  });

  // 标签弹入
  const labelOpacity = interpolate(frame, [55, 70], [0, 1], {
    extrapolateRight: "clamp",
  });

  const labelScale = interpolate(frame, [55, 70], [0.8, 1], {
    extrapolateRight: "clamp",
  });

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
      {/* 左侧：传统路线（旧架构） */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: oldOpacity,
          filter: "grayscale(0.5)",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            background: "rgba(139,148,158,0.2)",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            border: "2px solid rgba(139,148,158,0.3)",
          }}
        >
          <span style={{ fontSize: 48 }}>📚</span>
        </div>
        <h3
          style={{
            fontSize: 28,
            color: "#8b949e",
            marginBottom: 16,
          }}
        >
          参数堆叠
        </h3>
        <p
          style={{
            fontSize: 18,
            color: "#8b949e",
            textAlign: "center",
            maxWidth: 280,
          }}
        >
          GPT-5 性能不及预期
          <br />
          此路线已到极限
        </p>
      </div>

      {/* 中央：箭头连接 */}
      <div
        style={{
          width: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="80" height="40" viewBox="0 0 80 40">
          <defs>
            <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b949e" stopOpacity={arrowProgress > 0.5 ? 0.5 : arrowProgress} />
              <stop offset="100%" stopColor="#58a6ff" stopOpacity={arrowProgress} />
            </linearGradient>
          </defs>
          <path
            d="M 10 20 L 60 20 L 55 15 M 60 20 L 55 25"
            stroke="url(#arrowGrad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 右侧：下一代架构 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: newOpacity,
          transform: `translateX(${newTranslate}px)`,
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            background: "rgba(88,166,255,0.2)",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            border: "2px solid rgba(88,166,255,0.5)",
            boxShadow: "0 0 40px rgba(88,166,255,0.3)",
          }}
        >
          <span style={{ fontSize: 56 }}>🧠</span>
        </div>
        <h3
          style={{
            fontSize: 32,
            color: "#58a6ff",
            fontWeight: "bold",
            marginBottom: 16,
          }}
        >
          架构创新
        </h3>
        <p
          style={{
            fontSize: 20,
            color: "#c9d1d9",
            textAlign: "center",
            maxWidth: 300,
            lineHeight: 1.6,
          }}
        >
          mHC 记忆机制
          <br />
          Conditional Memory
          <br />
          解决 Transformer 记忆瓶颈
        </p>

        {/* 标签 */}
        <div
          style={{
            marginTop: 24,
            background: "linear-gradient(45deg, #f0883e, #ffd200)",
            borderRadius: 20,
            padding: "10px 24px",
            opacity: labelOpacity,
            transform: `scale(${labelScale})`,
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#0d1117",
            }}
          >
            DeepSeek 在憋大招！
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
