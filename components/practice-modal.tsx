"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function PracticeModal({
  open,
  onOpenChange,
  topic,
  plan,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  topic: string | null
  plan: "free" | "premium"
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Practice: {topic ?? "Topic"}</DialogTitle>
          <DialogDescription>
            {plan === "free"
              ? "Free plan: You can attempt a limited set of MCQs for this topic."
              : "Premium plan: Full access to all MCQs with detailed tracking."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Start</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
