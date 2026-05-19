const statusEl = document.getElementById('opencellsStatus');

function setOpenCellsStatus(enabled, label) {
  if (!statusEl) return;
  statusEl.textContent = label;
  statusEl.classList.toggle('is-enabled', enabled);
  statusEl.classList.toggle('is-disabled', !enabled);
  document.documentElement.dataset.opencells = enabled ? 'enabled' : 'disabled';
}

async function initOpenCells() {
  try {
    const module = await import('https://esm.sh/@open-cells/core');
    if (module) {
      setOpenCellsStatus(true, 'OpenCells · activo');
      return;
    }
  } catch (_) {
    // Graceful fallback keeps current site behavior untouched.
  }

  setOpenCellsStatus(false, 'OpenCells · no disponible');
}

initOpenCells();
