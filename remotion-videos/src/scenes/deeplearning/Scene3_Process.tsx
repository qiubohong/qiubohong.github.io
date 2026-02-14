import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";

interface Scene3_ProcessProps {}

export const Scene3_Process: React.FC<Scene3_ProcessProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // 标题动画效果
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 流程图动画效果
  const flowOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 技术细节动画效果
  const techOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 关键算法动画效果
  const algorithmOpacity = interpolate(frame, [90, 120], [0, 1], {
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
          fontSize: 60,
          fontWeight: "800",
          color: "#74b9ff",
          margin: 0,
          textShadow: "0 4px 8px rgba(0,0,0,0.6)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          深度学习的步骤和原理
        </h2>
      </div>

      {/* 流程图标题 */}
      <div style={{
        position: "absolute",
        top: "18%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: flowOpacity,
        textAlign: "center",
        width: "90%"
      }}>
        <h3 style={{
          fontSize: 36,
          fontWeight: "700",
          color: "#fdcb6e",
          margin: "10px 0 20px 0",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          深度学习流程示意图
        </h3>
      </div>

      {/* 流程图步骤 */}
      <div style={{
        position: "absolute",
        top: "25%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: flowOpacity,
        textAlign: "center",
        width: "90%",
        maxWidth: "1400px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap"
        }}>
          {/* 步骤1: 海量数据 */}
          <div style={{
            backgroundColor: "rgba(116, 185, 255, 0.2)",
            border: "2px solid #74b9ff",
            borderRadius: "15px",
            padding: "15px",
            width: "180px",
            textAlign: "center",
            margin: "10px"
          }}>
            <div style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#74b9ff",
              marginBottom: "10px"
            }}>1. 海量数据</div>
            <div style={{
              fontSize: 20,
              color: "#e0e0e0"
            }}>大规模训练数据集</div>
          </div>

          {/* 箭头 */}
          <div style={{
            fontSize: 40,
            color: "#74b9ff",
            margin: "0 10px"
          }}>→</div>

          {/* 步骤2: 神经网络 */}
          <div style={{
            backgroundColor: "rgba(253, 203, 110, 0.2)",
            border: "2px solid #fdcb6e",
            borderRadius: "15px",
            padding: "15px",
            width: "200px",
            textAlign: "center",
            margin: "10px"
          }}>
            <div style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#fdcb6e",
              marginBottom: "10px"
            }}>2. 神经网络</div>
            <div style={{
              fontSize: 20,
              color: "#e0e0e0"
            }}>多层神经元结构</div>
          </div>

          {/* 箭头 */}
          <div style={{
            fontSize: 40,
            color: "#fdcb6e",
            margin: "0 10px"
          }}>→</div>

          {/* 步骤3: 特征抽象 */}
          <div style={{
            backgroundColor: "rgba(255, 118, 117, 0.2)",
            border: "2px solid #ff7675",
            borderRadius: "15px",
            padding: "15px",
            width: "200px",
            textAlign: "center",
            margin: "10px"
          }}>
            <div style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#ff7675",
              marginBottom: "10px"
            }}>3. 逐层特征抽象</div>
            <div style={{
              fontSize: 20,
              color: "#e0e0e0"
            }}>从简单到复杂</div>
          </div>

          {/* 箭头 */}
          <div style={{
            fontSize: 40,
            color: "#ff7675",
            margin: "0 10px"
          }}>→</div>

          {/* 步骤4: 智能输出 */}
          <div style={{
            backgroundColor: "rgba(0, 184, 148, 0.2)",
            border: "2px solid #00b894",
            borderRadius: "15px",
            padding: "15px",
            width: "180px",
            textAlign: "center",
            margin: "10px"
          }}>
            <div style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#00b894",
              marginBottom: "10px"
            }}>4. 智能输出</div>
            <div style={{
              fontSize: 20,
              color: "#e0e0e0"
            }}>分类或决策结果</div>
          </div>

          {/* 箭头 */}
          <div style={{
            fontSize: 40,
            color: "#00b894",
            margin: "0 10px"
          }}>→</div>

          {/* 步骤5: 计算损失 */}
          <div style={{
            backgroundColor: "rgba(123, 110, 246, 0.2)",
            border: "2px solid #7b6ef6",
            borderRadius: "15px",
            padding: "15px",
            width: "180px",
            textAlign: "center",
            margin: "10px"
          }}>
            <div style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#7b6ef6",
              marginBottom: "10px"
            }}>5. 计算损失</div>
            <div style={{
              fontSize: 20,
              color: "#e0e0e0"
            }}>优化模型参数</div>
          </div>
        </div>
      </div>

      {/* 关键技术细节 */}
      <div style={{
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: techOpacity,
        textAlign: "center",
        width: "90%",
        maxWidth: "1200px"
      }}>
        <h3 style={{
          fontSize: 32,
          fontWeight: "700",
          color: "#ff7675",
          margin: "30px 0 20px 0",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          神经网络关键技术
        </h3>
        
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div style={{
            backgroundColor: "rgba(116, 185, 255, 0.1)",
            border: "1px solid #74b9ff",
            borderRadius: "10px",
            padding: "15px",
            width: "250px"
          }}>
            <h4 style={{ color: "#74b9ff", margin: "0 0 10px 0" }}>正则化 Dropout</h4>
            <p style={{ color: "#e0e0e0", fontSize: "18px", margin: 0 }}>降低数据噪音，防止过拟合</p>
          </div>
          
          <div style={{
            backgroundColor: "rgba(253, 203, 110, 0.1)",
            border: "1px solid #fdcb6e",
            borderRadius: "10px",
            padding: "15px",
            width: "250px"
          }}>
            <h4 style={{ color: "#fdcb6e", margin: "0 0 10px 0" }}>反向传播优化</h4>
            <p style={{ color: "#e0e0e0", fontSize: "18px", margin: 0 }}>调整神经网络权重参数</p>
          </div>
          
          <div style={{
            backgroundColor: "rgba(255, 118, 117, 0.1)",
            border: "1px solid #ff7675",
            borderRadius: "10px",
            padding: "15px",
            width: "250px"
          }}>
            <h4 style={{ color: "#ff7675", margin: "0 0 10px 0" }}>激活函数 ReLU</h4>
            <p style={{ color: "#e0e0e0", fontSize: "18px", margin: 0 }}>增强数据稀疏性，非线性变换</p>
          </div>
        </div>
      </div>

      {/* 优化算法 */}
      <div style={{
        position: "absolute",
        top: "65%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: algorithmOpacity,
        textAlign: "center",
        width: "80%",
        maxWidth: "1000px"
      }}>
        <h3 style={{
          fontSize: 28,
          fontWeight: "700",
          color: "#00b894",
          margin: "20px 0 15px 0",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          优化器算法
        </h3>
        
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap"
        }}>
          <div style={{
            backgroundColor: "rgba(0, 184, 148, 0.1)",
            border: "1px solid #00b894",
            borderRadius: "8px",
            padding: "12px 20px",
            fontSize: "20px",
            fontWeight: "600",
            color: "#00b894"
          }}>Adam算法</div>
          <div style={{
            backgroundColor: "rgba(123, 110, 246, 0.1)",
            border: "1px solid #7b6ef6",
            borderRadius: "8px",
            padding: "12px 20px",
            fontSize: "20px",
            fontWeight: "600",
            color: "#7b6ef6"
          }}>SGD算法</div>
        </div>
        
        <p style={{
          fontSize: 22,
          color: "#b0b0b0",
          margin: "20px 0 0 0",
          fontStyle: "italic"
        }}>
          通过不断优化神经网络模型，实现从数据中自动学习多层次特征表达
        </p>
      </div>
    </AbsoluteFill>
  );
};