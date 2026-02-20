import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const LossScene5_Functions_Part2: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 两个函数依次出现
    const func1Opacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const func2Opacity = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#1a1a2e",
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
                    marginBottom: 80,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#ff6b6b"
                }}
            >
                五大经典损失函数（2/2）
            </h2>

            {/* 函数列表 */}
            <div style={{ width: "90%", maxWidth: 1600, display: "flex", flexDirection: "column", gap: 40 }}>
                {/* Focal Loss */}
                <div
                    style={{
                        opacity: func1Opacity,
                        backgroundColor: "rgba(255, 107, 107, 0.15)",
                        padding: 40,
                        borderRadius: 15,
                        borderLeft: "5px solid #ff6b6b"
                    }}
                >
                    <h3 style={{ fontSize: 48, margin: "0 0 20px 0", color: "#ff6b6b" }}>
                        4️⃣ 焦点损失（Focal Loss）
                    </h3>
                    <p style={{ fontSize: 36, margin: "0 0 15px 0", lineHeight: 1.6 }}>
                        <strong>任务：</strong>分类 | <strong>抗噪性：</strong>中
                    </p>
                    <p style={{ fontSize: 36, margin: 0, lineHeight: 1.6, color: "#aaa" }}>
                        <strong>应用：</strong>医学图像分析、异常检测
                    </p>
                </div>

                {/* Huber Loss */}
                <div
                    style={{
                        opacity: func2Opacity,
                        backgroundColor: "rgba(255, 107, 107, 0.15)",
                        padding: 40,
                        borderRadius: 15,
                        borderLeft: "5px solid #ff6b6b"
                    }}
                >
                    <h3 style={{ fontSize: 48, margin: "0 0 20px 0", color: "#ff6b6b" }}>
                        5️⃣ Huber损失
                    </h3>
                    <p style={{ fontSize: 36, margin: "0 0 15px 0", lineHeight: 1.6 }}>
                        <strong>任务：</strong>生成 | <strong>抗噪性：</strong>强 ⭐
                    </p>
                    <p style={{ fontSize: 36, margin: 0, lineHeight: 1.6, color: "#aaa" }}>
                        <strong>应用：</strong>自动驾驶（平衡噪声与异常值）
                    </p>
                </div>
            </div>
        </div>
    );
};
