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

// 多轮压缩数据
const compressionLevels = [
    { label: "原始资料", value: 1000000, unit: "字", color: "#f85149", icon: "📦" },
    { label: "第一轮压缩", value: 200000, unit: "字", color: "#ffd200", icon: "🧃" },
    { label: "第二轮压缩", value: 40000, unit: "字", color: "#f0883e", icon: "🥤" },
    { label: "第三轮压缩", value: 8000, unit: "字", color: "#3fb950", icon: "💎" },
];

export const CCScene5_Advanced: React.FC = () => {
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

    // 每个压缩层级依次出现
    const levelOpacities = compressionLevels.map((_, i) =>
        interpolate(frame, [30 + i * 30, 55 + i * 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const levelScales = compressionLevels.map((_, i) =>
        interpolate(frame, [30 + i * 30, 55 + i * 30], [0.7, 1], {
            easing: Easing.out(Easing.back(1.5)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 进度条宽度（按比例缩放）
    const maxValue = compressionLevels[0].value;
    const barWidths = compressionLevels.map((level, i) => {
        const targetWidth = (level.value / maxValue) * 100;
        return interpolate(frame, [40 + i * 30, 80 + i * 30], [0, targetWidth], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });
    });

    // 数字计数动画
    const displayValues = compressionLevels.map((level, i) =>
        Math.floor(
            interpolate(frame, [35 + i * 30, 75 + i * 30], [0, level.value], {
                easing: Easing.out(Easing.cubic),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
            })
        )
    );

    // 结论弹入
    const conclusionOpacity = interpolate(frame, [165, 190], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionScale = interpolate(frame, [165, 190], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 最后一个高亮闪烁
    const gemHighlight = 0.7 + Math.sin(frame * 0.15) * 0.3;

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
                gap: 24,
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
                    进阶玩法
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
                    多轮压缩，层层提纯
                </h2>
            </div>

            {/* 压缩层级可视化 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 680 }}>
                {compressionLevels.map((level, i) => {
                    const isLast = i === compressionLevels.length - 1;
                    return (
                        <div
                            key={i}
                            style={{
                                opacity: levelOpacities[i],
                                transform: `scale(${levelScales[i]})`,
                                background: isLast ? `${level.color}18` : THEME.cardBg,
                                border: isLast ? `2px solid ${level.color}` : "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 14,
                                padding: "14px 20px",
                                display: "flex",
                                alignItems: "center",
                                gap: 16,
                            }}
                        >
                            <span style={{ fontSize: 28, flexShrink: 0 }}>{level.icon}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                    <span style={{ fontSize: 16, color: isLast ? level.color : THEME.textSecondary, fontWeight: isLast ? "bold" : "normal" }}>
                                        {level.label}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            color: isLast ? `rgba(${level.color === "#3fb950" ? "63,185,80" : "240,136,62"},${gemHighlight})` : level.color,
                                        }}
                                    >
                                        {displayValues[i].toLocaleString()} {level.unit}
                                    </span>
                                </div>
                                {/* 进度条 */}
                                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 4, height: 8, overflow: "hidden" }}>
                                    <div
                                        style={{
                                            width: `${barWidths[i]}%`,
                                            height: "100%",
                                            background: level.color,
                                            borderRadius: 4,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `scale(${conclusionScale})`,
                    background: `linear-gradient(135deg, rgba(63,185,80,0.15), rgba(63,185,80,0.05))`,
                    border: "2px solid rgba(63,185,80,0.5)",
                    borderRadius: 20,
                    padding: "16px 32px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 22, fontWeight: "bold", color: "#3fb950" }}>
                    💎 最后得到的几千字，就是你最核心的知识库！
                </div>
                <div style={{ fontSize: 16, color: THEME.textMuted, marginTop: 8 }}>
                    100万字 → 20万字 → 4万字 → 8000字，每次都用同样的方法
                </div>
            </div>
        </div>
    );
};
