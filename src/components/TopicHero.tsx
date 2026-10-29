import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Loader2,
  BookOpen,
  Layers,
  Settings2,
  ChevronDown,
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface TopicHeroProps {
  topic: string;
  setTopic: (t: string) => void;
  academicLevel: string;
  setAcademicLevel: (l: string) => void;
  researchField: string;
  setResearchField: (f: string) => void;
  methodologyPreference: string;
  setMethodologyPreference: (m: string) => void;
  specificFocus: string;
  setSpecificFocus: (f: string) => void;
  onGenerateAll: () => void;
  onCancelGeneration?: () => void;
  isLoading: boolean;
  onSelectPreset: (presetTopic: string, field: string, methodology: string) => void;
}

export const TopicHero: React.FC<TopicHeroProps> = ({
  topic,
  setTopic,
  academicLevel,
  setAcademicLevel,
  researchField,
  setResearchField,
  methodologyPreference,
  setMethodologyPreference,
  specificFocus,
  setSpecificFocus,
  onGenerateAll,
  onCancelGeneration,
  isLoading,
  onSelectPreset,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const presets = [
    {
      title: 'Artificial Intelligence in Healthcare',
      tag: 'Example 1',
      field: 'Biomedical Informatics & Computer Science',
      methodology: 'Empirical Multi-Center Benchmark & Usability Study',
      popular: true,
    },
    {
      title: 'Smart Waste Management Using IoT',
      tag: 'Example 2',
      field: 'Internet of Things & Environmental Engineering',
      methodology: 'Experimental Prototyping & Algorithmic Route Optimization',
      popular: true,
    },
    {
      title: 'Autonomous Drone Navigation in GPS-Denied Environments',
      tag: 'Robotics',
      field: 'Robotics & Control Systems',
      methodology: 'Visual-Inertial SLAM & Experimental Simulation',
      popular: false,
    },
    {
      title: 'Microplastics Accumulation in Coastal Marine Ecosystems',
      tag: 'Environment',
      field: 'Marine Biology & Environmental Science',
      methodology: 'Quantitative Field Sampling & Spectroscopic Analysis',
      popular: false,
    },
    {
      title: 'CRISPR-Cas9 Gene Editing: Therapeutic Potential and Bioethical Governance',
      tag: 'Genomics',
      field: 'Molecular Genetics & Bioethics',
      methodology: 'Systematic Scoping Review & Regulatory Analysis',
      popular: false,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onGenerateAll();
    }
  };

  return (
    <div className="bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900 text-white pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b border-indigo-900/50 shadow-md relative overflow-hidden no-print">
      {/* Subtle academic background grid decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Banner badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Graduate-Grade Academic Paper Suite Generator</span>
          <span className="w-1 h-1 rounded-full bg-indigo-400" />
          <span className="text-slate-300">Strict Anti-Hallucination Citations</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 font-academic">
          Architect Rigorous Academic Research Papers with AI
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-6 font-normal">
          From precise 150–250 word abstracts and thematic literature reviews to empirical methodologies and IEEE/APA citations—prepare publication-ready paper drafts faster.
        </p>

        {/* Topic Input Box Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex flex-col sm:flex-row items-stretch bg-white rounded-2xl p-1.5 shadow-xl border border-slate-200">
            <div className="relative flex-1 flex items-center pl-4 pr-2">
              <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your research topic (e.g., Artificial Intelligence in Healthcare)..."
                className="w-full py-3 text-slate-900 placeholder:text-slate-400 font-medium text-sm sm:text-base focus:outline-hidden"
              />
              {topic && (
                <button
                  type="button"
                  onClick={() => setTopic('')}
                  className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2 sm:mt-0 p-1">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
                title="Configure Academic Level, Discipline & Methodology"
              >
                <Settings2 className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Options</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </button>

              {isLoading && onCancelGeneration && (
                <button
                  type="button"
                  onClick={onCancelGeneration}
                  className="px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                  title="Cancel generation"
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading || !topic.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm shadow-md transition-all disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Suite</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Advanced Configuration Accordion */}
          {showAdvanced && (
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in slide-in-from-top-2">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Academic Level
                </label>
                <select
                  value={academicLevel}
                  onChange={(e) => setAcademicLevel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Undergraduate Capstone">Undergraduate Capstone / Senior Thesis</option>
                  <option value="Graduate / Master’s Thesis">Graduate / Master’s Thesis</option>
                  <option value="Doctoral / Peer-Reviewed Manuscript">Doctoral / Peer-Reviewed Manuscript</option>
                  <option value="IEEE / ACM Conference Paper">IEEE / ACM Conference Paper</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Research Discipline
                </label>
                <select
                  value={researchField}
                  onChange={(e) => setResearchField(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Computer Science & AI">Computer Science & Artificial Intelligence</option>
                  <option value="Biomedical Informatics & Medicine">Biomedical Informatics & Medicine</option>
                  <option value="Internet of Things & Environmental Engineering">IoT & Environmental Engineering</option>
                  <option value="Robotics & Autonomous Systems">Robotics & Autonomous Systems</option>
                  <option value="Social Sciences & Behavioral Economics">Social Sciences & Behavioral Economics</option>
                  <option value="Interdisciplinary">Interdisciplinary Applied Sciences</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Methodology Preference
                </label>
                <select
                  value={methodologyPreference}
                  onChange={(e) => setMethodologyPreference(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Empirical Experimental & Benchmark">Empirical Experimental & Benchmark</option>
                  <option value="Mixed-Methods (Quantitative & Qualitative)">Mixed-Methods (Quantitative & Qualitative)</option>
                  <option value="Algorithmic Simulation & Optimization">Algorithmic Simulation & Optimization</option>
                  <option value="Survey-Based Cross-Sectional">Survey-Based Cross-Sectional</option>
                  <option value="Systematic Literature Review (PRISMA)">Systematic Literature Review (PRISMA)</option>
                </select>
              </div>
            </div>
          )}

          {/* Quick preset chips */}
          <div className="pt-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-slate-300">Try Standard Benchmark Topics:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectPreset(preset.title, preset.field, preset.methodology)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    topic === preset.title
                      ? 'bg-indigo-500 text-white font-semibold ring-2 ring-indigo-300/40 shadow-sm'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
                  }`}
                >
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                    preset.popular ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {preset.tag}
                  </span>
                  <span>{preset.title}</span>
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
