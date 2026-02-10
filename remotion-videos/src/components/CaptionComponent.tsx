import React, { useState, useEffect, useCallback } from "react";
import { AbsoluteFill, staticFile, useDelayRender, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { Audio } from "@remotion/media";
import type { Caption } from "@remotion/captions";

interface CaptionComponentProps {
  audioFile: string;
  captionFile: string;
  startTimeMs?: number; // 可选：当前Sequence在视频中的起始时间（毫秒）
}

export const CaptionComponent: React.FC<CaptionComponentProps> = ({
  audioFile,
  captionFile,
  startTimeMs = 0,
}) => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender());
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fetchCaptions = useCallback(async () => {
    try {
      const response = await fetch(staticFile(captionFile));
      const data = await response.json();
      
      // 验证并转换字幕数据格式
      const validatedCaptions = Array.isArray(data) ? data.map(caption => ({
        text: caption.text || caption.content || '',
        startMs: caption.startMs || caption.start || caption.timestampMs || 0,
        endMs: caption.endMs || caption.end || caption.timestampMs + 2000 || 2000,
        timestampMs: caption.timestampMs || caption.startMs || 0,
        confidence: caption.confidence || 0.95
      })) : [];
      
      setCaptions(validatedCaptions);
      continueRender(handle);
    } catch (e) {
      console.warn(`字幕文件加载失败: ${captionFile}`, e);
      setCaptions([]);
      continueRender(handle);
    }
  }, [continueRender, cancelRender, handle, captionFile]);

  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  if (!captions) {
    return null;
  }

  if (captions.length === 0) {
    return null;
  }

  // 计算当前Sequence内的相对时间（毫秒）
  const globalTimeMs = (frame / fps) * 1000;
  const currentTimeMs = globalTimeMs;

  // 如果当前时间小于0，说明还没到这个Sequence
  if (currentTimeMs < 0) {
    return null;
  }

  // 找到当前应该显示的字幕（逐行显示模式）
  const currentCaption = captions.find((caption) => {
    return (
      currentTimeMs >= caption.startMs &&
      currentTimeMs < caption.endMs
    );
  });

  if (!currentCaption) {
    return null;
  }

  // 调试信息：显示当前时间同步状态
  if (frame % 30 === 0) {
    console.log(`Frame ${frame}: Current time ${currentTimeMs}ms, Caption: "${currentCaption.text}" (${currentCaption.startMs}ms - ${currentCaption.endMs}ms)`);
  }

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 100 }}>
      <div style={{
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
        textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: "12px 25px",
        borderRadius: 10,
        maxWidth: "95%",
        lineHeight: 1.4,
        wordWrap: "break-word",
        overflowWrap: "break-word"
      }}>
        {currentCaption.text}
      </div>
    </AbsoluteFill>
  );
};