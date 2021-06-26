function equationGherkin(x) 
{
    let pt1 = x*x - 144*x + 5184;
    let pt2 = pt1 / 11664;
    let pt3 = 1-pt2;
    let pt4 = Math.sqrt(pt3);
    let y   = 28.25 * pt4;
    return y
}

// construct floors
// 44 floors, 4 meters each = 176 meter, 
// height of tower is 180 meters

let h = 0;
let c0 = [equationGherkin(h),h];
let face = [];
let gherkin = [];

// create each floor by revolving a face 
let sc=0.97
for (let hi = 0; hi <= 178; hi+=4)
{
    face[hi] = Polygon([[0,0,hi-1],[sc*equationGherkin(hi-1),0,hi-1],[sc*equationGherkin(hi),0, hi],[0,0,hi]],true)
    gherkin[hi] = Revolve(face[hi]);
}


// create inner construction
let innerConstruction = Cylinder(5,178,false)

// create parallellograms on outside
//     each parallellogram covers 4 floors
let pgram=[];

for (let hj = 0; hj <= 172; hj+=32)
{
        for ( let k = 0; k <= 16 ; k+= 2)
        {  
            
            let angle_ref    = Math.PI/8 * k
            let angle_aft    = Math.PI/8 * (k-0.5)
            let angle_front  = Math.PI/8 * (k+0.5)
            let xref   = Math.cos(angle_ref) * equationGherkin(hj)
            let xaft   = Math.cos(angle_aft) * equationGherkin(hj+8)
            let xfront = Math.cos(angle_front) * equationGherkin(hj+8)
            let xtop   = Math.cos(angle_ref) * equationGherkin(hj+16)
            let yref   = Math.sin(angle_ref) * equationGherkin(hj)
            let yaft   = Math.sin(angle_aft) * equationGherkin(hj+8)
            let yfront = Math.sin(angle_front) * equationGherkin(hj+8)
            let ytop   = Math.sin(angle_ref) * equationGherkin(hj+16)

            let pp0    = [xref, yref, hj]
            let pp1    = [xaft, yaft, hj+8] 
            let pp2    = [xfront, yfront, hj+8]
            let pp3    = [xtop, ytop, hj+16]

            // pgram[k] = Polygon([pp0, pp2, pp1],)
            Polygon([pp0, pp2, pp1])
            Polygon([pp1, pp2, pp3])

        }    
} 

for (let hj = 16; hj <= 172; hj+=32)
{
        for ( let k = 1; k <= 17 ; k+= 2)
        {  
            
            let angle_ref    = Math.PI/8 * k
            let angle_aft    = Math.PI/8 * (k-0.5)
            let angle_front  = Math.PI/8 * (k+0.5)
            let xref   = Math.cos(angle_ref) * equationGherkin(hj)
            let xaft   = Math.cos(angle_aft) * equationGherkin(hj+8)
            let xfront = Math.cos(angle_front) * equationGherkin(hj+8)
            let xtop   = Math.cos(angle_ref) * equationGherkin(hj+16)
            let yref   = Math.sin(angle_ref) * equationGherkin(hj)
            let yaft   = Math.sin(angle_aft) * equationGherkin(hj+8)
            let yfront = Math.sin(angle_front) * equationGherkin(hj+8)
            let ytop   = Math.sin(angle_ref) * equationGherkin(hj+16)

            let pp0    = [xref, yref, hj]
            let pp1    = [xaft, yaft, hj+8] 
            let pp2    = [xfront, yfront, hj+8]
            let pp3    = [xtop, ytop, hj+16]

            // pgram[k] = Polygon([pp0, pp2, pp1],)
            Polygon([pp0, pp2, pp1])
            Polygon([pp1, pp2, pp3])

        }    
} 



for (let hk = 8; hk <= 164; hk+=32)
{
        for ( let l = 0.5; l <= 16.5 ; l += 2)
        {  
            
            let angle_ref    = Math.PI/8 * l
            let angle_aft    = Math.PI/8 * (l-0.5)
            let angle_front  = Math.PI/8 * (l+0.5)
            let xref   = Math.cos(angle_ref) * equationGherkin(hk)
            let xaft   = Math.cos(angle_aft) * equationGherkin(hk+8)
            let xfront = Math.cos(angle_front) * equationGherkin(hk+8)
            let yref   = Math.sin(angle_ref) * equationGherkin(hk)
            let yaft   = Math.sin(angle_aft) * equationGherkin(hk+8)
            let yfront = Math.sin(angle_front) * equationGherkin(hk+8)
            let xtop   = Math.cos(angle_ref) * equationGherkin(hk+16)
            let ytop   = Math.sin(angle_ref) * equationGherkin(hk+16)

            let pp0    = [xref, yref, hk]
            let pp1    = [xaft, yaft, hk+8] 
            let pp2    = [xfront, yfront, hk+8]
            let pp3    = [xtop, ytop, hk+16]

            // pgram[k] = Polygon([pp0, pp2, pp1],)
            Polygon([pp0, pp2, pp1])
            Polygon([pp1, pp2, pp3])

        }    
} 

for (let hk = 24; hk <= 164; hk+=32)
{
        for ( let l = 1.5; l <= 17.5 ; l += 2)
        {  
            
            let angle_ref    = Math.PI/8 * l
            let angle_aft    = Math.PI/8 * (l-0.5)
            let angle_front  = Math.PI/8 * (l+0.5)
            let xref   = Math.cos(angle_ref) * equationGherkin(hk)
            let xaft   = Math.cos(angle_aft) * equationGherkin(hk+8)
            let xfront = Math.cos(angle_front) * equationGherkin(hk+8)
            let yref   = Math.sin(angle_ref) * equationGherkin(hk)
            let yaft   = Math.sin(angle_aft) * equationGherkin(hk+8)
            let yfront = Math.sin(angle_front) * equationGherkin(hk+8)
            let xtop   = Math.cos(angle_ref) * equationGherkin(hk+16)
            let ytop   = Math.sin(angle_ref) * equationGherkin(hk+16)

            let pp0    = [xref, yref, hk]
            let pp1    = [xaft, yaft, hk+8] 
            let pp2    = [xfront, yfront, hk+8]
            let pp3    = [xtop, ytop, hk+16]

            // pgram[k] = Polygon([pp0, pp2, pp1],)
            Polygon([pp0, pp2, pp1])
            Polygon([pp1, pp2, pp3])

        }    
} 


for (let hk = 168; hk <= 172; hk+=8)
{
        for ( let l = 0.5; l <= 16.5 ; l +=1)
        {  
            
            let angle_ref    = Math.PI/8 * l
            let angle_aft    = Math.PI/8 * (l-0.5)
            let angle_front  = Math.PI/8 * (l+0.5)
            let xref   = Math.cos(angle_ref) * equationGherkin(hk)
            let xaft   = Math.cos(angle_aft) * equationGherkin(hk+8)
            let xfront = Math.cos(angle_front) * equationGherkin(hk+8)
            let yref   = Math.sin(angle_ref) * equationGherkin(hk)
            let yaft   = Math.sin(angle_aft) * equationGherkin(hk+8)
            let yfront = Math.sin(angle_front) * equationGherkin(hk+8)
            // let xtop   = Math.cos(angle_ref) * equationGherkin(hk+16)
            // let ytop   = Math.sin(angle_ref) * equationGherkin(hk+16)

            let pp0    = [xref, yref, hk]
            let pp1    = [xaft, yaft, hk+8] 
            let pp2    = [xfront, yfront, hk+8]
            // let pp3    = [xtop, ytop, hk+16]

            // pgram[k] = Polygon([pp0, pp2, pp1],)
            Polygon([pp0, pp2, pp1])
            // Polygon([pp1, pp2, pp3])

        }    
} 



// using a spline with 4 points
let p0 = [.13 , 0   ]
let p1 = [.20 , .66 ]
let p2 = [.11 , .80 ]
let p3 = [.03 , 1 ]
let p4 = [ 0  , 1 ]

let profileGherkin = new Sketch(p0)
.BezierTo([p1,p2,p3,p4])
.LineTo([0,0])
.LineTo(p0)
.End().Face(false)


Translate([100,0,0],Rotate([1,0,0],90,Revolve(Scale(180,profileGherkin),360,[0,1,0], false, false)))
