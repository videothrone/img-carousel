//adding and removing the classes

(function() {
    var kitties = document.getElementsByClassName("kitty");
    var current = 0;
    var dots = document.getElementsByClassName("dot");
    var timer;
    var transitioningRightNow = false;

    setTimeout(moveKitties, 5000);
    //event delegation
    document.addEventListener("transitionend", function(e) {
        if (e.target.classList.contains("exit")) {
            e.target.classList.remove("exit");
            // setTimeout(moveKitties, 5000);
            timer = setTimeout(moveKitties, 5000);
            transitioningRightNow = false;
        }
    });

    // i is out of scope, solve scope problem
    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", getDotClickHandler(i));
    }

    function getDotClickHandler(number) {
        return function(e) {
            // if user clicks on invalid dot that is already on, nothing should happen
            if (e.target.classList.contains("dot-full")) {
                return;
            }
            // if user clicks dot whle transition is happening
            if (transitioningRightNow) {
                return;
            }
            clearTimeout(timer);
            // console.log("the index is " + n);
            moveKitties(number);
        };
    }

    function moveKitties(next) {
        //remove onscreen and add exit classes to the current
        transitioningRightNow = true;
        kitties[current].classList.remove("onscreen");
        dots[current].classList.remove("dot-full");
        kitties[current].classList.add("exit");

        // console.log("the current kitty is " + current);

        if (typeof next == "undefined") {
            current++;
            if (current >= kitties.length) {
                current = 0;
            }
        } else {
            current = next;
        }

        //add onscreen class to the next one
        kitties[current].classList.add("onscreen");
        dots[current].classList.add("dot-full");
        // console.log("new kitty is " + current);
    }
})();
