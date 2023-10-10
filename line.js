class Line {
    constructor(start, end){
        this.start = start;
        this.end = end;
    }

    draw(canvas){
        let {x: x0, y: y0} = this.start;
        let {x: x1, y: y1} = this.end;

        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = (x0 < x1) ? 1 : -1;
        const sy = (y0 < y1) ? 1 : -1;
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

}


module.exports = Line;