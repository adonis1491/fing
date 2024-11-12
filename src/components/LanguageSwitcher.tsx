import React from 'react';
import type { Language, LanguageOption } from '../types/language';
import { Globe } from 'lucide-react';

interface Props {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const languages: LanguageOption[] = [
  { code: 'zh-TW', label: '繁' },
  { code: 'zh-CN', label: '简' },
  { code: 'en', label: 'EN' },
  { code: 'vi', label: 'VI' },
];

export default function LanguageSwitcher({ currentLanguage, onLanguageChange }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-400" />
      <div className="flex space-x-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`px-2 py-1 text-sm rounded-md transition-colors ${
              currentLanguage === lang.code
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}