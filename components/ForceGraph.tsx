import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GraphData, Emperor } from '../types';

interface ForceGraphProps {
  data: GraphData;
  onNodeClick: (node: Emperor) => void;
  selectedNodeId: string | null;
}

const ForceGraph: React.FC<ForceGraphProps> = ({ data, onNodeClick, selectedNodeId }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .style("font-family", "Noto Serif SC");

    // Gradient definitions
    const defs = svg.append("defs");
    
    // Gold gradient for nodes
    const goldGradient = defs.append("radialGradient")
      .attr("id", "goldGradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");
    goldGradient.append("stop").attr("offset", "0%").attr("stop-color", "#fef3c7"); // amber-100
    goldGradient.append("stop").attr("offset", "100%").attr("stop-color", "#d97706"); // amber-600

    // Arrow marker
    defs.append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 35) // Push arrow slightly away from node center
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#94a3b8");

    const simulation = d3.forceSimulation(data.nodes as any)
      .force("link", d3.forceLink(data.links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(50));

    // Container for Zoom
    const g = svg.append("g");

    const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
        });

    svg.call(zoom);

    // Links
    const link = g.append("g")
      .attr("stroke", "#94a3b8")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#arrowhead)");

    // Link Labels
    const linkLabels = g.append("g")
        .selectAll("text")
        .data(data.links)
        .join("text")
        .text((d: any) => d.label)
        .attr("font-size", "10px")
        .attr("fill", "#64748b")
        .attr("text-anchor", "middle")
        .attr("dy", -5);

    // Nodes (Group containing Circle + Text + Image clip)
    const node = g.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any)
      .on("click", (event, d) => {
        event.stopPropagation();
        onNodeClick(d as Emperor);
      })
      .style("cursor", "pointer");

    // Node Circle Background
    node.append("circle")
      .attr("r", 30)
      .attr("fill", "url(#goldGradient)")
      .attr("stroke", (d) => d.id === selectedNodeId ? "#b91c1c" : "#fff")
      .attr("stroke-width", (d) => d.id === selectedNodeId ? 4 : 2)
      .attr("filter", "drop-shadow(0px 4px 4px rgba(0,0,0,0.15))");

    // Node Text (Era Name)
    node.append("text")
      .text((d) => d.eraName)
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("font-weight", "bold")
      .attr("font-size", "14px")
      .attr("fill", "#451a03"); // deep brown

    // Simulation Tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      linkLabels
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [data, onNodeClick, selectedNodeId]);

  return (
    <div ref={containerRef} className="w-full h-full bg-[#fdfbf7] relative overflow-hidden">
       <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <h2 className="text-stone-400 text-sm uppercase tracking-widest">Interactive Map</h2>
       </div>
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default ForceGraph;
