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

export const MasterScene5_MultiIdentity: React.FC = () => {
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

    const cardsOpacity = interpolate(frame, [70, 100], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const conclusionOpacity = interpolate(frame, [110, 140], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const identities = [
        {
            icon: "💼",
            label: "打工人版",
            desc: "工作内容、行业术语、领导偏好、周报格式",
            color: "#f0883e",
        },
        {
            icon: "👨‍👩‍👧",
            label: "家长版",
            desc: "孩子的年龄、喜欢的故事类型、常见问题",
            color: "#58a6ff",
        },
        {
            icon: "🚀",
            label: "副业版",
            desc: "业余爱好的专业知识、常用术语、目标受众",
            color: "#3fb950",
        },
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
                进阶玩法：给不同身份
            </h2>
            <h2
                style={{
                    fontSize: 48,
                    fontWeight: "bold",
                    marginBottom: 20,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.3,
                }}
            >
                各办一张"身份证"
            </h2>

            {/* 介绍 */}
            <div
                style={{
                    fontSize: 26,
                    color: THEME.textSecondary,
                    marginBottom: 28,
                    opacity: introOpacity,
                    textAlign: "center",
                    lineHeight: 1.6,
                }}
            >
                你可能不止一个身份：上班、带娃、搞副业……<br />
                <strong style={{ color: THEME.accent }}>每个重要身份，都做一份大师提示词</strong>
            </div>

            {/* 身份卡片 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                    width: "88%",
                    opacity: cardsOpacity,
                    marginBottom: 24,
                }}
            >
                {identities.map((id) => (
                    <div
                        key={id.label}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: THEME.cardBg,
                            borderRadius: 16,
                            padding: "18px 24px",
                            gap: 18,
                            borderLeft: `5px solid ${id.color}`,
                        }}
                    >
                        <span style={{ fontSize: 40, minWidth: 50 }}>{id.icon}</span>
                        <div>
                            <div
                                style={{
                                    fontSize: 26,
                                    fontWeight: "bold",
                                    color: id.color,
                                    marginBottom: 6,
                                }}
                            >
                                {id.label}
                            </div>
                            <div style={{ fontSize: 22, color: THEME.textSecondary }}>
                                {id.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 结论 */}
            <div
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: conclusionOpacity,
                    color: THEME.accentSub,
                    padding: "14px 30px",
                    borderRadius: 12,
                    background: "rgba(255, 210, 0, 0.1)",
                    maxWidth: "88%",
                    lineHeight: 1.5,
                }}
            >
                用哪个场景，就上传对应的那份。AI在你每个角色面前，都像"老熟人" 🤝
            </div>
        </div>
    );
};
