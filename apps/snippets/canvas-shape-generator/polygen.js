/*=========
    -Copyright 2016 Cameron Samuels
    -Leave this liscense header intact or else (-:
    -You may change this code, but not sell this code
        for any value of anything
    -You may use this for commercial use or distributing
        use but may not  use as if it were yours.
    -This liscense violates if you remove this copyright header
=========*/

var PolyGen = {};

//function to be called to generate the shape in the canvas
    //Paramaters: sides, integer, How many sides the shape has
function polygon(sides) {
	PolyGen.Context.clearRect(0, 0, PolyGen.Canvas.width, PolyGen.Canvas.height);

	var size = PolyGen.Size, Xcenter = (PolyGen.Canvas.width / 2), Ycenter = (PolyGen.Canvas.height / 2);
	PolyGen.Context.beginPath();
	PolyGen.Context.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          
	for (var i = 1; i <= sides;i += 1) {
	    PolyGen.Context.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / sides), Ycenter + size * Math.sin(i * 2 * Math.PI / sides));
	}
    PolyGen.Context.strokeStyle = PolyGen.Color;
	PolyGen.Context.lineWidth = PolyGen.Thickness;
	PolyGen.Context.stroke();
}