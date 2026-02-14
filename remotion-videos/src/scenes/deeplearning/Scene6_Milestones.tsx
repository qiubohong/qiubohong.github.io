import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";

interface Scene6_MilestonesProps {}

export const Scene6_Milestones: React.FC<Scene6_MilestonesProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // 标题动画效果
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 里程碑时间线动画效果
  const timelineOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 里程碑1动画效果
  const milestone1Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 里程碑2动画效果
  const milestone2Opacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 里程碑3动画效果
  const milestone3Opacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#2d3436" }}>
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
          color: "#ff7675",
          margin: 0,
          textShadow: "0 4px 8px rgba(0,0,0,0.6)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          深度学习里程碑
        </h2>
      </div>

      {/* 时间线标题 */}
      <div style={{
        position: "absolute",
        top: "18%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: timelineOpacity,
        textAlign: "center",
        width: "90%"
      }}>
        <h3 style={{
          fontSize: 36,
          fontWeight: "700",
          color: "#74b9ff",
          margin: "10px 0 30px 0",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          改变AI历史的关键突破
        </h3>
      </div>

      {/* 时间线 */}
      <div style={{
        position: "absolute",
        top: "25%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: timelineOpacity,
        width: "90%",
        maxWidth: "1400px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative"
        }}>
          {/* 时间线 */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "0",
            right: "0",
            height: "4px",
            backgroundColor: "#74b9ff",
            zIndex: 1
          }} />
          
          {/* 里程碑1: AlexNet */}
          <div style={{
            position: "relative",
            zIndex: 2,
            opacity: milestone1Opacity,
            textAlign: "center",
            width: "30%"
          }}>
            <div style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#ff7675",
              borderRadius: "50%",
              margin: "0 auto 15px auto",
              boxShadow: "0 0 10px rgba(255, 118, 117, 0.8)"
            }} />
            <div style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#ff7675",
              marginBottom: "10px"
            }}>2012年</div>
            <div style={{
              fontSize: 32,
              fontWeight: "800",
              color: "#ff7675",
              marginBottom: "15px"
            }}>AlexNet</div>
            <div style={{
              backgroundColor: "rgba(255, 118, 117, 0.1)",
              border: "2px solid #ff7675",
              borderRadius: "12px",
              padding: "15px",
              fontSize: "20px",
              color: "#e0e0e0",
              lineHeight: 1.4
            }}>
              ImageNet识别错误率<br/>
              <strong style={{ color: "#ff7675" }}>从26%降至15%</strong><br/>
              → 引爆深度学习热潮
            </div>
          </div>

          {/* 里程碑2: AlphaGo */}
          <div style={{
            position: "relative",
            zIndex: 2,
            opacity: milestone2Opacity,
            textAlign: "center",
            width: "30%"
          }}>
            <div style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#00b894",
              borderRadius: "50%",
              margin: "0 auto 15px auto",
              boxShadow: "0 0 10px rgba(0, 184, 148, 0.8)"
            }} />
            <div style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#00b894",
              marginBottom: "10px"
            }}>2016年</div>
            <div style={{
              fontSize: 32,
              fontWeight: "800",
              color: "#00b894",
              marginBottom: "15px"
            }}>AlphaGo</div>
            <div style={{
              backgroundColor: "rgba(0, 184, 148, 0.1)",
              border: "2px solid #00b894",
              borderRadius: "12px",
              padding: "15px",
              fontSize: "20px",
              color: "#e0e0e0",
              lineHeight: 1.4
            }}>
              战胜李世石<br/>
              <strong style={{ color: "#00b894" }}>证明强化学习+深度网络</strong><br/>
              的决策能力
            </div>
          </div>

          {/* 里程碑3: GPT-3 */}
          <div style={{
            position: "relative",
            zIndex: 2,
            opacity: milestone3Opacity,
            textAlign: "center",
            width: "30%"
          }}>
            <div style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#fdcb6e",
              borderRadius: "50%",
              margin: "0 auto 15px auto",
              boxShadow: "0 0 10px rgba(253, 203, 110, 0.8)"
            }} />
            <div style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#fdcb6e",
              marginBottom: "10px"
            }}>2020年</div>
            <div style={{
              fontSize: 32,
              fontWeight: "800",
              color: "#fdcb6e",
              marginBottom: "15px"
            }}>GPT-3</div>
            <div style={{
              backgroundColor: "rgba(253, 203, 110, 0.1)",
              border: "2px solid #fdcb6e",
              borderRadius: "12px",
              padding: "15px",
              fontSize: "20px",
              color: "#e0e0e0",
              lineHeight: 1.4
            }}>
              <strong style={{ color: "#fdcb6e" }}>1750亿参数</strong>大模型<br/>
              实现语言理解与创作<br/>
              开启大模型时代
            </div>
          </div>
        </div>
      </div>

      {/* 里程碑意义总结 */}
      <div style={{
        position: "absolute",
        top: "65%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: milestone3Opacity,
        textAlign: "center",
        width: "80%",
        maxWidth: "1200px"
      }}>
        <div style={{
          backgroundColor: "rgba(116, 185, 255, 0.1)",
          border: "2px solid #74b9ff",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
        }}>
          <h3 style={{
            fontSize: 32,
            fontWeight: "700",
            color: "#74b9ff",
            margin: "0 0 15px 0",
            fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
          }}>
            里程碑的意义
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            textAlign: "left"
          }}>
            <div>
              <h4 style={{ color: "#ff7675", margin: "0 0 10px 0" }}>技术突破</h4>
              <p style={{ color: "#e0e0e0", fontSize: "18px", margin: 0, lineHeight: 1.5 }}>
                从图像识别到游戏AI再到自然语言处理，深度学习在多个领域实现突破性进展
              </p>
            </div>
            <div>
              <h4 style={{ color: "#00b894", margin: "0 0 10px 0" }}>产业影响</h4>
              <p style={{ color: "#e0e0e0", fontSize: "18px", margin: 0, lineHeight: 1.5 }}>
                推动了AI产业化进程，催生了自动驾驶、智能医疗、内容生成等新兴产业
              </p>
            </div>
            <div>
              <h4 style={{ color: "#fdcb6e", margin: "0 0 10px 0" }}>社会变革</h4>
              <p style={{ color: "#e0e0e0", fontSize: "18px", margin: 0, lineHeight: 1.5 }}>
                改变了人类与机器的交互方式，开启了智能时代的新篇章
              </p>
            </div>
          </div>
          
          <div style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "8px"
          }}>
            <p style={{
              fontSize: 22,
              color: "#b0b0b0",
              lineHeight: 1.5,
              margin: 0,
              fontStyle: "italic"
            }}>
              这些里程碑不仅代表了技术的进步，更标志着人工智能从实验室走向现实世界的重大转折点。
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};