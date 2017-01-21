function id(id) {
    return document.getElementById(id);
}
var panels = document.getElementsByClassName('panel');
for (i = 0; i < panels.length; i++) {
    panels[i].style.backgroundColor = 'rgb(0, 0, 0)';
    // panels[i].setAttribute('onclick', 'ClickedPanel("' + panels[i].getAttribute('id') + '")');
}

window.addEventListener('orientationchange', OrientationChange);
OrientationChange();


function OrientationChange() {
    switch (window.orientation) {
        case 90:
            case -90:
                alert("Rotate Device To Portrait To Play!");
                break;
        default:
            
    }
}

var ele;
function ClickedPanel(ele) {
    ele = id(ele);
    if (ele.style.backgroundColor == 'rgb(0, 0, 0)') {
        ele.style.backgroundColor = 'rgb(255, 0, 0)';
    }
    else if (ele.style.backgroundColor == 'rgb(255, 0, 0)') {
        ele.style.backgroundColor = 'rgb(0, 0, 255)';
    }
    else if (ele.style.backgroundColor == 'rgb(0, 0, 255)') {
        ele.style.backgroundColor = 'rgb(0, 0, 0)';
    }
} 