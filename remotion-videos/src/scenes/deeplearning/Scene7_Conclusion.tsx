import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";

interface Scene7_ConclusionProps {}

export const Scene7_Conclusion: React.FC<Scene7_ConclusionProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // 标题动画效果
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 核心要点动画效果
  const keyPointsOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 结束语动画效果
  const conclusionOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e" }}>
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
        <h2 style={{
          fontSize: 68,
          fontWeight: "800",
          color: "#ff7675",
          margin: 0,
          textShadow: "0 6px 12px rgba(0,0,0,0.6)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          深度学习总结
        </h2>
        <p style={{
          fontSize: 28,
          fontWeight: "500",
          color: "#74b9ff",
          margin: "15px 0 0 0",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          掌握AI时代的核心技术
        </p>
      </div>

      {/* 核心要点 - 3个要点横向排列 */}
      <div style={{
        position: "absolute",
        top: "28%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: keyPointsOpacity,
        textAlign: "center",
        width: "85%",
        maxWidth: "1500px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "nowrap"
        }}>
          {/* 要点1: 定义 */}
          <div style={{
            flex: "1",
            maxWidth: "400px",
            backgroundColor: "rgba(116, 185, 255, 0.15)",
            border: "2px solid #74b9ff",
            borderRadius: "20px",
            padding: "30px 25px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)"
          }}>
            <div style={{ fontSize: 48, marginBottom: "15px" }}>🧠</div>
            <h4 style={{
              fontSize: 32,
              fontWeight: "700",
              color: "#74b9ff",
              margin: "0 0 15px 0"
            }}>核心定义</h4>
            <p style={{
              fontSize: 22,
              color: "#e0e0e0",
              lineHeight: 1.5,
              margin: 0
            }}>
              基于层次化特征学习的机器学习方法，通过多层神经网络自动学习数据特征
            </p>
          </div>

          {/* 要点2: 优势 */}
          <div style={{
            flex: "1",
            maxWidth: "400px",
            backgroundColor: "rgba(255, 118, 117, 0.15)",
            border: "2px solid #ff7675",
            borderRadius: "20px",
            padding: "30px 25px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)"
          }}>
            <div style={{ fontSize: 48, marginBottom: "15px" }}>🚀</div>
            <h4 style={{
              fontSize: 32,
              fontWeight: "700",
              color: "#ff7675",
              margin: "0 0 15px 0"
            }}>核心优势</h4>
            <p style={{
              fontSize: 22,
              color: "#e0e0e0",
              lineHeight: 1.5,
              margin: 0
            }}>
              自动特征学习、处理非结构化数据、在大规模数据上表现优异
            </p>
          </div>

          {/* 要点3: 应用 */}
          <div style={{
            flex: "1",
            maxWidth: "400px",
            backgroundColor: "rgba(0, 184, 148, 0.15)",
            border: "2px solid #00b894",
            borderRadius: "20px",
            padding: "30px 25px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)"
          }}>
            <div style={{ fontSize: 48, marginBottom: "15px" }}>💡</div>
            <h4 style={{
              fontSize: 32,
              fontWeight: "700",
              color: "#00b894",
              margin: "0 0 15px 0"
            }}>典型应用</h4>
            <p style={{
              fontSize: 22,
              color: "#e0e0e0",
              lineHeight: 1.5,
              margin: 0
            }}>
              人脸识别、自然语言处理、图像生成、自动驾驶、医疗诊断
            </p>
          </div>
        </div>
      </div>

      {/* 结束语 */}
      <div style={{
        position: "absolute",
        top: "68%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: conclusionOpacity,
        textAlign: "center",
        width: "80%",
        maxWidth: "1000px"
      }}>
        <div style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "24px",
          padding: "40px 50px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.4)"
        }}>
          <p style={{
            fontSize: 32,
            fontWeight: "600",
            color: "#fdcb6e",
            lineHeight: 1.6,
            margin: "0 0 25px 0",
            fontStyle: "italic"
          }}>
            "深度学习不是单个算法，而是通过层次化特征学习逼近人类智能的工程技术体系。"
          </p>
          
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px"
          }}>
            <div style={{
              fontSize: 26,
              fontWeight: "700",
              color: "#74b9ff"
            }}>
              做一个有温度和有干货的技术分享作者
            </div>
            <div style={{
              fontSize: 24,
              fontWeight: "600",
              color: "#ff7675"
            }}>
              —— Qborfy
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};