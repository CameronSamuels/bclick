/*==========
    Copyright 2016 Cameron Samuels
    Leave this copyright header intact in order to edit this file
    Do not sell this for value of anything
    You may edit this and/or distribute this for free as long as you say it has originated from me
==========*/

function rgbToHex(r, g, b) {
    var hex = [];
    var rgb = [r, g, b];
    for (i = 0; i < 3; i++) {
        var part = rgb[i].toString(16);
        hex.push(part.length == 1 ? "0" + part : part);
    }
    return "#" + hex[0] + hex[1] + hex[2];
}