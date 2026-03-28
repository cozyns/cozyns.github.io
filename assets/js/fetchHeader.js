fetch('/header/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;

        // Apply saved theme after header is loaded
        const savedTheme = localStorage.getItem('theme') || 'light';
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) { 
            themeToggle.checked = savedTheme === 'dark';
        } else {
            console.error('Theme toggle element not found');
        }

        // Apply typing animation to any typing-text elements in the header
        if (typeof window.applyTypingAnimationToElements === 'function') {
            window.applyTypingAnimationToElements();
        } else {
            console.error('Typing animation function not found');
        }
    })
    .catch(error => {
        console.error('Error loading header:', error);
    });