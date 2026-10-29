import React from 'react';
import { OutlineData } from '../types/research';
import {
  ListTree,
  Copy,
  Download,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  FolderKanban,
  Target,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface OutlineTabProps {
  outlineData: OutlineData;
  onCopy: (text: string, label: string) => void;
  onDownloadTxt: (content: string, filename: string) => void;
  onOpenRefine: (text: string, sectionTitle: string) => void;
}

export const OutlineTab: React.FC<OutlineTabProps> = ({
  outlineData,
  onCopy,
  onDownloadTxt,
  onOpenRefine,
}) => {
  const formatOutlineText = () => {
    let out = `RESEARCH OUTLINE & LITERATURE REVIEW PLAN\n\n`;
    out += `1. BACKGROUND & HOOK:\n${outlineData.backgroundHook}\n\n`;
    out += `2. CONTEXTUAL BACKGROUND:\n${outlineData.contextualBackground}\n\n`;
    out += `3. IDENTIFIED RESEARCH GAP:\n${outlineData.identifiedResearchGap}\n\n`;
    out += `4. RESEARCH QUESTIONS:\n`;
    outlineData.researchQuestions.forEach((rq, i) => {
      out += `   ${rq}\n`;
    });
    out += `\n5. THEORETICAL FRAMEWORK:\n${outlineData.theoreticalFramework}\n\n`;
    out += `6. LITERATURE REVIEW THEMATIC CLUSTERS:\n`;
    outlineData.literatureReviewClusters.forEach((c, i) => {
      out += `   Cluster ${i + 1}: ${c.thematicArea}\n`;
      out += `   - Key Concepts: ${c.keyConcepts.join(', ')}\n`;
      out += `   - Discussion: ${c.criticalDiscussion}\n`;
      out += `   - Gap Addressed: ${c.gapAddressed}\n\n`;
    });
    return out;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-academic flex items-center gap-2">
            <ListTree className="w-5 h-5 text-indigo-600" />
            Introduction & Literature Review Outline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Systematic blueprint structuring the research problem, empirical gaps, and thematic prior literature.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenRefine(formatOutlineText(), 'Introduction & Literature Outline')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Refine Outline
          </button>
          <button
            onClick={() => onCopy(formatOutlineText(), 'Outline & Literature Review')}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            title="Copy outline to clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDownloadTxt(formatOutlineText(), 'outline.txt')}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            title="Download outline as TXT"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Part 1: Problem Statement & Research Gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Background Hook */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Section 1.1: Background & Scholarly Hook
          </span>
          <p className="mt-2.5 text-sm text-slate-700 leading-relaxed font-academic">
            {outlineData.backgroundHook}
          </p>
          <p className="mt-2 text-xs text-slate-500 leading-normal border-t border-slate-100 pt-2">
            {outlineData.contextualBackground}
          </p>
        </div>

        {/* Identified Research Gap */}
        <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-rose-600" />
            Section 1.2: The Identified Research Gap
          </span>
          <p className="mt-2.5 text-sm text-slate-800 leading-relaxed font-academic font-medium">
            "{outlineData.identifiedResearchGap}"
          </p>
          <div className="mt-3 p-2.5 bg-white/80 rounded-xl border border-rose-200/60 text-xs text-rose-900">
            <strong>Reviewer Note:</strong> Academic papers succeed or fail based on whether this gap is clearly distinct from prior published solutions.
          </div>
        </div>
      </div>

      {/* Part 2: Research Questions & Theoretical Framework */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            Guiding Research Questions (RQs) & Theoretical Framing
          </h3>
          <span className="text-xs text-slate-400 font-mono">Section 1.3 - 1.4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {outlineData.researchQuestions.map((rq, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-indigo-600 block mb-1">Research Question {idx + 1}:</span>
              {rq}
            </div>
          ))}
        </div>

        {/* Theoretical Framework */}
        <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-200/70 text-xs text-indigo-950">
          <strong className="block text-indigo-900 font-semibold mb-1">
            Grounded Theoretical Framework:
          </strong>
          {outlineData.theoreticalFramework}
        </div>
      </div>

      {/* Part 3: Thematic Literature Review Clusters */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-academic">
          <FolderKanban className="w-4 h-4 text-indigo-600" />
          Thematic Literature Review Clusters (Synthesis Matrix)
        </h3>
        <p className="text-xs text-slate-500">
          Grouped by analytical themes rather than author-by-author chronologies, as required by leading scholarly journals.
        </p>

        <div className="grid grid-cols-1 gap-3.5">
          {outlineData.literatureReviewClusters.map((cluster, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2 font-academic">
                  <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                    2.{idx + 1}
                  </span>
                  Theme: {cluster.thematicArea}
                </span>

                <div className="flex flex-wrap gap-1">
                  {cluster.keyConcepts.map((kc, kIdx) => (
                    <span key={kIdx} className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {kc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                <strong className="font-semibold text-slate-800">Critical Synthesis: </strong>
                {cluster.criticalDiscussion}
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-indigo-700 font-medium flex items-center gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>
                  <strong>Gap Bridged: </strong>
                  {cluster.gapAddressed}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
