import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    spring,
    useVideoConfig,
    Img,
    staticFile,
    Easing,
} from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

// 打字机效果
const getTypingText = (text: string, startFrame: number, frame: number, charsPerFrame = 1.5) => {
    const elapsed = Math.max(0, frame - startFrame);
    const charsToShow = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, charsToShow);
};

const USER_MSG = "每天早上8点，把今天的天气、3条重要新闻、今日日程发给我。";
const AI_MSG = "好的！我已设置每日早报任务：\n🌤️ 天气：北京今天晴，18°C\n📰 新闻：1. AI新突破... 2. 科技动态... 3. 财经要闻...\n📅 日程：10:00 团队会议，14:00 客户拜访";

export const OpenClawInstall_Scene5_Case: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 对话框展开动画
    const CHAT_SHOW_START = 70;
    const chatPanelWidth = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 30], [0, 500], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const chatPanelOpacity = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 用户消息气泡
    const USER_MSG_START = CHAT_SHOW_START + 35;
    const userBubbleOpacity = interpolate(frame, [USER_MSG_START, USER_MSG_START + 15], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const userBubbleY = interpolate(frame, [USER_MSG_START, USER_MSG_START + 20], [20, 0], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const userText = getTypingText(USER_MSG, USER_MSG_START + 5, frame, 1.2);

    // AI 回复气泡
    const AI_MSG_START = USER_MSG_START + 50;
    const aiBubbleOpacity = interpolate(frame, [AI_MSG_START, AI_MSG_START + 15], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const aiBubbleY = interpolate(frame, [AI_MSG_START, AI_MSG_START + 20], [20, 0], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const aiText = getTypingText(AI_MSG, AI_MSG_START + 5, frame, 1.5);

    // 弥散光球动画
    const lightX1 = 20 + Math.sin(frame * 0.008) * 8;
    const lightY1 = 30 + Math.cos(frame * 0.006) * 6;

    // 架构图淡入
    const archOpacity = interpolate(frame, [30, 60], [0, 0.3], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                padding: "60px 80px",
                boxSizing: "border-box",
                gap: "40px",
            }}
        >
            {/* 弥散光背景 */}
            <div style={{
                position: "absolute",
                left: `${lightX1}%`, top: `${lightY1}%`,
                width: 450, height: 450, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.15) 0%, transparent 70%)",
                filter: "blur(80px)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 架构图作为背景层（低透明度） */}
            <div style={{
                position: "absolute", inset: 0,
                opacity: archOpacity,
                display: "flex", alignItems: "center", justifyContent: "center",
                pointerEvents: "none",
            }}>
                <Img
                    src={staticFile("OpenClawInstallVideo/architecture.png")}
                    style={{ width: "70%", objectFit: "contain", filter: "blur(2px)" }}
                />
            </div>

            {/* 左侧：场景说明 */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px", zIndex: 1 }}>
                {/* 标题 */}
                <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                    <h2 style={{
                        fontSize: "52px", fontWeight: 900, margin: 0,
                        background: THEME.titleGradient,
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        backgroundClip: "text", letterSpacing: "-0.04em",
                    }}>
                        装好就能用！
                    </h2>
                    <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: "8px 0 0 0" }}>
                        实际案例：让龙虾每天自动推送早报
                    </p>
                </div>

                {/* 场景说明卡片 */}
                {[
                    { icon: "💬", text: "在 QQ 或飞书里给龙虾发一条消息" },
                    { icon: "🌤️", text: "龙虾自动查天气（调用天气技能）" },
                    { icon: "📰", text: "自动抓取3条重要新闻" },
                    { icon: "📅", text: "读取你的日历，整理成早报发给你" },
                ].map((item, i) => {
                    const cardSpring = spring({ frame: Math.max(0, frame - 20 - i * 12), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
                    return (
                        <div key={i} style={{
                            opacity: interpolate(cardSpring, [0, 1], [0, 1]),
                            transform: `translateX(${interpolate(cardSpring, [0, 1], [-20, 0])}px)`,
                            display: "flex", alignItems: "center", gap: "16px",
                            background: THEME.cardBg, borderRadius: "14px",
                            padding: "16px 24px",
                            border: "1px solid rgba(255,255,255,0.08)",
                            backdropFilter: "blur(16px)",
                        }}>
                            <span style={{ fontSize: "32px", flexShrink: 0 }}>{item.icon}</span>
                            <p style={{ fontSize: "22px", color: THEME.textPrimary, margin: 0 }}>{item.text}</p>
                        </div>
                    );
                })}

                {/* 效果说明 */}
                {frame > 60 && (
                    <div style={{
                        opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                        background: "linear-gradient(135deg, rgba(240,136,62,0.15) 0%, rgba(255,210,0,0.1) 100%)",
                        borderRadius: "14px", padding: "16px 24px",
                        border: "1px solid rgba(240,136,62,0.3)",
                    }}>
                        <p style={{ fontSize: "22px", color: THEME.accent, fontWeight: "bold", margin: 0 }}>
                            🎯 从此每天早上不用刷手机，直接看龙虾整理的早报！
                        </p>
                    </div>
                )}
            </div>

            {/* 右侧：AI 对话动画 */}
            <div style={{
                width: chatPanelWidth,
                flexShrink: 0,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                opacity: chatPanelOpacity,
                zIndex: 1,
            }}>
                {/* macOS 风格标题栏 */}
                <div style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "12px 12px 0 0",
                    padding: "10px 16px",
                    display: "flex", alignItems: "center", gap: "8px",
                    flexShrink: 0,
                }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                    <span style={{ marginLeft: 8, color: "#8b949e", fontSize: 14 }}>🦞 龙虾 AI 对话</span>
                </div>

                {/* 对话内容 */}
                <div style={{
                    flex: 1, background: "rgba(255,255,255,0.04)",
                    borderRadius: "0 0 12px 12px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderTop: "none",
                    padding: "16px",
                    display: "flex", flexDirection: "column", gap: "12px",
                    overflow: "hidden",
                }}>
                    {/* 用户消息 */}
                    {frame >= USER_MSG_START && (
                        <div style={{
                            alignSelf: "flex-end",
                            opacity: userBubbleOpacity,
                            transform: `translateY(${userBubbleY}px)`,
                            background: "#f0883e",
                            color: "#fff",
                            borderRadius: "12px 12px 2px 12px",
                            padding: "10px 14px",
                            maxWidth: "85%",
                            fontSize: "16px",
                            lineHeight: 1.5,
                        }}>
                            {userText}
                            {frame < USER_MSG_START + Math.ceil(USER_MSG.length / 1.2) + 5 && Math.floor(frame / 7) % 2 === 0 && (
                                <span style={{ opacity: 0.7 }}>|</span>
                            )}
                        </div>
                    )}

                    {/* AI 回复 */}
                    {frame >= AI_MSG_START && (
                        <div style={{
                            alignSelf: "flex-start",
                            opacity: aiBubbleOpacity,
                            transform: `translateY(${aiBubbleY}px)`,
                            background: "rgba(88,166,255,0.15)",
                            border: "1px solid rgba(88,166,255,0.3)",
                            color: THEME.textPrimary,
                            borderRadius: "12px 12px 12px 2px",
                            padding: "10px 14px",
                            maxWidth: "90%",
                            fontSize: "15px",
                            lineHeight: 1.6,
                            whiteSpace: "pre-line",
                        }}>
                            {aiText}
                            {frame < AI_MSG_START + Math.ceil(AI_MSG.length / 1.5) + 5 && Math.floor(frame / 7) % 2 === 0 && (
                                <span style={{ opacity: 0.7 }}>|</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AbsoluteFill>
    );
};
