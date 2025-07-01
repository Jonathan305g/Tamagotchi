document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-btn');
    const petNameInput = document.getElementById('pet-name');
    
    playBtn.addEventListener('click', () => {
        const petName = petNameInput.value.trim() || 'Jake';
        
        // Guardar el nombre en localStorage
        localStorage.setItem('tamagotchiName', petName);
        
        // Redirigir al juego principal
        window.location.href = 'index.html';
    });
    
    // Animación para el input
    petNameInput.addEventListener('focus', () => {
        petNameInput.style.transform = 'scale(1.05)';
    });
    
    petNameInput.addEventListener('blur', () => {
        petNameInput.style.transform = 'scale(1)';
    });
});