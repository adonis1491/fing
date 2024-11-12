export const detectNetwork = async (): Promise<{
  sourceIP: string;
  connectionType: string;
  latency: number;
  vpnDetected: boolean;
  proxyDetected: boolean;
  geolocation: {
    country: string;
    city: string;
    timezone: string;
    latitude: number;
    longitude: number;
  };
}> => {
  const startTime = performance.now();
  
  try {
    // Use multiple IP detection services for redundancy
    const [ipApiResponse, ipifyResponse] = await Promise.allSettled([
      fetch('https://ipapi.co/json/'),
      fetch('https://api.ipify.org?format=json')
    ]);

    let ipData;
    
    if (ipApiResponse.status === 'fulfilled') {
      ipData = await ipApiResponse.value.json();
    } else if (ipifyResponse.status === 'fulfilled') {
      const ipifyData = await ipifyResponse.value.json();
      // Fallback to secondary geolocation lookup
      const geoResponse = await fetch(`https://ipapi.co/${ipifyData.ip}/json/`);
      ipData = await geoResponse.json();
    } else {
      throw new Error('All IP detection services failed');
    }
    
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    const latency = performance.now() - startTime;
    
    // Enhanced VPN/Proxy detection
    const vpnDetected = await checkForVPN(ipData);
    const proxyDetected = await checkForProxy();
    
    return {
      sourceIP: ipData.ip,
      connectionType: connection ? connection.effectiveType : 'unknown',
      latency,
      vpnDetected,
      proxyDetected,
      geolocation: {
        country: ipData.country_name || ipData.country,
        city: ipData.city,
        timezone: ipData.timezone,
        latitude: parseFloat(ipData.latitude),
        longitude: parseFloat(ipData.longitude)
      }
    };
  } catch (error) {
    console.error('Network detection error:', error);
    return {
      sourceIP: 'unknown',
      connectionType: 'unknown',
      latency: -1,
      vpnDetected: false,
      proxyDetected: false,
      geolocation: {
        country: 'Unknown',
        city: 'Unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        latitude: 25.0330,
        longitude: 121.5654
      }
    };
  }
};

const checkForVPN = async (ipData: any): Promise<boolean> => {
  const vpnIndicators = [
    ipData.hosting === true,
    ipData.datacenter === true,
    ipData.tor === true,
    ipData.proxy === true,
    // Check for mismatched timezone
    Math.abs(new Date().getTimezoneOffset() / 60 - 
      (new Date().toLocaleString('en-US', { timeZone: ipData.timezone, hour: '2-digit', hour12: false }) as any)) > 2
  ];

  return vpnIndicators.some(indicator => indicator === true);
};

const checkForProxy = async (): Promise<boolean> => {
  try {
    const [headersResponse, webRtcCheck] = await Promise.all([
      fetch('https://httpbin.org/headers'),
      checkWebRTC()
    ]);
    
    const { headers } = await headersResponse.json();
    
    const proxyHeaders = [
      'via' in headers,
      'x-forwarded-for' in headers,
      'proxy-connection' in headers,
      'x-real-ip' in headers
    ];

    return proxyHeaders.some(Boolean) || webRtcCheck;
  } catch {
    return false;
  }
};

const checkWebRTC = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!(window as any).RTCPeerConnection) {
      resolve(false);
      return;
    }

    const pc = new RTCPeerConnection();
    let addressesFound = false;

    pc.createDataChannel('');
    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer))
      .catch(() => resolve(false));

    pc.onicecandidate = (ice) => {
      if (!ice.candidate) {
        pc.close();
        resolve(addressesFound);
        return;
      }

      // Check for non-local IP addresses
      if (ice.candidate.candidate.indexOf('srflx') !== -1) {
        addressesFound = true;
      }
    };

    // Timeout after 1 second
    setTimeout(() => {
      pc.close();
      resolve(addressesFound);
    }, 1000);
  });
};