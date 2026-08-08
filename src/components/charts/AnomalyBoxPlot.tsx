"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ChartPanel, Tooltip, useTooltip, CLUSTER_COLORS, MUT, BORDER } from "./shared";

interface Group {
  c: number;
  n: number;
  q1: number;
  med: number;
  q3: number;
  lo: number;
  hi: number;
  outliers: number[];
}
interface Data {
  threshold85: number;
  groups: Group[];
}

const NAMES: Record<"en" | "sk", Record<number, string>> = {
  en: {
    [-1]: "Noise",
    0: "Normal behaviour",
    1: "Financial dominance",
    2: "Cover bidding",
    3: "Preferred winner",
    4: "Price fixing",
    5: "Bid rotation",
    6: "Bid suppression",
  },
  sk: {
    [-1]: "Šum",
    0: "Normálne správanie",
    1: "Finančná dominancia",
    2: "Krycie ponuky",
    3: "Preferovaný víťaz",
    4: "Cenová fixácia",
    5: "Rotácia víťazov",
    6: "Potlačenie ponúk",
  },
};

const W = 720;
const H = 360;
const M = { t: 18, r: 16, b: 34, l: 40 };

export function AnomalyBoxPlot() {
  const { lang } = useLanguage();
  const { ref, tip, show, hide } = useTooltip();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/thesis/if-scores.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return <div className="h-[300px]" />;

  const yMax = 1.02;
  const y = (v: number) => M.t + (1 - v / yMax) * (H - M.t - M.b);
  const plotW = W - M.l - M.r;
  const band = plotW / data.groups.length;
  const boxW = Math.min(band * 0.5, 46);

  return (
    <ChartPanel refEl={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
        {/* y grid + ticks */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line
              x1={M.l}
              x2={W - M.r}
              y1={y(t)}
              y2={y(t)}
              style={{ stroke: BORDER }}
              strokeWidth={1}
            />
            <text
              x={M.l - 8}
              y={y(t) + 3}
              textAnchor="end"
              style={{ fill: MUT }}
              fontSize={10}
            >
              {t}
            </text>
          </g>
        ))}

        {/* 85th percentile threshold */}
        <line
          x1={M.l}
          x2={W - M.r}
          y1={y(data.threshold85)}
          y2={y(data.threshold85)}
          stroke="#ef4444"
          strokeWidth={1.2}
          strokeDasharray="5 4"
        />
        <text
          x={W - M.r}
          y={y(data.threshold85) - 5}
          textAnchor="end"
          fill="#ef4444"
          fontSize={10}
        >
          {lang === "sk" ? "85. percentil" : "85th percentile"}
        </text>

        {/* boxes */}
        {data.groups.map((g, i) => {
          const cx = M.l + band * i + band / 2;
          const color = CLUSTER_COLORS[g.c] ?? "#9aa4b2";
          const label = g.c === -1 ? (lang === "sk" ? "Šum" : "Noise") : `Z${g.c}`;
          const lines = [
            NAMES[lang][g.c],
            `n = ${g.n}`,
            `${lang === "sk" ? "medián" : "median"} ${g.med}`,
            `IQR ${g.q1} - ${g.q3}`,
          ];
          return (
            <g
              key={g.c}
              onMouseEnter={(e) => show(e, lines)}
              onMouseMove={(e) => show(e, lines)}
              onMouseLeave={hide}
              style={{ cursor: "pointer" }}
            >
              {/* whisker */}
              <line
                x1={cx}
                x2={cx}
                y1={y(g.hi)}
                y2={y(g.lo)}
                style={{ stroke: MUT }}
                strokeWidth={1}
              />
              <line x1={cx - 6} x2={cx + 6} y1={y(g.hi)} y2={y(g.hi)} style={{ stroke: MUT }} strokeWidth={1} />
              <line x1={cx - 6} x2={cx + 6} y1={y(g.lo)} y2={y(g.lo)} style={{ stroke: MUT }} strokeWidth={1} />
              {/* box */}
              <rect
                x={cx - boxW / 2}
                y={y(g.q3)}
                width={boxW}
                height={Math.max(y(g.q1) - y(g.q3), 1)}
                rx={2}
                fill={color}
                fillOpacity={0.55}
                stroke={color}
                strokeWidth={1.2}
              />
              {/* median */}
              <line
                x1={cx - boxW / 2}
                x2={cx + boxW / 2}
                y1={y(g.med)}
                y2={y(g.med)}
                stroke={color}
                strokeWidth={2}
              />
              {/* outliers */}
              {g.outliers.map((o, k) => (
                <circle key={k} cx={cx} cy={y(o)} r={1.6} fill={color} fillOpacity={0.7} />
              ))}
              {/* x label */}
              <text x={cx} y={H - 12} textAnchor="middle" style={{ fill: MUT }} fontSize={10}>
                {label}
              </text>
            </g>
          );
        })}
      </svg>
      <Tooltip tip={tip} />
    </ChartPanel>
  );
}
