import UAParser from 'ua-parser-js';

const parser = new UAParser();

export const detectBrowser = () => {
  const result = parser.getResult();
  return {
    type: result.browser.name || 'Unknown',
    version: result.browser.version || 'Unknown',
    isSuspicious: isSuspiciousBrowser()
  };
};

export const detectDevice = async () => {
  const result = parser.getResult();
  const hardwareInfo = await getHardwareInfo();

  return {
    brand: result.device.vendor || detectDeviceBrand(),
    model: result.device.model || await detectDeviceModel(),
    type: result.device.type || 'desktop',
    os: {
      name: result.os.name || 'Unknown',
      version: result.os.version || 'Unknown'
    },
    hardware: hardwareInfo
  };
};

const detectDeviceBrand = () => {
  const ua = navigator.userAgent.toLowerCase();
  
  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('macintosh')) {
    return 'Apple';
  }
  
  const brandPatterns = {
    samsung: /samsung/i,
    huawei: /huawei/i,
    xiaomi: /xiaomi|redmi/i,
    oppo: /oppo/i,
    vivo: /vivo/i,
    sony: /sony/i,
    lg: /lg/i,
    htc: /htc/i,
    nokia: /nokia/i,
    motorola: /motorola/i,
    google: /pixel/i
  };

  for (const [brand, pattern] of Object.entries(brandPatterns)) {
    if (pattern.test(ua)) {
      return brand.charAt(0).toUpperCase() + brand.slice(1);
    }
  }

  return 'Unknown';
};

const detectDeviceModel = async () => {
  const ua = navigator.userAgent;
  const modelRegex = /\((.*?)\)/;
  const match = ua.match(modelRegex);
  
  if (!match) return 'Unknown';
  
  const modelInfo = match[1].split(';')
    .map(part => part.trim())
    .filter(part => !part.startsWith('Linux') && !part.startsWith('Android') && !part.startsWith('U'));

  return modelInfo[0] || 'Unknown';
};

const getHardwareInfo = async () => {
  const hardwareInfo: any = {
    gpu: await getGPUInfo(),
    cpuArchitecture: getCPUArchitecture(),
    totalMemory: getTotalMemory(),
  };

  // Add battery information if available
  if ('getBattery' in navigator) {
    try {
      const battery: any = await (navigator as any).getBattery();
      hardwareInfo.batteryLevel = battery.level * 100;
      hardwareInfo.isCharging = battery.charging;
    } catch {
      // Battery API not available
    }
  }

  return hardwareInfo;
};

const getGPUInfo = async () => {
  try {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) return 'Unknown';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'Unknown';

    return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  } catch {
    return 'Unknown';
  }
};

const getCPUArchitecture = () => {
  const ua = navigator.userAgent;
  if (ua.includes('x86_64') || ua.includes('x64')) return 'x86_64';
  if (ua.includes('x86') || ua.includes('i386')) return 'x86';
  if (ua.includes('arm64') || ua.includes('aarch64')) return 'ARM64';
  if (ua.includes('arm')) return 'ARM';
  return 'Unknown';
};

const getTotalMemory = () => {
  return (navigator as any).deviceMemory || 'Unknown';
};

const isSuspiciousBrowser = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('tor') || navigator.brave !== undefined;
};

export const detectDeviceAnomalies = (): string[] => {
  const anomalies: string[] = [];
  
  if (window.screen.width > window.screen.height * 3) {
    anomalies.push('Unusual screen aspect ratio');
  }

  if (navigator.hardwareConcurrency === 1) {
    anomalies.push('Possible virtual environment');
  }

  const device = parser.getResult().device;
  if (device.type === 'mobile' && 'onmouseover' in window) {
    anomalies.push('Mobile device with mouse detection');
  }

  return anomalies;
};