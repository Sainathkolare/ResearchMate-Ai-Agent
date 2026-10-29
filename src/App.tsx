/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { TopicHero } from './components/TopicHero';
import { TabNavigation, TabKey } from './components/TabNavigation';
import { TitlesTab } from './components/TitlesTab';
import { AbstractTab } from './components/AbstractTab';
import { OutlineTab } from './components/OutlineTab';
import { MethodologyTab } from './components/MethodologyTab';
import { FullPaperTab } from './components/FullPaperTab';
import { KeywordsTab } from './components/KeywordsTab';
import { CitationsTab } from './components/CitationsTab';
import { RefineModal } from './components/RefineModal';
import { VerificationPolicyModal } from './components/VerificationPolicyModal';
import { Toast, ToastMessage } from './components/Toast';
import { ComprehensiveResearchDossier } from './types/research';
import { AI_HEALTHCARE_SAMPLE, SMART_WASTE_SAMPLE } from './data/initialSamples';
import { Sparkles, AlertCircle, ArrowUpRight, GraduationCap } from 'lucide-react';

async function parseSafeJsonResponse(response: Response) {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await response.text();
    if (response.status === 502 || text.includes('502')) {
      throw new Error('API gateway returned HTTP 502. The backend request timed out. Please try again.');
    }
    throw new Error(`Expected JSON but server returned HTTP ${response.status} (${contentType || 'HTML/Text'}).`);
  }
  return await response.json();
}

export default function App() {
  const abortControllerRef = useRef<AbortController | null>(null);

  // Main research dossier state, preloaded with Example 1
  const [dossier, setDossier] = useState<ComprehensiveResearchDossier>(AI_HEALTHCARE_SAMPLE);
  const [topic, setTopic] = useState<string>(AI_HEALTHCARE_SAMPLE.topic);
  const [academicLevel, setAcademicLevel] = useState<string>('Graduate / Master’s Thesis');
  const [researchField, setResearchField] = useState<string>('Biomedical Informatics & Medicine');
  const [methodologyPreference, setMethodologyPreference] = useState<string>('Empirical Experimental & Benchmark');
  const [specificFocus, setSpecificFocus] = useState<string>('');

  // Active UI states
  const [activeTab, setActiveTab] = useState<TabKey>('abstract');
  const [activeTitle, setActiveTitle] = useState<string>(AI_HEALTHCARE_SAMPLE.structuredPaper.recommendedTitle);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Modals and notifications
  const [isPolicyOpen, setIsPolicyOpen] = useState<boolean>(false);
  const [refineModalData, setRefineModalData] = useState<{
    isOpen: boolean;
    initialText: string;
    sectionTitle: string;
  }>({
    isOpen: false,
    initialText: '',
    sectionTitle: '',
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Copy to clipboard helper
  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addToast('success', `Copied ${label} to clipboard!`);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      addToast('success', `Copied ${label} to clipboard!`);
    }
  };

  // Download TXT helper
  const handleDownloadTxt = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast('success', `Downloaded ${filename}`);
  };

  // Download Markdown helper
  const handleDownloadMd = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast('success', `Downloaded ${filename}`);
  };

  // Print helper
  const handlePrint = () => {
    window.print();
  };

  // Select Preset Samples
  const handleSelectPreset = (
    presetTopic: string,
    field: string,
    methodology: string
  ) => {
    setTopic(presetTopic);
    setResearchField(field);
    setMethodologyPreference(methodology);

    if (presetTopic === 'Artificial Intelligence in Healthcare') {
      setDossier(AI_HEALTHCARE_SAMPLE);
      setActiveTitle(AI_HEALTHCARE_SAMPLE.structuredPaper.recommendedTitle);
      addToast('info', 'Loaded Example 1: Artificial Intelligence in Healthcare');
    } else if (presetTopic === 'Smart Waste Management Using IoT') {
      setDossier(SMART_WASTE_SAMPLE);
      setActiveTitle(SMART_WASTE_SAMPLE.structuredPaper.recommendedTitle);
      addToast('info', 'Loaded Example 2: Smart Waste Management Using IoT');
    } else {
      // Trigger API generation
      handleGenerateAll(presetTopic, field, methodology);
    }
  };

  const handleCancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    addToast('info', 'Generation cancelled by user.');
  };

  // Primary API Generation Call with strict timeout and validation
  const handleGenerateAll = async (
    customTopic?: string,
    customField?: string,
    customMethodology?: string
  ) => {
    const targetTopic = customTopic || topic;
    if (!targetTopic.trim()) {
      addToast('error', 'Please enter a valid research topic.');
      return;
    }

    // Abort previous in-flight request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // 20 second client-side safety timeout
    const timeoutTimer = setTimeout(() => {
      controller.abort();
    }, 20000);

    setIsLoading(true);
    setError(null);
    addToast('info', `Synthesizing research paper suite for "${targetTopic}"...`);

    try {
      const response = await fetch('/api/research/generate-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          topic: targetTopic,
          academicLevel,
          researchField: customField || researchField,
          methodologyPreference: customMethodology || methodologyPreference,
          specificFocus,
        }),
      });

      const resJson = await parseSafeJsonResponse(response);
      if (!response.ok || !resJson.success) {
        throw new Error(resJson.error || 'Failed to generate research paper suite.');
      }

      if (resJson.data) {
        setDossier(resJson.data);
        if (resJson.data.structuredPaper?.recommendedTitle) {
          setActiveTitle(resJson.data.structuredPaper.recommendedTitle);
        } else if (resJson.data.titles?.[0]?.title) {
          setActiveTitle(resJson.data.titles[0].title);
        }
      }

      const notice = resJson.meta?.notice;
      if (notice) {
        addToast('success', `Generated: ${notice}`);
      } else {
        addToast('success', 'Research paper suite generated successfully!');
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        const msg = 'Request timed out after 20s or was cancelled. Safe fallback ready.';
        setError(msg);
        addToast('error', msg);
      } else {
        console.error('Generation error:', err);
        const msg = err.message || 'An error occurred during generation.';
        setError(msg);
        addToast('error', msg);
      }
    } finally {
      clearTimeout(timeoutTimer);
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  // Generate more titles
  const handleRegenerateTitles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/research/generate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionType: 'titles',
          topic,
          context: researchField,
        }),
      });
      const resJson = await parseSafeJsonResponse(response);
      if (resJson.success && resJson.data.titles) {
        setDossier((prev) => ({
          ...prev,
          titles: [...resJson.data.titles, ...prev.titles].slice(0, 8),
        }));
        addToast('success', 'Generated new title options!');
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to generate more titles.');
    } finally {
      setIsLoading(false);
    }
  };

  // Open Refine Modal for any section
  const handleOpenRefine = (initialText: string, sectionTitle: string) => {
    setRefineModalData({
      isOpen: true,
      initialText,
      sectionTitle,
    });
  };

  // Apply Refined Text
  const handleApplyRefinedText = (newText: string) => {
    const { sectionTitle } = refineModalData;
    if (sectionTitle.includes('Abstract')) {
      const words = newText.trim().split(/\s+/).filter(Boolean).length;
      setDossier((prev) => ({
        ...prev,
        abstract: {
          ...prev.abstract,
          text: newText,
          wordCount: words,
        },
        structuredPaper: {
          ...prev.structuredPaper,
          abstract: newText,
        },
      }));
      addToast('success', 'Applied refined abstract!');
    } else if (sectionTitle.includes('Introduction')) {
      setDossier((prev) => ({
        ...prev,
        structuredPaper: {
          ...prev.structuredPaper,
          introduction: newText,
        },
      }));
      addToast('success', 'Updated introduction with refined version!');
    } else if (sectionTitle.includes('Literature')) {
      setDossier((prev) => ({
        ...prev,
        structuredPaper: {
          ...prev.structuredPaper,
          literatureReview: newText,
        },
      }));
      addToast('success', 'Updated literature review!');
    } else if (sectionTitle.includes('Methodology')) {
      setDossier((prev) => ({
        ...prev,
        structuredPaper: {
          ...prev.structuredPaper,
          methodology: newText,
        },
      }));
      addToast('success', 'Updated methodology section!');
    } else if (sectionTitle.includes('Results')) {
      setDossier((prev) => ({
        ...prev,
        structuredPaper: {
          ...prev.structuredPaper,
          resultsAndDiscussion: newText,
        },
      }));
      addToast('success', 'Updated results and discussion!');
    } else if (sectionTitle.includes('Conclusion')) {
      setDossier((prev) => ({
        ...prev,
        structuredPaper: {
          ...prev.structuredPaper,
          conclusionAndFutureWork: newText,
        },
      }));
      addToast('success', 'Updated conclusion section!');
    }
  };

  // Copy full paper compilation
  const handleCopyAllPaper = () => {
    let out = `${dossier.structuredPaper.recommendedTitle.toUpperCase()}\n\n`;
    out += `ABSTRACT\n${dossier.abstract.text}\n\n`;
    out += `KEYWORDS: ${dossier.keywords.primaryKeywords.join('; ')}\n\n`;
    out += `${dossier.structuredPaper.introduction}\n\n`;
    out += `${dossier.structuredPaper.literatureReview}\n\n`;
    out += `${dossier.structuredPaper.methodology}\n\n`;
    out += `${dossier.structuredPaper.resultsAndDiscussion}\n\n`;
    out += `${dossier.structuredPaper.limitations}\n\n`;
    out += `${dossier.structuredPaper.conclusionAndFutureWork}\n\n`;
    out += `REFERENCES (Verification Required):\n`;
    dossier.citations.forEach((c, i) => {
      out += `[${i + 1}] ${c.ieee} (APA: ${c.apa7})\n`;
    });
    handleCopy(out, 'Complete Research Dossier');
  };

  const handleDownloadFullPaperTxt = () => {
    let out = `RESEARCHMATE AI – ACADEMIC RESEARCH DOSSIER\n`;
    out += `TOPIC: ${dossier.topic}\n`;
    out += `============================================================\n\n`;
    out += `TITLE: ${activeTitle}\n\n`;
    out += `ABSTRACT (${dossier.abstract.wordCount} words):\n${dossier.abstract.text}\n\n`;
    out += `KEYWORDS:\n${dossier.keywords.primaryKeywords.join(', ')}\n\n`;
    out += `BOOLEAN SEARCH STRING:\n${dossier.keywords.booleanSearchString}\n\n`;
    out += `============================================================\n`;
    out += `FULL STRUCTURED PAPER DRAFT\n`;
    out += `============================================================\n\n`;
    out += `${dossier.structuredPaper.introduction}\n\n`;
    out += `${dossier.structuredPaper.literatureReview}\n\n`;
    out += `${dossier.structuredPaper.methodology}\n\n`;
    out += `${dossier.structuredPaper.resultsAndDiscussion}\n\n`;
    out += `${dossier.structuredPaper.limitations}\n\n`;
    out += `${dossier.structuredPaper.conclusionAndFutureWork}\n\n`;
    out += `============================================================\n`;
    out += `REFERENCES & CITATIONS (APA 7th & IEEE Format):\n`;
    dossier.citations.forEach((c, i) => {
      out += `[${i + 1}] IEEE: ${c.ieee}\n`;
      out += `    APA 7: ${c.apa7}\n`;
      out += `    Verification Status: ${c.verificationStatus}\n`;
      out += `    Guidance: ${c.verificationGuidance}\n\n`;
    });

    handleDownloadTxt(
      out,
      `${dossier.topic.slice(0, 25).trim().toLowerCase().replace(/[^a-z0-9]/g, '_')}_research_dossier.txt`
    );
  };

  const handleDownloadFullPaperMd = () => {
    let md = `# ${activeTitle}\n\n`;
    md += `**Topic:** ${dossier.topic}  \n`;
    md += `**Academic Level:** ${academicLevel}  \n`;
    md += `**Generated with:** ResearchMate AI  \n\n`;
    md += `## Abstract\n${dossier.abstract.text}\n\n`;
    md += `**Keywords:** ${dossier.keywords.primaryKeywords.join(', ')}\n\n`;
    md += `---\n\n`;
    md += `${dossier.structuredPaper.introduction}\n\n`;
    md += `${dossier.structuredPaper.literatureReview}\n\n`;
    md += `${dossier.structuredPaper.methodology}\n\n`;
    md += `${dossier.structuredPaper.resultsAndDiscussion}\n\n`;
    md += `${dossier.structuredPaper.limitations}\n\n`;
    md += `${dossier.structuredPaper.conclusionAndFutureWork}\n\n`;
    md += `## References\n\n`;
    dossier.citations.forEach((c, i) => {
      md += `${i + 1}. ${c.apa7} *[${c.verificationStatus}]*\n`;
    });

    handleDownloadMd(
      md,
      `${dossier.topic.slice(0, 25).trim().toLowerCase().replace(/[^a-z0-9]/g, '_')}_paper.md`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenPolicyModal={() => setIsPolicyOpen(true)}
        onDownloadTxt={handleDownloadFullPaperTxt}
        onDownloadMd={handleDownloadFullPaperMd}
        onPrint={handlePrint}
        onCopyAll={handleCopyAllPaper}
        onSelectSample={(type) => {
          if (type === 'ai-healthcare') {
            handleSelectPreset(
              'Artificial Intelligence in Healthcare',
              'Biomedical Informatics & Medicine',
              'Empirical Experimental & Benchmark'
            );
          } else {
            handleSelectPreset(
              'Smart Waste Management Using IoT',
              'Internet of Things & Environmental Engineering',
              'Experimental Prototyping & Algorithmic Route Optimization'
            );
          }
        }}
        activeTopic={dossier.topic}
      />

      {/* Hero Section with Topic Search & Presets */}
      <TopicHero
        topic={topic}
        setTopic={setTopic}
        academicLevel={academicLevel}
        setAcademicLevel={setAcademicLevel}
        researchField={researchField}
        setResearchField={setResearchField}
        methodologyPreference={methodologyPreference}
        setMethodologyPreference={setMethodologyPreference}
        specificFocus={specificFocus}
        setSpecificFocus={setSpecificFocus}
        onGenerateAll={() => handleGenerateAll()}
        onCancelGeneration={handleCancelGeneration}
        isLoading={isLoading}
        onSelectPreset={handleSelectPreset}
      />

      {/* Global Error Banner */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-xs sm:text-sm text-rose-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-600 hover:text-rose-900 font-semibold"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        titleCount={dossier.titles.length}
        abstractWordCount={dossier.abstract.wordCount}
        citationCount={dossier.citations.length}
        keywordCount={dossier.keywords.primaryKeywords.length}
      />

      {/* Tab Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'titles' && (
          <TitlesTab
            titles={dossier.titles}
            activeTitle={activeTitle}
            onSelectTitle={(t) => {
              setActiveTitle(t);
              setDossier((prev) => ({
                ...prev,
                structuredPaper: {
                  ...prev.structuredPaper,
                  recommendedTitle: t,
                },
              }));
              addToast('success', `Selected active paper title: "${t}"`);
            }}
            onCopy={handleCopy}
            onRegenerateTitles={handleRegenerateTitles}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'abstract' && (
          <AbstractTab
            abstractData={dossier.abstract}
            onCopy={handleCopy}
            onDownloadTxt={handleDownloadTxt}
            onOpenRefine={handleOpenRefine}
            onRegenerateAbstract={() => {
              handleGenerateAll();
            }}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'outline' && (
          <OutlineTab
            outlineData={dossier.introductionAndOutline}
            onCopy={handleCopy}
            onDownloadTxt={handleDownloadTxt}
            onOpenRefine={handleOpenRefine}
          />
        )}

        {activeTab === 'methodology' && (
          <MethodologyTab
            methodologyData={dossier.methodology}
            onCopy={handleCopy}
            onDownloadTxt={handleDownloadTxt}
            onOpenRefine={handleOpenRefine}
          />
        )}

        {activeTab === 'paper' && (
          <FullPaperTab
            paperData={{
              ...dossier.structuredPaper,
              recommendedTitle: activeTitle,
            }}
            citations={dossier.citations}
            keywords={dossier.keywords}
            onCopy={handleCopy}
            onDownloadTxt={handleDownloadTxt}
            onDownloadMd={handleDownloadMd}
            onPrint={handlePrint}
            onOpenRefine={handleOpenRefine}
          />
        )}

        {activeTab === 'keywords' && (
          <KeywordsTab
            keywordsData={dossier.keywords}
            onCopy={handleCopy}
            onDownloadTxt={handleDownloadTxt}
          />
        )}

        {activeTab === 'citations' && (
          <CitationsTab
            citations={dossier.citations}
            onCopy={handleCopy}
            onDownloadTxt={handleDownloadTxt}
            onOpenPolicyModal={() => setIsPolicyOpen(true)}
          />
        )}
      </main>

      {/* Scholarly Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-slate-700">ResearchMate AI – Academic Paper Assistant</span>
            <span>•</span>
            <span>Adheres to IEEE & APA 7th Bibliographic Standards</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPolicyOpen(true)}
              className="text-slate-600 hover:text-indigo-600 transition-colors font-medium"
            >
              Anti-Hallucination & Citation Policy
            </button>
            <span>•</span>
            <span className="text-slate-400">Powered by Gemini 3.8 Flash</span>
          </div>
        </div>
      </footer>

      {/* Refine / Polish Modal */}
      <RefineModal
        isOpen={refineModalData.isOpen}
        onClose={() => setRefineModalData((prev) => ({ ...prev, isOpen: false }))}
        initialText={refineModalData.initialText}
        sectionTitle={refineModalData.sectionTitle}
        onApplyRefinedText={handleApplyRefinedText}
      />

      {/* Verification Policy Modal */}
      <VerificationPolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
