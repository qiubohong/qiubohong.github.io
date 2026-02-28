import React from "react";
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from "remotion";

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

const CHAT_SHOW_START = 85;

const AI_CRITICISMS = [
    { icon: "💸", text: "你的现金流只够撑 3 个月，开分店至少需要 6 个月的储备，你算过吗？" },
    { icon: "👤", text: "你的核心店长只有一个，开了分店谁管老店？" },
    { icon: "📊", text: "你选的新址租金占比超过 25%，超过行业警戒线了。" },
];

const AI_SOLUTION = "最稳妥路径：\n① 先招副店长在老店带 3 个月\n② 用众筹方式解决资金压力\n③ 新店先租半年试水";

function useTypewriter(text: string, startFrame: number, frame: number, charsPerFrame = 1.3) {
    const elapsed = Math.max(0, frame - startFrame);
    return text.slice(0, Math.floor(elapsed * charsPerFrame));
}

export const ASSScene5_Case3_Decision: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 左侧三步骤
    const stepOpacities = [0, 1, 2].map(i =>
        interpolate(frame, [20 + i * 20, 40 + i * 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const stepScales = [0, 1, 2].map(i =>
        interpolate(frame, [20 + i * 20, 40 + i * 20], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 右侧对话框展开
    const chatPanelWidth = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 30], [0, 460], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const chatPanelOpacity = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // AI 批评气泡依次出现
    const criticOpacities = AI_CRITICISMS.map((_, i) =>
        interpolate(frame, [115 + i * 35, 130 + i * 35], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const criticYs = AI_CRITICISMS.map((_, i) =>
        interpolate(frame, [115 + i * 35, 130 + i * 35], [20, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 解决方案气泡
    const solutionOpacity = interpolate(frame, [230, 248], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const solutionY = interpolate(frame, [230, 248], [20, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const solutionText = useTypewriter(AI_SOLUTION, 235, frame, 1.2);

    // 效果总结
    const resultOpacity = interpolate(frame, [320, 345], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const resultScale = interpolate(frame, [320, 345], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const steps = [
        { num: "①", skill: "会压缩", icon: "🧃", color: "#3fb950", desc: "8万字资料 → 5000字精华" },
        { num: "②", skill: "会听骂", icon: "🪞", color: "#a371f7", desc: "魔鬼代言人，挑出三大致命问题" },
        { num: "③", skill: "会迭代", icon: "🔄", color: "#f778ba", desc: "追问最稳妥路径，找到出路" },
    ];

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: THEME.bg,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                gap: 32,
                overflow: "hidden",
            }}
        >
            {/* 左侧 */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
                <div style={{ opacity: titleOpacity }}>
                    <div style={{ fontSize: 14, color: THEME.accent, fontWeight: "bold", marginBottom: 6, letterSpacing: 1 }}>
                        场景三 · 创业者做决策
                    </div>
                    <h2 style={{ fontSize: 28, fontWeight: "bold", background: THEME.titleGradient, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", margin: "0 0 6px", lineHeight: 1.2 }}>
                        冲动变理性决策
                    </h2>
                    <div style={{ fontSize: 14, color: THEME.textMuted, marginBottom: 16 }}>
                        技能 7（压缩）+ 技能 6（听骂）+ 技能 4（迭代）
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: stepOpacities[i],
                                transform: `scale(${stepScales[i]})`,
                                background: `${step.color}12`,
                                border: `1px solid ${step.color}44`,
                                borderRadius: 12,
                                padding: "10px 14px",
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <span style={{ fontSize: 22, flexShrink: 0 }}>{step.icon}</span>
                            <div>
                                <div style={{ fontSize: 14, color: step.color, fontWeight: "bold" }}>{step.num} {step.skill}</div>
                                <div style={{ fontSize: 12, color: THEME.textMuted, marginTop: 2 }}>{step.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        opacity: resultOpacity,
                        transform: `scale(${resultScale})`,
                        marginTop: 14,
                        background: `linear-gradient(135deg, ${THEME.accent}22, ${THEME.accentSub}22)`,
                        border: `1px solid ${THEME.accent}`,
                        borderRadius: 12,
                        padding: "10px 14px",
                        fontSize: 13,
                        color: THEME.accentSub,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    💡 冲动的想法 → 理性的决策，后背发凉变胸有成竹
                </div>
            </div>

            {/* 右侧：AI 对话动画 */}
            <div
                style={{
                    width: chatPanelWidth,
                    flexShrink: 0,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    opacity: chatPanelOpacity,
                }}
            >
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "12px 12px 0 0", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                    <span style={{ marginLeft: 8, color: THEME.textMuted, fontSize: 13 }}>😈 魔鬼代言人模式</span>
                </div>

                <div style={{ background: "rgba(163,113,247,0.05)", border: "1px solid rgba(163,113,247,0.2)", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "14px 12px 18px", display: "flex", flexDirection: "column", gap: 10, minHeight: 400 }}>
                    {/* AI 批评 */}
                    {AI_CRITICISMS.map((c, i) => (
                        <div key={i} style={{ opacity: criticOpacities[i], transform: `translateY(${criticYs[i]}px)`, display: "flex", alignItems: "flex-start", gap: 8 }}>
                            <span style={{ fontSize: 18, flexShrink: 0 }}>{c.icon}</span>
                            <div style={{ background: "rgba(163,113,247,0.12)", border: "1px solid rgba(163,113,247,0.4)", color: THEME.textSecondary, borderRadius: "10px 10px 10px 2px", padding: "8px 12px", fontSize: 12, lineHeight: 1.6 }}>
                                {c.text}
                            </div>
                        </div>
                    ))}

                    {/* 用户追问 */}
                    <div style={{ opacity: solutionOpacity, transform: `translateY(${solutionY}px)`, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                        <div style={{ fontSize: 11, color: THEME.textMuted }}>老张 👤</div>
                        <div style={{ background: THEME.accent, color: "white", borderRadius: "10px 10px 2px 10px", padding: "8px 12px", fontSize: 12, lineHeight: 1.5 }}>
                            如果我就是想开，最稳妥的路径是什么？
                        </div>
                    </div>

                    {/* AI 解决方案 */}
                    <div style={{ opacity: solutionOpacity, transform: `translateY(${solutionY}px)`, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                        <div style={{ fontSize: 11, color: THEME.textMuted }}>🤖 AI</div>
                        <div style={{ background: "rgba(63,185,80,0.12)", border: "1px solid rgba(63,185,80,0.4)", color: THEME.textSecondary, borderRadius: "10px 10px 10px 2px", padding: "8px 12px", fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                            {solutionText}
                            {frame >= 235 && frame < 320 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "#3fb950", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
