"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ChartPanel, Tooltip, useTooltip, MUT, BORDER } from "./shared";

interface Data {
  b0: number;
  b1: number;
  r: number;
  r2: number;
  mape: number;
  n: number;
  xmax: number;
  ymax: number;
  points: { x: number; y: number }[];
}

const W = 720;
const H = 400;
const M = { t: 18, r: 18, b: 40, l: 54 };

export function RegressionScatter() {
  const { lang } = useLanguage();
  const { ref, tip, show, hide } = useTooltip();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/logistics/regression.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return <div className="h-[320px]" />;

  const xmax = data.xmax * 1.02;
  const ymax = data.ymax * 1.02;
  const px = (v: number) => M.l + (v / xmax) * (W - M.l - M.r);
  const py = (v: number) => M.t + (1 - v / ymax) * (H - M.t - M.b);

  const xticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(xmax * f));
  const yticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(ymax * f));

  return (
    <ChartPanel refEl={ref}>
      <div className="mb-1 flex flex-wrap gap-x-4 gap-y-1 px-1 font-mono text-[11px] text-muted">
        <span>r = {data.r}</span>
        <span>R² = {data.r2}</span>
        <span>MAPE = {data.mape}%</span>
        <span>n = {data.n.toLocaleString()}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
        {yticks.map((t) => (
          <g key={t}>
            <line x1={M.l} x2={W - M.r} y1={py(t)} y2={py(t)} style={{ stroke: BORDER }} strokeWidth={1} />
            <text x={M.l - 8} y={py(t) + 3} textAnchor="end" style={{ fill: MUT }} fontSize={10}>
              {t.toLocaleString()}
            </text>
          </g>
        ))}
        {xticks.map((t) => (
          <text key={t} x={px(t)} y={H - 22} textAnchor="middle" style={{ fill: MUT }} fontSize={10}>
            {t.toLocaleString()}
          </text>
        ))}
        {/* points */}
        {data.points.map((p, i) => (
          <circle
            key={i}
            cx={px(p.x)}
            cy={py(p.y)}
            r={2.4}
            fill={MUT}
            fillOpacity={0.45}
            onMouseEnter={(e) =>
              show(e, [
                lang === "sk" ? "Objednávka" : "Order",
                `${lang === "sk" ? "náklady" : "cost"} ${p.x.toLocaleString()} EUR`,
                `${lang === "sk" ? "výnos" : "revenue"} ${p.y.toLocaleString()} EUR`,
              ])
            }
            onMouseMove={(e) =>
              show(e, [
                lang === "sk" ? "Objednávka" : "Order",
                `${lang === "sk" ? "náklady" : "cost"} ${p.x.toLocaleString()} EUR`,
                `${lang === "sk" ? "výnos" : "revenue"} ${p.y.toLocaleString()} EUR`,
              ])
            }
            onMouseLeave={hide}
            style={{ cursor: "pointer" }}
          />
        ))}
        {/* OLS line */}
        <line
          x1={px(0)}
          y1={py(data.b0)}
          x2={px(data.xmax)}
          y2={py(data.b0 + data.b1 * data.xmax)}
          stroke="#3b82f6"
          strokeWidth={2.4}
        />
        {/* axis titles */}
        <text x={(M.l + W - M.r) / 2} y={H - 4} textAnchor="middle" style={{ fill: MUT }} fontSize={11}>
          {lang === "sk" ? "Náklady na objednávku (EUR)" : "Cost per order (EUR)"}
        </text>
      </svg>
      <Tooltip tip={tip} />
    </ChartPanel>
  );
}
