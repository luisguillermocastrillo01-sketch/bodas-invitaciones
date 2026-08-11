const copyLinkButton = document.querySelector('#copyLink');
const demoForm = document.querySelector('#demoForm');

copyLinkButton.addEventListener('click', async () => {
    const invitationUrl = window.location.origin + window.location.pathname.replace('admin.html', 'index.html');
    await navigator.clipboard.writeText(invitationUrl);
    alert('Enlace de la invitación copiado');
});

demoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const demoData = {
        coupleName: document.querySelector('#coupleName').value,
        eventDate: document.querySelector('#eventDate').value,
        eventHour: document.querySelector('#eventHour').value,
        eventPlace: document.querySelector('#eventPlace').value
    };

    localStorage.setItem('invitacionDemoAdmin', JSON.stringify(demoData));
    alert('Cambios guardados en modo demo. En esta versión no hay base de datos.');
});

const savedData = localStorage.getItem('invitacionDemoAdmin');

if (savedData) {
    const data = JSON.parse(savedData);
    document.querySelector('#coupleName').value = data.coupleName || 'Carolina & Alejandro';
    document.querySelector('#eventDate').value = data.eventDate || '2026-08-24';
    document.querySelector('#eventHour').value = data.eventHour || '17:00';
    document.querySelector('#eventPlace').value = data.eventPlace || 'Hacienda Villa Real, Medellín';
}
