import { generatedAiCorpusRoutes } from "./generated-ai-corpus-routes.mjs";

export const strictPublicSurfaces = [
  "index.html",
  "start-here.html",
  "about.html",
  "papers.html",
  "notes/index.html",
  "pages/human-agency-preservation-infrastructure.html",
  "pages/alignment-governance-stack.html",
  "projects/agent-action-gate.html",
  ...generatedAiCorpusRoutes.map((route) => `pages/${route.file}`),
];

export const generatedSourceFiles = [
  "scripts/generate-ai-research-pages.mjs",
];

export const historicalHtmlRoots = [
  ".",
  "pages",
  "projects",
  "notes",
];

export const excludedDirectories = [
  ".git",
  "assets/fragments",
  "node_modules",
];

export const editorialSourceFiles = {
  csv: "docs/editorial/AI_LANGUAGE_LINTER_LIST.csv",
  blacklist: "docs/editorial/AI_LANGUAGE_BLACKLIST.txt",
  styleGuide: "docs/editorial/ANTI_AI_SLOP_STYLE_GUIDE.md",
  baseline: "docs/editorial/editorial-lint-baseline.json",
  exceptions: "docs/editorial/editorial-lint-exceptions.json",
};

export const protectedVocabulary = [
  "alignment",
  "Alignment Theory",
  "internal alignment",
  "external alignment",
  "agency",
  "human agency",
  "agency preservation",
  "agency erosion",
  "agency capture",
  "agency theater",
  "delegated agency",
  "participatory capacity",
  "load-bearing",
  "load-bearing function",
  "support relation",
  "constitutive co-regulation",
  "developmental scaffolding",
  "stable distributed competence",
  "substitutive dependence",
  "capacity",
  "coherence",
  "constraint",
  "scaffolding",
  "co-regulation",
  "distributed competence",
  "substitution",
  "AI governance",
  "agentic AI",
  "governance",
  "runtime governance",
  "Agent Action Gate",
  "Pre-Gate Deliberation Layer",
  "PGDL",
  "Runtime Binding",
  "Receipts",
  "Governance Memory",
  "permit",
  "authority",
  "refusal",
  "execution",
  "audit",
  "workflow",
  "substrate",
  "infrastructure",
  "governance profiles",
  "Alignment Governance Stack",
  "AGS",
  "Human Agency Preservation Infrastructure",
  "HAPI",
  "PCPI",
];
