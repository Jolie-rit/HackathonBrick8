document.querySelector(".back").style.transform = "translateZ(" + document.querySelector(".wall").offsetWidth + "px)";

//Movement

// Constants for restraints
const minZ = -700;
const maxZ = 600;
const maxX = 0.33 * document.querySelector(".wall").offsetWidth;
const minX = -1 * 0.66 * document.querySelector(".wall").offsetWidth;

// Position variables
var z = 0;
var x = 0;
var y = 0;
const move_step = 5;
const rotate_step = 1;

//Look Around
var rotateY = 0;
var rotateX = 0;

document.body.addEventListener('keypress', move);
document.body.addEventListener('keyup', jump);

//Movement and looking around

function move(e) {
    document.querySelector(".container").style.transition = "0s"; // resetting the transition, in case it is changed by the jump()

    var rotate_val;

    if (document.querySelector(".container").style.transform == "") {
        rotate_val = 0;
    }
    else {
        rotate_val = 90 + parseInt(document.querySelector(".container").style.transform.split("rotateY(")[1].split("deg")[0]);
    }

    //w
    if (e.keyCode == 119) {
        x += move_step * Math.cos(rotate_val * Math.PI / 180);
        z += move_step * Math.sin(rotate_val * Math.PI / 180);
    }
    //s
    else if (e.keyCode == 115) {
        x -= move_step * Math.cos(rotate_val * Math.PI / 180);
        z -= move_step * Math.sin(rotate_val * Math.PI / 180);
    }
    //a
    else if (e.keyCode == 97) {
        x += move_step * Math.sin(rotate_val * Math.PI / 180);
        z -= move_step * Math.cos(rotate_val * Math.PI / 180);
    }
    //d
    else if (e.keyCode == 100) {
        x -= move_step * Math.sin(rotate_val * Math.PI / 180);
        z += move_step * Math.cos(rotate_val * Math.PI / 180);
    }
    //up i
    else if (e.keyCode == 105) {
        rotateX += rotate_step;
    }
    //down k
    else if (e.keyCode == 107) {
        rotateX -= rotate_step;
    }
    //left j
    else if (e.keyCode == 106) {
        rotateY -= rotate_step;
    }
    //right l
    else if (e.keyCode == 108) {
        rotateY += rotate_step;
    }
    
    // Restraints
    
    if (rotateY > 90) {
        rotateY = 90;
    }
    else if (rotateY < -90) {
        rotateY = -90;
    }

    if (rotateX > 90) {
        rotateX = 90;
    }
    else if (rotateX < -90) {
        rotateX = -90;
    }

    if (z > maxZ) {
        z = maxZ;
    }
    else if (z < minZ) {
        z = minZ;
    }

    if (x > maxX) {
        x = maxX;
    }
    else if (x < minX) {
        x = minX;
    }
    
    
    document.querySelector(".container").style.transformOrigin = innerWidth / 2 - x + "px " + "50% " + (1000 - z) + "px"; // changing anchor point to current position
    document.querySelector(".container").style.transform = "translateZ(" + z + "px) translateX(" + x + "px)" + "rotateX(" + rotateX + "deg) " + "rotateY(" + rotateY + "deg)";
}

function jump(e) {
    //spacebar              
    if (e.keyCode == 32) {
        //Jump
        y = 10;
        document.querySelector(".container").style.transition = "0.6s";
        document.querySelector(".container").style.transform = "translateZ(" + z + "px) translateX(" + x + "px)" + "rotateX(" + rotateX + "deg) " + "rotateY(" + rotateY + "deg)" + "translateY(" + y + "%)";
        setTimeout(() => {
            y = 0;
            document.querySelector(".container").style.transform = "translateZ(" + z + "px) translateX(" + x + "px)" + "rotateX(" + rotateX + "deg) " + "rotateY(" + rotateY + "deg)" + "translateY(" + y + "%)";
        }, 600);
    }
}