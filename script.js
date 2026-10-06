(() => {
    'use strict';

    const DURATION = 213; // 3:33 in seconds
    const playBtn = document.getElementById('play-btn');
    const progress = document.getElementById('progress-bar');
    const currTime = document.getElementById('curr-time');
    const totTime = document.getElementById('tot-time');
    const trackTitle = document.getElementById('track-title');

    let elapsed = 0;
    let timer = null;

    const format = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

    function render() {
        const pct = (elapsed / DURATION) * 100;
        progress.value = pct;
        progress.style.setProperty('--fill', `${pct}%`);
        currTime.textContent = format(elapsed);
    }

    function setPlaying(isPlaying) {
        playBtn.innerHTML = `<i class="fa-solid fa-${isPlaying ? 'pause' : 'play'}"></i>`;
        playBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
        clearInterval(timer);
        if (isPlaying) {
            timer = setInterval(() => {
                elapsed += 1;
                if (elapsed >= DURATION) {
                    elapsed = 0;
                    setPlaying(false);
                }
                render();
            }, 1000);
        }
    }

    playBtn.addEventListener('click', () => setPlaying(!timer || playBtn.getAttribute('aria-label') === 'Play'));

    progress.addEventListener('input', () => {
        elapsed = (progress.value / 100) * DURATION;
        render();
    });

    document.querySelectorAll('.card').forEach((card) => {
        card.addEventListener('click', () => {
            trackTitle.textContent = card.dataset.title;
            elapsed = 0;
            render();
            setPlaying(true);
        });
    });

    totTime.textContent = format(DURATION);
    render();
})();
