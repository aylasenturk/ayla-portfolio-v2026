// PURE HTML & BOOTSTRAP ICONS TREE
function renderHtmlTree() {
  const chart = document.getElementById("chart");
  chart.innerHTML = "<div class='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 overflow-x-auto html-tree-container'></div>";
  const container = chart.querySelector('.html-tree-container');
  let html = '';

  function traverse(node, depth, pathArr) {
    const currentPath = [...pathArr, node.name];
    const isFolder = !!node.children;
    const key = currentPath.join('/');
    const info = fileDetails[key];
    const padding = depth * 28; 
    const icon = getFileIcon(node.name, isFolder);

    html += `<div class="flex items-start py-2.5 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors last:border-0">
      <div class="w-80 shrink-0 font-semibold text-[13px] flex items-center gap-2" style="padding-left: ${padding}px;">
        <span class="text-lg">${icon}</span> <span class="${isFolder ? 'text-sky-500 dark:text-sky-400' : ''}">${node.name}</span>
      </div>`;

    if (!isFolder && info) {
      html += `<div class="grow flex flex-col gap-1.5">
        <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">${info.desc}</div>
        <div class="flex flex-wrap gap-1.5">`;
      
      const badgeBase = "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold";
      
      if(info.state) info.state.forEach(s => html += `<span class="${badgeBase} bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" title="State"><i class="bi bi-database"></i> ${s}</span>`);
      if(info.hooks) info.hooks.forEach(h => html += `<span class="${badgeBase} bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" title="Hook"><i class="bi bi-lightning-charge-fill"></i> ${h}</span>`);
      if(info.fns) info.fns.forEach(f => html += `<span class="${badgeBase} bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" title="Function"><i class="bi bi-braces"></i> ${f.split('(')[0]}</span>`);
      if(info.consts) info.consts.forEach(c => html += `<span class="${badgeBase} bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300" title="Constant"><i class="bi bi-box-seam"></i> ${c}</span>`);
      html += `</div></div>`;
    } else if (!isFolder && !info && node.desc) {
      html += `<div class="grow"><div class="text-xs text-slate-500 dark:text-slate-400 font-medium">${node.desc}</div></div>`;
    }

    html += `</div>`;
    if (isFolder) node.children.forEach(child => traverse(child, depth + 1, currentPath));
  }

  traverse(data, 0, []); 
  container.innerHTML = html;
}

// D3 - INDENTED TREE
function renderIndentedTree() {
  const nodeSize = 22;
  const root = d3.hierarchy(data).eachBefore((i => d => d.index = i++)(0));
  const nodes = root.descendants();
  const width = 960;
  const height = (nodes.length + 1) * nodeSize;

  const svg = d3.select("#chart").append("svg")
    .attr("width", width).attr("height", height)
    .attr("viewBox", [-nodeSize / 2, -nodeSize * 3 / 2, width, height]);

  svg.append("g").selectAll("path").data(root.links()).join("path")
    .attr("d", d => `M${d.source.depth * nodeSize},${d.source.index * nodeSize}V${d.target.index * nodeSize}h${nodeSize}`);

  const node = svg.append("g").selectAll("g").data(nodes).join("g")
    .attr("transform", d => `translate(0,${d.index * nodeSize})`);

  node.append("circle").attr("cx", d => d.depth * nodeSize).attr("r", d => d.children ? 4 : 3)
    .attr("fill", d => d.children ? "#0ea5e9" : "#94a3b8");

  node.append("text").attr("dy", "0.32em").attr("x", d => d.depth * nodeSize + 10)
    .attr("fill", d => d.children ? "#0ea5e9" : "currentColor")
    .attr("font-size", d => d.children ? "13px" : "12px")
    .attr("font-weight", d => d.children ? "600" : "400").text(d => d.data.name);
}

// D3 - TIDY TREE
function renderTidyTree() {
  const root = d3.hierarchy(data);
  const width = 960; const dx = 24; const dy = width / (root.height + 2);
  const treeLayout = d3.tree().nodeSize([dx, dy]);
  treeLayout(root);

  let x0 = Infinity, x1 = -Infinity;
  root.each(d => { if (d.x > x1) x1 = d.x; if (d.x < x0) x0 = d.x; });
  const height = x1 - x0 + dx * 2;

  const svg = d3.select("#chart").append("svg")
    .attr("width", width).attr("height", height)
    .attr("viewBox", [-dy / 2, x0 - dx, width, height]);

  svg.append("g").selectAll("path").data(root.links()).join("path")
    .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));

  const node = svg.append("g").selectAll("g").data(root.descendants()).join("g")
    .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle").attr("r", d => d.children ? 5 : 4).attr("fill", d => d.children ? "#0ea5e9" : "#94a3b8");

  node.append("text").attr("dy", "0.32em").attr("x", d => d.children ? -8 : 8)
    .attr("text-anchor", d => d.children ? "end" : "start")
    .attr("fill", d => d.children ? "#0ea5e9" : "currentColor")
    .attr("font-size", d => d.children ? "12px" : "11px").text(d => d.data.name);
}

// D3 - FORCE GRAPH (EKLENDI)
function renderForceGraph() {
  const root = d3.hierarchy(data);
  const nodes = root.descendants();
  const links = root.links();
  const width = 960, height = 700;

  const svg = d3.select("#chart").append("svg")
    .attr("width", width).attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(d => d.source.children ? 60 : 40).strength(1))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(d => d.children ? 20 : 14));

  currentSimulation = simulation;

  const link = svg.append("g").attr("stroke", "#cbd5e1").attr("stroke-width", 1).attr("stroke-opacity", 0.6)
    .selectAll("line").data(links).join("line");

  const node = svg.append("g").selectAll("g").data(nodes).join("g")
    .call(d3.drag()
      .on("start", (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on("end", (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; })
    );

  node.append("circle").attr("r", d => d.children ? (d.depth === 0 ? 12 : 8) : 6)
    .attr("fill", d => d.children ? "#0ea5e9" : "#94a3b8")
    .attr("cursor", "pointer");

  node.append("text").attr("dy", d => d.children ? -12 : "0.32em").attr("x", d => d.children ? 0 : 10)
    .attr("text-anchor", d => d.children ? "middle" : "start")
    .attr("fill", d => d.children ? "#0ea5e9" : "currentColor")
    .attr("font-size", d => d.children ? "11px" : "10px")
    .attr("font-weight", d => d.children ? "600" : "400").text(d => d.data.name)
    .attr("cursor", "pointer");

  // Tailwind uyumlu dinamik Tooltip
  let tooltip = d3.select("#tooltip");
  if(tooltip.empty()) {
    tooltip = d3.select("body").append("div").attr("id", "tooltip")
      .attr("class", "absolute px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-lg text-xs pointer-events-none opacity-0 transition-opacity z-50");
  }

  node.on("mouseenter", (e, d) => {
    if (d.data.desc) {
      tooltip.style("opacity", 1).html(`<strong class="text-sky-500">${d.data.name}</strong><br><span class="text-slate-500 dark:text-slate-400">${d.data.desc}</span>`);
    }
  }).on("mousemove", (e) => {
    tooltip.style("left", (e.pageX + 15) + "px").style("top", (e.pageY - 15) + "px");
  }).on("mouseleave", () => tooltip.style("opacity", 0));

  simulation.on("tick", () => {
    link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
    node.attr("transform", d => `translate(${d.x},${d.y})`);
  });
}

// D3 - TANGLED TREE (EKLENDI)
function renderTangledTree() {
  const root = d3.hierarchy(data);
  const width = 960; const layerGap = 180; const nodeGap = 28;
  const layers = {};
  
  root.each(d => { if (!layers[d.depth]) layers[d.depth] = []; layers[d.depth].push(d); });
  const maxLayerSize = Math.max(...Object.values(layers).map(l => l.length));
  const height = Math.max(500, maxLayerSize * nodeGap + 80);

  Object.entries(layers).forEach(([depth, nodes]) => {
    const x = 60 + parseInt(depth) * layerGap;
    const startY = (height - nodes.length * nodeGap) / 2;
    nodes.forEach((n, i) => { n.tx = x; n.ty = startY + i * nodeGap; });
  });

  const svg = d3.select("#chart").append("svg")
    .attr("width", width).attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

  svg.append("g").selectAll("path").data(root.links()).join("path")
    .attr("fill", "none").attr("stroke", d => d.target.children ? "#0ea5e9" : "#94a3b8")
    .attr("stroke-width", 1.5).attr("stroke-opacity", 0.3)
    .attr("d", d => {
      const sx = d.source.tx, sy = d.source.ty, tx = d.target.tx, ty = d.target.ty, mx = (sx + tx) / 2;
      return `M${sx},${sy} C${mx},${sy} ${mx},${ty} ${tx},${ty}`;
    });

  const node = svg.append("g").selectAll("g").data(root.descendants()).join("g")
    .attr("transform", d => `translate(${d.tx},${d.ty})`);

  node.append("circle").attr("r", d => d.children ? 6 : 5).attr("fill", d => d.children ? "#0ea5e9" : "#94a3b8");

  node.append("text").attr("dy", "0.32em").attr("x", d => d.children ? -10 : 10)
    .attr("text-anchor", d => d.children ? "end" : "start")
    .attr("fill", d => d.children ? "#0ea5e9" : "currentColor")
    .attr("font-size", d => d.children ? "12px" : "11px")
    .attr("font-weight", d => d.children ? "600" : "400").text(d => d.data.name);

  node.filter(d => d.data.desc && !d.children).append("text")
    .attr("dy", "0.32em").attr("x", d => 10 + d.data.name.length * 6.5 + 8)
    .attr("fill", "#64748b").attr("font-size", "9px").text(d => d.data.desc);
}