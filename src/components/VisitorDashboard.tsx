import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language } from '../types/language';
import { useVisitorInfo } from '../hooks/useVisitorInfo';
import LanguageSwitcher from './LanguageSwitcher';
import MapComponent from './MapComponent';
import NetworkInfo from './NetworkInfo';
import HardwareInfo from './HardwareInfo';
import VisitorHistory from './VisitorHistory';
import { Shield, Globe2, Monitor, Cpu, Smartphone, Wifi, Copy, Check } from 'lucide-react';
import { generateJA4Fingerprint } from '../utils/ja4Generation';

export default function VisitorDashboard() {
  const { t, i18n } = useTranslation();
  const { visitorInfo, loading } = useVisitorInfo();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [ja4Fingerprint, setJa4Fingerprint] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Simulated history data - in a real app, this would come from your backend
  const visitorHistory = visitorInfo ? [visitorInfo] : [];

  useEffect(() => {
    if (visitorInfo?.geolocation) {
      setUserLocation({
        lat: visitorInfo.geolocation.latitude,
        lng: visitorInfo.geolocation.longitude
      });
    }
  }, [visitorInfo]);

  useEffect(() => {
    async function getJA4() {
      const fingerprint = await generateJA4Fingerprint();
      setJa4Fingerprint(fingerprint);
    }
    getJA4();
  }, []);

  const handleCopyJA4 = async () => {
    try {
      await navigator.clipboard.writeText(ja4Fingerprint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const truncateJA4 = (ja4: string) => {
    if (ja4.length <= 24) return ja4;
    return `${ja4.slice(0, 12)}...${ja4.slice(-12)}`;
  };

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!visitorInfo) {
    return (
      <div className="p-4 bg-red-50 text-red-600">
        Error loading visitor information
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:flex justify-between items-center">
          <div className="flex items-center space-x-4 mb-3 sm:mb-0">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold text-gray-900">WIICHAT</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('visitorId')}</p>
              <div className="flex items-center space-x-2">
                <p className="font-mono text-sm text-gray-900">{visitorInfo.id}</p>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-500 font-mono">
                    JA4={truncateJA4(ja4Fingerprint)}
                  </span>
                  <button
                    onClick={handleCopyJA4}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    title="Copy full JA4 fingerprint"
                  >
                    {copied ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <LanguageSwitcher
            currentLanguage={i18n.language as Language}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div 
            className="bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setShowHistory(true)}
          >
            <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">{t('summary.visits')}</h3>
            <p className="text-lg font-semibold">{visitorInfo.visitCount}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">{t('summary.privacyMode')}</h3>
            <p className="text-lg font-semibold">{t('status.notDetected')}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">{t('summary.ip')}</h3>
            <p className="text-lg font-mono">{visitorInfo.sourceIP}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">{t('sections.networkStatus')}</h3>
            <p className="text-lg font-semibold">{visitorInfo.geolocation.city}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h2 className="text-sm font-medium text-gray-700 mb-4">{t('sections.networkStatus')}</h2>
              <div className="h-64">
                {userLocation && (
                  <MapComponent 
                    location={userLocation}
                    popupContent={`${visitorInfo.geolocation.city}, ${visitorInfo.geolocation.country}`}
                  />
                )}
              </div>
            </div>
            <NetworkInfo networkInfo={visitorInfo} />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h2 className="text-sm font-medium text-gray-700 mb-4">{t('sections.browserInfo')}</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('sections.browserInfo')}</span>
                  <span>{visitorInfo.browserType} {visitorInfo.browserVersion}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">OS</span>
                  <span>{visitorInfo.device.os.name} {visitorInfo.device.os.version}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Device</span>
                  <span>{visitorInfo.device.brand} {visitorInfo.device.model}</span>
                </div>
              </div>
            </div>
            <HardwareInfo deviceInfo={visitorInfo.device.hardware} />
          </div>
        </div>
      </main>

      {showHistory && (
        <VisitorHistory
          visitorId={visitorInfo.id}
          history={visitorHistory}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}