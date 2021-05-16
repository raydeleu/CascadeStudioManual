// Example file to create a gear wheel, 
// author is Frank Noirot, code taken from CADhub

function Gear(
    numTeeth = 23,
    outerRadius = 15,
    pitchRadius = 14,
    pitchAngle = 20,
    insetRadius = 13,
    innerRadius = 6,
    toothCap = 1.5) {
    const startPoint = [0, 0]
    const degreesToRadians = radians => Math.PI / 180 * radians
    const polarToCartesian = (r, theta) => ([Math.cos(theta) * r, Math.sin(theta) * r])
    let sketch

    for (let i = 0; i <= 360; i += 360 / numTeeth) {
        const offsetTheta = Math.atan(toothCap/2 / outerRadius)
        const offsetRadius = Math.sqrt(Math.pow(outerRadius, 2) + Math.pow(toothCap, 2))
        const point1 = (f = 1) => polarToCartesian(offsetRadius, degreesToRadians(i) + f * offsetTheta)

        const p2Offset = Math.tan(degreesToRadians(pitchAngle)) * (outerRadius - pitchRadius)
        const p2AngleOffset = Math.atan(p2Offset / pitchRadius)
        const p2Radius = Math.sqrt(Math.pow(pitchRadius, 2) + Math.pow(p2Offset, 2))
        const point2 = (f = 1, r = p2Radius) => polarToCartesian(r, degreesToRadians(i) + f * (offsetTheta + p2AngleOffset))

        const point3 = (f = 1) => point2(f, insetRadius)

        if (i === 0) {
            sketch = new Sketch(point3(-1))
        } else {
            sketch.LineTo(point3(-1))
        }
        sketch.LineTo(point2(-1))
        sketch.LineTo(point1(-1))
        sketch.LineTo(point1(1))
        sketch.LineTo(point2(1))
        sketch.LineTo(point3(1))
    }  
    
    return sketch.End(true).Circle([0,0], innerRadius, true).Face()
}
        
Extrude(Gear(), [0,0,4])
