import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

interface SceneProps {
  title?: string;
}

export const Scene2_Definition: React.FC<SceneProps> = ({ title }) => {
  const frame = useCurrentFrame();

  // 标题动画
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleSlide = interpolate(frame, [0, 40], [50, 0], {
    easing: Easing.out(Easing.back(1.5)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 三个特性卡片动画
  const card1Opacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const card1Slide = interpolate(frame, [30, 60], [40, 0], {
    easing: Easing.out(Easing.back(1.2)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const card2Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const card2Slide = interpolate(frame, [60, 90], [40, 0], {
    easing: Easing.out(Easing.back(1.2)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const card3Opacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const card3Slide = interpolate(frame, [90, 120], [40, 0], {
    easing: Easing.out(Easing.back(1.2)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 数值化示例动画 - 打字机效果
  const idText = "31924";
  const idChars = Math.floor(interpolate(frame, [100, 130], [0, idText.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  // 脉冲动画
  const pulse = 1 + Math.sin(frame * 0.1) * 0.04;

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
      fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      padding: "40px 48px",
      boxSizing: "border-box",
      gap: "20px",
    }}>
      {/* 背景装饰 */}
      <div style={{
        position: "absolute",
        top: "-100px",
        left: "-100px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(240,136,62,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* 主标题 */}
      <div style={{
        textAlign: "center",
        opacity: titleOpacity,
        transform: `translateY(${titleSlide}px)`,
        flexShrink: 0,
      }}>
        <h1 style={{
          fontSize: "80px",
          fontWeight: "bold",
          marginBottom: "10px",
          background: "linear-gradient(45deg, #f0883e, #ffa94d)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Token 的三个核心特性
        </h1>
        <p style={{
          fontSize: "34px",
          color: "#8b949e",
        }}>
          理解这三点，你就掌握了 Token 的本质
        </p>
      </div>

      {/* 特性1：非固定长度 */}
      <div style={{
        opacity: card1Opacity,
        transform: `translateY(${card1Slide}px)`,
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{
          background: "rgba(88,166,255,0.08)",
          borderRadius: "16px",
          padding: "22px 28px",
          border: "1px solid rgba(88,166,255,0.25)",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
          }}>
            <div style={{
              background: "#58a6ff",
              borderRadius: "12px",
              width: "52px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: "bold",
              color: "white",
              flexShrink: 0,
            }}>1</div>
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#58a6ff",
                marginBottom: "10px",
              }}>非固定长度</h2>
              <p style={{
                fontSize: "26px",
                color: "#c9d1d9",
                marginBottom: "10px",
              }}>1个Token ≠ 1个字，分词结果取决于模型策略</p>
              <div style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}>
                <div style={{
                  background: "rgba(88,166,255,0.12)",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  border: "1px solid rgba(88,166,255,0.3)",
                }}>
                  <span style={{ color: "#8b949e", fontSize: "22px" }}>2个Token：</span>
                  <span style={{ color: "#58a6ff", fontSize: "22px", fontWeight: "bold" }}>"人工" + "智能"</span>
                </div>
                <div style={{
                  background: "rgba(240,136,62,0.12)",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  border: "1px solid rgba(240,136,62,0.3)",
                }}>
                  <span style={{ color: "#8b949e", fontSize: "22px" }}>4个Token：</span>
                  <span style={{ color: "#f0883e", fontSize: "22px", fontWeight: "bold" }}>"人" + "工" + "智" + "能"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 特性2：数值化表示 */}
      <div style={{
        opacity: card2Opacity,
        transform: `translateY(${card2Slide}px)`,
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{
          background: "rgba(63,185,80,0.08)",
          borderRadius: "16px",
          padding: "22px 28px",
          border: "1px solid rgba(63,185,80,0.25)",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
          }}>
            <div style={{
              background: "#3fb950",
              borderRadius: "12px",
              width: "52px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: "bold",
              color: "white",
              flexShrink: 0,
            }}>2</div>
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#3fb950",
                marginBottom: "10px",
              }}>数值化表示</h2>
              <p style={{
                fontSize: "26px",
                color: "#c9d1d9",
                marginBottom: "10px",
              }}>每个Token映射唯一ID，再转为向量输入神经网络</p>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontSize: "26px",
              }}>
                <div style={{
                  background: "rgba(63,185,80,0.15)",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  border: "1px solid rgba(63,185,80,0.4)",
                  color: "#3fb950",
                  fontWeight: "bold",
                }}>"AI"</div>
                <span style={{ color: "#8b949e" }}>→</span>
                <div style={{
                  background: "rgba(255,210,0,0.15)",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  border: "1px solid rgba(255,210,0,0.4)",
                  color: "#ffd200",
                  fontWeight: "bold",
                  transform: `scale(${pulse})`,
                }}>ID: {idText.slice(0, idChars)}{idChars < idText.length ? "▋" : ""}</div>
                <span style={{ color: "#8b949e" }}>→</span>
                <div style={{
                  background: "rgba(88,166,255,0.15)",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  border: "1px solid rgba(88,166,255,0.4)",
                  color: "#58a6ff",
                  fontSize: "20px",
                }}>[0.23, -0.87, 0.45, ...]</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 特性3：计费基准 */}
      <div style={{
        opacity: card3Opacity,
        transform: `translateY(${card3Slide}px)`,
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{
          background: "rgba(240,136,62,0.08)",
          borderRadius: "16px",
          padding: "22px 28px",
          border: "1px solid rgba(240,136,62,0.25)",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
          }}>
            <div style={{
              background: "#f0883e",
              borderRadius: "12px",
              width: "52px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: "bold",
              color: "white",
              flexShrink: 0,
            }}>3</div>
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#f0883e",
                marginBottom: "10px",
              }}>计费基准</h2>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}>
                <p style={{
                  fontSize: "26px",
                  color: "#c9d1d9",
                }}>API调用按输入输出Token量收费</p>
                <div style={{
                  background: "rgba(240,136,62,0.15)",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  border: "1px solid rgba(240,136,62,0.4)",
                  fontSize: "24px",
                  color: "#f0883e",
                  fontWeight: "bold",
                }}>💰 每百万Token收费1元</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};