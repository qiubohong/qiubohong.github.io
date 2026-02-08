import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AbsoluteFill, staticFile, useDelayRender, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { Audio } from "@remotion/media";
import type { Caption } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";

interface CaptionComponentProps {
  audioFile: string;
  captionFile: string;
  startTimeMs?: number; // 可选：当前Sequence在视频中的起始时间（毫秒）
}

const HIGHLIGHT_COLOR = "#39E508";
const SWITCH_CAPTIONS_EVERY_MS = 800;

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

  const { pages } = useMemo(() => {
    if (!captions || captions.length === 0) {
      return { pages: [] };
    }
    
    try {
      return createTikTokStyleCaptions({
        captions,
        combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
      });
    } catch (error) {
      console.error('创建TikTok风格字幕失败:', error);
      return { pages: [] };
    }
  }, [captions]);

  if (!captions) {
    return null;
  }

  if (captions.length === 0) {
    return null;
  }

  // 计算当前Sequence内的相对时间（毫秒）
  // 全局时间减去Sequence起始时间
  const globalTimeMs = (frame / fps) * 1000;
  const currentTimeMs = globalTimeMs;
console.log(`Current time ${currentTimeMs}ms`, globalTimeMs, startTimeMs)
  // 如果当前时间小于0，说明还没到这个Sequence
  if (currentTimeMs < 0) {
    return null;
  }

  // 找到当前应该显示的字幕页面
  const currentPage = pages.find((page, index) => {
    const nextPage = pages[index + 1];
    return (
      currentTimeMs >= page.startMs &&
      (nextPage ? currentTimeMs < nextPage.startMs : true)
    );
  });

  if (!currentPage) {
    return null;
  }

  // 计算在当前页面内的相对时间
  const relativeTimeMs = currentTimeMs - currentPage.startMs;

  // 调试信息：显示当前时间同步状态
  if (frame % 30 === 0) {
    console.log(`Sequence Start ${startTimeMs}ms, Frame ${frame}: Global time ${globalTimeMs}ms, Current time ${currentTimeMs}ms, Page start ${currentPage.startMs}ms, Relative time ${relativeTimeMs}ms`);
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
        <div style={{
          alignItems: "center",
        }}>
          {currentPage.tokens.map((token) => {
            const isActive = false;

            return (
              <div
                key={token.fromMs}
                style={{
                  color: isActive ? HIGHLIGHT_COLOR : "white",
                  display: "inline-block",
                  margin: "0 3px",
                  whiteSpace: "pre"
                }}
              >
                {token.text}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};