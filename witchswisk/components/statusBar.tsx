import { Check } from "lucide-react";

const STEPS = ["processing", "paid", "shipped", "delivered"] as const;

export default function StatusBar({ status }: { status: string }) {
    const normalized = status.toLowerCase();

    if (normalized === "failed" || normalized === "payment_failed" || normalized === "canceled") {
        return (
            <div className="w-full rounded-lg bg-red-100 text-red-700 text-sm font-medium px-3 py-2 text-center">
                Payment {normalized === "canceled" ? "Canceled" : "Failed"}
            </div>
        );
    }

    const currentIndex = STEPS.indexOf(normalized as typeof STEPS[number]);
    const progressPercent = currentIndex <= 0 ? 0 : (currentIndex / (STEPS.length - 1)) * 100;

    return (
        <div className="relative w-full px-4 pt-3">
            {/* Track line - full background */}
            <div className="absolute top-6 left-4 right-4 h-0.5 bg-muted" />
            {/* Track line - completed progress, overlaid on top */}
            <div
                className="absolute top-6 left-4 h-0.5 bg-green-500 transition-all duration-300"
                style={{ width: `calc((100% - 2rem) * ${progressPercent / 100})` }}
            />

            {/* Dots */}
            <div className="relative flex justify-between">
                {STEPS.map((step, i) => {
                    const isComplete = i <= currentIndex;
                    return (
                        <div key={step} className="flex flex-col items-center gap-1">
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors border-2 border-white ${
                                    isComplete ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                                }`}
                            >
                                {isComplete && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <span className="text-[10px] capitalize whitespace-nowrap">{step}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}