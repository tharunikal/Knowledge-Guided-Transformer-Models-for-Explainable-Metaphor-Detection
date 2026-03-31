"use client";

import { Sankey, Tooltip, ResponsiveContainer } from "recharts";
import { AnalysisResult } from "../sentence-analysis/page"; // adjust path
import { buildSankeyData } from "./buildSankeyData";

interface SankeyChartProps {
  results: AnalysisResult[];
}

export default function SankeyDiagram({ results }: SankeyChartProps) {
  const data = buildSankeyData(results);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <Sankey
  data={data}
  node={{ stroke: "#555", fill: "#8884d8", fontSize: 14 }}
  link={{ stroke: "#82ca9d", strokeOpacity: 0.5 }}
/>

      </ResponsiveContainer>
    </div>
  );
}
