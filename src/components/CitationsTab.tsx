import React, { useState } from 'react';
import { CitationItem } from '../types/research';
import {
  BookMarked,
  Copy,
  Download,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  FileText,
  Search,
  Sparkles,
  Info
} from 'lucide-react';

interface CitationsTabProps {
  citations: CitationItem[];
  onCopy: (text: string, label: string) => void;
  onDownloadTxt: (content: string, filename: string) => void;
  onOpenPolicyModal: () => void;
}

export const CitationsTab: React.FC<CitationsTabProps> = ({
  citations,
  onCopy,
  onDownloadTxt,
  onOpenPolicyModal,
}) => {
  const [activeFormat, setActiveFormat] = useState<'apa' | 'ieee'>('apa');
  const [customInput, setCustomInput] = useState('');
  const [customFormatted, setCustomFormatted] = useState<string | null>(null);

  const formatAllCitationsText = (format: 'apa' | 'ieee') => {
    let out = `ACADEMIC CITATIONS & REFERENCES (${format === 'apa' ? 'APA 7th Edition' : 'IEEE Numerical Standard'})\n`;
    out += `CRITICAL NOTE: Never invent research references. Clearly verify publication metadata.\n\n`;

    citations.forEach((c, idx) => {
      if (format === 'ieee') {
        out += `[${idx + 1}] ${c.ieee}\n`;
        out += `    Verification Status: ${c.verificationStatus}\n`;
        out += `    Guidance: ${c.verificationGuidance}\n\n`;
      } else {
        out += `${c.apa7}\n`;
        out += `    Verification Status: ${c.verificationStatus}\n`;
        out += `    Guidance: ${c.verificationGuidance}\n\n`;
      }
    });

    return out;
  };

  const handleQuickFormatCustom = () => {
    if (!customInput.trim()) return;
    // Client-side quick helper to structure common student pasted text
    const text = customInput.trim();
    if (activeFormat === 'ieee') {
      setCustomFormatted(`[1] ${text}. [Verification Required: Check author initials and publication venue against IEEE Xplore].`);
    } else {
      setCustomFormatted(`${text}. [Verification Required: Ensure APA 7 italicization of journal titles and DOI format].`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-academic flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-indigo-600" />
            Academic Citations & Bibliographic References
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Standard APA 7th edition and IEEE formatting with explicit verification tags.
          </p>
        </div>

        {/* Format Selector & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-slate-100 p-0.5 rounded-xl border border-slate-200 flex text-xs">
            <button
              onClick={() => setActiveFormat('apa')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeFormat === 'apa'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              APA 7th Edition
            </button>
            <button
              onClick={() => setActiveFormat('ieee')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeFormat === 'ieee'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              IEEE Standard
            </button>
          </div>

          <button
            onClick={() => onCopy(formatAllCitationsText(activeFormat), `All Citations (${activeFormat.toUpperCase()})`)}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            title="Copy all citations in current format"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDownloadTxt(formatAllCitationsText(activeFormat), `references_${activeFormat}.txt`)}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            title="Download references as TXT"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Prominent Anti-Hallucination & Verification Alert */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-950 text-sm flex items-center gap-2">
                Mandatory Citation Integrity Standard
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  Zero Hallucination
                </span>
              </h3>
              <p className="text-xs text-amber-900/90 mt-1 leading-relaxed">
                Academic journals and universities strictly forbid fake references. ResearchMate AI provides canonical benchmark citations and requires researchers to verify exact volume, page numbers, and DOIs prior to final submission.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenPolicyModal}
            className="shrink-0 self-start sm:self-auto px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-amber-300 text-amber-900 hover:bg-amber-100/60 transition-colors shadow-2xs"
          >
            Read Verification Policy
          </button>
        </div>
      </div>

      {/* Citations List */}
      <div className="space-y-4">
        {citations.map((c, idx) => {
          const formattedText = activeFormat === 'apa' ? c.apa7 : c.ieee;
          const inTextSample =
            activeFormat === 'apa'
              ? `(${c.authors.split(',')[0]} et al., ${c.year})`
              : `[${idx + 1}]`;

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                    {activeFormat === 'ieee' ? `[${idx + 1}]` : idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-900 font-academic">
                    {c.title}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {c.sourceType}
                  </span>
                </div>

                {/* Verification Badge */}
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    {c.verificationStatus}
                  </span>
                </div>
              </div>

              {/* Formatted Citation Block */}
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-800 leading-relaxed font-academic">
                {formattedText}
              </div>

              {/* In-Text Citation Note & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
                <div className="flex items-center gap-2 text-slate-600 font-sans">
                  <span className="font-semibold text-slate-700">In-Text Citation:</span>
                  <code className="px-2 py-0.5 bg-slate-100 text-slate-900 rounded font-mono text-xs">
                    {inTextSample}
                  </code>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={c.scholarQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                  >
                    <Search className="w-3 h-3" />
                    Verify on Scholar
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => onCopy(formattedText, `Citation: ${c.title}`)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <Copy className="w-3 h-3 text-slate-500" />
                    Copy Citation
                  </button>
                </div>
              </div>

              {/* Verification Guidance */}
              <div className="text-[11px] text-slate-500 bg-amber-50/30 p-2.5 rounded-lg border border-amber-100 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Verification Step: </strong>
                  {c.verificationGuidance}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Citation Formatter Assistant Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          Raw Citation Formatter Tool
        </h3>
        <p className="text-xs text-slate-500">
          Have an unformatted reference from a paper or website? Paste it here to prepare an {activeFormat.toUpperCase()} reference entry.
        </p>

        <div className="space-y-2">
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="e.g. Vaswani et al., Attention is all you need, NIPS 2017..."
            className="w-full p-3 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            rows={2}
          />
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Target formatting: {activeFormat === 'apa' ? 'APA 7th Author-Date' : 'IEEE Numerical'}
            </span>
            <button
              onClick={handleQuickFormatCustom}
              className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Format Reference
            </button>
          </div>
        </div>

        {customFormatted && (
          <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-xl text-xs text-slate-800 font-academic flex items-start justify-between gap-3">
            <span className="leading-relaxed">{customFormatted}</span>
            <button
              onClick={() => onCopy(customFormatted, 'Custom Citation')}
              className="p-1 text-indigo-700 hover:text-indigo-900 shrink-0"
              title="Copy"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
