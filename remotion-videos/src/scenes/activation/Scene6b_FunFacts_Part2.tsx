import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ActivationScene6b_FunFacts_Part2: React.FC = () => {
    const frame = useCurrentFrame();

    // 2个冷知识依次出现
    const fact1Opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const fact2Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const facts = [
        {
            title: "谷歌用 AI 找函数",
            content: "强化学习在 10 万种函数中发现 Swish，\n超越人类设计！",
            icon: "🤖",
            opacity: fact1Opacity,
            color: "#95e1d3"
        },
        {
            title: "宇宙级应用",
            content: "欧洲核子中心 CERN 用 GELU 处理\n粒子碰撞数据，误差降低 38%！",
            icon: "🌌",
            opacity: fact2Opacity,
            color: "#ffd93d"
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
                                {index + 3}. {fact.title}
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
