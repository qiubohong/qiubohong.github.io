import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

interface RNNScene1_IntroductionProps {
    title: string;
}

export const RNNScene1_Introduction: React.FC<RNNScene1_IntroductionProps> = ({ title }) => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(
        frame,
        [0, 30],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    const titleScale = interpolate(
        frame,
        [0, 30],
        [0.8, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // 核心概念动画
    const coreOpacity = interpolate(
        frame,
        [60, 90],
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
                backgroundColor: "#1a1a2e",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 50px",
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                boxSizing: "border-box"
            }}
        >
            {/* 主标题 */}
            <h1
                style={{
                    fontSize: 72,
                    fontWeight: "bold",
                    marginBottom: 30,
                    textAlign: "center",
                    opacity: titleOpacity,
                    transform: `scale(${titleScale})`,
                    background: "linear-gradient(45deg, #4facfe, #00f2fe)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    width: "100%",
                    maxWidth: "90%",
                    lineHeight: 1.2
                }}
            >
                {title}
            </h1>
            {/* 副标题 */}
            <h2
                style={{
                    fontSize: 40,
                    fontWeight: "normal",
                    marginBottom: 40,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#cccccc",
                    width: "100%",
                    maxWidth: "80%",
                    lineHeight: 1.3
                }}
            >
                5分钟AI · 每天搞懂一个知识点
            </h2>

            {/* 核心概念 - 抖音风格开场 */}
            <div
                style={{
                    fontSize: 34,
                    lineHeight: 1.6,
                    textAlign: "center",
                    opacity: coreOpacity,
                    backgroundColor: "rgba(79, 172, 254, 0.1)",
                    padding: 30,
                    borderRadius: 20,
                    borderLeft: "6px solid #4facfe",
                    maxWidth: "85%",
                    width: "100%"
                }}
            >
                <p style={{ margin: 0, fontStyle: "italic" }}>
                    🧠 <strong>AI怎么记住你说过的话？</strong><br />
                    <br />
                    💡 RNN = 带记忆功能的神经网络<br />
                    就像快递分拣中心的传送带，<br />
                    持续传递包裹（信息）
                </p>
            </div>

            {/* 作者信息 */}
            <div
                style={{
                    fontSize: 22,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#888888",
                    marginTop: 35,
                    width: "100%",
                    maxWidth: "70%"
                }}
            >
                <p>做一个有温度和有干货的技术分享作者 —— Qborfy</p>
            </div>
        </div>
    );
};
