import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const LossScene4_Functions_Part1: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 三个函数依次出现
    const func1Opacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const func2Opacity = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const func3Opacity = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#1a1a2e",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
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
            {/* 标题 */}
            <h2
                style={{
                    fontSize: 56,
                    fontWeight: "bold",
                    marginBottom: 35,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#ff6b6b"
                }}
            >
                五大经典损失函数（1/2）
            </h2>

            {/* 函数列表 */}
            <div style={{ width: "90%", maxWidth: 1600, display: "flex", flexDirection: "column", gap: 25 }}>
                {/* MSE */}
                <div
                    style={{
                        opacity: func1Opacity,
                        backgroundColor: "rgba(255, 107, 107, 0.15)",
                        padding: 28,
                        borderRadius: 15,
                        borderLeft: "5px solid #ff6b6b"
                    }}
                >
                    <h3 style={{ fontSize: 38, margin: "0 0 12px 0", color: "#ff6b6b" }}>
                        1️⃣ 均方误差（MSE）
                    </h3>
                    <p style={{ fontSize: 28, margin: "0 0 8px 0", lineHeight: 1.5 }}>
                        <strong>任务：</strong>回归 | <strong>抗噪性：</strong>弱
                    </p>
                    <p style={{ fontSize: 28, margin: 0, lineHeight: 1.5, color: "#aaa" }}>
                        <strong>应用：</strong>房价预测、气温预报等连续值预测
                    </p>
                </div>

                {/* 交叉熵 */}
                <div
                    style={{
                        opacity: func2Opacity,
                        backgroundColor: "rgba(255, 107, 107, 0.15)",
                        padding: 28,
                        borderRadius: 15,
                        borderLeft: "5px solid #ff6b6b"
                    }}
                >
                    <h3 style={{ fontSize: 38, margin: "0 0 12px 0", color: "#ff6b6b" }}>
                        2️⃣ 交叉熵（Cross-Entropy）
                    </h3>
                    <p style={{ fontSize: 28, margin: "0 0 8px 0", lineHeight: 1.5 }}>
                        <strong>任务：</strong>分类 | <strong>抗噪性：</strong>强 ⭐
                    </p>
                    <p style={{ fontSize: 28, margin: 0, lineHeight: 1.5, color: "#aaa" }}>
                        <strong>应用：</strong>图像分类、情感分析
                    </p>
                </div>

                {/* Hinge Loss */}
                <div
                    style={{
                        opacity: func3Opacity,
                        backgroundColor: "rgba(255, 107, 107, 0.15)",
                        padding: 28,
                        borderRadius: 15,
                        borderLeft: "5px solid #ff6b6b"
                    }}
                >
                    <h3 style={{ fontSize: 38, margin: "0 0 12px 0", color: "#ff6b6b" }}>
                        3️⃣ 合页损失（Hinge Loss）
                    </h3>
                    <p style={{ fontSize: 28, margin: "0 0 8px 0", lineHeight: 1.5 }}>
                        <strong>任务：</strong>分类 | <strong>抗噪性：</strong>中
                    </p>
                    <p style={{ fontSize: 28, margin: 0, lineHeight: 1.5, color: "#aaa" }}>
                        <strong>应用：</strong>文本分类、支持向量机
                    </p>
                </div>
            </div>
        </div>
    );
};
