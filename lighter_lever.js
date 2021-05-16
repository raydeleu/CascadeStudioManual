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
    let p6 = [- radius1, 0 ];
    
    // points of cutout of the lever (not used as cutout became too small)
    let c1 = [(radius1-wall_thickness) * Math.sin(angle), (radius1-wall_thickness) * Math.cos(angle)];
    let c2 = [delta_bearings + (radius2-wall_thickness) * Math.sin(angle), (radius2-wall_thickness) * Math.cos(angle)]; ;
    let c3 = [delta_bearings - radius2 + wall_thickness , 0];
    let c4 = [delta_bearings + (radius2-wall_thickness) * Math.sin(angle), - (radius2-wall_thickness) * Math.cos(angle)]; 
    let c5 = [(radius1-wall_thickness) * Math.sin(angle), - (radius1-wall_thickness) * Math.cos(angle)];
    let c6 = [radius1-wall_thickness,0]; 

    let sketchLever = new Sketch(p1).
                    LineTo(p2).
                    ArcTo(p3,p4).
                    LineTo(p5).
                    ArcTo(p6,p1).
                    End(false).Face(true);
    
    let leverbody = Extrude(sketchLever,[0,0,leverheight]);
     
    let big_hole = Cylinder((radius1-wall_thickness), 2* (leverheight + 10), true);
    let small_hole =  Translate([delta_bearings, 0,0 ], Cylinder((radius2-wall_thickness), 2* (leverheight + 10), true));
    let rough_lever = Difference(leverbody,[big_hole, small_hole]);
    // let rough_lever = Difference(leverbody,[big_hole, small_hole, cutoutsmaller]);

    let cutout  = new Sketch(p1).
                    LineTo(p2).
                    ArcTo(c3,p4).
                    LineTo(p5).
                    ArcTo(c6,p1).
                    End(false).Face(true);

    let cutoutbody = Extrude(cutout,[0,0,leverheight+10]);
    let cutoutsmaller = Offset(cutoutbody, (-1.5 * wall_thickness));

    // REMARK ON FILLETING
    // filleting the cutout proved to be not practical, as selection of all edges 
    // seemed nearly impossible
    // in the end I selected 50 edges and still one edge was not filleted. 
    // let cutoutround = FilletEdges(cutoutsmaller, wall_thickness/2, 
    //  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,
    //  25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]);
    
    // ALTERNATIVE APPROACH FOR FILLETING
    // make shrunk version of cutout a bit smaller and then offset it again with
    // the filletradius
    let cutoutbigger = Offset(cutoutsmaller, (0.5 * wall_thickness));
    let cutoutround = cutoutbigger;
    let cutout_top = Translate([0,0,(leverheight + wall_thickness)/2],cutoutround);
    let cutout_bot = Translate([0,0,(-leverheight - wall_thickness)/2 -10],cutoutround);

    let rough_lever2 = Difference(rough_lever, [cutout_top, cutout_bot]);

    return rough_lever2
}

lever(30,10,100,40,5)
