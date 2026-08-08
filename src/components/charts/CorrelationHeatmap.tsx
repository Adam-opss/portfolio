"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ChartPanel, Tooltip, useTooltip } from "./shared";

interface CorrData {
  features: string[];
  matrix: number[][];
}

const SHORT: Record<string, string> = {
  volume_capture: "vol_cap",
  saving_cv: "sav_cv",
  median_applicants: "applic",
  win_alternation: "alt",
};

function cellColor(v: number): string {
  const a = 0.12 + Math.abs(v) * 0.72;
  return v >= 0 ? `rgba(59,130,246,${a})` : `rgba(239,68,68,${a})`;
}

export function CorrelationHeatmap() {
  const { lang } = useLanguage();
  const { ref, tip, show, hide } = useTooltip();
  const [data, setData] = useState<CorrData | null>(null);

  useEffect(() => {
    fetch("/thesis/corr.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return <div className="h-[300px]" />;
  const labels = data.features.map((f) => SHORT[f] ?? f);
  const n = labels.length;

  return (
    <ChartPanel refEl={ref}>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `64px repeat(${n}, 1fr)` }}
      >
        <div />
        {labels.map((l) => (
          <div
            key={l}
            className="pb-1 text-center font-mono text-[10px] text-muted"
          >
            {l}
          </div>
        ))}
        {data.matrix.map((row, i) => (
          <div key={i} className="contents">
            <div className="flex items-center justify-end pr-2 font-mono text-[10px] text-muted">
              {labels[i]}
            </div>
            {row.map((v, j) => (
              <div
                key={j}
                onMouseEnter={(e) =>
                  show(e, [`${labels[i]} × ${labels[j]}`, `r = ${v.toFixed(2)}`])
                }
                onMouseMove={(e) =>
                  show(e, [`${labels[i]} × ${labels[j]}`, `r = ${v.toFixed(2)}`])
                }
                onMouseLeave={hide}
                className="flex aspect-square items-center justify-center rounded-md text-xs font-medium tabular-nums text-foreground transition-transform duration-150 hover:scale-[1.06]"
                style={{ background: cellColor(v) }}
              >
                {v.toFixed(2)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-muted">
        {lang === "sk"
          ? "Korelácia medzi štyrmi príznakmi (Pearson r)"
          : "Correlation between the four features (Pearson r)"}
      </p>
      <Tooltip tip={tip} />
    </ChartPanel>
  );
}
