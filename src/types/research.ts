export interface TitleCandidate {
  title: string;
  style: 'Empirical' | 'Problem-Solution' | 'Interrogative' | 'Technical' | 'Comprehensive' | 'Comparative';
  rationale: string;
  targetVenueType?: string;
}

export interface AbstractBreakdown {
  background: string;
  problemStatement: string;
  objective: string;
  methodology: string;
  expectedFindings: string;
  significance: string;
}

export interface AbstractData {
  text: string;
  wordCount: number;
  breakdown: AbstractBreakdown;
}

export interface KeywordsData {
  primaryKeywords: string[];
  secondaryTaxonomyTerms: string[];
  booleanSearchString: string;
  booleanSearchQueries?: {
    googleScholar?: string;
    ieeeXploreOrPubMed?: string;
    scopusOrWebOfScience?: string;
  };
}

export interface LiteratureReviewCluster {
  thematicArea: string;
  keyConcepts: string[];
  criticalDiscussion: string;
  gapAddressed: string;
}

export interface OutlineData {
  backgroundHook: string;
  contextualBackground: string;
  identifiedResearchGap: string;
  researchQuestions: string[];
  hypothesesOrAims: string[];
  theoreticalFramework: string;
  literatureReviewClusters: LiteratureReviewCluster[];
}

export interface SampleOrDataset {
  targetPopulationOrDataset: string;
  sampleSizeOrVolume: string;
  samplingStrategyOrSelectionCriteria: string;
}

export interface MethodologyData {
  recommendedParadigm: string;
  rationale: string;
  researchDesign: string;
  dataCollectionProtocol: string;
  sampleOrDataset: SampleOrDataset;
  instrumentationAndTools: string[];
  stepByStepProcedure: string[];
  analysisPlan: string;
  threatsToValidity: string[];
  ethicalConsiderations: string;
}

export interface StructuredPaperData {
  recommendedTitle: string;
  abstract: string;
  introduction: string;
  literatureReview: string;
  methodology: string;
  resultsAndDiscussion: string;
  limitations: string;
  conclusionAndFutureWork: string;
}

export interface CitationItem {
  citationKey: string;
  title: string;
  authors: string;
  year: string;
  sourceType: 'Journal Article' | 'Conference Paper' | 'Book Chapter' | 'Standard / Benchmark';
  apa7: string;
  ieee: string;
  verificationStatus: string;
  verificationGuidance: string;
  scholarQueryUrl: string;
}

export interface ComprehensiveResearchDossier {
  topic: string;
  academicLevel?: string;
  researchField?: string;
  methodologyPreference?: string;
  titles: TitleCandidate[];
  abstract: AbstractData;
  keywords: KeywordsData;
  introductionAndOutline: OutlineData;
  methodology: MethodologyData;
  structuredPaper: StructuredPaperData;
  citations: CitationItem[];
}
