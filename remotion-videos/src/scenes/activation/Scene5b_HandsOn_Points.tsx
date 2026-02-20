import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ActivationScene5b_HandsOn_Points: React.FC = () => {
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

    // 观察重点动画
    const point1Opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const point2Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#16213e",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 70,
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%"
            }}
        >
            {/* 标题 */}
            <h1
                style={{
                    fontSize: 80,
                    fontWeight: "bold",
                    marginBottom: 70,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#ffd700",
                }}
            >
                📊 观察重点
            </h1>

            {/* 观察重点列表 - 更宽松的布局 */}
            <div style={{ width: "85%", maxWidth: "1300px" }}>
                {/* 第一个重点 */}
                <div
                    style={{
                        fontSize: 38,
                        lineHeight: 1.8,
                        opacity: point1Opacity,
                        backgroundColor: "rgba(255, 215, 0, 0.12)",
                        padding: 45,
                        borderRadius: 20,
                        borderLeft: "8px solid #ffd700",
                        marginBottom: 50,
                        boxShadow: "0 8px 32px rgba(255, 215, 0, 0.15)",
                    }}
                >
                    <div style={{ fontSize: 48, fontWeight: "bold", color: "#ffd700", marginBottom: 20 }}>
                        第一，Sigmoid 和 Tanh 的饱和区
                    </div>
                    <div style={{ fontSize: 34, color: "#e0e0e0", marginLeft: 30 }}>
                        两端平坦部分就是梯度消失的根源
                    </div>
                </div>

                {/* 第二个重点 */}
                <div
                    style={{
                        fontSize: 38,
                        lineHeight: 1.8,
                        opacity: point2Opacity,
                        backgroundColor: "rgba(255, 215, 0, 0.12)",
                        padding: 45,
                        borderRadius: 20,
                        borderLeft: "8px solid #ffd700",
                        boxShadow: "0 8px 32px rgba(255, 215, 0, 0.15)",
                    }}
                >
                    <div style={{ fontSize: 48, fontWeight: "bold", color: "#ffd700", marginBottom: 20 }}>
                        第二，ReLU 的负数截断
                    </div>
                    <div style={{ fontSize: 34, color: "#e0e0e0", marginLeft: 30 }}>
                        直观看到 Dead ReLU 问题
                    </div>
                </div>
            </div>
        </div>
    );
};
