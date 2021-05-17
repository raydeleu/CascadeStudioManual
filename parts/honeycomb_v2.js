// Function to draw a zig-zag line of a honeycomb
// d = edge length of hexagon
// t = wall thickness between hexagons
// n = number of zig-zags (= 2 cells)

function HoneycombRow(d,t,n)
{   
    let x0 = 0;
    let y0 = 0;

    let strip = new Sketch([x0, y0]);

    for(let i = 0 ; i < n ; i += 1)
    {
        let x1 = x0 + d + t;
        let y1 = y0 + 0;
        let x2 = x1 + (Math.cos(Math.PI/3)*d);
        let y2 = y1 - (Math.sin(Math.PI/3)*d);
        let x3 = x2 + d;
        let y3 = y2 + 0;
        let x4 = x3 + (Math.cos(Math.PI/3)*d);
        let y4 = y3 + (Math.sin(Math.PI/3)*d);

        strip.LineTo( [ x1 ,y1 ] );
        strip.LineTo( [ x2 ,y2 ] );
        strip.LineTo( [ x3 ,y3 ] );
        strip.LineTo( [ x4 ,y4 ] );
        x0 = x4;
        y0 = y4;
    }
    
        let xcur = x0;
        let ycur = y0;
        let xnext = xcur + (Math.cos(Math.PI/3)*t)
        let ynext = ycur - (Math.sin(Math.PI/3)*t)
        strip.LineTo([xnext,ynext])
        x0 = xnext;
        y0 = ynext;

    for(let j = 0 ; j < n ; j += 1)
    {
        let x1 = x0 - (Math.cos(Math.PI/3)*d);
        let y1 = y0 - (Math.sin(Math.PI/3)*d);
        let x2 = x1 - d - t;
        let y2 = y1 + 0;
        let x3 = x2 - (Math.cos(Math.PI/3)*d);
        let y3 = y2 + (Math.sin(Math.PI/3)*d);
        let x4 = x3 - d;
        let y4 = y3 - 0;

        strip.LineTo( [ x1 ,y1 ] );
        strip.LineTo( [ x2 ,y2 ] );
        strip.LineTo( [ x3 ,y3 ] );
        strip.LineTo( [ x4 ,y4 ] );
        x0 = x4;
        y0 = y4;
    }
    // strip.LineTo([-50,-50]);
    strip.LineTo([0,0]);
    strip.End(false);

    return strip.Face(true)

}

// Function to create a full grid

// d= side length of hexagon
// t= wall thickness between cells
// h= height of generated honeycomb
// n= number of columns (length of row)
// m= number of rows

function HoneycombGrid(d,t,h, n,m)
{
   
   let row_half = Extrude(HoneycombRow(d,t,n),[0,0,h]);
   let row_mirror  = Translate([0,Math.sin(Math.PI/3)*(-t),20], Rotate([1,0,0],180,row_half));
   let row = Union([row_half,row_mirror])
   let grid;

   for(let k=0 ; k < m-1 ; k += 1 )
   {
       let row0 = row;
       let row1 = Translate([0, 2 * Math.sin(Math.PI/3) * d, 0], row, true)
       grid = Union([row0,row1]);
       row = grid;
   }

    return grid

}

// Test of functions defined above

let t = 1;
let d = 5;
let n = 6;
let m = 6; 
let h = 20;

HoneycombGrid(d,t,h,n,m);

