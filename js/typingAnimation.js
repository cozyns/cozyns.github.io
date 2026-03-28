function waitForElements(className, callback) {
    const elements = document.getElementsByClassName(className);
    if (elements.length > 0) {
        Array.from(elements).forEach(element => callback(element));
    }
    const observer = new MutationObserver(() => {
        const elements = document.getElementsByClassName(className);
        if (elements.length > 0) {
            Array.from(elements).forEach(element => callback(element));
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

function applyTypingAnimation(textElement) {
    const originalText = textElement.textContent;
    const typingSpeed = 200;
    const pauseTime = 1000;
    const dotsTime = 1000;
    const wavyTime = 500;

    // Function to apply wavy animation with dynamic delays
    function applyWavyAnimation(element, delayStep = 0.05) {
        const spans = element.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.animationDelay = `${index * delayStep}s`;
        });
    }

    // Function to remove wavy animation delays
    function removeWavyAnimation(element) {
        const spans = element.querySelectorAll('span');
        spans.forEach(span => {
            span.style.animationDelay = '';
        });
    }

    async function typeAnimation() {
        while (true) {
            // Clear text
            textElement.textContent = '';
            textElement.classList.add('typing-cursor');

            // Type out text character by character
            for (let i = 0; i < originalText.length; i++) {
                textElement.textContent = originalText.substring(0, i + 1);
                await new Promise(resolve => setTimeout(resolve, typingSpeed));
            }

            // Remove cursor, add dots
            textElement.classList.remove('typing-cursor');
            textElement.classList.add('typing-dots');
            await new Promise(resolve => setTimeout(resolve, dotsTime));

            // Remove dots, apply wavy animation
            textElement.classList.remove('typing-dots');
            textElement.classList.add('wavy-text');

            // Convert to spans for wavy animation, preserving spaces
            const words = originalText.split(' ');
            textElement.innerHTML = words
                .map(word =>
                    word.split('')
                        .map(char => `<span>${char}</span>`)
                        .join('') + ' '
                )
                .join('')
                .trim(); // Remove trailing space
            applyWavyAnimation(textElement, 0.05);

            await new Promise(resolve => setTimeout(resolve, wavyTime));

            // Pause
            await new Promise(resolve => setTimeout(resolve, pauseTime));

            // Reset for loop
            textElement.classList.remove('wavy-text');
            removeWavyAnimation(textElement);
        }
    }

    // Start the animation for this element
    typeAnimation();
}

// Expose a function to trigger the animation on new elements
window.applyTypingAnimationToElements = function () {
    const elements = document.getElementsByClassName('typing-text');
    Array.from(elements).forEach(element => {
        if (!element.dataset.animated) { 
            element.dataset.animated = 'true';
            applyTypingAnimation(element);
        }
    });
};

// Run on DOMContentLoaded for initial elements
document.addEventListener('DOMContentLoaded', () => {
    waitForElements('typing-text', (element) => {
        if (!element.dataset.animated) {
            element.dataset.animated = 'true';
            applyTypingAnimation(element);
        }
    });
});