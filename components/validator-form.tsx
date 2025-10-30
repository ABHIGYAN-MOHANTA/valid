"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const SECTIONS = [
  {
    id: "problem",
    title: "Stage 1: Problem Validation",
    description: "Assess the depth and authenticity of the core problem",
    fields: [
      { key: "painLevel", label: "Severity", hint: "How critical is this pain point?" },
      { key: "frequency", label: "Recurrence", hint: "How regularly do people encounter this?" },
      {
        key: "willingnessToPayProblem",
        label: "Existing Solutions",
        hint: "Are customers already spending money on alternatives?",
      },
      { key: "marketEvidence", label: "Social Proof", hint: "Can you find real complaints and discussions online?" },
    ],
  },
  {
    id: "market",
    title: "Stage 2: Market Landscape",
    description: "Evaluate the addressable market and competitive dynamics",
    fields: [
      { key: "icp", label: "Target Profile", hint: "Do you have a crystal-clear customer archetype?" },
      {
        key: "marketSize",
        label: "Revenue Potential",
        hint: "Is the market substantial enough to build a sustainable business?",
      },
      { key: "marketGrowth", label: "Trajectory", hint: "Is demand accelerating or plateauing?" },
      { key: "competition", label: "Competitive Intensity", hint: "Is this space fragmented or dominated?" },
      { key: "whyNow", label: "Timing Advantage", hint: "What recent shift makes this the right moment?" },
    ],
  },
  {
    id: "solution",
    title: "Stage 3: Your Offering",
    description: "Evaluate your solution's strength and market fit",
    fields: [
      { key: "purchasingPower", label: "Affordability", hint: "Can your target market realistically pay for this?" },
      { key: "uvp", label: "Competitive Edge", hint: "What makes your approach fundamentally different?" },
      { key: "stickiness", label: "Lock-in Factor", hint: "How essential will this become to daily operations?" },
      { key: "expansion", label: "Growth Vectors", hint: "What adjacent opportunities exist?" },
    ],
  },
  {
    id: "founder",
    title: "Stage 4: Founder Alignment",
    description: "Assess your personal readiness and resources",
    fields: [
      { key: "domainExpertise", label: "Lived Experience", hint: "Have you personally struggled with this problem?" },
      { key: "passion", label: "Conviction", hint: "Do you genuinely care about solving this?" },
      { key: "network", label: "Connections", hint: "Do you have direct access to potential customers?" },
    ],
  },
]

export function ValidatorForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    ideaName: "",
    description: "",
    painLevel: 3,
    frequency: 3,
    willingnessToPayProblem: 3,
    marketEvidence: 3,
    icp: 3,
    marketSize: 3,
    marketGrowth: 3,
    competition: 3,
    whyNow: 3,
    purchasingPower: 3,
    uvp: 3,
    stickiness: 3,
    expansion: 3,
    domainExpertise: 3,
    passion: 3,
    network: 3,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name.startsWith("idea") || name === "description" ? value : Number.parseInt(value),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Idea Overview */}
      <Card className="p-8 border-border/50 bg-card/50 backdrop-blur">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Your Saas Idea</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="ideaName" className="text-base font-medium">
              Concept Name
            </Label>
            <Input
              id="ideaName"
              name="ideaName"
              value={formData.ideaName}
              onChange={handleChange}
              placeholder="AI Email Assistant for Founders"
              className="mt-2"
              required
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-base font-medium">
              Overview
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your concept in 2-3 sentences..."
              className="mt-2 min-h-24"
              required
            />
          </div>
        </div>
      </Card>

      {/* Scoring Sections */}
      {SECTIONS.map((section) => (
        <Card key={section.id} className="p-8 border-border/50 bg-card/50 backdrop-blur">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">{section.title}</h2>
          <p className="text-muted-foreground mb-6">{section.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.fields.map((field) => (
              <div key={field.key}>
                <div className="flex justify-between items-start mb-2">
                  <Label htmlFor={field.key} className="text-sm font-medium">
                    {field.label}
                  </Label>
                  <span className="text-lg font-semibold text-primary">{formData[field.key]}/5</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{field.hint}</p>
                <input
                  id={field.key}
                  name={field.key}
                  type="range"
                  min="0"
                  max="5"
                  value={formData[field.key]}
                  onChange={handleChange}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button type="submit" disabled={loading} className="px-8 py-6 text-lg font-semibold">
          {loading ? "Analyzing with AI..." : "Generate Valid Score"}
        </Button>
      </div>
    </form>
  )
}
