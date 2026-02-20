import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

interface LossScene1_IntroductionProps {
    title: string;
}

export const LossScene1_Introduction: React.FC<LossScene1_IntroductionProps> = ({ title }) => {
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
                padding: 60,
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%"
            }}
        >
            {/* 主标题 */}
            <h1
                style={{
                    fontSize: 84,
                    fontWeight: "bold",
                    marginBottom: 40,
                    textAlign: "center",
                    opacity: titleOpacity,
                    transform: `scale(${titleScale})`,
                    background: "linear-gradient(45deg, #ff6b6b, #ee5a6f)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    width: "100%",
                    maxWidth: "90%"
                }}
            >
                {title}
            </h1>

            {/* 副标题 */}
            <h2
                style={{
                    fontSize: 48,
                    fontWeight: "normal",
                    marginBottom: 60,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#cccccc",
                    width: "100%",
                    maxWidth: "80%"
                }}
            >
                5分钟AI · 每天搞懂一个知识点
            </h2>

            {/* 核心概念 - 抖音风格开场 */}
            <div
                style={{
                    fontSize: 40,
                    lineHeight: 1.8,
                    textAlign: "center",
                    opacity: coreOpacity,
                    backgroundColor: "rgba(255, 107, 107, 0.1)",
                    padding: 40,
                    borderRadius: 20,
                    borderLeft: "6px solid #ff6b6b",
                    maxWidth: "85%",
                    width: "100%"
                }}
            >
                <p style={{ margin: 0, fontStyle: "italic" }}>
                    🔥 <strong>AI模型为什么总能"猜对"？</strong><br />
                    <br />
                    💡 损失函数 = AI的"考试评分标准"<br />
                    就像驾校教练根据压线距离扣分，<br />
                    损失函数决定模型如何变聪明
                </p>
            </div>

            {/* 作者信息 */}
            <div
                style={{
                    fontSize: 24,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#888888",
                    marginTop: 50,
                    width: "100%",
                    maxWidth: "70%"
                }}
            >
                <p>做一个有温度和有干货的技术分享作者 —— Qborfy</p>
            </div>
        </div>
    );
};
