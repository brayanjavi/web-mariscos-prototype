const statusEl = document.getElementById('opencellsStatus');

function setOpenCellsStatus(isEnabled, label) {
  if (!statusEl) return;
  statusEl.textContent = label;
  statusEl.classList.toggle('is-enabled', isEnabled);
  statusEl.classList.toggle('is-disabled', !isEnabled);
  document.documentElement.dataset.opencells = isEnabled ? 'enabled' : 'disabled';
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
