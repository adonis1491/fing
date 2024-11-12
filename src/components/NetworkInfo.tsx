import React from 'react';
import { useTranslation } from 'react-i18next';
import { Network, Shield } from 'lucide-react';

interface NetworkFingerprint {
  clientHello: string;
  tlsVersion: string;
  supportedCiphers: string[];
  userAgent: string;
  acceptLanguage: string;
  platform: string;
  headers: Record<string, string>;
}

interface Props {
  networkInfo: {
    networkFingerprint: NetworkFingerprint;
    connectionType: string;
    latency: number;
  };
}

export default function NetworkInfo({ networkInfo }: Props) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-700">Network Fingerprint</h2>
        <Network className="w-4 h-4 text-gray-400" />
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500">Client Hello Hash</p>
          <p className="text-sm font-mono break-all">{networkInfo.networkFingerprint.clientHello}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500">TLS Version</p>
          <p className="text-sm">{networkInfo.networkFingerprint.tlsVersion}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500">Connection</p>
          <p className="text-sm">{networkInfo.connectionType} ({networkInfo.latency.toFixed(0)}ms)</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500">Accept-Language</p>
          <p className="text-sm">{networkInfo.networkFingerprint.acceptLanguage}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Request Headers</p>
          <div className="max-h-24 overflow-y-auto">
            {Object.entries(networkInfo.networkFingerprint.headers).map(([key, value]) => (
              <div key={key} className="text-xs">
                <span className="font-medium">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Supported Ciphers</p>
          <div className="max-h-24 overflow-y-auto">
            {networkInfo.networkFingerprint.supportedCiphers.map((cipher, index) => (
              <p key={index} className="text-xs font-mono text-gray-600 truncate">
                {cipher}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}