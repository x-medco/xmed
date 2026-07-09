'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Inbox, 
  Send, 
  Trash2, 
  Plus, 
  Search, 
  LogOut, 
  Mail, 
  Paperclip, 
  Reply, 
  User, 
  RefreshCw, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  X,
  ArrowLeft
} from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

// Define TS Interfaces
interface EmailAttachment {
  id?: string;
  name: string;
  contentType: string;
  size: number;
  url?: string;
  content?: string; // base64
}

interface Email {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  text_content: string;
  html_content: string;
  direction: 'incoming' | 'outgoing';
  status: 'read' | 'unread' | 'sent' | 'draft' | 'failed';
  attachments: EmailAttachment[];
  thread_id?: string;
  resend_id?: string;
  created_at: string;
}

const DEFAULT_MOCK_EMAILS: Email[] = [
  {
    id: 'mock-1',
    sender: 'Dr. Ryan Vance <dr.vance@clinic.org>',
    recipient: 'support@x-med.co',
    subject: 'Inquiry about PT-141 peptide reconstitution and stability',
    text_content: 'Hello X-Med Support,\n\nI am preparing a research protocol using your PT-141. Could you confirm the recommended reconstitution volume of bacteriostatic water for the 10mg vials? Also, what is the expected stability window when stored at 4 degrees C post-reconstitution?\n\nThank you,\nDr. Ryan Vance',
    html_content: '<p>Hello X-Med Support,</p><p>I am preparing a research protocol using your PT-141. Could you confirm the recommended reconstitution volume of bacteriostatic water for the 10mg vials? Also, what is the expected stability window when stored at 4 degrees C post-reconstitution?</p><p>Thank you,<br/><strong>Dr. Ryan Vance</strong></p>',
    direction: 'incoming',
    status: 'unread',
    attachments: [],
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 mins ago
  },
  {
    id: 'mock-2',
    sender: 'Sarah Jenkins <sarah.j@fitlife.com>',
    recipient: 'sales@x-med.co',
    subject: 'Question on BOGO buy-one-get-one-free shipping times',
    text_content: 'Hi! I saw the BOGO deal on your website for Ipamorelin. If I order today, does the free vial ship in the same package, or does it arrive separately? Also, do you ship to Canada?\n\nBest,\nSarah',
    html_content: '<p>Hi! I saw the BOGO deal on your website for Ipamorelin. If I order today, does the free vial ship in the same package, or does it arrive separately? Also, do you ship to Canada?</p><p>Best,<br/>Sarah</p>',
    direction: 'incoming',
    status: 'unread',
    attachments: [],
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString() // 2 hours ago
  },
  {
    id: 'mock-3',
    sender: 'Marcus Cole <m.cole@biotech.co>',
    recipient: 'info@x-med.co',
    subject: 'Wholesale order pricing for BPC-157 10mg and TB-500',
    text_content: 'Hello,\n\nI represent a local research facility. We are looking to buy BPC-157 and TB-500 in bulk (50+ vials of each). Do you offer wholesale tier rates? Attached is our list of monthly requirements.\n\nRegards,\nMarcus',
    html_content: '<p>Hello,</p><p>I represent a local research facility. We are looking to buy BPC-157 and TB-500 in bulk (50+ vials of each). Do you offer wholesale tier rates? Attached is our list of monthly requirements.</p><p>Regards,<br/>Marcus</p>',
    direction: 'incoming',
    status: 'read',
    attachments: [
      { name: 'monthly_requirements.pdf', contentType: 'application/pdf', size: 104857 }
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 1440).toISOString() // 1 day ago
  }
];

export default function MailDashboard() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [activeFolder, setActiveFolder] = useState<'inbox' | 'sent'>('inbox');
  const [selectedAccount, setSelectedAccount] = useState<'all' | 'info' | 'sales' | 'support'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Compose States
  const [isComposing, setIsComposing] = useState(false);
  const [composeFrom, setComposeFrom] = useState<'info' | 'sales' | 'support'>('info');
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [composeAttachments, setComposeAttachments] = useState<{name: string, content: string, contentType: string}[]>([]);
  const [isSending, setIsSending] = useState(false);
  
  // Notification States
  const [notification, setNotification] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = getSupabaseClient();

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      if (supabase && typeof supabase.from === 'function') {
        const { data, error } = await supabase
          .from('emails')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching from Supabase:', error);
          setEmails(DEFAULT_MOCK_EMAILS);
        } else if (data && data.length > 0) {
          setEmails(data as Email[]);
        } else {
          setEmails(DEFAULT_MOCK_EMAILS);
        }
      } else {
        setEmails(DEFAULT_MOCK_EMAILS);
      }
    } catch (e) {
      console.error(e);
      setEmails(DEFAULT_MOCK_EMAILS);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEmail = async (email: Email) => {
    setSelectedEmail(email);
    
    // Mark as read in state
    if (email.status === 'unread') {
      setEmails(prev => prev.map(e => e.id === email.id ? { ...e, status: 'read' } : e));
      
      // Update in Supabase
      try {
        if (supabase && typeof supabase.from === 'function' && !email.id.startsWith('mock-')) {
          await supabase
            .from('emails')
            .update({ status: 'read' })
            .eq('id', email.id);
        }
      } catch (err) {
        console.error('Failed to mark email as read in Supabase:', err);
      }
    }
  };

  const handleDeleteEmail = async (emailId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null);
    }
    
    setEmails(prev => prev.filter(e => e.id !== emailId));
    showNotification('success', 'Email deleted.');

    try {
      if (supabase && typeof supabase.from === 'function' && !emailId.startsWith('mock-')) {
        await supabase
          .from('emails')
          .delete()
          .eq('id', emailId);
      }
    } catch (err) {
      console.error('Failed to delete email from Supabase:', err);
    }
  };

  const handleReply = (email: Email) => {
    const emailMatch = email.sender.match(/<([^>]+)>/) || [null, email.sender];
    const replyTo = emailMatch[1] || email.sender;
    
    // Set matching outgoing account if the email was received by sales or support
    if (email.recipient.includes('sales')) {
      setComposeFrom('sales');
    } else if (email.recipient.includes('support')) {
      setComposeFrom('support');
    } else {
      setComposeFrom('info');
    }
    
    setComposeTo(replyTo);
    setComposeSubject(email.subject.startsWith('Re:') ? email.subject : `Re: ${email.subject}`);
    
    const formattedQuote = `\n\n\n----- Original Message -----\nFrom: ${email.sender}\nSent: ${new Date(email.created_at).toLocaleString()}\nTo: ${email.recipient}\nSubject: ${email.subject}\n\n${email.text_content}`;
    setComposeBody(formattedQuote);
    setIsComposing(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setComposeAttachments(prev => [
          ...prev,
          {
            name: file.name,
            contentType: file.type,
            content: base64String
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAttachment = (index: number) => {
    setComposeAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo) return;

    setIsSending(true);
    try {
      const response = await fetch('/api/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: composeFrom,
          to: composeTo,
          subject: composeSubject,
          text: composeBody,
          html: `<div style="font-family: sans-serif; white-space: pre-line;">${composeBody}</div>`,
          attachments: composeAttachments
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to send email.');
      }

      showNotification('success', 'Email sent successfully!');
      setIsComposing(false);
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
      setComposeAttachments([]);
      fetchEmails();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to send.');
    } finally {
      setIsSending(false);
    }
  };

  const showNotification = (type: 'success' | 'error', text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  // Filter & Search Logic
  const filteredEmails = emails.filter(email => {
    const isFolderMatch = activeFolder === 'inbox' 
      ? email.direction === 'incoming' 
      : email.direction === 'outgoing';

    if (!isFolderMatch) return false;

    // Filter by selected account (info@x-med.co, sales@x-med.co, support@x-med.co)
    if (selectedAccount !== 'all') {
      const targetAddress = `${selectedAccount}@x-med.co`;
      if (activeFolder === 'inbox') {
        // Incoming: check if recipient is target
        if (!email.recipient.toLowerCase().includes(targetAddress)) {
          return false;
        }
      } else {
        // Outgoing: check if sender matches target
        if (!email.sender.toLowerCase().includes(targetAddress)) {
          return false;
        }
      }
    }

    if (!searchQuery) return true;

    const lowerQuery = searchQuery.toLowerCase();
    return (
      email.sender.toLowerCase().includes(lowerQuery) ||
      email.recipient.toLowerCase().includes(lowerQuery) ||
      email.subject.toLowerCase().includes(lowerQuery) ||
      email.text_content.toLowerCase().includes(lowerQuery)
    );
  });

  const getInitials = (senderStr: string) => {
    const nameMatch = senderStr.match(/^([^<]+)/);
    const name = nameMatch ? nameMatch[1].trim() : senderStr;
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getAvatarBgColor = (senderStr: string) => {
    const colors = [
      'bg-indigo-500 text-indigo-100',
      'bg-emerald-500 text-emerald-100',
      'bg-amber-500 text-amber-100',
      'bg-rose-500 text-rose-100',
      'bg-violet-500 text-violet-100',
      'bg-sky-500 text-sky-100',
    ];
    let sum = 0;
    for (let i = 0; i < senderStr.length; i++) {
      sum += senderStr.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Unread Count
  const getUnreadCount = (account: 'all' | 'info' | 'sales' | 'support') => {
    return emails.filter(e => {
      const isIncomingUnread = e.direction === 'incoming' && e.status === 'unread';
      if (!isIncomingUnread) return false;
      if (account === 'all') return true;
      return e.recipient.toLowerCase().includes(`${account}@x-med.co`);
    }).length;
  };

  const totalUnreadCount = getUnreadCount('all');

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100 antialiased">
      
      {/* 1. DESKTOP SIDEBAR (hidden on mobile) */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl hidden md:flex flex-col justify-between select-none flex-shrink-0">
        <div>
          {/* Logo / Branding */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Mail className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                XMed Mail
              </h1>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                Workspace
              </span>
            </div>
          </div>

          {/* Compose Button */}
          <div className="px-4 mb-6">
            <button
              onClick={() => { setIsComposing(true); setComposeFrom('info'); }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 transform active:scale-98"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              Compose
            </button>
          </div>

          {/* Mailboxes Navigation */}
          <nav className="px-2 space-y-1">
            <button
              onClick={() => { setActiveFolder('inbox'); setSelectedEmail(null); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeFolder === 'inbox' 
                  ? 'bg-slate-800/80 text-emerald-400 shadow-inner' 
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-5 h-5" />
                <span>Inbox</span>
              </div>
              {totalUnreadCount > 0 && (
                <span className="bg-emerald-500 text-slate-950 font-bold text-xs px-2 py-0.5 rounded-full shadow-md shadow-emerald-500/20">
                  {totalUnreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveFolder('sent'); setSelectedEmail(null); }}
              className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeFolder === 'sent' 
                  ? 'bg-slate-800/80 text-emerald-400 shadow-inner' 
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5" />
                <span>Sent</span>
              </div>
            </button>
          </nav>

          {/* Account Sub-filter section in Sidebar */}
          <div className="mt-8 px-4">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">
              Mailboxes
            </label>
            <div className="space-y-1">
              {[
                { id: 'all', email: 'All Accounts' },
                { id: 'info', email: 'info@x-med.co' },
                { id: 'sales', email: 'sales@x-med.co' },
                { id: 'support', email: 'support@x-med.co' }
              ].map(acc => {
                const count = getUnreadCount(acc.id as any);
                return (
                  <button
                    key={acc.id}
                    onClick={() => { setSelectedAccount(acc.id as any); setSelectedEmail(null); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      selectedAccount === acc.id
                        ? 'bg-slate-800 text-emerald-400 border border-slate-700/50'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50 border border-transparent'
                    }`}
                  >
                    <span className="truncate">{acc.email}</span>
                    {count > 0 && (
                      <span className="bg-slate-800 text-emerald-400 border border-emerald-500/20 font-bold text-[10px] px-1.5 py-0.2 rounded">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* User Account / Signout */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-700">
                <User className="w-4 h-4 text-slate-300" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate text-slate-200">Admin Console</p>
                <p className="text-xs text-slate-500 truncate">info/sales/support</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-all duration-200"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE AREA */}
      <main className="flex-1 flex overflow-hidden relative pb-16 md:pb-0">
        
        {/* LEFT COLUMN: EMAIL LIST */}
        <section 
          className={`w-full md:w-96 border-r border-slate-850 flex flex-col bg-slate-950 flex-shrink-0 transition-all duration-200 ${
            selectedEmail ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* List Header & Search */}
          <div className="p-4 space-y-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="md:hidden w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                </div>
                <h2 className="text-lg font-bold tracking-tight capitalize">
                  {activeFolder}
                </h2>
              </div>
              <button 
                onClick={fetchEmails} 
                className="p-2 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800/50 transition-all duration-200"
                title="Refresh Mailbox"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
              </button>
            </div>
            
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search mail..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
              />
            </div>

            {/* Quick Pills for Subdomain Mailboxes (Very mobile friendly!) */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none">
              {[
                { id: 'all', label: 'All Inboxes' },
                { id: 'info', label: 'Info' },
                { id: 'sales', label: 'Sales' },
                { id: 'support', label: 'Support' }
              ].map(acc => {
                const count = getUnreadCount(acc.id as any);
                return (
                  <button
                    key={acc.id}
                    onClick={() => { setSelectedAccount(acc.id as any); setSelectedEmail(null); }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      selectedAccount === acc.id
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{acc.label}</span>
                    {count > 0 && (
                      <span className={`w-2.5 h-2.5 rounded-full ${selectedAccount === acc.id ? 'bg-emerald-400' : 'bg-emerald-500/60'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Email Items List */}
          <div className="flex-grow overflow-y-auto divide-y divide-slate-900/60 custom-scrollbar pb-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                <RefreshCw className="w-6 h-6 animate-spin mb-2 text-emerald-400" />
                <span className="text-xs">Loading mail...</span>
              </div>
            ) : filteredEmails.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-slate-600 px-4 text-center">
                <Mail className="w-8 h-8 mb-2 opacity-30" />
                <span className="text-sm font-medium">No messages found</span>
                <span className="text-xs opacity-60 mt-1">Check back later or try a different search.</span>
              </div>
            ) : (
              filteredEmails.map(email => (
                <div
                  key={email.id}
                  onClick={() => handleSelectEmail(email)}
                  className={`p-4 flex gap-3 cursor-pointer select-none transition-all duration-150 relative ${
                    selectedEmail?.id === email.id
                      ? 'bg-slate-800/40 border-l-2 border-emerald-500'
                      : 'hover:bg-slate-900/50 border-l-2 border-transparent'
                  } ${email.status === 'unread' ? 'bg-slate-900/20 font-semibold' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md ${getAvatarBgColor(email.sender)}`}>
                    {getInitials(email.sender)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400 truncate max-w-[120px]">
                        {email.sender.split('<')[0].trim() || email.sender}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(email.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h3 className={`text-sm truncate mb-0.5 ${email.status === 'unread' ? 'text-slate-100 font-bold' : 'text-slate-300'}`}>
                      {email.subject}
                    </h3>
                    
                    {/* Recipient tag badge */}
                    <div className="flex items-center gap-1.5 mt-0.5 mb-1">
                      <span className="text-[9px] px-1.5 py-0.2 rounded border bg-slate-900 border-slate-800 text-slate-400 font-mono">
                        {email.recipient.includes('sales') ? 'sales' : email.recipient.includes('support') ? 'support' : 'info'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2">
                      {email.text_content}
                    </p>
                  </div>

                  <div className="absolute right-3 bottom-3 flex items-center gap-1 opacity-0 hover:opacity-100 md:group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleDeleteEmail(email.id, e)}
                      className="p-1 rounded bg-slate-800 hover:bg-rose-950/40 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete email"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {email.status === 'unread' && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50" />
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: EMAIL READER PANE */}
        <section 
          className={`flex-grow flex-col bg-slate-900/20 transition-all duration-200 ${
            selectedEmail ? 'flex' : 'hidden md:flex'
          }`}
        >
          {selectedEmail ? (
            <div className="h-full flex flex-col">
              
              {/* Reader Action Bar */}
              <div className="px-4 md:px-6 py-4 border-b border-slate-850 flex items-center justify-between flex-shrink-0 bg-slate-950/20">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedEmail(null)}
                    className="md:hidden p-2 rounded-lg bg-slate-855 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-800"
                    title="Back to inbox"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleReply(selectedEmail)}
                    className="py-2 px-4 rounded-lg bg-slate-850 hover:bg-slate-800 hover:text-emerald-400 border border-slate-800 font-semibold text-sm flex items-center gap-2 text-slate-200 transition-all active:scale-95"
                  >
                    <Reply className="w-4 h-4 text-emerald-450" />
                    Reply
                  </button>
                  
                  <button
                    onClick={(e) => handleDeleteEmail(selectedEmail.id, e)}
                    className="p-2 rounded-lg bg-slate-855 hover:bg-rose-955/30 text-slate-400 hover:text-rose-400 border border-slate-800 transition-all"
                    title="Delete Email"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[10px] md:text-xs text-slate-500 font-mono truncate max-w-[120px] md:max-w-none">
                  {selectedEmail.resend_id || selectedEmail.id}
                </div>
              </div>

              {/* Reader Body (Scrollable) */}
              <div className="flex-grow overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar pb-10">
                
                {/* Header Information */}
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-100 mb-4">{selectedEmail.subject}</h2>
                  
                  <div className="flex justify-between items-start bg-slate-900/50 p-4 rounded-xl border border-slate-850 gap-2">
                    <div className="flex gap-3 min-w-0">
                      <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm bg-slate-800 border border-slate-700 shadow-inner text-emerald-400 flex-shrink-0`}>
                        {getInitials(selectedEmail.sender)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs md:text-sm font-semibold text-slate-200 truncate">{selectedEmail.sender}</div>
                        <div className="text-[10px] md:text-xs text-slate-400 truncate">To: {selectedEmail.recipient}</div>
                      </div>
                    </div>
                    
                    <div className="text-[10px] md:text-xs text-slate-500 font-medium whitespace-nowrap pt-1">
                      {new Date(selectedEmail.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </div>
                  </div>
                </div>

                {/* Email Body Rendering */}
                <div className="bg-slate-900/20 border border-slate-855/60 rounded-xl p-4 md:p-6 min-h-[220px] text-slate-200 leading-relaxed text-sm select-text whitespace-pre-wrap overflow-x-auto">
                  {selectedEmail.html_content ? (
                    <div 
                      dangerouslySetInnerHTML={{ __html: selectedEmail.html_content }} 
                      className="email-html-body max-w-full"
                    />
                  ) : (
                    selectedEmail.text_content
                  )}
                </div>

                {/* Attachments Section */}
                {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                  <div className="space-y-2 pb-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-emerald-400" />
                      Attachments ({selectedEmail.attachments.length})
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedEmail.attachments.map((att, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                            <div className="overflow-hidden">
                              <p className="text-xs font-medium text-slate-200 truncate" title={att.name}>
                                {att.name}
                              </p>
                              <p className="text-[10px] text-slate-500">
                                {formatSize(att.size)}
                              </p>
                            </div>
                          </div>
                          
                          {att.url && (
                            <a
                              href={att.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 text-[11px] font-bold text-emerald-400 hover:text-slate-950 bg-emerald-950/20 hover:bg-emerald-400 rounded-md border border-emerald-800/30 hover:border-emerald-400 transition-all"
                            >
                              Download
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          ) : (
            /* Placeholder state when no email is open */
            <div className="h-full flex flex-col items-center justify-center text-slate-600 select-none px-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 shadow-xl">
                <Mail className="w-7 h-7 text-slate-500 opacity-60" />
              </div>
              <h3 className="text-base font-semibold text-slate-400">Select an email to view</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-[280px]">
                Pick a conversation from the sidebar inbox to read its details, reply, or download attachments.
              </p>
            </div>
          )}
        </section>

        {/* 3. MOBILE APP BOTTOM NAVIGATION BAR (FOOTER) */}
        <footer className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 flex items-center justify-around px-2 z-40 select-none">
          <button
            onClick={() => { setActiveFolder('inbox'); setSelectedEmail(null); }}
            className={`flex flex-col items-center justify-center w-14 h-full gap-1 transition-all ${
              activeFolder === 'inbox' ? 'text-emerald-400 font-bold scale-105' : 'text-slate-400'
            }`}
          >
            <div className="relative">
              <Inbox className="w-5 h-5" />
              {totalUnreadCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-slate-900">
                  {totalUnreadCount}
                </span>
              )}
            </div>
            <span className="text-[10px]">Inbox</span>
          </button>

          <button
            onClick={() => { setActiveFolder('sent'); setSelectedEmail(null); }}
            className={`flex flex-col items-center justify-center w-14 h-full gap-1 transition-all ${
              activeFolder === 'sent' ? 'text-emerald-400 font-bold scale-105' : 'text-slate-400'
            }`}
          >
            <Send className="w-5 h-5" />
            <span className="text-[10px]">Sent</span>
          </button>

          {/* Floating center plus icon */}
          <button
            onClick={() => { setIsComposing(true); setComposeFrom('info'); }}
            className="flex flex-col items-center justify-center w-12 h-12 -mt-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-6 h-6 stroke-[3]" />
          </button>

          <button
            onClick={fetchEmails}
            className="flex flex-col items-center justify-center w-14 h-full gap-1 text-slate-400 active:text-emerald-400 transition-all"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            <span className="text-[10px]">Refresh</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center w-14 h-full gap-1 text-slate-400 hover:text-rose-400 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px]">Logout</span>
          </button>
        </footer>

      </main>

      {/* 4. COMPOSE MODAL OVERLAY (Full screen on mobile) */}
      {isComposing && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-4">
          <div className="bg-slate-900 border-none md:border md:border-slate-800 md:rounded-2xl w-full h-full md:h-auto md:max-w-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 flex-shrink-0">
              <h2 className="font-extrabold text-slate-100 flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                New Message
              </h2>
              <button
                onClick={() => setIsComposing(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Compose Form */}
            <form onSubmit={handleSend} className="flex-1 flex flex-col overflow-hidden">
              <div className="p-6 space-y-4 flex-grow overflow-y-auto custom-scrollbar">
                
                {/* From Dropdown (Selection of Sender Mailbox) */}
                <div className="flex items-center border-b border-slate-800/80 pb-2">
                  <label className="text-sm font-semibold text-slate-500 w-12 select-none">From:</label>
                  <select
                    value={composeFrom}
                    onChange={e => setComposeFrom(e.target.value as any)}
                    className="bg-transparent text-sm text-emerald-450 border-none outline-none focus:ring-0 focus:outline-none cursor-pointer font-bold pr-6"
                  >
                    <option value="info" className="bg-slate-900 text-slate-200">info@x-med.co</option>
                    <option value="sales" className="bg-slate-900 text-slate-200">sales@x-med.co</option>
                    <option value="support" className="bg-slate-900 text-slate-200">support@x-med.co</option>
                  </select>
                </div>

                {/* To */}
                <div className="flex items-center border-b border-slate-800/80 pb-2">
                  <label className="text-sm font-semibold text-slate-500 w-12 select-none">To:</label>
                  <input
                    type="email"
                    value={composeTo}
                    onChange={e => setComposeTo(e.target.value)}
                    required
                    placeholder="recipient@example.com"
                    className="flex-grow bg-transparent text-sm text-slate-200 border-none outline-none focus:ring-0 focus:outline-none"
                  />
                </div>

                {/* Subject */}
                <div className="flex items-center border-b border-slate-800/80 pb-2">
                  <label className="text-sm font-semibold text-slate-500 w-12 select-none">Sub:</label>
                  <input
                    type="text"
                    value={composeSubject}
                    onChange={e => setComposeSubject(e.target.value)}
                    placeholder="Enter subject line"
                    className="flex-grow bg-transparent text-sm text-slate-200 border-none outline-none focus:ring-0 focus:outline-none"
                  />
                </div>

                {/* Message Body */}
                <div className="flex flex-col min-h-[200px]">
                  <textarea
                    value={composeBody}
                    onChange={e => setComposeBody(e.target.value)}
                    placeholder="Compose your email here..."
                    className="w-full flex-grow bg-transparent text-sm text-slate-200 resize-none border-none outline-none focus:ring-0 focus:outline-none font-sans custom-scrollbar"
                  />
                </div>

                {/* Added Attachments Display */}
                {composeAttachments.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/50 space-y-1.5 pb-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Added Files</span>
                    <div className="flex flex-wrap gap-1.5">
                      {composeAttachments.map((file, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-2 py-1 px-2 rounded-md bg-slate-850 border border-slate-855 text-xs text-slate-300"
                        >
                          <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                          <span className="truncate max-w-[150px]">{file.name}</span>
                          <button 
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="p-0.5 rounded-full hover:bg-slate-750 text-slate-500 hover:text-slate-300 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions Footer */}
              <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-all"
                    title="Attach Files"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsComposing(false)}
                    className="py-2.5 px-4 rounded-xl border border-slate-800 hover:bg-slate-850 text-slate-300 font-bold text-sm transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-200"
                  >
                    {isSending ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 5. TOAST NOTIFICATIONS */}
      {notification && (
        <div className="fixed bottom-20 md:bottom-4 right-4 z-50 flex items-center gap-2.5 py-3.5 px-5 rounded-xl shadow-2xl border bg-slate-900 border-slate-800 text-sm font-semibold animate-in slide-in-from-bottom-5 duration-350">
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
          )}
          <span className="text-slate-200">{notification.text}</span>
        </div>
      )}

    </div>
  );
}
