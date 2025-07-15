
export default function darkModeToggle() {
    const toggleButton = document.getElementById('darkToggle');
    const isDark = localStorage.getItem('darkmode') === 'true';
  
    if (isDark) {
      document.body.classList.add('dark');
    }
  
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('darkmode', isDark);
    });
  }
  