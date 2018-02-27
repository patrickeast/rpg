window.onload = function () {
    $(".characterSelectionArea > a").click(playground.userSelection);
    $(".characterSelectionArea").on("click", "a.character", playground.userSelection);
    var selectionText = $("#makeSelectionText").text("To begin, select your fighter.");
    $("#attackButton").click(playground.fightScenario);
    $("body").on("click", ".resetButton", playground.resetGame);
    // $(".messageArea").hide();
    // $("#makeSelectionText").hide();
    // $(".characterSelectionArea").hide();
    // $("#gameContainer").hide();
    // setInterval(function () {
    //     $("#gameContainer").show()
    // }, 0);
    // setInterval(function () {
    //     $("#makeSelectionText").show()
    // }, 0);
    // setInterval(function () {
    //     $(".characterSelectionArea").show()
    // }, 0);
};






//Character List

var characterA = {
    name: "Old Man Jenkins",
    health: 80,
    damage: Math.floor(Math.random() * 5),
    counterAttack: 5,
    imagePath: "assets/images/oldman.png",
    cssId: "characterA",
    dataAttr: "characterA"
};

var characterB = {
    name: "Mrs. Ramirez",
    health: 100,
    damage: Math.floor(Math.random() * 15),
    counterAttack: 20,
    imagePath: "assets/images/mrsramirez.png",
    cssId: "characterB",
    dataAttr: "characterB"
};

var characterC = {
    name: "Hipster Harry",
    health: 70,
    damage: Math.floor(Math.random() * 15),
    counterAttack: 25,
    imagePath: "assets/images/hipsterbro.png",
    cssId: "characterC",
    dataAttr: "characterC"
};

var characterD = {
    name: "Sally Do-Good",
    health: 110,
    damage: Math.floor(Math.random() * 10),
    counterAttack: 5,
    imagePath: "assets/images/highschool.png",
    cssId: "characterD",
    dataAttr: "characterD"
};

var allCharacters = [characterA, characterB, characterC, characterD];

// $("attackButton").click(function(){
//     $(this).data("clicked", true);
//   });

// if($("#attackButton").data('clicked')) {
//     //clicked element, do-some-stuff
// } else {
//     //run function2
// }

var playground = {
    userSelection: "characterA",
    opponentSelection: "characterA",
    userHealth: 0,
    userDamage: 0,
    opponentHealth: 0,
    opponentDamage: 0,
    chosenFirst: true,
    gamePlaying: false,
    opponentsLeft: 0,


    // -- Reset Scenario
    resetGame: function () {
        playground.userSelection = "characterA";
        playground.opponentSelection = "characterA";
        playground.firstPick = true;
        playground.gamePlaying = false;
        playground.userDamage = 0;
        playground.userHealth = 0;
        playground.opponentDamage = 0;
        playground.opponentHealth = 0;
        playground.opponentsLeft = 0;

        $('.messageArea').show();
        $(".winnerOverlay").hide();
        // $(".").hide();
        $("#makeSelectionText").text("Choose your champion.");
        $(".userSelection").empty();
        $(".opponentSelection").empty();
        playground.makeArena();
    },

    //Make character Box Area
    characterSelectionBoxes: function (theCharacter) {
        return (
            $("<div class='col-3'" + theCharacter.cssId + "'data-character='" + theCharacter.dataAttr + '"> <div class="character-inner"><span id="characterScore">"' + theCharacter.counterAttack + "'</div> <img src='" + theCharacter.imagePath + "'> <span>" + theCharacter.name + "</span> </div></div>"));

    },

    //Show characters in arena
    makeArena: function () {
        for (var i = 0; i < allCharacters.length; i++) {
            $(".characterSelectionArea > div").append(playground.characterSelectionBoxes(allCharacters[i]));
        }
    },

    // function getCertainCharacter(objName) {
    //     var certainCharacter = objName.substr(objName.length - 1);
    //     return certainCharacter;
    // };

    characterSelection: function () {

        if (playground.chosenFirst) {

            // Select Champion
            playground.userSelection = $(this).data("character");
            playground.userSelection = allCharacters[playground.getCertainCharacter(playground.userSelection)];
            $(this)
                .removeClass("col-3")
                .remove()
                .appendTo(".userSelection");
            selectionText.text("Now choose your opponent");
            $(".fighterArena").show();
            $(".messageArea").show();
            playground.userDamage = playground.userSelection.damage;
            playground.userHealth = playground.userSelection.counterAttack;
            playground.firstPick = false;
            playground.opponentsLeft = allCharacters.length - 1;
        } else if (!playground.gamePlaying) {

            // Select Opponent
            playground.opponentSelection = $(this).data("character");
            playground.opponentSelection = allCharacters[playground.getCertainCharacter(playground.opponentSelection)];
            $(this)
                .removeClass("col-4")
                .remove()
                .appendTo(".opponentSelection");
            playground.opponentDamage = playground.opponentSelection.health;
            playground.gamePlaying = true;
            playground.opponentsLeft = playground.opponentsLeft - 1;
        } else {

            // Show alert to fight first
            selectionText.text("Start by selecting a champion.");
        }
    },

    getCertainCharacter: function(objName) {
        var certainCharacter = objName.substr(objName.length - 1);
        return certainCharacter;
      },


    fightScenario: function () {

        //on click event of attack button
        $("#attackButton").on("click", function () {

            //Create randomization for damage selectors
            characterDamage = Math.floor(Math.random() * 25);
            opponentDamage = Math.floor(Math.random() * 25);

            //Update alert message with damage amount for both character and opponent
            $("#yourAlertMessage").text("You attacked your opponent for " + characterDamage + " damage!");
            $("#opponentAlertMessage").text("Your opponent attacked you for " + opponentDamage + " damage!");
            // characterA.health = characterA.health - opponentDamage;
            // characterC.health = characterC.health - characterDamage;
            $("#CharacterAScore").text("Health: " + characterA.health);
            $("#CharacterCScore").text("Health: " + characterC.health);
            console.log("Your opponent attacked you for " + opponentDamage + " damage!");
            console.log("Your health is " + characterA.health);
            console.log("You attacked your opponent for " + characterDamage + " damage");
            console.log("Your opponent's health is " + characterC.health);
        })
    }
};
playground.makeArena();