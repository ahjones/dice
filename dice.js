var generate = function() {
    return 1 + (Math.floor(Math.random() * 6));
};

var throw_dice = function() {
    var els = document.getElementsByClassName("number");
    for (var i = 0; i < els.length; i++) {
        els[i].innerHTML = generate().toString();
    }
};

var get_dice_template = function () {
    var request = new XMLHttpRequest();
    request.open("GET", "dice_template.html", false);
    request.send(null);
    return request.responseText;
}

var next_dice_id = 0;
var new_dice = function () {
    var template = get_dice_template();
    var number = generate().toString();
    var dice_id = "dice_" + next_dice_id;

    var html = template.replace(/{{num}}/g, number)
                       .replace(/{{id}}/g, next_dice_id.toString());

    var dice = load_html(html);

    var container = document.getElementsByClassName("container")[0];
    var ghost = document.getElementsByClassName("ghost")[0].parentNode;
    container.insertBefore(dice, ghost);

    whole_dice = document.getElementById(dice_id);
    whole_dice.getElementsByClassName("number")[0].onclick = throw_dice;
    document.getElementById("close_dice_" + next_dice_id)
            .onclick = delete_dice;
    next_dice_id++;
}

var delete_dice = function () {
    var dice = document.getElementById(this.id.replace("close_", ""));
    dice.parentNode.removeChild(dice);
}

var load_html = function (html_string) {
    var elt = document.createElement("div");
    var frag = document.createDocumentFragment();
    elt.innerHTML = html_string;

    while (elt.firstChild) {
        frag.appendChild(elt.firstChild);
    }

    return frag;
};

window.onload = function () {
    var ghost = document.getElementsByClassName("ghost")[0];
    ghost.onclick = new_dice;
    new_dice();
};
