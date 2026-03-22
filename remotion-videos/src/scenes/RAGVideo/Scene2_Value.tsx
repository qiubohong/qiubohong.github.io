import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const THEME = {
  background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)',
  titleGradient: 'linear-gradient(45deg, #58a6ff, #79c0ff)',
  textPrimary: '#c9d1d9',
  textSecondary: '#8b949e',
  accent: '#f0883e',
  gold: '#ffd200',
  cardBackground: 'rgba(255,255,255,0.06)',
};

export const Scene2_Value: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame: frame,
    fps,
    config: { stiffness: 100, damping: 15 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 0.5, 1], [0, 0, 1]);

  // Card 1 animation
  const card1Progress = spring({
    frame: frame - 20,
    fps,
    config: { stiffness: 100, damping: 15 },
  });
  const card1X = interpolate(card1Progress, [0, 1], [-100, 0]);
  const card1Opacity = interpolate(card1Progress, [0, 1], [0, 1]);

  // Card 2 animation
  const card2Progress = spring({
    frame: frame - 40,
    fps,
    config: { stiffness: 100, damping: 15 },
  });
  const card2Y = interpolate(card2Progress, [0, 1], [100, 0]);
  const card2Opacity = interpolate(card2Progress, [0, 1], [0, 1]);

  // Card 3 animation
  const card3Progress = spring({
    frame: frame - 60,
    fps,
    config: { stiffness: 100, damping: 15 },
  });
  const card3X = interpolate(card3Progress, [0, 1], [100, 0]);
  const card3Opacity = interpolate(card3Progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ background: THEME.background }}>
      <div style={{ padding: '80px 64px', height: '100%', boxSizing: 'border-box' }}>
        {/* Title */}
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
            background: THEME.titleGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 64px 0',
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            textAlign: 'center',
          }}
        >
          为什么需要RAG？
        </h1>

        {/* Cards Container */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            alignItems: 'center',
            height: 'calc(100% - 150px)',
          }}
        >
          {/* Problem Card 1 */}
          <div
            style={{
              background: THEME.cardBackground,
              borderRadius: '16px',
              padding: '48px',
              width: '320px',
              transform: `translateX(${card1X}px)`,
              opacity: card1Opacity,
              borderLeft: `4px solid ${THEME.accent}`,
            }}
          >
            <div style={{ fontSize: '96px', marginBottom: '24px' }}>🕜</div>
            <h3
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                color: THEME.accent,
                margin: '0 0 16px 0',
              }}
            >
              知识截止
            </h3>
            <p
              style={{
                fontSize: '24px',
                fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                color: THEME.textSecondary,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              模型不了解最新信息，知识有时效性
            </p>
          </div>

          {/* Problem Card 2 */}
          <div
            style={{
              background: THEME.cardBackground,
              borderRadius: '16px',
              padding: '48px',
              width: '320px',
              transform: `translateY(${card2Y}px)`,
              opacity: card2Opacity,
              borderLeft: `4px solid ${THEME.gold}`,
            }}
          >
            <div style={{ fontSize: '96px', marginBottom: '24px' }}>🔒</div>
            <h3
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                color: THEME.gold,
                margin: '0 0 16px 0',
              }}
            >
              私有数据
            </h3>
            <p
              style={{
                fontSize: '24px',
                fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                color: THEME.textSecondary,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              无法访问企业内部的私密文档和数据
            </p>
          </div>

          {/* Solution Card */}
          <div
            style={{
              background: THEME.cardBackground,
              borderRadius: '16px',
              padding: '48px',
              width: '360px',
              transform: `translateX(${card3X}px)`,
              opacity: card3Opacity,
              borderLeft: `4px solid #3fb950`,
              boxShadow: '0 8px 32px rgba(63, 185, 80, 0.2)',
            }}
          >
            <div style={{ fontSize: '96px', marginBottom: '24px' }}>💡</div>
            <h3
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                color: '#3fb950',
                margin: '0 0 16px 0',
              }}
            >
              RAG解决方案
            </h3>
            <p
              style={{
                fontSize: '24px',
                fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                color: THEME.textPrimary,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              实时从外部知识库检索信息，与模型能力结合
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
