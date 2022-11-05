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
    constructor(amplitude, frequency, phase) {
        this.amplitude = amplitude;
        this.frequency = frequency; // Hz
        this.phase = phase; // Radians
    }

    getPositionAtTime(time) {
        return 1;
    }
}

class SineWave extends Wave {
    constructor(amplitude, frequency, phase){
        super(amplitude, frequency, phase);
        this.amplitude = amplitude;
        this.frequency = frequency; // Hz
        this.phase = phase; // Radians
    }

    getPositionAtTime(time, width){
        let amplitude = this.amplitude;
        let omega = 2*Math.PI*this.frequency/width;
        let phase = this.phase;
        return amplitude * Math.cos(omega*time-phase);
    }
}

class SquareWave extends Wave {
    constructor(amplitude, frequency, phase){
        super(amplitude, frequency, phase);
        this.amplitude = amplitude;
        this.frequency = frequency; // Hz
        this.phase = phase; // Radians
    }

    getPositionAtTime(time, width){
        let amplitude = this.amplitude;
        let omega = 2*Math.PI*this.frequency/width;
        let phase = this.phase;
        return amplitude * ceiling(Math.cos(omega*time-phase));
    }
}