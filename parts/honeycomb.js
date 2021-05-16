// Welcome to Cascade Studio!   Here are some useful functions:
//  Translate(), Rotate(), Scale(), Union(), Difference(), Intersection()
//  Box(), Sphere(), Cylinder(), Cone(), Text3D(), Polygon()
//  Offset(), Extrude(), RotatedExtrude(), Revolve(), Pipe(), Loft(), 
//  FilletEdges(), ChamferEdges(),
//  Slider(), Button(), Checkbox()

// Don't forget to push imported or oc-defined shapes into sceneShapes to add them to the workspace!

// sceneShapes.push(externalShapes['honeycomb.stl'])
// sceneShapes.push(externalShapes['hexagon.step'])

// function to draw a wire of a hexagon
function Hexagon(size)
{ 
    let sketchHexagon 
    for(let i = 0 ; i <= 5 ; i += 1)
    {
        const angle = i * 2 * Math.PI / 6
        const xvalue = size * Math.sin(angle);
        const yvalue = size * Math.cos(angle);
        const point = [xvalue,yvalue];

        if (i === 0)
        {
            sketchHexagon = new Sketch(point)
        }
        else 
        {
        sketchHexagon.LineTo(point)
        }    
    }
return sketchHexagon.End(true)
}


// function to draw a walled hexagon
function WalledHexagon(size, wT)
{ 
    let sketchWalledHexagon ;
    for(let outer = 0 ; outer <= 1 ; outer ++)
    {
        for(let i = 0 ; i <= 6 ; i += 1)
        {
            const angle = i * 2 * Math.PI / 6
            const xvalue = size * Math.sin(angle);
            const yvalue = size * Math.cos(angle);
            const oxvalue = (size + wT) * Math.sin(angle);
            const oyvalue = (size + wT) * Math.cos(angle);
            const point = [xvalue,yvalue];
            // note the minus for the x-coordinate to make it
            // rotate in reverse! 
            const opoint = [-oxvalue, oyvalue];

            if (i === 0)
            {
                if (outer === 0)
                {
                    sketchWalledHexagon = new Sketch(point);
                }
                else 
                {
                    sketchWalledHexagon.LineTo(opoint);
                }
            }
            else 
            {
                if (outer === 0)
                {
                    sketchWalledHexagon.LineTo(point);
                }
                else
                {
                    sketchWalledHexagon.LineTo(opoint);
                };
            };
        };       
    };
    sketchWalledHexagon.LineTo([0,size]);
    return sketchWalledHexagon.End(false).Face();
}

// dimensions of honeycomb, the cellSize is the inner radius of the inscribed circle
let cellSize = 4;
let wallThickness = 1;







// create a wire from the sketch
function fwireCell(cellSize,wallThickness)
{
let wireCell = Translate([-40,0,0],(Hexagon(cellSize).Wire()));
wireCell = wireCell + Translate([-40,0,0],(Hexagon(cellSize + wallThickness).Wire()));
return wireCell
}

fwireCell(cellSize,wallThickness)

// construct a solid hexagonal column 
// ====================================
// create face from the hexagon sketch
let faceCell = (Hexagon(cellSize).Face())
let HCell = Extrude(faceCell, [0,0,20]);

// create delta x and delta y steps for the grid 
let delta_x = (0.5 * Math.sqrt(3)) * (cellSize + (0.5 * wallThickness))
let delta_y = (cellSize * 1.5)  + (0.5 * Math.sqrt(3) * wallThickness)


// create honeycomb by subtracting solid columns from a box
// =========================================================
// number of rows and columns of the honeycomb that is generated
// note that with large numbers the generation can take a long time! 

// 4x4 matrix => 9 seconds
// 5x5 matrix => 17 seconds
// 8x8 matrix => 90 seconds
//

let rowNumber = 4;
let colNumber = 4;

// draw a box to subtract the hexagonal columns that are created below 
let boxSize = 1.6 * rowNumber * (cellSize + wallThickness);
let base = Box(boxSize, 0.866 * boxSize, 10); 

// create rows and columns of solid hexagonal columns
for (let colCount = 0 ;  colCount <= colNumber ; colCount += 1)
{
    for(let rowCount = 0 ; rowCount <= rowNumber; rowCount += 1)
        {
        let One = Translate([rowCount * 2 * delta_x, colCount * 2 * delta_y,0], HCell)       ;
        let Two = Translate([(1 + rowCount * 2) * delta_x, (1+ (colCount * 2)) * delta_y ,0], HCell);       
        base = Difference( base , [One, Two] )
}
}

// create honeycomb face by performing a union of extruded walled hexagons

// create face from walled hexagon sketch
let facewalledHexagon = WalledHexagon(cellSize,wallThickness)

let col1 = Extrude(Translate([-40,40,0],facewalledHexagon),[0,0,15])
let col2 = Extrude(Translate([-40 + (2 * delta_x) ,40,0],facewalledHexagon),[0,0,15])
let col3 = Union([col1,col2],false);
let col4 = Translate([delta_x,delta_y,0],col3,true)
let col5 = Union([col3,col4],false);


// experiment: create a union of the faces first and then extrude it
// EXPERIMENT FAILS !!
let walls1 = Translate([-60,20,0],facewalledHexagon);
let walls2 = Translate([-60 + (2 * delta_x) ,20,0],facewalledHexagon);

Extrude(walls1,[0,0,10])
// let walls4 = Translate([-60 + delta_x ,20 + delta_y,0],facewalledHexagon);
// let walls5 = Union(walls3,walls4);
//
// let walls6 = Extrude(walls5,[0,0,35])
