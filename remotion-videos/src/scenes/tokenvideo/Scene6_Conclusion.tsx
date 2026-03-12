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

export const Scene6_Conclusion: React.FC<SceneProps> = ({ title }) => {
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

  // 冷知识卡片动画
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

  const card4Opacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const card4Slide = interpolate(frame, [120, 150], [40, 0], {
    easing: Easing.out(Easing.back(1.2)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 数字计数
  const countUp = (target: number, startFrame: number, duration = 40) =>
    Math.floor(interpolate(frame, [startFrame, startFrame + duration], [0, target], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }));

  // 脉冲动画
  const pulse = 1 + Math.sin(frame * 0.08) * 0.03;

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
      fontFamily: 'Noto Sans SC, Arial, sans-serif',
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      padding: "36px 48px",
      boxSizing: "border-box",
      gap: "14px",
    }}>
      {/* 背景装饰 */}
      <div style={{
        position: "absolute",
        top: "-100px",
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
          Token 冷知识
        </h1>
        <p style={{
          fontSize: "32px",
          color: "#8b949e",
        }}>
          这些你可能不知道的 Token 秘密
        </p>
      </div>

      {/* 冷知识1：训练数据规模 */}
      <div style={{
        opacity: card1Opacity,
        transform: `translateY(${card1Slide}px)`,
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{
          background: "rgba(88,166,255,0.08)",
          borderRadius: "16px",
          padding: "16px 24px",
          border: "1px solid rgba(88,166,255,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "18px",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <div style={{ fontSize: "44px", flexShrink: 0 }}>🧠</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{ background: "rgba(88,166,255,0.2)", borderRadius: "6px", padding: "3px 10px", fontSize: "20px", color: "#58a6ff", fontWeight: "bold" }}>冷知识①</span>
              <span style={{ fontSize: "26px", fontWeight: "bold", color: "#c9d1d9" }}>训练数据规模</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "24px" }}>
              <span style={{ color: "#c9d1d9" }}>GPT-3 吃下</span>
              <span style={{ color: "#58a6ff", fontWeight: "bold", fontSize: "32px", transform: `scale(${pulse})`, display: "inline-block" }}>
                {countUp(3000, 35, 40)}亿
              </span>
              <span style={{ color: "#c9d1d9" }}>Token</span>
              <span style={{ color: "#8b949e" }}>≈</span>
              <span style={{ color: "#ffd200", fontWeight: "bold" }}>人类 300万年 阅读量</span>
            </div>
          </div>
        </div>
      </div>

      {/* 冷知识2：128K上下文 */}
      <div style={{
        opacity: card2Opacity,
        transform: `translateY(${card2Slide}px)`,
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{
          background: "rgba(63,185,80,0.08)",
          borderRadius: "16px",
          padding: "16px 24px",
          border: "1px solid rgba(63,185,80,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "18px",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <div style={{ fontSize: "44px", flexShrink: 0 }}>📚</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{ background: "rgba(63,185,80,0.2)", borderRadius: "6px", padding: "3px 10px", fontSize: "20px", color: "#3fb950", fontWeight: "bold" }}>冷知识②</span>
              <span style={{ fontSize: "26px", fontWeight: "bold", color: "#c9d1d9" }}>128K上下文威力</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "24px" }}>
              <span style={{ color: "#c9d1d9" }}>可一次性处理整本</span>
              <span style={{ color: "#3fb950", fontWeight: "bold", fontSize: "28px" }}>《三体》</span>
              <span style={{ color: "#c9d1d9" }}>约</span>
              <span style={{ color: "#ffd200", fontWeight: "bold" }}>6.5万汉字</span>
            </div>
          </div>
        </div>
      </div>

      {/* 冷知识3：中文Token税 */}
      <div style={{
        opacity: card3Opacity,
        transform: `translateY(${card3Slide}px)`,
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{
          background: "rgba(240,136,62,0.08)",
          borderRadius: "16px",
          padding: "16px 24px",
          border: "1px solid rgba(240,136,62,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "18px",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <div style={{ fontSize: "44px", flexShrink: 0 }}>🇨🇳</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{ background: "rgba(240,136,62,0.2)", borderRadius: "6px", padding: "3px 10px", fontSize: "20px", color: "#f0883e", fontWeight: "bold" }}>冷知识③</span>
              <span style={{ fontSize: "26px", fontWeight: "bold", color: "#c9d1d9" }}>中文的 Token 税</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "24px" }}>
              <span style={{ color: "#c9d1d9" }}>同一段信息，中文消耗Token数比英文多</span>
              <span style={{ color: "#f0883e", fontWeight: "bold", fontSize: "32px" }}>40%~100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 冷知识4：Emoji拆解诅咒 */}
      <div style={{
        opacity: card4Opacity,
        transform: `translateY(${card4Slide}px)`,
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{
          background: "rgba(255,210,0,0.08)",
          borderRadius: "16px",
          padding: "16px 24px",
          border: "1px solid rgba(255,210,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "18px",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <div style={{ fontSize: "44px", flexShrink: 0 }}>❤️</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{ background: "rgba(255,210,0,0.2)", borderRadius: "6px", padding: "3px 10px", fontSize: "20px", color: "#ffd200", fontWeight: "bold" }}>冷知识④</span>
              <span style={{ fontSize: "26px", fontWeight: "bold", color: "#c9d1d9" }}>Emoji 的拆解诅咒</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "22px", flexWrap: "wrap" }}>
              <span style={{ color: "#c9d1d9" }}>爱心表情 ❤️ 被拆为</span>
              <span style={{ background: "rgba(255,210,0,0.15)", borderRadius: "6px", padding: "3px 8px", color: "#ffd200", fontWeight: "bold" }}>心脏符号</span>
              <span style={{ color: "#8b949e" }}>+</span>
              <span style={{ background: "rgba(255,210,0,0.15)", borderRadius: "6px", padding: "3px 8px", color: "#ffd200", fontWeight: "bold" }}>修饰符</span>
              <span style={{ color: "#c9d1d9" }}>共2个Token，情感分析可能被误判！</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};