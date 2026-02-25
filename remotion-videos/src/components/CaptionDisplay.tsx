import React, { useState, useEffect, useCallback } from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig, Sequence } from "remotion";

interface CaptionToken {
    text: string;
    startMs: number;
    endMs: number;
    timestampMs: number;
    confidence: number;
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

    // 加载字幕文件
    useEffect(() => {
        const loadCaptions = async () => {
            try {
                const response = await fetch(staticFile(captionFile));
                const data = await response.json();
                setCaptions(data);
            } catch (error) {
                console.error("Failed to load captions:", error);
            }
        };
        loadCaptions();
    }, [captionFile]);

    if (!captions) {
        return null;
    }

    // 计算当前时间（毫秒）
    const currentTimeMs = ((frame + startFrom) / fps) * 1000;

    // 找到当前应该显示的字幕
    const currentCaption = captions.find(
        (caption) => currentTimeMs >= caption.startMs && currentTimeMs < caption.endMs
    );

    if (!currentCaption) {
        return null;
    }

    return (
        <AbsoluteFill
            style={{
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 100,
                pointerEvents: "none",
                display: "none",
            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    padding: "16px 32px",
                    borderRadius: 12,
                    maxWidth: "80%",
                    backdropFilter: "blur(10px)",
                }}
            >
                <div
                    style={{
                        fontSize: 42,
                        fontWeight: 600,
                        color: "white",
                        textAlign: "center",
                        lineHeight: 1.4,
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {currentCaption.text}
                </div>
            </div>
        </AbsoluteFill>
    );
};
