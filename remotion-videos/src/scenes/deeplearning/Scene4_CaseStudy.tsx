import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";

interface Scene4_CaseStudyProps {}

export const Scene4_CaseStudy: React.FC<Scene4_CaseStudyProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // 标题动画效果
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 案例标题动画效果
  const caseTitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 人脸识别流程动画效果
  const processOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 技术细节动画效果
  const techOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c2461" }}>
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
          color: "#ff9ff3",
          margin: 0,
          textShadow: "0 4px 8px rgba(0,0,0,0.6)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          经典案例：人脸识别过程
        </h2>
      </div>

      {/* 案例介绍 */}
      <div style={{
        position: "absolute",
        top: "18%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: caseTitleOpacity,
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
          人脸识别是深度学习的典型应用，展示了如何通过多层神经网络从原始像素数据中学习人脸特征
        </p>
      </div>

      {/* 人脸识别流程 */}
      <div style={{
        position: "absolute",
        top: "28%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: processOpacity,
        textAlign: "center",
        width: "90%",
        maxWidth: "1400px"
      }}>
        <h3 style={{
          fontSize: 36,
          fontWeight: "700",
          color: "#74b9ff",
          margin: "30px 0 20px 0",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          人脸识别流程
        </h3>
        
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px"
        }}>
          {/* 步骤1: 人脸检测 */}
          <div style={{
            backgroundColor: "rgba(116, 185, 255, 0.2)",
            border: "2px solid #74b9ff",
            borderRadius: "12px",
            padding: "20px",
            width: "220px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
          }}>
            <div style={{
              fontSize: 32,
              fontWeight: "700",
              color: "#74b9ff",
              marginBottom: "15px"
            }}>1. 人脸检测</div>
            <div style={{
              fontSize: 20,
              color: "#e0e0e0",
              lineHeight: 1.4
            }}>
              定位图像中所有人脸的位置<br/>（输出边界框）
            </div>
          </div>

          {/* 箭头 */}
          <div style={{
            fontSize: 40,
            color: "#74b9ff",
            fontWeight: "bold"
          }}>→</div>

          {/* 步骤2: 人脸对齐 */}
          <div style={{
            backgroundColor: "rgba(255, 159, 243, 0.2)",
            border: "2px solid #ff9ff3",
            borderRadius: "12px",
            padding: "20px",
            width: "220px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
          }}>
            <div style={{
              fontSize: 32,
              fontWeight: "700",
              color: "#ff9ff3",
              marginBottom: "15px"
            }}>2. 人脸对齐</div>
            <div style={{
              fontSize: 20,
              color: "#e0e0e0",
              lineHeight: 1.4
            }}>
              根据关键点（眼睛、鼻尖等）<br/>矫正人脸角度，消除姿态影响
            </div>
          </div>

          {/* 箭头 */}
          <div style={{
            fontSize: 40,
            color: "#ff9ff3",
            fontWeight: "bold"
          }}>→</div>

          {/* 步骤3: 特征提取 */}
          <div style={{
            backgroundColor: "rgba(255, 107, 107, 0.2)",
            border: "2px solid #ff6b6b",
            borderRadius: "12px",
            padding: "20px",
            width: "220px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
          }}>
            <div style={{
              fontSize: 32,
              fontWeight: "700",
              color: "#ff6b6b",
              marginBottom: "15px"
            }}>3. 特征提取</div>
            <div style={{
              fontSize: 20,
              color: "#e0e0e0",
              lineHeight: 1.4
            }}>
              将人脸转化为高区分度的数字向量<br/>（128~512维）
            </div>
          </div>

          {/* 箭头 */}
          <div style={{
            fontSize: 40,
            color: "#ff6b6b",
            fontWeight: "bold"
          }}>→</div>

          {/* 步骤4: 特征匹配 */}
          <div style={{
            backgroundColor: "rgba(0, 184, 148, 0.2)",
            border: "2px solid #00b894",
            borderRadius: "12px",
            padding: "20px",
            width: "220px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
          }}>
            <div style={{
              fontSize: 32,
              fontWeight: "700",
              color: "#00b894",
              marginBottom: "15px"
            }}>4. 特征匹配</div>
            <div style={{
              fontSize: 20,
              color: "#e0e0e0",
              lineHeight: 1.4
            }}>
              计算特征向量间的相似度<br/>（如欧氏距离）
            </div>
          </div>
        </div>
      </div>

      {/* 技术细节 */}
      <div style={{
        position: "absolute",
        top: "60%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: techOpacity,
        textAlign: "center",
        width: "80%",
        maxWidth: "1200px"
      }}>
        <h3 style={{
          fontSize: 32,
          fontWeight: "700",
          color: "#fdcb6e",
          margin: "30px 0 20px 0",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          深度学习在人脸识别中的优势
        </h3>
        
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div style={{
            backgroundColor: "rgba(253, 203, 110, 0.1)",
            border: "1px solid #fdcb6e",
            borderRadius: "10px",
            padding: "15px",
            width: "280px"
          }}>
            <h4 style={{ color: "#fdcb6e", margin: "0 0 10px 0" }}>自动特征学习</h4>
            <p style={{ color: "#e0e0e0", fontSize: "18px", margin: 0 }}>
              无需人工设计特征，直接从像素数据中学习
            </p>
          </div>
          
          <div style={{
            backgroundColor: "rgba(116, 185, 255, 0.1)",
            border: "1px solid #74b9ff",
            borderRadius: "10px",
            padding: "15px",
            width: "280px"
          }}>
            <h4 style={{ color: "#74b9ff", margin: "0 0 10px 0" }}>鲁棒性强</h4>
            <p style={{ color: "#e0e0e0", fontSize: "18px", margin: 0 }}>
              对光照、角度、遮挡等变化具有很好的适应性
            </p>
          </div>
          
          <div style={{
            backgroundColor: "rgba(255, 118, 117, 0.1)",
            border: "1px solid #ff7675",
            borderRadius: "10px",
            padding: "15px",
            width: "280px"
          }}>
            <h4 style={{ color: "#ff7675", margin: "0 0 10px 0" }}>高精度识别</h4>
            <p style={{ color: "#e0e0e0", fontSize: "18px", margin: 0 }}>
              在百万级人脸库中达到99%以上的识别准确率
            </p>
          </div>
        </div>

        <div style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <p style={{
            fontSize: 22,
            color: "#b0b0b0",
            lineHeight: 1.5,
            margin: 0,
            fontStyle: "italic"
          }}>
            人脸识别过程展示了深度学习如何通过层次化特征学习，从原始像素数据中自动提取有意义的特征表达，
            最终实现高精度的模式识别能力。
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};