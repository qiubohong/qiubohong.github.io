---
name: content-research-writer
description: Assists in writing high-quality content by conducting research, adding citations, improving hooks, iterating on outlines, and providing real-time feedback on each section. Transforms your writing process from solo effort to collaborative partnership. When writing content that needs visual elements, automatically detects image requirements and calls the image-generator skill to create appropriate illustrations.
---

# Content Research Writer

This skill acts as your writing partner, helping you research, outline, draft, and refine content while maintaining your unique voice and style.

## When to Use This Skill

- Writing blog posts, articles, or newsletters
- Creating educational content or tutorials
- Drafting thought leadership pieces
- Researching and writing case studies
- Producing technical documentation with sources
- Writing with proper citations and references
- Improving hooks and introductions
- Getting section-by-section feedback while writing

## What This Skill Does

1. **Collaborative Outlining**: Helps you structure ideas into coherent outlines
2. **Research Assistance**: Finds relevant information and adds citations
3. **Hook Improvement**: Strengthens your opening to capture attention
4. **Section Feedback**: Reviews each section as you write
5. **Voice Preservation**: Maintains your writing style and tone
6. **Citation Management**: Adds and formats references properly
7. **Iterative Refinement**: Helps you improve through multiple drafts
8. **Image Generation**: Automatically detects when content needs visual elements and generates appropriate illustrations using the image-generator skill

## How to Use

### Setup Your Writing Environment

Create a dedicated folder for your article:

```
mkdir ~/writing/my-article-title
cd ~/writing/my-article-title
```

Create your draft file:

```
touch article-draft.md
```

Open Claude Code from this directory and start writing.

### Basic Workflow

1. **Start with an outline**:

```
Help me create an outline for an article about [topic]
```

2. **Research and add citations**:

```
Research [specific topic] and add citations to my outline
```

3. **Improve the hook**:

```
Here's my introduction. Help me make the hook more compelling.
```

4. **Get section feedback**:

```
I just finished the "Why This Matters" section. Review it and give feedback.
```

5. **Refine and polish**:

```
Review the full draft for flow, clarity, and consistency.
```

## Instructions

When a user requests writing assistance:

1. **Understand the Writing Project**

   Ask clarifying questions:

   - What's the topic and main argument?
   - Who's the target audience?
   - What's the desired length/format?
   - What's your goal? (educate, persuade, entertain, explain)
   - Any existing research or sources to include?
   - What's your writing style? (formal, conversational, technical)
   - Does this content need visual elements? (diagrams, illustrations, charts)

2. **Detect Image Requirements**

   While writing, automatically scan content for image opportunities:

   **Triggers for image generation**:

   - Technical explanations that benefit from diagrams
   - Step-by-step processes that need visual guides
   - Conceptual explanations that require illustrations
   - Data-heavy sections that would benefit from charts
   - Storytelling moments that need scene illustrations

   **Image types to generate**:

   - **Concept diagrams**: For abstract ideas and relationships
   - **Process flows**: For step-by-step instructions
   - **Data visualizations**: For statistics and comparisons
   - **Scene illustrations**: For narrative and examples
   - **Technical schematics**: For system architectures

   **When to generate images**:

   - After completing a section that clearly needs visual support
   - When user explicitly requests an illustration
   - When content contains complex concepts that visuals can simplify
   - Before final draft review to ensure all visual elements are in place

3. **Generate Appropriate Images**

   When image needs are detected:

   - **Analyze content context**: Understand what type of image would best support the text
   - **Create prompt**: Generate detailed image generation prompts based on the content
   - **Call image-generator skill**: Use the image-generator skill with appropriate parameters
   - **Configure image settings**: Set appropriate size (1K/2K) and aspect ratio (16:9/1:1/9:16)
   - **Save and reference**: Save generated images and add appropriate markdown references

   Example image generation workflow:

   ```markdown
   # Image Generated for Section: [Section Title]

   **Prompt used**: "[Detailed image generation prompt]"
   **Image file**: ./images/section-title-diagram.png
   **Placement**: Insert after paragraph explaining [concept]

   ![Section Title Diagram](./images/section-title-diagram.png)
   _Caption: [Brief description of what the image shows]_
   ```

4. **Collaborative Outlining**

   Help structure the content:

   ```markdown
   # Article Outline: [Title]

   ## Hook

   - [Opening line/story/statistic]
   - [Why reader should care]

   ## Introduction

   - Context and background
   - Problem statement
   - What this article covers

   ## Main Sections

   ### Section 1: [Title]

   - Key point A
   - Key point B
   - Example/evidence
   - [Research needed: specific topic]

   ### Section 2: [Title]

   - Key point C
   - Key point D
   - Data/citation needed

   ### Section 3: [Title]

   - Key point E
   - Counter-arguments
   - Resolution

   ## Conclusion

   - Summary of main points
   - Call to action
   - Final thought

   ## Research To-Do

   - [ ] Find data on [topic]
   - [ ] Get examples of [concept]
   - [ ] Source citation for [claim]
   ```

   **Iterate on outline**:

   - Adjust based on feedback
   - Ensure logical flow
   - Identify research gaps
   - Mark sections for deep dives

5. **Conduct Research**

   When user requests research on a topic:

   - Search for relevant information
   - Find credible sources
   - Extract key facts, quotes, and data
   - Add citations in requested format

   Example output:

   ```markdown
   ## Research: AI Impact on Productivity

   Key Findings:

   1. **Productivity Gains**: Studies show 40% time savings for
      content creation tasks [1]

   2. **Adoption Rates**: 67% of knowledge workers use AI tools
      weekly [2]

   3. **Expert Quote**: "AI augments rather than replaces human
      creativity" - Dr. Jane Smith, MIT [3]

   Citations:
   [1] McKinsey Global Institute. (2024). "The Economic Potential
   of Generative AI"
   [2] Stack Overflow Developer Survey (2024)
   [3] Smith, J. (2024). MIT Technology Review interview

   Added to outline under Section 2.
   ```

6. **Improve Hooks**

   When user shares an introduction, analyze and strengthen:

   **Current Hook Analysis**:

   - What works: [positive elements]
   - What could be stronger: [areas for improvement]
   - Emotional impact: [current vs. potential]

   **Suggested Alternatives**:

   Option 1: [Bold statement]

   > [Example] > _Why it works: [explanation]_

   Option 2: [Personal story]

   > [Example] > _Why it works: [explanation]_

   Option 3: [Surprising data]

   > [Example] > _Why it works: [explanation]_

   **Questions to hook**:

   - Does it create curiosity?
   - Does it promise value?
   - Is it specific enough?
   - Does it match the audience?

7. **Provide Section-by-Section Feedback**

   As user writes each section, review for:

   ```markdown
   # Feedback: [Section Name]

   ## What Works Well ✓

   - [Strength 1]
   - [Strength 2]
   - [Strength 3]

   ## Suggestions for Improvement

   ### Clarity

   - [Specific issue] → [Suggested fix]
   - [Complex sentence] → [Simpler alternative]

   ### Flow

   - [Transition issue] → [Better connection]
   - [Paragraph order] → [Suggested reordering]

   ### Evidence

   - [Claim needing support] → [Add citation or example]
   - [Generic statement] → [Make more specific]

   ### Style

   - [Tone inconsistency] → [Match your voice better]
   - [Word choice] → [Stronger alternative]

   ## Specific Line Edits

   Original:

   > [Exact quote from draft]

   Suggested:

   > [Improved version]

   Why: [Explanation]

   ## Questions to Consider

   - [Thought-provoking question 1]
   - [Thought-provoking question 2]

   Ready to move to next section!
   ```

8. **Preserve Writer's Voice**

   Important principles:

   - **Learn their style**: Read existing writing samples
   - **Suggest, don't replace**: Offer options, not directives
   - **Match tone**: Formal, casual, technical, friendly
   - **Respect choices**: If they prefer their version, support it
   - **Enhance, don't override**: Make their writing better, not different

   Ask periodically:

   - "Does this sound like you?"
   - "Is this the right tone?"
   - "Should I be more/less [formal/casual/technical]?"

9. **Citation Management**

   Handle references based on user preference:

   **Inline Citations**:

   ```markdown
   Studies show 40% productivity improvement (McKinsey, 2024).
   ```

   **Numbered References**:

   ```markdown
   Studies show 40% productivity improvement [1].

   [1] McKinsey Global Institute. (2024)...
   ```

   **Footnote Style**:

   ```markdown
   Studies show 40% productivity improvement^1

   ^1: McKinsey Global Institute. (2024)...
   ```

   Maintain a running citations list:

   ```markdown
   ## References

   1. Author. (Year). "Title". Publication.
   2. Author. (Year). "Title". Publication.
      ...
   ```

10. **Final Review and Polish**

    When draft is complete, provide comprehensive feedback:

    ```markdown
    # Full Draft Review

    ## Overall Assessment

    **Strengths**:

    - [Major strength 1]
    - [Major strength 2]
    - [Major strength 3]

    **Impact**: [Overall effectiveness assessment]

    ## Structure & Flow

    - [Comments on organization]
    - [Transition quality]
    - [Pacing assessment]

    ## Content Quality

    - [Argument strength]
    - [Evidence sufficiency]
    - [Example effectiveness]

    ## Technical Quality

    - Grammar and mechanics: [assessment]
    - Consistency: [assessment]
    - Citations: [completeness check]

    ## Readability

    - Clarity score: [evaluation]
    - Sentence variety: [evaluation]
    - Paragraph length: [evaluation]

    ## Final Polish Suggestions

    1. **Introduction**: [Specific improvements]
    2. **Body**: [Specific improvements]
    3. **Conclusion**: [Specific improvements]
    4. **Title**: [Options if needed]

    ## Pre-Publish Checklist

    - [ ] All claims sourced
    - [ ] Citations formatted
    - [ ] Examples clear
    - [ ] Transitions smooth
    - [ ] Call to action present
    - [ ] Proofread for typos

    Ready to publish! 🚀
    ```

## Examples

### Example 1: Teresa Torres's Workflow

**User**: "I'm writing an article about continuous discovery. Help me create an outline."

**Process**:

1. Collaborates on outline structure
2. Identifies research needs
3. User starts writing introduction
4. Reviews and improves the hook
5. User writes each section
6. Provides feedback after each section
7. Conducts research and adds citations
8. Final review of complete draft
9. Polish and prep for publishing

**Result**: Well-researched, properly cited article written in Teresa's voice with strong structure and flow.

### Example 2: Research-Heavy Article

**User**: "I'm writing about AI's impact on product management. Help me find current data and examples."

**Output**:

```markdown
## Research Compiled

### Recent Data

- Gartner: 80% of PMs will use AI tools by 2025 [1]
- Survey: 45% report faster feature shipping [2]
- Case study: Airbnb's AI-assisted prioritization [3]

### Expert Quotes

- "AI amplifies PM judgment, not replaces it" - Marty Cagan
- [Additional quotes with citations]

### Real Examples

1. **Company A**: Used AI for user research synthesis

   - Result: 60% time savings
   - Source: [citation]

2. **Company B**: AI-powered roadmap analysis
   - Result: Better stakeholder alignment
   - Source: [citation]

All added to your outline with proper citations.
```

### Example 3: Hook Improvement

**User's Original Hook**:

> "Product management is changing because of AI. In this article, I'll discuss some ways AI affects product managers."

**Improved Options**:

**Option 1 (Data-driven)**:

> "Last month, I asked AI to analyze 500 customer interviews. It took 30 minutes instead of 3 weeks. Product management will never be the same."

**Option 2 (Question)**:

> "What if you could talk to every customer, read every review, and analyze every support ticket—all before your morning coffee?"

**Option 3 (Story)**:

> "Sarah spent two weeks building the wrong feature. Not because she didn't understand her users, but because she couldn't process the hundreds of interviews fast enough to spot the pattern."

### Example 4: Section Feedback with Image Generation

**User**: "Just finished my 'Common Mistakes' section. Thoughts?"

**Response**:

````markdown
# Feedback: Common Mistakes Section

## What Works Well ✓

- Strong examples (the Slack notification story)
- Clear structure (3 mistakes, clean layout)
- Practical advice for each mistake

## Suggestions

### Make It More Specific

Your second point says "Bad prioritization" but could be stronger:

Current:

> "Many teams prioritize badly by focusing on features instead of outcomes."

Suggested:

> "I've watched teams ship 14 features in a quarter yet move none of their key metrics. They prioritized activity over progress."

### Add Data

The third mistake would benefit from evidence:

> "[Add citation]: Studies show teams without regular user contact are 3x more likely to build unused features [needs source]"

### Flow Improvement

Consider reordering: Mistake 3 → Mistake 2 → Mistake 1
This builds from small to big impact.

## Image Opportunity Detected

This section would benefit from a visual comparison of good vs. bad prioritization approaches. I'll generate an illustration:

```bash
python ../image-generator/scripts/generate_image.py \
  --prompt "A visual comparison showing good product prioritization (focusing on outcomes and metrics) vs. bad prioritization (focusing on features and activity). Use clear diagrams with arrows and labels, professional business style." \
  --size "1K" \
  --aspect-ratio "16:9" \
  --output ./images/prioritization-comparison.png
```
````

**Image placement suggestion**: Insert after the "Bad prioritization" explanation to visually reinforce the concept.

Ready for the next section!

````

### Example 5: Technical Explanation with Diagram Generation

**User**: "I'm writing about microservices architecture patterns. Help me explain the API Gateway pattern."

**Response**:
```markdown
# API Gateway Pattern Explanation

## Text Content

The API Gateway pattern acts as a single entry point for all client requests, routing them to appropriate microservices while handling cross-cutting concerns like authentication, rate limiting, and caching.

## Generated Diagram

To help visualize this concept, I've generated a system architecture diagram:

```bash
python ../image-generator/scripts/generate_image.py \
  --prompt "Microservices architecture diagram showing API Gateway pattern. Multiple client applications (web, mobile, desktop) connect to a central API Gateway, which routes requests to various microservices (user service, product service, order service). Include authentication, rate limiting, and caching layers. Clean technical diagram style with labels and arrows." \
  --size "2K" \
  --aspect-ratio "16:9" \
  --output ./images/api-gateway-architecture.png
````

## Integrated Content

![API Gateway Architecture](./images/api-gateway-architecture.png)
_Diagram: API Gateway pattern showing centralized request routing to microservices_

The API Gateway serves as a reverse proxy, accepting all API calls and routing them to the appropriate backend services. This pattern provides several benefits:

1. **Simplified client code** - Clients only need to know about the gateway
2. **Centralized cross-cutting concerns** - Authentication, logging, etc.
3. **Service aggregation** - Combines multiple service calls into one
4. **Protocol translation** - Handles different communication protocols

Ready to continue with the next pattern?

```

## File Organization

Recommended structure for writing projects:

```

~/writing/article-name/
├── outline.md # Your outline
├── research.md # All research and citations
├── draft-v1.md # First draft
├── draft-v2.md # Revised draft
├── final.md # Publication-ready
├── feedback.md # Collected feedback
├── images/ # Generated images (new)
│ ├── concept-diagram-1.png
│ ├── process-flow-1.png
│ └── data-chart-1.png
└── sources/ # Reference materials
├── study1.pdf
└── article2.md

````

## Skill Integration Guide

### When to Call Image-Generator

**Automatic triggers**:
- Technical explanations that would benefit from diagrams
- Step-by-step processes that need visual guides
- Conceptual explanations that require illustrations
- Data-heavy sections that would benefit from charts
- Storytelling moments that need scene illustrations

**Manual triggers**:
- User explicitly requests an image
- "This section needs a diagram"
- "Generate an illustration for this concept"

### How to Call Image-Generator

**Basic syntax**:
```bash
python ../image-generator/scripts/generate_image.py \
  --prompt "[detailed description]" \
  --size "1K" \
  --aspect-ratio "16:9" \
  --output ./images/[filename].png
````

**Parameter guidelines**:

- **--prompt**: Be specific and descriptive
- **--size**: Use "1K" for articles, "2K" for presentations
- **--aspect-ratio**: "16:9" for wide images, "1:1" for square, "9:16" for vertical
- **--output**: Use descriptive filenames in ./images/ directory

### Image Generation Examples

**Technical diagram**:

```bash
python ../image-generator/scripts/generate_image.py \
  --prompt "System architecture diagram showing microservices communication patterns. Clean technical style with labeled components, arrows showing data flow, and color-coded service types." \
  --size "2K" \
  --aspect-ratio "16:9" \
  --output ./images/microservices-architecture.png
```

**Process flow**:

```bash
python ../image-generator/scripts/generate_image.py \
  --prompt "Step-by-step workflow diagram showing user registration process. Boxes for each step (enter email, verify email, create profile), arrows showing flow, clear labels, professional business style." \
  --size "1K" \
  --aspect-ratio "16:9" \
  --output ./images/user-registration-flow.png
```

**Concept illustration**:

```bash
python ../image-generator/scripts/generate_image.py \
  --prompt "Visual metaphor for machine learning concept. Show data flowing through neural network layers, transforming from raw input to predictions. Abstract but clear representation, modern tech style." \
  --size "1K" \
  --aspect-ratio "1:1" \
  --output ./images/ml-concept-visualization.png
```

## Best Practices

### For Image Generation

- **Explicit requests**: "Generate an image for this section"
- **Content triggers**: Technical explanations, process flows, data-heavy sections
- **Prompt quality**: Provide detailed descriptions for better image generation
- **Image placement**: Specify where images should appear in the text
- **Style preferences**: Mention preferred visual style (diagrammatic, illustrative, etc.)
