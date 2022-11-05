const pi = Math.PI;

function ceiling(value){
    if (value < 0){
        return 0;
    }
    if (value > 1){
        return 1;
    }
    return Math.ceil(value)
}

class Wave {
    constructor(amplitude, frequency, phase, colour) {
        this.amplitude = amplitude;
        this.frequency = frequency; // Hz
        this.phase = phase; // Radians
        this.colour = colour;
    }

    getPositionAtTime(time) {
        return 1;
    }
}

class SineWave extends Wave {
    constructor(amplitude, frequency, phase, velocity, colour){
        super(amplitude, frequency, phase, colour);
        this.amplitude = amplitude;
        this.frequency = frequency; // Hz
        this.phase = phase; // Radians
        this.velocity = velocity;
    }

    getPositionAtTime(time){
        let amplitude = this.amplitude;
        let omega = 2*Math.PI*this.frequency;
        let phase = this.phase;
        return  amplitude * Math.cos(omega*time-(position*this.velocity)-phase);
    }
}

class SquareWave extends Wave {
    constructor(amplitude, frequency, phase){
        super(amplitude, frequency, phase);
        this.amplitude = amplitude;
        this.frequency = frequency; // Hz
        this.phase = phase; // Radians
    }

    getPositionAtTime(time){
        let amplitude = this.amplitude;
        let omega = 2*Math.PI*this.frequency;
        let phase = this.phase;
        return amplitude * ceiling(Math.cos(omega*time-phase));
    }
}

class SumWave {
    constructor(waves) {
        this.waves = waves; 
    }

    getPositionAtTime(time) {
        let sum = 0;
        this.waves.forEach(wave => {
            sum += wave.getPositionAtTime(time);
        });
        return sum;
    }
}