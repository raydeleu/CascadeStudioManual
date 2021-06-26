function Dxy(currentPoint,dx,dy)
{ 
    let newPoint = []; 
    newPoint[0]  = currentPoint[0] + dx;
    newPoint[1]  = currentPoint[1] + dy; 
    return newPoint
}

function Dx(currentPoint,dx)
{ 
    let newPoint = []; 
    newPoint[0]  = currentPoint[0] + dx;
    newPoint[1]  = currentPoint[1] ; 
    return newPoint
}

function Dy(currentPoint,dy)
{ 
    let newPoint = []; 
    newPoint[0]  = currentPoint[0];
    newPoint[1]  = currentPoint[1] + dy; 
    return newPoint
}

function Polar(currentPoint,distance,angleDegToX)
{ 
    let newPoint = []; 
    let angleRad = angleDegToX * Math.PI/180;
    newPoint[0]  = currentPoint[0] + distance * Math.cos(angleRad);
    newPoint[1]  = currentPoint[1] + distance * Math.sin(angleRad); 
    return newPoint
}

function PolarX(currentPoint,xdistance,angleDegToX)
{ 
    let newPoint = []; 
    let angleRad = angleDegToX * Math.PI/180;
    newPoint[0]  = currentPoint[0] + xdistance;
    newPoint[1]  = currentPoint[1] + xdistance * Math.tan(angleRad); 
    return newPoint
}

function PolarY(currentPoint,ydistance,angleDegToX)
{ 
    let newPoint = []; 
    let angleRad = angleDegToX * Math.PI/180;
    newPoint[0]  = currentPoint[0] + ydistance/Math.tan(angleRad);
    newPoint[1]  = currentPoint[1] + ydistance; 
    return newPoint
}

function RadiusArc(currentPoint,endPoint,radius, clockwise)
{
    let midPoint = [];
    let dx = endPoint[0] - currentPoint[0];
    let dy = endPoint[1] - currentPoint[1];
    let dist = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    let alpha = Math.asin(dy/dist);
    let beta  = Math.asin((dist/2)/radius);
    let sag = radius - (Math.cos(beta) * radius)
    if (dx<0){clockwise = !clockwise}
    if (clockwise == true)
    {
    midPoint[0] = currentPoint[0] + dx/2 - Math.sin(alpha)*sag;
    midPoint[1] = currentPoint[1] + dy/2 + Math.cos(alpha)*sag; 
    }
    else
    {
    midPoint[0] = currentPoint[0] + dx/2 + Math.sin(alpha)*sag;
    midPoint[1] = currentPoint[1] + dy/2 - Math.cos(alpha)*sag;
    }
    return midPoint
}


function SagArc(currentPoint,endPoint,sag,clockwise)
{
    let midPoint = [];
    let dx = endPoint[0] - currentPoint[0];
    let dy = endPoint[1] - currentPoint[1];
    let dist = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    let alpha = Math.asin(dy/dist);
    if (dx<0){clockwise = !clockwise}
    if (clockwise == true)
    {
    midPoint[0] = currentPoint[0] + dx/2 - Math.sin(alpha)*sag;
    midPoint[1] = currentPoint[1] + dy/2 + Math.cos(alpha)*sag; 
    }
    else
    {
    midPoint[0] = currentPoint[0] + dx/2 + Math.sin(alpha)*sag;
    midPoint[1] = currentPoint[1] + dy/2 - Math.cos(alpha)*sag;
    }
    return midPoint
}

function MirrorX(currentPoint, yvalue)
    {
        let mirrorPoint = [];    
        mirrorPoint[0] = currentPoint[0];
        mirrorPoint[1] = yvalue - (currentPoint[1]-yvalue);
        return mirrorPoint
    }

function MirrorY(currentPoint, xvalue)
    {
        let mirrorPoint = [];    
        mirrorPoint[0] = xvalue - (currentPoint[0]-xvalue);
        mirrorPoint[1] = currentPoint[1];
        return mirrorPoint
    }



let p0 = [0,0]
let p1 = Dx(p0, 10); 
let p3 = Dy(p1, 10); 
let p2 = SagArc(p1,p3,4,true)
let p4 = Polar(p3,10,135)
let p5 = Dx(p4,-10);
let p7 = Dy(p5,-10)
let p6 = RadiusArc(p5,p7,7,false)
let p8 = MirrorY(p6,0)
console.log(p6)
console.log(p8)

let test = new Sketch(p0)
.LineTo(p1)
.ArcTo(p2,p3)
.LineTo(p4)
.LineTo(p5)
.ArcTo(p6,p7)
.End(true).Face()
Extrude(test,[0,0,20])



