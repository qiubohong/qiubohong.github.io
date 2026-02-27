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

export const TasteScene4_TasteLibrary: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const introOpacity = interpolate(frame, [35, 60], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const examplesOpacity = interpolate(frame, [70, 100], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const tipOpacity = interpolate(frame, [110, 140], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const examples = [
        { icon: "📣", role: "做营销", action: "收集小红书、抖音爆款文案", color: "#f0883e" },
        { icon: "🚀", role: "创业者", action: "看创业大赛获奖路演 pitch", color: "#58a6ff" },
        { icon: "💻", role: "程序员", action: "翻 GitHub Star 最多的开源项目", color: "#3fb950" },
        { icon: "👨‍👩‍👧", role: "家长", action: "分析孩子百听不厌的绘本节奏", color: "#f778ba" },
    ];

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
            {/* 步骤标签 */}
            <div
                style={{
                    fontSize: 24,
                    color: THEME.accent,
                    fontWeight: "bold",
                    marginBottom: 12,
                    opacity: titleOpacity,
                    letterSpacing: 2,
                }}
            >
                第一步
            </div>

            {/* 标题 */}
            <h2
                style={{
                    fontSize: 50,
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
                📚 建立你的"审美库"
            </h2>

            {/* 副标题 */}
            <div
                style={{
                    fontSize: 26,
                    color: THEME.textMuted,
                    marginBottom: 28,
                    opacity: introOpacity,
                    textAlign: "center",
                }}
            >
                多看好的，才知道什么是好
            </div>

            {/* 示例列表 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    width: "88%",
                    opacity: examplesOpacity,
                    marginBottom: 24,
                }}
            >
                {examples.map((ex, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: THEME.cardBg,
                            borderRadius: 14,
                            padding: "16px 24px",
                            gap: 16,
                            borderLeft: `4px solid ${ex.color}`,
                        }}
                    >
                        <span style={{ fontSize: 36 }}>{ex.icon}</span>
                        <div>
                            <span style={{ fontSize: 24, fontWeight: "bold", color: ex.color }}>
                                {ex.role}：
                            </span>
                            <span style={{ fontSize: 24, color: THEME.textSecondary }}>
                                {ex.action}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 关键提示 */}
            <div
                style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: tipOpacity,
                    color: THEME.accentSub,
                    padding: "16px 32px",
                    borderRadius: 14,
                    background: "rgba(255, 210, 0, 0.1)",
                    maxWidth: "85%",
                    lineHeight: 1.5,
                }}
            >
                随手记下好东西，审美库就慢慢建起来了 ✨
            </div>
        </div>
    );
};
