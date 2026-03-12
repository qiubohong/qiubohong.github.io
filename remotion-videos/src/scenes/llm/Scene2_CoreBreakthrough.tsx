import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

export const Scene2_CoreBreakthrough: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });
    const titleY = interpolate(frame, [0, 25], [-30, 0], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    // 卡片动画
    const card1Opacity = interpolate(frame, [30, 55], [0, 1], { extrapolateRight: "clamp" });
    const card1X = interpolate(frame, [30, 60], [-50, 0], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    const card2Opacity = interpolate(frame, [60, 85], [0, 1], { extrapolateRight: "clamp" });
    const card2X = interpolate(frame, [60, 90], [-50, 0], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    // 数字脉冲动画
    const scale1 = 1 + Math.sin(frame * 0.08) * 0.05;
    const scale2 = 1 + Math.sin(frame * 0.08 + 1) * 0.05;

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
                fontSize: 64,
                fontWeight: "bold",
                color: "white",
                marginBottom: 60,
                opacity: titleOpacity,
                transform: `translateY(${titleY}px)`,
                background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}>
                核心突破
            </h1>

            {/* 卡片容器 */}
            <div style={{ display: "flex", gap: 48, width: "100%", justifyContent: "center" }}>
                {/* 卡片1：规模效应 */}
                <div style={{
                    opacity: card1Opacity,
                    transform: `translateX(${card1X}px)`,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 20,
                    padding: 40,
                    width: 480,
                    border: "1px solid rgba(88, 166, 255, 0.2)",
                }}>
                    <div style={{
                        fontSize: 48,
                        fontWeight: "bold",
                        color: "#f0883e",
                        marginBottom: 20,
                        transform: `scale(${scale1})`,
                    }}>
                        1.8万亿
                    </div>
                    <div style={{
                        fontSize: 32,
                        color: "#c9d1d9",
                        fontWeight: 600,
                        marginBottom: 16,
                    }}>
                        规模效应
                    </div>
                    <div style={{
                        fontSize: 22,
                        color: "#8b949e",
                        lineHeight: 1.6,
                    }}>
                        GPT-4参数量<br />突破性能瓶颈
                    </div>
                </div>

                {/* 卡片2：零样本学习 */}
                <div style={{
                    opacity: card2Opacity,
                    transform: `translateX(${card2X}px)`,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 20,
                    padding: 40,
                    width: 480,
                    border: "1px solid rgba(63, 185, 80, 0.2)",
                }}>
                    <div style={{
                        fontSize: 48,
                        fontWeight: "bold",
                        color: "#3fb950",
                        marginBottom: 20,
                        transform: `scale(${scale2})`,
                    }}>
                        零样本
                    </div>
                    <div style={{
                        fontSize: 32,
                        color: "#c9d1d9",
                        fontWeight: 600,
                        marginBottom: 16,
                    }}>
                        零样本学习
                    </div>
                    <div style={{
                        fontSize: 22,
                        color: "#8b949e",
                        lineHeight: 1.6,
                    }}>
                        无需微调<br />直接处理新任务
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
