import React from 'react';
import { Map } from 'lucide-react';

export default function MapPlaceholder() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg">
      <Map className="w-12 h-12 text-gray-400 mb-2" />
      <p className="text-sm text-gray-500">Map preview unavailable</p>
      <p className="text-xs text-gray-400">Google Maps API key not configured</p>
    </div>
  );
}