const extrusion = Extrude(
    new Sketch([-4,0]).Fillet(1)
        .LineTo([5,3]).Fillet(1.5)
        .LineTo([0,7]).Fillet(0.2)
        .LineTo([8,7]).Fillet(10)
        .LineTo([20,20]).Fillet(0.8)
        .LineTo([10,0]).Fillet(10).End(true).Face(),
    [0,0,2])

FilletEdges(extrusion, 0.45, [9])

// NOTE: 
// You only have to find one edge in a chain 
// and OpenCascade will find the other edges
// along the same loop or chain. 

