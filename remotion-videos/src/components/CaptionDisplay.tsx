import React, { useState, useEffect } from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

interface CaptionToken {
    text: string;
    // 支持帧数格式
    startFrame?: number;
    endFrame?: number;
    // 支持毫秒格式
    startMs?: number;
    endMs?: number;
    timestampMs?: number;
    confidence?: number;
}

interface CaptionDisplayProps {
    captionFile: string;
    startFrom?: number;
}

export const CaptionDisplay: React.FC<CaptionDisplayProps> = ({
    captionFile,
    startFrom = 0
}) => {
    const [captions, setCaptions] = useState<CaptionToken[] | null>(null);
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    useEffect(() => {
        const loadCaptions = async () => {
            try {
                const response = await fetch(staticFile(captionFile));
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCaptions(data);
                } else {
                    console.error("Captions data is not an array:", data);
                }
            } catch (error) {
                console.error("Failed to load captions:", error);
            }
        };
        loadCaptions();
    }, [captionFile]);

    if (!captions) return null;

    // 计算当前帧数（考虑起始偏移）
    const currentFrame = frame + startFrom;
    // 当前时间（毫秒）
    const currentMs = (currentFrame / fps) * 1000;

    // 找到当前字幕条目，兼容 startFrame/endFrame 和 startMs/endMs 两种格式
    const currentCaption = captions.find((caption) => {
        // 优先使用帧数格式
        if (caption.startFrame !== undefined && caption.endFrame !== undefined) {
            return currentFrame >= caption.startFrame && currentFrame < caption.endFrame;
        }
        // 回退到毫秒格式
        if (caption.startMs !== undefined && caption.endMs !== undefined) {
            return currentMs >= caption.startMs && currentMs < caption.endMs;
        }
        return false;
    });

    if (!currentCaption) return null;

    return (
        <AbsoluteFill
            style={{
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 100,
                pointerEvents: "none",
            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    padding: "16px 40px",
                    borderRadius: 12,
                    maxWidth: "85%",
                    backdropFilter: "blur(10px)",
                    display: "none",
                }}
            >
                <div
                    style={{
                        fontSize: 42,
                        fontWeight: 600,
                        color: "white",
                        textAlign: "center",
                        lineHeight: 1.5,
                        wordBreak: "break-all",
                        whiteSpace: "normal",
                    }}
                >
                    {currentCaption.text}
                </div>
            </div>
        </AbsoluteFill>
    );
};
