import React, { useEffect, useState } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, staticFile, spring, useVideoConfig } from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption } from "@remotion/captions";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
  primary: "#58a6ff",
  secondary: "#79c0ff",
  accent: "#f0883e",
  highlight: "#ffd200",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
};

const SWITCH_CAPTIONS_EVERY_MS = 1200;

export const Scene3_SweetSpot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [captions, setCaptions] = useState<Caption[]>([]);

  useEffect(() => {
    const loadCaptions = async () => {
      try {
        const response = await fetch(staticFile("DeepSeekVideo/scene3-captions.json"));
        if (response.ok) {
          const data = await response.json();
          setCaptions(data);
        }
      } catch (e) {
        console.error("Failed to load captions:", e);
      }
    };
    loadCaptions();
  }, []);

  const pages = React.useMemo(() => {
    if (captions.length === 0) return [];
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
    }).pages;
  }, [captions]);

  const currentTimeMs = (frame / fps) * 1000;
  const currentPage = pages.find((page, index) => {
    const nextPage = pages[index + 1];
    const pageEndMs = nextPage ? nextPage.startMs : page.startMs + SWITCH_CAPTIONS_EVERY_MS;
    return currentTimeMs * 1000 >= page.startMs && currentTimeMs * 1000 < pageEndMs;
  });

  // 标题栏淡入
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 两个观点卡片弹入
  const leftCardX = spring({
    frame: frame - 15,
    fps,
    config: { stiffness: 100, damping: 20 },
  });

  const rightCardX = spring({
    frame: frame - 25,
    fps,
    config: { stiffness: 100, damping: 20 },
  });

  // 辩论标签
  const tagOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 图表区域
  const chartOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        fontFamily: THEME.fontFamily,
        display: "flex",
        flexDirection: "column",
        padding: "48px",
      }}
    >
      {/* 标题栏 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 32,
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(88,166,255,0.15)",
            border: `1px solid ${THEME.primary}40`,
            borderRadius: 20,
            padding: "8px 24px",
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 18, color: THEME.primary }}>第一轮辩论</span>
        </div>
        <h2
          style={{
            fontSize: 40,
            color: THEME.textPrimary,
            fontWeight: "bold",
            margin: 0,
          }}
        >
          V4未出，R2何来？
        </h2>
      </div>

      {/* 辩论双方 */}
      <div
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 32,
          flex: 1,
        }}
      >
        {/* 观点一：乐观解读 */}
        <div
          style={{
            flex: 1,
            background: "rgba(88,166,255,0.08)",
            borderRadius: 20,
            padding: 28,
            border: `2px solid ${THEME.primary}30`,
            transform: `translateX(${(1 - leftCardX) * -100}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 32, marginRight: 12 }}>💡</span>
            <span
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: THEME.primary,
              }}
            >
              观点一：战略升级
            </span>
          </div>
          <div style={{ fontSize: 20, color: THEME.textPrimary, lineHeight: 1.7 }}>
            <p style={{ marginBottom: 16 }}>
              V4没出是因为在下一盘<strong style={{ color: THEME.highlight }}>大棋</strong>
            </p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 12 }}>多模态能力补齐</li>
              <li style={{ marginBottom: 12 }}>AI搜索整合</li>
              <li>长期记忆架构</li>
            </ul>
          </div>
          <div
            style={{
              marginTop: 20,
              padding: 12,
              background: "rgba(88,166,255,0.15)",
              borderRadius: 10,
              fontSize: 18,
              color: THEME.primary,
              textAlign: "center",
            }}
          >
            这不是延迟，是战略升级
          </div>
        </div>

        {/* 观点二：现实质疑 */}
        <div
          style={{
            flex: 1,
            background: "rgba(248,81,73,0.08)",
            borderRadius: 20,
            padding: 28,
            border: "2px solid rgba(248,81,73,0.3)",
            transform: `translateX(${(1 - rightCardX) * 100}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 32, marginRight: 12 }}>⚠️</span>
            <span
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#f85149",
              }}
            >
              观点二：数据危机
            </span>
          </div>
          <div style={{ fontSize: 20, color: THEME.textPrimary, lineHeight: 1.7 }}>
            <p style={{ marginBottom: 16 }}>
              业内爆料：<strong style={{ color: "#f85149" }}>训练数据出了问题</strong>
            </p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 12 }}>R2需用国产数据训练</li>
              <li style={{ marginBottom: 12 }}>国内高质量数据不足</li>
              <li>幻觉问题失控</li>
            </ul>
          </div>
          <div
            style={{
              marginTop: 20,
              padding: 12,
              background: "rgba(248,81,73,0.15)",
              borderRadius: 10,
              fontSize: 18,
              color: "#f85149",
              textAlign: "center",
            }}
          >
            这不是战略，是数据危机
          </div>
        </div>
      </div>

        {/* 关键证据 */}
        <div
          style={{
            display: "flex",
            gap: 16,
            opacity: tagOpacity,
            marginBottom: 80,
          }}
        >
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              padding: 16,
              borderLeft: `4px solid ${THEME.accent}`,
            }}
          >
            <span style={{ fontSize: 16, color: THEME.textSecondary }}>关键证据</span>
            <p style={{ fontSize: 18, color: THEME.textPrimary, margin: "8px 0 0 0" }}>
              R1-0528版本基座用的仍是<strong style={{ color: THEME.accent }}>V3</strong>，说明V4没ready
            </p>
          </div>
        </div>

        {/* 字幕显示 */}
        {currentPage && (
          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 0,
              right: 0,
              zIndex: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: "bold",
                whiteSpace: "pre-wrap",
                textAlign: "center",
                maxWidth: "90%",
                lineHeight: 1.5,
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              }}
            >
              {currentPage.tokens.map((token, index) => {
                const isActive =
                  token.fromMs <= currentTimeMs * 1000 && token.toMs > currentTimeMs * 1000;

                return (
                  <span
                    key={`${token.fromMs}-${index}`}
                    style={{
                      color: isActive ? "#ffd200" : "#c9d1d9",
                    }}
                  >
                    {token.text}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};