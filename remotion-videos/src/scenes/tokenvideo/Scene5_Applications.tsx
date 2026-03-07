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

export const Scene5_Applications: React.FC<SceneProps> = ({ title }) => {
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

  // 选择建议动画
  const tipOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tipSlide = interpolate(frame, [150, 180], [30, 0], {
    easing: Easing.out(Easing.cubic),
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
      fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
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
        left: "-100px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(88,166,255,0.06) 0%, transparent 70%)",
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
          background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          不同模型的分词策略
        </h1>
        <p style={{
          fontSize: "32px",
          color: "#8b949e",
        }}>
          选对模型，省下真金白银
        </p>
      </div>

      {/* ChatGPT - BPE */}
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
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px", width: "100%" }}>
            <div style={{
              background: "rgba(88,166,255,0.2)",
              borderRadius: "12px",
              padding: "10px 18px",
              fontSize: "26px",
              fontWeight: "bold",
              color: "#58a6ff",
              flexShrink: 0,
              minWidth: "110px",
              textAlign: "center",
            }}>ChatGPT</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ background: "rgba(88,166,255,0.15)", borderRadius: "6px", padding: "3px 10px", fontSize: "20px", color: "#58a6ff", fontWeight: "bold" }}>BPE算法</span>
                <span style={{ fontSize: "24px", color: "#c9d1d9" }}>长词拆分准</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "22px" }}>
                <span style={{ color: "#8b949e" }}>示例：</span>
                <span style={{ color: "#c9d1d9" }}>"人工智能"</span>
                <span style={{ color: "#8b949e" }}>→</span>
                <div style={{ display: "flex", gap: "6px" }}>
                  <span style={{ background: "rgba(88,166,255,0.2)", borderRadius: "6px", padding: "3px 8px", color: "#58a6ff", fontWeight: "bold" }}>人工</span>
                  <span style={{ background: "rgba(88,166,255,0.2)", borderRadius: "6px", padding: "3px 8px", color: "#58a6ff", fontWeight: "bold" }}>智能</span>
                </div>
                <span style={{ color: "#ffd200", fontWeight: "bold" }}>= 2个Token</span>
              </div>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontSize: "20px", color: "#8b949e", marginBottom: "4px" }}>效率</div>
              <div style={{ width: "80px", height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${progressBar(35, 75)}%`, height: "100%", background: "#58a6ff", borderRadius: "4px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DeepSeek - WordPiece */}
      <div style={{
        opacity: card2Opacity,
        transform: `translateY(${card2Slide}px)`,
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{
          background: "rgba(240,136,62,0.08)",
          borderRadius: "16px",
          padding: "16px 24px",
          border: "1px solid rgba(240,136,62,0.2)",
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px", width: "100%" }}>
            <div style={{
              background: "rgba(240,136,62,0.2)",
              borderRadius: "12px",
              padding: "10px 18px",
              fontSize: "26px",
              fontWeight: "bold",
              color: "#f0883e",
              flexShrink: 0,
              minWidth: "110px",
              textAlign: "center",
            }}>DeepSeek</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ background: "rgba(240,136,62,0.15)", borderRadius: "6px", padding: "3px 10px", fontSize: "20px", color: "#f0883e", fontWeight: "bold" }}>WordPiece算法</span>
                <span style={{ fontSize: "24px", color: "#c9d1d9" }}>词缀捕捉强</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "22px" }}>
                <span style={{ color: "#8b949e" }}>示例：</span>
                <span style={{ color: "#c9d1d9" }}>"学习能力"</span>
                <span style={{ color: "#8b949e" }}>→</span>
                <div style={{ display: "flex", gap: "6px" }}>
                  <span style={{ background: "rgba(240,136,62,0.2)", borderRadius: "6px", padding: "3px 8px", color: "#f0883e", fontWeight: "bold" }}>学习</span>
                  <span style={{ background: "rgba(240,136,62,0.2)", borderRadius: "6px", padding: "3px 8px", color: "#f0883e", fontWeight: "bold" }}>能力</span>
                </div>
                <span style={{ color: "#ffd200", fontWeight: "bold" }}>= 2个Token</span>
              </div>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontSize: "20px", color: "#8b949e", marginBottom: "4px" }}>效率</div>
              <div style={{ width: "80px", height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${progressBar(65, 85)}%`, height: "100%", background: "#f0883e", borderRadius: "4px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 阿里Qwen - SentencePiece */}
      <div style={{
        opacity: card3Opacity,
        transform: `translateY(${card3Slide}px)`,
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{
          background: "rgba(255,210,0,0.08)",
          borderRadius: "16px",
          padding: "16px 24px",
          border: "1px solid rgba(255,210,0,0.2)",
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px", width: "100%" }}>
            <div style={{
              background: "rgba(255,210,0,0.2)",
              borderRadius: "12px",
              padding: "10px 18px",
              fontSize: "26px",
              fontWeight: "bold",
              color: "#ffd200",
              flexShrink: 0,
              minWidth: "110px",
              textAlign: "center",
            }}>阿里Qwen</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ background: "rgba(255,210,0,0.15)", borderRadius: "6px", padding: "3px 10px", fontSize: "20px", color: "#ffd200", fontWeight: "bold" }}>SentencePiece算法</span>
                <span style={{ fontSize: "24px", color: "#c9d1d9" }}>生僻词支持优</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "22px" }}>
                <span style={{ color: "#8b949e" }}>示例：</span>
                <span style={{ color: "#c9d1d9" }}>"氪金"</span>
                <span style={{ color: "#8b949e" }}>→</span>
                <span style={{ background: "rgba(255,210,0,0.2)", borderRadius: "6px", padding: "3px 8px", color: "#ffd200", fontWeight: "bold" }}>氪金</span>
                <span style={{ color: "#ffd200", fontWeight: "bold" }}>= 1个Token（保留完整）</span>
              </div>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontSize: "20px", color: "#8b949e", marginBottom: "4px" }}>效率</div>
              <div style={{ width: "80px", height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${progressBar(95, 90)}%`, height: "100%", background: "#ffd200", borderRadius: "4px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 选择建议 */}
      <div style={{
        opacity: tipOpacity,
        transform: `translateY(${tipSlide}px)`,
        flexShrink: 0,
      }}>
        <div style={{
          background: "rgba(63,185,80,0.08)",
          borderRadius: "16px",
          padding: "16px 24px",
          border: "1px solid rgba(63,185,80,0.2)",
        }}>
          <h3 style={{ fontSize: "26px", fontWeight: "bold", color: "#3fb950", marginBottom: "8px" }}>💡 选择建议</h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", fontSize: "20px" }}>
            <div style={{ background: "rgba(63,185,80,0.1)", borderRadius: "8px", padding: "6px 14px", border: "1px solid rgba(63,185,80,0.3)", color: "#c9d1d9" }}>
              <span style={{ color: "#3fb950", fontWeight: "bold" }}>≤64K：</span>Qwen2-7B（开源免费）或 GPT-4 Turbo（多模态）
            </div>
            <div style={{ background: "rgba(88,166,255,0.1)", borderRadius: "8px", padding: "6px 14px", border: "1px solid rgba(88,166,255,0.3)", color: "#c9d1d9" }}>
              <span style={{ color: "#58a6ff", fontWeight: "bold" }}>64K~200K：</span>Claude 3.7（长文本理解强）
            </div>
            <div style={{ background: "rgba(255,210,0,0.1)", borderRadius: "8px", padding: "6px 14px", border: "1px solid rgba(255,210,0,0.3)", color: "#c9d1d9" }}>
              <span style={{ color: "#ffd200", fontWeight: "bold" }}>&gt;200K：</span>Gemini 1.5 Pro（需高预算）
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};