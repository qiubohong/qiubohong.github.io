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
    fontFamily: 'Noto Sans SC, Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

export const FC_Scene4_AdvancedCases: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 并行查询卡片
    const parallelOpacity = interpolate(frame, [25, 55], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const parallelSlide = interpolate(frame, [25, 55], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 并行箭头动画
    const arrowOpacity = interpolate(frame, [60, 80], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 股票查询卡片
    const stockOpacity = interpolate(frame, [80, 110], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const stockSlide = interpolate(frame, [80, 110], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 总结卡片
    const summaryOpacity = interpolate(frame, [120, 150], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 脉冲动画
    const pulse = 1 + Math.sin(frame * 0.08) * 0.03;

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
                    bottom: "-100px",
                    right: "-100px",
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(240,136,62,0.06) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, flexShrink: 0 }}>
                <h1
                    style={{
                        fontSize: "60px",
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        marginBottom: "6px",
                    }}
                >
                    进阶案例
                </h1>
                <p style={{ fontSize: "26px", color: THEME.textSecondary }}>
                    并行查询 + 股票查询，解锁更多可能
                </p>
            </div>

            {/* 案例2：并行查询 */}
            <div
                style={{
                    opacity: parallelOpacity,
                    transform: `translateY(${parallelSlide}px)`,
                    flex: 1,
                    minHeight: 0,
                }}
            >
                <div
                    style={{
                        background: "rgba(88,166,255,0.08)",
                        borderRadius: "16px",
                        padding: "20px 28px",
                        border: "1px solid rgba(88,166,255,0.2)",
                        height: "100%",
                        boxSizing: "border-box",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "14px",
                        }}
                    >
                        <span
                            style={{
                                background: "rgba(88,166,255,0.2)",
                                borderRadius: "8px",
                                padding: "4px 12px",
                                fontSize: "20px",
                                color: "#58a6ff",
                                fontWeight: "bold",
                            }}
                        >
                            案例 2
                        </span>
                        <h2
                            style={{
                                fontSize: "36px",
                                fontWeight: "bold",
                                color: "#58a6ff",
                            }}
                        >
                            并行查询 ⚡
                        </h2>
                    </div>

                    {/* 用户问题 */}
                    <div
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            borderRadius: "10px",
                            padding: "12px 18px",
                            marginBottom: "14px",
                            fontSize: "24px",
                            color: THEME.textPrimary,
                        }}
                    >
                        💬 用户问："同时查询北京和上海的天气"
                    </div>

                    {/* 并行执行示意 */}
                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            alignItems: "center",
                            opacity: arrowOpacity,
                        }}
                    >
                        <div
                            style={{
                                flex: 1,
                                background: "rgba(88,166,255,0.1)",
                                borderRadius: "10px",
                                padding: "12px 16px",
                                textAlign: "center",
                                border: "1px solid rgba(88,166,255,0.2)",
                            }}
                        >
                            <div style={{ fontSize: "28px", marginBottom: "4px" }}>🌤️</div>
                            <div style={{ fontSize: "22px", color: "#58a6ff" }}>
                                get_weather("北京")
                            </div>
                        </div>
                        <div
                            style={{
                                fontSize: "28px",
                                color: THEME.accent,
                                transform: `scale(${pulse})`,
                            }}
                        >
                            ⚡
                        </div>
                        <div
                            style={{
                                flex: 1,
                                background: "rgba(88,166,255,0.1)",
                                borderRadius: "10px",
                                padding: "12px 16px",
                                textAlign: "center",
                                border: "1px solid rgba(88,166,255,0.2)",
                            }}
                        >
                            <div style={{ fontSize: "28px", marginBottom: "4px" }}>🌤️</div>
                            <div style={{ fontSize: "22px", color: "#58a6ff" }}>
                                get_weather("上海")
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            marginTop: "10px",
                            fontSize: "22px",
                            color: THEME.textSecondary,
                        }}
                    >
                        设置 <span style={{ color: THEME.accentAlt }}>parallel_tool_calls=True</span>，两个请求同时执行，大幅提升效率！
                    </div>
                </div>
            </div>

            {/* 案例3：股票查询 */}
            <div
                style={{
                    opacity: stockOpacity,
                    transform: `translateY(${stockSlide}px)`,
                    flex: 1,
                    minHeight: 0,
                }}
            >
                <div
                    style={{
                        background: "rgba(63,185,80,0.08)",
                        borderRadius: "16px",
                        padding: "20px 28px",
                        border: "1px solid rgba(63,185,80,0.2)",
                        height: "100%",
                        boxSizing: "border-box",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "14px",
                        }}
                    >
                        <span
                            style={{
                                background: "rgba(63,185,80,0.2)",
                                borderRadius: "8px",
                                padding: "4px 12px",
                                fontSize: "20px",
                                color: "#3fb950",
                                fontWeight: "bold",
                            }}
                        >
                            案例 3
                        </span>
                        <h2
                            style={{
                                fontSize: "36px",
                                fontWeight: "bold",
                                color: "#3fb950",
                            }}
                        >
                            股票查询系统 📈
                        </h2>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                flex: 1,
                                background: "rgba(255,255,255,0.04)",
                                borderRadius: "10px",
                                padding: "12px 18px",
                            }}
                        >
                            <div style={{ fontSize: "22px", color: THEME.textSecondary, marginBottom: "6px" }}>
                                函数定义
                            </div>
                            <div
                                style={{
                                    fontFamily: '"Fira Code", monospace',
                                    fontSize: "20px",
                                    color: "#a5d6ff",
                                }}
                            >
                                get_stock_price(symbol)
                            </div>
                        </div>
                        <div style={{ fontSize: "28px", color: "#3fb950" }}>→</div>
                        <div
                            style={{
                                flex: 1,
                                background: "rgba(63,185,80,0.1)",
                                borderRadius: "10px",
                                padding: "12px 18px",
                                border: "1px solid rgba(63,185,80,0.2)",
                            }}
                        >
                            <div style={{ fontSize: "22px", color: THEME.textSecondary, marginBottom: "6px" }}>
                                用户提问
                            </div>
                            <div style={{ fontSize: "22px", color: THEME.textPrimary }}>
                                "青岛啤酒的股价是多少？"
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 总结 */}
            <div
                style={{
                    opacity: summaryOpacity,
                    flexShrink: 0,
                    background: "rgba(240,136,62,0.08)",
                    borderRadius: "12px",
                    padding: "14px 24px",
                    border: "1px solid rgba(240,136,62,0.2)",
                    textAlign: "center",
                }}
            >
                <span style={{ fontSize: "26px", color: THEME.accent, fontWeight: "bold" }}>
                    🎯 核心价值：将语言理解能力与外部工具执行能力相结合！
                </span>
            </div>
        </AbsoluteFill>
    );
};
