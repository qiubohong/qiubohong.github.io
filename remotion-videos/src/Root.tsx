import { Composition } from "remotion";
import { SupervisedLearningVideo } from "./SupervisedLearningVideo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="SupervisedLearningVideo"
      component={SupervisedLearningVideo}
      durationInFrames={1500} // 总帧数：50秒（1500帧，30fps）
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        title: "监督学习概念讲解"
      }}
    />
  );
};