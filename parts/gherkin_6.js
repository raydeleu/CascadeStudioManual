// function that describes the width of the building
// as a function of the height
// note that at 180 meters high the radius is zero! 
function EquationGherkin(x) 
{
    let pt1 = x*x - 144*x + 5184;
    let pt2 = pt1 / 11664;
    let pt3 = 1-pt2;
    let pt4 = Math.sqrt(pt3);
    let y   = 28.25 * pt4;
    return y
}

// function to create faces along the outside of the tower
//      each parallellogram face covers 4 floors
//      each floor is 4 meters high
//      first is at reference height, then 8 and 16 meters up 
function BuildFacets(num,iteration,height)
{
            let fullCircle   = 2 * Math.PI
            let angle_ref    = fullCircle/num * iteration
            let angle_aft    = fullCircle/num * (iteration-0.5)
            let angle_front  = fullCircle/num * (iteration+0.5)
            // calculate coordinates of vertices of parallellogram

            // bottom vertex
            let xref         = Math.cos(angle_ref) * EquationGherkin(height)
            let yref         = Math.sin(angle_ref) * EquationGherkin(height)

            // middle two vertices
            let xaft         = Math.cos(angle_aft) * EquationGherkin(height+8)
            let xfront       = Math.cos(angle_front) * EquationGherkin(height+8)
            let yaft         = Math.sin(angle_aft) * EquationGherkin(height+8)
            let yfront       = Math.sin(angle_front) * EquationGherkin(height+8)

            // top vertex
            let xtop         = Math.cos(angle_ref) * EquationGherkin(height+16)            
            let ytop         = Math.sin(angle_ref) * EquationGherkin(height+16)

            // combine coordinates to vertices
            let pp0    = [xref, yref, height]
            let pp1    = [xaft, yaft, height+8] 
            let pp2    = [xfront, yfront, height+8]
            let pp3    = [xtop, ytop, height+16]

            // create polygons
            Polygon([pp0, pp2, pp1])
            Polygon([pp1, pp2, pp3])
}


// construct floors
// 44 floors, 4 meters each = 176 meter, 
// height of tower is 180 meters

// first point on bottom at h=0
let h = 0;
let c0 = [EquationGherkin(h),h];

// prepare empty arrays for all faces and all contour points
let face = [];
let gherkin = [];

// create each floor by revolving a face 
let floorThickness = 0.5
let sc=0.97  // remove 3% from radius so that floors do not stick through shell
for (let hi = 0; hi <= 178; hi+=4)
{
    let floorPoint1 = [0,0,hi-floorThickness]
    let floorPoint2 = [sc*EquationGherkin(hi-floorThickness),0,hi-floorThickness]
    let floorPoint3 = [sc*EquationGherkin(hi),0, hi]
    let floorPoint4 = [0,0,hi]

    face[hi] = Polygon([floorPoint1,floorPoint2,floorPoint3,floorPoint4],true)
    gherkin[hi] = Revolve(face[hi]);
}

// create inner construction, cylinder
let innerConstruction = Cylinder(1,176,false)

// create parallellograms on outside
//     each parallellogram covers 4 floors, so go up with 16 metres
//     until 160 meters (so that top is at 176 meters)
for (let hj = 0; hj <= 160; hj+=16)  
{
        for ( let k = 0; k <= 16 ; k+= 1) 
        // each circle is divided into 16 parallellograms 
        {  
            BuildFacets(16,k,hj);
        }    
} 

// do the same but start 8 meters up (so halfway the first set)
// and shift the points halfway between the first 
// go up by 32 meters to leave out some p-grams
for (let hk = 8; hk <= 160; hk+=32)  
{
        for ( let l = 0.5; l <= 16.5 ; l+= 2) 
        // each circle is divided into 16 parallellograms 
        // use step 2 i.l.o. 1 to leave out regular pattern
        {  
            BuildFacets(16,l,hk)
        }    
}

// finalise regular pattern by adding in some missing facets
for (let hk = 24; hk <= 164; hk+=32)
{
        for ( let l = 1.5; l <= 17.5 ; l += 2)
        {  
                BuildFacets(16,l,hk)            
        }    
} 

// near the top add some triangles to finish the perimeter
for (let hk = 176; hk <= 176; hk+=4)
{
        for ( let l = 0.5; l <= 16.5 ; l +=1)
        {  
            
            let angle_ref    = Math.PI/8 * l
            let angle_aft    = Math.PI/8 * (l-0.5)
            let angle_front  = Math.PI/8 * (l+0.5)

            let xaft   = Math.cos(angle_aft) * EquationGherkin(hk)
            let xfront = Math.cos(angle_front) * EquationGherkin(hk)
            let yaft   = Math.sin(angle_aft) * EquationGherkin(hk)
            let yfront = Math.sin(angle_front) * EquationGherkin(hk)
            let xref   = Math.cos(angle_ref) * EquationGherkin(hk+4)
            let yref   = Math.sin(angle_ref) * EquationGherkin(hk+4)
            
            let pp1    = [xaft, yaft, hk] 
            let pp2    = [xfront, yfront, hk]
            let pp3    = [xref, yref, hk+4]
            Polygon([pp1, pp2, pp3])
        
        }    
} 

