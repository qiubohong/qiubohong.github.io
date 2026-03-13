import React, { useState, useEffect } from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

interface CaptionToken {
    text: string;
    startFrame: number;
    endFrame: number;
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
                console.log("Loaded captions data:", data);
                console.log("Data type:", typeof data);
                console.log("Is array?", Array.isArray(data));
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

    // 找到当前字幕条目，完整显示一句话
    const currentCaption = captions.find(
        (caption) => currentFrame >= caption.startFrame && currentFrame < caption.endFrame
    );

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
