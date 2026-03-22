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
  highlight: "#ffd200",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
};

const SWITCH_CAPTIONS_EVERY_MS = 1200;

export const Scene1_Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [captions, setCaptions] = useState<Caption[]>([]);

  // 加载字幕
  useEffect(() => {
    const loadCaptions = async () => {
      try {
        const response = await fetch(staticFile("DeepSeekVideo/scene1-captions.json"));
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

  // 创建页面
  const pages = React.useMemo(() => {
    if (captions.length === 0) return [];
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
    }).pages;
  }, [captions]);

  // 计算当前时间
  const currentTimeMs = (frame / fps) * 1000;

  // 找到当前应该显示的页面
  const currentPage = pages.find((page, index) => {
    const nextPage = pages[index + 1];
    const pageEndMs = nextPage ? nextPage.startMs : page.startMs + SWITCH_CAPTIONS_EVERY_MS;
    return currentTimeMs * 1000 >= page.startMs && currentTimeMs * 1000 < pageEndMs;
  });

  // 背景图淡入缩放
  const bgOpacity = interpolate(frame, [0, 30], [0, 0.25], {
    extrapolateRight: "clamp",
  });
  const bgScale = interpolate(frame, [0, 120], [1.1, 1], {
    extrapolateRight: "clamp",
  });

  // 标题弹簧动画
  const titleY = spring({
    frame: frame - 10,
    fps,
    config: { stiffness: 100, damping: 20 },
  });

  // 副标题淡入
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 关键数据淡入
  const dataOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 核心问题高亮
  const questionOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        fontFamily: THEME.fontFamily,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 背景图片 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: bgOpacity,
          transform: `scale(${bgScale})`,
        }}
      >
        <Img
          src={staticFile("DeepSeekVideo/deepseek-cover.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 渐变遮罩 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(13,17,23,0.3) 0%, rgba(13,17,23,0.8) 100%)",
        }}
      />

      {/* 主内容区 */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "60px 60px 140px 60px",
          textAlign: "center",
        }}
      >
        {/* 开场标签 */}
        <div
          style={{
            background: "rgba(88,166,255,0.15)",
            border: "1px solid rgba(88,166,255,0.3)",
            borderRadius: 20,
            padding: "8px 20px",
            marginBottom: 32,
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <span style={{ fontSize: 20, color: THEME.primary, fontWeight: 500 }}>
            DeepSeek 深度观察
          </span>
        </div>

        {/* 主标题 */}
        <h1
          style={{
            fontSize: 56,
            fontWeight: "bold",
            marginBottom: 16,
            transform: `translateY(${(1 - titleY) * 30}px)`,
            background: `linear-gradient(45deg, ${THEME.primary}, ${THEME.secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          DeepSeek V4/R2
        </h1>
        <h2
          style={{
            fontSize: 40,
            color: THEME.textPrimary,
            fontWeight: 600,
            marginBottom: 40,
            opacity: subtitleOpacity,
          }}
        >
          为何双双难产？
        </h2>

        {/* 关键数据展示 */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginBottom: 40,
            opacity: dataOpacity,
          }}
        >
          {[
            { value: "2025.1", label: "R1 发布", color: THEME.primary },
            { value: "50%→3%", label: "使用率暴跌", color: "#f85149" },
            { value: "近1年", label: "V4/R2 缺席", color: THEME.accent },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: 12,
                padding: "16px 24px",
                textAlign: "center",
                border: `1px solid ${item.color}30`,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: "bold", color: item.color, marginBottom: 4 }}>
                {item.value}
              </div>
              <div style={{ fontSize: 16, color: THEME.textSecondary }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* 核心问题 */}
        <div
          style={{
            background: "rgba(240,136,62,0.15)",
            borderRadius: 16,
            padding: "20px 40px",
            border: "1px solid rgba(240,136,62,0.3)",
            opacity: questionOpacity,
          }}
        >
          <p
            style={{
              fontSize: 28,
              color: THEME.accent,
              fontWeight: 600,
              margin: 0,
            }}
          >
            这背后是战略定力，还是方向迷失？
          </p>
        </div>
      </div>

      {/* 字幕显示 */}
      {currentPage && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 0,
            right: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 36,
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
    </AbsoluteFill>
  );
};
