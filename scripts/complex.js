class Complex {
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }

    get real () {
        return this.real;
    }

    get imag () {
        return this.imag;
    }

    get argument () {
        return Math.atan(this.imag, this.real);
    }

    get magnitude () {
        return Math.sqrt(this.real**2, this.imag**2);
    }
}