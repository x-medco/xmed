'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Shield, ShieldAlert, Loader2, Lock } from 'lucide-react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: (error: any) => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact' | 'flexible';
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

// Cloudflare Turnstile official always-pass sitekey for development fallback
const DEFAULT_TEST_SITE_KEY = '1x00000000000000000000AA';

function VerifyContent() {
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/';

  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || DEFAULT_TEST_SITE_KEY;

  const handleVerifyToken = async (token: string) => {
    try {
      setVerifying(true);
      setError(null);

      const res = await fetch('/api/verify-human', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          next: nextUrl,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Successful verification! Redirect to original target URL
        window.location.href = data.redirect || '/';
      } else {
        setError(data.error || 'Verification failed. Please try again.');
        setVerifying(false);
        if (window.turnstile && widgetIdRef.current) {
          window.turnstile.reset(widgetIdRef.current);
        }
      }
    } catch (err) {
      console.error('Turnstile verification request failed:', err);
      setError('A network error occurred while verifying. Please check your connection.');
      setVerifying(false);
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }
  };

  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;

    const renderWidget = () => {
      if (!window.turnstile || !containerRef.current) return;
      if (widgetIdRef.current) return;

      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'dark',
          size: 'normal',
          callback: (token: string) => {
            handleVerifyToken(token);
          },
          'error-callback': (err: any) => {
            console.warn('Turnstile widget error:', err);
            setError('Security widget failed to load. Please disable ad-blockers or reload.');
            setLoading(false);
          },
          'expired-callback': () => {
            setError('Verification challenge expired. Please verify again.');
            setVerifying(false);
          },
        });

        widgetIdRef.current = id;
        setLoading(false);
      } catch (e) {
        console.error('Error rendering Turnstile:', e);
        setError('Unable to initialize verification widget.');
        setLoading(false);
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      window.onloadTurnstileCallback = renderWidget;

      scriptElement = document.createElement('script');
      scriptElement.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';
      scriptElement.async = true;
      scriptElement.defer = true;
      document.head.appendChild(scriptElement);
    }

    return () => {
      if (window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
        widgetIdRef.current = null;
      }
      if (window.onloadTurnstileCallback) {
        delete window.onloadTurnstileCallback;
      }
    };
  }, [siteKey]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#070d19] text-slate-100 select-none">
      <div className="w-full max-w-md mx-auto rounded-3xl border border-white/10 bg-[#0c1626]/95 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Soft glowing ambient lighting */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Shield Icon */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center">
            <Lock className="w-3 h-3 text-cyan-400" />
          </div>
        </div>

        {/* Headings */}
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-2">
          Human Verification Required
        </h1>
        <p className="text-sm text-slate-400 max-w-xs mb-8 leading-relaxed">
          Please verify that you are human to continue.
        </p>

        {/* Turnstile Widget Container */}
        <div className="w-full flex flex-col items-center justify-center min-h-[75px] mb-6">
          {verifying ? (
            <div className="flex flex-col items-center gap-3 py-4 text-cyan-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs font-mono tracking-wide uppercase">
                Validating security clearance...
              </span>
            </div>
          ) : (
            <div ref={containerRef} className="flex justify-center" />
          )}

          {loading && !verifying && !error && (
            <div className="flex items-center gap-2 text-xs text-slate-500 py-4 font-mono">
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              <span>Loading security challenge...</span>
            </div>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="w-full mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2 text-left">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span className="flex-1">{error}</span>
          </div>
        )}

        {/* Footer Security Note */}
        <div className="pt-6 border-t border-white/[0.06] w-full flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
          <Lock className="w-3 h-3 text-slate-400" />
          <span>This website is protected against automated access.</span>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#070d19] text-slate-400 font-mono text-xs">
          Loading verification...
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
