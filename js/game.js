const wall_width = document.querySelector(".wall").offsetWidth;

document.querySelector(".back").style.transform = "translateZ(" + wall_width + "px)";
document.querySelector(".container_outer").style.perspective = wall_width / 2 + "px";
document.querySelector(".container").style.transformOrigin = "50% 50% " + wall_width / 2 + "px";

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

var newX;
var newZ;
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
        newX = x + move_step * Math.cos(rotate_val * Math.PI / 180);
        newZ = z + move_step * Math.sin(rotate_val * Math.PI / 180);

        if (newX <= maxX && newZ <= maxZ) {
            x = newX;
            z = newZ;
        }
    }
    //s
    else if (e.keyCode == 115) {
        newX = x - move_step * Math.cos(rotate_val * Math.PI / 180);
        newZ = z - move_step * Math.sin(rotate_val * Math.PI / 180);

        if (newX >= minX && newZ >= minZ) {
            x = newX;
            z = newZ;
        }
    }
    //a
    else if (e.keyCode == 97) {
        newX = x + move_step * Math.sin(rotate_val * Math.PI / 180);
        newZ = z - move_step * Math.cos(rotate_val * Math.PI / 180);

        if (newX <= maxX && newZ >= minZ) {
            x = newX;
            z = newZ;
        }
    }
    //d
    else if (e.keyCode == 100) {
        newX = x - move_step * Math.sin(rotate_val * Math.PI / 180);
        newZ = z - move_step * Math.cos(rotate_val * Math.PI / 180);

        if (newX >= minX && newZ >= minZ) {
            x = newX;
            z = newZ;
        }
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
    
    // Restraints - for safety
    
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