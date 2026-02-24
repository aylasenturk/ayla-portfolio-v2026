let currentSimulation = null;

function toggleTheme(theme) {
  const html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

function getFileIcon(filename, isFolder) {
  if (isFolder) return '<i class="bi bi-folder-fill text-sky-500"></i>';
  if (filename.endsWith('.tsx') || filename.endsWith('.jsx')) return '<i class="bi bi-filetype-tsx text-sky-500"></i>';
  if (filename.endsWith('.ts') || filename.endsWith('.js')) return '<i class="bi bi-filetype-ts text-blue-600 dark:text-blue-400"></i>';
  if (filename.endsWith('.css')) return '<i class="bi bi-filetype-css text-indigo-500"></i>';
  return '<i class="bi bi-file-earmark-code text-slate-400"></i>';
}

function switchView(view) {
  if (currentSimulation) { 
    currentSimulation.stop(); 
    currentSimulation = null; 
  }
  
  // Varsa tooltipleri temizle
  const existingTooltip = document.getElementById("tooltip");
  if(existingTooltip) existingTooltip.remove();

  document.getElementById("chart").innerHTML = "";
  
  switch (view) {
    case "inline": renderHtmlTree(); break;
    case "indented": renderIndentedTree(); break;
    case "tidy": renderTidyTree(); break;
    case "force": renderForceGraph(); break;
    case "tangled": renderTangledTree(); break;
  }
}