const matrix = require("matrix-js");
const vec = require("./vec");
const terminal = require( 'terminal-kit' ).terminal;

const HEIGHT = 61;
const WIDTH = 71;

const Colors = {
    RED: vec(255,0,0),
    GREEN: vec(0,255,0),
    BLUE: vec(0,0,255),
}

class Pixel {


    constructor(value,color=new vec(255,255,255)){
        this.color = color;
        this.red = color.x;
        this.green = color.y;
        this.blue = color.z;

        this.value = value;
    }

    setColor(color){
        this.color = color;
        this.red = color.x;
        this.green = color.y;
        this.blue = color.z;
    }

    setValue(value){
        this.value = value;
    }

    toString(){
        return `\x1b[38;2;${this.red};${this.green};${this.blue}m${this.value}\x1b[0m`;
    }

}

class customCanvas {
    constructor(width, height){
        this.width = width;
        this.height = height;

        this.canvas = [];
        for (let i = 0; i < this.height; i++){
            const row = [];
            for (let j = 0; j < this.width; j++){
                row.push(new Pixel("."));
            }
            this.canvas.push(row);
        }

        this.center = {x: Math.floor(width/2), y: Math.floor(height/2)};
    }

    set(x, y, pixel=new Pixel("▣", Colors.RED)){
        if (x > this.center.x || y > this.center.y){
            return;
        }
        // this.canvas[this.center.y-y][this.center.x+x] = "▣";
        this.canvas[this.center.y-y][this.center.x+x] = pixel;
    }

    remove(x, y){
        if (x > this.center.x || y > this.center.y){
            return;
        }
        // this.canvas[this.center.y-y][this.center.x+x] = ".";
        this.canvas[this.center.y-y][this.center.x+x] = new Pixel(".");
    }

    clear(){
        // this.canvas = Array.from(Array(this.height), () => Array(this.width).fill("."));this.canvas = [];
        this.canvas = [];
        for (let i = 0; i < this.height; i++){
            const row = [];
            for (let j = 0; j < this.width; j++){
                row.push(new Pixel("."));
            }
            this.canvas.push(row);
        }
    }

    toString(){
        // return this.canvas.map(r => r.join(" ")).join("\n");
        return this.canvas.map(r => r.join(" ")).join("\n");
    }
}

/**
 * 
 * @param {vec} v vector to convert
 * @returns {matrix} vector in matrix form
 */
function vecToMatrix(v){
    return new matrix(v.toArray().map(r => [r]));
}

/**
 * 
 * @param {matrix} A matrix to convert
 * @return {vec} matrix in vector form
 */
function matrixToVec(A){
    return vec(...A().map(r => r[0]));
}

function degreesToRadians(degree){
    return degree * Math.PI/180;
}

const canvas = new customCanvas(WIDTH, HEIGHT);
const cubePoints = Array(8);

function setup() {
    const size = 0.5;
    cubePoints[0] = new vec(size,size,-size);
    cubePoints[1] = new vec(size,-size,-size);
    cubePoints[2] = new vec(-size,-size,-size);
    cubePoints[3] = new vec(-size,size,-size);

    cubePoints[4] = new vec(size,size,size);
    cubePoints[5] = new vec(size,-size,size);
    cubePoints[6] = new vec(-size,-size,size);
    cubePoints[7] = new vec(-size,size,size);
}


let angle = 0;
function draw(){

    const rotationMatZ = new matrix([
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1]
        ]);
    const rotationMatX = new matrix([
            [1, 0, 0],
            [0, Math.cos(angle), -Math.sin(angle)],
            [0, Math.sin(angle), Math.cos(angle)]
        ]);
    const rotationMatY = new matrix([
            [Math.cos(angle), 0, Math.sin(angle)],
            [0, 1, 0],
            [-Math.sin(angle), 0, Math.cos(angle)]
        ]);

    const finalPoints = [];
    for (point of cubePoints){
        let rotated = rotationMatZ.prod(vecToMatrix(point));
        rotated = rotationMatX.prod(rotated);
        rotated = rotationMatY.prod(rotated);

        const distance = 2;
        const rotatedZ = rotated()[2][0];
        const z = 1 / (distance - rotatedZ);
        const projectionMat = new matrix([
            [z,0,0],
            [0,z,0]
        ]);

        const projection = projectionMat.prod(rotated);
        const finalPoint = matrixToVec(projection).scaled(60);

        finalPoint.x = Math.round(finalPoint.x);
        finalPoint.y = Math.round(finalPoint.y);

        finalPoints.push(finalPoint);

        canvas.set(finalPoint.x, finalPoint.y);
    }

    line(finalPoints[0], finalPoints[1]);
    line(finalPoints[1], finalPoints[2]);
    line(finalPoints[2], finalPoints[3]);
    line(finalPoints[3], finalPoints[0]);

    line(finalPoints[4], finalPoints[5]);
    line(finalPoints[5], finalPoints[6]);
    line(finalPoints[6], finalPoints[7]);
    line(finalPoints[7], finalPoints[4]);

    line(finalPoints[0], finalPoints[4]);
    line(finalPoints[3], finalPoints[7]);
    line(finalPoints[1], finalPoints[5]);
    line(finalPoints[2], finalPoints[6]);
        
}

setup();
let fps = 5;
let animationStart = performance.now();
setInterval(() => {
    process.stdout.write(canvas.toString());
    process.stdout.moveCursor(-(2*WIDTH-1),-(HEIGHT-1));
    canvas.clear();
    draw();
    // time = (performance.now() - animationStart)/1000;
}, 1000/fps);

let time = 0; 
/** calculations per second */
let cps = 60;
setInterval(() => {
    time = (performance.now() - animationStart)/1000;
    // angle += degreesToRadians(1);
    angle = degreesToRadians(Math.floor(time*50));
}, 1000/cps);

//reset terminal cursor when program ends
process.on('SIGINT', function() {
    process.stdout.moveCursor((2*WIDTH-1),HEIGHT-1);
    process.exit();
});


// const theta = Math.PI/2;
// rotationMat = new matrix([
//     [Math.cos(theta), -Math.sin(theta), 0],
//     [Math.sin(theta), Math.cos(theta), 0]
// ]);
// const point = new vec(1,0,0);
// const rotated = rotationMat.prod(vecToMatrix(point));

// console.log(rotated());

/**
   * Linear interpolation
   *
   * @param {number} t        Input
   * @param {number} tMin     Input min
   * @param {number} tMax     Input max
   * @param {number} valueMin Output min
   * @param {number} valueMax Output max
   * @returns {number}        Interpolated number
   */
function lerp(t, tMin, tMax, valueMin, valueMax) {
    return ((t - tMin) * (valueMax - valueMin)) / (tMax - tMin) + valueMin;
}

/**
 * 
 * @param {vec} center 
 * @param {number} diameter 
 */
function circle(center, diameter){

    /**
     * takes in a coordinate in the first octant and sets all octants with the mirrored coord
     * @param {number} x x component in octanct 1
     * @param {number} y y component in octanct 1
     */
    function setOctants(x, y){
        //Q1
        canvas.set(x,y);
        canvas.set(y,x);

        //Q2
        canvas.set(x,-y);
        canvas.set(y, -x);

        //Q3
        canvas.set(-x,-y);
        canvas.set(-y,-x);

        //Q4
        canvas.set(-x,y);
        canvas.set(-y,x);
    }


    const radius = Math.floor(diameter/2);
    let decision = 3-2*radius;
    let x = 0; let y = radius;
    while (x <= y){
        // console.log("before: ", x, y, decision);
        setOctants(x,y);
        
        if (decision <= 0){
            x++;
            decision = decision + 4*x + 6;
        }else{
            x++; y--;
            decision = decision + 4*(x-y) + 10;
        }
        // console.log("after: ", x, y, decision);
    }
}


/**
 * draws line on canvas from start point to end point, excludes both start and end from line
 * @param {vec} start start point
 * @param {vec} end end point
 */
function line(start, end) {
    let {x: x0, y: y0} = start;
    let {x: x1, y: y1} = end;

    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    // console.log("first:", x0, y0);
    // canvas.setSymbol(x0, y0, "*");

    while(!((x0 == x1) && (y0 == y1))) {
        let e2 = err << 1; //err << 1 == err * 2

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
        
        if (y0 != y1 || x0 != x1){//excludes last point
            canvas.set(x0, y0, new Pixel("*", Colors.RED));
        }
    }
    // console.log("last:", x0, y0);
}


// const x0 = -3; const y0 = 3; const x1 = 3; const y1 = 3;
// const x0 = 3; const y0 = 3; const x1 = 3; const y1 = -3;
// canvas.set(x0,y0);
// canvas.set(x1,y1);
// line(new vec(x0,y0), new vec(x1,y1));
// circle(new vec(0,0), 9);
// console.log(canvas.toString());