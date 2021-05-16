// CascadeStudio Code to create a lever, consisting of two cylinders joined by tangent walls
// 

function lever(r1, r2, d, h, t)
{
//  This function creates a lever between two bearings, 
//  the axles of the bearings are aligned

//  r1 = radius larger bearing
//  r2 = radois smaller bearing
//  d  = distance between two bearings
//  h  = height or width of the lever
//  t  = wallthickness around bearing and cutout

    let sinus_a = (r1 - r2) / d ;
    let a = Math.asin(sinus_a);

    // points of outer contour of the lever
    let p1 = [r1 * Math.sin(a), r1 * Math.cos(a)];
    let p2 = [d + r2 * Math.sin(a), r2 * Math.cos(a)];
    let p3 = [d + r2, 0];
    let p4 = [d + r2 * Math.sin(a), - r2 * Math.cos(a)];
    let p5 = [r1 * Math.sin(a), - r1 * Math.cos(a)];
    let p6 = [- r1, 0 ];
    
    // points of cutout of the lever (not used as cutout became too small)
    let c1 = [(r1-t) * Math.sin(a), (r1-t) * Math.cos(a)];
    let c2 = [d + (r2-t) * Math.sin(a), (r2-t) * Math.cos(a)]; ;
    let c3 = [d - r2 + t , 0];
    let c4 = [d + (r2-t) * Math.sin(a), - (r2-t) * Math.cos(a)]; 
    let c5 = [(r1-t) * Math.sin(a), - (r1-t) * Math.cos(a)];
    let c6 = [r1-t,0]; 

    // sketch of the contour of the lever
    let sketchLever = new Sketch(p1).
                    LineTo(p2).
                    ArcTo(p3,p4).
                    LineTo(p5).
                    ArcTo(p6,p1).
                    End(false).Face(true);
    
    let leverbody = Extrude(sketchLever,[0,0,h]);
     
    let big_hole = Cylinder((r1-t), 2* (h + 10), true);
    let small_hole =  Translate([d, 0,0 ], Cylinder((r2-t), 2* (h + 10), true));
    let rough_lever = Difference(leverbody,[big_hole, small_hole]);
    // let rough_lever = Difference(leverbody,[big_hole, small_hole, cutoutsmaller]);

    // sketch of the contour of the cut-out between the bearings
    let cutout  = new Sketch(p1).
                    LineTo(p2).
                    ArcTo(c3,p4).
                    LineTo(p5).
                    ArcTo(c6,p1).
                    End(false).Face(true);

    let cutoutbody = Extrude(cutout,[0,0,h+10]);
    let cutoutsmaller = Offset(cutoutbody, (-1.5 * t));

    // REMARK ON FILLETING
    // filleting the cutout proved to be not practical, as selection of all edges 
    // seemed nearly impossible
    // in the end I selected 50 edges and still one edge was not filleted. 
    // let cutoutround = FilletEdges(cutoutsmaller, t/2, 
    //  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,
    //  25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]);
    
    // ALTERNATIVE APPROACH FOR FILLETING
    // make shrunk version of cutout a bit smaller and then offset it again with
    // the filletradius
    let cutoutbigger = Offset(cutoutsmaller, (0.5 * t));
    let cutoutround = cutoutbigger;
    let cutout_top = Translate([0,0,(h + t)/2],cutoutround);
    let cutout_bot = Translate([0,0,(-h - t)/2 -10],cutoutround);

    let rough_lever2 = Difference(rough_lever, [cutout_top, cutout_bot]);

    return rough_lever2
}

lever(30,10,100,40,5)
