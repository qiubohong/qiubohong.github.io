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
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
};

const SWITCH_CAPTIONS_EVERY_MS = 1200;

export const Scene2_Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [captions, setCaptions] = useState<Caption[]>([]);

  useEffect(() => {
    const loadCaptions = async () => {
      try {
        const response = await fetch(staticFile("DeepSeekVideo/scene2-captions.json"));
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

  // 左侧面板滑入
  const leftPanelX = spring({
    frame: frame - 5,
    fps,
    config: { stiffness: 100, damping: 20 },
  });

  // 右侧图片淡入
  const imageOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 列表项逐个弹入
  const getItemStyle = (delay: number) => ({
    opacity: interpolate(frame, [15 + delay, 30 + delay], [0, 1], { extrapolateRight: "clamp" }),
    transform: `translateX(${interpolate(frame, [15 + delay, 30 + delay], [30, 0], { extrapolateRight: "clamp" })}px)`,
  });

  // 结论高亮
  const conclusionOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  const conclusionScale = spring({
    frame: frame - 90,
    fps,
    config: { stiffness: 120, damping: 15 },
  });

  const models = [
    { name: "DeepSeek-V3", desc: "基座模型 · 2024.12发布", color: "#8b949e", detail: "MoE架构 · 671B参数" },
    { name: "DeepSeek-R1", desc: "基于V3的推理模型 · 2025.1发布", color: THEME.primary, detail: "思维链技术 · 震惊全球" },
    { name: "DeepSeek-V4", desc: "下一代基座 · 多模态+长期记忆", color: "#8b949e", detail: "传闻2026.4上线", isFuture: true },
    { name: "DeepSeek-R2", desc: "基于V4的推理模型", color: THEME.secondary, detail: "原计划2025.5 · 多次延迟", isFuture: true },
  ];

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        fontFamily: THEME.fontFamily,
        display: "flex",
        flexDirection: "row",
        padding: "48px",
      }}
    >
      {/* 左侧面板 */}
      <div
        style={{
          flex: 1,
          paddingRight: 32,
          transform: `translateX(${(1 - leftPanelX) * -50}px)`,
        }}
      >
        {/* 标题 */}
        <div
          style={{
            background: `linear-gradient(90deg, ${THEME.primary}20, transparent)`,
            borderLeft: `4px solid ${THEME.primary}`,
            padding: "16px 24px",
            marginBottom: 32,
            borderRadius: "0 12px 12px 0",
          }}
        >
          <h2
            style={{
              fontSize: 32,
              color: THEME.primary,
              fontWeight: "bold",
              margin: 0,
            }}
          >
            模型关系解析
          </h2>
          <p style={{ fontSize: 18, color: THEME.textSecondary, margin: "8px 0 0 0" }}>
            先厘清几个关键事实
          </p>
        </div>

        {/* 模型列表 */}
        <div style={{ marginBottom: 24 }}>
          {models.map((model, index) => (
            <div
              key={model.name}
              style={{
                ...getItemStyle(index * 10),
                display: "flex",
                flexDirection: "column",
                padding: "16px 20px",
                marginBottom: 16,
                background: model.isFuture ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)",
                borderRadius: 12,
                border: `1px solid ${model.isFuture ? "#8b949e30" : model.color + "40"}`,
                borderLeft: `4px solid ${model.color}`,
                opacity: getItemStyle(index * 10).opacity,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: model.color,
                    marginRight: 12,
                  }}
                >
                  {model.name}
                </span>
                {model.isFuture && (
                  <span
                    style={{
                      fontSize: 12,
                      background: "rgba(240,136,62,0.2)",
                      color: THEME.accent,
                      padding: "2px 8px",
                      borderRadius: 10,
                    }}
                  >
                    待发布
                  </span>
                )}
              </div>
              <span style={{ fontSize: 16, color: THEME.textPrimary, marginBottom: 4 }}>
                {model.desc}
              </span>
              <span style={{ fontSize: 14, color: THEME.textSecondary }}>{model.detail}</span>
            </div>
          ))}
        </div>

        {/* 核心结论 */}
        <div
          style={{
            background: `linear-gradient(135deg, ${THEME.accent}20, ${THEME.highlight}10)`,
            borderRadius: 16,
            padding: "20px",
            border: `2px solid ${THEME.accent}50`,
            opacity: conclusionOpacity,
            transform: `scale(${0.9 + conclusionScale * 0.1})`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 26,
              color: THEME.accent,
              fontWeight: "bold",
              margin: 0,
            }}
          >
            ⚡ 核心逻辑
          </p>
          <p
            style={{
              fontSize: 22,
              color: THEME.textPrimary,
              margin: "8px 0 0 0",
            }}
          >
            V4不出，R2就出不来！
          </p>
        </div>
      </div>

      {/* 右侧图片 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: imageOpacity,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: 20,
            padding: 24,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Img
            src={staticFile("DeepSeekVideo/model-architecture.png")}
            style={{
              maxWidth: 440,
              maxHeight: 440,
              borderRadius: 12,
            }}
          />
          <p
            style={{
              textAlign: "center",
              fontSize: 16,
              color: THEME.textSecondary,
              margin: "16px 0 0 0",
            }}
          >
            DeepSeek 模型架构关系
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
    </AbsoluteFill>
  );
};
