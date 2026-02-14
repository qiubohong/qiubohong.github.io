import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const Scene6_Career: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 发展路线
  const careerPaths = [
    {
      icon: "✍️",
      title: "Prompt Engineer",
      desc: "提示语工程师",
      detail: "精通AI提示语设计与优化",
      color: "#a855f7"
    },
    {
      icon: "🤖",
      title: "AI Agent Engineer",
      desc: "智能体开发工程师",
      detail: "构建自主AI系统与工作流",
      color: "#3b82f6"
    },
    {
      icon: "🎓",
      title: "AI Expert",
      desc: "AI领域专家",
      detail: "深耕AI算法与研究前沿",
      color: "#22c55e"
    },
  ];

  const pathOpacities = careerPaths.map((_, index) => 
    interpolate(frame, [40 + index * 30, 70 + index * 30], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    })
  );

  const pathScales = careerPaths.map((_, index) =>
    interpolate(frame, [40 + index * 30, 70 + index * 30], [0.9, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    })
  );

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
          fontSize: 60,
          fontWeight: "800",
          color: "#9333ea",
          margin: 0,
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          后续发展路线
        </h1>
        <p style={{ fontSize: 26, color: "#6b7280", marginTop: 8 }}>
          选择你的AI职业方向
        </p>
      </div>

      {/* 职业路线卡片 */}
      <div style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "1200px",
        display: "flex",
        justifyContent: "center",
        gap: 30
      }}>
        {careerPaths.map((path, index) => (
          <div key={index} style={{
            opacity: pathOpacities[index],
            transform: `scale(${pathScales[index]})`,
            backgroundColor: `${path.color}08`,
            borderRadius: 24,
            padding: 30,
            flex: 1,
            maxWidth: 350,
            textAlign: "center",
            border: `2px solid ${path.color}30`
          }}>
            <span style={{ fontSize: 64, display: "block", marginBottom: 15 }}>{path.icon}</span>
            <h2 style={{
              fontSize: 28,
              fontWeight: "700",
              color: path.color,
              margin: "0 0 10px 0"
            }}>
              {path.title}
            </h2>
            <p style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#1f2937",
              margin: "0 0 15px 0"
            }}>
              {path.desc}
            </p>
            <p style={{
              fontSize: 16,
              color: "#4b5563",
              margin: 0
            }}>
              {path.detail}
            </p>
          </div>
        ))}
      </div>

      {/* 底部提示 */}
      <div style={{
        position: "absolute",
        bottom: "12%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        textAlign: "center"
      }}>
        <p style={{
          fontSize: 24,
          color: "#6b7280",
          margin: 0,
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          📍 每条路线都有完整的学习路径等待你探索
        </p>
      </div>
    </AbsoluteFill>
  );
};
