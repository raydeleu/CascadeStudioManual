function equationGherkin(x)
{
    let pt1 = x*x - 144*x + 5184;
    let pt2 = pt1 / 11664;
    let pt3 = 1-pt2;
    let pt4 = Math.sqrt(pt3);
    let y   = 28.25 * pt4;
    return y
}

// evaluate the function starting a height h=0
let h = 0;
let c0 = [equationGherkin(h),h];
let calculatedGherkin = new Sketch(c0)

for (let hi = 1; hi <= 180; hi+=4)
{
    calculatedGherkin.LineTo( [ equationGherkin(hi) , hi])

}
calculatedGherkin.LineTo([0,180])
calculatedGherkin.LineTo([0,0])
calculatedGherkin.LineTo(c0);
calculatedGherkin.End();
// calculatedGherkin.Face();

// revolve the sketch
Rotate( [1,0,0],90,
        Revolve(calculatedGherkin.Face()
                ,360,[0,1,0], true, true
                )
        )