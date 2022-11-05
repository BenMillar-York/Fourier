const waveColours = ["#238636", '#38a6ff', '#a37907', '#4c32a8']
let noise_thresold = 10;

function drawAxes(ctx, drawLower=true) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var xMin = 0;
    
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";

    let gradient = ctx.createLinearGradient(width/2, 0, width/2, height);
    if (drawLower) {
        gradient.addColorStop(0, "rgb(128,128,128,0)");
        gradient.addColorStop(0.1, "rgb(128,128,128,0)");
        gradient.addColorStop(0.3, "rgb(128,128,128,255)");
        gradient.addColorStop(0.8, "rgb(128,128,128,255)");
        gradient.addColorStop(0.9, "rgb(128,128,128,0)");
        gradient.addColorStop(1, "rgb(128,128,128,0)");
    } else {
        gradient.addColorStop(0, "rgb(128,128,128,0)");
        gradient.addColorStop(0.1, "rgb(128,128,128,0)");
        gradient.addColorStop(0.3, "rgb(128,128,128,255)");
        gradient.addColorStop(0.8, "rgb(128,128,128,255)");
    }

    ctx.strokeStyle = gradient;
    // Y-Axis
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2, height);
    ctx.stroke();

    ctx.beginPath();
    
    // X-Axis
    if (drawLower) {
        ctx.moveTo(xMin, height/2);
        ctx.lineTo(width, height/2);
    } else {
        ctx.moveTo(xMin, height);
        ctx.lineTo(width, height);
    }


    ctx.stroke();


    
    ctx.stroke();
}

const FREQUENCY_GRAPH_OFFSET = 30

function drawOffsetAxes(ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var xMin = 0;
    
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    
    // X-Axis
    ctx.moveTo(xMin, height-FREQUENCY_GRAPH_OFFSET);
    ctx.lineTo(width, height-FREQUENCY_GRAPH_OFFSET);
    
    // Y-Axis
    ctx.moveTo(FREQUENCY_GRAPH_OFFSET, 0);
    ctx.lineTo(FREQUENCY_GRAPH_OFFSET, height);
    
    ctx.stroke();
}

function plotFunction(ctx, wave, colour) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineWidth = 3;
    
    var y = 0;
    ctx.beginPath();

    if (colour != null) {
        ctx.strokeStyle = colour;
    }

    for (let x = -width/2; x < width/2; x++) {

        y = - wave.getPositionAtTime(x, width);

        ctx.lineTo(x+(width/2), y + (height/2));
    }

    ctx.stroke();
    ctx.save();

}

let sampleData = [];
let drawSamples = false;
function drawSamplingPoints(ctx, wave, sampleFrequency){
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ad3184";
    
    var y = 0;

    let sampleRate = width/sampleFrequency;

    sampleData = [];
    
    for (let x = -width/2; x < width/2; x+= sampleRate) {

        let waveAmplitude = wave.getPositionAtTime(x, width)
        y = - waveAmplitude + (height/2);

        sample = y;
        sampleData.push(sample);
        
        if (drawSamples) {
            drawCross(ctx, x+width/2, y, 4);
        }
        
    }
}


function updateTimeGraph() {

    var canvas = document.getElementById("canvas");
    document.getElementById("canvas").width = window.innerWidth;
    document.getElementById("canvas").height = window.innerHeight/2;

    var context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes(context);
    context.save();

    plotFunction(context, sumWave);

    if (addditionalWave instanceof Wave) {
        plotFunction(context, addditionalWave, addditionalWave.colour)
    }

    
    fourierData = dft()

    let sampleFrequency = document.getElementById("sample-frequency-slider").value;
    drawSamplingPoints(context, sumWave, sampleFrequency);

    context.restore();
    
    window.requestAnimationFrame(updateTimeGraph);
}

function drawCross(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x - size, y - size);
    ctx.moveTo(x, y);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x + size, y - size);
    ctx.stroke();
    ctx.save();
}

function drawArrow(ctx, x, y, upsidedown, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (upsidedown) {
        ctx.lineTo(x + size, y - size);
        ctx.moveTo(x, y);
        ctx.lineTo(x - size, y - size);
    } else {
        ctx.lineTo(x + size, y + size);
        ctx.moveTo(x, y);
        ctx.lineTo(x - size, y + size);
    }

    ctx.stroke();
    ctx.save();
}

/*function plotFrequencyPoints(ctx, data) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF00FF";
    
    for (let i = 1; i < data.length; i++) {
        
        let pointAmplitude = data[i].real;
        
        let x = i * width/data.length;

        let y = pointAmplitude*4 + (height/2);

        if (Math.abs(pointAmplitude) > noise_thresold) {
            drawArrow(ctx, x, y, y > height/2, 5);
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, height/2);
            ctx.stroke();
        }
        
    }
}*/

function plotFrequencyPoints2(ctx, data){
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ad3184";
    
    var y = 0;

    let sampleFrequency = document.getElementById("sample-frequency-slider").value;
    let sampleRate = width/sampleFrequency;

    let i = 0

    //let gradient = ctx.createLinearGradient(0, 0, width, 0);

    let freqArr = [wave1.frequency, wave2.frequency, wave3.frequency, wave4.frequency]

    freqArr.sort();

    let waveArr = Array(freqArr.length)

    freqArr.forEach(function (frequency, index){
        if (wave1.frequency == frequency) {
            waveArr[index] = wave1;
        }
        if (wave2.frequency == frequency) {
            waveArr[index] = wave2;
        }
        if (wave3.frequency == frequency) {
            waveArr[index] = wave3;
        }
        if (wave4.frequency == frequency) {
            waveArr[index] = wave4;
        }
    })

    let largestFreqs = [];
    for (let i = 1; i < data.length/2; i++) {
        let pointAmplitude = data[i].real;
        if (Math.abs(pointAmplitude) > 10) {
            if (largestFreqs.length == 0) {
                largestFreqs.push(i);
            }
            if (i > largestFreqs[largestFreqs.length - 1] + 5){
                largestFreqs.push(i);
            }
            
        }
    }

    let gradient = ctx.createLinearGradient(0, height, width, height);


    for (let i=0; i < freqArr.length; i++){
        if (largestFreqs.length > 0 && Math.abs(waveArr[waveArr.length-i-1].amplitude) > 21) {
            let xPos = largestFreqs[largestFreqs.length-i-1]/data.length;
            console.log(largestFreqs)
            console.log(xPos)
            if (typeof xPos == "" || xPos == NaN) {
                return;
            }
            if (!isNaN(xPos)) {
                gradient.addColorStop(xPos, waveArr[waveArr.length-i-1].colour);
                gradient.addColorStop(1-xPos, waveArr[waveArr.length-i-1].colour);
            }

        }

    }

    /*drawCross(ctx, largestFreqs[largestFreqs.length-1]/data.length*width, 40, 5)
    drawCross(ctx, width-largestFreqs[largestFreqs.length-1]/data.length*width, 40, 5)*/

    ctx.strokeStyle = gradient

    
    for (let x = -width/2; x < width/2; x+= sampleRate) {
        let pointAmplitude = data[i].real;
        let y = -Math.abs(pointAmplitude*4) + (height);
        
        if (Math.abs(pointAmplitude) >= noise_thresold) {
            drawArrow(ctx, x+ (width/2), y, y > height, 6);
                
            ctx.beginPath();
            ctx.moveTo(x+ (width/2), y);
            ctx.lineTo(x+ (width/2), height);
            ctx.stroke();
        }

        i = i + 1;
        
    }
}

function updateFrequencyGraph() {
    var canvas = document.getElementById("fourier");
    document.getElementById("fourier").width = window.innerWidth;
    document.getElementById("fourier").height = window.innerHeight/4;

    var context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes(context, false);
    context.save();

    fourierData = dft();

    plotFrequencyPoints2(context, fourierData);

    context.restore();
    
    window.requestAnimationFrame(updateFrequencyGraph);
}


let wave1;
let wave2;
let wave3;
let wave4;
let sumWave;

let addditionalWave;

function init() {
    window.requestAnimationFrame(updateTimeGraph);
    window.requestAnimationFrame(updateFrequencyGraph);


    wave1 = new SineWave(51, 0.0264599, 0, waveColours[0]);
    wave2 = new SineWave(43, 0.0172932, 0, waveColours[1]);
    wave3 = new SineWave(0, 0, 0, waveColours[2]);
    wave4 = new SineWave(0, 0, 0, waveColours[3]);

    sumWave = new SumWave([wave1, wave2, wave3, wave4]);

}