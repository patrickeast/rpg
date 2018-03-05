window.onload = function () {

    var selectionText = $("#makeSelectionText").text("To begin, select your fighter.");
    $(document).on("click", ".characterFighter", playground.characterSelection);
    $(".characterFighter").on("click", function () {
        $(".messageArea").show();
    });
    $("#attackButton").click(playground.fightScenario);
    $("body").on("click", "#resetButton", playground.resetGame);
    $(".messageArea").hide();
    $("#makeSelectionText").hide();
    $(".characterSelectionArea").hide();
    $("#gameContainer").hide();
    setInterval(function () {
        $("#gameContainer").show()
    }, 1000);
    setInterval(function () {
        $("#makeSelectionText").show()
    }, 2000);
    setInterval(function () {
        $(".characterSelectionArea").show()
    }, 3000);
};






//Character List

var characterA = {
    name: "Old Man Jenkins",
    health: 80,
    damage: 5,
    counterAttack: 5,
    imagePath: "assets/images/oldman.png",
    // cssClass: "character-oldman",
    dataAttr: "character0",
    selected: false,
};

var characterB = {
    name: "Mrs. Ramirez",
    health: 100,
    damage: Math.floor(Math.random() * 15),
    counterAttack: 20,
    imagePath: "assets/images/mrsramirez.png",
    // cssClass: "character-ramirez",
    dataAttr: "character1",
    selected: false,

};

var characterC = {
    name: "Hipster Harry",
    health: 70,
    damage: Math.floor(Math.random() * 15),
    counterAttack: 25,
    imagePath: "assets/images/hipsterbro.png",
    // cssClass: "character-hipster",
    dataAttr: "character2",
    selected: false,

};

var characterD = {
    name: "Sally Do-Good",
    health: 110,
    damage: Math.floor(Math.random() * 10),
    counterAttack: 5,
    imagePath: "assets/images/highschool.png",
    // cssClass: "character-teenager",
    dataAttr: "character3",
    selected: false,

};


var allCharacters = [characterA, characterB, characterC, characterD];


var playground = {
    userSelection: "character0",
    opponentSelection: "character0",
    userHealth: 0,
    userDamage: 0,
    opponentHealth: 0,
    opponentDamage: 0,
    chosenFirst: true,
    gamePlaying: false,
    opponentsLeft: 0,


    // -- Reset Scenario
    resetGame: function () {
        console.log("resetGame function is running.");
        playground.userSelection = "character0";
        playground.opponentSelection = "character0";
        playground.firstPick = true;
        playground.gamePlaying = false;
        playground.userDamage = 0;
        playground.userHealth = 0;
        playground.opponentDamage = 0;
        playground.opponentHealth = 0;
        playground.opponentsLeft = 0;

        $('.messageArea').show();
        $(".winnerOverlay").hide();
        var selectionText = $("#makeSelectionText");
        selectionText.text("Choose your champion.");
        $(".userSelection").empty();
        $(".opponentSelection").empty();
        $(".characterSelectionArea").empty();
        playground.makeArena();
    },
    //Show characters in arena
    makeArena: function () {
        console.log("makeArena Function is running.");
        for (var i = 0; i < allCharacters.length; i++) {
            $(".characterSelectionArea > div").append(playground.makeCharacters(allCharacters[i]));
            console.log(allCharacters[i]);
        }
    },

    //Make character Box Area//
    makeCharacters: function (theCharacter) {
        console.log("makeCharacters is running.");
        return (
            $('<div data-select="' + theCharacter.selected + '" class="col-3 characterFighter"' + "data-character=" + theCharacter.dataAttr + " " + "</div>" + '<div class="character-inner"><span id="characterScore"' + "</div>" + "Health: " + theCharacter.health + "<img src='" + theCharacter.imagePath + "'><span>" + theCharacter.name + "</span>"));
        console.log(theCharacter);
    },


    characterSelection: function () {
        console.log("CharacterSelection Function is running.");
        $(this).attr("data-select");
        // if (allCharacters[i].selected = true) {
        //     console.log($(this).attr("data-select"));
            
        
        if (playground.chosenFirst) {
            // Select Champion
            playground.userSelection = $(this).attr("data-select");

            $(this)
                .addClass("yourFighter")
                .remove()
                .appendTo(".userSelection");
            $("#makeSelectionText").text("Now choose your opponent");
            playground.userDamage = playground.userSelection.damage;
            playground.userHealth = playground.userSelection.counterAttack;
            playground.firstPick = false;
            playground.opponentsLeft = allCharacters.length - 1;

        } 
        else if (!playground.gamePlaying) {

            //Now select your opponent
            playground.opponentSelection = $(this).attr("data-select");
            $(this)
                .removeClass("col-3")
                .remove()
                .appendTo(".opponentSelection");
            playground.opponentDamage = playground.opponentSelection.health;
            playground.gamePlaying = true;
            playground.opponentsLeft = playground.opponentsLeft - 1;
            $("makeSelectionText").text("Fight!");
        } else {

            //First text area alert
            $("#makeSelectionText").text("Start by selecting a champion.");
        }
        return;
    },




    fightScenario: function () {
        console.log("fightScenario function is running.");
        if (playground.gamePlaying) {

            // Attack
            playground.userDamage = playground.userDamage + playground.userSelection.damage;
            console.log(playground.userDamage);
            playground.opponentHealth = playground.opponentHealth - playground.userDamage;
            $(opponentSelection.damage).text(playground.opponentHealth);

            // Counter Attack
            playground.userHealth = playground.userHealth - playground.opponentSelection.counterAttack;
            $(userSelection.damage).text(playground.userHealth);

            // Display Stats
            selectionText.text(
                "You attacked " + playground.opponentSelection.name +
                " for " + playground.userDamage + " damage.\n" +
                playground.opponentSelection.name + " attacked you back for " +
                playground.opponentSelection.counterAttack + " damage."
            );

            // Test for Dead
            if (playground.userHealth < 0) {
                // user has lost
                selectionText.text(playground.userSelection.name + " has been defeated." + playground.userSelection.pronoun + " family will be sad. Try again you must.");
                playground.resetGame();
            } else if (playground.opponentHealth < 0) {
                // opponent has lost
                selectionText.text(playground.opponentSelection.name + " has been defeated. " + playground.opponentSelection.pronoun + " family will be sad.");
                $(".opponentSelection").empty();
                playground.fightActive = false;
                playground.opponentHealth = 0;
                // Test for win
                if (playground.opponentsLeft === 0) {
                    playground.winScreen();
                }
            }
        } else {
            var selectionText = $("#makeSelectionText");
            selectionText.text("You have to pick an opponent to fight first!");
        }
    },
};

playground.makeArena();