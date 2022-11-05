const waveColours = ["#238636", '#38a6ff', '#a37907', '#4c32a8']
const NOISE_THRESHOLD = 6;

function drawAxes(ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var xMin = 0;
    
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    
    // X-Axis
    ctx.moveTo(xMin, height/2);
    ctx.lineTo(width, height/2);
    
    // Y-Axis
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2, height);
    
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

    ctx.lineWidth = 2;
    
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
let drawSamples = true;
function drawSamplingPoints(ctx, wave, sampleFrequency){
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF00FF";
    
    var y = 0;

    let sampleRate = width/sampleFrequency;

    sampleData = [];
    
    for (let x = -width/2; x < width/2; x+= sampleRate) {

        let waveAmplitude = wave.getPositionAtTime(x, width)
        y = - waveAmplitude + (height/2);

        sample = y;
        sampleData.push(sample);
        
        if (drawSamples) {
            drawCross(ctx, x+width/2, y);
        }
        
    }
}


function updateTimeGraph() {

    var canvas = document.getElementById("canvas");
    document.getElementById("canvas").width = window.innerWidth;
    document.getElementById("canvas").height = window.innerHeight/2.9;

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

function drawCross(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 3, y + 3);
    ctx.lineTo(x - 3, y - 3);
    ctx.moveTo(x, y);
    ctx.lineTo(x - 3, y + 3);
    ctx.lineTo(x + 3, y - 3);
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

function plotFrequencyPoints(ctx, data) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF00FF";
    
    for (let i = 1; i < data.length; i++) {
        
        let pointAmplitude = data[i].real;
        
        let x = i * width/data.length;

        let y = pointAmplitude*4 + (height/2);

        if (Math.abs(pointAmplitude) > NOISE_THRESHOLD) {
            drawArrow(ctx, x, y, y > height/2, 5);
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, height/2);
            ctx.stroke();
        }
        
    }
}

function updateFrequencyGraph() {
    var canvas = document.getElementById("fourier");
    document.getElementById("fourier").width = window.innerWidth;
    document.getElementById("fourier").height = window.innerHeight/4;

    var context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes(context);
    context.save();

    plotFrequencyPoints(context, fourierData);

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


    wave1 = new SineWave(50, 0.002, 0, waveColours[0]);
    wave2 = new SineWave(0, 0, 0, waveColours[1]);
    wave3 = new SineWave(0, 0, 0, waveColours[2]);
    wave4 = new SineWave(0, 0, 0, waveColours[3]);

    sumWave = new SumWave([wave1, wave2, wave3, wave4]);

}