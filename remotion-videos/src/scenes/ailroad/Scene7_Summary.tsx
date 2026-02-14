import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const Scene7_Summary: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 总结要点
  const summaryItems = [
    { icon: "📚", title: "前置知识", desc: "角色定位、基础术语", color: "#22d3ee" },
    { icon: "🚀", title: "入门能力", desc: "预训练模型、开发框架", color: "#10b981" },
    { icon: "⚡", title: "进阶能力", desc: "开源模型、AI安全", color: "#f59e0b" },
    { icon: "🎯", title: "高级能力", desc: "RAG、AI Agent、多模态", color: "#ec4899" },
  ];

  const itemOpacities = summaryItems.map((_, index) => 
    interpolate(frame, [30 + index * 25, 60 + index * 25], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    })
  );

  const referenceOpacity = interpolate(frame, [140, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      {/* 标题 */}
      <div style={{
        position: "absolute",
        top: "8%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: titleOpacity,
        textAlign: "center",
        width: "90%"
      }}>
        <h1 style={{
          fontSize: 60,
          fontWeight: "800",
          color: "#0891b2",
          margin: 0,
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          总结
        </h1>
      </div>

      {/* 总结卡片 */}
      <div style={{
        position: "absolute",
        top: "22%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "1000px"
      }}>
        {summaryItems.map((item, index) => (
          <div key={index} style={{
            opacity: itemOpacities[index],
            display: "flex",
            alignItems: "center",
            backgroundColor: `${item.color}08`,
            borderRadius: 16,
            padding: 20,
            marginBottom: 15,
            borderLeft: `4px solid ${item.color}`
          }}>
            <span style={{ fontSize: 40, marginRight: 20 }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: 26,
                fontWeight: "700",
                color: item.color,
                margin: "0 0 5px 0"
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: 20,
                color: "#4b5563",
                margin: 0
              }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 参考资料 */}
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: referenceOpacity,
        textAlign: "center",
        width: "80%"
      }}>
        <div style={{
          backgroundColor: "rgba(99, 102, 241, 0.08)",
          borderRadius: 16,
          padding: 20
        }}>
          <p style={{
            fontSize: 22,
            color: "#374151",
            margin: "0 0 10px 0",
            fontWeight: "600"
          }}>
            📖 参考资料
          </p>
          <p style={{
            fontSize: 20,
            color: "#4f46e5",
            margin: 0
          }}>
            roadmap.sh/ai-engineer
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
