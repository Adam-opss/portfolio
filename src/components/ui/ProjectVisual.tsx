import { cn } from "@/lib/utils";

/**
 * Bespoke monochrome SVG "mockups" for project cards - a different data-viz
 * scene per variant so cards read as real work, not template placeholders.
 * Everything is drawn with currentColor so it inherits the theme.
 */
export type ProjectVisualVariant =
  | "network"
  | "dashboard"
  | "line"
  | "pipeline"
  | "cluster"
  | "area";

const grid = (
  <defs>
    <pattern id="pv-grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path
        d="M20 0H0V20"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.07"
        strokeWidth="1"
      />
    </pattern>
  </defs>
);

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-full w-full text-foreground"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {grid}
      <rect width="320" height="200" fill="url(#pv-grid)" />
      {children}
    </svg>
  );
}

/** Anomaly-detection network: nodes + edges with two flagged outliers. */
function Network() {
  const nodes = [
    [60, 70], [110, 50], [95, 110], [150, 80], [200, 60],
    [180, 130], [240, 100], [140, 150], [70, 140], [250, 150],
  ];
  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5],
    [4, 6], [5, 6], [2, 8], [5, 7], [6, 9], [7, 9],
  ];
  return (
    <Frame>
      <g stroke="currentColor" strokeOpacity="0.35" strokeWidth="1">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      {nodes.map(([x, y], i) => {
        const flagged = i === 4 || i === 7;
        return (
          <g key={i}>
            {flagged && (
              <circle cx={x} cy={y} r="11" stroke="currentColor" strokeOpacity="0.5">
                <animate
                  attributeName="r"
                  values="7;13;7"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  values="0.6;0;0.6"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <circle
              cx={x}
              cy={y}
              r={flagged ? 5 : 3.2}
              fill="currentColor"
              fillOpacity={flagged ? 1 : 0.55}
            />
          </g>
        );
      })}
    </Frame>
  );
}

/** BI dashboard wireframe: KPI tiles + bar panel. */
function Dashboard() {
  const bars = [40, 70, 55, 90, 65, 80, 50];
  return (
    <Frame>
      <g stroke="currentColor" strokeOpacity="0.18">
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={24 + i * 64}
            y={24}
            width="52"
            height="34"
            rx="5"
            fill="currentColor"
            fillOpacity="0.05"
          />
        ))}
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={32 + i * 64} y={32} width="22" height="4" rx="2" fill="currentColor" fillOpacity="0.5" />
          <rect x={32 + i * 64} y={42} width="34" height="7" rx="2" fill="currentColor" fillOpacity="0.85" />
        </g>
      ))}
      <rect x="24" y="74" width="272" height="102" rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.15" />
      <g>
        {bars.map((h, i) => (
          <rect
            key={i}
            x={40 + i * 36}
            y={160 - h}
            width="20"
            height={h}
            rx="3"
            fill="currentColor"
            fillOpacity={i === 3 ? 0.9 : 0.4}
          />
        ))}
      </g>
    </Frame>
  );
}

/** Win-rate line chart with a flagged anomaly point. */
function Line() {
  const pts = [
    [24, 150], [60, 130], [96, 138], [132, 100], [168, 112],
    [204, 70], [240, 60], [276, 92], [300, 78],
  ];
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  const area = `${d} L300 176 L24 176 Z`;
  return (
    <Frame>
      <path d={area} fill="currentColor" fillOpacity="0.06" />
      <path
        d={d}
        stroke="currentColor"
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill="currentColor" fillOpacity="0.6" />
      ))}
      {/* anomaly */}
      <g>
        <circle cx="240" cy="60" r="10" stroke="currentColor" strokeOpacity="0.5">
          <animate attributeName="r" values="6;12;6" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="240" cy="60" r="4.5" fill="currentColor" />
      </g>
    </Frame>
  );
}

/** Automation pipeline: connected stage nodes. */
function Pipeline() {
  const stages = [40, 110, 180, 250];
  const y = 70;
  return (
    <Frame>
      <g stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5">
        {stages.slice(0, -1).map((x, i) => (
          <line key={i} x1={x + 26} y1={y} x2={stages[i + 1]} y2={y} strokeDasharray="3 3" />
        ))}
      </g>
      {stages.map((x, i) => (
        <g key={i}>
          <rect x={x} y={y - 16} width="30" height="32" rx="6" fill="currentColor" fillOpacity={i === 1 ? 0.85 : 0.12} stroke="currentColor" strokeOpacity="0.3" />
        </g>
      ))}
      {/* output rows */}
      <g>
        {[120, 140, 160].map((ry, i) => (
          <rect key={i} x="40" y={ry} width={200 - i * 40} height="6" rx="3" fill="currentColor" fillOpacity={0.35 - i * 0.08} />
        ))}
      </g>
      <rect x="250" y="118" width="30" height="50" rx="6" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.25" />
      <path d="M258 138 l6 6 l10 -12" stroke="currentColor" strokeOpacity="0.8" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

/** ML clusters scatter with separated groups + outliers. */
function Cluster() {
  const clusterA = [[70, 60], [85, 72], [62, 78], [95, 64], [78, 90], [104, 84]];
  const clusterB = [[200, 120], [220, 110], [212, 134], [236, 124], [196, 140], [228, 146]];
  const outliers = [[150, 50], [255, 70], [60, 150]];
  return (
    <Frame>
      <g>
        {clusterA.map((p, i) => (
          <circle key={`a${i}`} cx={p[0]} cy={p[1]} r="4" fill="currentColor" fillOpacity="0.8" />
        ))}
        {clusterB.map((p, i) => (
          <circle key={`b${i}`} cx={p[0]} cy={p[1]} r="4" fill="currentColor" fillOpacity="0.45" />
        ))}
        {/* hulls */}
        <ellipse cx="82" cy="75" rx="34" ry="26" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="4 4" />
        <ellipse cx="216" cy="128" rx="34" ry="26" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="4 4" />
        {outliers.map((p, i) => (
          <g key={`o${i}`}>
            <circle cx={p[0]} cy={p[1]} r="5" stroke="currentColor" strokeOpacity="0.7" />
            <path d={`M${p[0] - 3} ${p[1] - 3} l6 6 M${p[0] + 3} ${p[1] - 3} l-6 6`} stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.4" />
          </g>
        ))}
      </g>
    </Frame>
  );
}

/** Data-storytelling: layered area waves. */
function Area() {
  const wave = (base: number, amp: number) => {
    let d = `M0 ${base}`;
    for (let x = 0; x <= 320; x += 40) {
      d += ` Q${x + 20} ${base - amp} ${x + 40} ${base}`;
    }
    return `${d} L320 200 L0 200 Z`;
  };
  return (
    <Frame>
      <path d={wave(150, 30)} fill="currentColor" fillOpacity="0.05" />
      <path d={wave(165, 22)} fill="currentColor" fillOpacity="0.08" />
      <path d={wave(178, 16)} fill="currentColor" fillOpacity="0.12" />
      <path
        d={wave(150, 30).replace(/ L320 200 L0 200 Z/, "")}
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        fill="none"
      />
    </Frame>
  );
}

const variants: Record<ProjectVisualVariant, () => JSX.Element> = {
  network: Network,
  dashboard: Dashboard,
  line: Line,
  pipeline: Pipeline,
  cluster: Cluster,
  area: Area,
};

export function ProjectVisual({
  variant,
  className,
}: {
  variant: ProjectVisualVariant;
  className?: string;
}) {
  const Comp = variants[variant] ?? Network;
  return (
    <div className={cn("h-full w-full", className)}>
      <Comp />
    </div>
  );
}
