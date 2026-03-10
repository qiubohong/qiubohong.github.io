import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
} from "remotion";

// 统一主题配置
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

export const FC_Scene3_WeatherCase: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 代码块动画
    const codeOpacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const codeSlide = interpolate(frame, [30, 60], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 要点卡片动画
    const point1Opacity = interpolate(frame, [70, 95], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const point2Opacity = interpolate(frame, [90, 115], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const point3Opacity = interpolate(frame, [110, 135], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.12) * 0.3;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "36px 48px",
                boxSizing: "border-box",
                gap: "18px",
            }}
        >
            {/* 背景装饰 */}
            <div
                style={{
                    position: "absolute",
                    top: "-150px",
                    right: "-150px",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(88,166,255,0.07) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, flexShrink: 0 }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "8px",
                    }}
                >
                    <span
                        style={{
                            background: "rgba(88,166,255,0.15)",
                            border: "1px solid rgba(88,166,255,0.3)",
                            borderRadius: "8px",
                            padding: "4px 14px",
                            fontSize: "22px",
                            color: "#58a6ff",
                            fontWeight: "bold",
                        }}
                    >
                        案例 1
                    </span>
                    <h1
                        style={{
                            fontSize: "56px",
                            fontWeight: "bold",
                            background: THEME.titleGradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        智能天气查询助手
                    </h1>
                    <span style={{ fontSize: "40px" }}>🌤️</span>
                </div>
                <p style={{ fontSize: "26px", color: THEME.textSecondary }}>
                    最经典的案例：弥补大模型知识时效性的不足
                </p>
            </div>

            {/* 工具定义代码块 */}
            <div
                style={{
                    opacity: codeOpacity,
                    transform: `translateY(${codeSlide}px)`,
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        background: "#161b22",
                        borderRadius: "14px",
                        border: "1px solid rgba(88,166,255,0.2)",
                        overflow: "hidden",
                    }}
                >
                    {/* 代码标题栏 */}
                    <div
                        style={{
                            background: "rgba(88,166,255,0.08)",
                            padding: "10px 20px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            borderBottom: "1px solid rgba(88,166,255,0.15)",
                        }}
                    >
                        <div
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                background: "#ff5f57",
                            }}
                        />
                        <div
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                background: "#febc2e",
                            }}
                        />
                        <div
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                background: "#28c840",
                            }}
                        />
                        <span
                            style={{
                                marginLeft: "8px",
                                color: THEME.textSecondary,
                                fontSize: "20px",
                            }}
                        >
                            tools 定义
                        </span>
                    </div>
                    {/* 代码内容 */}
                    <div style={{ padding: "16px 24px" }}>
                        <pre
                            style={{
                                margin: 0,
                                fontSize: "22px",
                                lineHeight: 1.6,
                                color: THEME.textPrimary,
                                fontFamily: '"Fira Code", "Courier New", monospace',
                            }}
                        >
                            <span style={{ color: "#8b949e" }}>{"{"}</span>
                            {"\n"}
                            {"  "}
                            <span style={{ color: "#79c0ff" }}>"name"</span>
                            <span style={{ color: "#8b949e" }}>: </span>
                            <span style={{ color: "#a5d6ff" }}>"get_current_weather"</span>
                            {",\n"}
                            {"  "}
                            <span style={{ color: "#79c0ff" }}>"description"</span>
                            <span style={{ color: "#8b949e" }}>: </span>
                            <span
                                style={{
                                    color: "#a5d6ff",
                                    opacity: highlight,
                                }}
                            >
                                "获取指定城市的当前天气"
                            </span>
                            {",  "}
                            <span style={{ color: "#3fb950" }}>{"// ← 关键！"}</span>
                            {"\n"}
                            {"  "}
                            <span style={{ color: "#79c0ff" }}>"parameters"</span>
                            <span style={{ color: "#8b949e" }}>: {"{"}</span>
                            {"\n"}
                            {"    "}
                            <span style={{ color: "#79c0ff" }}>"location"</span>
                            <span style={{ color: "#8b949e" }}>: </span>
                            <span style={{ color: "#a5d6ff" }}>"城市名称，例如：北京"</span>
                            {"\n"}
                            {"  "}
                            <span style={{ color: "#8b949e" }}>{"}"}</span>
                            {"\n"}
                            <span style={{ color: "#8b949e" }}>{"}"}</span>
                        </pre>
                    </div>
                </div>
            </div>

            {/* 三个要点 */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    minHeight: 0,
                }}
            >
                {[
                    {
                        opacity: point1Opacity,
                        icon: "📝",
                        color: "#58a6ff",
                        title: "定义工具",
                        desc: "告诉模型你有哪些函数，包括函数名、描述和参数",
                    },
                    {
                        opacity: point2Opacity,
                        icon: "🎯",
                        color: THEME.accent,
                        title: "描述决定一切",
                        desc: "description 写得越清晰，模型调用越准确！",
                    },
                    {
                        opacity: point3Opacity,
                        icon: "🔄",
                        color: "#3fb950",
                        title: "两次调用完成任务",
                        desc: "第一次获取指令 → 执行函数 → 第二次生成回复",
                    },
                ].map((point, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: point.opacity,
                            flex: 1,
                            minHeight: 0,
                        }}
                    >
                        <div
                            style={{
                                background: `rgba(${point.color === "#58a6ff"
                                        ? "88,166,255"
                                        : point.color === THEME.accent
                                            ? "240,136,62"
                                            : "63,185,80"
                                    },0.08)`,
                                borderRadius: "12px",
                                padding: "14px 22px",
                                border: `1px solid ${point.color}25`,
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                height: "100%",
                                boxSizing: "border-box",
                            }}
                        >
                            <span style={{ fontSize: "32px", flexShrink: 0 }}>
                                {point.icon}
                            </span>
                            <div>
                                <span
                                    style={{
                                        fontSize: "26px",
                                        fontWeight: "bold",
                                        color: point.color,
                                        marginRight: "12px",
                                    }}
                                >
                                    {point.title}
                                </span>
                                <span style={{ fontSize: "24px", color: THEME.textPrimary }}>
                                    {point.desc}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AbsoluteFill>
    );
};
