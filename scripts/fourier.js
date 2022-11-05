let fourierData = [];


function dft(){
    const numDataPoints = sampleData.length;
    let freqArray = Array(sampleData.length)

    for (let frequency = 0; frequency < numDataPoints; frequency++) {

        let frequencySignal = new Complex(0, 0);

        for (let n = 0; n < numDataPoints; n++) {

            const currentAmplitude = sampleData[n];

            const theta = -2 * pi * frequency * (n/numDataPoints);

            let contribution = new Complex(Math.cos(theta) * currentAmplitude, Math.sin(theta) * currentAmplitude);

            frequencySignal = addComplex(frequencySignal, contribution);

        }
        frequencySignal = divideComplex(frequencySignal, numDataPoints);

        freqArray[frequency] = frequencySignal;
    }
    return freqArray;
}
    