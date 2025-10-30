import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Calculate scores
    const problemScore =
      formData.painLevel + formData.frequency + formData.willingnessToPayProblem + formData.marketEvidence
    const marketScore =
      formData.icp + formData.marketSize + formData.marketGrowth + formData.competition + formData.whyNow
    const solutionScore = formData.purchasingPower + formData.uvp + formData.stickiness + formData.expansion
    const founderScore = formData.domainExpertise + formData.passion + formData.network
    const totalScore = problemScore + marketScore + solutionScore + founderScore

    let zone = "Not Viable"
    if (totalScore >= 65) zone = "Launch Ready"
    else if (totalScore >= 45) zone = "Refinement Needed"
    else if (totalScore >= 30) zone = "Major Rework"

    // Generate AI insights using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" })

    const prompt = `You are a seasoned startup advisor evaluating a business concept. Analyze this IdeaScore assessment and provide strategic guidance.

Concept: ${formData.ideaName}
Description: ${formData.description}

Assessment Breakdown:
- Problem Validation: ${problemScore}/20 (Severity: ${formData.painLevel}, Recurrence: ${formData.frequency}, Existing Solutions: ${formData.willingnessToPayProblem}, Social Proof: ${formData.marketEvidence})
- Market Landscape: ${marketScore}/25 (Target Profile: ${formData.icp}, Revenue Potential: ${formData.marketSize}, Trajectory: ${formData.marketGrowth}, Competitive Intensity: ${formData.competition}, Timing Advantage: ${formData.whyNow})
- Your Offering: ${solutionScore}/20 (Affordability: ${formData.purchasingPower}, Competitive Edge: ${formData.uvp}, Lock-in Factor: ${formData.stickiness}, Growth Vectors: ${formData.expansion})
- Founder Alignment: ${founderScore}/15 (Lived Experience: ${formData.domainExpertise}, Conviction: ${formData.passion}, Connections: ${formData.network})

Overall Score: ${totalScore}/80 (${zone})

Return STRICTLY in the following Markdown structure so a UI parser can segment content reliably:

## 1. Overall Viability Assessment
Key takeaway: <one-sentence key takeaway>
<1-3 short paragraphs>

## 2. Strongest Competitive Advantages
- <bullet 1>
- <bullet 2>
- <bullet 3>

## 3. Critical Vulnerabilities
- <risk 1>
- <risk 2>
- <risk 3>

## 4. Concrete Validation Experiments (Next 30 Days)
**Experiment 1:** <title>
- Goal: <goal>
- Approach: <approach>
- Metrics: <metrics>

**Experiment 2:** <title>
- Goal: <goal>
- Approach: <approach>
- Metrics: <metrics>

## 5. Go-To-Market Approach
Recommended: <Niche Focus | Platform Integration | Audience Leverage | Direct Competition>
Rationale: <2-4 bullets>

## Final Advice
<2-4 short sentences>

Rules:
- Use exactly the headings above.
- Keep "Key takeaway:" on its own line.
- Prefix experiments with "**Experiment N:**" exactly.
- Use hyphen bullets ("- ") for lists.
- No tables or code blocks.
- Be direct and practical. Focus on what matters most for success.`

    const result = await model.generateContent(prompt)
    const insights = result.response.text()

    return Response.json({
      scores: {
        problem: { score: problemScore, max: 20 },
        market: { score: marketScore, max: 25 },
        solution: { score: solutionScore, max: 20 },
        founder: { score: founderScore, max: 15 },
      },
      totalScore,
      zone,
      insights,
    })
  } catch (error) {
    console.error("Error:", error)
    return Response.json({ error: "Failed to validate idea" }, { status: 500 })
  }
}
