import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const generateVisitorId = async (): Promise<string> => {
  try {
    // Initialize an agent at application startup.
    const fp = await FingerprintJS.load();

    // Get the visitor identifier when you need it.
    const result = await fp.get();
    
    // Add timestamp to make it more unique
    const timestamp = Date.now().toString(36);
    
    return `${result.visitorId}-${timestamp}`;
  } catch (error) {
    console.error('Error generating fingerprint:', error);
    // Fallback to a random ID if fingerprinting fails
    return `fallback-${Math.random().toString(36).substring(2)}-${Date.now().toString(36)}`;
  }
};