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

const pdfFiles = [
    { icon: "📄", name: "我的 Personal OS_2025版.pdf", color: "#f0883e" },
    { icon: "📄", name: "周报助手_通用规则.pdf", color: "#58a6ff" },
    { icon: "📄", name: "行业报告_精华版.pdf", color: "#3fb950" },
];

const platforms = [
    { icon: "🤖", name: "豆包", color: "#f0883e" },
    { icon: "💎", name: "元宝", color: "#ffd200" },
    { icon: "🔮", name: "DeepSeek", color: "#58a6ff" },
    { icon: "✨", name: "未来新 AI", color: "#3fb950" },
];

export const KGScene4_Step2_PDF: React.FC = () => {
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

    // PDF 文件卡片依次出现
    const pdfOpacities = pdfFiles.map((_, i) =>
        interpolate(frame, [30 + i * 22, 55 + i * 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const pdfYs = pdfFiles.map((_, i) =>
        interpolate(frame, [30 + i * 22, 55 + i * 22], [30, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 箭头动画
    const arrowOpacity = interpolate(frame, [105, 125], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 平台卡片弹入
    const platOpacities = platforms.map((_, i) =>
        interpolate(frame, [130 + i * 16, 153 + i * 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const platScales = platforms.map((_, i) =>
        interpolate(frame, [130 + i * 16, 153 + i * 16], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 结论弹入
    const conclusionOpacity = interpolate(frame, [205, 230], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionScale = interpolate(frame, [205, 230], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // PDF 图标浮动
    const floatY = Math.sin(frame * 0.05) * 6;

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
                gap: 22,
            }}
        >
            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    第二步
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
                    把"宝贝"统一存成 PDF
                </h2>
                <div style={{ fontSize: 18, color: THEME.textMuted, marginTop: 8 }}>
                    跨平台通用，未来兼容
                </div>
            </div>

            {/* PDF 文件示例 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 680 }}>
                {pdfFiles.map((file, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: pdfOpacities[i],
                            transform: `translateY(${pdfYs[i]}px)`,
                            background: THEME.cardBg,
                            borderRadius: 14,
                            padding: "14px 20px",
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            borderLeft: `4px solid ${file.color}`,
                        }}
                    >
                        <span style={{ fontSize: 28, transform: `translateY(${floatY * (i % 2 === 0 ? 1 : -1)}px)` }}>{file.icon}</span>
                        <div style={{ fontSize: 18, color: file.color, fontWeight: "bold" }}>
                            {file.name}
                        </div>
                    </div>
                ))}
            </div>

            {/* 箭头 + 平台 */}
            <div
                style={{
                    opacity: arrowOpacity,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 28, color: THEME.accent }}>⬇️ 上传到任意平台</div>
                <div style={{ display: "flex", gap: 14, width: "100%" }}>
                    {platforms.map((plat, i) => (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                opacity: platOpacities[i],
                                transform: `scale(${platScales[i]})`,
                                background: `${plat.color}12`,
                                border: `1px solid ${plat.color}44`,
                                borderRadius: 12,
                                padding: "12px 8px",
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: 28, marginBottom: 6 }}>{plat.icon}</div>
                            <div style={{ fontSize: 16, color: plat.color, fontWeight: "bold" }}>{plat.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `scale(${conclusionScale})`,
                    background: `linear-gradient(135deg, ${THEME.accent}22, ${THEME.accentSub}22)`,
                    border: `2px solid ${THEME.accent}`,
                    borderRadius: 20,
                    padding: "14px 32px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 20, fontWeight: "bold", color: THEME.accentSub }}>
                    一次整理，到处可用——哪天出了更厉害的 AI，上传 PDF 秒变"老朋友"！
                </div>
            </div>
        </div>
    );
};
