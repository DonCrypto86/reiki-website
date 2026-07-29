import { Info } from "lucide-react";
import type { ReactNode } from "react";

type LegalNoticeProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Sachlicher, nicht alarmistischer Hinweiskasten – z. B. für den
 * medizinischen Disclaimer oder rechtliche Hinweise. Farbe transportiert
 * hier keine alleinige Bedeutung, das Icon dient nur der Betonung.
 */
export default function LegalNotice({ children, className = "" }: LegalNoticeProps) {
  return (
    <div
      className={`flex gap-3 rounded-xl2 border border-sage-200 bg-sage-50 p-5 text-sm text-ink ${className}`}
    >
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}
