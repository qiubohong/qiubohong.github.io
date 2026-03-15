import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    spring,
    useVideoConfig,
    Img,
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

// 用户类型消耗数据
const userTypes = [
    { type: "轻度用户", tokens: "2000万-5000万", cost: "60-120美元", scene: "每天5-10次提问", color: "#3fb950", icon: "🌱" },
    { type: "中度用户", tokens: "5000万-1亿", cost: "180-360美元", scene: "每天20-50次提问", color: "#58a6ff", icon: "🚀" },
    { type: "重度用户", tokens: "1亿-3亿", cost: "360-1000美元", scene: "24/7个人助手", color: "#f0883e", icon: "🔥" },
    { type: "极端用户", tokens: "3亿+", cost: "1000美元+", scene: "多Agent协作", color: "#ec4899", icon: "⚡" },
];

export const OpenClawFreeModel_Scene7_TokensUsage: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 解释卡片
    const explainSpring = spring({ frame: Math.max(0, frame - 30), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const explainOpacity = interpolate(explainSpring, [0, 1], [0, 1]);

    // 弥散光
    const lightX = 50 + Math.sin(frame * 0.007) * 8;
    const lightY = 50 + Math.cos(frame * 0.009) * 6;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "40px 60px",
                boxSizing: "border-box",
                gap: "14px",
            }}
        >
            {/* 弥散光 */}
            <div style={{
                position: "absolute", left: `${lightX}%`, top: `${lightY}%`,
                width: 600, height: 600, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.1) 0%, transparent 70%)",
                filter: "blur(100px)", transform: "translate(-50%, -50%)", pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                <h2 style={{
                    fontSize: "48px", fontWeight: 900, margin: "0 0 4px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    tokens 是什么？能用多久？
                </h2>
                <p style={{ fontSize: "18px", color: THEME.textSecondary, margin: 0 }}>
                    很多人看到"2000万tokens"不知道是多还是少
                </p>
            </div>

            {/* 解释卡片 */}
            <div style={{
                opacity: explainOpacity,
                background: "rgba(88,166,255,0.08)",
                borderRadius: "16px",
                padding: "16px 24px",
                border: "1px solid rgba(88,166,255,0.3)",
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "32px",
            }}>
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "20px", color: THEME.textPrimary, margin: 0 }}>
                        <span style={{ color: "#58a6ff", fontWeight: "bold" }}>tokens</span> = "字数"
                    </p>
                </div>
                <div style={{ width: "1px", height: "30px", background: "rgba(88,166,255,0.3)" }} />
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "18px", color: THEME.textSecondary, margin: 0 }}>
                        1万tokens ≈ 7000汉字
                    </p>
                </div>
                <div style={{ width: "1px", height: "30px", background: "rgba(88,166,255,0.3)" }} />
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "18px", color: THEME.textSecondary, margin: 0 }}>
                        2000万tokens ≈ 1400万字
                    </p>
                </div>
            </div>

            {/* 用户类型表格 */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* 表头 */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1.2fr 1fr 1.5fr",
                    gap: "12px",
                    padding: "10px 16px",
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "10px",
                }}>
                    <p style={{ fontSize: "16px", color: THEME.textSecondary, margin: 0, fontWeight: "bold" }}>用户类型</p>
                    <p style={{ fontSize: "16px", color: THEME.textSecondary, margin: 0, fontWeight: "bold" }}>月消耗 tokens</p>
                    <p style={{ fontSize: "16px", color: THEME.textSecondary, margin: 0, fontWeight: "bold" }}>等效月成本</p>
                    <p style={{ fontSize: "16px", color: THEME.textSecondary, margin: 0, fontWeight: "bold" }}>典型场景</p>
                </div>

                {/* 用户类型行 */}
                {userTypes.map((u, i) => {
                    const rowSpring = spring({
                        frame: Math.max(0, frame - 60 - i * 15),
                        fps,
                        config: { stiffness: 90, damping: 20, mass: 1.2 },
                    });
                    const rowOpacity = interpolate(rowSpring, [0, 1], [0, 1]);
                    const rowX = interpolate(rowSpring, [0, 1], [-20, 0]);

                    return (
                        <div key={i} style={{
                            opacity: rowOpacity,
                            transform: `translateX(${rowX}px)`,
                            display: "grid",
                            gridTemplateColumns: "1fr 1.2fr 1fr 1.5fr",
                            gap: "12px",
                            padding: "14px 16px",
                            background: `${u.color}08`,
                            borderRadius: "12px",
                            border: `1px solid ${u.color}25`,
                            alignItems: "center",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ fontSize: "22px" }}>{u.icon}</span>
                                <p style={{ fontSize: "20px", fontWeight: "bold", color: u.color, margin: 0 }}>{u.type}</p>
                            </div>
                            <p style={{ fontSize: "20px", color: THEME.textPrimary, margin: 0, fontWeight: "bold" }}>{u.tokens}</p>
                            <p style={{ fontSize: "18px", color: THEME.textSecondary, margin: 0 }}>{u.cost}</p>
                            <p style={{ fontSize: "18px", color: THEME.textSecondary, margin: 0 }}>{u.scene}</p>
                        </div>
                    );
                })}
            </div>

            {/* 总结提示 */}
            <div style={{
                background: "linear-gradient(135deg, rgba(63,185,80,0.15) 0%, rgba(88,166,255,0.1) 100%)",
                borderRadius: "14px",
                padding: "14px 20px",
                border: "1px solid rgba(63,185,80,0.3)",
                textAlign: "center",
                flexShrink: 0,
            }}>
                <p style={{ fontSize: "20px", color: "#3fb950", fontWeight: "bold", margin: 0 }}>
                    🎉 免费额度2000万tokens，轻度用户够用好几个月！
                </p>
            </div>
        </AbsoluteFill>
    );
};

// 场景 7.5：tokens用量估算图表
export const OpenClawFreeModel_Scene7_5_TokensChart: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    const imgSpring = spring({ frame: Math.max(0, frame - 30), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const imgScale = interpolate(imgSpring, [0, 1], [0.9, 1]);
    const imgOpacity = interpolate(imgSpring, [0, 1], [0, 1]);

    // 弥散光
    const lightX = 50 + Math.sin(frame * 0.007) * 8;
    const lightY = 50 + Math.cos(frame * 0.009) * 6;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "40px 60px",
                boxSizing: "border-box",
                gap: "20px",
            }}
        >
            {/* 弥散光 */}
            <div style={{
                position: "absolute", left: `${lightX}%`, top: `${lightY}%`,
                width: 600, height: 600, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.1) 0%, transparent 70%)",
                filter: "blur(100px)", transform: "translate(-50%, -50%)", pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, flexShrink: 0, textAlign: "center" }}>
                <h2 style={{
                    fontSize: "48px", fontWeight: 900, margin: "0 0 8px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    tokens 用量估算
                </h2>
                <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0 }}>
                    不同任务类型的 tokens 消耗对比
                </p>
            </div>

            {/* 图表 */}
            <div style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: imgOpacity,
                transform: `scale(${imgScale})`,
            }}>
                <Img
                    src="/assets/img/ailearn/openclaw/02/tokens_usage.png"
                    style={{
                        maxWidth: "90%",
                        maxHeight: "80%",
                        borderRadius: "16px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
