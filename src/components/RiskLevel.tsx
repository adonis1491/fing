import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, AlertTriangle, AlertOctagon } from 'lucide-react';

interface Props {
  level: 'Low' | 'Medium' | 'High';
}

export default function RiskLevel({ level }: Props) {
  const { t } = useTranslation();

  const config = {
    low: {
      icon: Shield,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    medium: {
      icon: AlertTriangle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    high: {
      icon: AlertOctagon,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  };

  const { icon: Icon, color, bgColor, borderColor } = config[level];

  return (
    <div className={`fixed bottom-20 right-4 z-40 p-4 rounded-lg border ${bgColor} ${borderColor}`}>
      <div className="flex items-center space-x-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <div>
          <p className="text-sm font-medium text-gray-900">{t('RiskLevel')}</p>
          <p className={`text-sm ${color}`}>{t(`${level}`)}</p>
        </div>
      </div>
    </div>
  );
}