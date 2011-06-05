var throw_dice = function() {
    var generate = function() {
        return 1 + (Math.floor(Math.random() * 6));
    };

    var el = document.getElementById("number");
    el.innerHTML = generate().toString();
};

window.onload = function () {
    document.getElementById("number").onclick = throw_dice;
    throw_dice();
};
