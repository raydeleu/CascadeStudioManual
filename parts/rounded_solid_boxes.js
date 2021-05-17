function filletsquare (x,y,f) {
   return new Sketch([0, 0])
  .LineTo([x, 0]).Fillet(f)
  .LineTo([x, y]).Fillet(f)
  .LineTo([0, y]).Fillet(f)
  .End(true).Fillet(f)
  .Face();
}


function RoundAll(shape,fillet)
{
    let shrunk_version = Offset(shape,-fillet)
    let grown_version = Offset(shrunk_version, fillet)
    return grown_version
}

function ThinWall(shape,thickness)
{
    let shape_original = shape;
    let shrunk = Offset(shape, -thickness);
    let hollow = Difference(shape_original,[shrunk]);
    return hollow;
}   


let t = 0.5;

// only plan-view rounded through fillets in sketch
let box0 = Translate([-20,0,0],Extrude(filletsquare(10,20,3),[0,0,20]));

// experiment to make a thin-walled version, cutting it open by subtracting a box
let box_hollow = ThinWall(box0,t)
let boxh2 = Difference(box_hollow,[Translate([-20,10,15],Box(50,50,50))]) 

// all edges rounded individually
// note that only one of the edges in a loop needs to be listed
let box1 = Extrude(filletsquare(10, 20, 5), [0,0,20]);
// let rounded_box = FilletEdges(box1, 2, [3,6,12,15,17]);
let rounded_box = FilletEdges(box1, 2, [3]);
// let double_rounded_box = FilletEdges(rounded_box, 1, [11,12,10,13,6,2]);
let double_rounded_box = FilletEdges(rounded_box, 1, [11]);

// using a function 
let box3 = Translate([20,0,0],Extrude(filletsquare(10,20,3),[0,0,20]));
let rounded_box3 = RoundAll(box3,2)

// using a function on a rectangular, unfilleted box
let box4 = Translate([40,0,0],RoundAll(Box(10,20,20),5))
