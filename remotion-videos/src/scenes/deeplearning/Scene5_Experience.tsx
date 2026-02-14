import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";

interface Scene5_ExperienceProps {}

export const Scene5_Experience: React.FC<Scene5_ExperienceProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // 标题动画效果
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 平台介绍动画效果
  const platformOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 交互功能动画效果
  const featuresOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 学习价值动画效果
  const valueOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1e3799" }}>
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
          fontSize: 64,
          fontWeight: "800",
          color: "#f6b93b",
          margin: 0,
          textShadow: "0 4px 8px rgba(0,0,0,0.6)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          体验深度模型：TensorFlow Playground
        </h2>
      </div>

      {/* 平台介绍 */}
      <div style={{
        position: "absolute",
        top: "18%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: platformOpacity,
        textAlign: "center",
        width: "80%",
        maxWidth: "1000px"
      }}>
        <p style={{
          fontSize: 28,
          fontWeight: "500",
          color: "#e0e0e0",
          lineHeight: 1.6,
          margin: "20px 0",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          TensorFlow Playground 是Google开发的交互式可视化工具，
          让你能够直观地理解神经网络的工作原理和参数调整的效果。
        </p>
      </div>

      {/* 平台特点 */}
      <div style={{
        position: "absolute",
        top: "28%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: platformOpacity,
        textAlign: "center",
        width: "90%",
        maxWidth: "1200px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "30px"
        }}>
          {/* 特点1: 交互式界面 */}
          <div style={{
            backgroundColor: "rgba(246, 185, 59, 0.15)",
            border: "2px solid #f6b93b",
            borderRadius: "15px",
            padding: "25px",
            width: "300px",
            textAlign: "center",
            boxShadow: "0 6px 12px rgba(0,0,0,0.3)"
          }}>
            <div style={{
              fontSize: 36,
              fontWeight: "700",
              color: "#f6b93b",
              marginBottom: "15px"
            }}>🎮</div>
            <h3 style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#f6b93b",
              margin: "10px 0"
            }}>交互式界面</h3>
            <p style={{
              fontSize: 20,
              color: "#e0e0e0",
              lineHeight: 1.5
            }}>
              实时调整参数，立即看到训练效果变化
            </p>
          </div>

          {/* 特点2: 可视化训练 */}
          <div style={{
            backgroundColor: "rgba(116, 185, 255, 0.15)",
            border: "2px solid #74b9ff",
            borderRadius: "15px",
            padding: "25px",
            width: "300px",
            textAlign: "center",
            boxShadow: "0 6px 12px rgba(0,0,0,0.3)"
          }}>
            <div style={{
              fontSize: 36,
              fontWeight: "700",
              color: "#74b9ff",
              marginBottom: "15px"
            }}>📊</div>
            <h3 style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#74b9ff",
              margin: "10px 0"
            }}>可视化训练</h3>
            <p style={{
              fontSize: 20,
              color: "#e0e0e0",
              lineHeight: 1.5
            }}>
              直观展示损失函数、准确率等训练指标
            </p>
          </div>

          {/* 特点3: 参数调整 */}
          <div style={{
            backgroundColor: "rgba(255, 118, 117, 0.15)",
            border: "2px solid #ff7675",
            borderRadius: "15px",
            padding: "25px",
            width: "300px",
            textAlign: "center",
            boxShadow: "0 6px 12px rgba(0,0,0,0.3)"
          }}>
            <div style={{
              fontSize: 36,
              fontWeight: "700",
              color: "#ff7675",
              marginBottom: "15px"
            }}>⚙️</div>
            <h3 style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#ff7675",
              margin: "10px 0"
            }}>参数调整</h3>
            <p style={{
              fontSize: 20,
              color: "#e0e0e0",
              lineHeight: 1.5
            }}>
              调整层数、神经元数量、学习率等关键参数
            </p>
          </div>
        </div>
      </div>

      {/* 可调整参数 */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: featuresOpacity,
        textAlign: "center",
        width: "90%",
        maxWidth: "1400px"
      }}>
        <h3 style={{
          fontSize: 36,
          fontWeight: "700",
          color: "#00b894",
          margin: "30px 0 20px 0",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          可调整的关键参数
        </h3>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          justifyContent: "center"
        }}>
          <div style={{
            backgroundColor: "rgba(0, 184, 148, 0.1)",
            border: "1px solid #00b894",
            borderRadius: "10px",
            padding: "15px"
          }}>
            <h4 style={{ color: "#00b894", margin: "0 0 10px 0" }}>网络结构</h4>
            <ul style={{ color: "#e0e0e0", fontSize: "18px", margin: 0, paddingLeft: "20px" }}>
              <li>隐藏层数量</li>
              <li>每层神经元数量</li>
              <li>激活函数类型</li>
            </ul>
          </div>
          
          <div style={{
            backgroundColor: "rgba(253, 203, 110, 0.1)",
            border: "1px solid #fdcb6e",
            borderRadius: "10px",
            padding: "15px"
          }}>
            <h4 style={{ color: "#fdcb6e", margin: "0 0 10px 0" }}>训练参数</h4>
            <ul style={{ color: "#e0e0e0", fontSize: "18px", margin: 0, paddingLeft: "20px" }}>
              <li>学习率大小</li>
              <li>正则化强度</li>
              <li>批次大小</li>
            </ul>
          </div>
          
          <div style={{
            backgroundColor: "rgba(123, 110, 246, 0.1)",
            border: "1px solid #7b6ef6",
            borderRadius: "10px",
            padding: "15px"
          }}>
            <h4 style={{ color: "#7b6ef6", margin: "0 0 10px 0" }}>数据特征</h4>
            <ul style={{ color: "#e0e0e0", fontSize: "18px", margin: 0, paddingLeft: "20px" }}>
              <li>输入特征选择</li>
              <li>数据噪声程度</li>
              <li>测试集比例</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 学习价值 */}
      <div style={{
        position: "absolute",
        top: "70%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: valueOpacity,
        textAlign: "center",
        width: "80%",
        maxWidth: "1000px"
      }}>
        <div style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
        }}>
          <h3 style={{
            fontSize: 32,
            fontWeight: "700",
            color: "#ff9ff3",
            margin: "0 0 15px 0",
            fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
          }}>
            体验价值
          </h3>
          <p style={{
            fontSize: 24,
            color: "#e0e0e0",
            lineHeight: 1.6,
            margin: 0
          }}>
            通过亲手调整参数，你可以直观理解深度学习模型的训练过程，
            感受不同参数对模型性能的影响，从而建立对神经网络工作原理的深刻理解。
          </p>
          
          <div style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "rgba(246, 185, 59, 0.1)",
            borderRadius: "8px",
            border: "1px solid rgba(246, 185, 59, 0.3)"
          }}>
            <p style={{
              fontSize: 22,
              color: "#f6b93b",
              fontWeight: "600",
              margin: 0
            }}>
              🔗 访问地址: https://playground.tensorflow.org/
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};