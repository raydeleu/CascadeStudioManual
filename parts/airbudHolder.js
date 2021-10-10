function FilletRect(x,y,f,center) {
                    let p0;
                    let p1;
                    let p2;
                    let p3;
                    if (center == false)
                    {
                        p0 = [0,0];
                        p1 = [x,0];
                        p2 = [x,y];
                        p3 = [0,y];
                    }
                    else
                    {
                        p0 = [-0.5*x,-0.5*y];
                        p1 = [0.5*x, -0.5*y];
                        p2 = [0.5*x,  0.5*y];
                        p3 = [-0.5*x, 0.5*y];
                    }
                    return new Sketch(p0)
                   .LineTo(p1).Fillet(f)
                   .LineTo(p2).Fillet(f)
                   .LineTo(p3).Fillet(f)
                   .End(true).Fillet(f)
                   .Face();
                 }

// Draw ear hook right
let hookPathR = [];
hookPathR[0] = [0,0,0]
hookPathR[1] = [20,10,0]
hookPathR[2] = [28,25,0]
hookPathR[3] = [10,42,0]
hookPathR[4] = [-12,32,0]
hookPathR[5] = [-20,35,0]

let hookPathL = [];
hookPathL[0] = [0,0,0]
hookPathL[1] = [-20,10,0]
hookPathL[2] = [-28,25,0]
hookPathL[3] = [-10,42,0]
hookPathL[4] = [12,32,0]
hookPathL[5] = [20,35,0]



let hookHeight = 3; // thickness of hook
let hookWidth = 3;  // width of hook
let hookRadius =1; 
// let version = "right" ;
let path;
let version = "right"

let face = Rotate([1,0,0],90,FilletRect(hookWidth,hookHeight,hookRadius),true);

if (version == "left")
    {
    path = BSpline(hookPathL);
    }
    else
    {
    path = BSpline(hookPathR);
    }

let pipe = Pipe(face,path,false);


pipe = Translate([0,0,0.5],pipe);

// Draw stem of airbud to subtract from other shape
let abWidth = 3
let abHeight = 20
let abLength = 2.5

let airbudStem = Box(abWidth,abHeight,abLength)
airbudStem = FilletEdges(airbudStem,0.95,[1,3,5,7],false);
airbudStem = Translate([-abWidth/2,-abHeight/2,hookHeight/2-0.2],airbudStem);
let slit = Translate([0,0,5],Box(1.5,20,5,true))
slit = Union([airbudStem,slit])
// slit = RemoveInternalEdges(slit)


let holderWidth = 7;
let holderLength = 6;
let holderHeight = 12;
let stemHolder = Box(holderWidth,holderHeight,holderLength,true);
stemHolder = Translate([0,0,holderLength/2-hookHeight/2],stemHolder,false)
airbudHook = Union([pipe,stemHolder])

airbudHook = Difference(airbudHook,[slit]);

// right 
// 

if (version == "left")
{
   airbudHook = FilletEdges(airbudHook,2,[56,16]);
}    
else
{
   airbudHook = FilletEdges(airbudHook,2,[16,65]);
}

let flatCutter = Translate([0,0,-5],Box(100,100,10,true));
airbudHook = Difference(airbudHook,[flatCutter])
