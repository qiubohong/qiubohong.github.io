import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";
import { loadFont } from "@remotion/google-fonts/NotoSansSC";

// 预加载 Noto Sans SC 字体，确保渲染时与浏览器预览字体一致
// NotoSansSC 的 subsets 为数字编号，不指定则自动加载所有 subsets
loadFont("normal", {
  weights: ["400", "500", "700"],
});

registerRoot(RemotionRoot);
