import { AnalysisResult } from "../sentence-analysis/page";

export function buildSankeyData(results: AnalysisResult[]) {
  const nodes: { name: string }[] = [];
  const links: { source: number; target: number; value: number }[] = [];

  results.forEach((res) => {
    if (!res.is_metaphor) return;

    const source = res.source_domain.split(" ")[0]; // take first word or main concept
    const target = res.target_domain.split(" ")[0]; // same here

    // Add nodes if not already
    let sourceIndex = nodes.findIndex((n) => n.name === source);
    if (sourceIndex === -1) {
      nodes.push({ name: source });
      sourceIndex = nodes.length - 1;
    }

    let targetIndex = nodes.findIndex((n) => n.name === target);
    if (targetIndex === -1) {
      nodes.push({ name: target });
      targetIndex = nodes.length - 1;
    }

    // Add a link
    links.push({ source: sourceIndex, target: targetIndex, value: 1 });
  });

  return { nodes, links };
}
