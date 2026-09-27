---
title: "We Taught Our AI to Say 'I Don't Know'"
date: 2026-02-22
summary: "We built uncertainty acknowledgment into KnowYourCompany.ai's AI, so it admits when the evidence is thin instead of generating a confident, possibly wrong answer."
draft: false
---

During a high-stakes demo to a research team at a major buy-side firm, KnowYourCompany.ai's system was asked about the pricing outlook for a mid-cap healthcare company. Rather than answering with incomplete data, it responded: "Insufficient context to form a reliable view."

The senior analyst's reaction was the moment that stuck with me. She said: "This is the first AI tool that's been honest with me." Competing platforms had confidently answered the same question, but their answers contradicted her own research.

## What happened next

When she verified those confident answers from other tools, she found them directionally wrong on regulatory pricing impact and cost headwinds. She put it plainly: "I can work with 'I don't know.' I can't work with confidently wrong."

## The internal debate

Building in an acknowledgment of uncertainty was contentious internally. Half the product team wanted the system to always generate a response, arguing users expect answers, and that coverage percentage — the share of queries that return a substantive result — is a competitive advantage in demos.

The other half pointed at the stakes. In equity research, a confident wrong answer has a measurable cost: analysts spend real time verifying outputs, and portfolio managers allocate capital based on research summaries that might be flawed.

## The cost of a confident wrong answer

One analyst put the tradeoff simply: she'd rather get no answer than spend forty-five minutes validating an AI output she isn't sure she can trust — often longer than doing the research by hand.

## How we actually built it

Three mechanisms drive the confidence assessment:

**Source sufficiency scoring** checks whether the system actually has access to the data sources a given query type requires before it generates anything.

**Temporal validation** checks that the available data is current enough to support a conclusion — the common failure mode is retrieving something relevant-looking but stale.

**Conflict detection** surfaces contradictory signals instead of silently resolving them. When the evidence is mixed, the system says so instead of picking a side.

## What the data showed us

Looking at early user interactions after launch:

- About 60% of analysts said the uncertainty acknowledgment was more useful than a confident answer, because it pointed them to the specific evidence gap.
- About 25% said the decline prevented an error by surfacing a conclusion that wasn't actually well-supported.
- The remaining 15% preferred a preliminary answer with the evidence gaps flagged explicitly.

The part that mattered most: when the system did give a confident answer, users trusted it significantly more, precisely because they'd seen it decline when it should. One analyst said it best: "When your system tells me something, I actually believe it. Because I've seen it tell me when it doesn't know."

## The broader lesson

The incentives in AI product design reward comprehensive, always-available answers. But in domains where the decisions are consequential — healthcare, legal, engineering, policy, finance — trust is built through demonstrated honesty, not through coverage.

Building "I don't know" as a real feature goes against that grain. It's also, in our experience, the thing that made people believe the rest of what the system says.

*Originally published on the [KnowYourCompany.ai blog](https://knowyourcompany.ai/blog/we-taught-our-ai-to-say-i-dont-know).*
