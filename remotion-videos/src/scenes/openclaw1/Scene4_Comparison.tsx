import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    spring,
    useVideoConfig,
} from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

// 对话数据：每组包含用户问题 + 普通AI回复 + OpenClaw回复
const dialogues = [
    {
        user: "帮我查一下明天的天气",
        normal: { avatar: "🤖", name: "普通 AI", text: "您可以打开天气 App 或搜索引擎查询明天天气，建议使用中国天气网。", tag: "只给建议" },
        openclaw: { avatar: "🦞", name: "OpenClaw", text: "已查询完毕！明天北京：晴，18°C，适合出行，记得带水！", tag: "直接执行" },
    },
    {
        user: "帮我写一封请假邮件并发出去",
        normal: { avatar: "🤖", name: "普通 AI", text: "好的，以下是一封请假邮件模板，您可以复制后自行发送……", tag: "只给模板" },
        openclaw: { avatar: "🦞", name: "OpenClaw", text: "邮件已发送给您的主管！主题：请假申请，正文已按您要求填写完毕。", tag: "直接发送" },
    },
];

// 单条气泡组件
const Bubble: React.FC<{
    isUser?: boolean;
    avatar: string;
    name: string;
    text: string;
    tag?: string;
    tagColor?: string;
    bubbleColor?: string;
    borderColor?: string;
    opacity: number;
    translateY: number;
}> = ({ isUser, avatar, name, text, tag, tagColor, bubbleColor, borderColor, opacity, translateY }) => (
    <div style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: "14px",
    }}>
        {/* 头像 */}
        <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            background: isUser ? "rgba(240,136,62,0.15)" : (bubbleColor || "rgba(88,166,255,0.12)"),
            border: `2px solid ${isUser ? "#f0883e40" : (borderColor || "rgba(88,166,255,0.3)")}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px", flexShrink: 0,
        }}>{avatar}</div>

        {/* 气泡内容 */}
        <div style={{ maxWidth: "75%", display: "flex", flexDirection: "column", gap: "6px", alignItems: isUser ? "flex-end" : "flex-start" }}>
            <span style={{ fontSize: "20px", color: THEME.textSecondary, fontWeight: 600 }}>{name}</span>
            <div style={{
                background: isUser ? "rgba(240,136,62,0.12)" : (bubbleColor || "rgba(88,166,255,0.1)"),
                border: `1px solid ${isUser ? "rgba(240,136,62,0.3)" : (borderColor || "rgba(88,166,255,0.25)")}`,
                borderRadius: isUser ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
                padding: "14px 20px",
                backdropFilter: "blur(12px)",
            }}>
                <p style={{ fontSize: "24px", color: THEME.textPrimary, margin: 0, lineHeight: 1.5 }}>{text}</p>
            </div>
            {tag && (
                <span style={{
                    fontSize: "18px", fontWeight: 700,
                    color: tagColor || "#58a6ff",
                    background: `${tagColor || "#58a6ff"}18`,
                    border: `1px solid ${tagColor || "#58a6ff"}40`,
                    borderRadius: "20px", padding: "3px 14px",
                }}>#{tag}</span>
            )}
        </div>
    </div>
);

export const OpenClaw1_Scene4_Comparison: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 弥散光
    const lightX = 50 + Math.sin(frame * 0.008) * 12;
    const lightY = 50 + Math.cos(frame * 0.007) * 8;

    // 每组对话的出现时机（帧）- 基于431帧总时长
    const timings = [
        { user: 20, normal: 45, openclaw: 75 },
        { user: 130, normal: 155, openclaw: 185 },
    ];

    const getAnim = (startFrame: number) => {
        const s = spring({ frame: Math.max(0, frame - startFrame), fps, config: { stiffness: 100, damping: 22, mass: 1 } });
        return {
            opacity: interpolate(s, [0, 1], [0, 1]),
            translateY: interpolate(s, [0, 1], [24, 0]),
        };
    };

    // 最后总结：全屏居中放大出现 - 基于431帧总时长，340帧开始
    const summaryProgress = spring({ frame: Math.max(0, frame - 340), fps, config: { stiffness: 80, damping: 18, mass: 1.5 } });
    const summaryOpacity = interpolate(summaryProgress, [0, 1], [0, 1]);
    const summaryScale = interpolate(summaryProgress, [0, 1], [0.6, 1]);
    // 背景遮罩淡入
    const overlayOpacity = interpolate(frame, [340, 360], [0, 0.75], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "50px 80px",
                boxSizing: "border-box",
                gap: "20px",
            }}
        >
            {/* 弥散光 */}
            <div style={{
                position: "absolute", left: `${lightX}%`, top: `${lightY}%`,
                width: 700, height: 700, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.08) 0%, transparent 70%)",
                filter: "blur(100px)", transform: "translate(-50%, -50%)", pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                <h2 style={{
                    fontSize: "60px", fontWeight: 900, margin: "0 0 6px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    和普通 AI 的本质区别
                </h2>
                <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: 0 }}>
                    普通 AI 是<span style={{ color: "#ff6b6b", fontWeight: "bold" }}>「顾问」</span>，只出主意不动手；
                    OpenClaw 是<span style={{ color: "#58a6ff", fontWeight: "bold" }}>「员工」</span>，出主意还动手！
                </p>
            </div>

            {/* 对话区域：左右分栏 */}
            <div style={{ display: "flex", gap: "24px", flex: 1 }}>

                {/* 左侧：普通AI对话 */}
                <div style={{
                    flex: 1,
                    background: "rgba(255,107,107,0.05)",
                    borderRadius: "20px",
                    padding: "24px 28px",
                    border: "1px solid rgba(255,107,107,0.18)",
                    backdropFilter: "blur(16px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                }}>
                    {/* 列标题 */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                        <span style={{ fontSize: "28px" }}>❌</span>
                        <span style={{ fontSize: "26px", color: "#ff6b6b", fontWeight: 800 }}>普通 AI</span>
                    </div>

                    {dialogues.map((d, i) => {
                        const t = timings[i];
                        const userAnim = getAnim(t.user);
                        const normalAnim = getAnim(t.normal);
                        return (
                            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <Bubble
                                    isUser
                                    avatar="👤"
                                    name="你"
                                    text={d.user}
                                    opacity={userAnim.opacity}
                                    translateY={userAnim.translateY}
                                />
                                <Bubble
                                    avatar={d.normal.avatar}
                                    name={d.normal.name}
                                    text={d.normal.text}
                                    tag={d.normal.tag}
                                    tagColor="#ff6b6b"
                                    bubbleColor="rgba(255,107,107,0.1)"
                                    borderColor="rgba(255,107,107,0.25)"
                                    opacity={normalAnim.opacity}
                                    translateY={normalAnim.translateY}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* 中间 VS */}
                <div style={{
                    width: "48px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                    <span style={{
                        fontSize: "26px", fontWeight: 900, color: THEME.textSecondary,
                        writingMode: "vertical-rl", letterSpacing: "4px",
                    }}>VS</span>
                </div>

                {/* 右侧：OpenClaw对话 */}
                <div style={{
                    flex: 1,
                    background: "rgba(88,166,255,0.05)",
                    borderRadius: "20px",
                    padding: "24px 28px",
                    border: "1px solid rgba(88,166,255,0.18)",
                    backdropFilter: "blur(16px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                }}>
                    {/* 列标题 */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                        <span style={{ fontSize: "28px" }}>✅</span>
                        <span style={{ fontSize: "26px", color: "#58a6ff", fontWeight: 800 }}>OpenClaw 龙虾</span>
                    </div>

                    {dialogues.map((d, i) => {
                        const t = timings[i];
                        const userAnim = getAnim(t.user);
                        const openclawAnim = getAnim(t.openclaw);
                        return (
                            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <Bubble
                                    isUser
                                    avatar="👤"
                                    name="你"
                                    text={d.user}
                                    opacity={userAnim.opacity}
                                    translateY={userAnim.translateY}
                                />
                                <Bubble
                                    avatar={d.openclaw.avatar}
                                    name={d.openclaw.name}
                                    text={d.openclaw.text}
                                    tag={d.openclaw.tag}
                                    tagColor="#3fb950"
                                    bubbleColor="rgba(63,185,80,0.1)"
                                    borderColor="rgba(63,185,80,0.25)"
                                    opacity={openclawAnim.opacity}
                                    translateY={openclawAnim.translateY}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 最后总结：全屏居中覆盖层 */}
            {frame >= 620 && (
                <>
                    {/* 背景遮罩 */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "rgba(13,17,23,0.82)",
                        opacity: overlayOpacity,
                        backdropFilter: "blur(8px)",
                        pointerEvents: "none",
                    }} />
                    {/* 居中卡片 */}
                    <div style={{
                        position: "absolute",
                        top: "50%", left: "50%",
                        transform: `translate(-50%, -50%) scale(${summaryScale})`,
                        opacity: summaryOpacity,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "24px",
                        width: "80%",
                        background: "linear-gradient(135deg, rgba(240,136,62,0.15) 0%, rgba(255,210,0,0.08) 100%)",
                        borderRadius: "28px",
                        padding: "56px 64px",
                        border: "2px solid rgba(240,136,62,0.4)",
                        boxShadow: "0 0 80px rgba(240,136,62,0.25), 0 0 160px rgba(240,136,62,0.1)",
                        backdropFilter: "blur(24px)",
                        textAlign: "center",
                    }}>
                        <span style={{ fontSize: "72px", lineHeight: 1 }}>💡</span>
                        <p style={{
                            fontSize: "52px",
                            color: THEME.accent,
                            fontWeight: 900,
                            margin: 0,
                            lineHeight: 1.4,
                            letterSpacing: "-0.02em",
                        }}>
                            OpenClaw 就像一个
                        </p>
                        <p style={{
                            fontSize: "68px",
                            fontWeight: 900,
                            margin: 0,
                            lineHeight: 1.2,
                            background: "linear-gradient(45deg, #ffd200, #f0883e)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            letterSpacing: "-0.03em",
                        }}>
                            7×24 小时在线的
                        </p>
                        <p style={{
                            fontSize: "68px",
                            fontWeight: 900,
                            margin: 0,
                            lineHeight: 1.2,
                            background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            letterSpacing: "-0.03em",
                        }}>
                            AI 数字员工
                        </p>
                        <p style={{
                            fontSize: "36px",
                            color: THEME.textSecondary,
                            margin: 0,
                            fontWeight: 600,
                        }}>
                            说了就做，随叫随到！
                        </p>
                    </div>
                </>
            )}
        </AbsoluteFill>
    );
};
