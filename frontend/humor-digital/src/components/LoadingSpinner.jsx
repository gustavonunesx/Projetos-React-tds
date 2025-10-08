import React from 'react';

export default function LoadingSpinner({ size = 'medium' }) {
  const sizeClass = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }[size];

  return (
    <div className="flex justify-center items-center p-8">
      <div className={`${sizeClass} border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin`}></div>
    </div>
  );
}