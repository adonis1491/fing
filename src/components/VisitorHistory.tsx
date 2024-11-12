import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, MapPin, Globe2, Monitor, Fingerprint } from 'lucide-react';
import type { VisitorInfo } from '../types/visitor';

interface Props {
  visitorId: string;
  history: VisitorInfo[];
  onClose: () => void;
}

export default function VisitorHistory({ visitorId, history, onClose }: Props) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{t('history.title')}</h2>
            <p className="text-sm text-gray-500">ID: {visitorId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="overflow-auto p-4 max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {history.map((visit, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Visit Time */}
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{t('history.visitTime')}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(visit.lastVisit).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{t('history.location')}</p>
                      <p className="text-sm text-gray-600">
                        {visit.geolocation.country}, {visit.geolocation.city}
                      </p>
                      <p className="text-sm text-gray-500">
                        IP: {visit.sourceIP}
                      </p>
                    </div>
                  </div>

                  {/* Network Info */}
                  <div className="flex items-start space-x-3">
                    <Globe2 className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{t('history.network')}</p>
                      <p className="text-sm text-gray-600">
                        {t('sessionInfo.connectionType')}: {visit.connectionType}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t('sessionInfo.latency')}: {visit.latency.toFixed(0)}ms
                      </p>
                      <p className="text-sm text-gray-600">
                        ISP: {visit.isp}
                      </p>
                    </div>
                  </div>

                  {/* Device Info */}
                  <div className="flex items-start space-x-3">
                    <Monitor className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{t('history.device')}</p>
                      <p className="text-sm text-gray-600">
                        {visit.device.brand} {visit.device.model}
                      </p>
                      <p className="text-sm text-gray-600">
                        {visit.device.os.name} {visit.device.os.version}
                      </p>
                      <p className="text-sm text-gray-600">
                        {visit.browserType} {visit.browserVersion}
                      </p>
                    </div>
                  </div>

                  {/* Fingerprint Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-start space-x-3">
                      <Fingerprint className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">{t('history.fingerprint')}</p>
                        <div className="mt-2 space-y-2">
                          <details className="text-sm">
                            <summary className="cursor-pointer text-gray-600 hover:text-gray-900">
                              {t('history.networkFingerprint')}
                            </summary>
                            <div className="mt-2 pl-4 space-y-1">
                              <p className="text-gray-600">
                                Client Hello: {visit.networkFingerprint.clientHello}
                              </p>
                              <p className="text-gray-600">
                                TLS Version: {visit.networkFingerprint.tlsVersion}
                              </p>
                            </div>
                          </details>
                          <details className="text-sm">
                            <summary className="cursor-pointer text-gray-600 hover:text-gray-900">
                              {t('history.hardwareFingerprint')}
                            </summary>
                            <div className="mt-2 pl-4 space-y-1">
                              <p className="text-gray-600">
                                GPU: {visit.device.hardware.gpu}
                              </p>
                              <p className="text-gray-600">
                                CPU: {visit.device.hardware.cpuArchitecture}
                              </p>
                              <p className="text-gray-600">
                                Memory: {visit.device.hardware.totalMemory}GB
                              </p>
                            </div>
                          </details>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}