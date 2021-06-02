// preview bezier vs spline curves

// points

let p0 = [0,0]
let p1 = [0,15]
let p2 = [10,50]
let p3 = [20,5]
let p4 = [30,30]
let p5 = [40,40]
let p6 = [50,35]
let p7 = [60,40]
let p8 = [70,20]
let p9 = [70,0]

bezierSpline = new Sketch(p0)
.BezierTo(p1,p2,p3,p4,p5,p6,p7,p8)
.LineTo(p9)
.LineTo(p0)
.End()
.Face()

Extrude([0,20,0], bezierSpline)

