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

export const Scene4_CostCalculation: React.FC<SceneProps> = ({ title }) => {
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

  // 步骤动画
  const step1Opacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const step1Slide = interpolate(frame, [30, 60], [40, 0], {
    easing: Easing.out(Easing.back(1.2)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const step2Opacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const step2Slide = interpolate(frame, [80, 110], [40, 0], {
    easing: Easing.out(Easing.back(1.2)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const step3Opacity = interpolate(frame, [130, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const step3Slide = interpolate(frame, [130, 160], [40, 0], {
    easing: Easing.out(Easing.back(1.2)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const conclusionOpacity = interpolate(frame, [200, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 打字机效果 - 用户问题
  const userQuestion = "订单号DD20240815何时发货？";
  const userChars = Math.floor(interpolate(frame, [35, 70], [0, userQuestion.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  // 打字机效果 - AI回复
  const aiReply = "订单已发货，物流单号SF123456";
  const aiChars = Math.floor(interpolate(frame, [115, 145], [0, aiReply.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  // 数字计数
  const countUp = (target: number, startFrame: number, duration = 40) =>
    Math.floor(interpolate(frame, [startFrame, startFrame + duration], [0, target], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }));

  // 脉冲动画
  const pulse = 1 + Math.sin(frame * 0.12) * 0.05;

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
      fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      padding: "36px 48px",
      boxSizing: "border-box",
      gap: "16px",
    }}>
      {/* 背景装饰 */}
      <div style={{
        position: "absolute",
        bottom: "-100px",
        right: "-100px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,210,0,0.05) 0%, transparent 70%)",
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
          fontSize: "76px",
          fontWeight: "bold",
          marginBottom: "6px",
          background: "linear-gradient(45deg, #ffd200, #f0883e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          实际场景计费演示
        </h1>
        <p style={{
          fontSize: "32px",
          color: "#8b949e",
        }}>
          以客服对话为例，看看 Token 如何计算成本
        </p>
      </div>

      {/* 步骤1：用户提问 */}
      <div style={{
        opacity: step1Opacity,
        transform: `translateY(${step1Slide}px)`,
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{
          background: "rgba(88,166,255,0.08)",
          borderRadius: "16px",
          padding: "18px 24px",
          border: "1px solid rgba(88,166,255,0.2)",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div style={{
              background: "#58a6ff",
              borderRadius: "10px",
              padding: "5px 12px",
              fontSize: "22px",
              fontWeight: "bold",
              color: "white",
              flexShrink: 0,
            }}>步骤1</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "28px", fontWeight: "bold", color: "#58a6ff", marginBottom: "8px" }}>
                用户提问 → DeepSeek分词
              </h3>
              <div style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: "10px",
                padding: "10px 16px",
                marginBottom: "8px",
                fontSize: "28px",
                color: "#c9d1d9",
                fontWeight: "bold",
              }}>
                "{userQuestion.slice(0, userChars)}{userChars < userQuestion.length ? "▋" : ""}"
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["订单号", "DD", "2024", "08", "15", "何时", "发货"].map((token, i) => (
                  <div key={i} style={{
                    background: `rgba(88,166,255,${frame > 65 + i * 5 ? 0.15 : 0.05})`,
                    border: `1px solid rgba(88,166,255,${frame > 65 + i * 5 ? 0.5 : 0.2})`,
                    borderRadius: "8px",
                    padding: "5px 12px",
                    fontSize: "22px",
                    color: frame > 65 + i * 5 ? "#58a6ff" : "#8b949e",
                    fontWeight: "bold",
                  }}>{token}</div>
                ))}
                <div style={{
                  background: "rgba(255,210,0,0.15)",
                  border: "1px solid rgba(255,210,0,0.5)",
                  borderRadius: "8px",
                  padding: "5px 12px",
                  fontSize: "22px",
                  color: "#ffd200",
                  fontWeight: "bold",
                  opacity: frame > 100 ? 1 : 0,
                }}>= 7个Token</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 步骤2：AI回复 */}
      <div style={{
        opacity: step2Opacity,
        transform: `translateY(${step2Slide}px)`,
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{
          background: "rgba(63,185,80,0.08)",
          borderRadius: "16px",
          padding: "18px 24px",
          border: "1px solid rgba(63,185,80,0.2)",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div style={{
              background: "#3fb950",
              borderRadius: "10px",
              padding: "5px 12px",
              fontSize: "22px",
              fontWeight: "bold",
              color: "white",
              flexShrink: 0,
            }}>步骤2</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "28px", fontWeight: "bold", color: "#3fb950", marginBottom: "8px" }}>
                模型回复 → 拆分Token
              </h3>
              <div style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: "10px",
                padding: "10px 16px",
                marginBottom: "8px",
                fontSize: "28px",
                color: "#c9d1d9",
                fontWeight: "bold",
              }}>
                "{aiReply.slice(0, aiChars)}{aiChars < aiReply.length ? "▋" : ""}"
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                {["订单", "已发货", "，", "物流单号", "SF", "123456"].map((token, i) => (
                  <div key={i} style={{
                    background: `rgba(63,185,80,${frame > 145 + i * 5 ? 0.15 : 0.05})`,
                    border: `1px solid rgba(63,185,80,${frame > 145 + i * 5 ? 0.5 : 0.2})`,
                    borderRadius: "8px",
                    padding: "5px 12px",
                    fontSize: "22px",
                    color: frame > 145 + i * 5 ? "#3fb950" : "#8b949e",
                    fontWeight: "bold",
                  }}>{token}</div>
                ))}
                <div style={{
                  background: "rgba(255,210,0,0.15)",
                  border: "1px solid rgba(255,210,0,0.5)",
                  borderRadius: "8px",
                  padding: "5px 12px",
                  fontSize: "22px",
                  color: "#ffd200",
                  fontWeight: "bold",
                  opacity: frame > 175 ? 1 : 0,
                }}>= 6个Token</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 步骤3：成本计算 */}
      <div style={{
        opacity: step3Opacity,
        transform: `translateY(${step3Slide}px)`,
        flexShrink: 0,
      }}>
        <div style={{
          background: "rgba(240,136,62,0.08)",
          borderRadius: "16px",
          padding: "18px 24px",
          border: "1px solid rgba(240,136,62,0.2)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              background: "#f0883e",
              borderRadius: "10px",
              padding: "5px 12px",
              fontSize: "22px",
              fontWeight: "bold",
              color: "white",
              flexShrink: 0,
            }}>步骤3</div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <h3 style={{ fontSize: "28px", fontWeight: "bold", color: "#f0883e" }}>计算成本</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "26px" }}>
                <span style={{ color: "#58a6ff" }}>输入7</span>
                <span style={{ color: "#8b949e" }}>+</span>
                <span style={{ color: "#3fb950" }}>输出6</span>
                <span style={{ color: "#8b949e" }}>=</span>
                <span style={{
                  color: "#ffd200",
                  fontWeight: "bold",
                  fontSize: "32px",
                  transform: `scale(${pulse})`,
                  display: "inline-block",
                }}>总计 {countUp(13, 160, 30)} Token</span>
              </div>
              <div style={{
                background: "rgba(240,136,62,0.15)",
                borderRadius: "10px",
                padding: "6px 16px",
                border: "1px solid rgba(240,136,62,0.4)",
                fontSize: "22px",
                color: "#f0883e",
                fontWeight: "bold",
                opacity: frame > 190 ? 1 : 0,
              }}>
                DeepSeek-V3: 0.1元/百万Token → 本次 ≈ 0.0000013元
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 行业真相 */}
      <div style={{
        opacity: conclusionOpacity,
        flexShrink: 0,
      }}>
        <div style={{
          background: "rgba(255,210,0,0.08)",
          borderRadius: "12px",
          padding: "14px 24px",
          border: "1px solid rgba(255,210,0,0.25)",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}>
          <span style={{ fontSize: "32px" }}>🏭</span>
          <p style={{ fontSize: "24px", color: "#c9d1d9" }}>
            <span style={{ color: "#ffd200", fontWeight: "bold" }}>行业真相：</span>
            客服系统月耗千万Token，优化分词规则可降本
            <span style={{ color: "#3fb950", fontWeight: "bold" }}> 20%</span>
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};