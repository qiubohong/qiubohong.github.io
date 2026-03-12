import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene7_CodeExample: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题淡入
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 代码淡入
    const codeOpacity = interpolate(frame, [30, 50], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 结果淡入
    const resultOpacity = interpolate(frame, [80, 100], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 结尾淡入
    const conclusionOpacity = interpolate(frame, [120, 140], [0, 1], {
        extrapolateRight: "clamp",
    });

    const codeString = `from FlagEmbedding import FlagModel
model = FlagModel('BAAI/bge-large-zh-v1.5', use_fp16=True)
texts = ["深度学习", "神经网络"]
embeddings = model.encode(texts)
similarity = embeddings[0] @ embeddings[1].T
print(f"相似度：{similarity:.2f}")  # 输出：0.92`;

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: 'Noto Sans SC, Arial, sans-serif',
            padding: 48,
        }}>
            <h1
                style={{
                    fontSize: 64,
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: 40,
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                代码实战
            </h1>

            <div style={{ width: "100%", maxWidth: 900 }}>
                {/* 代码块 */}
                <div style={{
                    background: "rgba(13, 17, 23, 0.8)",
                    borderRadius: 16,
                    padding: 32,
                    marginBottom: 30,
                    opacity: codeOpacity,
                    border: "1px solid rgba(48, 54, 61, 0.8)",
                    fontFamily: '"Monaco", "Menlo", "Ubuntu Mono", monospace',
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 20,
                        gap: 8,
                    }}>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                        <span style={{ marginLeft: 16, color: "#8b949e", fontSize: 20 }}>Python</span>
                    </div>
                    <pre style={{
                        color: "#c9d1d9",
                        fontSize: 24,
                        lineHeight: 1.6,
                        margin: 0,
                        whiteSpace: "pre-wrap",
                    }}>
                        {codeString}
                    </pre>
                </div>

                {/* 运行结果 */}
                <div style={{
                    background: "rgba(63, 185, 80, 0.1)",
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 30,
                    opacity: resultOpacity,
                    border: "1px solid rgba(63, 185, 80, 0.3)",
                }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ fontSize: 32, marginRight: 16 }}>✅</span>
                        <div>
                            <p style={{ fontSize: 28, color: "#3fb950", margin: 0, fontWeight: "bold" }}>
                                相似度：0.92
                            </p>
                            <p style={{ fontSize: 22, color: "#c9d1d9", margin: "8px 0 0 0" }}>
                                "深度学习"与"神经网络"高度相关
                            </p>
                        </div>
                    </div>
                </div>

                {/* 结尾 */}
                <div style={{
                    textAlign: "center",
                    opacity: conclusionOpacity,
                }}>
                    <p style={{
                        fontSize: 32,
                        color: "#f0883e",
                        fontWeight: 600,
                        margin: 0,
                    }}>
                        掌握Embedding，握住AI理解世界的"语义密码本"！
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
