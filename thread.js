const toothProfile = new Sketch ([0,0]).Fillet(0.1)
    .LineTo([0.4,0.5]).Fillet(0.1)
    .LineTo([0.8,0]).Fillet(0.1)
    .LineTo([0.85,0])
    .LineTo([-0.05,0])
    .End(true).Wire()

hackHelix(toothProfile, {rotations: 5, pitch: 1, diameter: 5})
Cylinder(2.5, 5.05)

function hackHelix(shape, {diameter = 10, pitch = 1.5, rotations = 5, divisions = 360} = {}) {
    // hacky because the correct way to make a thread would be to extrude a 2d shape along a helix
    // which I think is supported by opencascade, but maybe not opencascade.js and therefore CascadeStudio
    // This will get you by for now though
    const degIncrement = 360/divisions
    const heightIncrement = pitch/divisions
    const circumferance = diameter*Math.PI
    const rad2Deg = num => num*180/Math.PI
    const pitchAngle = rad2Deg(Math.atan(pitch/circumferance))

    const loftWires = Array.from({length: divisions*rotations+1}).map(
        (_, index) => Rotate([0,0,-1], index*degIncrement,
            Translate([0,diameter/2,index*heightIncrement],
                Rotate([0,1,0], 90,Rotate([0,-1,0], pitchAngle, shape))
            )
        )
    )

    return Loft(loftWires)
}