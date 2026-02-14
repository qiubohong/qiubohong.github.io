import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const Scene3_Beginner: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 模型分类
  const models = [
    { name: "OpenAI", items: ["GPT系列", "DALL-E", "Whisper"], color: "#10b981" },
    { name: "国内模型", items: ["DeepSeek", "智谱", "文心一言", "豆包"], color: "#f59e0b" },
    { name: "国外模型", items: ["Claude", "Gemini", "Hugging Face"], color: "#8b5cf6" },
  ];

  // 框架列表
  const frameworks = [
    { name: "Langchain", desc: "AI应用开发框架" },
    { name: "LangGraph", desc: "工作流编排" },
    { name: "CrewAI", desc: "多Agent协作" },
  ];

  const section1Opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const section2Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
          color: "#059669",
          margin: 0,
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          入门能力
        </h1>
        <p style={{ fontSize: 26, color: "#6b7280", marginTop: 8 }}>
          掌握预训练模型与开发框架
        </p>
      </div>

      {/* 预训练模型 */}
      <div style={{
        position: "absolute",
        top: "22%",
        left: "5%",
        width: "55%",
        opacity: section1Opacity
      }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: "700",
          color: "#1f2937",
          marginBottom: 20,
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          🤖 主流预训练模型
        </h2>
        
        <div style={{ display: "flex", gap: 20 }}>
          {models.map((model, index) => (
            <div key={index} style={{
              backgroundColor: "rgba(0,0,0,0.04)",
              borderRadius: 12,
              padding: 15,
              flex: 1,
              borderLeft: `3px solid ${model.color}`
            }}>
              <h3 style={{
                fontSize: 20,
                fontWeight: "600",
                color: model.color,
                marginBottom: 10,
                margin: "0 0 10px 0"
              }}>
                {model.name}
              </h3>
              {model.items.map((item, i) => (
                <p key={i} style={{
                  fontSize: 16,
                  color: "#4b5563",
                  margin: "5px 0"
                }}>
                  • {item}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 开发框架 */}
      <div style={{
        position: "absolute",
        top: "60%",
        left: "5%",
        width: "90%",
        opacity: section2Opacity
      }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: "700",
          color: "#1f2937",
          marginBottom: 20,
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          🛠️ 主流开发框架
        </h2>
        
        <div style={{ display: "flex", gap: 25 }}>
          {frameworks.map((fw, index) => (
            <div key={index} style={{
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              borderRadius: 16,
              padding: "20px 30px",
              flex: 1,
              textAlign: "center"
            }}>
              <h3 style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#059669",
                margin: "0 0 10px 0"
              }}>
                {fw.name}
              </h3>
              <p style={{
                fontSize: 18,
                color: "#4b5563",
                margin: 0
              }}>
                {fw.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
