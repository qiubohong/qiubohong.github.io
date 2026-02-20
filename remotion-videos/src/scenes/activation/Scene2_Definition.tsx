import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ActivationScene2_Definition: React.FC = () => {
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

    // 定义框动画
    const defOpacity = interpolate(
        frame,
        [30, 60],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // 三大核心功能动画
    const feature1Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const feature2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const feature3Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#16213e",
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
            {/* 标题 */}
            <h1
                style={{
                    fontSize: 72,
                    fontWeight: "bold",
                    marginBottom: 50,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#4ecca3",
                }}
            >
                激活函数到底是什么？
            </h1>

            {/* 简化定义 - 抖音快节奏版本 */}
            <div
                style={{
                    fontSize: 48,
                    lineHeight: 1.8,
                    textAlign: "center",
                    opacity: defOpacity,
                    backgroundColor: "rgba(78, 204, 163, 0.1)",
                    padding: 60,
                    borderRadius: 20,
                    borderLeft: "6px solid #4ecca3",
                    maxWidth: "85%",
                }}
            >
                <p style={{ margin: 0 }}>
                    <strong style={{ fontSize: 56, color: "#4ecca3" }}>简单说</strong><br />
                    <br />
                    它就是神经网络的<strong style={{ color: "#ffd700" }}>"智能开关"</strong><br />
                    <br />
                    决定信号是否向下传递<br />
                    <br />
                    <span style={{ fontSize: 40, color: "#cccccc" }}>
                        就像大脑神经元超过阈值才放电一样
                    </span>
                </p>
            </div>
        </div>
    );
};
