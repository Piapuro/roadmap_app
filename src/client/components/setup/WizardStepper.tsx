// Server Component
import { Check } from "lucide-react";
import { cn } from "@/client/lib/cn";
import { WIZARD_STEPS } from "@/types/setup";

interface WizardStepperProps {
  currentStep: number;
}

export function WizardStepper({ currentStep }: WizardStepperProps) {
  return (
    <div className="flex items-center w-full">
      {WIZARD_STEPS.map((step, index) => {
        const isActive = step.id === currentStep;
        const isDone = step.id < currentStep;
        const isLast = index === WIZARD_STEPS.length - 1;

        return (
          <div key={step.id} className={cn("flex items-center", !isLast && "flex-1")}>
            <div className="flex items-center gap-2 shrink-0">
              {/* Circle */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  isDone && "bg-green-500",
                  isActive && "bg-[#FF8400]",
                  !isDone && !isActive && "border-2 border-[#CBCCC9]"
                )}
              >
                {isDone ? (
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                ) : (
                  <span
                    className={cn(
                      "font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold",
                      isActive ? "text-white" : "text-[#CBCCC9]"
                    )}
                  >
                    {step.id}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "font-[family-name:var(--font-jetbrains-mono)] text-xs",
                  isActive && "text-[#FF8400] font-semibold",
                  (isDone || (!isDone && !isActive)) && "text-[#666666]"
                )}
              >
                {step.stepperLabel}
              </span>
            </div>

            {/* Connector */}
            {!isLast && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2",
                  isDone ? "bg-[#FF8400]" : "bg-[#CBCCC9]"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
