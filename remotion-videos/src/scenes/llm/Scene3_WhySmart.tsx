import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

export const Scene3_WhySmart: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 四个原因依次出现
    const reasons = [
        { title: "规模效应", desc: "量变引发质变", color: "#f0883e", icon: "📈" },
        { title: "自注意力机制", desc: "理解上下文关系", color: "#58a6ff", icon: "🔗" },
        { title: "训练范式调整", desc: "从死记硬背到举一反三", color: "#3fb950", icon: "🎓" },
        { title: "不可预知能力", desc: "涌现思维链推理", color: "#f778ba", icon: "✨" },
    ];

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: 'Noto Sans SC, Arial, sans-serif',
            padding: 60,
        }}>
            {/* 标题 */}
            <h1 style={{
                fontSize: 56,
                fontWeight: "bold",
                color: "white",
                marginBottom: 50,
                opacity: titleOpacity,
                background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}>
                为什么LLM能实现通用智能？
            </h1>

            {/* 四个原因网格 */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 30,
                width: "90%",
                maxWidth: 1200,
            }}>
                {reasons.map((reason, index) => {
                    const startFrame = 30 + index * 40;
                    const opacity = interpolate(frame, [startFrame, startFrame + 25], [0, 1], {
                        extrapolateRight: "clamp",
                    });
                    const scale = interpolate(frame, [startFrame, startFrame + 25], [0.9, 1], {
                        extrapolateRight: "clamp",
                        easing: Easing.out(Easing.cubic),
                    });

                    return (
                        <div key={index} style={{
                            opacity,
                            transform: `scale(${scale})`,
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: 16,
                            padding: 32,
                            border: `1px solid ${reason.color}33`,
                        }}>
                            <div style={{ fontSize: 40, marginBottom: 12 }}>{reason.icon}</div>
                            <div style={{
                                fontSize: 28,
                                color: reason.color,
                                fontWeight: 600,
                                marginBottom: 8,
                            }}>
                                {reason.title}
                            </div>
                            <div style={{
                                fontSize: 20,
                                color: "#8b949e",
                            }}>
                                {reason.desc}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
