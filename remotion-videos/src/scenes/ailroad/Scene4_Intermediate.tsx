import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const Scene4_Intermediate: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 开源模型
  const openModels = [
    { name: "DeepSeek R1/V3", desc: "国产顶尖开源模型" },
    { name: "Meta Llama", desc: "Meta开源模型系列" },
    { name: "阿里 Qwen", desc: "阿里通义千问" },
    { name: "Google Gemma", desc: "Google轻量开源模型" },
  ];

  // 安全问题
  const securityItems = [
    { icon: "⚠️", text: "注入攻击" },
    { icon: "🔒", text: "隐私保护" },
    { icon: "⚖️", text: "偏见与公平" },
    { icon: "🛡️", text: "Moderation API" },
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
          color: "#d97706",
          margin: 0,
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          进阶能力
        </h1>
        <p style={{ fontSize: 26, color: "#6b7280", marginTop: 8 }}>
          开源模型部署与AI安全
        </p>
      </div>

      {/* 开源模型 */}
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
          🌐 优秀开源大模型
        </h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
          {openModels.map((model, index) => (
            <div key={index} style={{
              backgroundColor: "rgba(245, 158, 11, 0.08)",
              borderRadius: 12,
              padding: 15,
              borderLeft: "3px solid #d97706"
            }}>
              <h3 style={{
                fontSize: 22,
                fontWeight: "600",
                color: "#d97706",
                marginBottom: 5,
                margin: "0 0 5px 0"
              }}>
                {model.name}
              </h3>
              <p style={{
                fontSize: 16,
                color: "#4b5563",
                margin: 0
              }}>
                {model.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 部署平台 */}
      <div style={{
        position: "absolute",
        top: "22%",
        right: "5%",
        width: "30%",
        opacity: section1Opacity
      }}>
        <h2 style={{
          fontSize: 28,
          fontWeight: "700",
          color: "#1f2937",
          marginBottom: 15
        }}>
          🚀 部署平台
        </h2>
        <div style={{
          backgroundColor: "rgba(139, 92, 246, 0.08)",
          borderRadius: 12,
          padding: 20
        }}>
          <p style={{ fontSize: 20, color: "#7c3aed", margin: "0 0 10px 0", fontWeight: "600" }}>
            Hugging Face
          </p>
          <p style={{ fontSize: 16, color: "#4b5563", margin: "0 0 15px 0" }}>
            模型仓库与推理API
          </p>
          <p style={{ fontSize: 20, color: "#7c3aed", margin: "0 0 10px 0", fontWeight: "600" }}>
            Ollama
          </p>
          <p style={{ fontSize: 16, color: "#4b5563", margin: 0 }}>
            本地模型运行工具
          </p>
        </div>
      </div>

      {/* AI安全 */}
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
          🔐 AI安全与防护
        </h2>
        
        <div style={{ display: "flex", gap: 20 }}>
          {securityItems.map((item, index) => (
            <div key={index} style={{
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              borderRadius: 16,
              padding: "20px 25px",
              flex: 1,
              textAlign: "center",
              border: "1px solid rgba(239, 68, 68, 0.2)"
            }}>
              <span style={{ fontSize: 36, display: "block", marginBottom: 10 }}>{item.icon}</span>
              <p style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#dc2626",
                margin: 0
              }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
