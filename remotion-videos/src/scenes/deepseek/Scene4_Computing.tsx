import React, { useEffect, useState } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile, spring, useVideoConfig } from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption } from "@remotion/captions";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
  primary: "#58a6ff",
  secondary: "#79c0ff",
  accent: "#f0883e",
  highlight: "#3fb950",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
};

const SWITCH_CAPTIONS_EVERY_MS = 1200;

export const Scene4_Computing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [captions, setCaptions] = useState<Caption[]>([]);

  useEffect(() => {
    const loadCaptions = async () => {
      try {
        const response = await fetch(staticFile("DeepSeekVideo/scene4-captions.json"));
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

  // 标题栏
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 图片淡入
  const imageOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 数据卡片弹入
  const getCardStyle = (delay: number) => ({
    opacity: interpolate(frame, [25 + delay, 40 + delay], [0, 1], { extrapolateRight: "clamp" }),
    transform: `translateY(${interpolate(frame, [25 + delay, 40 + delay], [30, 0], { extrapolateRight: "clamp" })}px)`,
  });

  // 辩论卡片
  const leftCardY = spring({
    frame: frame - 40,
    fps,
    config: { stiffness: 100, damping: 20 },
  });

  const rightCardY = spring({
    frame: frame - 50,
    fps,
    config: { stiffness: 100, damping: 20 },
  });

  const dataCards = [
    { value: "8192", unit: "张卡", desc: "华为昇腾Atlas 950集群", icon: "🖥️" },
    { value: "8E", unit: "FLOPS", desc: "总算力规模", icon: "⚡" },
    { value: "16PB/s", unit: "带宽", desc: "集群互联带宽", icon: "🌐" },
  ];

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
          marginBottom: 24,
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(63,185,80,0.15)",
            border: `1px solid ${THEME.highlight}40`,
            borderRadius: 20,
            padding: "8px 24px",
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 18, color: THEME.highlight }}>第二轮辩论</span>
        </div>
        <h2
          style={{
            fontSize: 40,
            color: THEME.textPrimary,
            fontWeight: "bold",
            margin: 0,
          }}
        >
          国产算力生态破局？
        </h2>
      </div>

      {/* 图片展示区 */}
      <div
        style={{
          height: 280,
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 24,
          position: "relative",
          opacity: imageOpacity,
        }}
      >
        <Img
          src={staticFile("DeepSeekVideo/computing-power.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: "linear-gradient(to top, #0d1117, transparent)",
          }}
        />
      </div>

      {/* 核心数据 */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {dataCards.map((card, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              background: "rgba(63,185,80,0.1)",
              borderRadius: 16,
              padding: 20,
              border: `1px solid ${THEME.highlight}30`,
              textAlign: "center",
              opacity: getCardStyle(index * 5).opacity,
              transform: getCardStyle(index * 5).transform,
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
            <div
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: THEME.highlight,
                marginBottom: 4,
              }}
            >
              {card.value}
              <span style={{ fontSize: 16, marginLeft: 4 }}>{card.unit}</span>
            </div>
            <div style={{ fontSize: 14, color: THEME.textSecondary }}>{card.desc}</div>
          </div>
        ))}
      </div>

      {/* 辩论观点 */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>
        {/* 观点一：国产替代 */}
        <div
          style={{
            flex: 1,
            background: "rgba(63,185,80,0.08)",
            borderRadius: 16,
            padding: 20,
            border: `2px solid ${THEME.highlight}40`,
            transform: `translateY(${(1 - leftCardY) * 50}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 24, marginRight: 8 }}>🇨🇳</span>
            <span style={{ fontSize: 20, fontWeight: "bold", color: THEME.highlight }}>
              观点一：国产替代
            </span>
          </div>
          <p
            style={{
              fontSize: 18,
              color: THEME.textPrimary,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            V4要做一件<strong style={{ color: THEME.highlight }}>前无古人</strong>的事——
            完全跑在国产芯片上。DeepSeek V3.1已在测试UE8M0 FP8格式，
            <span style={{ color: THEME.accent }}>成本直降对手的1/50，彻底摆脱英伟达依赖</span>
          </p>
        </div>

        {/* 观点二：算力枯竭 */}
        <div
          style={{
            flex: 1,
            background: "rgba(248,81,73,0.08)",
            borderRadius: 16,
            padding: 20,
            border: "2px solid rgba(248,81,73,0.3)",
            transform: `translateY(${(1 - rightCardY) * 50}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 24, marginRight: 8 }}>🔋</span>
            <span style={{ fontSize: 20, fontWeight: "bold", color: "#f85149" }}>
              观点二：算力枯竭
            </span>
          </div>
          <p
            style={{
              fontSize: 18,
              color: THEME.textPrimary,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            R1上线后推理需求暴涨<strong style={{ color: "#f85149" }}>十倍</strong>。
            幻方囤的A100一半被R1吃掉，一半留给V4训练。
            <span style={{ color: "#f85149" }}>新卡进不来，旧卡不敢动</span>，训练排了快一年！
          </p>
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
