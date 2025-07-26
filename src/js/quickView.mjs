export function showQuickView(product) {
  const quickView = document.querySelector('#quick-view');

  quickView.classList.add('visible');

  document.querySelector('#close-view').addEventListener('click', () => {
    closeView();
  });

  quickView.addEventListener('click', (e) => {
    if (e.target === quickView) {
      closeView();
    }
  });
}

export function closeView() {
  const quickView = document.querySelector('#quick-view');
  quickView.classList.remove('visible');
}