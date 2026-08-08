"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ChartPanel, Tooltip, useTooltip, SEG_COLORS, MUT, BORDER } from "./shared";

interface Route {
  route: string;
  freq: number;
  profit: number;
  km: number;
  seg: number;
}
interface Data {
  medFreq: number;
  medProfit: number;
  points: Route[];
}

const SEG_NAMES: Record<"en" | "sk", string[]> = {
  en: ["Core routes", "Premium occasional", "Volume routes", "Marginal routes"],
  sk: ["Nosné trasy", "Prémiové príležitostné", "Objemové trasy", "Okrajové trasy"],
};

const W = 720;
const H = 430;
const M = { t: 16, r: 16, b: 40, l: 52 };

export function RouteScatter() {
  const { lang } = useLanguage();
  const { ref, tip, show, hide } = useTooltip();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/logistics/routes.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return <div className="h-[340px]" />;

  const fmax = Math.max(...data.points.map((p) => p.freq)) * 1.05;
  const pvals = data.points.map((p) => p.profit);
  const pmin = Math.min(...pvals) * 0.9;
  const pmax = Math.max(...pvals) * 1.05;
  const kmax = Math.max(...data.points.map((p) => p.km));
  const px = (v: number) => M.l + (v / fmax) * (W - M.l - M.r);
  const py = (v: number) => M.t + (1 - (v - pmin) / (pmax - pmin)) * (H - M.t - M.b);
  const rad = (km: number) => 4 + (km / kmax) * 9;

  const fticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(fmax * f));
  const pticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(pmin + (pmax - pmin) * f));

  return (
    <ChartPanel refEl={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
        {pticks.map((t) => (
          <g key={t}>
            <line x1={M.l} x2={W - M.r} y1={py(t)} y2={py(t)} style={{ stroke: BORDER }} strokeWidth={1} />
            <text x={M.l - 8} y={py(t) + 3} textAnchor="end" style={{ fill: MUT }} fontSize={10}>
              {t}
            </text>
          </g>
        ))}
        {fticks.map((t) => (
          <text key={t} x={px(t)} y={H - 22} textAnchor="middle" style={{ fill: MUT }} fontSize={10}>
            {t}
          </text>
        ))}

        {/* median reference lines */}
        <line x1={px(data.medFreq)} x2={px(data.medFreq)} y1={M.t} y2={H - M.b} style={{ stroke: MUT }} strokeWidth={1} strokeDasharray="4 4" />
        <line x1={M.l} x2={W - M.r} y1={py(data.medProfit)} y2={py(data.medProfit)} style={{ stroke: MUT }} strokeWidth={1} strokeDasharray="4 4" />

        {data.points.map((p, i) => (
          <circle
            key={i}
            cx={px(p.freq)}
            cy={py(p.profit)}
            r={rad(p.km)}
            fill={SEG_COLORS[p.seg]}
            fillOpacity={0.68}
            stroke="#fff"
            strokeOpacity={0.25}
            strokeWidth={0.8}
            onMouseEnter={(e) =>
              show(e, [
                p.route,
                `${p.freq} ${lang === "sk" ? "objednávok" : "orders"}`,
                `${lang === "sk" ? "priem. zisk" : "avg profit"} ${p.profit} EUR`,
                `${lang === "sk" ? "priem." : "avg"} ${p.km} km`,
                SEG_NAMES[lang][p.seg],
              ])
            }
            onMouseMove={(e) =>
              show(e, [
                p.route,
                `${p.freq} ${lang === "sk" ? "objednávok" : "orders"}`,
                `${lang === "sk" ? "priem. zisk" : "avg profit"} ${p.profit} EUR`,
                `${lang === "sk" ? "priem." : "avg"} ${p.km} km`,
                SEG_NAMES[lang][p.seg],
              ])
            }
            onMouseLeave={hide}
            style={{ cursor: "pointer" }}
          />
        ))}

        <text x={(M.l + W - M.r) / 2} y={H - 4} textAnchor="middle" style={{ fill: MUT }} fontSize={11}>
          {lang === "sk" ? "Frekvencia trasy (objednávky)" : "Route frequency (orders)"}
        </text>
      </svg>

      {/* legend */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 px-1">
        {SEG_NAMES[lang].map((name, i) => (
          <span key={i} className="flex items-center gap-1.5 text-xs text-muted">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: SEG_COLORS[i] }} />
            {name}
          </span>
        ))}
      </div>
      <Tooltip tip={tip} />
    </ChartPanel>
  );
}
