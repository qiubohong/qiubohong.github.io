import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const RNNScene4_LSTM: React.FC = () => {
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
                LSTM（长短期记忆网络）
            </h2>

            {/* 核心目标 */}
            <div
                style={{
                    fontSize: 30,
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
                <h3 style={{ margin: "0 0 20px 0", fontSize: 38, color: "#4facfe" }}>
                    🎯 核心目标
                </h3>
                <p style={{ margin: 0 }}>
                    解决传统RNN的<strong>长期依赖问题</strong><br />
                    （梯度消失/爆炸），通过门控机制<br />
                    选择性保留关键历史信息
                </p>
            </div>

            {/* 结构创新 */}
            <div
                style={{
                    fontSize: 28,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: contentOpacity,
                    backgroundColor: "rgba(79, 172, 254, 0.1)",
                    padding: 35,
                    borderRadius: 20,
                    borderLeft: "6px solid #4facfe",
                    maxWidth: "90%",
                    width: "100%"
                }}
            >
                <h3 style={{ margin: "0 0 20px 0", fontSize: 38, color: "#4facfe" }}>
                    💡 结构创新
                </h3>
                <p style={{ margin: "15px 0" }}>
                    <strong>• 记忆细胞（Cell State）：</strong><br />
                    贯穿时间步的"信息高速公路"，<br />
                    稳定传递长期记忆
                </p>
                <p style={{ margin: "15px 0" }}>
                    <strong>• 三重门控：</strong><br />
                    遗忘门、输入门、输出门<br />
                    动态调控信息流
                </p>
            </div>
        </div>
    );
};
