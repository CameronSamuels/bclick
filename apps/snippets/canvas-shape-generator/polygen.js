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
PolyGen.create = function(sides) {
	PolyGen.context.clearRect(0, 0, PolyGen.canvas.width, PolyGen.canvas.height);

	var size = PolyGen.size, x = (PolyGen.canvas.width / 2), y = (PolyGen.canvas.height / 2);
	PolyGen.context.beginPath();
	PolyGen.context.moveTo (x +  size * Math.cos(0), y +  size *  Math.sin(0));          
	for (var i = 1; i <= sides;i += 1) {
	    PolyGen.context.lineTo(x + size * Math.cos(i * 2 * Math.PI / sides), y + size * Math.sin(i * 2 * Math.PI / sides));
	}
    PolyGen.context.strokeStyle = PolyGen.color;
	PolyGen.context.lineWidth = PolyGen.thickness;
	PolyGen.context.stroke();
};