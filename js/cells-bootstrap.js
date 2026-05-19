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
    await import('https://esm.sh/@open-cells/core');
    setOpenCellsStatus(true, 'OpenCells · activo');
  } catch (error) {
    console.warn('OpenCells could not be loaded:', error);
    // Graceful fallback keeps current site behavior untouched.
    setOpenCellsStatus(false, 'OpenCells · no disponible');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOpenCells, { once: true });
} else {
  initOpenCells();
}
