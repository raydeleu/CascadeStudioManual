// Define car design variables
let car_length      = 50;
let wheel_base      = 33;
let car_width       = 20;
let cabin_width     = 18;
let cabin_length    = 25;
let car_height      = 14;
let bonnet_height   = 8;
let bonnet_rounding = 4;
let bonnet_length   = 15;
let road_clearance  = 3; 

// Derived properties
let cabin_narrowing = (car_width - cabin_width)/2;
let cabin_base      = road_clearance + bonnet_height
let cabin_height    = car_height-bonnet_height

// Draw car body and passenger cabin
let car_body        = Translate([0,0,road_clearance],Box(car_length,car_width,bonnet_height))
let car_cabin       = Translate([bonnet_length,cabin_narrowing,cabin_base],
                            Box(cabin_length, cabin_width, cabin_height))

// Sculpt the car body more aerodynamically
let car_body_rounded = FilletEdges(car_body,bonnet_rounding,[1,5])
let cabin_aero       = ChamferEdges(car_cabin, cabin_height-0.5 , [1,5])

// Define wheels and wheel wells (Front/Rear - Left/Right)
let wheel_FL         = Rotate([1,0,0],-90, Translate([8,-4,0.5], Cylinder(5,3,true)))
let wheel_well_FL    = Offset(wheel_FL,1.5,0.01,true)
let wheel_RL         = Translate([wheel_base,0,0], wheel_FL, true)
let wheel_well_RL    = Translate([wheel_base,0,0], wheel_well_FL, true)
let wheel_FR         = Translate([0,car_width-1 ,0], wheel_FL, true)
let wheel_well_FR    = Translate([0,car_width-1,0], wheel_well_FL, true)
let wheel_RR         = Translate([wheel_base,0,0], wheel_FR, true)
let wheel_well_RR    = Translate([wheel_base,0,0], wheel_well_FR, true)

// Subtract the wheel wells from the car-body
Difference(car_body_rounded,[wheel_well_FL, 
                        wheel_well_RL, 
                        wheel_well_FR, 
                        wheel_well_RR])

