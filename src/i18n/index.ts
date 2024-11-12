import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      title: "Visitor Analytics Dashboard",
      visitorId: "Visitor ID",
      summary: {
        visits: "Visits",
        privacyMode: "Privacy Mode",
        ip: "IP"
      },
      status: {
        active: "Active",
        inactive: "Inactive",
        detected: "Detected",
        notDetected: "Not Detected",
        unknown: "Unknown"
      },
      sections: {
        riskLevel: "Risk Level",
        networkStatus: "Network Status",
        browserInfo: "Browser Info",
        anomalies: "Anomalies",
        deviceInfo: "Device Information",
        sessionInfo: "Session Information"
      },
      deviceInfo: {
        screenResolution: "Screen Resolution",
        colorDepth: "Color Depth",
        deviceMemory: "Device Memory",
        cpuCores: "CPU Cores"
      },
      sessionInfo: {
        visitCount: "Visit Count",
        lastVisit: "Last Visit",
        connectionType: "Connection Type",
        latency: "Network Latency"
      }
    }
  },
  'zh-TW': {
    translation: {
      title: "訪客分析儀表板",
      visitorId: "訪客 ID",
      summary: {
        visits: "訪問次數",
        privacyMode: "隱私模式",
        ip: "IP 位址"
      },
      status: {
        active: "啟用",
        inactive: "未啟用",
        detected: "已偵測",
        notDetected: "未偵測",
        unknown: "未知"
      },
      sections: {
        riskLevel: "風險等級",
        networkStatus: "網路狀態",
        browserInfo: "瀏覽器資訊",
        anomalies: "異常狀況",
        deviceInfo: "裝置資訊",
        sessionInfo: "連線資訊"
      },
      deviceInfo: {
        screenResolution: "螢幕解析度",
        colorDepth: "色彩深度",
        deviceMemory: "裝置記憶體",
        cpuCores: "CPU 核心數"
      },
      sessionInfo: {
        visitCount: "訪問次數",
        lastVisit: "最後訪問",
        connectionType: "連線類型",
        latency: "網路延遲"
      }
    }
  },
  'zh-CN': {
    translation: {
      title: "访客分析仪表板",
      visitorId: "访客 ID",
      summary: {
        visits: "访问次数",
        privacyMode: "隐私模式",
        ip: "IP 地址"
      },
      status: {
        active: "启用",
        inactive: "未启用",
        detected: "已检测",
        notDetected: "未检测",
        unknown: "未知"
      },
      sections: {
        riskLevel: "风险等级",
        networkStatus: "网络状态",
        browserInfo: "浏览器信息",
        anomalies: "异常状况",
        deviceInfo: "设备信息",
        sessionInfo: "会话信息"
      },
      deviceInfo: {
        screenResolution: "屏幕分辨率",
        colorDepth: "色彩深度",
        deviceMemory: "设备内存",
        cpuCores: "CPU 核心数"
      },
      sessionInfo: {
        visitCount: "访问次数",
        lastVisit: "最后访问",
        connectionType: "连接类型",
        latency: "网络延迟"
      }
    }
  },
  vi: {
    translation: {
      title: "Bảng điều khiển Phân tích Khách truy cập",
      visitorId: "ID Khách",
      summary: {
        visits: "Lượt truy cập",
        privacyMode: "Chế độ riêng tư",
        ip: "Địa chỉ IP"
      },
      status: {
        active: "Hoạt động",
        inactive: "Không hoạt động",
        detected: "Đã phát hiện",
        notDetected: "Không phát hiện",
        unknown: "Không xác định"
      },
      sections: {
        riskLevel: "Mức độ rủi ro",
        networkStatus: "Trạng thái mạng",
        browserInfo: "Thông tin trình duyệt",
        anomalies: "Bất thường",
        deviceInfo: "Thông tin thiết bị",
        sessionInfo: "Thông tin phiên"
      },
      deviceInfo: {
        screenResolution: "Độ phân giải màn hình",
        colorDepth: "Độ sâu màu",
        deviceMemory: "Bộ nhớ thiết bị",
        cpuCores: "Số lõi CPU"
      },
      sessionInfo: {
        visitCount: "Số lần truy cập",
        lastVisit: "Lần truy cập cuối",
        connectionType: "Loại kết nối",
        latency: "Độ trễ mạng"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring', 'navigator'],
      lookupQuerystring: 'lang'
    }
  });

export default i18n;