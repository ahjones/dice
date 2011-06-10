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
    next_dice_id++;

    var html = template.replace("{{num}}", number)
                       .replace("{{id}}", dice_id);

    var dice = load_html(html);

    var container = document.getElementsByClassName("container")[0];
    var ghost = document.getElementsByClassName("ghost")[0].parentNode;
    container.insertBefore(dice, ghost);
    document.getElementById(dice_id)
            .getElementsByClassName("number")[0]
            .onclick = throw_dice;
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
