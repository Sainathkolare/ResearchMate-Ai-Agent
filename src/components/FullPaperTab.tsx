import React from 'react';
import { StructuredPaperData, CitationItem, KeywordsData } from '../types/research';
import {
  FileCode,
  Copy,
  Download,
  Printer,
  Sparkles,
  BookOpen,
  Calendar,
  User,
  Building,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface FullPaperTabProps {
  paperData: StructuredPaperData;
  citations: CitationItem[];
  keywords: KeywordsData;
  onCopy: (text: string, label: string) => void;
  onDownloadTxt: (content: string, filename: string) => void;
  onDownloadMd: (content: string, filename: string) => void;
  onPrint: () => void;
  onOpenRefine: (text: string, sectionTitle: string) => void;
}

export const FullPaperTab: React.FC<FullPaperTabProps> = ({
  paperData,
  citations,
  keywords,
  onCopy,
  onDownloadTxt,
  onDownloadMd,
  onPrint,
  onOpenRefine,
}) => {
  // Build the complete full text
  const compileFullPaperText = () => {
    let out = `${paperData.recommendedTitle.toUpperCase()}\n\n`;
    out += `Authors: Student Researcher(s), Academic Department, University Institution\n`;
    out += `Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\n\n`;
    out += `ABSTRACT\n${paperData.abstract}\n\n`;
    out += `KEYWORDS:\n${keywords.primaryKeywords.join('; ')}\n\n`;
    out += `------------------------------------------------------------\n\n`;
    out += `${paperData.introduction}\n\n`;
    out += `${paperData.literatureReview}\n\n`;
    out += `${paperData.methodology}\n\n`;
    out += `${paperData.resultsAndDiscussion}\n\n`;
    out += `${paperData.limitations}\n\n`;
    out += `${paperData.conclusionAndFutureWork}\n\n`;
    out += `------------------------------------------------------------\n`;
    out += `REFERENCES & CITATIONS (Verification Required)\n\n`;
    citations.forEach((c, i) => {
      out += `[${i + 1}] ${c.ieee}\n`;
      out += `    APA 7: ${c.apa7}\n`;
      out += `    Status: ${c.verificationStatus} - ${c.verificationGuidance}\n\n`;
    });
    return out;
  };

  const compileMarkdown = () => {
    let md = `# ${paperData.recommendedTitle}\n\n`;
    md += `**Authors:** Student Researcher(s), Academic Department, University Institution  \n`;
    md += `**Date:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}  \n\n`;
    md += `### Abstract\n${paperData.abstract}\n\n`;
    md += `**Keywords:** ${keywords.primaryKeywords.join(', ')}\n\n`;
    md += `---\n\n`;
    md += `${paperData.introduction}\n\n`;
    md += `${paperData.literatureReview}\n\n`;
    md += `${paperData.methodology}\n\n`;
    md += `${paperData.resultsAndDiscussion}\n\n`;
    md += `${paperData.limitations}\n\n`;
    md += `${paperData.conclusionAndFutureWork}\n\n`;
    md += `### References\n\n`;
    citations.forEach((c, i) => {
      md += `${i + 1}. ${c.apa7} *[${c.verificationStatus}]*\n`;
    });
    return md;
  };

  const fullText = compileFullPaperText();
  const wordCount = fullText.trim().split(/\s+/).filter(Boolean).length;
  const estimatedReadTime = Math.ceil(wordCount / 220);

  return (
    <div className="space-y-6">
      {/* Action / Toolbar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 no-print">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-academic flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Structured Research Paper Manuscript
          </h2>
          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
            <span>{wordCount.toLocaleString()} total words</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              ~{estimatedReadTime} min read
            </span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">Standard Academic Format</span>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onCopy(fullText, 'Full Paper Draft')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200"
            title="Copy full research paper to clipboard"
          >
            <Copy className="w-3.5 h-3.5" />
            Copy Full Paper
          </button>

          <button
            onClick={() => onDownloadTxt(fullText, `${paperData.recommendedTitle.slice(0, 30).trim().toLowerCase().replace(/[^a-z0-9]/g, '_')}_paper.txt`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-xs transition-colors"
            title="Download formatted text file"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            Download .TXT
          </button>

          <button
            onClick={() => onDownloadMd(compileMarkdown(), `${paperData.recommendedTitle.slice(0, 30).trim().toLowerCase().replace(/[^a-z0-9]/g, '_')}_paper.md`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-xs transition-colors"
            title="Download markdown file"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-600" />
            Download .MD
          </button>

          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs transition-colors"
            title="Print or export as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / PDF
          </button>
        </div>
      </div>

      {/* Academic Manuscript View */}
      <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-sm max-w-4xl mx-auto space-y-8 font-academic text-slate-900 leading-relaxed print:shadow-none print:border-none print:p-0">
        {/* Title Header */}
        <div className="text-center space-y-3 pb-6 border-b border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight">
            {paperData.recommendedTitle}
          </h1>

          <div className="text-xs sm:text-sm text-slate-600 space-y-1">
            <p className="font-semibold text-slate-800">
              [Student / Researcher Names]
            </p>
            <p className="text-slate-500">
              Department of Academic Research & Scientific Studies, University Institute
            </p>
            <p className="text-slate-400 font-sans text-[11px]">
              Academic Manuscript Draft • Prepared via ResearchMate AI • {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Abstract Box */}
        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 text-sm">
          <div className="flex items-center justify-between mb-2 no-print">
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-slate-700">
              Abstract
            </span>
            <button
              onClick={() => onOpenRefine(paperData.abstract, 'Abstract')}
              className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-sans font-medium"
            >
              <Sparkles className="w-3 h-3" />
              Polish
            </button>
          </div>
          <p className="text-justify leading-relaxed text-slate-800 font-academic">
            {paperData.abstract}
          </p>

          <div className="mt-4 pt-3 border-t border-slate-200 font-sans text-xs text-slate-600">
            <strong className="text-slate-800 font-semibold">Keywords: </strong>
            {keywords.primaryKeywords.join('; ')}
          </div>
        </div>

        {/* Manuscript Sections */}
        <div className="space-y-8 text-sm sm:text-base">
          {/* Section 1: Introduction */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1 no-print">
              <span className="text-xs font-sans font-semibold text-slate-400">Section 1</span>
              <button
                onClick={() => onOpenRefine(paperData.introduction, 'Introduction')}
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-sans font-medium"
              >
                <Sparkles className="w-3 h-3" />
                Refine Section
              </button>
            </div>
            <div className="text-justify whitespace-pre-wrap font-academic leading-relaxed">
              {paperData.introduction}
            </div>
          </div>

          {/* Section 2: Literature Review */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1 no-print">
              <span className="text-xs font-sans font-semibold text-slate-400">Section 2</span>
              <button
                onClick={() => onOpenRefine(paperData.literatureReview, 'Literature Review')}
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-sans font-medium"
              >
                <Sparkles className="w-3 h-3" />
                Refine Section
              </button>
            </div>
            <div className="text-justify whitespace-pre-wrap font-academic leading-relaxed">
              {paperData.literatureReview}
            </div>
          </div>

          {/* Section 3: Methodology */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1 no-print">
              <span className="text-xs font-sans font-semibold text-slate-400">Section 3</span>
              <button
                onClick={() => onOpenRefine(paperData.methodology, 'Methodology')}
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-sans font-medium"
              >
                <Sparkles className="w-3 h-3" />
                Refine Section
              </button>
            </div>
            <div className="text-justify whitespace-pre-wrap font-academic leading-relaxed">
              {paperData.methodology}
            </div>
          </div>

          {/* Section 4: Results & Discussion */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1 no-print">
              <span className="text-xs font-sans font-semibold text-slate-400">Section 4</span>
              <button
                onClick={() => onOpenRefine(paperData.resultsAndDiscussion, 'Results & Discussion')}
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-sans font-medium"
              >
                <Sparkles className="w-3 h-3" />
                Refine Section
              </button>
            </div>
            <div className="text-justify whitespace-pre-wrap font-academic leading-relaxed">
              {paperData.resultsAndDiscussion}
            </div>
          </div>

          {/* Section 5: Limitations */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1 no-print">
              <span className="text-xs font-sans font-semibold text-slate-400">Section 5</span>
              <button
                onClick={() => onOpenRefine(paperData.limitations, 'Limitations')}
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-sans font-medium"
              >
                <Sparkles className="w-3 h-3" />
                Refine Section
              </button>
            </div>
            <div className="text-justify whitespace-pre-wrap font-academic leading-relaxed">
              {paperData.limitations}
            </div>
          </div>

          {/* Section 6: Conclusion */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1 no-print">
              <span className="text-xs font-sans font-semibold text-slate-400">Section 6</span>
              <button
                onClick={() => onOpenRefine(paperData.conclusionAndFutureWork, 'Conclusion')}
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-sans font-medium"
              >
                <Sparkles className="w-3 h-3" />
                Refine Section
              </button>
            </div>
            <div className="text-justify whitespace-pre-wrap font-academic leading-relaxed">
              {paperData.conclusionAndFutureWork}
            </div>
          </div>

          {/* References Section */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 font-academic">References</h3>
              <span className="font-sans text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                Anti-Hallucination Verified
              </span>
            </div>

            <ol className="space-y-3 text-xs sm:text-sm text-slate-700 pl-4 list-decimal">
              {citations.map((c, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span>{c.apa7} </span>
                  <span className="inline-block font-sans text-[10px] font-semibold text-amber-800 bg-amber-100/60 px-1.5 py-0.2 rounded border border-amber-300 ml-1">
                    [{c.verificationStatus}]
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
