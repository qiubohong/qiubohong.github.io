import React from "react";
import { interpolate, useCurrentFrame, Easing, Img, staticFile } from "remotion";

export const RNNScene2_Definition: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(
        frame,
        [0, 20],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // 内容动画
    const contentOpacity = interpolate(
        frame,
        [30, 60],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // 引用动画
    const quoteOpacity = interpolate(
        frame,
        [90, 120],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#16213e",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 60px",
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                boxSizing: "border-box"
            }}
        >
            {/* 标题 */}
            <h2
                style={{
                    fontSize: 56,
                    fontWeight: "bold",
                    marginBottom: 40,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #4facfe, #00f2fe)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                }}
            >
                什么是 RNN？
            </h2>

            {/* 核心定义 */}
            <div
                style={{
                    fontSize: 32,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: contentOpacity,
                    backgroundColor: "rgba(79, 172, 254, 0.1)",
                    padding: 35,
                    borderRadius: 20,
                    borderLeft: "6px solid #4facfe",
                    maxWidth: "90%",
                    width: "100%",
                    marginBottom: 30
                }}
            >
                <p style={{ margin: "0 0 20px 0" }}>
                    <strong>🔄 记忆状态：</strong><br />
                    如分拣中心的传送带，持续传递包裹（信息）
                </p>
                <p style={{ margin: 0 }}>
                    <strong>⚡ 关键突破：</strong><br />
                    传统神经网络每步独立处理 → RNN利用上一步结果辅助当前决策
                </p>
            </div>

            {/* 名人名言 */}
            <div
                style={{
                    fontSize: 28,
                    lineHeight: 1.6,
                    textAlign: "center",
                    opacity: quoteOpacity,
                    fontStyle: "italic",
                    color: "#cccccc",
                    maxWidth: "85%",
                    padding: 25,
                    borderTop: "2px solid #4facfe",
                    borderBottom: "2px solid #4facfe",
                }}
            >
                "RNN的循环连接，是AI从静态画像<br />
                走向动态影像的关键一跃"<br />
                <span style={{ fontSize: 22, color: "#888888" }}>—— 吴恩达（Andrew Ng）</span>
            </div>
        </div>
    );
};
