export const generateJA4Fingerprint = async () => {
  try {
    const response = await fetch('https://www.howsmyssl.com/a/check');
    const data = await response.json();
    
    // Extract TLS version
    const version = data.tls_version?.replace(/\./g, '') || '0000';
    
    // Get cipher length and sorted ciphers
    const ciphers = data.given_cipher_suites || [];
    const cipherLen = ciphers.length.toString(16).padStart(2, '0');
    const sortedCiphers = [...ciphers]
      .map(c => c.split('_').pop()?.toLowerCase() || '')
      .sort()
      .join('');
    
    // Get extensions
    const extensions = await getClientExtensions();
    const extLen = extensions.length.toString(16).padStart(2, '0');
    const sortedExtensions = [...extensions].sort().join('');
    
    // Get ALPN protocols
    const alpn = getALPNProtocols();
    
    // Construct JA4 string
    return `t${version}d${cipherLen}${extLen}${alpn}_${sortedCiphers}_${sortedExtensions}`;
  } catch (error) {
    console.error('Error generating JA4:', error);
    return 'n/a';
  }
};

const getClientExtensions = async () => {
  try {
    const extensions = [];
    
    // Check for common extensions
    if ('connection' in navigator) extensions.push('renegotiation_info');
    if ('credentials' in navigator) extensions.push('status_request');
    if ('serviceWorker' in navigator) extensions.push('application_layer_protocol_negotiation');
    if (window.crypto) extensions.push('ec_point_formats');
    if ('bluetooth' in navigator) extensions.push('supported_groups');
    
    return extensions;
  } catch {
    return [];
  }
};

const getALPNProtocols = () => {
  const protocols = [];
  
  // Check for HTTP/2 support
  if (typeof window.RTCPeerConnection !== 'undefined') {
    protocols.push('h2');
  }
  
  protocols.push('http/1.1');
  
  return protocols.length.toString(16);
};