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

const CHAT_SHOW_START = 80;

// 两轮对话：第一性原理深挖
const ROUND1_USER = "请用第一性原理，把你刚才的批评拆解到最底层。";
const ROUND1_AI = "🔍 拆到底层：\n开奶茶店的本质是——\n你真的了解用户为什么买奶茶吗？\n你清楚一杯奶茶的成本结构吗？\n你知道怎么做复购吗？";
const ROUND2_USER = "这些问题我都没想清楚……";
const ROUND2_AI = "✅ 这就是第一性原理的价值！\n从根上理清问题，而不是\n停留在表面修修补补。";

function useTypewriter(text: string, startFrame: number, frame: number, charsPerFrame = 1.5) {
    const elapsed = Math.max(0, frame - startFrame);
    const visibleChars = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, visibleChars);
}

export const DAScene4_DeepDive: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 左侧概念卡片
    const conceptOpacity = interpolate(frame, [30, 55], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conceptY = interpolate(frame, [30, 55], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 右侧对话框展开
    const chatPanelWidth = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 30], [0, 480], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const chatPanelOpacity = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 第1轮用户气泡：frame 110
    const u1Spring = spring({ frame: frame - 110, fps, config: { damping: 20, stiffness: 200 } });
    const u1Y = interpolate(u1Spring, [0, 1], [30, 0]);
    const u1Opacity = interpolate(frame, [110, 128], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 第1轮AI气泡：frame 160
    const a1Spring = spring({ frame: frame - 160, fps, config: { damping: 20, stiffness: 200 } });
    const a1Y = interpolate(a1Spring, [0, 1], [30, 0]);
    const a1Opacity = interpolate(frame, [160, 178], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 第2轮用户气泡：frame 250
    const u2Spring = spring({ frame: frame - 250, fps, config: { damping: 20, stiffness: 200 } });
    const u2Y = interpolate(u2Spring, [0, 1], [30, 0]);
    const u2Opacity = interpolate(frame, [250, 268], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 第2轮AI气泡：frame 295
    const a2Spring = spring({ frame: frame - 295, fps, config: { damping: 20, stiffness: 200 } });
    const a2Y = interpolate(a2Spring, [0, 1], [30, 0]);
    const a2Opacity = interpolate(frame, [295, 313], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const u1Text = useTypewriter(ROUND1_USER, 115, frame, 2.0);
    const a1Text = useTypewriter(ROUND1_AI, 165, frame, 1.5);
    const u2Text = useTypewriter(ROUND2_USER, 255, frame, 2.0);
    const a2Text = useTypewriter(ROUND2_AI, 300, frame, 1.8);

    // 第一性原理脉冲动画
    const pulse = 1 + Math.sin(frame * 0.08) * 0.03;

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
                gap: 36,
                overflow: "hidden",
            }}
        >
            {/* 左侧：标题 + 概念说明 */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    minWidth: 0,
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, opacity: titleOpacity, letterSpacing: 1 }}>
                    第二步：深挖根源
                </div>
                <h2
                    style={{
                        fontSize: 38,
                        fontWeight: "bold",
                        marginBottom: 28,
                        opacity: titleOpacity,
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.2,
                    }}
                >
                    让它"拆到根上"
                </h2>

                {/* 第一性原理卡片 */}
                <div
                    style={{
                        opacity: conceptOpacity,
                        transform: `translateY(${conceptY}px) scale(${pulse})`,
                        background: `linear-gradient(135deg, rgba(88,166,255,0.15), rgba(88,166,255,0.05))`,
                        border: "1px solid rgba(88,166,255,0.4)",
                        borderRadius: 20,
                        padding: "24px 28px",
                        width: "100%",
                        marginBottom: 20,
                    }}
                >
                    <div style={{ fontSize: 22, fontWeight: "bold", color: "#58a6ff", marginBottom: 12 }}>
                        🔬 什么是第一性原理？
                    </div>
                    <div style={{ fontSize: 18, color: THEME.textSecondary, lineHeight: 1.7 }}>
                        把事情拆到最基础、最根本的层面去思考，而不是停留在表面修修补补。
                    </div>
                </div>

                {/* 提示词示例 */}
                <div
                    style={{
                        opacity: conceptOpacity,
                        background: THEME.cardBg,
                        borderRadius: 16,
                        padding: "18px 22px",
                        width: "100%",
                        borderLeft: `4px solid ${THEME.accentSub}`,
                    }}
                >
                    <div style={{ fontSize: 14, color: THEME.textMuted, marginBottom: 8 }}>💬 提示词模板</div>
                    <div style={{ fontSize: 16, color: THEME.accentSub, lineHeight: 1.7, fontStyle: "italic" }}>
                        "请用第一性原理，把你刚才的批评拆解到最底层。告诉我这些问题的根源是什么。"
                    </div>
                </div>
            </div>

            {/* 右侧：AI 对话动画（从0展开） */}
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
                {/* macOS 风格标题栏 */}
                <div
                    style={{
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: "12px 12px 0 0",
                        padding: "10px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                    <span style={{ marginLeft: 8, color: THEME.textMuted, fontSize: 14 }}>🔬 第一性原理深挖</span>
                </div>

                {/* 对话内容区 */}
                <div
                    style={{
                        background: "rgba(88,166,255,0.05)",
                        border: "1px solid rgba(88,166,255,0.15)",
                        borderTop: "none",
                        borderRadius: "0 0 12px 12px",
                        padding: "16px 14px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        minHeight: 420,
                        overflowY: "hidden",
                    }}
                >
                    {/* 第1轮用户气泡 */}
                    <div style={{ opacity: u1Opacity, transform: `translateY(${u1Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                        <div style={{ fontSize: 12, color: THEME.textMuted }}>你 👤</div>
                        <div style={{ background: THEME.accent, color: "white", borderRadius: "12px 12px 2px 12px", padding: "9px 13px", fontSize: 14, lineHeight: 1.6, maxWidth: "90%" }}>
                            {u1Text}
                            {frame >= 115 && frame < 160 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "white", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>

                    {/* 第1轮AI气泡 */}
                    <div style={{ opacity: a1Opacity, transform: `translateY(${a1Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                        <div style={{ fontSize: 12, color: THEME.textMuted }}>😈 魔鬼 AI</div>
                        <div style={{ background: "rgba(240,136,62,0.12)", border: "1px solid rgba(240,136,62,0.4)", color: THEME.textSecondary, borderRadius: "12px 12px 12px 2px", padding: "9px 13px", fontSize: 14, lineHeight: 1.8, maxWidth: "90%", whiteSpace: "pre-line" }}>
                            {a1Text}
                            {frame >= 165 && frame < 250 && <span style={{ display: "inline-block", width: 2, height: "1em", background: THEME.accent, marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>

                    {/* 第2轮用户气泡 */}
                    <div style={{ opacity: u2Opacity, transform: `translateY(${u2Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                        <div style={{ fontSize: 12, color: THEME.textMuted }}>你 👤</div>
                        <div style={{ background: THEME.accent, color: "white", borderRadius: "12px 12px 2px 12px", padding: "9px 13px", fontSize: 14, lineHeight: 1.6, maxWidth: "90%" }}>
                            {u2Text}
                            {frame >= 255 && frame < 295 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "white", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>

                    {/* 第2轮AI气泡 */}
                    <div style={{ opacity: a2Opacity, transform: `translateY(${a2Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                        <div style={{ fontSize: 12, color: THEME.textMuted }}>😈 魔鬼 AI</div>
                        <div style={{ background: "rgba(63,185,80,0.12)", border: "1px solid rgba(63,185,80,0.4)", color: THEME.textSecondary, borderRadius: "12px 12px 12px 2px", padding: "9px 13px", fontSize: 14, lineHeight: 1.8, maxWidth: "90%", whiteSpace: "pre-line" }}>
                            {a2Text}
                            {frame >= 300 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "#3fb950", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
