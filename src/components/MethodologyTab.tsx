import React from 'react';
import { MethodologyData } from '../types/research';
import {
  FlaskConical,
  Copy,
  Download,
  Database,
  Wrench,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Sparkles
} from 'lucide-react';

interface MethodologyTabProps {
  methodologyData: MethodologyData;
  onCopy: (text: string, label: string) => void;
  onDownloadTxt: (content: string, filename: string) => void;
  onOpenRefine: (text: string, sectionTitle: string) => void;
}

export const MethodologyTab: React.FC<MethodologyTabProps> = ({
  methodologyData,
  onCopy,
  onDownloadTxt,
  onOpenRefine,
}) => {
  const formatMethodologyText = () => {
    let out = `RESEARCH METHODOLOGY BLUEPRINT\n\n`;
    out += `1. PARADIGM & RATIONALE:\nParadigm: ${methodologyData.recommendedParadigm}\nRationale: ${methodologyData.rationale}\n\n`;
    out += `2. RESEARCH DESIGN:\n${methodologyData.researchDesign}\n\n`;
    out += `3. DATA COLLECTION PROTOCOL:\n${methodologyData.dataCollectionProtocol}\n\n`;
    out += `4. SAMPLE / DATASET SPECIFICATIONS:\n`;
    out += `   Target Population/Dataset: ${methodologyData.sampleOrDataset.targetPopulationOrDataset}\n`;
    out += `   Volume / Sample Size: ${methodologyData.sampleOrDataset.sampleSizeOrVolume}\n`;
    out += `   Sampling Strategy: ${methodologyData.sampleOrDataset.samplingStrategyOrSelectionCriteria}\n\n`;
    out += `5. INSTRUMENTATION & TOOLS:\n${methodologyData.instrumentationAndTools.join(', ')}\n\n`;
    out += `6. STEP-BY-STEP PROCEDURE:\n`;
    methodologyData.stepByStepProcedure.forEach((step, i) => {
      out += `   ${step}\n`;
    });
    out += `\n7. ANALYSIS PLAN:\n${methodologyData.analysisPlan}\n\n`;
    out += `8. THREATS TO VALIDITY:\n`;
    methodologyData.threatsToValidity.forEach((tv, i) => {
      out += `   - ${tv}\n`;
    });
    out += `\n9. ETHICAL CONSIDERATIONS:\n${methodologyData.ethicalConsiderations}\n`;
    return out;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-academic flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-indigo-600" />
            Research Methodology Blueprint
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Reproducible research design, instrumentation, data pipelines, and validity safeguards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenRefine(formatMethodologyText(), 'Methodology Blueprint')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Refine Methodology
          </button>
          <button
            onClick={() => onCopy(formatMethodologyText(), 'Methodology')}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            title="Copy methodology text"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDownloadTxt(formatMethodologyText(), 'methodology.txt')}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            title="Download methodology as TXT"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recommended Paradigm & Research Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
            Recommended Paradigm
          </span>
          <h3 className="text-base font-bold text-slate-900 font-academic mb-2">
            {methodologyData.recommendedParadigm}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-700 font-semibold">Methodological Rationale: </strong>
            {methodologyData.rationale}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Research Design Architecture
          </span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2 font-academic">
            {methodologyData.researchDesign}
          </p>
          <div className="mt-3 text-xs text-slate-500 border-t border-slate-100 pt-2.5">
            <strong>Data Collection Protocol: </strong>
            {methodologyData.dataCollectionProtocol}
          </div>
        </div>
      </div>

      {/* Dataset / Sample Specifications & Instrumentation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dataset / Sample */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs md:col-span-2 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Database className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Target Cohort / Dataset Specifications</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-500 block mb-1">Target Repository / Population</span>
              <p className="text-slate-800 font-medium">{methodologyData.sampleOrDataset.targetPopulationOrDataset}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-500 block mb-1">Sample Size / Volume</span>
              <p className="text-slate-800 font-medium">{methodologyData.sampleOrDataset.sampleSizeOrVolume}</p>
            </div>
          </div>

          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs text-slate-700">
            <strong className="text-indigo-900 font-semibold block mb-0.5">Sampling Strategy & Selection Criteria:</strong>
            {methodologyData.sampleOrDataset.samplingStrategyOrSelectionCriteria}
          </div>
        </div>

        {/* Instrumentation / Software */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Wrench className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Instrumentation & Tools</h3>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {methodologyData.instrumentationAndTools.map((tool, idx) => (
              <span
                key={idx}
                className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/60"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Step-by-Step Procedural Execution Pipeline */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Workflow className="w-4 h-4 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-sm">Execution Protocol & Reproducibility Pipeline</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {methodologyData.stepByStepProcedure.map((step, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs text-slate-700 relative hover:border-indigo-200 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-semibold text-slate-900">Phase {idx + 1}</span>
              </div>
              <p className="leading-relaxed">{step}</p>
            </div>
          ))}
        </div>

        {/* Statistical Analysis Plan */}
        <div className="mt-4 p-4 bg-slate-100/70 rounded-xl border border-slate-200 text-xs text-slate-700">
          <strong className="text-slate-900 block font-semibold mb-1">Analytical & Statistical Evaluation Pipeline:</strong>
          {methodologyData.analysisPlan}
        </div>
      </div>

      {/* Threats to Validity & Ethics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Threats to Internal & External Validity
          </div>
          <ul className="space-y-2 text-xs text-amber-950">
            {methodologyData.threatsToValidity.map((tv, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{tv}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Ethical Governance & IRB Protocol
          </div>
          <p className="text-xs text-emerald-950 leading-relaxed font-academic">
            {methodologyData.ethicalConsiderations}
          </p>
          <div className="mt-3 text-[11px] text-emerald-800 font-medium">
            Complies with Belmont Report ethical standards, participant anonymity, and data governance regulations.
          </div>
        </div>
      </div>
    </div>
  );
};
