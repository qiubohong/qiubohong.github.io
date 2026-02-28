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

const steps = [
    {
        num: "①",
        skill: "会提问",
        icon: "💬",
        color: "#f0883e",
        prompt: "请你扮演一位幼儿园老师（角色），给我 5 岁的儿子（背景）编一个睡前故事（任务）。故事要有小动物主角，有一点冒险情节，最后要温馨结尾，3 分钟左右能讲完（格式）。",
        result: "AI 生成「小兔子找月亮」故事",
    },
    {
        num: "②",
        skill: "懂审美",
        icon: "🎨",
        color: "#58a6ff",
        prompt: "能不能加一句「咚咚咚，是谁在敲门？」这种重复的句子？小兔子的动作能不能多些「跳一跳」「闻一闻」这种拟声词？",
        result: "孩子眼睛都亮了，要求「再讲一遍」",
    },
    {
        num: "③",
        skill: "请私教",
        icon: "🎓",
        color: "#3fb950",
        prompt: "你能不能用 5 分钟，教我怎么编这种故事？给我一个简单的公式。",
        result: "学会「三步故事法」，自己也能编了",
    },
];

export const ASSScene4_Case2_Story: React.FC = () => {
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

    // 三步骤卡片依次滑入
    const stepOpacities = steps.map((_, i) =>
        interpolate(frame, [30 + i * 35, 58 + i * 35], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const stepYs = steps.map((_, i) =>
        interpolate(frame, [30 + i * 35, 58 + i * 35], [40, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 结论弹入
    const conclusionOpacity = interpolate(frame, [145, 170], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionScale = interpolate(frame, [145, 170], [0.7, 1], {
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
            <div style={{ position: "absolute", top: "8%", right: "6%", fontSize: 65, opacity: 0.06, transform: `translateY(${floatY1}px)` }}>🌙</div>
            <div style={{ position: "absolute", bottom: "10%", left: "5%", fontSize: 55, opacity: 0.06, transform: `translateY(${floatY2}px)` }}>🐰</div>

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: "center" }}>
                <div style={{ fontSize: 14, color: THEME.accent, fontWeight: "bold", marginBottom: 6, letterSpacing: 1 }}>
                    场景二 · 家长给孩子编故事
                </div>
                <h2 style={{ fontSize: 40, fontWeight: "bold", background: THEME.titleGradient, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", margin: "0 0 6px", lineHeight: 1.2 }}>
                    从"伸手党"变成"创作者"
                </h2>
                <div style={{ fontSize: 15, color: THEME.textMuted }}>
                    技能 1（提问）+ 技能 2（审美）+ 技能 9（私教）
                </div>
            </div>

            {/* 三步骤卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 720 }}>
                {steps.map((step, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: stepOpacities[i],
                            transform: `translateY(${stepYs[i]}px)`,
                            background: `${step.color}10`,
                            border: `1px solid ${step.color}44`,
                            borderRadius: 14,
                            padding: "14px 18px",
                            display: "flex",
                            gap: 14,
                            alignItems: "flex-start",
                        }}
                    >
                        {/* 左侧图标 */}
                        <div style={{ flexShrink: 0, textAlign: "center" }}>
                            <div style={{ fontSize: 28 }}>{step.icon}</div>
                            <div style={{ fontSize: 11, color: step.color, fontWeight: "bold", marginTop: 2 }}>{step.num} {step.skill}</div>
                        </div>
                        {/* 右侧内容 */}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, color: THEME.textMuted, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "6px 10px", lineHeight: 1.6, marginBottom: 6, fontStyle: "italic" }}>
                                「{step.prompt}」
                            </div>
                            <div style={{ fontSize: 14, color: step.color, fontWeight: "bold" }}>
                                ✅ {step.result}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `scale(${conclusionScale})`,
                    background: `linear-gradient(135deg, ${THEME.accent}22, ${THEME.accentSub}22)`,
                    border: `2px solid ${THEME.accent}`,
                    borderRadius: 18,
                    padding: "14px 28px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 18, fontWeight: "bold", color: THEME.accentSub }}>
                    🎭 会提问打基础，懂审美调口味，请私教让自己学会——从依赖到独立！
                </div>
            </div>
        </div>
    );
};
