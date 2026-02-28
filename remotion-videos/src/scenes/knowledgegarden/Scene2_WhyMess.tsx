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

const messItems = [
    { icon: "💬", text: "大师提示词躺在某个聊天记录里", color: "#f0883e" },
    { icon: "📂", text: "压缩资料散落在手机和电脑各个文件夹", color: "#58a6ff" },
    { icon: "📝", text: "系统提示词存成了\"111\"\"新建文档\"\"最终版\"", color: "#3fb950" },
    { icon: "👥", text: "团队每人用自己的方式，输出天差地别", color: "#f778ba" },
];

const consequences = [
    { icon: "⏰", text: "本来一键搞定，你得翻半小时聊天记录" },
    { icon: "🗣️", text: "本来统一输出，结果大家各说各话" },
    { icon: "♻️", text: "本来可以复用，因为找不到只能重新写" },
];

export const KGScene2_WhyMess: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 四种混乱状态
    const messOpacities = messItems.map((_, i) =>
        interpolate(frame, [25 + i * 18, 48 + i * 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const messScales = messItems.map((_, i) =>
        interpolate(frame, [25 + i * 18, 48 + i * 18], [0.8, 1], {
            easing: Easing.out(Easing.back(1.5)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 花园比喻
    const gardenOpacity = interpolate(frame, [105, 130], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const gardenY = interpolate(frame, [105, 130], [20, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 后果列表
    const consOpacities = consequences.map((_, i) =>
        interpolate(frame, [145 + i * 18, 168 + i * 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 背景装饰浮动
    const floatY = Math.sin(frame * 0.04) * 7;

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
                gap: 20,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景装饰 */}
            <div style={{ position: "absolute", top: "10%", right: "5%", fontSize: 60, opacity: 0.06, transform: `translateY(${floatY}px)` }}>🌾</div>
            <div style={{ position: "absolute", bottom: "10%", left: "4%", fontSize: 50, opacity: 0.06, transform: `translateY(${-floatY}px)` }}>🍂</div>

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, textAlign: "center" }}>
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    问题根源
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
                    为什么你的 AI 会变成"一团乱麻"？
                </h2>
            </div>

            {/* 四种混乱状态 2×2 */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 14,
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                {messItems.map((item, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: messOpacities[i],
                            transform: `scale(${messScales[i]})`,
                            background: `${item.color}12`,
                            border: `1px solid ${item.color}44`,
                            borderRadius: 14,
                            padding: "14px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                        <div style={{ fontSize: 15, color: THEME.textMuted, lineHeight: 1.5 }}>
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* 花园比喻 */}
            <div
                style={{
                    opacity: gardenOpacity,
                    transform: `translateY(${gardenY}px)`,
                    textAlign: "center",
                    fontSize: 18,
                    color: THEME.textSecondary,
                    maxWidth: 640,
                    lineHeight: 1.6,
                }}
            >
                这就像一座没人打理的花园——
                <span style={{ color: THEME.accent, fontWeight: "bold" }}>杂草丛生，你想找一朵花，得扒拉半天</span>
            </div>

            {/* 后果 */}
            <div style={{ display: "flex", gap: 14, width: "100%", maxWidth: 680 }}>
                {consequences.map((item, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            opacity: consOpacities[i],
                            background: "rgba(248,81,73,0.08)",
                            border: "1px solid rgba(248,81,73,0.25)",
                            borderRadius: 12,
                            padding: "12px 14px",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                        <div style={{ fontSize: 14, color: THEME.textMuted, lineHeight: 1.5 }}>{item.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
