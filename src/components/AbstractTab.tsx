import React, { useState } from 'react';
import { AbstractData } from '../types/research';
import {
  FileText,
  Copy,
  Sparkles,
  Download,
  CheckCircle,
  AlertCircle,
  Layers,
  AlignLeft,
  RefreshCw,
  Info
} from 'lucide-react';

interface AbstractTabProps {
  abstractData: AbstractData;
  onCopy: (text: string, label: string) => void;
  onDownloadTxt: (content: string, filename: string) => void;
  onOpenRefine: (text: string, sectionTitle: string) => void;
  onRegenerateAbstract: () => void;
  isLoading: boolean;
}

export const AbstractTab: React.FC<AbstractTabProps> = ({
  abstractData,
  onCopy,
  onDownloadTxt,
  onOpenRefine,
  onRegenerateAbstract,
  isLoading,
}) => {
  const [viewMode, setViewMode] = useState<'paragraph' | 'structured'>('paragraph');

  const currentWords = abstractData.text.trim().split(/\s+/).filter(Boolean).length;
  const isOptimalWordCount = currentWords >= 150 && currentWords <= 250;

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-academic flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Academic Abstract
            </h2>
            {/* Word count badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                isOptimalWordCount
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-amber-50 text-amber-700 border-amber-300'
              }`}
            >
              {isOptimalWordCount ? (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              )}
              {currentWords} words {isOptimalWordCount ? '(Optimal 150–250)' : '(Target 150–250)'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Engineered strictly for university and journal guidelines (150–250 words standard).
          </p>
        </div>

        {/* View toggles & Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Switcher */}
          <div className="bg-slate-100 p-0.5 rounded-xl border border-slate-200 flex text-xs">
            <button
              onClick={() => setViewMode('paragraph')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'paragraph'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlignLeft className="w-3.5 h-3.5" />
              Full Paragraph
            </button>
            <button
              onClick={() => setViewMode('structured')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'structured'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              IMRAD Breakdown
            </button>
          </div>

          <button
            onClick={() => onOpenRefine(abstractData.text, 'Abstract')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Polish / Refine
          </button>

          <button
            onClick={() => onCopy(abstractData.text, 'Abstract')}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            title="Copy abstract text"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDownloadTxt(abstractData.text, 'abstract.txt')}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            title="Download abstract as TXT"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'paragraph' ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-2">
            <span className="font-semibold uppercase tracking-wider text-slate-500">
              Manuscript Abstract (Single Block)
            </span>
            <span className="font-medium text-slate-500">{currentWords} Words</span>
          </div>

          <p className="text-base text-slate-800 leading-relaxed font-academic text-justify tracking-normal select-text">
            {abstractData.text}
          </p>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Meets IMRAD Structure (Introduction, Methods, Results, and Discussion)
            </span>
            <button
              onClick={() => onCopy(abstractData.text, 'Abstract')}
              className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      ) : (
        /* Structured Breakdown Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              1. Background & Context
            </span>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {abstractData.breakdown.background}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
              2. Problem Statement & Research Gap
            </span>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {abstractData.breakdown.problemStatement}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              3. Research Objective
            </span>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {abstractData.breakdown.objective}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              4. Research Methodology
            </span>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {abstractData.breakdown.methodology}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              5. Anticipated / Benchmark Findings
            </span>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {abstractData.breakdown.expectedFindings}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
              6. Scholarly Significance & Impact
            </span>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {abstractData.breakdown.significance}
            </p>
          </div>
        </div>
      )}

      {/* Word Count Guidelines Info */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-900">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block mb-0.5">Abstract Writing Discipline:</strong>
          Peer-reviewed venues automatically reject or require revisions for abstracts that fall outside the 150–250 word envelope. Never include citations or undefined abbreviations in the abstract itself.
        </div>
      </div>
    </div>
  );
};
