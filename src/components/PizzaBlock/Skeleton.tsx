import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={466.8}
      viewBox="0 0 280 466.8"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="135" cy="122" r="122" />
      <rect x="0" y="270" rx="10" ry="10" width="280" height="23" />
      <rect x="0" y="313" rx="10" ry="10" width="280" height="88" />
      <rect x="0" y="430" rx="10" ry="10" width="91" height="27" />
      <rect x="128" y="420" rx="22" ry="22" width="153" height="46" />
    </ContentLoader>
  </div>
);
