"use client";

import ContentLoader from "react-content-loader";

const QuestionDetailSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Título Skeleton */}
      <ContentLoader
        speed={2}
        width="100%"
        height={40}
        backgroundColor="#f0f0f0"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="4" ry="4" width="80%" height="24" />
      </ContentLoader>

      {/* Stats Skeleton (views, answers, timeAgo, author) */}
      <div className="flex gap-2 text-sm text-gray-500 my-2">
        <ContentLoader
          speed={2}
          width="100%"
          height={24}
          backgroundColor="#f0f0f0"
          foregroundColor="#ecebeb"
        >
          {/* Iconos y texto para views, answers, etc */}
          <rect x="0" y="0" rx="4" ry="4" width="6%" height="16" />
          <rect x="7%" y="0" rx="4" ry="4" width="10%" height="16" />
          <rect x="18%" y="0" rx="4" ry="4" width="5%" height="16" />
          <rect x="24%" y="0" rx="4" ry="4" width="4%" height="16" />
        </ContentLoader>
      </div>

      {/* Contenido del artículo Skeleton */}
      <div className="my-3">

        <ContentLoader
          speed={2}
          width="100%"
          height={90}
          backgroundColor="#f0f0f0"
          foregroundColor="#ecebeb"
        >
          {/* Varias líneas de texto */}
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="18" />
          <rect x="0" y="25" rx="4" ry="4" width="90%" height="18" />
          <rect x="0" y="50" rx="4" ry="4" width="95%" height="18" />
          <rect x="0" y="75" rx="4" ry="4" width="60%" height="18" />
        </ContentLoader>
      </div>


      {/* Tags Skeleton */}
      <div className="flex justify-between items-center my-4">
        <ContentLoader
          speed={2}
          height={32}
          backgroundColor="#f0f0f0"
          foregroundColor="#ecebeb"
        >
          {/* 3 Tags */}
          <rect x="0" y="0" rx="12" ry="12" width="140" height="18" />
        </ContentLoader>

        {/* Botones Skeleton (Upvote/Downvote) */}
        <ContentLoader
          speed={2}
          height={40}
          backgroundColor="#f0f0f0"
          foregroundColor="#ecebeb"
        >
          <rect x="70" y="0" rx="4" ry="4" width="100" height="40" />
          <rect x="180" y="0" rx="4" ry="4" width="120" height="40" />
        </ContentLoader>
      </div>

      {/* Answer title */}
      <div className="mt-10 mb-4">
        <ContentLoader
          speed={2}
          width="100%"
          height={40}
          backgroundColor="#f0f0f0"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="4" ry="4" width="8%" height="40" />
        </ContentLoader>
      </div>

      {[...Array(4)].map((_, index) => (
        <div key={index} className="border-t border-gray-200 pt-4 mt-4">
          <ContentLoader
            speed={2}
            width="100%"
            height={70}
            backgroundColor="#f0f0f0"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="100%" height="18" />
            <rect x="0" y="25" rx="4" ry="4" width="100%" height="18" />
            <rect x="0" y="50" rx="4" ry="4" width="95%" height="18" />
          </ContentLoader>
          <div className="my-4">
            <ContentLoader
              speed={2}
              width="100%"
              height={24}
              backgroundColor="#f0f0f0"
              foregroundColor="#ecebeb"
            >
              {/* Iconos y texto para views, answers, etc */}
              <rect x="0" y="0" rx="4" ry="4" width="6%" height="16" />
              <rect x="7%" y="0" rx="4" ry="4" width="12%" height="16" />
            </ContentLoader>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionDetailSkeleton;
