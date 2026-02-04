import { Composition } from "remotion";
import { SupervisedLearningVideo } from "./SupervisedLearningVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SupervisedLearningVideo"
      component={SupervisedLearningVideo}
      durationInFrames={1440}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        title: "5分钟AI，每天搞懂一个知识点(1) - 监督学习"
      }}
    />
  );
};