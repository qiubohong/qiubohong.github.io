import React, { useMemo, useState, useEffect } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, staticFile } from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption, TikTokPage } from "@remotion/captions";

interface CaptionDisplayProps {
  captions?: Caption[];
  captionFile?: string;
  bottomOffset?: number;
  fontSize?: number;
  highlightColor?: string;
  normalColor?: string;
  combineTokensWithinMilliseconds?: number;
}

const SWITCH_CAPTIONS_EVERY_MS = 1200;

export const CaptionDisplay: React.FC<CaptionDisplayProps> = ({
  captions: captionsProp,
  captionFile,
  bottomOffset = 100,
  fontSize = 40,
  highlightColor = "#ffd200",
  normalColor = "#c9d1d9",
  combineTokensWithinMilliseconds = SWITCH_CAPTIONS_EVERY_MS,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [loadedCaptions, setLoadedCaptions] = useState<Caption[]>([]);

  // 如果从文件加载字幕
  useEffect(() => {
    if (captionFile) {
      const loadCaptions = async () => {
        try {
          const response = await fetch(staticFile(captionFile));
          if (response.ok) {
            const data = await response.json();
            setLoadedCaptions(Array.isArray(data) ? data : []);
          }
        } catch (e) {
          console.error("Failed to load captions:", e);
          setLoadedCaptions([]);
        }
      };
      loadCaptions();
    }
  }, [captionFile]);

  // 优先使用传入的captions，其次使用从文件加载的
  const captions = captionsProp || loadedCaptions;

  // 创建页面
  const { pages } = useMemo(() => {
    if (!captions || captions.length === 0) {
      return { pages: [] };
    }
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds,
    });
  }, [captions, combineTokensWithinMilliseconds]);

  // 找到当前应该显示的页面
  const currentTimeMs = (frame / fps) * 1000;
  const currentPage = pages.find((page, index) => {
    const nextPage = pages[index + 1];
    const pageEndMs = nextPage ? nextPage.startMs : page.startMs + combineTokensWithinMilliseconds;
    return currentTimeMs >= page.startMs / 1000 && currentTimeMs < pageEndMs / 1000;
  });

  if (!currentPage) {
    return null;
  }

  // 计算当前时间（相对页面开始）
  const pageStartMs = currentPage.startMs;
  const relativeTimeMs = currentTimeMs * 1000 - pageStartMs;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: bottomOffset,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontSize,
          fontWeight: "bold",
          whiteSpace: "pre-wrap",
          textAlign: "center",
          maxWidth: "90%",
          lineHeight: 1.5,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}
      >
        {currentPage.tokens.map((token, index) => {
          const isActive =
            token.fromMs - pageStartMs <= relativeTimeMs &&
            token.toMs - pageStartMs > relativeTimeMs;

          return (
            <span
              key={`${token.fromMs}-${index}`}
              style={{
                color: isActive ? highlightColor : normalColor,
                transition: "color 0.1s ease",
              }}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 带加载状态的字幕显示组件
export const CaptionDisplayWithLoader: React.FC<
  Omit<CaptionDisplayProps, "captions"> & { captionsPath: string }
> = ({ captionsPath, ...props }) => {
  const [captions, setCaptions] = React.useState<Caption[] | null>(null);

  React.useEffect(() => {
    const loadCaptions = async () => {
      try {
        const response = await fetch(staticFile(captionsPath));
        if (response.ok) {
          const data = await response.json();
          setCaptions(data);
        }
      } catch (e) {
        console.error("Failed to load captions:", e);
      }
    };
    loadCaptions();
  }, [captionsPath]);

  if (!captions) {
    return null;
  }

  return <CaptionDisplay captions={captions} {...props} />;
};
