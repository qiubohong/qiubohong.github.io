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

const CHAT_SHOW_START = 90;

const USER_MSG = "这周做了三个活动，数据分别是：DAU+15%、转化率3.2%、新增用户2800人。下周计划做双十一预热活动。";
const AI_MSG = "📊 本周工作周报\n\n【核心数据】\n| 指标 | 本周 | 环比 |\n|------|------|------|\n| DAU | +15% | ↑ |\n| 转化率 | 3.2% | 稳定 |\n| 新增用户 | 2800人 | ↑ |\n\n【重点工作】\n独立策划并执行三场活动，DAU 提升 15%...\n\n【下周计划】\n① 双十一预热活动策划（优先级：高）";

function useTypewriter(text: string, startFrame: number, frame: number, charsPerFrame = 1.3) {
    const elapsed = Math.max(0, frame - startFrame);
    const visibleChars = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, visibleChars);
}

export const ASSScene3_Case1_Weekly: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 三步骤卡片依次弹入
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

    // 用户气泡
    const u1Spring = spring({ frame: frame - 125, fps, config: { damping: 20, stiffness: 200 } });
    const u1Y = interpolate(u1Spring, [0, 1], [30, 0]);
    const u1Opacity = interpolate(frame, [125, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // AI 气泡
    const a1Spring = spring({ frame: frame - 200, fps, config: { damping: 20, stiffness: 200 } });
    const a1Y = interpolate(a1Spring, [0, 1], [30, 0]);
    const a1Opacity = interpolate(frame, [200, 215], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const userText = useTypewriter(USER_MSG, 130, frame, 1.5);
    const aiText = useTypewriter(AI_MSG, 205, frame, 1.3);

    // 效果总结弹入
    const resultOpacity = interpolate(frame, [330, 355], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const resultScale = interpolate(frame, [330, 355], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const steps = [
        { num: "①", label: "会交底", desc: "大师提示词，让 AI 认识你", color: "#3fb950", icon: "📋" },
        { num: "②", label: "会立规矩", desc: "周报系统提示词，存成 PDF", color: "#ffd200", icon: "📐" },
        { num: "③", label: "会迭代", desc: "一句话调整，秒出精品", color: "#f778ba", icon: "🔄" },
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
                        场景一 · 职场人写周报
                    </div>
                    <h2 style={{ fontSize: 28, fontWeight: "bold", background: THEME.titleGradient, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", margin: "0 0 6px", lineHeight: 1.2 }}>
                        从两小时到五分钟
                    </h2>
                    <div style={{ fontSize: 14, color: THEME.textMuted, marginBottom: 16 }}>
                        技能 3（交底）+ 技能 5（规矩）+ 技能 4（迭代）
                    </div>
                </div>

                {/* 三步骤 */}
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
                                <div style={{ fontSize: 14, color: step.color, fontWeight: "bold" }}>
                                    {step.num} {step.label}
                                </div>
                                <div style={{ fontSize: 12, color: THEME.textMuted, marginTop: 2 }}>{step.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 效果总结 */}
                <div
                    style={{
                        opacity: resultOpacity,
                        transform: `scale(${resultScale})`,
                        marginTop: 14,
                        background: `linear-gradient(135deg, ${THEME.accent}22, ${THEME.accentSub}22)`,
                        border: `1px solid ${THEME.accent}`,
                        borderRadius: 12,
                        padding: "10px 14px",
                        fontSize: 14,
                        color: THEME.accentSub,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    ⏱️ 从两小时 → 五分钟，从"憋出来"→"写得好"
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
                {/* macOS 标题栏 */}
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "12px 12px 0 0", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                    <span style={{ marginLeft: 8, color: THEME.textMuted, fontSize: 13 }}>📝 周报小能手</span>
                </div>

                {/* 对话内容 */}
                <div style={{ background: "rgba(88,166,255,0.05)", border: "1px solid rgba(88,166,255,0.15)", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "14px 12px 18px", display: "flex", flexDirection: "column", gap: 12, minHeight: 380 }}>
                    {/* 用户 */}
                    <div style={{ opacity: u1Opacity, transform: `translateY(${u1Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                        <div style={{ fontSize: 11, color: THEME.textMuted }}>小王 👤</div>
                        <div style={{ background: THEME.accent, color: "white", borderRadius: "10px 10px 2px 10px", padding: "8px 12px", fontSize: 12, lineHeight: 1.6, maxWidth: "92%" }}>
                            {userText}
                            {frame >= 130 && frame < 200 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "white", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>

                    {/* AI */}
                    <div style={{ opacity: a1Opacity, transform: `translateY(${a1Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                        <div style={{ fontSize: 11, color: THEME.textMuted }}>🤖 周报小能手</div>
                        <div style={{ background: "rgba(63,185,80,0.12)", border: "1px solid rgba(63,185,80,0.4)", color: THEME.textSecondary, borderRadius: "10px 10px 10px 2px", padding: "8px 12px", fontSize: 12, lineHeight: 1.7, maxWidth: "92%", whiteSpace: "pre-line" }}>
                            {aiText}
                            {frame >= 205 && frame < 330 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "#3fb950", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
