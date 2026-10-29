import React from 'react';
import {
  GraduationCap,
  Download,
  Printer,
  Copy,
  ShieldCheck,
  FileText,
  Sparkles,
  BookMarked
} from 'lucide-react';

interface NavbarProps {
  onOpenPolicyModal: () => void;
  onDownloadTxt: () => void;
  onDownloadMd: () => void;
  onPrint: () => void;
  onCopyAll: () => void;
  onSelectSample: (type: 'ai-healthcare' | 'smart-waste') => void;
  activeTopic: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPolicyModal,
  onDownloadTxt,
  onDownloadMd,
  onPrint,
  onCopyAll,
  onSelectSample,
  activeTopic,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-indigo-800 flex items-center justify-center text-white shadow-sm ring-1 ring-slate-900/10">
              <GraduationCap className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                  ResearchMate <span className="text-indigo-600 font-extrabold">AI</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  Academic Suite
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Research Paper Assistant for Students & Scholars
              </p>
            </div>
          </div>

          {/* Quick preset examples */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 text-xs">
            <span className="px-2 py-1 text-slate-500 font-medium flex items-center gap-1">
              <BookMarked className="w-3.5 h-3.5 text-indigo-500" />
              Presets:
            </span>
            <button
              onClick={() => onSelectSample('ai-healthcare')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeTopic.includes('Healthcare') || activeTopic.includes('Artificial Intelligence')
                  ? 'bg-white text-indigo-700 shadow-xs border border-indigo-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              1. AI in Healthcare
            </button>
            <button
              onClick={() => onSelectSample('smart-waste')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeTopic.includes('Waste') || activeTopic.includes('IoT')
                  ? 'bg-white text-indigo-700 shadow-xs border border-indigo-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              2. Smart Waste IoT
            </button>
          </div>

          {/* Actions & Verification badge */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Anti-Hallucination policy button */}
            <button
              onClick={onOpenPolicyModal}
              title="View Research Reference Verification & Anti-Hallucination Policy"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline">Citation Verification</span>
              <span className="md:hidden">Citations</span>
            </button>

            {/* Global Copy */}
            <button
              onClick={onCopyAll}
              title="Copy Entire Research Paper to Clipboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200/70"
            >
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Copy All</span>
            </button>

            {/* Download dropdown / buttons */}
            <div className="flex items-center rounded-lg border border-slate-200 shadow-xs overflow-hidden bg-white">
              <button
                onClick={onDownloadTxt}
                title="Download full paper dossier as .txt file"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors border-r border-slate-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span> .TXT
              </button>
              <button
                onClick={onDownloadMd}
                title="Download as Markdown (.md)"
                className="px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors border-r border-slate-200 hidden md:inline-flex"
              >
                .MD
              </button>
              <button
                onClick={onPrint}
                title="Print or Save as PDF"
                className="p-1.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
