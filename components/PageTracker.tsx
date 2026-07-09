'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Track last path+params to avoid double tracking on render cycles
  const lastTrackedRef = useRef<string>('');

  useEffect(() => {
    // We only execute on client side
    if (typeof window === 'undefined') return;

    const currentPath = pathname + (window.location.search || '');
    if (lastTrackedRef.current === currentPath) return;
    lastTrackedRef.current = currentPath;

    // Retrieve or generate persistent session ID
    let sessionId = localStorage.getItem('xmed_session_id');
    if (!sessionId) {
      sessionId = `sess_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
      localStorage.setItem('xmed_session_id', sessionId);
    }

    // Determine device classification
    const ua = navigator.userAgent.toLowerCase();
    let device = 'desktop';
    if (ua.includes('mobi') || ua.includes('iphone') || ua.includes('android')) {
      device = 'mobile';
    } else if (ua.includes('tablet') || ua.includes('ipad')) {
      device = 'tablet';
    }

    // Capture UTM tracking parameters from URL
    const utmSource = searchParams.get('utm_source');
    const utmCampaign = searchParams.get('utm_campaign');
    
    // Fallback to referrer analysis if no direct UTM parameters
    let trafficSource = 'direct';
    if (utmSource) {
      trafficSource = utmSource.toLowerCase().trim();
    } else if (document.referrer) {
      const referrerHost = new URL(document.referrer).hostname.toLowerCase();
      if (referrerHost.includes('google')) {
        trafficSource = 'google';
      } else if (referrerHost.includes('instagram') || referrerHost.includes('facebook')) {
        trafficSource = 'instagram';
      } else if (referrerHost.includes('t.co') || referrerHost.includes('twitter')) {
        trafficSource = 'instagram';
      } else if (referrerHost.includes(window.location.hostname)) {
        // internal navigation, do not change source
        return;
      } else {
        trafficSource = 'referral';
      }
    }

    // POST page view details to tracking API
    fetch('/api/page-view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionId,
        pageUrl: pathname,
        device,
        trafficSource,
        utmCampaign: utmCampaign || null
      })
    }).catch(err => {
      console.warn('PageView tracking failed to report:', err.message);
    });

  }, [pathname, searchParams]);

  return null;
}
