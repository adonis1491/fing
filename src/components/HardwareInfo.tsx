import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cpu, Battery, Monitor } from 'lucide-react';
import type { VisitorInfo } from '../types/visitor';

interface Props {
  deviceInfo: VisitorInfo['device']['hardware'];
}

export default function HardwareInfo({ deviceInfo }: Props) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-700">Hardware Configuration</h2>
        <Cpu className="w-4 h-4 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500">GPU</p>
          <p className="text-sm font-medium">{deviceInfo.gpu}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500">CPU Architecture</p>
          <p className="text-sm font-medium">{deviceInfo.cpuArchitecture}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500">Total Memory</p>
          <p className="text-sm font-medium">
            {typeof deviceInfo.totalMemory === 'number' 
              ? `${deviceInfo.totalMemory} GB` 
              : deviceInfo.totalMemory}
          </p>
        </div>
        
        {deviceInfo.batteryLevel !== undefined && (
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-500">Battery</p>
              <Battery className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    deviceInfo.batteryLevel > 20 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${deviceInfo.batteryLevel}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-600">
                {deviceInfo.batteryLevel.toFixed(0)}%
                {deviceInfo.isCharging && ' ⚡'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}