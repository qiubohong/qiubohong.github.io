import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const LossScene6_GoldenRules: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 三条准则依次出现
    const rule1Opacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const rule2Opacity = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const rule3Opacity = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#16213e",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 60,
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%"
            }}
        >
            {/* 标题 */}
            <h2
                style={{
                    fontSize: 64,
                    fontWeight: "bold",
                    marginBottom: 60,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#ffd700"
                }}
            >
                ⭐ 选择黄金准则 ⭐
            </h2>

            {/* 准则列表 */}
            <div style={{ width: "90%", maxWidth: 1600, display: "flex", flexDirection: "column", gap: 35 }}>
                {/* 准则1 */}
                <div
                    style={{
                        opacity: rule1Opacity,
                        backgroundColor: "rgba(255, 215, 0, 0.15)",
                        padding: 40,
                        borderRadius: 15,
                        border: "3px solid #ffd700"
                    }}
                >
                    <h3 style={{ fontSize: 42, margin: "0 0 15px 0", color: "#ffd700" }}>
                        1️⃣ 分类任务
                    </h3>
                    <p style={{ fontSize: 34, margin: 0, lineHeight: 1.8 }}>
                        优先<strong style={{ color: "#ff6b6b" }}>交叉熵</strong><br />
                        样本不平衡时升级为<strong style={{ color: "#ff6b6b" }}>Focal Loss</strong>
                    </p>
                </div>

                {/* 准则2 */}
                <div
                    style={{
                        opacity: rule2Opacity,
                        backgroundColor: "rgba(255, 215, 0, 0.15)",
                        padding: 40,
                        borderRadius: 15,
                        border: "3px solid #ffd700"
                    }}
                >
                    <h3 style={{ fontSize: 42, margin: "0 0 15px 0", color: "#ffd700" }}>
                        2️⃣ 回归任务
                    </h3>
                    <p style={{ fontSize: 34, margin: 0, lineHeight: 1.8 }}>
                        首选<strong style={{ color: "#ff6b6b" }}>MSE</strong><br />
                        需抗噪时切<strong style={{ color: "#ff6b6b" }}>Huber</strong>
                    </p>
                </div>

                {/* 准则3 */}
                <div
                    style={{
                        opacity: rule3Opacity,
                        backgroundColor: "rgba(255, 215, 0, 0.15)",
                        padding: 40,
                        borderRadius: 15,
                        border: "3px solid #ffd700"
                    }}
                >
                    <h3 style={{ fontSize: 42, margin: "0 0 15px 0", color: "#ffd700" }}>
                        3️⃣ 生成任务
                    </h3>
                    <p style={{ fontSize: 34, margin: 0, lineHeight: 1.8 }}>
                        需<strong style={{ color: "#ff6b6b" }}>组合损失</strong><br />
                        如GAN：对抗损失 + L1像素损失
                    </p>
                </div>
            </div>
        </div>
    );
};
