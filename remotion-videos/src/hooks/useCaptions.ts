import { useEffect, useState, useMemo } from "react";
import { useVideoConfig } from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption } from "@remotion/captions";

const SWITCH_CAPTIONS_EVERY_MS = 1200;

interface UseCaptionsResult {
  captions: Caption[];
  currentPage:
    | ReturnType<typeof createTikTokStyleCaptions>["pages"][0]
    | undefined;
  currentTimeMs: number;
}

export function useCaptions(captionsJson: Caption[]): UseCaptionsResult {
  const { fps } = useVideoConfig();
  const [frame, setFrame] = useState(0);

  // 获取当前帧 (需要通过context或其他方式传递，这里简化处理)
  useEffect(() => {
    // 这部分在服务端渲染时无法工作，需要改为通过props传递frame
  }, []);

  const pages = useMemo(() => {
    if (captionsJson.length === 0) return [];
    return createTikTokStyleCaptions({
      captions: captionsJson,
      combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
    }).pages;
  }, [captionsJson]);

  return {
    captions: captionsJson,
    currentPage: undefined,
    currentTimeMs: 0,
  };
}

// 用于加载字幕的Hook
export function useLoadCaptions(captionsPath: string): Caption[] {
  const [captions, setCaptions] = useState<Caption[]>([]);

  useEffect(() => {
    const loadCaptions = async () => {
      try {
        // 动态导入以避免服务端渲染问题
        if (typeof window !== "undefined") {
          const response = await fetch(captionsPath);
          if (response.ok) {
            const data = await response.json();
            setCaptions(data);
          }
        }
      } catch (e) {
        console.error("Failed to load captions:", e);
      }
    };
    loadCaptions();
  }, [captionsPath]);

  return captions;
}
