// Fecha del evento para la cuenta regresiva
const weddingDate = new Date('2026-08-24T17:00:00').getTime();

const daysEl = document.querySelector('#days');
const hoursEl = document.querySelector('#hours');
const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Música de fondo
const musicButton = document.querySelector('#musicButton');
const weddingMusic = document.querySelector('#weddingMusic');

musicButton.addEventListener('click', async () => {
    try {
        if (weddingMusic.paused) {
            await weddingMusic.play();
            musicButton.classList.add('playing');
            musicButton.textContent = 'Ⅱ';
        } else {
            weddingMusic.pause();
            musicButton.classList.remove('playing');
            musicButton.textContent = '♪';
        }
    } catch (error) {
        alert('El navegador bloqueó la música automática. Toca nuevamente para reproducir.');
    }
});

// Compartir invitación
const shareButton = document.querySelector('#shareButton');
shareButton.addEventListener('click', async () => {
    const shareData = {
        title: 'Invitación Carolina & Alejandro',
        text: 'Te compartimos nuestra invitación digital de matrimonio.',
        url: window.location.href
    };

    if (navigator.share) {
        await navigator.share(shareData);
    } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
    }
});

// Confirmación por WhatsApp
const confirmForm = document.querySelector('#confirmForm');
confirmForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#guestName').value.trim();
    const count = document.querySelector('#guestCount').value;
    const message = document.querySelector('#guestMessage').value.trim();

    const phone = '573000000000'; // Cambia este número por el WhatsApp real del cliente
    const text = `Hola, confirmo mi asistencia a la boda.%0A%0ANombre: ${name}%0APersonas: ${count}%0AMensaje: ${message || 'Sin mensaje adicional'}`;

    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
});
