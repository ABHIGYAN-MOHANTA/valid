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

Provide a strategic analysis covering:
1. Overall viability assessment and what this score means for your concept
2. Your strongest competitive advantages based on these scores
3. Critical vulnerabilities that could derail this idea
4. Concrete validation experiments to run in the next 30 days
5. Which go-to-market approach fits best: Niche Focus, Platform Integration, Audience Leverage, or Direct Competition

Be direct and practical. Focus on what matters most for success.`

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
