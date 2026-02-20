import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ActivationScene3_Functions: React.FC = () => {
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

    // 5个函数依次出现
    const func1Opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const func2Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const func3Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const func4Opacity = interpolate(frame, [210, 240], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const func5Opacity = interpolate(frame, [270, 300], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
        },
        {
            name: "ReLU（90%现代网络首选！）",
            formula: "f(x) = max(0, x)",
            range: "公式超简单",
            usage: "解决了梯度消失",
            problem: "⚠️ Dead ReLU 问题",
            opacity: func3Opacity,
            color: "#95e1d3"
        },
        {
            name: "Leaky ReLU",
            formula: "f(x) = max(0.01x, x)",
            range: "解决了 Dead ReLU 问题",
            usage: "在负数区保留微小梯度",
            problem: "✅ 更稳定",
            opacity: func4Opacity,
            color: "#f38181"
        },
        {
            name: "Swish（Google 黑科技！）",
            formula: "f(x) = x * σ(x)",
            range: "Google Brain 用 AI 找到",
            usage: "精度超越 ReLU",
            problem: "🔥 移动端首选！",
            opacity: func5Opacity,
            color: "#aa96da"
        }
    ];

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#0f3460",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 50,
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%",
                overflowY: "auto"
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
                    color: "#ffd93d",
                }}
            >
                接下来看5个经典激活函数！
            </h1>

            {/* 函数列表 */}
            <div style={{ width: "95%", maxWidth: "1600px" }}>
                {functions.map((func, index) => (
                    <div
                        key={index}
                        style={{
                            fontSize: 28,
                            lineHeight: 1.5,
                            opacity: func.opacity,
                            backgroundColor: `rgba(${parseInt(func.color.slice(1, 3), 16)}, ${parseInt(func.color.slice(3, 5), 16)}, ${parseInt(func.color.slice(5, 7), 16)}, 0.15)`,
                            padding: 25,
                            borderRadius: 15,
                            marginBottom: 15,
                            borderLeft: `5px solid ${func.color}`,
                        }}
                    >
                        <div style={{ fontSize: 36, fontWeight: "bold", color: func.color, marginBottom: 10 }}>
                            {index + 1}. {func.name}
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>公式</strong>：{func.formula}
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>范围</strong>：{func.range}
                        </div>
                        <div style={{ marginBottom: 8 }}>
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
