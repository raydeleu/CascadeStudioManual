// Replicad Code to create a forked lever 
// inspired by ModelMania shape 2010 and 
// exercise created by JokoEngineering 

function main({Sketcher, sketchCircle})
{
// Parameters

let t1                  = 8;
let t2                  = 10;
let t3                  = 5;
let sep                 = 40 ;

let radius_1            = 30;
let radius_2            = 12;
let distance            = 120;
let wall_thickness      = 5;
let lever_height        = 2*sep + (4*t1); 
let fillet_cutout       = 5;
let fillet_outer        = 1;
let fillet_arms         = 5;
let depth               = lever_height + fillet_cutout;
let chamfer             = 1;
let angle               = Math.atan((sep/2+t1-t2/2)/(distance - radius_1 - radius_2 - 2*t3))*180/Math.PI; 

// function Polar(currentPoint,distance,angleDegToX)
// {
//     let newPoint = [];
//     angleRad = angleDegToX * Math.PI/180;
//     newPoint[0]  = currentPoint[0] + distance * Math.cos(angleRad);
//     newPoint[1]  = currentPoint[1] + distance * Math.sin(angleRad);
//     return newPoint
// }

// function PolarX(currentPoint,xdistance,angleDegToX)
// {
//     let newPoint = [];
//     let angleRad = angleDegToX * Math.PI/180;
//     newPoint[0]  = currentPoint[0] + xdistance;
//     newPoint[1]  = currentPoint[1] + xdistance * Math.tan(angleRad);
//     return newPoint
// }

function PolarY(currentPoint,ydistance,angleDegToX)
{
    let newPoint = [];
    let angleRad = angleDegToX * Math.PI/180;
    newPoint[0]  = currentPoint[0] + ydistance/Math.tan(angleRad);
    newPoint[1]  = currentPoint[1] + ydistance;
    return newPoint
}

function Lever(radius1, radius2, distance, leverheight, wall_thickness)
{
    let sinus_angle = (radius1 - radius2) / distance
    let angle = Math.asin(sinus_angle);

    // points of outer contour of the lever
    let p1 = [radius1 * Math.sin(angle), radius1 * Math.cos(angle)];
    let p2 = [distance + radius2 * Math.sin(angle), radius2 * Math.cos(angle)];
    let p3 = [distance + radius2, 0];
    let p4 = [distance + radius2 * Math.sin(angle), - radius2 * Math.cos(angle)];
    let p5 = [radius1 * Math.sin(angle), - radius1 * Math.cos(angle)];
    let p6 = [- radius1, 0 ];

    let sketchLever = new Sketcher("XY").movePointerTo(p1).lineTo(p2)
    sketchLever = sketchLever.threePointsArcTo(p4,p3)
    sketchLever = sketchLever.lineTo(p5)
    sketchLever = sketchLever.threePointsArcTo(p1,p6)
    sketchLever = sketchLever.close();
              
    let leverbody = sketchLever.extrude(leverheight);
   
    let big_hole = sketchCircle(radius1-wall_thickness).extrude(leverheight + 10);
    let small_hole =  sketchCircle(radius2-wall_thickness).extrude(leverheight + 10).translate([distance,0,0]);
    let lever   = leverbody.cut(big_hole)
    lever       = lever.cut(small_hole);
    
    return lever
}

function Cutout(radius1, radius2, distance, leverheight, wall_t,innerRadius1,innerRadius2)
{
    let sinus_angle = (radius1 - radius2) / distance
    let angle = Math.asin(sinus_angle);

    radius1 = radius1 - wall_t
    radius2 = radius2 - wall_t

    // points of outer contour of the lever
    let p1 = [radius1 * Math.sin(angle), radius1 * Math.cos(angle)];
    let p2 = [distance + radius2 * Math.sin(angle), radius2 * Math.cos(angle)];
    let p3 = [distance + radius2, 0];
    let p4 = [distance + radius2 * Math.sin(angle), - radius2 * Math.cos(angle)];
    let p5 = [radius1 * Math.sin(angle), - radius1 * Math.cos(angle)];
    let p6 = [- radius1, 0 ];

    let innerLever = new Sketcher("XY").movePointerTo(p1).lineTo(p2)
    innerLever = innerLever.threePointsArcTo(p4,p3)
    innerLever = innerLever.lineTo(p5)
    innerLever = innerLever.threePointsArcTo(p1,p6)
    innerLever = innerLever.close();
              
    let innerLeverBody = innerLever.extrude(leverheight);

    let big_hole = sketchCircle(innerRadius1).extrude(leverheight + 10);
    let small_hole =  sketchCircle(innerRadius2).extrude(leverheight + 10).translate([distance,0,0]);
    let cutout   = innerLeverBody.cut(big_hole)
    cutout       = cutout.cut(small_hole);
   
    return cutout;    
}


function SideView(radius1,radius2,distance,sep,t1,t2,t3)
{
    // sketch of sideview
    let p1 =  [-radius1-t3,sep/2];
    let p2 =  [-radius1-t3,sep/2+t1];
    let p3 =  [radius1+t3,sep/2+t1];
    let p4 =  [distance-radius2-t3,t2/2];
    let p5 =  [distance+radius2+t3,t2/2];
    let p6 =  [distance+radius2+t3,-t2/2]; 
    let p7 =  [distance-radius2-t3,-t2/2];
    let p8 =  [radius1+t3,-sep/2-t1];
    let p9 =  [-radius1-t3,-sep/2-t1];
    let p10 = [-radius1-t3,-sep/2];
    let p11 = [radius1+t3,-sep/2];
    let p12 = PolarY(p11,sep/2,angle);
    let p13 = [radius1+t3,sep/2];
    let p14 = [-radius1-t3,sep/2];
    
    
    let sideShape = new Sketcher("XZ").movePointerTo(p1)
    sideShape = sideShape.lineTo(p2)
    sideShape = sideShape.lineTo(p3)
    sideShape = sideShape.lineTo(p4)
    sideShape = sideShape.lineTo(p5)
    sideShape = sideShape.lineTo(p6)
    sideShape = sideShape.lineTo(p7)
    sideShape = sideShape.lineTo(p8)
    sideShape = sideShape.lineTo(p9)
    sideShape = sideShape.lineTo(p10)
    sideShape = sideShape.lineTo(p11)
    sideShape = sideShape.lineTo(p12)
    sideShape = sideShape.lineTo(p13)
    sideShape = sideShape.lineTo(p14)
    sideShape = sideShape.close()
  
    return sideShape
}


// // Rollback stack
let myLever             = Lever(radius_1,radius_2,distance,lever_height,wall_thickness);
let cutoutShape         = Cutout(radius_1, radius_2, distance, lever_height, wall_thickness,radius_1,radius_2);
cutoutShape             = cutoutShape.fillet(fillet_cutout, (e)=>e.inDirection("Z"))
myLever                 = myLever.cut(cutoutShape)   
let sideview            = SideView(radius_1,radius_2,distance,sep,t1,t2,t3);
sideview                = sideview.extrude(radius_1*2).translate([0,radius_1,lever_height/2])
sideview                = sideview.fillet(fillet_arms,(e)=>e.inDirection("Y").inBox([0,-radius_1,0],[distance,radius_1,lever_height]))
let fork                = myLever.intersect(sideview);
fork                    = fork.fillet(fillet_outer);

return fork
}