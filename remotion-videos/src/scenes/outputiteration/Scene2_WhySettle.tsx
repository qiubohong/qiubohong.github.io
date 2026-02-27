import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentSub: "#ffd200",
    textMuted: "#8b949e",
    textSecondary: "#c9d1d9",
    cardBg: "rgba(255,255,255,0.06)",
};

export const OutputScene2_WhySettle: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const caseOpacity = interpolate(frame, [35, 65], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const caseY = interpolate(frame, [35, 65], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const numberOpacity = interpolate(frame, [80, 110], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 数字计数动画：0 → 70000
    const countNum = Math.floor(
        interpolate(frame, [90, 180], [0, 70000], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    const conclusionOpacity = interpolate(frame, [190, 220], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionScale = interpolate(frame, [190, 220], [0.9, 1], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 小动画：可口可乐logo浮动
    const floatY = Math.sin(frame * 0.06) * 5;

    return (
        <div
            style={{
                flex: 1,
                background: THEME.bg,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 60px",
                fontFamily: THEME.fontFamily,
                color: "white",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
            }}
        >
            {/* 标题 */}
            <h2
                style={{
                    fontSize: 48,
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.3,
                }}
            >
                为什么"差不多"其实是"差很多"？
            </h2>
            <div
                style={{
                    fontSize: 22,
                    color: THEME.textMuted,
                    marginBottom: 32,
                    opacity: titleOpacity,
                    textAlign: "center",
                }}
            >
                顶尖AI使用者的秘密：把AI当璞玉，反复雕琢
            </div>

            {/* 可口可乐案例卡片 */}
            <div
                style={{
                    backgroundColor: "rgba(240,136,62,0.1)",
                    borderRadius: 20,
                    padding: "28px 40px",
                    borderLeft: `6px solid ${THEME.accent}`,
                    maxWidth: 860,
                    width: "100%",
                    opacity: caseOpacity,
                    transform: `translateY(${caseY}px)`,
                    marginBottom: 28,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16 }}>
                    <span
                        style={{
                            fontSize: 52,
                            transform: `translateY(${floatY}px)`,
                            display: "inline-block",
                        }}
                    >
                        🥤
                    </span>
                    <div>
                        <div style={{ fontSize: 26, fontWeight: "bold", color: THEME.accent, marginBottom: 4 }}>
                            可口可乐 AI 圣诞广告
                        </div>
                        <div style={{ fontSize: 20, color: THEME.textSecondary }}>
                            5位AI专家，反复调整提示词……
                        </div>
                    </div>
                </div>

                {/* 数字高亮 */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 16,
                        opacity: numberOpacity,
                        padding: "16px 0",
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <div
                            style={{
                                fontSize: 72,
                                fontWeight: "bold",
                                color: THEME.accentSub,
                                lineHeight: 1,
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            {countNum.toLocaleString()}
                        </div>
                        <div style={{ fontSize: 22, color: THEME.textMuted, marginTop: 6 }}>次提示词调整</div>
                    </div>
                    <div
                        style={{
                            width: 2,
                            height: 80,
                            backgroundColor: "rgba(255,255,255,0.15)",
                        }}
                    />
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 52, fontWeight: "bold", color: "#58a6ff", lineHeight: 1 }}>
                            5
                        </div>
                        <div style={{ fontSize: 22, color: THEME.textMuted, marginTop: 6 }}>位AI专家</div>
                    </div>
                    <div
                        style={{
                            width: 2,
                            height: 80,
                            backgroundColor: "rgba(255,255,255,0.15)",
                        }}
                    />
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 52, fontWeight: "bold", color: "#3fb950", lineHeight: 1 }}>
                            1.4万
                        </div>
                        <div style={{ fontSize: 22, color: THEME.textMuted, marginTop: 6 }}>次/人均</div>
                    </div>
                </div>
            </div>

            {/* 结论 */}
            <div
                style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: conclusionOpacity,
                    transform: `scale(${conclusionScale})`,
                    color: THEME.accentSub,
                    padding: "18px 36px",
                    borderRadius: 16,
                    background: "rgba(255, 210, 0, 0.1)",
                    maxWidth: "88%",
                    lineHeight: 1.5,
                }}
            >
                🏆 精品，都是改出来的！
            </div>
        </div>
    );
};
