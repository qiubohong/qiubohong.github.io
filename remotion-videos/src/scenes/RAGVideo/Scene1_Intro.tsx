import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const THEME = {
  background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)',
  titleGradient: 'linear-gradient(45deg, #58a6ff, #79c0ff)',
  textPrimary: '#c9d1d9',
  textSecondary: '#8b949e',
  accent: '#f0883e',
};

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation for title
  const titleProgress = spring({
    frame: frame,
    fps,
    config: { stiffness: 100, damping: 15 },
  });

  const titleY = interpolate(titleProgress, [0, 1], [50, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 0.5, 1], [0, 0, 1]);

  // Animation for subtitle
  const subtitleProgress = spring({
    frame: frame - 15,
    fps,
    config: { stiffness: 100, damping: 15 },
  });

  const subtitleY = interpolate(subtitleProgress, [0, 1], [30, 0]);
  const subtitleOpacity = interpolate(subtitleProgress, [0, 0.5, 1], [0, 0, 1]);

  // Animation for content
  const contentProgress = spring({
    frame: frame - 30,
    fps,
    config: { stiffness: 100, damping: 15 },
  });

  const contentOpacity = interpolate(contentProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ background: THEME.background }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          padding: '64px',
          textAlign: 'center',
        }}
      >
        {/* Main Title */}
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
            background: THEME.titleGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '24px',
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          检索增强生成(RAG)
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '48px',
            fontWeight: '600',
            fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
            color: THEME.textSecondary,
            marginBottom: '48px',
            transform: `translateY(${subtitleY}px)`,
            opacity: subtitleOpacity,
          }}
        >
          Retrieval-Augmented Generation
        </p>

        {/* Introduction Content */}
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: '40px 48px',
            maxWidth: '1000px',
            opacity: contentOpacity,
          }}
        >
          <p
            style={{
              fontSize: '32px',
              fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
              color: THEME.textPrimary,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            想象一下，大模型参加开卷考试，
            <span style={{ color: THEME.accent, fontWeight: 'bold' }}>RAG就是它的知识库</span>
          </p>
          <p
            style={{
              fontSize: '32px',
              fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
              color: THEME.textPrimary,
              lineHeight: 1.6,
              marginTop: '24px',
            }}
          >
            让AI既懂推理，又能查资料，知识永远不过期
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
