"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type Difficulty = "Easy" | "Medium" | "Hard"

export type TopicInfo = {
  name: string
  completion: number
  difficulty: Difficulty
}

export function TopicCard({
  topic,
  onPractice,
}: {
  topic: TopicInfo
  onPractice: (topic: TopicInfo) => void
}) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-base">{topic.name}</CardTitle>
        <Badge variant="outline">{topic.difficulty}</Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Completion</span>
          <span className="font-medium">{Math.round(topic.completion)}%</span>
        </div>
        <Progress value={topic.completion} />
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onPractice(topic)}>
          Practice Now
        </Button>
      </CardFooter>
    </Card>
  )
}
