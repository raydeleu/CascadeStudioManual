// Three armed lever

function Dxy(currentPoint,dx,dy)
{ 
    let newPoint = []; 
    newPoint[0]  = currentPoint[0] + dx;
    newPoint[1]  = currentPoint[1] + dy; 
    return newPoint
}

function Dx(currentPoint,dx)
{ 
    let newPoint = []; 
    newPoint[0]  = currentPoint[0] + dx;
    newPoint[1]  = currentPoint[1] ; 
    return newPoint
}

function Dy(currentPoint,dy)
{ 
    let newPoint = []; 
    newPoint[0]  = currentPoint[0];
    newPoint[1]  = currentPoint[1] + dy; 
    return newPoint
}

function Polar(currentPoint,distance,angleDegToX)
{ 
    let newPoint = []; 
    let angleRad = angleDegToX * Math.PI/180;
    newPoint[0]  = currentPoint[0] + (distance * Math.cos(angleRad));
    newPoint[1]  = currentPoint[1] + (distance * Math.sin(angleRad)); 
    return newPoint
}

function PolarX(currentPoint,xdistance,angleDegToX)
{ 
    let newPoint = []; 
    let angleRad = angleDegToX * Math.PI/180;
    newPoint[0]  = currentPoint[0] + xdistance;
    newPoint[1]  = currentPoint[1] + xdistance * Math.tan(angleRad); 
    return newPoint
}

function PolarY(currentPoint,ydistance,angleDegToX)
{ 
    let newPoint = []; 
    let angleRad = angleDegToX * Math.PI/180;
    newPoint[0]  = currentPoint[0] + ydistance/Math.tan(angleRad);
    newPoint[1]  = currentPoint[1] + ydistance; 
    return newPoint
}

function RadiusArc(currentPoint,endPoint,radius, clockwise)
{
    let midPoint = [];
    let dx = endPoint[0] - currentPoint[0];
    let dy = endPoint[1] - currentPoint[1];
    let dist = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    let alpha = Math.asin(dy/dist);
    let beta  = Math.asin((dist/2)/radius);
    let sag = radius - (Math.cos(beta) * radius)
    if (dx<0){clockwise = !clockwise}
    if (clockwise == true)
    {
    midPoint[0] = currentPoint[0] + dx/2 - Math.sin(alpha)*sag;
    midPoint[1] = currentPoint[1] + dy/2 + Math.cos(alpha)*sag; 
    }
    else
    {
    midPoint[0] = currentPoint[0] + dx/2 + Math.sin(alpha)*sag;
    midPoint[1] = currentPoint[1] + dy/2 - Math.cos(alpha)*sag;
    }
    return midPoint
}


function SagArc(currentPoint,endPoint,sag,clockwise)
{
    let midPoint = [];
    let dx = endPoint[0] - currentPoint[0];
    let dy = endPoint[1] - currentPoint[1];
    let dist = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    let alpha = Math.asin(dy/dist);
    if (dx<0){clockwise = !clockwise}
    if (clockwise == true)
    {
    midPoint[0] = currentPoint[0] + dx/2 - Math.sin(alpha)*sag;
    midPoint[1] = currentPoint[1] + dy/2 + Math.cos(alpha)*sag; 
    }
    else
    {
    midPoint[0] = currentPoint[0] + dx/2 + Math.sin(alpha)*sag;
    midPoint[1] = currentPoint[1] + dy/2 - Math.cos(alpha)*sag;
    }
    return midPoint
}

function MirrorX(currentPoint, yvalue)
    {
        let mirrorPoint = [];    
        mirrorPoint[0] = currentPoint[0];
        mirrorPoint[1] = yvalue - (currentPoint[1]-yvalue);
        return mirrorPoint
    }

function MirrorY(currentPoint, xvalue)
    {
        let mirrorPoint = [];    
        mirrorPoint[0] = xvalue - (currentPoint[0]-xvalue);
        mirrorPoint[1] = currentPoint[1];
        return mirrorPoint
    }

// testing function to check if sketching commands work correctly
// let q0 = [0,0]
// let q1= [50,0]
// let q1a = SagArc(q0,q1,5,false)
// let q2= [50,50]
// let q2a = SagArc(q1,q2,5,false)
// let q3= [0,50]
// let q3a= SagArc(q2,q3,5,false)
// let q4= [0,0]
// let q4a= SagArc(q3,q4,5,false)

// let qsketch=new Sketch(q0)
// .ArcTo(q1a,q1)
// .ArcTo(q2a,q2)
// .ArcTo(q3a,q3)
// .ArcTo(q4a,q4)
// .End().Face()

// Box(10,10,10,false) // can be used to determine position of the axes. 

// parameters that define the design intent
let d       = 60; // distance center to radius of arm
let r0      = 10; // radius top of arm
let adeg    = 8; // widening angle of arm
let arad    = adeg * Math.PI/180; 
let d1      = d + Math.sin(arad)*r0
let r1      = 15; // inner radius of center cylinder
let t1      = 5 ; // wall thickness of center cylinder  
let h1      = 37; // height of inner cylinder
let h2      = 10; // height at end of the arm
let gamma   = 20; // angle deg from tip of arm to cylinder
let r2      = 25; // radius of fillets between arms
let t3      = 7 ; // wallthickness arms
let r3      = 8; // cylinder at end of arms
let r4      = 1.5 // rounding of cutout
let ra      = 2.5 // radius of hole at end of arm
let rcb     = 5   // radius of counterbore 
let hcb     = 7   // height of counterbore

// generate center cylinder
let centerCyl0   = Translate([0,0,h1/2],Cylinder((r1+t1),h1,true))
let armCyl      = Translate([0,d,h1/2], Cylinder(r3,h1,true))

// points for sketch of the arm
let p0 = [0,0];
let p1 = Dy(p0, d);
let p2 = Polar(p1,r0,adeg);
let p3 = MirrorY(p2,0);
let p4 = RadiusArc(p2,p3,r0,false);
let p5 = PolarY(p2,-d1,adeg-90)
let p6 = MirrorY(p5,0)

// generate sketch of one arm 
let armSketch = new Sketch(p0)
.LineTo(p5)
.LineTo(p2)
.ArcTo(p4,p3)
.LineTo(p6)
.LineTo(p0)
.End().Face()
let arm1        = Extrude(armSketch,[0,0,h1]);
let armCutout   = Offset(arm1,-t3,0.01,true);
let armCutout1  = Difference(armCutout,[centerCyl0,armCyl]);
let armCutout2  = Translate([0,0,h1/2],armCutout1,true);
let armCutout3  = Translate([0,0,-h1/2],armCutout1,true);
armCutout  = Union([armCutout1,armCutout2,armCutout3]);
armCutout  = Offset(armCutout,-r4);
armCutout  = Offset(armCutout,r4);
arm1        = Difference(arm1,[armCutout]);

// copy three rotated arms
let arm2 = Rotate([0,0,1],120,arm1,true)
let arm3 = Rotate([0,0,1],240,arm1,true)

let arms = Union([arm1,arm2,arm3])
arms = FilletEdges(arms, r2, [34,39,61])

// create sketch of cutting object to taper arms
let pc0 = [d+r0+5,h2]
let pc1 = [d+r0,h2];
let pc2 = PolarX(pc1, -(r0+d)+(r1+t1),(180-gamma));
let pc3 = Dx(pc2,-t1-r1/2)
let pc4 = Dy(pc3,h1);
let pc5 = Dx(pc4,d+r0+10);
let pc6 = pc0;

let cutterSketch = new Sketch(pc0)
.LineTo(pc0)
.LineTo(pc1)
.LineTo(pc2)
.LineTo(pc3)
.LineTo(pc4)
.LineTo(pc5)
.LineTo(pc6)
.End().Face(true);
let cutterFace = Rotate([1,0,0],90,cutterSketch);
let cutterShape= Revolve(cutterFace,false,false);
let cutterShape1 = RemoveInternalEdges(cutterShape);
let shapedArms = Difference(arms,[cutterShape1]);
shapedArms = FilletEdges(shapedArms,1.5,[51])

let centerCyl1  = Translate([0,0,h1/2],Cylinder((r1+t1-2),h1,true))
let centerHole  = Translate([0,0,h1/2],Cylinder((r1),h1+20,true))
let armHole     = Translate([0,d,h1/2],Cylinder((ra),h1+20,true))
let countHole   = Translate([0,d,hcb],Cylinder((rcb),h1+20,false))
let armHoleCb1   = Union([countHole,armHole])
let armHoleCb2 = Rotate([0,0,1],120,armHoleCb1,true)
let armHoleCb3 = Rotate([0,0,1],240,armHoleCb1,true)



let armsTot     = Union([shapedArms,centerCyl1])
let armsTot1    = Difference(armsTot,[centerHole]);
let armsTot2    = Difference(armsTot1,[armHoleCb1,armHoleCb2,armHoleCb3]);







