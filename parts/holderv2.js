const defaultParams = {             
    // dimensions of GNS3000 GPS receiver
    gnsLength:     79.25,
    gnsWidth:      45.25,
    gnsHeight:      11.4,
    fit:            1.0,  // tolerance to fit receiver in holder
    thickness:      2.0,  // thickness of holder around receiver
    portionTop:     0.97, // height of holder compared to height of receiver, max 0.87    
    portionSide:    0.7
    }

const r = replicad

function main(
   {  },   // functions used in main, can be empty if r.function notation is used
   { gnsLength, gnsWidth, gnsHeight, fit, 
   thickness, portionTop, portionSide} )  // parameters to adjust the model

  { 
      let length = gnsLength + fit + 10;
      let width  = gnsWidth + fit;
      let height = gnsHeight + fit;
      let radius = gnsHeight/2;

    // create shape of GNS3000 receiver  
    let receiverBody = r.makeBaseBox(length,width,height)
    .fillet(radius,(e)=>e.inDirection("X"));
    
    // create holder by adding thickness to the shape of the GNS receiver
    let holder = r.makeBaseBox(length+2*thickness,width+2*thickness,height+2*thickness)
    .fillet(radius+thickness,(e)=>e.inDirection("X"))
    .translate(0,0,-thickness)
      
    // number of shapes to create cut-outs in the holder  
    let cutterTop = r.makeBaseBox(length+4*thickness, width+4*thickness, height)
    .translate(0,0,portionTop*height)
    let cutterSide= r.makeBaseBox(length*portionSide, width+4*thickness, height)
    .translate(8,0,3)
    let cutterBottom = r.makeBaseBox(length,width*0.8,height)
    .fillet(3,(e)=>e.inDirection("X"))
    .translate(length/2,0,2.0)

      
    let cutterLanyardL = r.makeCylinder(2,20,[-length/2-10,3.5,5],[1,0,0])
    let cutterLanyardR = r.makeCylinder(2,20,[-length/2-10,-3.5,5],[1,0,0])
    let cutterLanyard = r.makeCompound([cutterLanyardL,cutterLanyardR])

    
    holder = holder.cut(receiverBody)
    holder = holder.cut(cutterTop)
    holder = holder.cut(cutterSide)
    holder = holder.cut(cutterBottom)
    holder = holder.cut(cutterLanyard)
    //holder = holder.fillet(2.5,(e)=>e.inBox([length/2-5,50,3],[-length/2+5,-50,3+height]).inDirection("Y"))
    // holder = holder.fillet(0.3,(e)=>e.inBox([-1.2*length/2,-1.2*width/2,5],[1.2*length/2,1.2*width/2,height]))
    holder = holder.fillet(0.5)

    let shapeArray = [
        {shape: receiverBody, name:"receiver", color:"red" },
        {shape: cutterTop, name:"cutterTop", color: "green" , opacity: 0.5},
        {shape: cutterSide, name:"cutterSide", color: "green", opacity:0.5},
        {shape: cutterBottom, name:"cutterBottom", color: "green", opacity:0.5},
        {shape: cutterLanyard, name:"cutterLanyard", color: "green", opacity:0.5},
        {shape: holder, name:"holder", opacity: 1.0},
    ]   

    return  shapeArray
   }