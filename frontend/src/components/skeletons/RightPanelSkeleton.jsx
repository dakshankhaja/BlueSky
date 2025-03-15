import React from 'react';

const RightPanelSkeleton = () => {
  return (
    <div className="w-full p-4">
      <div className="animate-pulse space-y-4">
        {/* Header skeleton */}
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        
        {/* User items skeleton */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightPanelSkeleton; 