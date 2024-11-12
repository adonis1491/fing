export const getNetworkFingerprint = async () => {
  try {
    const tlsInfo = await getTLSInfo();
    const clientHello = await generateClientHello();

    return {
      clientHello,
      tlsVersion: tlsInfo.version,
      supportedCiphers: tlsInfo.ciphers,
      userAgent: navigator.userAgent,
      acceptLanguage: navigator.languages.join(','),
      platform: navigator.platform,
      headers: await getRequestHeaders()
    };
  } catch (error) {
    console.error('Error generating network fingerprint:', error);
    return {
      clientHello: 'n/a',
      tlsVersion: 'unknown',
      supportedCiphers: [],
      userAgent: navigator.userAgent,
      acceptLanguage: navigator.languages.join(','),
      platform: navigator.platform,
      headers: {}
    };
  }
};

const getTLSInfo = async () => {
  try {
    const response = await fetch('https://www.howsmyssl.com/a/check', {
      method: 'GET'
    });
    const data = await response.json();

    return {
      version: data.tls_version || 'unknown',
      ciphers: data.given_cipher_suites || []
    };
  } catch (error) {
    return {
      version: 'unknown',
      ciphers: []
    };
  }
};

const generateClientHello = async () => {
  const components = [
    navigator.userAgent,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen.colorDepth,
    navigator.hardwareConcurrency,
    navigator.deviceMemory,
    navigator.platform
  ];
  
  const str = components.join('|');
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

const getRequestHeaders = async () => {
  try {
    const response = await fetch('https://httpbin.org/headers');
    const data = await response.json();
    return data.headers || {};
  } catch (error) {
    return {};
  }
};