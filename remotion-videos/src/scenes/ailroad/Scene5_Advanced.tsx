import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const Scene5_Advanced: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 高级技能卡片
  const skills = [
    {
      icon: "📊",
      title: "Embeddings嵌入",
      items: ["语义搜索", "数据分类", "推荐系统"],
      color: "#ec4899"
    },
    {
      icon: "🗄️",
      title: "向量数据库",
      items: ["Chroma", "Pinecone", "FAISS"],
      color: "#06b6d4"
    },
    {
      icon: "🔍",
      title: "RAG技术",
      items: ["检索增强生成", "知识库问答", "实时数据"],
      color: "#84cc16"
    },
    {
      icon: "🤖",
      title: "AI Agent",
      items: ["智能客服", "工作流自动化", "个人助手"],
      color: "#f97316"
    },
  ];

  const cardOpacities = skills.map((_, index) => 
    interpolate(frame, [30 + index * 20, 60 + index * 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    })
  );

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
          color: "#db2777",
          margin: 0,
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          高级能力
        </h1>
        <p style={{ fontSize: 26, color: "#6b7280", marginTop: 8 }}>
          RAG、AI Agent与多模态AI
        </p>
      </div>

      {/* 技能卡片网格 */}
      <div style={{
        position: "absolute",
        top: "25%",
        left: "5%",
        width: "90%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 25
      }}>
        {skills.map((skill, index) => (
          <div key={index} style={{
            opacity: cardOpacities[index],
            backgroundColor: `${skill.color}08`,
            borderRadius: 20,
            padding: 25,
            borderLeft: `4px solid ${skill.color}`
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
              <span style={{ fontSize: 40, marginRight: 15 }}>{skill.icon}</span>
              <h3 style={{
                fontSize: 28,
                fontWeight: "700",
                color: skill.color,
                margin: 0
              }}>
                {skill.title}
              </h3>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {skill.items.map((item, i) => (
                <span key={i} style={{
                  backgroundColor: `${skill.color}15`,
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 16,
                  color: "#374151"
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 多模态AI */}
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        textAlign: "center",
        width: "80%"
      }}>
        <div style={{
          backgroundColor: "rgba(139, 92, 246, 0.08)",
          borderRadius: 20,
          padding: 25,
          display: "flex",
          justifyContent: "center",
          gap: 40
        }}>
          <span style={{ fontSize: 24, color: "#7c3aed" }}>🖼️ 图像理解生成</span>
          <span style={{ fontSize: 24, color: "#7c3aed" }}>🎬 视频处理</span>
          <span style={{ fontSize: 24, color: "#7c3aed" }}>🎤 语音转换</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
