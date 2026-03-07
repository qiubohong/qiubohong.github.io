import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

interface EndingSceneProps {
  title?: string;
  subtitle?: string;
  hashtags?: string[];
}

export const EndingScene: React.FC<EndingSceneProps> = ({
  title = "5分钟 AI，每天搞懂一个知识点！",
  subtitle = "今天我们学习，大模型 Token 知识",
  hashtags = ["#AI", "#大模型", "#Token", "#人工智能", "#技术科普"],
}) => {
  const frame = useCurrentFrame();

  // 主标题动画
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

  // 标签动画
  const hashtagOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hashtagSlide = interpolate(frame, [40, 60], [30, 0], {
    easing: Easing.out(Easing.back(1.2)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 二维码动画
  const qrOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const qrScale = interpolate(frame, [60, 80], [0.8, 1], {
    easing: Easing.out(Easing.elastic(1)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 结束语动画
  const finalOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ 
      background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)"
    }}>
      {/* 主标题 */}
      <div
        style={{
          position: "absolute",
          top: "128px",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleSlide}px)`,
        }}
      >
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          background: "linear-gradient(45deg, #ffd200, #f0883e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          {title}
        </h1>
      </div>

      {/* 副标题 */}
      <div
        style={{
          position: "absolute",
          top: "192px",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: subtitleOpacity,
        }}
      >
        <p style={{
          fontSize: "1.875rem",
          color: "#c9d1d9",
          fontWeight: 500
        }}>{subtitle}</p>
      </div>

      {/* 标签区域 */}
      <div
        style={{
          position: "absolute",
          top: "256px",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: hashtagOpacity,
          transform: `translateY(${hashtagSlide}px)`,
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap"
        }}>
          {hashtags.map((tag, index) => (
            <span
              key={tag}
              style={{
                fontSize: "1.25rem",
                color: "#58a6ff",
                fontWeight: 500,
                backgroundColor: "rgba(88,166,255,0.1)",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                border: "1px solid rgba(88,166,255,0.3)",
                opacity: interpolate(frame, [40 + index * 10, 60 + index * 10], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `scale(${interpolate(frame, [40 + index * 10, 60 + index * 10], [0.5, 1], {
                  easing: Easing.out(Easing.back(1.2)),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })})`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 二维码区域 */}
      <div
        style={{
          position: "absolute",
          bottom: "128px",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: qrOpacity,
          transform: `scale(${qrScale})`,
        }}
      >
        <div style={{
          display: "inline-block",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          padding: "1rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}>
          <div style={{
            width: "128px",
            height: "128px",
            background: "linear-gradient(135deg, #ffd200, #f0883e)",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
              color: "white",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "1.5rem",
                fontWeight: "bold"
              }}>AI</div>
              <div style={{
                fontSize: "0.75rem",
                marginTop: "0.25rem"
              }}>扫码关注</div>
            </div>
          </div>
        </div>
        <p style={{
          fontSize: "1.125rem",
          color: "#c9d1d9",
          marginTop: "1rem"
        }}>扫码关注，获取更多 AI 知识</p>
      </div>

      {/* 结束语 */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: finalOpacity,
        }}
      >
        <div style={{
          backgroundColor: "rgba(240,136,62,0.1)",
          borderRadius: "0.75rem",
          padding: "1rem",
          border: "1px solid rgba(240,136,62,0.3)",
          display: "inline-block"
        }}>
          <p style={{
            fontSize: "1.25rem",
            color: "#c9d1d9"
          }}>
            掌握 Token 知识，
            <span style={{
              color: "#f0883e",
              fontWeight: "bold"
            }}> 优化 AI 应用成本 </span>
            <span style={{
              color: "#3fb950",
              fontWeight: "bold"
            }}> 提升开发效率 </span>
          </p>
        </div>
      </div>

      {/* 装饰元素 */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #ffd200, #f0883e, #58a6ff)"
      }} />
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #58a6ff, #3fb950, #ffd200)"
      }} />
    </AbsoluteFill>
  );
};

// 导出配置
export const ENDING_SCENE_CONFIG = {
  duration: 180, // 6秒
  fps: 30,
  width: 1920,
  height: 1080,
};