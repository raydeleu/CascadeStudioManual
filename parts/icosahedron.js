// iso-spheres

function ProjectSphere(vertex)
// function to project a vertex on to a sphere with radius 1
{
    let x = vertex[0];
    let y = vertex[1];
    let z = vertex[2];
    let radius = Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2))
    let scale = 1.0/radius;
    let scaledVertex = [scale*x , scale*y, scale*z]
    return  scaledVertex
}

function Icosahedron()
{
    let golden = (1+Math.sqrt(5))/2
    let v = []
    // vertices determined by 4 rectangles
    v[0] = [-1,  golden, 0];
    v[1] = [ 1,  golden, 0];
    v[2] = [-1, -golden, 0];
    v[3] = [ 1, -golden, 0];

    v[4] = [ 0, -1, golden];
    v[5] = [ 0,  1, golden];
    v[6]= [ 0, -1,-golden];
    v[7] = [ 0,  1,-golden];

    v[8] = [ golden,0, -1];
    v[9] = [ golden,0,  1];
    v[10]= [ -golden,0, -1];
    v[11] = [ -golden,0, 1];

    // faces added so that they always have an edge in common
    // with the previous ones
    let f = []
    // 0-5
    f[0] = [v[0],v[11],v[5]]
    f[1] = [v[0],v[5],v[1]]
    // 0-11
    f[2] = [v[0],v[10],v[11]]
    // 0-10
    f[3] = [v[0],v[7],v[10]]
    // 11-5
    f[4] = [v[5],v[11],v[4]]
    // 5-4
    f[5] = [v[4],v[9],v[5]]
    // 4-9
    f[6] = [v[3],v[9],v[4]]
    // 9-3
    f[7] = [v[3],v[8],v[9]]
    // 3-8
    f[8] = [v[3],v[6],v[8]]
    //3-6
    f[9] = [v[3],v[2],v[6]]
    // 2-6
    f[10] = [v[6],v[2],v[10]]
    // 6-10
    f[11] = [v[10],v[7],v[6]]
    // 6-7
    f[12] = [v[8],v[6],v[7]]
    // 6-8 10-7 0-7
    f[13] = [v[0],v[1],v[7]]  //
    f[14] = [v[1],v[5],v[9]]  //
    f[15] = [v[11],v[10],v[2]] //
    f[16] = [v[7],v[1],v[8]]  //
    f[17] = [v[3],v[4],v[2]]  //
    f[18] = [v[2],v[4],v[11]] //
    f[19] = [v[9],v[8],v[1]]  //

    let icosphere = new oc.BRepBuilderAPI_Sewing()
    for(let i=0; i<=19 ;i++)
    {
        icosphere.Add(Polygon(f[i]))
    }
    icosphere.Perform()
    let sewedsphere = icosphere.SewedShape()
    console.log(sewedsphere.ShapeType())  // check type of the result
    console.log(sewedsphere.Closed())  // check if the shell is closed
    
    // create a solid
    let result = new oc.BRepBuilderAPI_MakeSolid()
    result.Add(sewedsphere)
    let finalresult = result.Solid() 
    console.log(finalresult.ShapeType())
    return finalresult
}

// draw the isosphere
let test= Icosahedron();
test = Scale(50,test,false)
test = Translate([20,20,220],test,false)
console.log(test.ShapeType())

// draw a box
let box = Box(200,200,200)
console.log(box.ShapeType())

// draw a standard sphere
let studioSphere = Translate([50,30,20],Sphere(100))
console.log(studioSphere.ShapeType())

box = Difference(box,[studioSphere])
// let experiment = Difference(box,[test])

