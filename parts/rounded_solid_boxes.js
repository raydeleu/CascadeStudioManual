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

// only plan-view rounded through fillets in sketch
let box0 = Translate([-20,0,0],Extrude(filletsquare(10,20,5),[0,0,20]));

// all edges rounded individually
let box1 = Extrude(filletsquare(10,20,5),[0,0,20]);
let rounded_box = FilletEdges(box1, 2, [3,6,12,15,17]);
let double_rounded_box = FilletEdges(rounded_box, 1, [11,12,10,13,6,2]);

// NOTE:
// In the example above there is a warning of encountering a NULL face, 
// which may be caused by the fact that the two fillets in filletsquare
// are in fact touching, completely removing the straight part between
// the fillets. 

// using offsets
let box2 = Translate([20,0,0], box1)
let shrunk_box= Offset(box2,-2)
let grown_box = Offset(shrunk_box,2)

// using a function 
let box3 = Translate([40,0,0], box1)
let rounded_box3 = RoundAll(box3,3)

// using a function on a rectangular, unfilleted box
let box4 = Translate([60,0,0],RoundAll(Box(10,20,20),5))


