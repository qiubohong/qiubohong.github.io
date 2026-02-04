import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AbsoluteFill, staticFile, useDelayRender, useCurrentFrame, useVideoConfig } from "remotion";
import type { Caption } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";

interface CaptionComponentProps {
  audioFile: string;
  captionFile: string;
}

const HIGHLIGHT_COLOR = "#39E508";
const SWITCH_CAPTIONS_EVERY_MS = 1200;

export const CaptionComponent: React.FC<CaptionComponentProps> = ({
  audioFile,
  captionFile,
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
      setCaptions(data);
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
    
    // 确保captions是有效的数组格式
    if (!Array.isArray(captions)) {
      console.warn('字幕数据格式错误，期望数组格式，实际得到:', typeof captions);
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

  // 如果没有字幕数据，不显示任何内容
  if (captions.length === 0) {
    return null;
  }

  // 计算当前时间
  const currentTimeMs = (frame / fps) * 1000;

  // 找到当前应该显示的字幕页面
  const currentPage = pages.find(
    (page, index) => {
      const nextPage = pages[index + 1];
      return (
        currentTimeMs >= page.startMs &&
        (nextPage ? currentTimeMs < nextPage.startMs : true)
      );
    }
  );

  if (!currentPage) {
    return null;
  }

  // 计算绝对时间
  const absoluteTimeMs = currentPage.startMs + (frame / fps) * 1000;

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 100 }}>
      <div style={{
        fontSize: 36,
        fontWeight: "bold",
        whiteSpace: "pre",
        textAlign: "center",
        color: "white",
        textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: "20px 40px",
        borderRadius: 10,
        maxWidth: "80%",
        lineHeight: 1.4
      }}>
        {currentPage.tokens.map((token) => {
          const isActive =
            token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;

          return (
            <span
              key={token.fromMs}
              style={{ color: isActive ? HIGHLIGHT_COLOR : "white" }}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};