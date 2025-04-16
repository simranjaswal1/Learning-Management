
// === FLIP CARD FUNCTION ===
function flipCard(card) {
    card.classList.toggle('flipped');
}

// === SHOW HINT FUNCTION ===
function showHint(event, button) {
    event.stopPropagation(); // Prevents card flip when clicking hint
    const hintText = button.nextElementSibling;
    hintText.style.display = 'block';
    setTimeout(() => hintText.style.display = 'none', 2000); // Hide after 2 sec
}

// === TOUCH SUPPORT FOR MOBILE ===
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.riddle-card');

    cards.forEach(card => {
        card.addEventListener('touchstart', handleTouchStart, false);
        card.addEventListener('touchmove', handleTouchMove, false);
    });

    let xDown = null;
    let yDown = null;

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    }

    function handleTouchMove(evt) {
        if (!xDown || !yDown) return;

        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;

        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                evt.currentTarget.classList.add('flipped');
            } else {
                evt.currentTarget.classList.remove('flipped');
            }
        }

        xDown = null;
        yDown = null;
    }
});