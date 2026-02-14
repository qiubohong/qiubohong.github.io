import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const Scene2_Prerequisites: React.FC = () => {
  const frame = useCurrentFrame();

  // 标题动画
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 知识点逐个显示
  const items = [
    { icon: "👤", text: "了解AI工程师角色定位", delay: 30 },
    { icon: "📚", text: "掌握基础术语：LLM、Embeddings、向量数据库", delay: 60 },
    { icon: "🤖", text: "了解RAG技术和AI Agent智能体", delay: 90 },
    { icon: "✍️", text: "学习Prompt提示语工程", delay: 120 },
    { icon: "💻", text: "具备基础编程技能", delay: 150 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      {/* 标题 */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: titleOpacity,
        textAlign: "center",
        width: "90%"
      }}>
        <h1 style={{
          fontSize: 64,
          fontWeight: "800",
          color: "#0891b2",
          margin: 0,
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          前置知识
        </h1>
        <p style={{
          fontSize: 28,
          color: "#6b7280",
          marginTop: 10
        }}>
          成为AI工程师的第一步
        </p>
      </div>

      {/* 知识点列表 */}
      <div style={{
        position: "absolute",
        top: "28%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "85%",
        maxWidth: "1100px"
      }}>
        {items.map((item, index) => {
          const itemOpacity = interpolate(
            frame, 
            [item.delay, item.delay + 30], 
            [0, 1], 
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const itemTranslateX = interpolate(
            frame,
            [item.delay, item.delay + 30],
            [-50, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={index}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${itemTranslateX}px)`,
                marginBottom: 25,
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(99, 102, 241, 0.08)",
                padding: "20px 30px",
                borderRadius: 16,
                borderLeft: "4px solid #4f46e5"
              }}
            >
              <span style={{ fontSize: 36, marginRight: 20 }}>{item.icon}</span>
              <p style={{
                fontSize: 28,
                fontWeight: "500",
                color: "#374151",
                margin: 0,
                fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
              }}>
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
