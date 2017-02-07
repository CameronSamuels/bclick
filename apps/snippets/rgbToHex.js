/*==========
    Copyright 2017 Cameron Samuels
    Leave this copyright header intact in order to edit this file
    Do not sell this for value of anything
    You may edit this and/or distribute this for free as long as you say you got it from my website

    This code works by calling the rgbToHex() function with the arguments of the R, G, and B.
    Call that function with the correct rgb arguments to get a returned value of the hex code without the "#"
==========*/

function rgbToHex(r, g, b) {
    var hex = [];
    var rgb = [r, g, b];
    for (i = 0; i < 3; i++) {
        var part = rgb[i].toString(16);
        hex.push(part.length == 1 ? "0" + part : part);
    }
    return hex[0] + hex[1] + hex[2];
}