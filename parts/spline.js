function p2xyz(r, d, z = 0) {
    let th = d / 180 * Math.PI
    let v = ([r * Math.cos(th), r * Math.sin (th), z])
    //Translate(v, Rotate([0, 0, 1], d, Sphere(0.1)))
    return (v)
}

let l = []
let N=6
let r = 10
let dinc = 360/N
for (let i = 0; i < N ; i++) {
    l.push (p2xyz(r * 1.1, i * dinc))
    l.push (p2xyz(r * 1.0, (i + 0.1) * dinc))
    l.push (p2xyz(r * 0.8, (i + 0.5) * dinc))
    l.push (p2xyz(r * 1.0, (i + 0.9) * dinc))
}
base = BSpline(l, true)
top = Translate([0, 0, 100], Circle(10, true))
shape1 = Loft([base, top])
cut1 = Translate([-20, -20, 0], Box(20, 40, 100, false))
semi = Intersection([shape1, cut1])
final = Translate([100, 0, 0], Union([semi, Rotate([0, 0, 1], 180, semi)]))
