"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ChartPanel, Tooltip, useTooltip, MUT, BORDER } from "./shared";

interface Data {
  months: { label: string; pct: number; n: number }[];
}

const W = 720;
const H = 320;
const M = { t: 18, r: 16, b: 48, l: 40 };

export function MonthlyBars() {
  const { lang } = useLanguage();
  const { ref, tip, show, hide } = useTooltip();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/logistics/missing.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return <div className="h-[280px]" />;

  const y = (v: number) => M.t + (1 - v / 100) * (H - M.t - M.b);
  const plotW = W - M.l - M.r;
  const band = plotW / data.months.length;
  const barW = band * 0.66;

  return (
    <ChartPanel refEl={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
        {[0, 25, 50, 75, 100].map((t) => (
          <g key={t}>
            <line x1={M.l} x2={W - M.r} y1={y(t)} y2={y(t)} style={{ stroke: BORDER }} strokeWidth={1} />
            <text x={M.l - 8} y={y(t) + 3} textAnchor="end" style={{ fill: MUT }} fontSize={10}>
              {t}
            </text>
          </g>
        ))}
        {data.months.map((m, i) => {
          const x = M.l + band * i + (band - barW) / 2;
          const available = m.pct > 50;
          const h = Math.max((m.pct / 100) * (H - M.t - M.b), 0.5);
          const lines = [
            m.label,
            `${m.pct}% ${lang === "sk" ? "výnosov dostupných" : "revenue available"}`,
            `${m.n} ${lang === "sk" ? "objednávok" : "orders"}`,
          ];
          return (
            <g
              key={m.label}
              onMouseEnter={(e) => show(e, lines)}
              onMouseMove={(e) => show(e, lines)}
              onMouseLeave={hide}
              style={{ cursor: "pointer" }}
            >
              <motion.rect
                x={x}
                width={barW}
                rx={3}
                initial={{ height: 0, y: y(0) }}
                whileInView={{ height: h, y: y(m.pct) }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.03 }}
                fill={available ? "#3b82f6" : MUT}
                fillOpacity={available ? 0.9 : 0.4}
              />
              <text
                x={x + barW / 2}
                y={H - 30}
                textAnchor="end"
                style={{ fill: MUT }}
                fontSize={9}
                transform={`rotate(-45 ${x + barW / 2} ${H - 30})`}
              >
                {m.label}
              </text>
            </g>
          );
        })}
      </svg>
      <Tooltip tip={tip} />
    </ChartPanel>
  );
}
