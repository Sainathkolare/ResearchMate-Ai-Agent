import React from 'react';
import {
  BookOpen,
  FileText,
  ListTree,
  FlaskConical,
  FileCode,
  Tag,
  BookMarked
} from 'lucide-react';

export type TabKey = 'titles' | 'abstract' | 'outline' | 'methodology' | 'paper' | 'keywords' | 'citations';

interface TabNavigationProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  titleCount: number;
  abstractWordCount: number;
  citationCount: number;
  keywordCount: number;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  titleCount,
  abstractWordCount,
  citationCount,
  keywordCount,
}) => {
  const tabs = [
    {
      key: 'titles' as TabKey,
      label: 'Titles',
      icon: BookOpen,
      badge: titleCount > 0 ? `${titleCount}` : undefined,
    },
    {
      key: 'abstract' as TabKey,
      label: 'Abstract',
      icon: FileText,
      badge: `${abstractWordCount}w`,
      badgeHighlight: abstractWordCount >= 150 && abstractWordCount <= 250,
    },
    {
      key: 'outline' as TabKey,
      label: 'Intro & Outline',
      icon: ListTree,
    },
    {
      key: 'methodology' as TabKey,
      label: 'Methodology',
      icon: FlaskConical,
    },
    {
      key: 'paper' as TabKey,
      label: 'Structured Paper',
      icon: FileCode,
      badge: 'Full Draft',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      key: 'keywords' as TabKey,
      label: 'Keywords & Boolean',
      icon: Tag,
      badge: keywordCount > 0 ? `${keywordCount}` : undefined,
    },
    {
      key: 'citations' as TabKey,
      label: 'Citations (APA/IEEE)',
      icon: BookMarked,
      badge: citationCount > 0 ? `${citationCount} verified` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800',
    },
  ];

  return (
    <div className="border-b border-slate-200 bg-white sticky top-16 z-30 shadow-2xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>

                {tab.badge && (
                  <span
                    className={`ml-1 px-2 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : tab.badgeColor || (tab.badgeHighlight ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700')
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
