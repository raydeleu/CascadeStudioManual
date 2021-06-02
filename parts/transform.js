let boxShape = Box(100,30, 10)

Translate([0,50,30], boxShape, true);
Rotate([0,1,0], -90, boxShape, true);

let smallBox = Scale(0.2, boxShape, true);

let displacedSmallBox = Translate([-50,0,0], smallBox, true);

let largeBox = Transform([0, 0, 30], [[1, 00, 0], 30], 2.00, displacedSmallBox); 
