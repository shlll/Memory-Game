var selectedCards = [];
var moveCounts = 0;
var correctCounts = 0;
var starsCount = 0;
var nextClickEnable = true;

//setup the card click event
var arrayCards = document.getElementsByClassName("card");
for (var index = arrayCards.length - 1; index >= 0; index--) {
    setUpCardEventListener(arrayCards[index]);
}

function setUpCardEventListener(card) {
    card.addEventListener("click", function (event) {
        //if a card is open/show or match, can't click again
        var isOpen = card.classList.contains("open");
        var isShow = card.classList.contains("show");
        var isMatch = card.classList.contains("match");
        if (isOpen || isShow || isMatch || !nextClickEnable) {
            return;
        }

        card.classList.add("open", "show");
        selectedCards.push(card);

        if (selectedCards.length == 2) {
            //setup move count and stars
            moveCounts++;
            setupStarsAndMove();
            //next click will available until animation is completed
            nextClickEnable = false;
            //match
            if (selectedCards[0].querySelector("i").classList[1] == selectedCards[1].querySelector("i").classList[1]) {
                selectedCards[0].classList.add("match");
                selectedCards[1].classList.add("match");
                setTimeout(function start() {
                    correctCounts = correctCounts + 2;
                    if (correctCounts == arrayCards.length) {
                        alert("Congratulations! You win with " + moveCounts + " and " + starsCount + " stars!Wooooooo! Click OK to play again!");
                        window.location.reload();
                    }
                    selectedCards = [];
                    //next click will available until animation is completed
                    nextClickEnable = true;
                }, 1000);
            } else {
                //not match
                selectedCards[0].classList.add("notmatch");
                selectedCards[1].classList.add("notmatch");
                setTimeout(function start() {
                    selectedCards[0].classList.remove("notmatch");
                    selectedCards[0].classList.remove("show", "open");
                    selectedCards[1].classList.remove("notmatch");
                    selectedCards[1].classList.remove("show", "open");
                    selectedCards = [];
                    //next click will available until animation is completed
                    nextClickEnable = true;
                }, 1000);
            }
        }

    });
}

//setup move count and stars
function setupStarsAndMove() {
    document.getElementsByClassName("moves")[0].innerHTML = moveCounts;
    var starsArray = document.getElementsByClassName("fa fa-star");
    console.log(starsArray);
    if (moveCounts <= 15) {
        starsCount = 3;
    } else if (moveCounts > 15 && moveCounts <= 20) {
        starsCount = 2;
        starsArray[2].classList.add("star-hidden");
        console.log("a");
    } else if (moveCounts > 20 && moveCounts <= 30) {
        starsCount = 1;
        starsArray[2].classList.add("star-hidden");
        starsArray[1].classList.add("star-hidden");
        console.log("b");
    } else {
        starsCount = 0;
        starsArray[2].classList.add("star-hidden");
        starsArray[1].classList.add("star-hidden");
        starsArray[0].classList.add("star-hidden");
        console.log("c");
    }
}

document.getElementsByClassName("restart")[0].addEventListener("click", function (event) {
    window.location.reload();
});