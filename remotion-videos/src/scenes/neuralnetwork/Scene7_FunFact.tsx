import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const NeuralNetworkScene7_FunFact: React.FC = () => {
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
    const content1Opacity = interpolate(
        frame,
        [40, 70],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    const content2Opacity = interpolate(
        frame,
        [100, 130],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // 数字闪烁效果
    const numberScale = interpolate(
        frame % 60,
        [0, 30, 60],
        [1, 1.1, 1],
        {
            easing: Easing.inOut(Easing.ease),
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
                padding: 80,
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
                    marginBottom: 80,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#667eea",
                    width: "100%"
                }}
            >
                🎉 冷知识
            </h1>

            {/* 第一个事实 */}
            <div
                style={{
                    opacity: content1Opacity,
                    backgroundColor: "rgba(102, 126, 234, 0.15)",
                    padding: 50,
                    borderRadius: 20,
                    marginBottom: 50,
                    width: "100%",
                    maxWidth: "1400px",
                    borderLeft: "8px solid #667eea"
                }}
            >
                <p
                    style={{
                        fontSize: 40,
                        lineHeight: 1.8,
                        margin: 0,
                        textAlign: "center"
                    }}
                >
                    GPT-3的神经元数量（
                    <span
                        style={{
                            color: "#f093fb",
                            fontWeight: "bold",
                            fontSize: 48,
                            transform: `scale(${numberScale})`,
                            display: "inline-block"
                        }}
                    >
                        1750亿
                    </span>
                    ）≈ 人类大脑神经元（
                    <span
                        style={{
                            color: "#f5576c",
                            fontWeight: "bold",
                            fontSize: 48
                        }}
                    >
                        860亿
                    </span>
                    ）的 <strong style={{ color: "#ffd700" }}>2倍</strong>
                </p>
            </div>

            {/* 第二个事实 */}
            <div
                style={{
                    opacity: content2Opacity,
                    backgroundColor: "rgba(245, 87, 108, 0.15)",
                    padding: 50,
                    borderRadius: 20,
                    width: "100%",
                    maxWidth: "1400px",
                    borderLeft: "8px solid #f5576c"
                }}
            >
                <p
                    style={{
                        fontSize: 40,
                        lineHeight: 1.8,
                        margin: 0,
                        textAlign: "center"
                    }}
                >
                    但人脑能耗仅 <strong style={{ color: "#667eea" }}>20瓦</strong>，<br />
                    而训练GPT-3需
                    <span
                        style={{
                            color: "#ffd700",
                            fontWeight: "bold",
                            fontSize: 48,
                            margin: "0 10px"
                        }}
                    >
                        190万度电
                    </span>
                    <br />
                    <span style={{ fontSize: 32, color: "#aaa" }}>
                        （相当于200个家庭的年用电量）！
                    </span>
                </p>
            </div>

            {/* 底部装饰 */}
            <div
                style={{
                    marginTop: 60,
                    fontSize: 60,
                    opacity: content2Opacity
                }}
            >
                🧠⚡💡
            </div>
        </div>
    );
};