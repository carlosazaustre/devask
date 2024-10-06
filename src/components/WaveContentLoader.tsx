"use client";

import React from "react";
import ContentLoader from "react-content-loader";
import "@/styles/skeletonWave.css";

const WaveContentLoader: React.FC<
  React.ComponentProps<typeof ContentLoader>
> = (props) => (
  <div className="wave-loader">
    <ContentLoader
      {...props}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      backgroundOpacity={1}
      foregroundOpacity={1}
      speed={1.2}
      gradientRatio={3}
    >
      {props.children}
    </ContentLoader>
  </div>
);

export default WaveContentLoader;
