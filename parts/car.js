// Define car design variables
let car_length      = 50;
let car_width       = 20;
let overhang_front  = 8;
let overhang_rear   = 9;
let cabin_width     = 16;
let cabin_length    = 25;
// 33 = touring/stationwagon
// 25 = sedan
// 15 = pickup
let car_height      = 14;
let bonnet_height   = 8;
let bonnet_rounding = 4;
let bonnet_length   = 15;
let wheel_radius    = 5;
let tire_width      = 3;
let tire_protrude   = 1;
let rim_height      = 1;
let tire_compression= 1;
let road_clearance  = 3; 

// Derived properties
let wheel_base      = car_length - overhang_front - overhang_rear;
let cabin_narrowing = (car_width - cabin_width)/2;
let cabin_base      = road_clearance + bonnet_height
let cabin_height    = car_height-bonnet_height

// Draw car body and passenger cabin
let car_body        = Translate([0,0,road_clearance],Box(car_length,car_width,bonnet_height))
let car_cabin       = Translate([bonnet_length,cabin_narrowing,cabin_base-0.5],
                            Box(cabin_length, cabin_width, cabin_height))

// Sculpt the car body more aerodynamically
let car_body_rounded = FilletEdges(car_body,bonnet_rounding,[1,5])
let cabin_aero       = ChamferEdges(car_cabin, cabin_height-0.5 , [1,5])

// Round all edges
let cabin_rounded   = Offset(cabin_aero,1.5);
let car_shrunk = Offset(car_body_rounded,-1);
let car_rounded = Offset(car_shrunk,2); 

// Define wheels and wheel wells (Front/Rear - Left/Right)
let rim              = Rotate([1,0,0],-90, Translate(
                        [overhang_front,
                                   -(wheel_radius-tire_compression),
                                  -(tire_width - tire_protrude)]
                                  , Cylinder(wheel_radius-rim_height,tire_width,true)))
let wheel            = Rotate([1,0,0],-90, Translate( [overhang_front,
                                   -(wheel_radius-tire_compression),
                                  (0.5*tire_protrude)], 
                                  Cylinder(wheel_radius,tire_width,true)));
let wheel_FL         = Difference(wheel,[rim]);
let wheel_well_FL    = Offset(wheel,0.8,0.01,true)
let wheel_RL         = Translate([wheel_base,0,0], wheel_FL, true)
let wheel_well_RL    = Translate([wheel_base,0,0], wheel_well_FL, true)
let wheel_FR         = Rotate([0,0,1],180,Translate([-(2*overhang_front),-car_width ,0], wheel_FL, true))
let wheel_well_FR    = Translate([0,car_width-1,0], wheel_well_FL, true)
let wheel_RR         = Translate([wheel_base,0,0], wheel_FR, true)
let wheel_well_RR    = Translate([wheel_base,0,0], wheel_well_FR, true)

// Subtract the wheel wells from the car-body
Difference(car_rounded,[wheel_well_FL, 
                        wheel_well_RL, 
                        wheel_well_FR, 
                        wheel_well_RR])
