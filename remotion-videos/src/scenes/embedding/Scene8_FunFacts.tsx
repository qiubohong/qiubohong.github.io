import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    font: 'Noto Sans SC, Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    cardBg: "rgba(255,255,255,0.06)",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    accent: "#ffd200",
};

const facts = [
    {
        icon: "💰",
        title: '中文的"Token税"',
        points: [
            "相同信息中文比英文多消耗 40% Token（因分词更细）",
            '"人工智能" → 英文"AI"（1 Token）vs 中文（2-4 Token）',
        ],
        color: "#f0883e",
    },
    {
        icon: "🏥",
        title: "医疗Embedding的生死权重",
        points: [
            '"心肌梗死"向量与"胸痛"相似度达 0.93，与"胃炎"仅 0.12',
            "医生借该特性快速定位疑似误诊病例",
        ],
        color: "#3fb950",
    },
    {
        icon: "🐼",
        title: "多模态幻象",
        points: [
            'CLIP模型把"熊猫吃竹子"图片与文本向量对齐，跨模态相似度超 0.9',
            '却把"竹子手机支架"误判为关联对象',
        ],
        color: "#f778ba",
    },
];

export const Scene8_FunFacts: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });
    const titleY = interpolate(frame, [0, 20], [-20, 0], {
        extrapolateRight: "clamp",
    });

    const cardOpacities = facts.map((_, i) =>
        interpolate(frame, [30 + i * 25, 55 + i * 25], [0, 1], {
            extrapolateRight: "clamp",
        })
    );
    const cardY = facts.map((_, i) =>
        interpolate(frame, [30 + i * 25, 55 + i * 25], [30, 0], {
            extrapolateRight: "clamp",
        })
    );

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: THEME.font,
                padding: "48px 80px",
                overflow: "hidden",
            }}
        >
            {/* 标题 */}
            <h1
                style={{
                    fontSize: 56,
                    fontWeight: "bold",
                    margin: "0 0 40px 0",
                    flexShrink: 0,
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                🧊 冷知识
            </h1>

            {/* 冷知识卡片列表 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 28,
                    width: "100%",
                    flex: 1,
                    minHeight: 0,
                }}
            >
                {facts.map((fact, i) => (
                    <div
                        key={i}
                        style={{
                            background: THEME.cardBg,
                            borderRadius: 16,
                            padding: "24px 32px",
                            border: `2px solid ${fact.color}40`,
                            opacity: cardOpacities[i],
                            transform: `translateY(${cardY[i]}px)`,
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                        }}
                    >
                        {/* 卡片标题 */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 36 }}>{fact.icon}</span>
                            <h3
                                style={{
                                    fontSize: 30,
                                    fontWeight: "bold",
                                    color: fact.color,
                                    margin: 0,
                                }}
                            >
                                {fact.title}
                            </h3>
                        </div>

                        {/* 要点列表 */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 8 }}>
                            {fact.points.map((point, j) => (
                                <div
                                    key={j}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 10,
                                    }}
                                >
                                    <span
                                        style={{
                                            color: THEME.accent,
                                            fontSize: 22,
                                            lineHeight: "1.5",
                                            flexShrink: 0,
                                        }}
                                    >
                                        •
                                    </span>
                                    <span
                                        style={{
                                            fontSize: 24,
                                            color: THEME.textPrimary,
                                            lineHeight: "1.5",
                                        }}
                                    >
                                        {point}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </AbsoluteFill>
    );
};
