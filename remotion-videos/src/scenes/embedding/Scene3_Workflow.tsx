import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";

const THEME = {
    bg: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)',
    fontFamily: 'Noto Sans SC, Arial, sans-serif',
    titleGradient: 'linear-gradient(45deg, #58a6ff, #79c0ff)',
    accent: '#f0883e',
    textSecondary: '#c9d1d9',
    textMuted: '#8b949e',
    cardBg: 'rgba(255,255,255,0.06)',
};

const steps = [
    {
        step: '01',
        icon: '✂️',
        title: '输入处理',
        desc: '文本拆分为词或子词\n图像分割为像素块',
        color: '#58a6ff',
        detail: 'Tokenization',
    },
    {
        step: '02',
        icon: '🧠',
        title: '语义编码',
        desc: '自注意力机制\n计算上下文关联',
        color: '#3fb950',
        detail: 'Self-Attention',
    },
    {
        step: '03',
        icon: '🗜️',
        title: '池化压缩',
        desc: '多维向量压缩为一维\n平均池化 / CLS向量',
        color: THEME.accent,
        detail: 'Pooling',
    },
    {
        step: '04',
        icon: '📐',
        title: '归一化输出',
        desc: '向量模长归一化为 1\n简化相似度计算',
        color: '#f778ba',
        detail: 'Normalize',
    },
];

export const Scene3_Workflow: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleIn = spring({ fps, frame, config: { damping: 80, stiffness: 200 } });

    // 每个步骤延迟出现
    const stepSprings = steps.map((_, i) =>
        spring({ fps, frame: frame - (20 + i * 18), config: { damping: 80, stiffness: 180 } })
    );

    // 箭头延迟出现（在步骤之后）
    const arrowSprings = steps.slice(0, -1).map((_, i) =>
        spring({ fps, frame: frame - (32 + i * 18), config: { damping: 80, stiffness: 200 } })
    );

    return (
        <AbsoluteFill style={{
            background: THEME.bg,
            fontFamily: THEME.fontFamily,
            display: 'flex',
            flexDirection: 'column',
            padding: '56px 80px',
            overflow: 'hidden',
        }}>
            {/* 标题 */}
            <div style={{
                opacity: titleIn,
                transform: `translateY(${interpolate(titleIn, [0, 1], [30, 0])}px)`,
                marginBottom: 48,
                flexShrink: 0,
            }}>
                <div style={{ fontSize: 17, color: THEME.accent, letterSpacing: 3, marginBottom: 8 }}>WORKFLOW</div>
                <div style={{
                    fontSize: 52, fontWeight: 800,
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>工作流程</div>
                <div style={{ fontSize: 20, color: THEME.textMuted, marginTop: 8 }}>从原始输入到语义向量的四步转化</div>
            </div>

            {/* 步骤流程：横向排列 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                gap: 0,
                overflow: 'hidden',
            }}>
                {steps.map((step, i) => (
                    <React.Fragment key={i}>
                        {/* 步骤卡片 */}
                        <div style={{
                            flex: 1,
                            opacity: stepSprings[i],
                            transform: `translateY(${interpolate(stepSprings[i], [0, 1], [40, 0])}px)`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 0,
                        }}>
                            {/* 步骤编号 */}
                            <div style={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: step.color,
                                letterSpacing: 2,
                                marginBottom: 12,
                                opacity: 0.8,
                            }}>STEP {step.step}</div>

                            {/* 图标圆圈 */}
                            <div style={{
                                width: 88,
                                height: 88,
                                borderRadius: '50%',
                                background: `${step.color}18`,
                                border: `2px solid ${step.color}60`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 40,
                                marginBottom: 20,
                                boxShadow: `0 0 24px ${step.color}30`,
                            }}>{step.icon}</div>

                            {/* 卡片内容 */}
                            <div style={{
                                background: THEME.cardBg,
                                border: `1px solid ${step.color}35`,
                                borderRadius: 16,
                                padding: '20px 18px',
                                width: '100%',
                                textAlign: 'center',
                            }}>
                                <div style={{
                                    fontSize: 22,
                                    fontWeight: 700,
                                    color: step.color,
                                    marginBottom: 10,
                                }}>{step.title}</div>
                                <div style={{
                                    fontSize: 15,
                                    color: THEME.textMuted,
                                    lineHeight: 1.7,
                                    whiteSpace: 'pre-line',
                                    marginBottom: 12,
                                }}>{step.desc}</div>
                                <div style={{
                                    display: 'inline-block',
                                    fontSize: 12,
                                    color: step.color,
                                    background: `${step.color}18`,
                                    padding: '3px 12px',
                                    borderRadius: 20,
                                    letterSpacing: 1,
                                }}>{step.detail}</div>
                            </div>
                        </div>

                        {/* 步骤间箭头 */}
                        {i < steps.length - 1 && (
                            <div style={{
                                opacity: arrowSprings[i],
                                flexShrink: 0,
                                width: 40,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 4,
                                paddingBottom: 20,
                            }}>
                                <div style={{
                                    width: 28,
                                    height: 2,
                                    background: `linear-gradient(90deg, ${steps[i].color}, ${steps[i + 1].color})`,
                                    borderRadius: 1,
                                }} />
                                <div style={{
                                    fontSize: 18,
                                    color: steps[i + 1].color,
                                    lineHeight: 1,
                                }}>▶</div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </AbsoluteFill>
    );
};
