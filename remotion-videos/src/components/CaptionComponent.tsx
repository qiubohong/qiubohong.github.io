import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AbsoluteFill, staticFile, useDelayRender, useCurrentFrame, useVideoConfig } from "remotion";
import type { Caption } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";

// 智能换行函数：将长句子分成多行显示
const wrapTextIntoLines = (tokens: any[], maxCharsPerLine: number = 25) => {
  const lines: any[][] = [];
  let currentLine: any[] = [];
  let currentLineLength = 0;

  tokens.forEach(token => {
    const tokenLength = token.text.trim().length;
    
    // 如果当前行加上新token会超过最大长度，就换行
    if (currentLineLength + tokenLength > maxCharsPerLine && currentLine.length > 0) {
      lines.push([...currentLine]);
      currentLine = [];
      currentLineLength = 0;
    }
    
    currentLine.push(token);
    currentLineLength += tokenLength;
  });

  // 添加最后一行
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines;
};

interface CaptionComponentProps {
  audioFile: string;
  captionFile: string;
}

const HIGHLIGHT_COLOR = "#39E508";
const SWITCH_CAPTIONS_EVERY_MS = 800;

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

  // 使用智能换行将当前页面的tokens分成多行
  const lines = wrapTextIntoLines(currentPage.tokens, 20);

  // 计算当前应该显示的行索引（一行展示一行消失）
  const lineDurationMs = SWITCH_CAPTIONS_EVERY_MS / 2; // 每行显示时间减半，加快切换
  const currentLineIndex = Math.min(
    Math.floor((absoluteTimeMs - currentPage.startMs) / lineDurationMs),
    lines.length - 1
  );

  const currentLine = lines[currentLineIndex];

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap"
        }}>
          {currentLine.map((token) => {
            const isActive =
              token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;

            return (
              <span
                key={token.fromMs}
                style={{ 
                  color: isActive ? HIGHLIGHT_COLOR : "white",
                  display: "inline-block",
                  margin: "0 3px",
                  whiteSpace: "pre"
                }}
              >
                {token.text}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};