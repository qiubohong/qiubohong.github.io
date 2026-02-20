import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ActivationScene3a_Functions_Part1: React.FC = () => {
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

    // 2个函数依次出现
    const func1Opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const func2Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const functions = [
        {
            name: "Sigmoid",
            formula: "f(x) = 1/(1+e^(-x))",
            range: "输出范围 0 到 1",
            usage: "适合二分类",
            problem: "⚠️ 梯度消失问题",
            opacity: func1Opacity,
            color: "#ff6b6b"
        },
        {
            name: "Tanh",
            formula: "f(x) = (e^x - e^(-x))/(e^x + e^(-x))",
            range: "输出范围 -1 到 1",
            usage: "常用于 RNN 和 LSTM",
            problem: "⚠️ 梯度消失问题依然存在",
            opacity: func2Opacity,
            color: "#4ecdc4"
        }
    ];

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#0f3460",
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
                    fontSize: 64,
                    fontWeight: "bold",
                    marginBottom: 50,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#ffd93d",
                }}
            >
                接下来看5个经典激活函数！
            </h1>

            {/* 函数列表 - 更宽松的布局 */}
            <div style={{ width: "85%", maxWidth: "1300px" }}>
                {functions.map((func, index) => (
                    <div
                        key={index}
                        style={{
                            fontSize: 32,
                            lineHeight: 1.6,
                            opacity: func.opacity,
                            backgroundColor: `rgba(${parseInt(func.color.slice(1, 3), 16)}, ${parseInt(func.color.slice(3, 5), 16)}, ${parseInt(func.color.slice(5, 7), 16)}, 0.15)`,
                            padding: 35,
                            borderRadius: 20,
                            marginBottom: 35,
                            borderLeft: `6px solid ${func.color}`,
                        }}
                    >
                        <div style={{ fontSize: 42, fontWeight: "bold", color: func.color, marginBottom: 15 }}>
                            {index + 1}. {func.name}
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <strong>公式</strong>：{func.formula}
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <strong>范围</strong>：{func.range}
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <strong>应用</strong>：{func.usage}
                        </div>
                        <div style={{ color: "#ffcc00" }}>
                            <strong>特点</strong>：{func.problem}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
