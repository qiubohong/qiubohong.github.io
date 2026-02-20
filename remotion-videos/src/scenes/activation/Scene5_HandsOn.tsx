import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ActivationScene5_HandsOn: React.FC = () => {
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

    // 代码块动画
    const codeOpacity = interpolate(
        frame,
        [30, 60],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // 观察重点动画
    const pointsOpacity = interpolate(
        frame,
        [90, 120],
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
                padding: 50,
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
                    marginBottom: 40,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#4ecca3",
                }}
            >
                动手实验时间！
            </h1>

            {/* 代码块 - 优化布局 */}
            <div
                style={{
                    opacity: codeOpacity,
                    backgroundColor: "#0f3460",
                    padding: 30,
                    borderRadius: 15,
                    width: "88%",
                    maxWidth: "1300px",
                    marginBottom: 35,
                    borderLeft: "6px solid #4ecca3",
                }}
            >
                <div style={{ fontSize: 28, color: "#4ecca3", marginBottom: 15, fontWeight: "bold" }}>
                    💻 用 Python 可视化这些函数超简单！
                </div>
                <pre
                    style={{
                        fontSize: 22,
                        lineHeight: 1.5,
                        color: "#e0e0e0",
                        margin: 0,
                        fontFamily: "Consolas, Monaco, monospace",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {`import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-5, 5, 100)
functions = {
    'Sigmoid': lambda x: 1/(1+np.exp(-x)),
    'Tanh': np.tanh,
    'ReLU': lambda x: np.maximum(0, x),
    'Swish': lambda x: x/(1+np.exp(-x))
}

plt.figure(figsize=(10,6))
for name, func in functions.items():
    plt.plot(x, func(x), label=name, lw=3)
plt.legend()
plt.show()`}
                </pre>
            </div>

            {/* 观察重点 - 优化布局 */}
            <div
                style={{
                    opacity: pointsOpacity,
                    width: "88%",
                    maxWidth: "1300px",
                }}
            >
                <h2
                    style={{
                        fontSize: 42,
                        fontWeight: "bold",
                        marginBottom: 25,
                        color: "#ffd700",
                    }}
                >
                    📊 观察重点
                </h2>

                <div
                    style={{
                        fontSize: 30,
                        lineHeight: 1.7,
                        backgroundColor: "rgba(255, 215, 0, 0.1)",
                        padding: 25,
                        borderRadius: 15,
                        borderLeft: "5px solid #ffd700",
                    }}
                >
                    <div style={{ marginBottom: 18 }}>
                        <strong>第一</strong>，Sigmoid 和 Tanh 的饱和区<br />
                        <span style={{ fontSize: 26, color: "#cccccc", marginLeft: 30 }}>
                            两端平坦部分就是梯度消失的根源
                        </span>
                    </div>
                    <div>
                        <strong>第二</strong>，ReLU 的负数截断<br />
                        <span style={{ fontSize: 26, color: "#cccccc", marginLeft: 30 }}>
                            直观看到 Dead ReLU 问题
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
