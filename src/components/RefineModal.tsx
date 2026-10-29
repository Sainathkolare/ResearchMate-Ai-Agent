import React, { useState } from 'react';
import { Sparkles, X, Loader2, ArrowRight, Check, RefreshCw } from 'lucide-react';

interface RefineModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText: string;
  sectionTitle: string;
  onApplyRefinedText: (newText: string) => void;
}

export const RefineModal: React.FC<RefineModalProps> = ({
  isOpen,
  onClose,
  initialText,
  sectionTitle,
  onApplyRefinedText,
}) => {
  const [instruction, setInstruction] = useState('');
  const [targetTone, setTargetTone] = useState('Rigorous Academic');
  const [loading, setLoading] = useState(false);
  const [refinedText, setRefinedText] = useState('');
  const [summaryOfChanges, setSummaryOfChanges] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickInstructions = [
    'Make more concise and punchy',
    'Elevate academic vocabulary and scholarly tone',
    'Focus more on empirical methodology and data metrics',
    'Structure clearly into numbered sub-points',
    'Strengthen the statement of research gap and novel contributions'
  ];

  const handleRefine = async () => {
    if (!instruction.trim()) return;
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutTimer = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch('/api/research/refine-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          text: initialText,
          instruction,
          targetTone,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Server returned non-JSON (${response.status}): ${text.slice(0, 100)}`);
      }

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to refine text.');
      }

      setRefinedText(resData.data.refinedText);
      setSummaryOfChanges(resData.data.summaryOfChanges || 'Refined according to instructions.');
    } catch (err: any) {
      console.error(err);
      if (err.name === 'AbortError') {
        setError('Refinement request timed out. Please try again.');
      } else {
        setError(err.message || 'An error occurred during refinement.');
      }
    } finally {
      clearTimeout(timeoutTimer);
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (refinedText) {
      onApplyRefinedText(refinedText);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold text-lg">AI Assistant – Polish & Refine: {sectionTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Quick instructions */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Refinement Goal
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {quickInstructions.map((qi, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInstruction(qi)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-colors text-slate-700"
                >
                  {qi}
                </button>
              ))}
            </div>
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="e.g. Ensure the abstract highlights the quantitative AUROC findings and fits precisely within 200 words..."
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Target Tone
              </label>
              <select
                value={targetTone}
                onChange={(e) => setTargetTone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Rigorous Academic">Rigorous Academic (Standard Peer-Review)</option>
                <option value="Concise Technical">Concise Technical (IEEE Style)</option>
                <option value="Methodologically Dense">Methodologically Dense (Experimental)</option>
                <option value="Undergraduate Capstone">Undergraduate Capstone (Accessible Rigor)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleRefine}
                disabled={loading || !instruction.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Polishing with Gemini...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Generate Refinement
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
              {error}
            </div>
          )}

          {/* Comparison View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
                <span>Original Content</span>
                <span>{initialText.trim().split(/\s+/).filter(Boolean).length} words</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 max-h-56 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                {initialText}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-indigo-700 mb-1.5">
                <span>Refined Version</span>
                {refinedText && (
                  <span>{refinedText.trim().split(/\s+/).filter(Boolean).length} words</span>
                )}
              </div>
              <div className="p-3 bg-indigo-50/50 border border-indigo-200 rounded-xl text-xs text-slate-800 max-h-56 overflow-y-auto leading-relaxed whitespace-pre-wrap min-h-24">
                {refinedText ? (
                  refinedText
                ) : (
                  <span className="text-slate-400 italic">
                    The refined version will appear here after clicking "Generate Refinement".
                  </span>
                )}
              </div>
            </div>
          </div>

          {summaryOfChanges && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Changes Applied:</strong> {summaryOfChanges}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={handleApply}
            disabled={!refinedText}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-lg font-medium text-xs sm:text-sm hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs"
          >
            Apply Refined Version
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
