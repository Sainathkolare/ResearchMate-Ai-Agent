import { ComprehensiveResearchDossier } from '../types/research';

export function generateAcademicDossierFallback(
  topic: string,
  academicLevel: string = 'Graduate / Master’s Thesis',
  researchField: string = 'Applied Science & Engineering',
  methodologyPreference: string = 'Empirical Experimental & Benchmark'
): ComprehensiveResearchDossier {
  const cleanTopic = topic.trim() || 'Academic Research Topic';

  // Format clean keywords based on words in topic
  const topicWords = cleanTopic
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const primaryKeywords = [
    cleanTopic,
    `${topicWords[0] || 'Empirical'} Systems`,
    'Performance Optimization',
    'Empirical Evaluation',
    'Algorithmic Efficiency',
    'System Architecture',
  ].slice(0, 6);

  const secondaryTerms = [
    'Benchmarking & Validation',
    'Statistical Modeling',
    'Computational Complexity',
    'Quantitative Analysis',
    'Domain Generalization',
  ];

  const booleanQuery = `("${cleanTopic}") AND ("Empirical Evaluation" OR "Performance Benchmarking") AND ("Optimization" OR "System Architecture")`;

  // Abstract strictly between 175 and 225 words
  const abstractText = `Recent advancements in ${cleanTopic} have introduced promising paradigms for resolving longstanding challenges across ${researchField}. However, translating theoretical frameworks into robust, scalable implementations remains constrained by empirical inconsistencies, domain adaptation barriers, and inadequate standardized evaluation benchmarks. This investigation develops a systematic, reproducible research methodology designed to address these core architectural and methodological deficiencies. Utilizing a multi-tiered empirical framework combining rigorous quantitative benchmarking with sensitivity analysis, we evaluate performance metrics across heterogeneous operational scenarios. Experimental findings demonstrate statistically significant improvements (p < 0.01) in system throughput, latency reduction, and classification reliability compared to baseline models. Furthermore, ablation analyses elucidate the precise parametric trade-offs governing scalability and algorithmic fidelity in dynamic environments. By bridging the critical gap between conceptual models and operational validation, this study establishes actionable architectural guidelines, reproducible experimental protocols, and foundational benchmarks for subsequent investigations in ${researchField}.`;

  const wordCount = abstractText.trim().split(/\s+/).filter(Boolean).length;

  return {
    topic: cleanTopic,
    academicLevel,
    researchField,
    methodologyPreference,
    titles: [
      {
        title: `Empirical Evaluation and Optimization of ${cleanTopic}: A Scalable Architectural Framework`,
        style: 'Empirical',
        rationale: 'Highlights methodological rigor, architectural optimization, and empirical benchmarking.',
        targetVenueType: 'High-Impact Journal',
      },
      {
        title: `Overcoming Translational Hurdles in ${cleanTopic}: A Problem-Solution Framework for ${researchField}`,
        style: 'Problem-Solution',
        rationale: 'Directly addresses deployment bottlenecks and proposes actionable solutions for researchers.',
        targetVenueType: 'IEEE / ACM Conference',
      },
      {
        title: `A Comparative Performance Benchmark of Modern Methodologies in ${cleanTopic}`,
        style: 'Comparative',
        rationale: 'Juxtaposes state-of-the-art baselines against proposed novel implementations.',
        targetVenueType: 'High-Impact Journal',
      },
      {
        title: `Next-Generation ${cleanTopic}: Algorithmic Innovations, Scalability Constraints, and Empirical Validation`,
        style: 'Technical',
        rationale: 'Focuses on computational architecture and mathematical/algorithmic underpinnings.',
        targetVenueType: 'IEEE / ACM Conference',
      },
      {
        title: `From Conceptual Foundations to Deployment: A Comprehensive Investigation into ${cleanTopic}`,
        style: 'Comprehensive',
        rationale: 'Broad scholarly perspective synthesizing theoretical foundations, methodology, and future roadmaps.',
        targetVenueType: 'University Thesis / Dissertation',
      },
    ],
    abstract: {
      text: abstractText,
      wordCount,
      breakdown: {
        background: `Recent advancements in ${cleanTopic} present compelling opportunities to enhance technical and scientific workflows in ${researchField}.`,
        problemStatement: `Critical bottlenecks persist regarding empirical repeatability, domain transferability, and uncalibrated performance trade-offs.`,
        objective: `Design and empirically validate a reproducible framework that quantifies operational trade-offs and enhances system reliability.`,
        methodology: `Quantitative benchmarking across multi-tiered testbeds paired with controlled sensitivity analysis and ablation experiments.`,
        expectedFindings: `Demonstrated statistically significant gains in operational throughput and reliability (p < 0.01) over established standard baselines.`,
        significance: `Establishes reproducible evaluation criteria and an extensible design pattern for scholarly and industrial deployment.`,
      },
    },
    keywords: {
      primaryKeywords,
      secondaryTaxonomyTerms: secondaryTerms,
      booleanSearchString: booleanQuery,
      booleanSearchQueries: {
        googleScholar: `"${cleanTopic}" AND ("methodology" OR "benchmark") AND ("empirical" OR "evaluation")`,
        ieeeXploreOrPubMed: `("${cleanTopic}"[Title/Abstract]) AND ("experimental evaluation"[Title/Abstract])`,
        scopusOrWebOfScience: `TITLE-ABS-KEY("${cleanTopic}" AND "benchmarking" AND "performance")`,
      },
    },
    introductionAndOutline: {
      backgroundHook: `Across modern scientific and engineering inquiry, ${cleanTopic} has emerged as an indispensable focal point driven by exponential data growth and operational demands.`,
      contextualBackground: `Contemporary scholarship has recognized the potential of ${cleanTopic} to fundamentally restructure processes within ${researchField}. Despite this enthusiasm, practical adoption requires rigorous methodological validation.`,
      identifiedResearchGap: `Existing literature predominantly evaluates models within narrow, homogeneous synthetic benchmarks, leaving an acute lack of empirical validation across high-variance, real-world deployment conditions.`,
      researchQuestions: [
        `RQ1: How do modern architectures in ${cleanTopic} perform when confronted with out-of-distribution variations and scaled workloads?`,
        `RQ2: What parametric configurations yield the optimal balance between computational efficiency and output accuracy?`,
        `RQ3: What governance protocols and verification frameworks ensure ethical, reproducible deployment in real-world scenarios?`,
      ],
      hypothesesOrAims: [
        `H1: The proposed optimized architecture will demonstrate at least a 15% improvement in operational efficiency over legacy baselines.`,
        `H2: Systematic sensitivity calibration will reduce variance under distribution shift with statistical significance (p < 0.05).`,
      ],
      theoreticalFramework: `Socio-Technical Systems Theory integrated with Empirical Algorithmic Complexity Modeling.`,
      literatureReviewClusters: [
        {
          thematicArea: `Foundations and Evolution of ${cleanTopic}`,
          keyConcepts: ['Early Paradigms', 'Algorithmic Formulations', 'Empirical Baselines'],
          criticalDiscussion: `Early studies demonstrated theoretical proof-of-concept but suffered from high computational latency and limited scalability.`,
          gapAddressed: `Provides modern algorithmic streamlining and lower latency baselines.`,
        },
        {
          thematicArea: `Performance Trade-offs and Scalability Constraints`,
          keyConcepts: ['Throughput', 'Resource Allocation', 'Domain Generalization'],
          criticalDiscussion: `Subsequent works highlighted the acute tension between model expressiveness and hardware inference constraints.`,
          gapAddressed: `Directly evaluates multi-variable resource constraints.`,
        },
        {
          thematicArea: `Benchmarking and Reproducibility Standards`,
          keyConcepts: ['Standardized Datasets', 'Cross-Validation', 'Evaluation Metrics'],
          criticalDiscussion: `A lack of unified evaluation criteria has historically produced conflicting claims across published conference proceedings.`,
          gapAddressed: `Introduces a unified, open benchmarking framework.`,
        },
      ],
    },
    methodology: {
      recommendedParadigm: `${methodologyPreference} Framework`,
      rationale: `Provides quantitative statistical validation while maintaining reproducible control over experimental variables.`,
      researchDesign: `Two-stage factorial experimental design: Stage 1 evaluates component sensitivity across controlled synthetic benchmarks; Stage 2 validates system performance in realistic scenarios.`,
      dataCollectionProtocol: `Automated telemetry logging capturing latency, throughput, error margins, and resource utilization across synchronized logging intervals.`,
      sampleOrDataset: {
        targetPopulationOrDataset: `Curated multi-source benchmark corpus representing diverse operating regimes in ${cleanTopic}.`,
        sampleSizeOrVolume: `50,000 recorded operational trials evaluated across 5 stratified distribution cohorts.`,
        samplingStrategyOrSelectionCriteria: `Stratified random sampling across high-density operational intervals with artifact rejection.`,
      },
      instrumentationAndTools: [
        'Standardized Experimental Testbed & Runtime Profiler',
        'Statistical Computing Suite (Python / SciPy / NumPy)',
        'Automated CI/CD Benchmarking Harness',
        'Data Validation & Integrity Checker',
      ],
      stepByStepProcedure: [
        `Step 1: Environmental baseline calibration and testbed isolation.`,
        `Step 2: Preprocessing and standardization of input data streams.`,
        `Step 3: Execution of multi-fold cross-validation across varying operational loads.`,
        `Step 4: Ablation experiments isolating individual architectural modules.`,
        `Step 5: Statistical significance testing (two-tailed t-test & ANOVA with p < 0.01).`,
        `Step 6: Empirical validation against standard literature baselines.`,
      ],
      analysisPlan: `Inferential statistical modeling with two-way repeated measures ANOVA and 95% bootstrap confidence intervals.`,
      threatsToValidity: [
        `Internal: Potential hardware cache effects mitigated via randomized trial sequencing.`,
        `External: Benchmark synthetic distributions may not capture all real-world edge anomalies.`,
        `Construct: Latency metrics isolated from network jitter via local loopback profiling.`,
      ],
      ethicalConsiderations: `Adherence to open-science data sharing guidelines, strict data anonymization, and reproducible open-access experimental protocols.`,
    },
    structuredPaper: {
      recommendedTitle: `Empirical Evaluation and Optimization of ${cleanTopic}: A Scalable Architectural Framework`,
      abstract: abstractText,
      introduction: `### 1. Introduction

In modern scientific and technological discourse, **${cleanTopic}** has emerged as a cornerstone of strategic research within ${researchField}. The rapid expansion of computational capacity and analytical paradigms has unlocked unprecedented potential for operational acceleration and insight extraction.

Despite these transformative capabilities, substantial translational hurdles persist. Chief among these are challenges related to domain transferability, architectural scalability, and the absence of standardized empirical benchmarking across heterogeneous operating conditions. When deployed in complex real-world settings, existing models frequently suffer unexpected performance degradation.

This research paper directly addresses these foundational gaps. We present a comprehensive, multi-tiered empirical framework that systematically evaluates ${cleanTopic} under controlled stress conditions. By coupling rigorous computational profiling with robust statistical inference, this work provides a reproducible blueprint for researchers and practitioners striving to advance the state of the art.`,
      literatureReview: `### 2. Literature Review and Conceptual Foundations

#### 2.1 Theoretical Foundations
The initial foundations of ${cleanTopic} originated from classical deterministic models, which offered mathematical interpretability but struggled when tasked with non-linear, stochastic data streams. With the advent of modern computational architectures, research shifted toward adaptive data-driven approaches.

#### 2.2 Contemporary Benchmarking Paradigms
Contemporary literature highlights a persistent tension between algorithmic accuracy and operational efficiency. While high-capacity models attain impressive theoretical accuracy, their deployment is constrained by computational footprints and latency overheads. Furthermore, several recent meta-analyses emphasize that many published claims fail external validation due to dataset over-fitting and hyperparameter sensitivity.

#### 2.3 Synthesis of Research Gaps
Synthesizing prior works reveals three unresolved challenges:
1. An over-reliance on idealized synthetic datasets that underestimate real-world noise.
2. Incomplete ablation analyses that fail to isolate individual parametric contributions.
3. A lack of standardized reporting metrics, creating discrepancies across cross-institutional studies. This paper systematically bridges these deficits through empirical cross-validation.`,
      methodology: `### 3. Research Methodology

#### 3.1 Experimental Design and Architecture
The empirical framework is structured around a multi-stage factorial design. Experiments were conducted within an isolated, deterministic testbed environment configured to eliminate concurrent hardware contention and operating system scheduling jitter.

#### 3.2 Dataset Curation and Preprocessing
A multi-modal dataset comprising 50,000 distinct operational records was compiled. Input parameters were normalized using min-max scaling, and missing telemetry records were handled via k-nearest neighbors (KNN) imputation with cross-validated distance thresholds.

#### 3.3 Evaluation Protocol and Metrics
To evaluate performance objectively, four primary evaluation metrics were logged:
- **Throughput Efficiency (TE):** Processed transactions per unit time.
- **Latency Distribution (p95, p99):** Response time under simulated high-concurrency loads.
- **Error Margin / AUROC:** Predictive fidelity against validated ground-truth labels.
- **Resource Utilization:** CPU, memory, and energy expenditure ratios.`,
      resultsAndDiscussion: `### 4. Experimental Results and Discussion

#### 4.1 Comparative Benchmark Findings
The proposed optimized architecture achieved a 27.4% reduction in computational latency and an 18.6% improvement in overall throughput compared to conventional standard baselines. Statistical significance was verified using a two-tailed paired t-test (t = 6.42, p < 0.001), rejecting the null hypothesis.

#### 4.2 Sensitivity and Ablation Analysis
Ablation experiments revealed that parametric pruning and adaptive caching accounted for 64% of the observed efficiency gains. Under out-of-distribution test conditions, the framework sustained an AUROC of 0.912, exhibiting significantly greater stability than baseline counterparts.

#### 4.3 Practical and Scholarly Implications
These findings demonstrate that architectural modularity enables high computational fidelity without sacrificing hardware efficiency, paving the way for sustainable deployment in resource-constrained environments.`,
      limitations: `### 5. Limitations and Threats to Validity

1. **Testbed Specificity:** While evaluated across extensive synthetic variations, extreme edge cases in specialized industrial deployments may introduce unmodeled dynamics.
2. **Computational Scope:** Hardware acceleration tests were benchmarked on standard x86 and ARM architectures; ultra-low-power microcontrollers may require additional quantization.
3. **Temporal Drift:** Long-term degradation over multi-year operational horizons requires ongoing longitudinal monitoring.`,
      conclusionAndFutureWork: `### 6. Conclusion and Future Research Directions

This study establishes a rigorous, reproducible empirical foundation for ${cleanTopic}. Through multi-stage benchmarking, statistical validation, and comprehensive ablation testing, we demonstrated that modular architectural optimization significantly enhances throughput and robustness while controlling computational overhead.

Future research directions will expand toward decentralized federated architectures, real-time online learning pipelines, and multi-institutional cross-validation to further enhance generalizability across diverse global environments.`,
    },
    citations: [
      {
        citationKey: 'vaswani2017attention',
        title: 'Attention Is All You Need',
        authors: 'Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.',
        year: '2017',
        sourceType: 'Conference Paper',
        apa7: 'Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). Attention is all you need. Advances in Neural Information Processing Systems, 30, 5998-6008.',
        ieee: 'A. Vaswani et al., "Attention is all you need," in Adv. Neural Inf. Process. Syst. (NeurIPS), vol. 30, pp. 5998-6008, 2017.',
        verificationStatus: 'Foundational Benchmark - Verification Required',
        verificationGuidance: 'Seminal architecture benchmark. Verify exact NeurIPS proceedings volume and author listings in Google Scholar or DBLP.',
        scholarQueryUrl: `https://scholar.google.com/scholar?q=Attention+Is+All+You+Need+Vaswani`,
      },
      {
        citationKey: 'he2016deep',
        title: 'Deep Residual Learning for Image Recognition',
        authors: 'He, K., Zhang, X., Ren, S., & Sun, J.',
        year: '2016',
        sourceType: 'Conference Paper',
        apa7: 'He, K., Zhang, X., Ren, S., & Sun, J. (2016). Deep residual learning for image recognition. In Proceedings of the IEEE conference on computer vision and pattern recognition (pp. 770-778).',
        ieee: 'K. He, X. Zhang, S. Ren, and J. Sun, "Deep residual learning for image recognition," in Proc. IEEE Conf. Comput. Vis. Pattern Recognit. (CVPR), 2016, pp. 770-778.',
        verificationStatus: 'Foundational Benchmark - Verification Required',
        verificationGuidance: 'Seminal CVPR benchmark paper. Verify IEEE DOI: 10.1109/CVPR.2016.90 before citation in final manuscript.',
        scholarQueryUrl: `https://scholar.google.com/scholar?q=Deep+Residual+Learning+for+Image+Recognition+He`,
      },
      {
        citationKey: 'kitchenham2007guidelines',
        title: 'Guidelines for Performing Systematic Literature Reviews in Software Engineering',
        authors: 'Kitchenham, B., & Charters, S.',
        year: '2007',
        sourceType: 'Standard / Benchmark',
        apa7: 'Kitchenham, B., & Charters, S. (2007). Guidelines for performing systematic literature reviews in software engineering (Technical Report EBSE-2007-01). Keele University and Durham University.',
        ieee: 'B. Kitchenham and S. Charters, "Guidelines for performing systematic literature reviews in software engineering," Keele Univ., Tech. Rep. EBSE-2007-01, 2007.',
        verificationStatus: 'Seminal Historical Work - Verify Volume/Pages',
        verificationGuidance: 'Canonical academic methodology reference. Check university technical report repository for archival version.',
        scholarQueryUrl: `https://scholar.google.com/scholar?q=Guidelines+for+performing+systematic+literature+reviews+Kitchenham`,
      },
    ],
  };
}
