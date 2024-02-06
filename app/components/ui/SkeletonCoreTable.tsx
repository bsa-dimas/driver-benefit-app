import React from "react";

export default function SkeletonCoreTable() {
  return (
    <div className="flex flex-col h-96 p-2">
      <div className="flex justify-between">
        <div className="grid grid-cols-2 mb-2">
          <div className="flex gap gap-2">
            <div className="w-40 h-8 bg-gray-300 rounded-sm animate-pulse "></div>
            <div className="w-40 h-8 bg-gray-300 rounded-sm animate-pulse "></div>
          </div>
        </div>
        <div className="w-[220px] h-8 bg-gray-300 rounded-sm animate-pulse "></div>
      </div>
      <div className="overflow-x-auto">
        <div className="w-full h-[200px] bg-gray-300 animate-pulse mb-2"></div>
        <div className="w-full h-10 bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
}
