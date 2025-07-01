// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {

// Mostrar el nombre guardado
const displayName = document.getElementById('display-name');
const savedName = localStorage.getItem('tamagotchiName') || 'Jake';
displayName.textContent = savedName;

    const tamagotchi = new Tamagotchi();
    
    // Event listeners para los botones
    document.getElementById('feed-btn').addEventListener('click', () => {
        tamagotchi.feed();
    });
    
    document.getElementById('sleep-btn').addEventListener('click', () => {
        tamagotchi.sleep();
    });
    
    document.getElementById('play-btn').addEventListener('click', () => {
        tamagotchi.play();
    });
    
    document.getElementById('clean-btn').addEventListener('click', () => {
        tamagotchi.clean();
    });
    
    document.getElementById('advice-btn').addEventListener('click', () => {
        tamagotchi.getAdvice();
    });
    
    // Mensaje de bienvenida
    setTimeout(() => {
        tamagotchi.addToLog("¡Hola! Soy Jake, tu nueva mascota virtual.");
        tamagotchi.showSpeechBubble("¡Hola! Cuídame bien, por favor.");
    }, 1000);
});