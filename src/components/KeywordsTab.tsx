import React from 'react';
import { KeywordsData } from '../types/research';
import {
  Tag,
  Copy,
  Download,
  ExternalLink,
  Search,
  Sparkles,
  Database,
  Code
} from 'lucide-react';

interface KeywordsTabProps {
  keywordsData: KeywordsData;
  onCopy: (text: string, label: string) => void;
  onDownloadTxt: (content: string, filename: string) => void;
}

export const KeywordsTab: React.FC<KeywordsTabProps> = ({
  keywordsData,
  onCopy,
  onDownloadTxt,
}) => {
  const formatKeywordsText = () => {
    let out = `RESEARCH KEYWORDS & DATABASE SEARCH STRINGS\n\n`;
    out += `PRIMARY KEYWORDS:\n${keywordsData.primaryKeywords.join(', ')}\n\n`;
    out += `SECONDARY / TAXONOMY TERMS:\n${keywordsData.secondaryTaxonomyTerms.join(', ')}\n\n`;
    out += `BOOLEAN SEARCH STRING:\n${keywordsData.booleanSearchString}\n\n`;
    if (keywordsData.booleanSearchQueries) {
      out += `DATABASE-SPECIFIC STRINGS:\n`;
      if (keywordsData.booleanSearchQueries.googleScholar) {
        out += `Google Scholar: ${keywordsData.booleanSearchQueries.googleScholar}\n`;
      }
      if (keywordsData.booleanSearchQueries.ieeeXploreOrPubMed) {
        out += `IEEE Xplore / PubMed: ${keywordsData.booleanSearchQueries.ieeeXploreOrPubMed}\n`;
      }
      if (keywordsData.booleanSearchQueries.scopusOrWebOfScience) {
        out += `Scopus / Web of Science: ${keywordsData.booleanSearchQueries.scopusOrWebOfScience}\n`;
      }
    }
    return out;
  };

  const scholarQuery = keywordsData.booleanSearchQueries?.googleScholar || keywordsData.booleanSearchString;
  const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(scholarQuery)}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-academic flex items-center gap-2">
            <Tag className="w-5 h-5 text-indigo-600" />
            Academic Keywords & Taxonomy Terms
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Optimized indexing keywords and Boolean database search strings for scholarly discovery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={scholarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors shadow-xs"
          >
            <Search className="w-3.5 h-3.5" />
            Query Google Scholar
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>

          <button
            onClick={() => onCopy(formatKeywordsText(), 'Keywords & Search Strings')}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            title="Copy keywords"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDownloadTxt(formatKeywordsText(), 'keywords.txt')}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            title="Download keywords as TXT"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Keywords Grid */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Primary Indexing Terms (for Paper Metadata)
          </span>
          <span className="text-xs text-slate-400">Click any keyword to copy</span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {keywordsData.primaryKeywords.map((kw, idx) => (
            <button
              key={idx}
              onClick={() => onCopy(kw, `Keyword "${kw}"`)}
              className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-50 text-indigo-900 border border-indigo-200/80 hover:bg-indigo-600 hover:text-white transition-all shadow-2xs cursor-pointer"
            >
              <span>{kw}</span>
              <Copy className="w-3 h-3 text-indigo-400 group-hover:text-white transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Taxonomy & MeSH / IEEE Terms */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Secondary Controlled Vocabulary & Subject Categories
          </span>
          <span className="text-xs text-slate-400">Taxonomy / MeSH / IEEE Thesaurus</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {keywordsData.secondaryTaxonomyTerms.map((term, idx) => (
            <button
              key={idx}
              onClick={() => onCopy(term, `Term "${term}"`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/70 transition-colors"
            >
              <span>{term}</span>
              <Copy className="w-3 h-3 text-slate-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Boolean Database Search Query Strings */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-sm text-slate-100">
              Ready-to-Use Boolean Literature Search Queries
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Literature Review Search Strings</span>
        </div>

        {/* Universal Boolean String */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Universal Boolean Search String:</span>
            <button
              onClick={() => onCopy(keywordsData.booleanSearchString, 'Universal Boolean String')}
              className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              Copy String
            </button>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 break-all leading-relaxed select-all">
            {keywordsData.booleanSearchString}
          </div>
        </div>

        {/* Database Specific Queries */}
        {keywordsData.booleanSearchQueries && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {keywordsData.booleanSearchQueries.googleScholar && (
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-300 font-semibold">
                  <span>Google Scholar Query:</span>
                  <button
                    onClick={() => onCopy(keywordsData.booleanSearchQueries!.googleScholar!, 'Google Scholar Query')}
                    className="text-indigo-400 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <p className="font-mono text-slate-300 break-all text-[11px]">
                  {keywordsData.booleanSearchQueries.googleScholar}
                </p>
              </div>
            )}

            {keywordsData.booleanSearchQueries.ieeeXploreOrPubMed && (
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-300 font-semibold">
                  <span>IEEE Xplore / PubMed Query:</span>
                  <button
                    onClick={() => onCopy(keywordsData.booleanSearchQueries!.ieeeXploreOrPubMed!, 'IEEE / PubMed Query')}
                    className="text-indigo-400 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <p className="font-mono text-slate-300 break-all text-[11px]">
                  {keywordsData.booleanSearchQueries.ieeeXploreOrPubMed}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
