import React from 'react';
import { TitleCandidate } from '../types/research';
import { Copy, Check, Sparkles, BookOpen, ExternalLink, ArrowRightCircle, Star } from 'lucide-react';

interface TitlesTabProps {
  titles: TitleCandidate[];
  activeTitle: string;
  onSelectTitle: (title: string) => void;
  onCopy: (text: string, label: string) => void;
  onRegenerateTitles: () => void;
  isLoading: boolean;
}

export const TitlesTab: React.FC<TitlesTabProps> = ({
  titles,
  activeTitle,
  onSelectTitle,
  onCopy,
  onRegenerateTitles,
  isLoading,
}) => {
  const getStyleBadgeColor = (style: string) => {
    switch (style) {
      case 'Empirical':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Problem-Solution':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Technical':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Comparative':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Comprehensive':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-academic flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Academic Title Candidates
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Peer-reviewed title formulations categorized by academic style and publication strategy.
          </p>
        </div>

        <button
          onClick={onRegenerateTitles}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-xs disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-indigo-500" />
          Generate More Titles
        </button>
      </div>

      {/* Title Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {titles.map((item, idx) => {
          const isSelected = activeTitle === item.title;

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all duration-200 ${
                isSelected
                  ? 'bg-indigo-50/60 border-indigo-300 ring-2 ring-indigo-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStyleBadgeColor(
                      item.style
                    )}`}
                  >
                    {item.style} Style
                  </span>
                  {item.targetVenueType && (
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      Venue: {item.targetVenueType}
                    </span>
                  )}
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-indigo-600 text-indigo-600" />
                      Active Manuscript Title
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    onClick={() => onSelectTitle(item.title)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? 'Active Selection' : 'Set as Paper Title'}
                  </button>

                  <button
                    onClick={() => onCopy(item.title, `Title #${idx + 1}`)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                    title="Copy title to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title Text */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-academic leading-snug mb-2">
                "{item.title}"
              </h3>

              {/* Rationale */}
              <div className="text-xs text-slate-600 bg-slate-50/80 rounded-xl p-3 border border-slate-100 leading-relaxed">
                <strong className="text-slate-800 font-semibold">Reviewer Rationale: </strong>
                {item.rationale}
              </div>
            </div>
          );
        })}
      </div>

      {/* Academic Advice Footer */}
      <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600">
        <h4 className="font-semibold text-slate-800 mb-1">Academic Best Practice:</h4>
        <p>
          High-impact journals generally favor titles with a colon structure: <strong>[Core Architecture or Method]</strong>: <strong>[Clinical / Empirical Finding or Application]</strong>. Avoid clickbait language and ensure standard acronyms (e.g., IoT, AI, CNN) are capitalized accurately.
        </p>
      </div>
    </div>
  );
};
