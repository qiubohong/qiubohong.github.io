import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from "remotion";

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

// 打字机效果
function useTypewriter(text: string, startFrame: number, charsPerFrame = 1.5) {
    const frame = useCurrentFrame();
    const elapsed = Math.max(0, frame - startFrame);
    const visibleChars = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, visibleChars);
}

const CHAT_SHOW_START = 100;

// 三步操作
const steps = [
    { icon: "1️⃣", title: "AI生成内容", desc: "先让AI在画布里生成初稿", color: "#f0883e" },
    { icon: "2️⃣", title: "手动修改", desc: "直接进画布，改你不满意的地方", color: "#58a6ff" },
    { icon: "3️⃣", title: "锁定风格", desc: "告诉AI：就用这个版本当模板", color: "#3fb950" },
];

const USER_MSG_1 = "帮我写10封营销邮件，第一封先来。";
const AI_MSG_1 = "好的！这是第一封邮件草稿……\n[邮件内容已生成]";
const USER_MSG_2 = "开头我改好了，后面9封都按这个风格来！";
const AI_MSG_2 = "✅ 明白！我会按你修改后的风格，完成剩余9封邮件。";

export const OutputScene4_CanvasFeature: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const step1Opacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const step2Opacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const step3Opacity = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const stepOpacities = [step1Opacity, step2Opacity, step3Opacity];

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

    // 第1轮：用户发送 frame 140
    const bubble1Spring = spring({ frame: frame - 140, fps, config: { damping: 20, stiffness: 200 } });
    const bubble1Y = interpolate(bubble1Spring, [0, 1], [30, 0]);
    const bubble1Opacity = interpolate(frame, [140, 158], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 第2轮：AI回复 frame 185
    const bubble2Spring = spring({ frame: frame - 185, fps, config: { damping: 20, stiffness: 200 } });
    const bubble2Y = interpolate(bubble2Spring, [0, 1], [30, 0]);
    const bubble2Opacity = interpolate(frame, [185, 203], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 第3轮：用户修改后 frame 230
    const bubble3Spring = spring({ frame: frame - 230, fps, config: { damping: 20, stiffness: 200 } });
    const bubble3Y = interpolate(bubble3Spring, [0, 1], [30, 0]);
    const bubble3Opacity = interpolate(frame, [230, 248], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 第4轮：AI确认 frame 275
    const bubble4Spring = spring({ frame: frame - 275, fps, config: { damping: 20, stiffness: 200 } });
    const bubble4Y = interpolate(bubble4Spring, [0, 1], [30, 0]);
    const bubble4Opacity = interpolate(frame, [275, 293], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 打字机
    const text1 = useTypewriter(USER_MSG_1, 145, 2.0);
    const text2 = useTypewriter(AI_MSG_1, 190, 1.8);
    const text3 = useTypewriter(USER_MSG_2, 235, 2.0);
    const text4 = useTypewriter(AI_MSG_2, 280, 1.8);

    const tipOpacity = interpolate(frame, [320, 345], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 小动画：画布图标浮动
    const floatY = Math.sin(frame * 0.07) * 4;

    return (
        <div
            style={{
                flex: 1,
                background: THEME.bg,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
                gap: 36,
            }}
        >
            {/* 左侧：标题 + 三步操作 */}
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
                {/* 步骤标签 */}
                <div
                    style={{
                        fontSize: 20,
                        color: THEME.accent,
                        fontWeight: "bold",
                        marginBottom: 8,
                        opacity: titleOpacity,
                        letterSpacing: 1,
                    }}
                >
                    第二步
                </div>

                {/* 标题 */}
                <h2
                    style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        marginBottom: 6,
                        opacity: titleOpacity,
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.3,
                    }}
                >
                    用"画布"锁定核心
                </h2>
                <div
                    style={{
                        fontSize: 20,
                        color: THEME.textMuted,
                        marginBottom: 22,
                        opacity: titleOpacity,
                    }}
                >
                    别再从头再来，只改你不满意的地方
                </div>

                {/* 画布图标 */}
                <div
                    style={{
                        fontSize: 44,
                        marginBottom: 18,
                        opacity: titleOpacity,
                        transform: `translateY(${floatY}px)`,
                        display: "inline-block",
                    }}
                >
                    🖼️ 元宝 / 豆包 画布功能
                </div>

                {/* 三步操作 */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: THEME.cardBg,
                                borderRadius: 14,
                                padding: "14px 20px",
                                opacity: stepOpacities[i],
                                borderLeft: `5px solid ${step.color}`,
                                gap: 14,
                            }}
                        >
                            <span style={{ fontSize: 28, minWidth: 36 }}>{step.icon}</span>
                            <div>
                                <div style={{ fontSize: 20, fontWeight: "bold", color: step.color, marginBottom: 2 }}>
                                    {step.title}
                                </div>
                                <div style={{ fontSize: 17, color: THEME.textSecondary }}>
                                    {step.desc}
                                </div>
                            </div>
                        </div>
                    ))}
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
                    <span style={{ marginLeft: 8, color: THEME.textMuted, fontSize: 14 }}>🖼️ 画布模式</span>
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
                        minHeight: 380,
                        overflowY: "hidden",
                    }}
                >
                    {/* 第1轮：用户 */}
                    <div style={{ opacity: bubble1Opacity, transform: `translateY(${bubble1Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                        <div style={{ fontSize: 13, color: THEME.textMuted }}>你 👤</div>
                        <div style={{ background: THEME.accent, color: "white", borderRadius: "12px 12px 2px 12px", padding: "9px 13px", fontSize: 15, lineHeight: 1.6, maxWidth: "90%" }}>
                            {text1}
                            {frame >= 145 && frame < 185 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "white", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>

                    {/* 第2轮：AI */}
                    <div style={{ opacity: bubble2Opacity, transform: `translateY(${bubble2Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                        <div style={{ fontSize: 13, color: THEME.textMuted }}>🤖 AI</div>
                        <div style={{ background: "rgba(88,166,255,0.15)", border: "1px solid rgba(88,166,255,0.3)", color: THEME.textSecondary, borderRadius: "12px 12px 12px 2px", padding: "9px 13px", fontSize: 15, lineHeight: 1.6, maxWidth: "90%", whiteSpace: "pre-line" }}>
                            {text2}
                            {frame >= 190 && frame < 230 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "#58a6ff", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>

                    {/* 第3轮：用户（修改后） */}
                    <div style={{ opacity: bubble3Opacity, transform: `translateY(${bubble3Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                        <div style={{ fontSize: 13, color: THEME.textMuted }}>你 ✏️（手动修改开头后）</div>
                        <div style={{ background: THEME.accent, color: "white", borderRadius: "12px 12px 2px 12px", padding: "9px 13px", fontSize: 15, lineHeight: 1.6, maxWidth: "90%" }}>
                            {text3}
                            {frame >= 235 && frame < 275 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "white", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>

                    {/* 第4轮：AI确认 */}
                    <div style={{ opacity: bubble4Opacity, transform: `translateY(${bubble4Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                        <div style={{ fontSize: 13, color: THEME.textMuted }}>🤖 AI</div>
                        <div style={{ background: "rgba(88,166,255,0.15)", border: "1px solid rgba(88,166,255,0.3)", color: THEME.textSecondary, borderRadius: "12px 12px 12px 2px", padding: "9px 13px", fontSize: 15, lineHeight: 1.6, maxWidth: "90%" }}>
                            {text4}
                            {frame >= 280 && frame < 340 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "#58a6ff", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>
                </div>

                {/* 底部提示 */}
                <div
                    style={{
                        opacity: tipOpacity,
                        textAlign: "center",
                        fontSize: 15,
                        color: THEME.accentSub,
                        fontWeight: "bold",
                        marginTop: 10,
                    }}
                >
                    🎉 效率翻倍，满意的部分一个字不改！
                </div>
            </div>
        </div>
    );
};
