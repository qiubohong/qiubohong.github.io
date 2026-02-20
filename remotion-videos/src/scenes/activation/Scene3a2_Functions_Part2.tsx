import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ActivationScene3a2_Functions_Part2: React.FC = () => {
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

    // 1个函数出现
    const func1Opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const functions = [
        {
            name: "ReLU（90%现代网络首选！）",
            formula: "f(x) = max(0, x)",
            range: "公式超简单",
            usage: "解决了梯度消失",
            problem: "⚠️ Dead ReLU 问题",
            opacity: func1Opacity,
            color: "#95e1d3"
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
                padding: 100,
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%"
            }}
        >
            {/* 标题 */}
            <h1
                style={{
                    fontSize: 85,
                    fontWeight: "bold",
                    marginBottom: 100,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#ffd93d",
                }}
            >
                第3个：最流行的激活函数！
            </h1>

            {/* 函数列表 - 超宽松的布局 */}
            <div style={{ width: "80%", maxWidth: "1200px" }}>
                {functions.map((func, index) => (
                    <div
                        key={index}
                        style={{
                            fontSize: 45,
                            lineHeight: 1.8,
                            opacity: func.opacity,
                            backgroundColor: `rgba(${parseInt(func.color.slice(1, 3), 16)}, ${parseInt(func.color.slice(3, 5), 16)}, ${parseInt(func.color.slice(5, 7), 16)}, 0.15)`,
                            padding: 60,
                            borderRadius: 25,
                            borderLeft: `8px solid ${func.color}`,
                        }}
                    >
                        <div style={{ fontSize: 60, fontWeight: "bold", color: func.color, marginBottom: 30 }}>
                            3. {func.name}
                        </div>
                        <div style={{ marginBottom: 15 }}>
                            <strong>公式</strong>：{func.formula}
                        </div>
                        <div style={{ marginBottom: 15 }}>
                            <strong>范围</strong>：{func.range}
                        </div>
                        <div style={{ marginBottom: 15 }}>
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
