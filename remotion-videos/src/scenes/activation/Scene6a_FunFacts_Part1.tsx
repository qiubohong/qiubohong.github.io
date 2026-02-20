import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ActivationScene6a_FunFacts_Part1: React.FC = () => {
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

    // 2个冷知识依次出现
    const fact1Opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const fact2Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const facts = [
        {
            title: "神经元激活率",
            content: "Sigmoid 网络只有 3-5% 的神经元激活，太浪费了！\nReLU 网络激活率高达 50%，效率爆表！",
            icon: "🔥",
            opacity: fact1Opacity,
            color: "#ff6b6b"
        },
        {
            title: "Swish 的灵感来自生物",
            content: "它的平滑性源于神经突触的\n离子通道动力学",
            icon: "🧬",
            opacity: fact2Opacity,
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
                    fontSize: 72,
                    fontWeight: "bold",
                    marginBottom: 70,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#ffd93d",
                }}
            >
                🎉 最后分享几个超酷的冷知识！
            </h1>

            {/* 冷知识列表 - 更宽松的布局 */}
            <div style={{ width: "85%", maxWidth: "1300px" }}>
                {facts.map((fact, index) => (
                    <div
                        key={index}
                        style={{
                            fontSize: 36,
                            lineHeight: 1.8,
                            opacity: fact.opacity,
                            backgroundColor: `rgba(${parseInt(fact.color.slice(1, 3), 16)}, ${parseInt(fact.color.slice(3, 5), 16)}, ${parseInt(fact.color.slice(5, 7), 16)}, 0.15)`,
                            padding: 45,
                            borderRadius: 20,
                            marginBottom: 40,
                            borderLeft: `6px solid ${fact.color}`,
                        }}
                    >
                        <div style={{ fontSize: 52, marginBottom: 20 }}>
                            <span style={{ marginRight: 20 }}>{fact.icon}</span>
                            <strong style={{ color: fact.color }}>
                                {index + 1}. {fact.title}
                            </strong>
                        </div>
                        <div style={{
                            fontSize: 34,
                            color: "#e0e0e0",
                            whiteSpace: "pre-line",
                            marginLeft: 80
                        }}>
                            {fact.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
