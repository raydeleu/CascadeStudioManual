// input parameters
let d = 8;      // M8 nut diameter of the screw
let f = 13;     // DIN 13mm wrench width across flats
let h = 6.5;    // height of nut

// derived parameters
let g = f / Math.cos(Math.PI/6);  // width across corners

// disk with chamfer
let nutBody = Cylinder(g/2,0.8*h,true)
let nutChamferT = Translate([0,0,0.8*h/2],Cone(g/2 ,0.8*g/2, 0.1*h,false))
let nutChamferB = Translate([0,0,-0.8*h/2],Rotate([1,0,0],180,Cone(g/2,0.8*g/2,0.1*h, false)))
let nutBodyBase = Union([nutBody, nutChamferT, nutChamferB], false)

// hexagon rod
let box1 = Box(g/2,f,1.1*h,true)
let box2 = Rotate([0,0,1],60,Box(g/2,f,1.1*h,true))
let box3 = Rotate([0,0,1],120,Box(g/2,f,1.1*h,true))
let hexagon = Union([box1, box2, box3], false, 0.01, false);

// intersection of disk and hexagon
let nutShape = Intersection([nutBodyBase,hexagon],false, 0.01,false)

// cutting hole
let cutterHole = Cylinder(d/2,h*3,true)
let nut = Difference(nutShape, [cutterHole])
let lowerNut= Translate([0,0,g/2],Rotate([0,1,0],90,nut))

// create section through nut
let upperNut= Translate([0,0,h*3.5], nut)
let cutter = Translate([0,-g,0],Box(30,48,h*4,false))
Difference(upperNut,[cutter])