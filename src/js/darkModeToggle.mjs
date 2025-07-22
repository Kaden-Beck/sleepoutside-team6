export default function darkModeToggle() {
  const toggleButton = document.getElementById('darkToggle');

  if (!toggleButton) {
    console.warn('⚠️ darkToggle button not found in DOM.');
    return;
  }

  const darkModeEnabled = localStorage.getItem('darkmode') === 'true';
  if (darkModeEnabled) {
    document.body.classList.add('dark');
  }


  toggleButton.addEventListener('click', () => {
    const enabled = document.body.classList.toggle('dark');
    localStorage.setItem('darkmode', enabled);
  });
}