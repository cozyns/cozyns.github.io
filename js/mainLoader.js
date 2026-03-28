// Wait for the page to load
window.addEventListener('load', () => {
    const loader = document.getElementById('main-loader');
    const main = document.getElementById('main-content');

    // Hide loader and show content after 2 seconds
    setTimeout(() => {
        loader.classList.add('exit');
        setTimeout(() => {
            loader.classList.add('hidden');
            main.classList.add('visible');
        }, 1000);
    }, 2000);
});