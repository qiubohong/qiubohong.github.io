import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    spring,
    useVideoConfig,
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

const QQ_STEPS = [
    { cmd: "openclaw plugins install @sliverp/qqbot@latest", desc: "安装 QQBot 插件" },
    { cmd: "openclaw channels add --channel qqbot --token \"AppID:AppSecret\"", desc: "绑定 QQ 机器人 Token" },
    { cmd: "openclaw gateway restart", desc: "重启服务使配置生效" },
];

const FEISHU_STEPS = [
    { cmd: "npx -y @larksuite/openclaw-lark-tools install", desc: "安装飞书官方插件" },
    { icon: "📱", desc: "选择「新建机器人」，扫码创建飞书机器人" },
    { icon: "💬", desc: "点击「打开机器人」，发送消息开始对话" },
];

export const OpenClawInstall_Scene4b_Channel: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 弥散光球动画
    const lightX = 85 + Math.sin(frame * 0.007) * 8;
    const lightY = 20 + Math.cos(frame * 0.005) * 6;

    // 命令高亮
    const cmdHighlight = 0.7 + Math.sin(frame * 0.1) * 0.3;

    // 飞书面板展开动画
    const feishuPanelOpacity = interpolate(frame, [60, 90], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 底部提示淡入
    const tipOpacity = interpolate(frame, [100, 130], [0, 1], {
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
                flexDirection: "column",
                padding: "60px 80px",
                boxSizing: "border-box",
                gap: "28px",
            }}
        >
            {/* 弥散光背景 */}
            <div style={{
                position: "absolute",
                left: `${lightX}%`, top: `${lightY}%`,
                width: 500, height: 500, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.15) 0%, transparent 70%)",
                filter: "blur(80px)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                <h2 style={{
                    fontSize: "52px", fontWeight: 900, margin: 0,
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.04em",
                }}>
                    💬 配置消息渠道
                </h2>
                <p style={{ fontSize: "22px", color: THEME.textSecondary, margin: "8px 0 0 0" }}>
                    让龙虾接入 QQ 或飞书，开始接收你的消息
                </p>
            </div>

            {/* 左右分屏：QQ 和 飞书 */}
            <div style={{ display: "flex", gap: "32px", flex: 1 }}>
                {/* 左侧：QQ Bot */}
                <div style={{
                    flex: 1,
                    background: THEME.cardBg,
                    borderRadius: "20px",
                    padding: "28px 24px",
                    border: "1px solid rgba(88,166,255,0.25)",
                    backdropFilter: "blur(16px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                        <span style={{ fontSize: "36px" }}>🐧</span>
                        <div>
                            <div style={{ fontSize: "26px", color: "#58a6ff", fontWeight: "bold" }}>QQ Bot 配置</div>
                            <div style={{ fontSize: "16px", color: THEME.textSecondary }}>需要申请 QQ 机器人账号</div>
                        </div>
                    </div>

                    {/* QQ 步骤 */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                        {QQ_STEPS.map((step, i) => {
                            const stepSpring = spring({ frame: Math.max(0, frame - 20 - i * 15), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
                            const stepY = interpolate(stepSpring, [0, 1], [20, 0]);
                            const stepOpacity = interpolate(stepSpring, [0, 1], [0, 1]);

                            return (
                                <div key={i} style={{ opacity: stepOpacity, transform: `translateY(${stepY}px)` }}>
                                    <div style={{ fontSize: "16px", color: THEME.textSecondary, marginBottom: "4px" }}>
                                        第{i + 1}步：{step.desc}
                                    </div>
                                    <div style={{
                                        background: "rgba(0,0,0,0.4)", borderRadius: "8px",
                                        padding: "8px 14px",
                                        border: `1px solid rgba(88,166,255,${cmdHighlight * 0.3})`,
                                    }}>
                                        <code style={{
                                            fontSize: "14px", color: "#58a6ff",
                                            fontFamily: "monospace", wordBreak: "break-all",
                                        }}>{step.cmd}</code>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* QQ Token 提示 */}
                    <div style={{
                        background: "rgba(88,166,255,0.08)", borderRadius: "10px",
                        padding: "12px 16px", border: "1px solid rgba(88,166,255,0.2)",
                        flexShrink: 0,
                    }}>
                        <p style={{ fontSize: "16px", color: THEME.textSecondary, margin: 0 }}>
                            💡 Token 格式：<code style={{ color: "#58a6ff" }}>AppID:AppSecret</code>
                        </p>
                        <p style={{ fontSize: "14px", color: THEME.textSecondary, margin: "4px 0 0 0" }}>
                            申请地址：q.qq.com/qqbot/openclaw/login.html
                        </p>
                    </div>
                </div>

                {/* 右侧：飞书 */}
                <div style={{
                    flex: 1,
                    opacity: feishuPanelOpacity,
                    background: THEME.cardBg,
                    borderRadius: "20px",
                    padding: "28px 24px",
                    border: "1px solid rgba(240,136,62,0.25)",
                    backdropFilter: "blur(16px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                        <span style={{ fontSize: "36px" }}>🪁</span>
                        <div>
                            <div style={{ fontSize: "26px", color: "#f0883e", fontWeight: "bold" }}>飞书配置</div>
                            <div style={{ fontSize: "16px", color: THEME.textSecondary }}>官方插件，操作更简单</div>
                        </div>
                    </div>

                    {/* 飞书步骤 */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
                        {FEISHU_STEPS.map((step, i) => {
                            const stepSpring = spring({ frame: Math.max(0, frame - 60 - i * 15), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
                            const stepY = interpolate(stepSpring, [0, 1], [20, 0]);
                            const stepOpacity = interpolate(stepSpring, [0, 1], [0, 1]);

                            return (
                                <div key={i} style={{ opacity: stepOpacity, transform: `translateY(${stepY}px)` }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                                        <span style={{
                                            width: "28px", height: "28px", borderRadius: "50%",
                                            background: "rgba(240,136,62,0.15)",
                                            border: "1px solid rgba(240,136,62,0.4)",
                                            color: "#f0883e",
                                            fontSize: "14px", fontWeight: "bold",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            flexShrink: 0, marginTop: "2px",
                                        }}>
                                            {step.icon || (i + 1)}
                                        </span>
                                        <div style={{ flex: 1 }}>
                                            {(step as any).cmd ? (
                                                <div style={{
                                                    background: "rgba(0,0,0,0.4)", borderRadius: "8px",
                                                    padding: "8px 14px",
                                                    border: `1px solid rgba(240,136,62,${cmdHighlight * 0.3})`,
                                                }}>
                                                    <code style={{
                                                        fontSize: "14px", color: "#f0883e",
                                                        fontFamily: "monospace", wordBreak: "break-all",
                                                    }}>{(step as any).cmd}</code>
                                                </div>
                                            ) : (
                                                <p style={{ fontSize: "18px", color: THEME.textPrimary, margin: 0, lineHeight: 1.5 }}>
                                                    {step.desc}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 飞书提示 */}
                    <div style={{
                        background: "rgba(240,136,62,0.08)", borderRadius: "10px",
                        padding: "12px 16px", border: "1px solid rgba(240,136,62,0.2)",
                        flexShrink: 0,
                    }}>
                        <p style={{ fontSize: "16px", color: THEME.textSecondary, margin: 0 }}>
                            📖 详细指南：bytedance.larkoffice.com 飞书官方文档
                        </p>
                    </div>
                </div>
            </div>

            {/* 底部提示 */}
            <div style={{
                opacity: tipOpacity,
                flexShrink: 0,
                background: "rgba(63,185,80,0.08)",
                borderRadius: "14px",
                padding: "16px 28px",
                border: "1px solid rgba(63,185,80,0.3)",
                display: "flex", alignItems: "center", gap: "16px",
            }}>
                <span style={{ fontSize: "28px" }}>🎉</span>
                <p style={{ fontSize: "20px", color: "#3fb950", margin: 0, fontWeight: "bold" }}>
                    配置完成后，在 QQ 或飞书给机器人发消息，龙虾就能回复你了！
                </p>
            </div>
        </AbsoluteFill>
    );
};
