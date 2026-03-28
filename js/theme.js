function toggleTheme() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    if (toggle.checked) {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme', html.getAttribute('data-theme')); 
} 