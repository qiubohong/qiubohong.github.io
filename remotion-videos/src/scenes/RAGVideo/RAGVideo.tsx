import React, { useCallback, useMemo } from 'react';
import { AbsoluteFill, Audio, Sequence, useCurrentFrame, useVideoConfig, interpolate, staticFile } from 'remotion';

import { CaptionDisplay } from '../../components/CaptionDisplay';
import { Scene1_Intro } from './Scene1_Intro';
import { Scene2_Value } from './Scene2_Value';
import { Scene3_Architecture } from './Scene3_Architecture';
import { Scene4_Flow } from './Scene4_Flow';
import { Scene5_Embedding } from './Scene5_Embedding';
import { Scene6_Search } from './Scene6_Search';
import { Scene7_Example } from './Scene7_Example';
import { Scene8_Comparison } from './Scene8_Comparison';
import { Scene9_Ending } from './Scene9_Ending';

import subtitlesData from '../../subtitles/RAGVideo/subtitles.json';

interface SubtitleItem {
  scene: string;
  startTime: number;
  endTime: number;
  text: string;
}

const SUBTITLES: SubtitleItem[] = subtitlesData.subtitles;

// 视频片段配置（根据音频时长计算）
const SCENE_CONFIG = [
  { id: 'intro', component: Scene1_Intro, duration: 499, audio: 'scene1.aiff' },
  { id: 'value', component: Scene2_Value, duration: 458, audio: 'scene2.aiff' },
  { id: 'architecture', component: Scene3_Architecture, duration: 361, audio: 'scene3.aiff' },
  { id: 'flow', component: Scene4_Flow, duration: 420, audio: 'scene4.aiff' },
  { id: 'embedding', component: Scene5_Embedding, duration: 405, audio: 'scene5.aiff' },
  { id: 'search', component: Scene6_Search, duration: 414, audio: 'scene6.aiff' },
  { id: 'example', component: Scene7_Example, duration: 467, audio: 'scene7.aiff' },
  { id: 'comparison', component: Scene8_Comparison, duration: 514, audio: 'scene8.aiff' },
  { id: 'ending', component: Scene9_Ending, duration: 439, audio: 'scene9.aiff' },
];

// 计算每个片段的开始帧
const calculateSceneStartFrames = () => {
  const startFrames: number[] = [];
  let currentFrame = 0;
  
  for (const config of SCENE_CONFIG) {
    startFrames.push(currentFrame);
    currentFrame += config.duration;
  }
  
  return startFrames;
};

export const RAGVideo = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const startFrames = useMemo(() => calculateSceneStartFrames(), []);
  
  const getCurrentSceneIndex = useCallback(() => {
    for (let i = startFrames.length - 1; i >= 0; i--) {
      if (frame >= startFrames[i]) {
        return i;
      }
    }
    return 0;
  }, [frame, startFrames]);
  
  const currentSceneIndex = getCurrentSceneIndex();
  const currentSceneId = SCENE_CONFIG[currentSceneIndex].id;
  
  // 获取当前场景内的帧位置
  const getCurrentSceneFrame = useCallback(() => {
    return frame - startFrames[currentSceneIndex];
  }, [frame, startFrames, currentSceneIndex]);
  
  const currentSceneFrame = getCurrentSceneFrame();
  
  // 获取当前字幕
  const getCurrentSubtitle = useCallback(() => {
    const sceneFrame = currentSceneFrame;
    
    const sceneSubtitles = SUBTITLES.filter(
      (sub) => sub.scene === `Scene${currentSceneIndex + 1}_${currentSceneId.charAt(0).toUpperCase() + currentSceneId.slice(1)}`
    );
    
    for (const subtitle of sceneSubtitles) {
      if (sceneFrame >= subtitle.startTime && sceneFrame < subtitle.endTime) {
        return subtitle.text;
      }
    }
    
    return '';
  }, [currentSceneFrame, currentSceneIndex, currentSceneId]);
  
  const currentSubtitle = getCurrentSubtitle();
  
  // 计算总帧数
  const totalFrames = useMemo(() => {
    return SCENE_CONFIG.reduce((acc, config) => acc + config.duration, 0);
  }, []);

  // 进度条动画
  const progress = useMemo(() => {
    return interpolate(frame, [0, totalFrames], [0, 100], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }, [frame, totalFrames]);

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)',
        width,
        height,
      }}
    >
      {/* 进度条 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${progress}%`,
          height: '4px',
          background: 'linear-gradient(90deg, #58a6ff, #79c0ff)',
          zIndex: 1000,
        }}
      />

      {/* 场景序列 */}
      {SCENE_CONFIG.map((config, index) => {
        const Component = config.component;
        return (
          <Sequence
            key={config.id}
            from={startFrames[index]}
            durationInFrames={config.duration}
          >
            <Component />
            {/* 音频 */}
            <Audio
              src={staticFile(`RAGVideo/audios/${config.audio}`)}
              startFrom={0}
              endAt={config.duration}
            />
          </Sequence>
        );
      })}

      {/* 字幕组件 */}
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          zIndex: 100,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '85%',
            maxWidth: '1000px',
            background: 'rgba(0,0,0,0.75)',
            padding: '24px 40px',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <CaptionDisplay text={currentSubtitle} />
        </div>
      </AbsoluteFill>

      {/* 当前场景指示器 */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          background: 'rgba(0,0,0,0.6)',
          padding: '12px 20px',
          borderRadius: 24,
          fontSize: 16,
          fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
          color: '#8b949e',
          zIndex: 100,
        }}
      >
        {currentSceneIndex + 1} / {SCENE_CONFIG.length}
      </div>
    </AbsoluteFill>
  );
};

// 导出配置供Root.tsx使用
export const RAGVideoConfig = {
  id: 'RAGVideo',
  component: RAGVideo,
  durationInFrames: 3977, // 所有场景帧数总和
  width: 1280,
  height: 720,
  fps: 30,
};
