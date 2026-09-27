---
title: "Users Start with Changes, Not Questions"
date: 2026-03-02
summary: "After watching 40+ analyst sessions, we found analysts start by detecting changes, not asking questions — so we rebuilt KnowYourCompany.ai from a Q&A model into a monitoring system."
draft: false
---

## The assumption we got wrong

We built KnowYourCompany.ai around a simple idea: analysts need a better way to ask questions about companies. So we invested in natural language processing, retrieval pipelines across earnings transcripts and filings, and a citation system to back every answer.

Watching real users work broke that assumption. The Q&A framing missed how analysts actually spend their morning.

## What morning looks like for a real analyst

One senior analyst covering specialty chemicals let us watch her 6:45–7:04am. She didn't type a single question for the first 19 minutes. Instead, she:

- Scanned her coverage dashboard for overnight changes
- Found three developments — an exchange filing, a competitor's earnings, a management presentation
- Compared each against prior periods to spot anomalies
- Only then formulated her first actual question

That pattern showed up in 34 of more than 40 sessions we observed.

## The taxonomy of starting points

Once we looked across sessions, three types of interaction emerged:

1. **"What changed?"** (~60% of first interactions) — anomaly detection across the whole coverage universe
2. **"How does this compare?"** (~25%) — comparative context for something already spotted
3. **"What do I think about this?"** (~15%) — pressure-testing a thesis that's already forming

Only 15% of analyst workflows start with the kind of open-ended question a Q&A system is actually optimized for.

## Why the best analysts have always worked this way

Experienced analysts run continuous mental monitoring, not question-asking. One portfolio manager put it this way: "I'm not looking for answers. I'm looking for things that moved that shouldn't have moved." The investigation follows the anomaly — it doesn't start from curiosity.

## The chatbot paradigm gets this backwards

A chatbot waits for a prompt. That means it structurally misses the highest-value insight: the unexpected pattern break that nobody thought to ask about yet. A research system should activate when something changes, not wait to be asked.

## What "detect and investigate" looks like in practice

We rebuilt around:

- **Continuous monitoring** across the full coverage universe, not just on-demand queries
- **Materiality scoring** to filter noise before anything reaches the analyst
- **Contextual packaging** — prior periods, peer comparisons, consensus positioning — attached automatically
- **A seamless investigation mode** for drilling into a flagged change

## The morning briefing, redesigned

With the new system, that same analyst's 6:45am now looks like: open a prioritized dashboard of materiality-scored changes, see a competitor's margin expansion already flagged as a 2-standard-deviation move, note a shift in management tone versus prior appearances, review a contract amendment's changed terms — with the context already assembled. She reaches her morning note in 20 minutes, with three original insights instead of zero.

## The broader lesson

Three things stuck with us:

1. Users don't always know what to ask — the valuable signal often comes from the data, not from someone's curiosity.
2. The best tools mirror how experts already work, rather than asking them to adopt a new interaction model.
3. The interaction model matters as much as the model underneath it. A brilliant AI behind a Q&A box is a Formula 1 engine in a sedan.

*Originally published on the [KnowYourCompany.ai blog](https://knowyourcompany.ai/blog/users-start-with-changes-not-questions).*
