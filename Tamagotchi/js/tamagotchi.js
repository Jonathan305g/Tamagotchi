// Clase principal del Tamagotchi
class Tamagotchi {
    constructor() {
        // Estadísticas iniciales
        this.hunger = 70;
        this.energy = 80;
        this.happiness = 60;
        this.cleanliness = 50;
        
        // Estado inicial
        this.state = new HappyState(this);
        
        // Elementos del DOM
        this.characterElement = document.getElementById('character');
        this.jakeImage = document.getElementById('jake-image');
        this.speechBubble = document.getElementById('speech-bubble');
        this.hungerBar = document.getElementById('hunger-bar');
        this.energyBar = document.getElementById('energy-bar');
        this.happinessBar = document.getElementById('happiness-bar');
        this.cleanlinessBar = document.getElementById('cleanliness-bar');
        this.logElement = document.getElementById('log');
        
        // Configuración del intervalo para degradación de estadísticas
        this.interval = setInterval(() => this.state.updateStats(), 3000);
        
        // Inicializar UI
        this.updateUI();
    }
    
    setState(newState) {
        // Limpiar clases de estado anterior
        this.characterElement.classList.remove(
            'hungry', 'sleepy', 'happy', 'dirty', 'sad'
        );
        
        this.state = newState;
        
        // Aplicar clases para el nuevo estado
        if (newState instanceof HungryState) {
            this.characterElement.classList.add('hungry');
            this.addToLog("¡Tengo hambre! ¿Puedes alimentarme?");
            this.showSpeechBubble("¡Tengo hambre!");
        } else if (newState instanceof SleepyState) {
            this.characterElement.classList.add('sleepy');
            this.addToLog("Estoy muy cansado... necesito dormir.");
            this.showSpeechBubble("Zzz... tengo sueño...");
        } else if (newState instanceof HappyState) {
            this.characterElement.classList.add('happy');
            this.addToLog("¡Me siento genial! Gracias por cuidarme.");
            this.showSpeechBubble("¡Estoy feliz!");
        } else if (newState instanceof DirtyState) {
            this.characterElement.classList.add('dirty');
            this.addToLog("Me siento sucio... ¿puedes bañarme?");
            this.showSpeechBubble("¡Necesito un baño!");
        } else if (newState instanceof SadState) {
            this.characterElement.classList.add('sad');
            this.addToLog("Me siento un poco triste... ¿quieres jugar conmigo?");
            this.showSpeechBubble("Estoy triste...");
        }
        
        this.updateUI();
    }
    
    feed() {
        this.state.feed();
    }
    
    sleep() {
        this.state.sleep();
    }
    
    play() {
        this.state.play();
    }
    
    clean() {
        this.state.clean();
    }
    
    getAdvice() {
        this.state.getAdvice();
    }
    
    updateUI() {
        this.hungerBar.value = this.hunger;
        this.energyBar.value = this.energy;
        this.happinessBar.value = this.happiness;
        this.cleanlinessBar.value = this.cleanliness;
        
        // Actualizar porcentajes
        document.getElementById('hunger-percent').textContent = `${Math.round(this.hunger)}%`;
        document.getElementById('energy-percent').textContent = `${Math.round(this.energy)}%`;
        document.getElementById('happiness-percent').textContent = `${Math.round(this.happiness)}%`;
        document.getElementById('cleanliness-percent').textContent = `${Math.round(this.cleanliness)}%`;

        // Cambiar imagen según estado
        if (this.characterElement.classList.contains('hungry')) {
            this.jakeImage.src = 'img/jake-hungry.png';
        } else if (this.characterElement.classList.contains('sleepy')) {
            this.jakeImage.src = 'img/jake-sleepy.png';
        } else if (this.characterElement.classList.contains('happy')) {
            this.jakeImage.src = 'img/jake-happy.png';
        } else if (this.characterElement.classList.contains('dirty')) {
            this.jakeImage.src = 'img/jake-dirty.png';
        } else if (this.characterElement.classList.contains('sad')) {
            this.jakeImage.src = 'img/jake-sad.png';
        } else {
            this.jakeImage.src = 'img/jake-normal.png';
        }
    }
    
    showSpeechBubble(message) {
        this.speechBubble.textContent = message;
        this.speechBubble.classList.add('show');
        
        setTimeout(() => {
            this.speechBubble.classList.remove('show');
        }, 3000);
    }
    
    addToLog(message) {
        const logEntry = document.createElement('p');
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        this.logElement.appendChild(logEntry);
        this.logElement.scrollTop = this.logElement.scrollHeight;
    }
}