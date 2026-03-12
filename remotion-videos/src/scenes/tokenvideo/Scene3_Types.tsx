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

export const Scene3_Types: React.FC<SceneProps> = ({ title }) => {
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

  // 卡片动画
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

  // 进度条动画
  const progressBar = (startFrame: number, target: number) =>
    interpolate(frame, [startFrame, startFrame + 40], [0, target], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
      fontFamily: 'Noto Sans SC, Arial, sans-serif',
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
        top: "-150px",
        right: "-150px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(63,185,80,0.06) 0%, transparent 70%)",
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
          background: "linear-gradient(45deg, #3fb950, #58a6ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Token 如何计算？
        </h1>
        <p style={{
          fontSize: "34px",
          color: "#8b949e",
        }}>
          Token总数 = 输入Token + 输出Token
        </p>
      </div>

      {/* 中英文差异 */}
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
          border: "1px solid rgba(88,166,255,0.2)",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <h2 style={{
            fontSize: "34px",
            fontWeight: "bold",
            color: "#58a6ff",
            marginBottom: "14px",
          }}>🌐 中英文差异</h2>
          <div style={{
            display: "flex",
            gap: "20px",
          }}>
            {/* 中文 */}
            <div style={{
              flex: 1,
              background: "rgba(240,136,62,0.1)",
              borderRadius: "12px",
              padding: "14px 18px",
              border: "1px solid rgba(240,136,62,0.3)",
            }}>
              <div style={{ fontSize: "26px", color: "#f0883e", fontWeight: "bold", marginBottom: "6px" }}>中文字符</div>
              <div style={{ fontSize: "44px", fontWeight: "bold", color: "#f0883e", marginBottom: "4px" }}>≈ 0.6</div>
              <div style={{ fontSize: "22px", color: "#8b949e" }}>个Token / 字符</div>
              <div style={{ marginTop: "10px", background: "rgba(240,136,62,0.15)", borderRadius: "8px", height: "8px", overflow: "hidden" }}>
                <div style={{ width: `${progressBar(40, 60)}%`, height: "100%", background: "#f0883e", borderRadius: "8px" }} />
              </div>
            </div>
            {/* 英文 */}
            <div style={{
              flex: 1,
              background: "rgba(88,166,255,0.1)",
              borderRadius: "12px",
              padding: "14px 18px",
              border: "1px solid rgba(88,166,255,0.3)",
            }}>
              <div style={{ fontSize: "26px", color: "#58a6ff", fontWeight: "bold", marginBottom: "6px" }}>英文字符</div>
              <div style={{ fontSize: "44px", fontWeight: "bold", color: "#58a6ff", marginBottom: "4px" }}>≈ 0.3</div>
              <div style={{ fontSize: "22px", color: "#8b949e" }}>个Token / 字符</div>
              <div style={{ marginTop: "10px", background: "rgba(88,166,255,0.15)", borderRadius: "8px", height: "8px", overflow: "hidden" }}>
                <div style={{ width: `${progressBar(50, 30)}%`, height: "100%", background: "#58a6ff", borderRadius: "8px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 上下文窗口 */}
      <div style={{
        opacity: card2Opacity,
        transform: `translateY(${card2Slide}px)`,
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{
          background: "rgba(255,210,0,0.08)",
          borderRadius: "16px",
          padding: "22px 28px",
          border: "1px solid rgba(255,210,0,0.2)",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <h2 style={{
            fontSize: "34px",
            fontWeight: "bold",
            color: "#ffd200",
            marginBottom: "14px",
          }}>📐 上下文窗口</h2>
          <p style={{
            fontSize: "26px",
            color: "#c9d1d9",
            marginBottom: "14px",
          }}>模型单次处理Token上限，决定能"记住"多少内容</p>
          <div style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}>
            <div style={{
              background: "rgba(255,210,0,0.15)",
              borderRadius: "12px",
              padding: "12px 22px",
              border: "1px solid rgba(255,210,0,0.4)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: "#ffd200" }}>GPT-4 Turbo</div>
              <div style={{ fontSize: "26px", color: "#c9d1d9" }}>128K Token</div>
              <div style={{ fontSize: "20px", color: "#8b949e" }}>≈ 6.5万汉字</div>
            </div>
            <div style={{ fontSize: "30px", color: "#8b949e" }}>≈</div>
            <div style={{
              background: "rgba(63,185,80,0.15)",
              borderRadius: "12px",
              padding: "12px 22px",
              border: "1px solid rgba(63,185,80,0.4)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: "#3fb950" }}>整本《三体》</div>
              <div style={{ fontSize: "26px", color: "#c9d1d9" }}>约65万字</div>
              <div style={{ fontSize: "20px", color: "#8b949e" }}>一次性处理</div>
            </div>
          </div>
        </div>
      </div>

      {/* Token ≈ Money */}
      <div style={{
        opacity: card3Opacity,
        transform: `translateY(${card3Slide}px)`,
        flexShrink: 0,
      }}>
        <div style={{
          background: "rgba(240,136,62,0.08)",
          borderRadius: "16px",
          padding: "20px 28px",
          border: "1px solid rgba(240,136,62,0.25)",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}>
          <div style={{ fontSize: "44px" }}>💡</div>
          <div>
            <h2 style={{
              fontSize: "34px",
              fontWeight: "bold",
              color: "#f0883e",
              marginBottom: "6px",
            }}>Token ≈ Money</h2>
            <p style={{
              fontSize: "24px",
              color: "#c9d1d9",
            }}>调用所有付费大模型API，都是基于Token数计费模式</p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};