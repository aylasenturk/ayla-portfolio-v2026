// ── D3 Gorunum Render Fonksiyonlari ──
// 4 farkli gorsellestirme: Indented Tree, Tidy Tree, Force Graph, Tangled Tree
// Bagimliliklari: d3.v7, kod-haritasi-data.js, kod-haritasi-utils.js

// ══════════════════════════════════════════
//  1. INDENTED TREE
// ══════════════════════════════════════════
function renderIndentedTree() {
  const nodeSize = 22;
  const root = d3.hierarchy(data).eachBefore((i => d => d.index = i++)(0));
  const nodes = root.descendants();
  const width = 960;
  const height = (nodes.length + 1) * nodeSize;

  const svg = d3.select("#chart").append("svg")
    .attr("width", width).attr("height", height)
    .attr("viewBox", [-nodeSize / 2, -nodeSize * 3 / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  svg.append("g")
    .attr("fill", "none").attr("stroke", "var(--link-line)").attr("stroke-width", 1)
    .selectAll("path").data(root.links()).join("path")
    .attr("d", d => `M${d.source.depth * nodeSize},${d.source.index * nodeSize}V${d.target.index * nodeSize}h${nodeSize}`);

  const node = svg.append("g")
    .selectAll("g").data(nodes).join("g")
    .attr("transform", d => `translate(0,${d.index * nodeSize})`)
    .attr("class", d => !d.children && fileDetails[getFileKey(d)] ? "clickable" : "")
    .on("click", (e, d) => { const key = getFileKey(d); if (fileDetails[key]) openPanel(key); });

  node.append("circle")
    .attr("cx", d => d.depth * nodeSize)
    .attr("r", d => d.children ? 4 : 3)
    .attr("fill", d => getNodeColor(d))
    .attr("stroke", d => d.children ? "var(--accent)" : "none")
    .attr("stroke-width", d => d.children ? 1.5 : 0)
    .attr("fill-opacity", d => d.children ? 0.3 : 1);

  node.append("text")
    .attr("dy", "0.32em")
    .attr("x", d => d.depth * nodeSize + 10)
    .attr("fill", d => d.children ? "var(--accent)" : "var(--text-main)")
    .attr("font-size", d => d.children ? "13px" : "12px")
    .attr("font-weight", d => d.children ? "600" : "400")
    .text(d => d.data.name);

  node.filter(d => d.data.desc)
    .append("text")
    .attr("dy", "0.32em")
    .attr("x", d => d.depth * nodeSize + 10 + d.data.name.length * 7.5 + 12)
    .attr("fill", "var(--text-muted)").attr("font-size", "11px")
    .text(d => d.data.desc);

  node.filter(d => d.data.lines)
    .append("text")
    .attr("dy", "0.32em").attr("x", 720).attr("text-anchor", "end")
    .attr("fill", d => typeColors[d.data.type] || "var(--text-muted)")
    .attr("font-size", "11px")
    .attr("font-family", "'JetBrains Mono', monospace").attr("opacity", 0.8)
    .text(d => `${d.data.lines} satir`);

  node.filter(d => d.data.lines)
    .append("rect")
    .attr("x", 730).attr("y", -4).attr("height", 8)
    .attr("width", d => (d.data.lines / 483) * 150)
    .attr("rx", 2)
    .attr("fill", d => typeColors[d.data.type] || "var(--text-muted)")
    .attr("opacity", 0.25);
}

// ══════════════════════════════════════════
//  2. TIDY TREE
// ══════════════════════════════════════════
function renderTidyTree() {
  const root = d3.hierarchy(data);
  const width = 960;
  const dx = 24;
  const dy = width / (root.height + 2);

  const treeLayout = d3.tree().nodeSize([dx, dy]);
  treeLayout(root);

  let x0 = Infinity, x1 = -Infinity;
  root.each(d => { if (d.x > x1) x1 = d.x; if (d.x < x0) x0 = d.x; });
  const height = x1 - x0 + dx * 2;

  const svg = d3.select("#chart").append("svg")
    .attr("width", width).attr("height", height)
    .attr("viewBox", [-dy / 2, x0 - dx, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  svg.append("g")
    .attr("fill", "none").attr("stroke", "var(--link-line)").attr("stroke-width", 1.5)
    .selectAll("path").data(root.links()).join("path")
    .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));

  const node = svg.append("g")
    .selectAll("g").data(root.descendants()).join("g")
    .attr("transform", d => `translate(${d.y},${d.x})`)
    .attr("class", d => !d.children && fileDetails[getFileKey(d)] ? "clickable" : "")
    .on("click", (e, d) => { const key = getFileKey(d); if (fileDetails[key]) openPanel(key); });

  node.append("circle")
    .attr("r", d => d.children ? 5 : 4)
    .attr("fill", d => getNodeColor(d))
    .attr("stroke", d => d.children ? "var(--accent)" : "none")
    .attr("stroke-width", 1.5)
    .attr("fill-opacity", d => d.children ? 0.3 : 1);

  node.append("text")
    .attr("dy", "0.32em")
    .attr("x", d => d.children ? -8 : 8)
    .attr("text-anchor", d => d.children ? "end" : "start")
    .attr("fill", d => d.children ? "var(--accent)" : "var(--text-main)")
    .attr("font-size", d => d.children ? "12px" : "11px")
    .attr("font-weight", d => d.children ? "600" : "400")
    .text(d => d.data.name);

  node.filter(d => d.data.lines)
    .append("text")
    .attr("dy", "0.32em")
    .attr("x", d => 8 + d.data.name.length * 6.5 + 8)
    .attr("fill", d => typeColors[d.data.type] || "var(--text-muted)")
    .attr("font-size", "9px")
    .attr("font-family", "'JetBrains Mono', monospace")
    .attr("opacity", 0.7)
    .text(d => `${d.data.lines}`);
}

// ══════════════════════════════════════════
//  3. FORCE-DIRECTED GRAPH
// ══════════════════════════════════════════
function renderForceGraph() {
  const root = d3.hierarchy(data);
  const nodes = root.descendants();
  const links = root.links();
  const width = 960, height = 700;

  const svg = d3.select("#chart").append("svg")
    .attr("width", width).attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(d => d.source.children ? 60 : 40).strength(1))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(d => d.children ? 20 : 14));

  currentSimulation = simulation;

  const link = svg.append("g")
    .attr("stroke", "var(--link-line)").attr("stroke-width", 1).attr("stroke-opacity", 0.6)
    .selectAll("line").data(links).join("line");

  const node = svg.append("g")
    .selectAll("g").data(nodes).join("g")
    .attr("class", d => !d.children && fileDetails[getFileKey(d)] ? "clickable" : "")
    .on("click", (e, d) => { const key = getFileKey(d); if (fileDetails[key]) openPanel(key); })
    .call(d3.drag()
      .on("start", (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on("end", (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; })
    );

  node.append("circle")
    .attr("r", d => d.children ? (d.depth === 0 ? 12 : 8) : 6)
    .attr("fill", d => getNodeColor(d))
    .attr("stroke", d => d.children ? "var(--accent)" : "none")
    .attr("stroke-width", 1.5)
    .attr("fill-opacity", d => d.children ? 0.35 : 0.9);

  node.append("text")
    .attr("dy", d => d.children ? -12 : "0.32em")
    .attr("x", d => d.children ? 0 : 10)
    .attr("text-anchor", d => d.children ? "middle" : "start")
    .attr("fill", d => d.children ? "var(--accent)" : "var(--text-main)")
    .attr("font-size", d => d.children ? "11px" : "10px")
    .attr("font-weight", d => d.children ? "600" : "400")
    .text(d => d.data.name);

  const tooltip = d3.select("#tooltip");
  node.on("mouseenter", (e, d) => {
    if (d.data.desc) {
      tooltip.style("opacity", 1).html(`<strong>${d.data.name}</strong><br>${d.data.desc}${d.data.lines ? '<br>' + d.data.lines + ' satir' : ''}`);
    }
  }).on("mousemove", (e) => {
    tooltip.style("left", (e.pageX + 12) + "px").style("top", (e.pageY - 10) + "px");
  }).on("mouseleave", () => {
    tooltip.style("opacity", 0);
  });

  simulation.on("tick", () => {
    link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
    node.attr("transform", d => `translate(${d.x},${d.y})`);
  });
}

// ══════════════════════════════════════════
//  4. TANGLED TREE
// ══════════════════════════════════════════
function renderTangledTree() {
  const root = d3.hierarchy(data);
  const width = 960;
  const layerGap = 180;
  const nodeGap = 28;

  const layers = {};
  root.each(d => {
    if (!layers[d.depth]) layers[d.depth] = [];
    layers[d.depth].push(d);
  });

  const maxLayerSize = Math.max(...Object.values(layers).map(l => l.length));
  const height = Math.max(500, maxLayerSize * nodeGap + 80);

  Object.entries(layers).forEach(([depth, nodes]) => {
    const x = 60 + parseInt(depth) * layerGap;
    const startY = (height - nodes.length * nodeGap) / 2;
    nodes.forEach((n, i) => { n.tx = x; n.ty = startY + i * nodeGap; });
  });

  const svg = d3.select("#chart").append("svg")
    .attr("width", width).attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  svg.append("g")
    .selectAll("path").data(root.links()).join("path")
    .attr("fill", "none")
    .attr("stroke", d => getNodeColor(d.target))
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.25)
    .attr("d", d => {
      const sx = d.source.tx, sy = d.source.ty, tx = d.target.tx, ty = d.target.ty;
      const mx = (sx + tx) / 2;
      return `M${sx},${sy} C${mx},${sy} ${mx},${ty} ${tx},${ty}`;
    });

  const node = svg.append("g")
    .selectAll("g").data(root.descendants()).join("g")
    .attr("transform", d => `translate(${d.tx},${d.ty})`)
    .attr("class", d => !d.children && fileDetails[getFileKey(d)] ? "clickable" : "")
    .on("click", (e, d) => { const key = getFileKey(d); if (fileDetails[key]) openPanel(key); });

  node.append("circle")
    .attr("r", d => d.children ? 6 : 5)
    .attr("fill", d => getNodeColor(d))
    .attr("stroke", d => d.children ? "var(--accent)" : "none")
    .attr("stroke-width", 1.5)
    .attr("fill-opacity", d => d.children ? 0.3 : 0.9);

  node.append("text")
    .attr("dy", "0.32em")
    .attr("x", d => d.children ? -10 : 10)
    .attr("text-anchor", d => d.children ? "end" : "start")
    .attr("fill", d => d.children ? "var(--accent)" : "var(--text-main)")
    .attr("font-size", d => d.children ? "12px" : "11px")
    .attr("font-weight", d => d.children ? "600" : "400")
    .text(d => d.data.name);

  node.filter(d => d.data.desc && !d.children)
    .append("text")
    .attr("dy", "0.32em")
    .attr("x", d => 10 + d.data.name.length * 6.5 + 8)
    .attr("fill", "var(--text-muted)")
    .attr("font-size", "9px")
    .text(d => d.data.desc);

  const depthLabels = ["Kok", "Kategori", "Alt Klasor", "Dosya"];
  svg.append("g")
    .selectAll("text")
    .data(Object.entries(layers))
    .join("text")
    .attr("x", ([depth]) => 60 + parseInt(depth) * layerGap)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("fill", "var(--text-muted)")
    .attr("font-size", "10px")
    .attr("font-weight", "600")
    .attr("text-transform", "uppercase")
    .text(([depth]) => depthLabels[parseInt(depth)] || `Katman ${depth}`);
}
