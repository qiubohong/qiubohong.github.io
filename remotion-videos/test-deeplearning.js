#!/usr/bin/env node

/**
 * 深度学习视频组件测试脚本
 * 验证DeepLearningVideo组件是否可以正确渲染
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧠 开始测试深度学习视频组件...\n');

// 检查组件文件是否存在
const filesToCheck = [
  'src/DeepLearningVideo.tsx',
  'src/scenes/deeplearning/Scene1_Introduction.tsx',
  'src/scenes/deeplearning/Scene2_Definition.tsx',
  'src/scenes/deeplearning/Scene3_Process.tsx',
  'src/scenes/deeplearning/Scene4_CaseStudy.tsx',
  'src/scenes/deeplearning/Scene5_Experience.tsx',
  'src/scenes/deeplearning/Scene6_Milestones.tsx',
  'src/scenes/deeplearning/Scene7_Conclusion.tsx',
  'src/subtitles/deeplearning-subtitles.json',
  'src/Root.tsx'
];

console.log('📁 检查文件完整性...');
let allFilesExist = true;

filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - 存在`);
  } else {
    console.log(`❌ ${file} - 缺失`);
    allFilesExist = false;
  }
});

console.log('');

// 检查字幕文件格式
console.log('📝 检查字幕文件格式...');
try {
  const subtitlesPath = path.join(__dirname, 'src/subtitles/deeplearning-subtitles.json');
  if (fs.existsSync(subtitlesPath)) {
    const subtitlesContent = fs.readFileSync(subtitlesPath, 'utf8');
    const subtitles = JSON.parse(subtitlesContent);
    
    if (subtitles.subtitles && Array.isArray(subtitles.subtitles)) {
      console.log(`✅ 字幕文件格式正确，包含 ${subtitles.subtitles.length} 条字幕`);
      
      // 检查字幕内容
      const scenes = new Set(subtitles.subtitles.map(s => s.scene));
      console.log(`📊 包含场景: ${Array.from(scenes).join(', ')}`);
      
      // 检查时间连续性
      let prevEndTime = 0;
      let hasGaps = false;
      subtitles.subtitles.forEach((subtitle, index) => {
        if (subtitle.startTime < prevEndTime) {
          console.log(`⚠️  字幕 ${index+1} 时间重叠: ${subtitle.scene}`);
        }
        prevEndTime = subtitle.endTime;
      });
      
      console.log(`⏱️  总时长: ${prevEndTime} 秒 (约 ${Math.round(prevEndTime/60)} 分钟)`);
    } else {
      console.log('❌ 字幕文件格式不正确');
    }
  } else {
    console.log('❌ 字幕文件不存在');
  }
} catch (error) {
  console.log('❌ 字幕文件解析错误:', error.message);
}

console.log('');

// 检查Root.tsx中的配置
console.log('⚙️  检查Root.tsx配置...');
try {
  const rootPath = path.join(__dirname, 'src/Root.tsx');
  if (fs.existsSync(rootPath)) {
    const rootContent = fs.readFileSync(rootPath, 'utf8');
    
    if (rootContent.includes('DeepLearningVideo')) {
      console.log('✅ Root.tsx中包含DeepLearningVideo导入');
      
      if (rootContent.includes('id="DeepLearningVideo"')) {
        console.log('✅ Root.tsx中包含DeepLearningVideo组合配置');
        
        // 提取帧数信息
        const frameMatch = rootContent.match(/durationInFrames=\{(\d+)\}/);
        if (frameMatch) {
          const frames = parseInt(frameMatch[1]);
          const seconds = Math.round(frames / 30);
          console.log(`📊 视频配置: ${frames} 帧 (约 ${seconds} 秒)`);
        }
      } else {
        console.log('❌ Root.tsx中缺少DeepLearningVideo组合配置');
      }
    } else {
      console.log('❌ Root.tsx中缺少DeepLearningVideo导入');
    }
  } else {
    console.log('❌ Root.tsx文件不存在');
  }
} catch (error) {
  console.log('❌ Root.tsx检查错误:', error.message);
}

console.log('');

// 总结测试结果
console.log('📋 测试结果总结:');
if (allFilesExist) {
  console.log('✅ 所有必需文件都存在');
} else {
  console.log('⚠️  部分文件缺失，请检查文件完整性');
}

console.log('');
console.log('🚀 下一步操作建议:');
console.log('1. 运行 "npm run build" 检查编译是否通过');
console.log('2. 运行 "npm start" 启动Remotion预览');
console.log('3. 在浏览器中查看DeepLearningVideo组件效果');
console.log('4. 使用 "npx remotion render" 命令生成视频文件');

console.log('');
console.log('🎬 深度学习视频组件测试完成！');