"use client";

import React from "react";
import WaveContentLoader from "./WaveContentLoader";

const QuestionDetailSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Title Skeleton */}
      <WaveContentLoader width="100%" height={40}>
        <rect x="0" y="0" rx="4" ry="4" width="80%" height="24" />
      </WaveContentLoader>

      {/* Stats Skeleton (views, answers, timeAgo, author) */}
      <div className="flex gap-2 text-sm text-gray-500 my-2">
        <WaveContentLoader width="100%" height={24}>
          {/* Icons and text for views, answers, etc */}
          <rect x="0" y="0" rx="4" ry="4" width="6%" height="16" />
          <rect x="7%" y="0" rx="4" ry="4" width="10%" height="16" />
          <rect x="18%" y="0" rx="4" ry="4" width="5%" height="16" />
          <rect x="24%" y="0" rx="4" ry="4" width="4%" height="16" />
        </WaveContentLoader>
      </div>

      {/* Article content skeleton */}
      <div className="my-3">
        <WaveContentLoader width="100%" height={90}>
          {/* Multiple lines of text */}
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="18" />
          <rect x="0" y="25" rx="4" ry="4" width="90%" height="18" />
          <rect x="0" y="50" rx="4" ry="4" width="95%" height="18" />
          <rect x="0" y="75" rx="4" ry="4" width="60%" height="18" />
        </WaveContentLoader>
      </div>

      {/* Tags Skeleton */}
      <div className="flex justify-between items-center my-4">
        <WaveContentLoader height={18}>
          <rect x="0" y="0" rx="12" ry="12" width="140" height="18" />
        </WaveContentLoader>

        {/* Buttons Skeleton (Upvote/Downvote) */}
        <WaveContentLoader height={38}>
          <rect x="70" y="0" rx="4" ry="4" width="100" height="38" />
          <rect x="180" y="0" rx="4" ry="4" width="120" height="38" />
        </WaveContentLoader>
      </div>

      {/* Answer title */}
      <div className="mt-10 mb-4">
        <WaveContentLoader width="100%" height={30}>
          <rect x="0" y="0" rx="4" ry="4" width="14%" height="40" />
        </WaveContentLoader>
      </div>

      {[...Array(3)].map((_, index) => (
        <div key={index} className="border-t border-gray-200 pt-4 mt-4">
          <WaveContentLoader width="100%" height={70}>
            <rect x="0" y="0" rx="4" ry="4" width="100%" height="18" />
            <rect x="0" y="25" rx="4" ry="4" width="100%" height="18" />
            <rect x="0" y="50" rx="4" ry="4" width="95%" height="18" />
          </WaveContentLoader>
          <div className="my-4">
            <WaveContentLoader width="100%" height={24}>
              {/* Icons and text for reply views, answers, etc */}
              <rect x="0" y="0" rx="4" ry="4" width="6%" height="16" />
              <rect x="7%" y="0" rx="4" ry="4" width="12%" height="16" />
            </WaveContentLoader>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionDetailSkeleton;
