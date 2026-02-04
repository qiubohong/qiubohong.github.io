import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

interface TransitionProps {
  type: 'fade' | 'slide' | 'zoom';
}

export const Transition: React.FC<TransitionProps> = ({ type }) => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(
    frame,
    [0, 30],
    [1, 0],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const slideX = interpolate(
    frame,
    [0, 30],
    [0, -1920],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const scale = interpolate(
    frame,
    [0, 30],
    [1, 0.5],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const getStyle = () => {
    switch (type) {
      case 'fade':
        return {
          opacity: opacity,
          backgroundColor: '#000000'
        };
      case 'slide':
        return {
          transform: `translateX(${slideX}px)`,
          backgroundColor: '#1a1a1a'
        };
      case 'zoom':
        return {
          transform: `scale(${scale})`,
          backgroundColor: '#2a2a2a'
        };
      default:
        return {
          opacity: opacity,
          backgroundColor: '#000000'
        };
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        ...getStyle()
      }}
    />
  );
};