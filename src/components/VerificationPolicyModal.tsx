import React from 'react';
import { ShieldCheck, AlertTriangle, ExternalLink, BookOpen, X, CheckCircle } from 'lucide-react';

interface VerificationPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationPolicyModal: React.FC<VerificationPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-200" />
            <div>
              <h3 className="font-semibold text-lg">Academic Citation & Anti-Hallucination Policy</h3>
              <p className="text-xs text-amber-100">Zero Fabricated References Commitment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-sm text-slate-600 leading-relaxed">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-amber-900 text-xs sm:text-sm">
              <strong className="font-semibold block text-amber-950 mb-1">
                Core Requirement: Never Invent Research References
              </strong>
              Generative AI systems frequently fabricate non-existent authors, imaginary volume numbers, and broken DOIs (hallucinations). ResearchMate AI adheres to strict academic ethics: citations are drawn from landmark canonical literature, benchmark datasets, or explicitly tagged with verification alerts.
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 text-base mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              How ResearchMate Manages Citations
            </h4>
            <ul className="space-y-2.5 text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Verification Badges:</strong> Every generated reference displays a prominent tag indicating whether it is a foundational benchmark requiring confirmation of volume/page numbers or a conceptual representative work.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>One-Click Library & Scholar Verification:</strong> Each citation provides an instant Google Scholar query button so students can verify the published version, exact author spellings, and official DOI with a single click.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Dual IEEE & APA 7th Standard Formatting:</strong> Switch seamlessly between engineering standard (IEEE numerical bracket style) and social/health sciences standard (APA 7th author-date style).
                </span>
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <h4 className="font-semibold text-slate-800 text-sm mb-2">Student & Researcher Best Practices:</h4>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-600 text-xs">
              <li>Always check the digital object identifier (DOI) at <code>doi.org</code> before final paper submission.</li>
              <li>Confirm the paper's main findings by downloading the actual PDF through your university library, IEEE Xplore, ACM Digital Library, or PubMed.</li>
              <li>Export citations into reference managers such as Zotero, Mendeley, or EndNote for citation graph validation.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium text-xs sm:text-sm hover:bg-slate-800 transition-colors shadow-xs"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
