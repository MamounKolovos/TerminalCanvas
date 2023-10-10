const line = require("./line.js");
class Cube{
    constructor(size){

        this.points = new Array(8);
        this.lines = new Array(12);

        if (size < 0){
            throw new Error("Please enter a positive integer size value!");
        }

        this.size = size;

        points[0] = new vec(size,size,-size);
        points[1] = new vec(size,-size,-size);
        points[2] = new vec(-size,-size,-size);
        points[3] = new vec(-size,size,-size);

        points[4] = new vec(size,size,size);
        points[5] = new vec(size,-size,size);
        points[6] = new vec(-size,-size,size);
        points[7] = new vec(-size,size,size);
        
        
        lines[0] = new line(finalPoints[0], finalPoints[1]);
        lines[1] = new line(finalPoints[1], finalPoints[2]);
        lines[2] = new line(finalPoints[2], finalPoints[3]);
        lines[3] = new line(finalPoints[3], finalPoints[0]);

        lines[4] = new line(finalPoints[4], finalPoints[5]);
        lines[5] = new line(finalPoints[5], finalPoints[6]);
        lines[6] = new line(finalPoints[6], finalPoints[7]);
        lines[7] = new line(finalPoints[7], finalPoints[4]);

        lines[8] = new line(finalPoints[0], finalPoints[4]);
        lines[9] = new line(finalPoints[3], finalPoints[7]);
        lines[10] = new line(finalPoints[1], finalPoints[5]);
        lines[11] = new line(finalPoints[2], finalPoints[6]);
    }

    draw(canvas){

    }

}