// holder for felt on chair

let innerDiameter      = 14 ;  // thickness of pipe of the furniture
let thickness          = 1.5 ; // 
let outerLength        = 30;   // length of holder
let delta               = 4;   // extra length to avoid overlapping edges in booleans
let nippleDiameter     = 2.5;  // nipple to hold holder in place
let nippleHeight        = 3;   // diameter of nipple
let extraHeight        = 1 ;   // extra height above thickness on underside
let extraWidth          = 2;   // extra width of holder
let gliderRadius        = 1;   // 
let innerLength        = outerLength + delta; 



let innerRadius = innerDiameter/2; 
let outerRadius = innerRadius + thickness;

let innerCylinder = Translate([0,0,extraHeight+outerRadius],Rotate([0,1,0],90,Cylinder(innerRadius,innerLength,true)));
let outerCylinder = Translate([0,0,extraHeight+outerRadius],Rotate([0,1,0],90,Cylinder(outerRadius,outerLength,true)));
let gliderBox = Box(2*outerRadius+extraHeight,2*outerRadius+extraWidth,outerLength,true);
let outerBox =  Translate([0,0,outerRadius],Rotate([0,1,0],90,gliderBox));
let cutBox   = Box(2*outerRadius , 2*outerRadius+delta, innerLength, true);

let nipple = Cylinder(nippleDiameter/2, extraHeight + thickness + nippleHeight);
nipple = FilletEdges(nipple,nippleDiameter/2,[0],false);


cutBox = Rotate([0,1,0],90,cutBox);
cutBox = Translate([0,0,2*outerRadius+delta+extraHeight],cutBox);

let glider = Union([outerBox,outerCylinder],false);
glider = Difference(glider,[innerCylinder],false);
glider = Difference(glider,[cutBox],false);
glider = FilletEdges(glider,gliderRadius,[0,1,2,3,4,5,6,7,9,10,12,13,14,15,16,17],false);
glider = Union([glider,nipple]);

