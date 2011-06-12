var dice = (function () {
    var generate = function() {
        return 1 + (Math.floor(Math.random() * 6));
    };

    var throw_dice = function() {
        var els = document.getElementsByClassName("number");
        for (var i = 0; i < els.length; i++) {
            els[i].innerHTML = generate().toString();
        }
        save_state();
    };

    var get_template = function (fname) {
        var request = new XMLHttpRequest();
        request.open("GET", fname, false);
        request.send(null);
        return request.responseText;
    };

    var get_dice_template = function () {
        return get_template("dice_template.html");
    };

    var get_ghost_template = function () {
        return get_template("ghost_template.html");
    };

    var new_dice = function () {
        create_dice(generate().toString());
        save_state();
    };

    var next_dice_id = 0;
    var create_dice = function (number) {
        var template = get_dice_template();
        var dice_id = "dice_" + next_dice_id;

        var html = template.replace(/{{num}}/g, number)
                           .replace(/{{id}}/g, next_dice_id.toString());

        var dice = load_html(html);

        var container = document.getElementById("container");
        var ghost = document.getElementsByClassName("ghost")[0].parentNode;
        container.insertBefore(dice, ghost);

        whole_dice = document.getElementById(dice_id);
        whole_dice.getElementsByClassName("number")[0].onclick = throw_dice;
        document.getElementById("close_dice_" + next_dice_id)
                .onclick = delete_dice;
        next_dice_id++;
    };

    var delete_dice = function () {
        save_state();
        var dice = document.getElementById(this.id.replace("close_", ""));
        dice.parentNode.removeChild(dice);
        return false;
    };

    var load_html = function (html_string) {
        var elt = document.createElement("div");
        var frag = document.createDocumentFragment();
        elt.innerHTML = html_string;

        while (elt.firstChild) {
            frag.appendChild(elt.firstChild);
        }

        return frag;
    };

    var save_state = function () {
        var dice = document.getElementsByClassName("number");
        var numbers = []
        for (var i = 0; i < dice.length; i++) {
           numbers.push(dice[i].innerHTML); 
        }

        history.pushState( { numbers: numbers }, "" );
    };

    var restore_state = function (event) {
        if (event.state) {
            var container = document.getElementById("container");
            container.innerHTML = "";

            add_ghost();
            for (var num in event.state.numbers) {
                create_dice(event.state.numbers[num]);
            }
        }
    };

    var add_ghost = function () {
        var ghost = load_html(get_ghost_template());
        var body = document.getElementById("container");
        body.appendChild(ghost);
        ghost = document.getElementById("ghost");
        ghost.onclick = new_dice;
    };

    var init = function () {
        add_ghost();
        new_dice();
        save_state();
    };

    return {
        init: init,
        popState: restore_state
    };
}());

window.onload = dice.init;
window.onpopstate = dice.popState;
