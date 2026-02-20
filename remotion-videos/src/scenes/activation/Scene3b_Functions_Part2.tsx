import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ActivationScene3b_Functions_Part2: React.FC = () => {
    const frame = useCurrentFrame();

    // 2个函数依次出现
    const func1Opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const func2Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const functions = [
        {
            name: "Leaky ReLU",
            formula: "f(x) = max(0.01x, x)",
            range: "解决了 Dead ReLU 问题",
            usage: "在负数区保留微小梯度",
            problem: "✅ 更稳定",
            opacity: func1Opacity,
            color: "#f38181"
        },
        {
            name: "Swish（Google 黑科技！）",
            formula: "f(x) = x * σ(x)",
            range: "Google Brain 用 AI 找到",
            usage: "精度超越 ReLU",
            problem: "🔥 移动端首选！",
            opacity: func2Opacity,
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
                justifyContent: "center",
                alignItems: "center",
                padding: 80,
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%"
            }}
        >
            {/* 函数列表 - 更大的间距和字体 */}
            <div style={{ width: "85%", maxWidth: "1300px" }}>
                {functions.map((func, index) => (
                    <div
                        key={index}
                        style={{
                            fontSize: 36,
                            lineHeight: 1.7,
                            opacity: func.opacity,
                            backgroundColor: `rgba(${parseInt(func.color.slice(1, 3), 16)}, ${parseInt(func.color.slice(3, 5), 16)}, ${parseInt(func.color.slice(5, 7), 16)}, 0.15)`,
                            padding: 45,
                            borderRadius: 20,
                            marginBottom: 50,
                            borderLeft: `6px solid ${func.color}`,
                        }}
                    >
                        <div style={{ fontSize: 48, fontWeight: "bold", color: func.color, marginBottom: 20 }}>
                            {index + 4}. {func.name}
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <strong>公式</strong>：{func.formula}
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <strong>范围</strong>：{func.range}
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <strong>应用</strong>：{func.usage}
                        </div>
                        <div style={{ color: "#ffcc00", fontSize: 38 }}>
                            <strong>特点</strong>：{func.problem}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
