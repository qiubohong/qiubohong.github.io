import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ActivationScene5a_HandsOn_Code: React.FC = () => {
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
                    fontSize: 80,
                    fontWeight: "bold",
                    marginBottom: 60,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#4ecca3",
                }}
            >
                💻 动手实验时间！
            </h1>

            {/* 代码块 - 更宽松的布局 */}
            <div
                style={{
                    opacity: codeOpacity,
                    backgroundColor: "#0f3460",
                    padding: 40,
                    borderRadius: 20,
                    width: "85%",
                    maxWidth: "1300px",
                    borderLeft: "8px solid #4ecca3",
                    boxShadow: "0 8px 32px rgba(78, 204, 163, 0.2)",
                }}
            >
                <div style={{ fontSize: 34, color: "#4ecca3", marginBottom: 25, fontWeight: "bold" }}>
                    用 Python 可视化这些函数超简单！
                </div>
                <pre
                    style={{
                        fontSize: 26,
                        lineHeight: 1.6,
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
        </div>
    );
};
