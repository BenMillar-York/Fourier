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

function plotFunction(ctx, wave) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineWidth = 2;
    
    var y = 0;
    ctx.beginPath();
    for (let x = -width/2; x < width/2; x++) {

        y = - wave.getPositionAtTime(x, width);

        ctx.lineTo(x+(width/2), y + (height/2));
    }

    ctx.stroke();
    ctx.save();

}

let sampleData = [];
function drawSamplingPoints(ctx, wave, sampleFrequency){
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF00FF";
    
    var y = 0;

    let sampleRate = width/sampleFrequency;

    sampleData = [];
    
    for (let x = -width/2; x < width; x+= sampleRate) {

        let waveAmplitude = wave.getPositionAtTime(x, width)
        let wavePosition = (x-width/2)
        y = - waveAmplitude + (height/2);

        sample = y;
        sampleData.push(sample);
        drawCross(ctx, x, y);
        
    }
}

function updateTimeGraph() {

    var canvas = document.getElementById("canvas");
    document.getElementById("canvas").width = window.innerWidth;
    document.getElementById("canvas").height = window.innerHeight/3;

    var context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes(context);
    context.save();

    wave1 = new SineWave(50, 20, 0);
    plotFunction(context, wave1);
    fourierData = dft()

    let sampleFrequency = document.getElementById("sample-frequency-slider").value;
    drawSamplingPoints(context, wave1, sampleFrequency);

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

function plotPoints(ctx, data) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#FF00FF";
    
    for (let i = 0; i < data.length; i++) {
        
        let pointAmplitude = data[i].real;
        
        let x = i * width/data.length;
        let y = pointAmplitude + (height/2);
        drawCross(ctx, x, y);
    }
}

function updateFrequencyGraph() {
    var canvas = document.getElementById("fourier");
    document.getElementById("fourier").width = window.innerWidth;
    document.getElementById("fourier").height = window.innerHeight/3;

    var context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes(context);
    context.save();

    plotPoints(context, fourierData);

    context.restore();
    
    window.requestAnimationFrame(updateFrequencyGraph);
}


function init() {
    window.requestAnimationFrame(updateTimeGraph);
    window.requestAnimationFrame(updateFrequencyGraph);
}