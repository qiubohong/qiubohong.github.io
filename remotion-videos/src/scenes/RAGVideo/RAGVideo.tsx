import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';

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

// 视频片段配置（需要根据实际音频时长调整）
const SCENE_CONFIG = [
  { id: 'intro', component: Scene1_Intro, duration: 499, audio: 'RAGVideo/audios/scene1.mp3', caption: 'RAGVideo/scene1-captions.json' },
  { id: 'value', component: Scene2_Value, duration: 458, audio: 'RAGVideo/audios/scene2.mp3', caption: 'RAGVideo/scene2-captions.json' },
  { id: 'architecture', component: Scene3_Architecture, duration: 361, audio: 'RAGVideo/audios/scene3.mp3', caption: 'RAGVideo/scene3-captions.json' },
  { id: 'flow', component: Scene4_Flow, duration: 420, audio: 'RAGVideo/audios/scene4.mp3', caption: 'RAGVideo/scene4-captions.json' },
  { id: 'embedding', component: Scene5_Embedding, duration: 405, audio: 'RAGVideo/audios/scene5.mp3', caption: 'RAGVideo/scene5-captions.json' },
  { id: 'search', component: Scene6_Search, duration: 414, audio: 'RAGVideo/audios/scene6.mp3', caption: 'RAGVideo/scene6-captions.json' },
  { id: 'example', component: Scene7_Example, duration: 467, audio: 'RAGVideo/audios/scene7.mp3', caption: 'RAGVideo/scene7-captions.json' },
  { id: 'comparison', component: Scene8_Comparison, duration: 514, audio: 'RAGVideo/audios/scene8.mp3', caption: 'RAGVideo/scene8-captions.json' },
  { id: 'ending', component: Scene9_Ending, duration: 439, audio: 'RAGVideo/audios/scene9.mp3', caption: 'RAGVideo/scene9-captions.json' },
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

const startFrames = calculateSceneStartFrames();
const totalFrames = SCENE_CONFIG.reduce((acc, config) => acc + config.duration, 0);

interface RAGVideoProps {
  showCaptions?: boolean;
  volume?: number;
}

export const RAGVideo: React.FC<RAGVideoProps> = ({
  showCaptions = true,
  volume = 0.8
}) => {
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)',
      }}
    >
      {/* 场景序列 */}
      {SCENE_CONFIG.map((config, index) => {
        const Component = config.component;
        return (
          <Sequence
            key={config.id}
            from={startFrames[index]}
            durationInFrames={config.duration}
          >
            <AbsoluteFill>
              <Component />
              {/* 音频 */}
              <Audio
                src={staticFile(config.audio)}
                volume={volume}
              />
              {/* 字幕 */}
              {showCaptions && (
                <CaptionDisplay captionFile={config.caption} />
              )}
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

// 导出配置供Root.tsx使用
export const RAGVideoConfig = {
  id: 'RAGVideo',
  component: RAGVideo,
  durationInFrames: totalFrames,
  width: 1280,
  height: 720,
  fps: 30,
};
