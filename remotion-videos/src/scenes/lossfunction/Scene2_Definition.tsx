import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const LossScene2_Definition: React.FC = () => {
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

    // 三要素依次出现
    const element1Opacity = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const element2Opacity = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const element3Opacity = interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 生活化理解动画
    const lifeOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
                    marginBottom: 50,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#ff6b6b"
                }}
            >
                损失函数是什么？
            </h2>

            {/* 核心三要素 */}
            <div style={{ width: "90%", maxWidth: 1600 }}>
                {/* 要素1 */}
                <div
                    style={{
                        opacity: element1Opacity,
                        backgroundColor: "rgba(255, 107, 107, 0.15)",
                        padding: 30,
                        borderRadius: 15,
                        marginBottom: 25,
                        borderLeft: "5px solid #ff6b6b"
                    }}
                >
                    <h3 style={{ fontSize: 42, margin: "0 0 15px 0", color: "#ff6b6b" }}>
                        1️⃣ 量化误差
                    </h3>
                    <p style={{ fontSize: 32, margin: 0, lineHeight: 1.6 }}>
                        计算预测结果与真实值的差距
                    </p>
                </div>

                {/* 要素2 */}
                <div
                    style={{
                        opacity: element2Opacity,
                        backgroundColor: "rgba(255, 107, 107, 0.15)",
                        padding: 30,
                        borderRadius: 15,
                        marginBottom: 25,
                        borderLeft: "5px solid #ff6b6b"
                    }}
                >
                    <h3 style={{ fontSize: 42, margin: "0 0 15px 0", color: "#ff6b6b" }}>
                        2️⃣ 优化导向
                    </h3>
                    <p style={{ fontSize: 32, margin: 0, lineHeight: 1.6 }}>
                        为梯度下降提供更新方向（最小化损失）
                    </p>
                </div>

                {/* 要素3 */}
                <div
                    style={{
                        opacity: element3Opacity,
                        backgroundColor: "rgba(255, 107, 107, 0.15)",
                        padding: 30,
                        borderRadius: 15,
                        marginBottom: 40,
                        borderLeft: "5px solid #ff6b6b"
                    }}
                >
                    <h3 style={{ fontSize: 42, margin: "0 0 15px 0", color: "#ff6b6b" }}>
                        3️⃣ 任务适配
                    </h3>
                    <p style={{ fontSize: 32, margin: 0, lineHeight: 1.6 }}>
                        不同任务需匹配专属损失函数
                    </p>
                </div>

                {/* 生活化理解 */}
                <div
                    style={{
                        opacity: lifeOpacity,
                        backgroundColor: "rgba(238, 90, 111, 0.2)",
                        padding: 35,
                        borderRadius: 15,
                        border: "2px solid #ee5a6f"
                    }}
                >
                    <p style={{ fontSize: 36, margin: 0, lineHeight: 1.8, fontStyle: "italic" }}>
                        💡 <strong>生活化理解：</strong><br />
                        驾校教练根据学员压线距离扣分<br />
                        损失函数就是那套评分标准<br />
                        让学员学会不压线
                    </p>
                </div>
            </div>
        </div>
    );
};
