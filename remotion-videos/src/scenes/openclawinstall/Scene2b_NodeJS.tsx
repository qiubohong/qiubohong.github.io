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
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

const PLATFORMS = [
    {
        icon: "🪟",
        name: "Windows",
        color: "#58a6ff",
        steps: [
            "访问 nodejs.org 下载 LTS 版本",
            "双击安装包，一路点「下一步」",
            "重新打开终端，输入 node -v 验证",
        ],
        tip: "Win+R → 输入 cmd → 回车",
    },
    {
        icon: "🍎",
        name: "macOS",
        color: "#f0883e",
        steps: [
            "方法一：nodejs.org 下载 .pkg 安装包",
            "方法二（推荐）：brew install node",
            "终端输入 node -v 验证安装",
        ],
        tip: "Cmd+空格 → 搜索「终端」→ 打开",
    },
    {
        icon: "🐧",
        name: "Linux",
        color: "#3fb950",
        steps: [
            "Ubuntu: sudo apt install nodejs npm",
            "CentOS: sudo yum install nodejs npm",
            "终端输入 node -v 验证安装",
        ],
        tip: "Ctrl+Alt+T 直接打开终端",
    },
];

export const OpenClawInstall_Scene2b_NodeJS: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 弥散光球动画
    const lightX = 20 + Math.sin(frame * 0.007) * 10;
    const lightY = 70 + Math.cos(frame * 0.005) * 8;

    // 验证命令高亮
    const cmdHighlight = 0.7 + Math.sin(frame * 0.12) * 0.3;

    // 底部提示淡入
    const tipOpacity = interpolate(frame, [80, 110], [0, 1], {
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
                background: "radial-gradient(circle, rgba(63,185,80,0.15) 0%, transparent 70%)",
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
                    📦 npm 安装前置：Node.js 环境
                </h2>
                <p style={{ fontSize: "22px", color: THEME.textSecondary, margin: "8px 0 0 0" }}>
                    先检查是否已安装：终端输入 <code style={{ color: "#3fb950", background: "rgba(63,185,80,0.1)", padding: "2px 8px", borderRadius: "4px" }}>node -v</code>，看到版本号就可以跳过
                </p>
            </div>

            {/* 三平台安装卡片 */}
            <div style={{ display: "flex", gap: "24px", flex: 1 }}>
                {PLATFORMS.map((platform, i) => {
                    const cardSpring = spring({ frame: Math.max(0, frame - 20 - i * 15), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
                    const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

                    return (
                        <div key={i} style={{
                            flex: 1,
                            opacity: cardOpacity,
                            transform: `translateY(${cardY}px)`,
                            background: THEME.cardBg,
                            borderRadius: "20px",
                            padding: "28px 24px",
                            border: `1px solid ${platform.color}30`,
                            backdropFilter: "blur(16px)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}>
                            {/* 平台标题 */}
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <span style={{ fontSize: "40px" }}>{platform.icon}</span>
                                <span style={{ fontSize: "48px", color: platform.color, fontWeight: "bold" }}>{platform.name}</span>
                            </div>

                            {/* 终端提示 */}
                            <div style={{
                                background: "rgba(0,0,0,0.3)", borderRadius: "8px",
                                padding: "8px 14px",
                                border: `1px solid ${platform.color}20`,
                            }}>
                                <span style={{ fontSize: "24px", color: THEME.textSecondary }}>💡 {platform.tip}</span>
                            </div>

                            {/* 安装步骤 */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                                {platform.steps.map((step, j) => {
                                    const stepOpacity = interpolate(frame, [40 + i * 15 + j * 10, 60 + i * 15 + j * 10], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    });
                                    return (
                                        <div key={j} style={{
                                            opacity: stepOpacity,
                                            display: "flex", alignItems: "flex-start", gap: "10px",
                                        }}>
                                            <span style={{
                                                width: "24px", height: "24px", borderRadius: "50%",
                                                background: `${platform.color}20`,
                                                border: `1px solid ${platform.color}50`,
                                                color: platform.color,
                                                fontSize: "14px", fontWeight: "bold",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                flexShrink: 0, marginTop: "2px",
                                            }}>{j + 1}</span>
                                            <span style={{ fontSize: "24px", color: THEME.textPrimary, lineHeight: 2 }}>{step}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 底部验证提示 */}
            <div style={{
                opacity: tipOpacity,
                flexShrink: 0,
                background: "rgba(63,185,80,0.08)",
                borderRadius: "14px",
                padding: "16px 28px",
                border: "1px solid rgba(63,185,80,0.3)",
                display: "flex", alignItems: "center", gap: "16px",
            }}>
                <span style={{ fontSize: "28px" }}>✅</span>
                <div>
                    <span style={{ fontSize: "24px", color: "#3fb950", fontWeight: "bold" }}>安装验证：</span>
                    <code style={{
                        fontSize: "24px", color: `rgba(63,185,80,${cmdHighlight})`,
                        fontFamily: "monospace", marginLeft: "12px",
                        background: "rgba(63,185,80,0.1)", padding: "2px 12px", borderRadius: "6px",
                    }}>node -v</code>
                    <span style={{ fontSize: "24px", color: THEME.textSecondary, marginLeft: "12px" }}>
                        看到 v18.x.x 或更高版本，就可以开始安装 OpenClaw 了！
                    </span>
                </div>
            </div>
        </AbsoluteFill>
    );
};
