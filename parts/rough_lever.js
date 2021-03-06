// CascadeStudio Code to create a lever, consisting of two cylinders joined by tangent walls
// 

function lever(radius1, radius2, delta_bearings, leverheight, wall_thickness)
{
    let sinus_angle = (radius1 - radius2) / delta_bearings
    let angle = Math.asin(sinus_angle);

    let p1 = [radius1 * Math.sin(angle), radius1 * Math.cos(angle)];
    let p2 = [delta_bearings + radius2 * Math.sin(angle), radius2 * Math.cos(angle)];
    let p3 = [delta_bearings + radius2, 0];
    let p4 = [delta_bearings + radius2 * Math.sin(angle), - radius2 * Math.cos(angle)];
    let p5 = [radius1 * Math.sin(angle), - radius1 * Math.cos(angle)];
    let p6 = [- radius1, 0 ]

    let sketchLever = new Sketch(p1).
                    LineTo(p2).
                    ArcTo(p3,p4).
                    LineTo(p5).
                    ArcTo(p6,p1).
                    End(false).Face(true)
    
    let leverbody = Extrude(sketchLever,[0,0,leverheight]);
    let big_hole = Cylinder((radius1-wall_thickness), 2* (leverheight + 10), true);
    let small_hole =  Translate([delta_bearings, 0,0 ], Cylinder((radius2-wall_thickness), 2* (leverheight + 10), true));
    let rough_lever = Difference(leverbody,[big_hole, small_hole])

    return rough_lever
}

lever(30,10,100,40,3)



