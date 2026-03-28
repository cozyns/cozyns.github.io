const spotlight = document.getElementById('spotlight');
const fullBackground = document.querySelector('.full-background');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    spotlight.style.left = `${x}px`;
    spotlight.style.top = `${y}px`;
    
    // Update the mask position to follow cursor
    fullBackground.style.mask = `radial-gradient(circle 300px at ${x}px ${y}px, black 0%, transparent 100%)`;
    fullBackground.style.webkitMask = `radial-gradient(circle 300px at ${x}px ${y}px, black 0%, transparent 100%)`;
});

document.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
    // Hide the image completely
    fullBackground.style.mask = `radial-gradient(circle 0px at 0px 0px, transparent 0%, transparent 100%)`;
    fullBackground.style.webkitMask = `radial-gradient(circle 0px at 0px 0px, transparent 0%, transparent 100%)`;
});

document.addEventListener('mouseenter', () => {
    spotlight.style.opacity = '1';
});