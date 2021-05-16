// CascadeStudio Code to create a lever, consisting of two cylinders joined by tangent walls
// 

function lever(radius1, radius2, delta_bearings, leverheight, wall_thickness)
{
    let sinus_angle = (radius1 - radius2) / delta_bearings
    let angle = Math.asin(sinus_angle);

    // points of outer contour of the lever
    let p1 = [radius1 * Math.sin(angle), radius1 * Math.cos(angle)];
    let p2 = [delta_bearings + radius2 * Math.sin(angle), radius2 * Math.cos(angle)];
    let p3 = [delta_bearings + radius2, 0];
    let p4 = [delta_bearings + radius2 * Math.sin(angle), - radius2 * Math.cos(angle)];
    let p5 = [radius1 * Math.sin(angle), - radius1 * Math.cos(angle)];
    let p6 = [- radius1, 0 ]
    
    // points of cutout of the lever
    let c1 = p1;
    let c2 = p2 ;
    // let c3 = [delta_bearings - radius2 * Math.sin(Math.PI/4.0), radius2 * Math.cos(Math.PI/4.0)];
    let c3 = [delta_bearings - radius2 , 0];
    // let c5 = [delta_bearings - radius2 * Math.sin(Math.PI/4.0), radius2 * Math.cos(Math.PI/4.0)];
    let c4 = p4;
    let c5 = p5;
    let c6 = [radius1,0]; 

    let sketchLever = new Sketch(p1).
                    LineTo(p2).
                    ArcTo(p3,p4).
                    LineTo(p5).
                    ArcTo(p6,p1).
                    End(false).Face(true)
    
    let cutout = new Sketch(c1).
                    LineTo(c2).
                    ArcTo(c3,c4).
                    LineTo(c5).
                    ArcTo(c6,c1).
                    End(false).Face(true)
    
    let leverbody = Extrude(sketchLever,[0,0,leverheight]);
    let cutoutbody_top = Translate([0,0,(leverheight/2 + wall_thickness/2),Extrude(cutout,[0,0,leverheight]);
    
    let big_hole = Cylinder((radius1-wall_thickness), 2* (leverheight + 10), true);
    let small_hole =  Translate([delta_bearings, 0,0 ], Cylinder((radius2-wall_thickness), 2* (leverheight + 10), true));
    let rough_lever = Difference(leverbody,[big_hole, small_hole, cutout_body_top])

    return rough_lever
}

lever(30,10,100,40,3)

