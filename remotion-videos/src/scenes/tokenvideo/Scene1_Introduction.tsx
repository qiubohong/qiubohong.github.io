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

export const Scene1_Introduction: React.FC<SceneProps> = ({ title }) => {
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

  // 副标题动画
  const subtitleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 内容卡片动画
  const card1Opacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const card1Slide = interpolate(frame, [40, 70], [30, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const card2Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const card2Slide = interpolate(frame, [60, 90], [30, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const card3Opacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const card3Slide = interpolate(frame, [80, 110], [30, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 底部标语动画
  const taglineOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 浮动动画
  const floatY = Math.sin(frame * 0.05) * 6;

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
      fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      padding: "40px 48px",
      boxSizing: "border-box",
      gap: "16px",
    }}>
      {/* 背景装饰圆 */}
      <div style={{
        position: "absolute",
        top: "-200px",
        right: "-200px",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(88,166,255,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-150px",
        left: "-150px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(240,136,62,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* 主标题区域 */}
      <div style={{
        textAlign: "center",
        opacity: titleOpacity,
        transform: `translateY(${titleSlide}px)`,
        flexShrink: 0,
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(88,166,255,0.1)",
          border: "1px solid rgba(88,166,255,0.3)",
          borderRadius: "999px",
          padding: "6px 20px",
          marginBottom: "12px",
        }}>
          <span style={{
            fontSize: "26px",
            color: "#58a6ff",
            fontWeight: "bold",
          }}>5分钟AI · 每天搞懂一个知识点</span>
        </div>
        <h1 style={{
          fontSize: "88px",
          fontWeight: "bold",
          marginBottom: "8px",
          background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.1,
        }}>
          大模型 Token
        </h1>
        <p style={{
          fontSize: "38px",
          color: "#c9d1d9",
          opacity: subtitleOpacity,
        }}>
          最基础也最重要的核心概念
        </p>
      </div>

      {/* 核心定义卡片 */}
      <div style={{
        opacity: card1Opacity,
        transform: `translateY(${card1Slide}px)`,
        flexShrink: 0,
      }}>
        <div style={{
          background: "rgba(88,166,255,0.08)",
          borderRadius: "16px",
          padding: "22px 32px",
          border: "1px solid rgba(88,166,255,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}>
          <div style={{
            fontSize: "52px",
            transform: `translateY(${floatY}px)`,
            flexShrink: 0,
          }}>⚛️</div>
          <div>
            <h2 style={{
              fontSize: "38px",
              fontWeight: "bold",
              color: "#58a6ff",
              marginBottom: "8px",
            }}>Token = 文本的最小单元</h2>
            <p style={{
              fontSize: "28px",
              color: "#c9d1d9",
            }}>如同原子构成物质，Token 构成语言模型理解的文本世界</p>
          </div>
        </div>
      </div>

      {/* Token类型说明 */}
      <div style={{
        opacity: card2Opacity,
        transform: `translateY(${card2Slide}px)`,
        flexShrink: 0,
      }}>
        <div style={{
          background: "rgba(255,255,255,0.04)",
          borderRadius: "16px",
          padding: "20px 32px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <h3 style={{
            fontSize: "30px",
            color: "#8b949e",
            marginBottom: "14px",
          }}>Token 可以是：</h3>
          <div style={{
            display: "flex",
            gap: "14px",
          }}>
            {[
              { label: "单词", color: "#f0883e", example: '"hello"' },
              { label: "子词", color: "#58a6ff", example: '"人工" "智能"' },
              { label: "汉字", color: "#3fb950", example: '"人" "工" "智" "能"' },
              { label: "标点", color: "#ffd200", example: '"，" "." "！"' },
            ].map((item, i) => (
              <div key={i} style={{
                background: `rgba(${item.color === "#f0883e" ? "240,136,62" : item.color === "#58a6ff" ? "88,166,255" : item.color === "#3fb950" ? "63,185,80" : "255,210,0"},0.1)`,
                border: `1px solid ${item.color}40`,
                borderRadius: "12px",
                padding: "12px 18px",
                flex: "1",
              }}>
                <div style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: item.color,
                  marginBottom: "4px",
                }}>{item.label}</div>
                <div style={{
                  fontSize: "22px",
                  color: "#8b949e",
                }}>{item.example}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 核心价值 */}
      <div style={{
        opacity: card3Opacity,
        transform: `translateY(${card3Slide}px)`,
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{
          background: "rgba(240,136,62,0.08)",
          borderRadius: "16px",
          padding: "22px 32px",
          border: "1px solid rgba(240,136,62,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "24px",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <div style={{ fontSize: "48px", flexShrink: 0 }}>🎯</div>
          <div>
            <h2 style={{
              fontSize: "34px",
              fontWeight: "bold",
              color: "#f0883e",
              marginBottom: "10px",
            }}>掌握 Token = 握住 LLM 的算力方向盘</h2>
            <div style={{
              display: "flex",
              gap: "24px",
              fontSize: "26px",
              color: "#c9d1d9",
            }}>
              <span>✅ 精准控制输入</span>
              <span>✅ 预测成本</span>
              <span>✅ 优化生成效果</span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部标语 */}
      <div style={{
        textAlign: "center",
        opacity: taglineOpacity,
        flexShrink: 0,
      }}>
        <span style={{
          fontSize: "26px",
          color: "#8b949e",
        }}>今天，我们用 3 分钟搞懂 Token 的核心秘密 👇</span>
      </div>
    </AbsoluteFill>
  );
};