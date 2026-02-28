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

const projects = [
    { icon: "📊", name: "我的工作周报", color: "#f0883e" },
    { icon: "📖", name: "孩子的睡前故事", color: "#58a6ff" },
    { icon: "🎓", name: "团队培训材料", color: "#3fb950" },
    { icon: "📚", name: "个人学习计划", color: "#f778ba" },
];

const CHAT_SHOW_START = 90;
const USER_MSG = "帮我在元宝里创建一个「工作周报」项目文件夹，把相关资料都放进去";
const AI_MSG = "✅ 已创建「工作周报」项目文件夹！\n\n已归入：\n📄 Personal OS 文档\n📦 压缩好的背景资料\n📐 通用规则 PDF\n💬 过往优秀对话记录\n\n下次直接打开文件夹，所有资料都在！";

function useTypewriter(text: string, startFrame: number, frame: number, charsPerFrame = 1.5) {
    const elapsed = Math.max(0, frame - startFrame);
    const visibleChars = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, visibleChars);
}

export const KGScene3_Step1_Folders: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const projOpacities = projects.map((_, i) =>
        interpolate(frame, [20 + i * 16, 42 + i * 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const projScales = projects.map((_, i) =>
        interpolate(frame, [20 + i * 16, 42 + i * 16], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 右侧对话框展开动画
    const chatPanelWidth = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 30], [0, 480], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const chatPanelOpacity = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 用户气泡：frame 120
    const u1Spring = spring({ frame: frame - 120, fps, config: { damping: 20, stiffness: 200 } });
    const u1Y = interpolate(u1Spring, [0, 1], [30, 0]);
    const u1Opacity = interpolate(frame, [120, 138], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // AI 气泡：frame 185
    const a1Spring = spring({ frame: frame - 185, fps, config: { damping: 20, stiffness: 200 } });
    const a1Y = interpolate(a1Spring, [0, 1], [30, 0]);
    const a1Opacity = interpolate(frame, [185, 203], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const userText = useTypewriter(USER_MSG, 125, frame, 1.6);
    const aiText = useTypewriter(AI_MSG, 190, frame, 1.4);

    const tipOpacity = interpolate(frame, [310, 335], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
            {/* 左侧：标题 + 项目文件夹 */}
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
                    第一步
                </div>
                <h2
                    style={{
                        fontSize: 34,
                        fontWeight: "bold",
                        marginBottom: 24,
                        opacity: titleOpacity,
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.2,
                    }}
                >
                    按"项目"建文件夹<br />让资料有家可归
                </h2>

                {/* 项目文件夹卡片 2×2 */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 12,
                        width: "100%",
                    }}
                >
                    {projects.map((proj, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: projOpacities[i],
                                transform: `scale(${projScales[i]})`,
                                background: `${proj.color}12`,
                                border: `1px solid ${proj.color}44`,
                                borderRadius: 14,
                                padding: "14px 16px",
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <span style={{ fontSize: 28, flexShrink: 0 }}>{proj.icon}</span>
                            <div style={{ fontSize: 16, color: proj.color, fontWeight: "bold" }}>
                                {proj.name}
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        opacity: tipOpacity,
                        marginTop: 16,
                        fontSize: 15,
                        color: THEME.accentSub,
                        fontWeight: "bold",
                    }}
                >
                    💡 元宝、DeepSeek、豆包都支持项目文件夹功能！
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
                    <span style={{ marginLeft: 8, color: THEME.textMuted, fontSize: 14 }}>🌿 AI 花园管理</span>
                </div>

                {/* 对话内容区 */}
                <div
                    style={{
                        background: "rgba(88,166,255,0.05)",
                        border: "1px solid rgba(88,166,255,0.15)",
                        borderTop: "none",
                        borderRadius: "0 0 12px 12px",
                        padding: "20px 16px 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        minHeight: 380,
                    }}
                >
                    {/* 用户气泡 */}
                    <div
                        style={{
                            opacity: u1Opacity,
                            transform: `translateY(${u1Y}px)`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 6,
                        }}
                    >
                        <div style={{ fontSize: 13, color: THEME.textMuted }}>你 👤</div>
                        <div
                            style={{
                                background: THEME.accent,
                                color: "white",
                                borderRadius: "12px 12px 2px 12px",
                                padding: "10px 14px",
                                fontSize: 14,
                                lineHeight: 1.6,
                                maxWidth: "92%",
                            }}
                        >
                            {userText}
                            {frame >= 125 && frame < 185 && (
                                <span style={{ display: "inline-block", width: 2, height: "1em", background: "white", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />
                            )}
                        </div>
                    </div>

                    {/* AI 气泡 */}
                    <div
                        style={{
                            opacity: a1Opacity,
                            transform: `translateY(${a1Y}px)`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: 6,
                        }}
                    >
                        <div style={{ fontSize: 13, color: THEME.textMuted }}>🤖 AI</div>
                        <div
                            style={{
                                background: "rgba(63,185,80,0.12)",
                                border: "1px solid rgba(63,185,80,0.4)",
                                color: THEME.textSecondary,
                                borderRadius: "12px 12px 12px 2px",
                                padding: "10px 14px",
                                fontSize: 14,
                                lineHeight: 1.8,
                                maxWidth: "92%",
                                whiteSpace: "pre-line",
                            }}
                        >
                            {aiText}
                            {frame >= 190 && frame < 320 && (
                                <span style={{ display: "inline-block", width: 2, height: "1em", background: "#3fb950", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
