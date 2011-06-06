var generate = function() {
    return 1 + (Math.floor(Math.random() * 6));
};

var throw_dice = function() {
    var els = document.getElementsByClassName("number");
    for (var i = 0; i < els.length; i++) {
        els[i].innerHTML = generate().toString();
    }
};

var new_dice = function () {
    var body = document.getElementsByTagName("body")[0];
    var ghost = document.getElementsByClassName("ghost")[0];

    var dice = document.createElement("span");

    dice.setAttribute("class", "number dice");
    dice.innerHTML = generate().toString();
    dice.onclick = throw_dice;

    body.insertBefore(dice, ghost);
};

window.onload = function () {
    var ghost = document.getElementsByClassName("ghost")[0];
    ghost.onclick = new_dice;
};
