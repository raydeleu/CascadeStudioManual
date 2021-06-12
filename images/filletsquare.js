function FilletRect(x,y,f,center) {
                    if (center == false) 
                    {
                        let p0 = [0,0];
                        let p1 = [x,0];
                        let p2 = [x,y];
                        let p3 = [0,y];
                    }
                    else
                    {
                        let p0 = [-0.5*x,-0.5*y];
                        let p1 = [0.5*x, -0.5*y];
                        let p2 = [0.5*x,  0.5*y];
                        let p3 = [-0.5*x, 0.5*y];
                    }        
                    return new Sketch(p0)
                   .LineTo(p1).Fillet(f)
                   .LineTo(p2).Fillet(f)
                   .LineTo(p3).Fillet(f)
                   .End(true).Fillet(f)
                   .Face();
                 }

