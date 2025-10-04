"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FlaskConical, Book, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"

type Topic = { name: string }
export type SubjectKey = "Physics" | "Chemistry" | "Mathematics"

const TOPICS: Record<SubjectKey, Topic[]> = {
  Physics: [
    { name: "Mechanics" },
    { name: "Waves" },
    { name: "Thermodynamics" },
    { name: "Optics" },
    { name: "Electrostatics" },
    { name: "Current Electricity" },
    { name: "Magnetism" },
    { name: "Modern Physics" },
  ],
  Chemistry: [
    { name: "Physical Chemistry" },
    { name: "Organic Chemistry" },
    { name: "Inorganic Chemistry" },
    { name: "Chemical Kinetics" },
    { name: "Thermochemistry" },
    { name: "Equilibrium" },
  ],
  Mathematics: [
    { name: "Algebra" },
    { name: "Trigonometry" },
    { name: "Coordinate Geometry" },
    { name: "Calculus" },
    { name: "Vectors" },
    { name: "Probability" },
    { name: "Matrices & Determinants" },
  ],
}

export function SubjectsSidebar({
  onSelect,
  selectedSubject,
}: {
  selectedSubject: SubjectKey
  onSelect: (subject: SubjectKey, topic?: string) => void
}) {
  return (
    <aside className="hidden md:block md:w-64 lg:w-72">
      <div className="sticky top-20 space-y-3">
        <Accordion type="single" collapsible defaultValue={selectedSubject}>
          {(["Physics", "Chemistry", "Mathematics"] as SubjectKey[]).map((sub) => (
            <AccordionItem key={sub} value={sub}>
              <AccordionTrigger onClick={() => onSelect(sub)}>
                <div className="flex items-center gap-2">
                  {sub === "Physics" && <Book className="size-4 text-(--primary)" aria-hidden />}
                  {sub === "Chemistry" && <FlaskConical className="size-4 text-(--primary)" aria-hidden />}
                  {sub === "Mathematics" && <Calculator className="size-4 text-(--primary)" aria-hidden />}
                  <span className="font-medium">{sub}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  {TOPICS[sub].map((t) => (
                    <Button
                      key={t.name}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => onSelect(sub, t.name)}
                    >
                      {t.name}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  )
}

export function getTopicsFor(subject: SubjectKey) {
  return TOPICS[subject]
}
