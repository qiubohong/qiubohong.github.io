import { Config } from "@remotion/cli/config";

// 设置 Chromium OpenGL 渲染器，解决 macOS 上 WebGL 上下文获取失败的问题
// Config.setChromiumOptions({
//   gl: "angle",
// });

Config.setChromiumOpenGlRenderer("angle");

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// 确保视频渲染时包含音频
Config.setCodec("h264"); // 使用 H.264 编码
Config.setAudioCodec("aac"); // 使用 AAC 音频编码
Config.setPixelFormat("yuv420p"); // 兼容性更好的像素格式
