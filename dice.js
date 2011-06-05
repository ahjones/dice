var throw_dice = function() {
    var generate = function() {
        return 1 + (Math.floor(Math.random() * 6));
    };

    var els = document.getElementsByClassName("number");
    for (var i = 0; i < els.length; i++) {
        els[i].innerHTML = generate().toString();
    }
};

window.onload = function () {
    var els = document.getElementsByClassName("number");
    for (var i = 0; i < els.length; i++) {
        els[i].onclick = throw_dice;
    }
    throw_dice();
};
