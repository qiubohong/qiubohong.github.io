import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const THEME = {
  background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)',
  titleGradient: 'linear-gradient(45deg, #58a6ff, #79c0ff)',
  textSecondary: '#8b949e',
  accent: '#f0883e',
};

export const Scene3_Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame: frame,
    fps,
    config: { stiffness: 100, damping: 15 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 0.5, 1], [0, 0, 1]);

  // Image animation
  const imageProgress = spring({
    frame: frame - 20,
    fps,
    config: { stiffness: 80, damping: 12 },
  });
  const imageScale = interpolate(imageProgress, [0, 1], [0.9, 1]);
  const imageOpacity = interpolate(imageProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ background: THEME.background }}>
      <div style={{ padding: '48px 64px', height: '100%', boxSizing: 'border-box' }}>
        {/* Title */}
        <h1
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
            background: THEME.titleGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 32px 0',
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            textAlign: 'center',
          }}
        >
          RAG系统架构
        </h1>

        {/* Architecture Image */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100% - 120px)',
          }}
        >
          <Img
            src="/RAGVideo/rag-architecture.png"
            style={{
              maxWidth: '95%',
              maxHeight: '95%',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              transform: `scale(${imageScale})`,
              opacity: imageOpacity,
            }}
          />
        </div>

        {/* Description */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '16px 32px',
          }}
        >
          <p
            style={{
              fontSize: '24px',
              fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
              color: THEME.textSecondary,
              margin: 0,
              textAlign: 'center',
            }}
          >
            <span style={{ color: THEME.accent, fontWeight: 'bold' }}>离线阶段</span>构建知识库，
            <span style={{ color: THEME.accent, fontWeight: 'bold' }}>在线阶段</span>实时检索回答
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
