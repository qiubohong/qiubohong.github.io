import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: 'Noto Sans SC, Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentSub: "#ffd200",
    textMuted: "#8b949e",
    textSecondary: "#c9d1d9",
    cardBg: "rgba(255,255,255,0.06)",
};

export const CCScene3_WhatIsCompression: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleY = interpolate(frame, [0, 25], [-30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 橙子→浓缩汁动画
    const orangeOpacity = interpolate(frame, [30, 55], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const orangeScale = interpolate(frame, [30, 55], [0.5, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 箭头动画
    const arrowOpacity = interpolate(frame, [65, 85], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const arrowX = interpolate(frame, [65, 85], [-20, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 浓缩汁出现
    const juiceOpacity = interpolate(frame, [90, 115], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const juiceScale = interpolate(frame, [90, 115], [0.5, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 数字对比：10万字 → 5000字
    const bigNumOpacity = interpolate(frame, [125, 150], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const smallNumOpacity = interpolate(frame, [160, 185], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 数字计数动画
    const bigNum = Math.floor(
        interpolate(frame, [125, 165], [0, 100000], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const smallNum = Math.floor(
        interpolate(frame, [160, 200], [0, 5000], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 结论弹入
    const conclusionOpacity = interpolate(frame, [210, 235], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionScale = interpolate(frame, [210, 235], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 橙子浮动
    const floatY = Math.sin(frame * 0.06) * 6;

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: THEME.bg,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "50px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                gap: 28,
            }}
        >
            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    核心概念
                </div>
                <h2
                    style={{
                        fontSize: 44,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        margin: 0,
                        lineHeight: 1.2,
                    }}
                >
                    什么叫"上下文压缩"？
                </h2>
            </div>

            {/* 浓缩果汁比喻 */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 24,
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                {/* 一大筐橙子 */}
                <div
                    style={{
                        opacity: orangeOpacity,
                        transform: `scale(${orangeScale}) translateY(${floatY}px)`,
                        textAlign: "center",
                        flex: 1,
                    }}
                >
                    <div style={{ fontSize: 64 }}>🍊🍊🍊</div>
                    <div style={{ fontSize: 16, color: THEME.textMuted, marginTop: 8 }}>一大筐橙子</div>
                    <div style={{ fontSize: 14, color: THEME.textMuted }}>（海量原始资料）</div>
                </div>

                {/* 箭头 */}
                <div
                    style={{
                        opacity: arrowOpacity,
                        transform: `translateX(${arrowX}px)`,
                        fontSize: 36,
                        color: THEME.accent,
                        flexShrink: 0,
                    }}
                >
                    🧃→
                </div>

                {/* 浓缩汁 */}
                <div
                    style={{
                        opacity: juiceOpacity,
                        transform: `scale(${juiceScale}) translateY(${-floatY}px)`,
                        textAlign: "center",
                        flex: 1,
                    }}
                >
                    <div style={{ fontSize: 64 }}>🥤</div>
                    <div style={{ fontSize: 16, color: THEME.accentSub, marginTop: 8, fontWeight: "bold" }}>一小杯浓缩汁</div>
                    <div style={{ fontSize: 14, color: THEME.textMuted }}>（精华压缩版）</div>
                </div>
            </div>

            {/* 数字对比 */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div
                    style={{
                        flex: 1,
                        opacity: bigNumOpacity,
                        background: "rgba(248,81,73,0.12)",
                        border: "1px solid rgba(248,81,73,0.3)",
                        borderRadius: 16,
                        padding: "18px 20px",
                        textAlign: "center",
                    }}
                >
                    <div style={{ fontSize: 36, fontWeight: "bold", color: "#f85149" }}>
                        {bigNum.toLocaleString()} 字
                    </div>
                    <div style={{ fontSize: 15, color: THEME.textMuted, marginTop: 6 }}>原始资料</div>
                </div>

                <div style={{ fontSize: 28, color: THEME.accent, flexShrink: 0 }}>→</div>

                <div
                    style={{
                        flex: 1,
                        opacity: smallNumOpacity,
                        background: "rgba(63,185,80,0.12)",
                        border: "1px solid rgba(63,185,80,0.3)",
                        borderRadius: 16,
                        padding: "18px 20px",
                        textAlign: "center",
                    }}
                >
                    <div style={{ fontSize: 36, fontWeight: "bold", color: "#3fb950" }}>
                        {smallNum.toLocaleString()} 字
                    </div>
                    <div style={{ fontSize: 15, color: THEME.textMuted, marginTop: 6 }}>精华压缩版</div>
                </div>
            </div>

            {/* 结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `scale(${conclusionScale})`,
                    background: `linear-gradient(135deg, ${THEME.accent}22, ${THEME.accentSub}22)`,
                    border: `2px solid ${THEME.accent}`,
                    borderRadius: 20,
                    padding: "16px 32px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 22, fontWeight: "bold", color: THEME.accentSub }}>
                    让 AI 先把海量信息"榨干"，只留最精华的部分，再用精华版干活！
                </div>
            </div>
        </div>
    );
};
