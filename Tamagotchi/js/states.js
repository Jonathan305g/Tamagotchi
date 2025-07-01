// Patrón State - Implementación de los diferentes estados del Tamagotchi
class State {
    constructor(tamagotchi) {
        this.tamagotchi = tamagotchi;
    }

    feed() {
        this.tamagotchi.addToLog("No tengo hambre ahora mismo.");
    }

    sleep() {
        this.tamagotchi.addToLog("No tengo sueño en este momento.");
    }

    play() {
        this.tamagotchi.addToLog("No me apetece jugar ahora.");
    }

    clean() {
        this.tamagotchi.addToLog("No necesito un baño ahora.");
    }

    getAdvice() {
        const advice = [
            "¡Hola! Soy Jake, tu mascota virtual.",
            "Mantén mis estadísticas en niveles óptimos.",
            "No me dejes con hambre o me pondré triste.",
            "Jugar conmigo aumenta mi felicidad.",
            "Recuerda que necesito dormir para recuperar energía.",
            "La higiene es importante para cualquier mascota."
        ];
        const randomAdvice = advice[Math.floor(Math.random() * advice.length)];
        this.tamagotchi.addToLog(`Consejo: ${randomAdvice}`);
        this.tamagotchi.showSpeechBubble(randomAdvice);
    }

    updateStats() {
        // Degradación natural de las estadísticas
        this.tamagotchi.hunger = Math.max(0, this.tamagotchi.hunger - 1);
        this.tamagotchi.energy = Math.max(0, this.tamagotchi.energy - 0.5);
        this.tamagotchi.happiness = Math.max(0, this.tamagotchi.happiness - 0.8);
        this.tamagotchi.cleanliness = Math.max(0, this.tamagotchi.cleanliness - 0.3);

        this.tamagotchi.updateUI();
        this.checkStateChange();
    }

    checkStateChange() {
        // Implementado en las clases hijas
    }
}

class HappyState extends State {
    feed() {
        this.tamagotchi.hunger = Math.min(100, this.tamagotchi.hunger + 15);
        this.tamagotchi.addToLog("¡Gracias por la comida! Estaba deliciosa.");
        this.tamagotchi.showSpeechBubble("¡Yummy! ¡Gracias!");
    }

    sleep() {
        this.tamagotchi.energy = Math.min(100, this.tamagotchi.energy + 30);
        this.tamagotchi.addToLog("Zzz... ¡Qué buena siesta! Me siento renovado.");
        this.tamagotchi.showSpeechBubble("Zzz... ¡Qué buen sueño!");
    }

    play() {
        this.tamagotchi.happiness = Math.min(100, this.tamagotchi.happiness + 10);
        this.tamagotchi.energy = Math.max(0, this.tamagotchi.energy - 5);
        this.tamagotchi.addToLog("¡Eso fue divertido! Me encanta jugar contigo.");
        this.tamagotchi.showSpeechBubble("¡Qué divertido! ¡Juguemos más!");
    }

    clean() {
        this.tamagotchi.cleanliness = Math.min(100, this.tamagotchi.cleanliness + 20);
        this.tamagotchi.addToLog("¡Me siento fresco y limpio! Gracias.");
        this.tamagotchi.showSpeechBubble("¡Ahhh! Me siento limpio.");
    }

    checkStateChange() {
        if (this.tamagotchi.hunger < 30) {
            this.tamagotchi.setState(new HungryState(this.tamagotchi));
        } else if (this.tamagotchi.energy < 20) {
            this.tamagotchi.setState(new SleepyState(this.tamagotchi));
        } else if (this.tamagotchi.cleanliness < 25) {
            this.tamagotchi.setState(new DirtyState(this.tamagotchi));
        } else if (this.tamagotchi.happiness < 30) {
            this.tamagotchi.setState(new SadState(this.tamagotchi));
        }
    }
}

class HungryState extends State {
    feed() {
        this.tamagotchi.hunger = Math.min(100, this.tamagotchi.hunger + 25);
        this.tamagotchi.addToLog("¡Gracias! Tenía mucha hambre.");
        this.tamagotchi.showSpeechBubble("¡Por fin comida! ¡Gracias!");
        
        if (this.tamagotchi.hunger > 50) {
            this.tamagotchi.setState(new HappyState(this.tamagotchi));
        }
    }

    play() {
        this.tamagotchi.addToLog("No puedo jugar... tengo demasiada hambre.");
        this.tamagotchi.showSpeechBubble("Primero dame de comer...");
    }

    checkStateChange() {
        if (this.tamagotchi.hunger > 50 && this.tamagotchi.energy > 30 && this.tamagotchi.happiness > 30) {
            this.tamagotchi.setState(new HappyState(this.tamagotchi));
        }
    }
}

class SleepyState extends State {
    sleep() {
        this.tamagotchi.energy = Math.min(100, this.tamagotchi.energy + 40);
        this.tamagotchi.addToLog("Zzz... Necesitaba dormir. Me siento mucho mejor.");
        this.tamagotchi.showSpeechBubble("Zzz... ¡Qué buen sueño!");
        
        if (this.tamagotchi.energy > 50) {
            this.tamagotchi.setState(new HappyState(this.tamagotchi));
        }
    }

    play() {
        this.tamagotchi.addToLog("Estoy demasiado cansado para jugar... necesito dormir.");
        this.tamagotchi.showSpeechBubble("Estoy muy cansado...");
    }

    checkStateChange() {
        if (this.tamagotchi.energy > 50 && this.tamagotchi.hunger > 30 && this.tamagotchi.happiness > 30) {
            this.tamagotchi.setState(new HappyState(this.tamagotchi));
        }
    }
}

class DirtyState extends State {
    clean() {
        this.tamagotchi.cleanliness = Math.min(100, this.tamagotchi.cleanliness + 30);
        this.tamagotchi.addToLog("¡Ahhh! Me siento mucho mejor después del baño.");
        this.tamagotchi.showSpeechBubble("¡Qué limpio me siento!");
        
        if (this.tamagotchi.cleanliness > 50) {
            this.tamagotchi.setState(new HappyState(this.tamagotchi));
        }
    }

    play() {
        this.tamagotchi.addToLog("No quiero jugar ahora, me siento sucio.");
        this.tamagotchi.showSpeechBubble("Me siento sucio... bañame primero.");
    }

    checkStateChange() {
        if (this.tamagotchi.cleanliness > 50 && this.tamagotchi.hunger > 30 && this.tamagotchi.energy > 30) {
            this.tamagotchi.setState(new HappyState(this.tamagotchi));
        }
    }
}

class SadState extends State {
    play() {
        this.tamagotchi.happiness = Math.min(100, this.tamagotchi.happiness + 20);
        this.tamagotchi.addToLog("¡Eso fue divertido! Me siento un poco mejor.");
        this.tamagotchi.showSpeechBubble("¡Gracias por jugar conmigo!");
        
        if (this.tamagotchi.happiness > 50) {
            this.tamagotchi.setState(new HappyState(this.tamagotchi));
        }
    }

    checkStateChange() {
        if (this.tamagotchi.happiness > 50 && this.tamagotchi.hunger > 30 && this.tamagotchi.energy > 30) {
            this.tamagotchi.setState(new HappyState(this.tamagotchi));
        }
    }
}