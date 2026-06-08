# AGENTS.md — AlignmentTheory.org

## Project purpose

AlignmentTheory.org is a public research site for Alignment Theory. It should read like a careful independent research journal with a dated notes/newsletter layer. The site must remain readable to non-specialists without flattening the theory into generic marketing language.

## Authorial control

AI tools may help edit, organize, format, and implement the site. They must not invent claims, inflate certainty, change the theory, or present a working hypothesis as an established result.

When editing prose:

1. Preserve the author's actual meaning.
2. Prefer plain sentences over polished filler.
3. State the specific mechanism, example, condition, or consequence.
4. Keep uncertainty visible where the research is still developing.
5. Do not rewrite quotations, citations, code, filenames, URLs, or formal definitions unless explicitly asked.
6. Do not silently merge distinct concepts.
7. Do not convert personal interpretation, theological reflection, or speculative links into empirical claims.

## Required editorial references

Before editing public-facing copy, read:

- `docs/editorial/ANTI_AI_SLOP_STYLE_GUIDE.md`
- `docs/editorial/AI_LANGUAGE_BLACKLIST.txt`
- `docs/editorial/AI_LANGUAGE_LINTER_LIST.csv`

Treat the blacklist as a lint source, not as a blind find-and-replace file. Some terms may appear inside quotations, citations, code, historical artifacts, or formal definitions.

## Hard-ban public-facing filler

Avoid the following in newly written or revised prose unless quoting a source or using an unavoidable term:

`delve`, `tapestry`, `realm`, `landscape`, `navigate the complexities of`, `embark`, `unlock`, `unleash`, `harness the power of`, `elevate`, `revolutionize`, `transformative`, `game-changer`, `groundbreaking`, `cutting-edge`, `seamless`, `robust`, `pivotal`, `paramount`, `multifaceted`, `nuanced`, `meticulous`, `intricacies`, `interplay`, `resonate`, `a testament to`, `foster`, `underscore`, `shed light on`, `illuminate`, `elucidate`, `bolster`, `burgeoning`, `vibrant`, `bustling`, `nestled`, `whimsical`, `poignant`, `profound`, `timeless`, `relentless`.

Avoid canned templates such as:

- `It is important to note`
- `It is worth noting`
- `In today's fast-paced world`
- `In today's digital age`
- `As technology continues to evolve`
- `At the end of the day`
- `When it comes to`
- `In conclusion`
- `In summary`
- `This is not X; it is Y`
- `It's not about X, it's about Y`
- `Not X. Not Y. But Z.`
- `Here's the thing`
- `The reality is`
- `The truth is`
- `The deeper issue is`
- `This changes everything`
- `Let that sink in`
- `The solution?`
- `The result?`
- `Why? Because`
- `And that matters`
- `This is the core`
- `The bigger question`
- `The strongest takeaway`
- `At its core`
- `In essence`
- `Fundamentally`
- `Paving the way`
- `Signals a shift`
- `Highlights the importance of`
- `Plays a crucial role`
- `Meaningful impact`
- `Valuable insights`
- `Deeper understanding`
- `A wide range of`
- `Can help to`
- `Picture this`
- `Imagine a world where`

## Structural writing flags

Flag and reduce:

- excessive em dashes
- repeated negation-first contrasts
- three-beat slogans used as a default rhythm
- dramatic question fragments used as transitions
- uniform paragraph lengths
- overuse of headings, labels, cards, and bullets
- repeated summary endings
- abstract importance adjectives where a specific consequence can be stated
- repeated use of the same theory term when a simpler sentence would work

Use structural only when it names a concrete arrangement or relationship. Prefer the exact mechanism where possible.

## Protected theory vocabulary

Do not remove a term merely because it appears on a review list. Keep it when it names a real concept and use it consistently after defining it.

Protected terms include:

- Alignment Theory
- internal alignment
- external alignment
- participatory capacity
- capacity-forming functions
- support relation
- constitutive co-regulation
- developmental scaffolding
- stable distributed competence
- substitutive dependence
- human agency
- agency preservation
- agency erosion
- agency capture
- agency theater
- delegated agency
- AI governance
- agentic AI
- runtime governance
- Pre-Gate Deliberation Layer (PGDL)
- Agent Action Gate (AAG)
- Runtime Binding
- Receipts
- Governance Memory
- permit
- authority
- refusal
- execution
- audit
- workflow
- substrate

Use protected terms only where they add precision. Do not repeat them as decoration.

Do not use load-bearing as a default abstract metaphor. Use capacity-forming functions for the formal Alignment Theory concept, agency-forming functions in HAPI-specific contexts, and plain direct language elsewhere.

## Site direction

The main site should feel like an independent research journal:

- white background
- black or near-black text
- restrained gray borders and metadata
- one muted accent color at most
- readable article width
- generous spacing
- minimal animation
- no gradients, glow effects, or startup-style marketing sections
- typography chosen for long-form reading

The site should have one coherent header and footer across current pages. Older material should remain available under an Archive section rather than competing with the main reading path.

Recommended primary navigation:

- Start Here
- Theory
- Research
- Notes
- AI Governance
- Archive
- About
- Subscribe

## Content layers

Keep these layers visibly distinct:

1. **Theory** — the current compressed framework and definitions.
2. **Research** — papers, stress tests, citations, status labels, revision dates, and downloadable artifacts.
3. **Notes** — dated newsletter-style writing that records developing ideas in a more direct voice.
4. **AI Governance** — applied research and technical projects such as AAG, PGDL, Runtime Binding, Receipts, Governance Memory, AGS, and related implementations.
5. **Archive** — older formulations kept for provenance and continuity.

Do not present archival pages as the current entry point.

## Editing procedure

Do not perform a repository-wide prose rewrite in one pass.

Use this sequence:

1. Inventory every public page, route, artifact, and stylesheet.
2. Identify duplicate navigation systems, duplicate pages, archival pages, outdated pages, and broken links.
3. Scan public prose against the editorial files and produce a report with counts and page locations.
4. Propose a revised sitemap and migration map.
5. Create the shared visual shell and preserve current URLs.
6. Rewrite only the public entry pages first.
7. Review diffs before editing long papers, essays, or archival material.
8. Add Notes/newsletter pages after the core navigation is stable.
9. Add or update current AI governance material only after identifying which content belongs on AlignmentTheory.org and which content should link to external project repositories or HAPI pages.

## Archive rules

- Preserve old pages unless explicitly approved for deletion.
- Label outdated pages as archival.
- Keep redirects for moved URLs.
- Do not rewrite archival prose during the first cleanup pass.
- Preserve paper download links and citation metadata.

## Editorial linting

- Run `npm run lint:editorial` after editing public-facing copy, public page generators, or shared shell copy.
- Do not regenerate `docs/editorial/editorial-lint-baseline.json` during ordinary edits. Use `npm run lint:editorial:baseline` only when intentionally rebaselining archival material.
- Do not add broad exceptions. Each exception must name a file, matched entry, local anchor, reason, and active status.
- Treat protected theory vocabulary as reviewable frequency data, not automatic cleanup text.
- Keep historical baseline findings separate from new hard-ban matches in current public pages.

## Validation

After implementation:

- run the existing build and test commands
- verify internal links
- verify redirects
- scan public copy with the editorial linter
- report remaining hard-ban matches with file paths and line numbers
- report protected-term frequency separately so repeated technical vocabulary can be reviewed manually
- summarize changed files and explain any content moves
