import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

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

const listenScenes = [
    { icon: "🏠", activity: "做家务", content: "听一门课", color: "#f0883e" },
    { icon: "🏃", activity: "跑步", content: "听一本书", color: "#58a6ff" },
    { icon: "🚗", activity: "开车", content: "听一个新领域", color: "#3fb950" },
    { icon: "🛏️", activity: "睡前躺床上", content: "听一个感兴趣的话题", color: "#f778ba" },
];

export const ATScene5_Step3_Listen: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleY = interpolate(frame, [0, 25], [-30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 播放按钮动画
    const playOpacity = interpolate(frame, [30, 55], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const playScale = interpolate(frame, [30, 55], [0.5, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    // 播放按钮脉冲
    const playPulse = 1 + Math.sin(frame * 0.1) * 0.06;

    // 四个场景卡片
    const sceneOpacities = listenScenes.map((_, i) =>
        interpolate(frame, [70 + i * 22, 95 + i * 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const sceneScales = listenScenes.map((_, i) =>
        interpolate(frame, [70 + i * 22, 95 + i * 22], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 个人习惯分享
    const habitOpacity = interpolate(frame, [165, 190], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const habitY = interpolate(frame, [165, 190], [20, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 结论弹入
    const conclusionOpacity = interpolate(frame, [210, 235], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionScale = interpolate(frame, [210, 235], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 背景装饰浮动
    const floatY1 = Math.sin(frame * 0.04) * 8;
    const floatY2 = Math.sin(frame * 0.05 + 2) * 6;

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: THEME.bg,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "50px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                gap: 20,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景装饰 */}
            <div style={{ position: "absolute", top: "8%", right: "6%", fontSize: 65, opacity: 0.06, transform: `translateY(${floatY1}px)` }}>🎧</div>
            <div style={{ position: "absolute", bottom: "10%", left: "5%", fontSize: 55, opacity: 0.06, transform: `translateY(${floatY2}px)` }}>🎵</div>

            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    第三步
                </div>
                <h2
                    style={{
                        fontSize: 44,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        margin: 0,
                        lineHeight: 1.2,
                    }}
                >
                    点开"播放"键，边走边听
                </h2>
                <div style={{ fontSize: 17, color: THEME.textMuted, marginTop: 8 }}>
                    大多数国内 AI 应用都有语音朗读功能
                </div>
            </div>

            {/* 播放按钮 */}
            <div
                style={{
                    opacity: playOpacity,
                    transform: `scale(${playScale * playPulse})`,
                    background: `linear-gradient(135deg, ${THEME.accent}, #ff6b35)`,
                    borderRadius: "50%",
                    width: 72,
                    height: 72,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    boxShadow: `0 0 30px ${THEME.accent}66`,
                }}
            >
                ▶️
            </div>

            {/* 四个场景卡片 2×2 */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 14,
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                {listenScenes.map((scene, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: sceneOpacities[i],
                            transform: `scale(${sceneScales[i]})`,
                            background: `${scene.color}12`,
                            border: `1px solid ${scene.color}44`,
                            borderRadius: 14,
                            padding: "14px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                        }}
                    >
                        <span style={{ fontSize: 32, flexShrink: 0 }}>{scene.icon}</span>
                        <div>
                            <div style={{ fontSize: 15, color: THEME.textMuted, marginBottom: 3 }}>{scene.activity}的时候</div>
                            <div style={{ fontSize: 17, color: scene.color, fontWeight: "bold" }}>「{scene.content}」</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 个人习惯分享 */}
            <div
                style={{
                    opacity: habitOpacity,
                    transform: `translateY(${habitY}px)`,
                    background: "rgba(255,210,0,0.08)",
                    border: "1px solid rgba(255,210,0,0.25)",
                    borderRadius: 14,
                    padding: "14px 22px",
                    width: "100%",
                    maxWidth: 680,
                    fontSize: 16,
                    color: THEME.textSecondary,
                    lineHeight: 1.7,
                }}
            >
                💪 我自己的习惯：每天早上健身时，让 AI 生成一篇 15 分钟的小文章，讲一个新话题——一边流汗，一边"听课"，身心一起成长！
            </div>

            {/* 结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `scale(${conclusionScale})`,
                    background: `linear-gradient(135deg, rgba(63,185,80,0.15), rgba(63,185,80,0.05))`,
                    border: "2px solid rgba(63,185,80,0.5)",
                    borderRadius: 20,
                    padding: "14px 32px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 20, fontWeight: "bold", color: "#3fb950" }}>
                    🎧 原本白白流失的碎片时间，全变成了你的"学习黄金时间"！
                </div>
            </div>
        </div>
    );
};
