'use client';

import { useState } from 'react';
import { emailAutomations } from '@/lib/email-templates';
import { 
  Play, Pause, Eye, Monitor, Smartphone, 
  Send, Sparkles, AlertCircle, CheckCircle2, Mail, BarChart2
} from 'lucide-react';

export default function AutomationsTab() {
  const [selectedId, setSelectedId] = useState(emailAutomations[0].id);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [runningStatus, setRunningStatus] = useState<Record<string, boolean>>(
    emailAutomations.reduce((acc, current) => ({ ...acc, [current.id]: true }), {})
  );
  const [testSent, setTestSent] = useState<string | null>(null);

  const selectedTemplate = emailAutomations.find(t => t.id === selectedId) || emailAutomations[0];

  const handleToggleRunning = (id: string) => {
    setRunningStatus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSendTest = (id: string) => {
    setTestSent(id);
    setTimeout(() => {
      setTestSent(null);
    }, 3000);
  };

  // Mock template variables
  const mockVars = {
    productName: 'X-Med Retatrutide Quick Pen 10MG – 3ML',
    strength: '10MG / 3ML',
    price: 170.00,
    image: 'https://res.cloudinary.com/tedfhije/image/upload/v1783446972/ChatGPT_Image_Jul_7_2026_06_14_47_AM_ttkfde.png',
    customerName: 'Dr. Arthur Pendelton',
    address: 'BioSciences Dept, Lab Suite 305B, Heidelberg University, Germany',
    trackingNumber: 'SE-9182736-XM'
  };

  const currentHtml = selectedTemplate.getHtml(mockVars);

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Overview stats header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Automations', value: emailAutomations.length, desc: 'Flows registered in workspace', color: 'text-blue-600' },
          { label: 'Emails Sent (All time)', value: '3,168', desc: 'Auto-triggered deliveries', color: 'text-purple-600' },
          { label: 'Avg. Open Rate', value: '71.2%', desc: 'HPLC Verification transparency impact', color: 'text-emerald-600' },
          { label: 'Total Sales Yield', value: '€14,840.00', desc: 'Generated via recovery campaigns', color: 'text-violet-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">{stat.label}</span>
            <span className={`text-2xl font-black font-display mt-2 block ${stat.color}`}>{stat.value}</span>
            <span className="text-[10px] text-slate-500 mt-1 block">{stat.desc}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* Left Side: Flows list & settings */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Mail className="w-5 h-5 text-blue-600" />
              <h3 className="font-display font-black text-sm text-ink uppercase tracking-wider">Campaign Triggers</h3>
            </div>

            <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
              {emailAutomations.map((t) => {
                const isSelected = selectedId === t.id;
                const isRunning = runningStatus[t.id];
                return (
                  <div
                    key={t.id}
                    className={`p-3 rounded-xl border transition-all text-left flex flex-col gap-2 relative ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/10 dark:bg-blue-950/20'
                        : 'border-slate-200/60 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <button
                        onClick={() => setSelectedId(t.id)}
                        className="flex-1 text-left"
                      >
                        <h4 className="font-display font-bold text-xs text-ink leading-tight hover:text-blue-600 transition-colors">
                          {t.name}
                        </h4>
                        <span className="text-[9px] font-mono text-slate-400 block mt-0.5 uppercase tracking-wide">
                          Trigger: {t.trigger}
                        </span>
                      </button>
                      
                      {/* Play/Pause control */}
                      <button
                        onClick={() => handleToggleRunning(t.id)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                          isRunning
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-600 hover:bg-amber-500/20'
                        }`}
                        title={isRunning ? 'Pause Automation' : 'Resume Automation'}
                      >
                        {isRunning ? <Play className="w-3 h-3 fill-emerald-600" /> : <Pause className="w-3 h-3 fill-amber-600" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mt-1 border-t border-slate-100 dark:border-slate-800/50 pt-2">
                      <span>Delay: {t.delay}</span>
                      <span className={`font-bold ${isRunning ? 'text-emerald-600' : 'text-amber-500'}`}>
                        ● {isRunning ? 'Active / Running' : 'Paused / Inactive'}
                      </span>
                    </div>

                    {/* Stats display */}
                    <div className="grid grid-cols-4 gap-1 text-[8.5px] font-mono text-slate-400 mt-1 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-slate-400 block">Sent</span>
                        <strong className="text-slate-800 dark:text-slate-300 block mt-0.5">{t.stats.sent}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Open</span>
                        <strong className="text-slate-800 dark:text-slate-300 block mt-0.5">{t.stats.opened}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Click</span>
                        <strong className="text-slate-800 dark:text-slate-300 block mt-0.5">{t.stats.clicked}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Conv</span>
                        <strong className="text-emerald-600 block mt-0.5">{t.stats.converted}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive HTML Template Live Previewer */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm flex flex-col">
            
            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <h3 className="font-display font-black text-sm text-ink uppercase tracking-wider">Live Preview</h3>
              </div>

              <div className="flex items-center gap-3">
                {/* Desktop/Mobile layout switcher */}
                <div className="flex rounded-lg bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200/50">
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={`p-1.5 rounded-md transition-all ${
                      previewMode === 'desktop' ? 'bg-white dark:bg-slate-800 text-blue-600' : 'text-slate-400 hover:text-ink'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={`p-1.5 rounded-md transition-all ${
                      previewMode === 'mobile' ? 'bg-white dark:bg-slate-800 text-blue-600' : 'text-slate-400 hover:text-ink'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>

                {/* Send test button */}
                <button
                  onClick={() => handleSendTest(selectedTemplate.id)}
                  disabled={testSent !== null}
                  className="h-9 px-4 rounded-xl text-xs font-bold btn-gradient flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Test Email</span>
                </button>
              </div>
            </div>

            {/* Test confirmation message overlay */}
            {testSent && (
              <div className="mb-4 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-650 text-xs font-semibold flex items-center gap-2 animate-pulse">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Test simulation sent! Check logs or verification triggers for {selectedTemplate.name}.</span>
              </div>
            )}

            {/* Template subject & headers summary */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800/80 rounded-xl p-3.5 mb-4 text-xs font-mono text-slate-500 flex flex-col gap-1">
              <div><strong className="text-slate-800 dark:text-slate-300">Subject:</strong> {selectedTemplate.subject}</div>
              <div><strong className="text-slate-800 dark:text-slate-300">From:</strong> X-Med Lab Support &lt;support@x-med.co&gt;</div>
              <div><strong className="text-slate-800 dark:text-slate-300">Reply-To:</strong> support@x-med.co</div>
            </div>

            {/* Responsive Iframe Frame */}
            <div className="flex justify-center bg-slate-100 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 min-h-[500px]">
              <div 
                className="transition-all duration-300 ease-in-out bg-transparent relative flex"
                style={{
                  width: previewMode === 'desktop' ? '100%' : '375px',
                  maxWidth: '100%',
                  height: '520px',
                  borderRadius: previewMode === 'mobile' ? '28px' : '0px',
                  border: previewMode === 'mobile' ? '12px solid #1e293b' : 'none',
                  boxShadow: previewMode === 'mobile' ? '0 25px 50px -12px rgba(0,0,0,0.5)' : 'none'
                }}
              >
                <iframe
                  title="Email HTML Preview"
                  srcDoc={currentHtml}
                  className="w-full h-full border-0 rounded-xl"
                  style={{
                    backgroundColor: '#030712'
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
