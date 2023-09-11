// Holder for a GNS Electronic GNS3000 GPS receiver

// dimensions of the receiver
let gnsLength = 79.25;
let gnsWidth  = 45.25;
let gnsDepth  = 11.4;

// dimensions of the holder
let tolerance = 0.5;    // tolerance for holder
let hDepth = 2.0 ;      // thickness of holder 

// add tolerance to main dimensions
gnsLength = gnsLength + tolerance;
gnsWidth = gnsWidth + tolerance;
gnsDepth = gnsDepth + tolerance;

// model the receiver
let gnsBox = Box(gnsLength, gnsWidth, gnsDepth, false);
    // round edges 11,10,8,9
    let gnsRadius = gnsDepth/2 - tolerance; 
    let gnsBoxRounded = FilletEdges(gnsBox,gnsRadius,[8,9,10,11],false);

// model the holder

// create a hollow shape modelled around the receiver
let holder = Offset(gnsBoxRounded,2,0.01,true);
holder = Difference(holder,[gnsBoxRounded]);

// cut out some  material to allow insertion of the receiver
    let cutterDepth = 10;
let cutterTop = Box(gnsLength+cutterDepth,gnsWidth+cutterDepth,gnsDepth+cutterDepth,false);
cutterTop = Translate([-cutterDepth/2,-cutterDepth/2,gnsDepth*0.80], cutterTop);

let cutterSides = Box(gnsLength*0.80,gnsWidth*1.2,gnsDepth+2,true)
cutterSides = (Offset(cutterSides,4));
cutterSides = Translate([gnsLength/2,gnsWidth/2,gnsDepth/2+7],cutterSides)
let cutterBottom = Box(gnsLength,gnsWidth*0.7,gnsDepth+2,true)
cutterBottom = Offset(cutterBottom,4)
cutterBottom = Translate([gnsLength/2+hDepth+4,gnsWidth/2,gnsDepth/2+7],cutterBottom)

// create two holes for a lanyard
let cutterLanyard = Rotate([0,1,0],90,Cylinder(2,hDepth*3,true))
let cutterLanyard1 = Translate([0,gnsWidth/2+3,gnsDepth/2],cutterLanyard,true);
let cutterLanyard2 = Translate([0,gnsWidth/2-3,gnsDepth/2],cutterLanyard,false);
holder = Difference(holder,[cutterTop,cutterSides,cutterBottom,cutterLanyard1,cutterLanyard2])
holder = Translate([0,0,hDepth],holder)
holder = FilletEdges(holder,0.5,[41])  // side 1
holder = FilletEdges(holder,0.5,[115]) // side 2 
holder = FilletEdges(holder,0.5,[173]) // top1
holder = FilletEdges(holder,0.5,[8]) // top2
holder = FilletEdges(holder,0.5,[67])  // between tops
holder = FilletEdges(holder,0.5,[176]) // bottom
holder = FilletEdges(holder,0.5,[120,122]) // holes outside
holder = FilletEdges(holder,0.5,[13,2]) // holes inside

// I tried rounding the top edges but this failed as the edges were renumbered every time

// option: create a strip to tie the receiver with tie wraps to something else
// let stripLength = 10
// let strip = Box(gnsLength+2*stripLength,20,hDepth,true)
// strip = FilletEdges(strip,hDepth/2,[9,5,11,1])
// strip = Translate([(gnsLength/2),gnsWidth/2,hDepth/2],strip)
