window.onload = function () {
    $(".characterSelectionArea div").text(playground.userSelection);
    $(".characterSelectionArea").text(playground.userSelection);
    var selectionText = $("#makeSelectionText").text("To begin, select your fighter.");
    $("#attackButton").click(playground.fightScenario);
    $("#resetButton").click(playground.resetGame);
    // $(".messageArea").hide();
    // $("#makeSelectionText").hide();
    // $(".characterSelectionArea").hide();
    // $("#gameContainer").hide();
    // setInterval(function () {
    //     $("#gameContainer").show()
    // }, 1000);
    // setInterval(function () {
    //     $("#makeSelectionText").show()
    // }, 1500);
    // setInterval(function () {
    //     $(".characterSelectionArea").show()
    // }, 2000);
};






//Character List

var characterA = {
    name: "Old Man Jenkins",
    health: 80,
    damage: Math.floor(Math.random() * 5),
    counterAttack: 5,
    imagePath: "assets/images/oldman.png",
    cssClass: "character-oldman",
    dataAttr: "character"
};

var characterB = {
    name: "Mrs. Ramirez",
    health: 100,
    damage: Math.floor(Math.random() * 15),
    counterAttack: 20,
    imagePath: "assets/images/mrsramirez.png",
    cssClass: "character-ramirez",
    dataAttr: "characterB"
};

var characterC = {
    name: "Hipster Harry",
    health: 70,
    damage: Math.floor(Math.random() * 15),
    counterAttack: 25,
    imagePath: "assets/images/hipsterbro.png",
    cssClass: "character-hipster",
    dataAttr: "characterC"
};

var characterD = {
    name: "Sally Do-Good",
    health: 110,
    damage: Math.floor(Math.random() * 10),
    counterAttack: 5,
    imagePath: "assets/images/highschool.png",
    cssClass: "character-teenager",
    dataAttr: "characterD"
};

var allCharacters = [characterA, characterB, characterC, characterD];

var playground = {
    userSelection: undefined,
    opponentSelection: undefined,
    userHealth: 0,
    userDamage: 0,
    opponentHealth: 0,
    opponentDamage: 0,
    chosenFirst: true,
    gamePlaying: false,
    opponentsLeft: 0,


    // -- Reset Scenario
    resetGame: function () {
        playground.userSelection = undefined;
        playground.opponentSelection = undefined;
        playground.firstPick = true;
        playground.gamePlaying = false;
        playground.userDamage = 0;
        playground.userHealth = 0;
        playground.opponentDamage = 0;
        playground.opponentHealth = 0;
        playground.opponentsLeft = 0;

        $('.messageArea').show();
        $(".winnerOverlay").hide();
        $("#makeSelectionText").text("Choose your champion.");
        $(".userSelection").empty();
        $(".opponentSelection").empty();
        playground.makeArena();
    },

    //Make character Box Area
    characterSelectionBoxes: function (theCharacter) {
        return (
            $("<div class='col-3'" + 
            theCharacter.cssClass + 
            "'data-character='" + 
            theCharacter.dataAttr + 
            "</div>" + 
            "<div class='character-inner'><span id='characterScore'" + 
            "</div>" + 
            theCharacter.health + "<img src='" + 
            theCharacter.imagePath + 
            "'><span>" + 
            theCharacter.name + 
            "</span>"));

    },

    //Show characters in arena
    makeArena: function () {
        for (var i = 0; i < allCharacters.length; i++) {
            $(".characterSelectionArea > div").append(playground.characterSelectionBoxes(allCharacters[i]));
        }
    },

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

    getCertainCharacter: function (objName) {
        var certainCharacter = objName.substr(objName.length - 1);
        return certainCharacter;
    },


    fightScenario: function () {

        //on click event of attack button
       if (playground.gamePlaying) {
           playground.userDamage = playground.userDamage + playground.userSelection.damage;
           playground.opponentHealth = playground.opponentHealth - playground.userDamage;
           $(".userSelection .damage").text(playground.opponentHealth);

           playground.userHealth = playground.user - playground.opponentSelection.counterAttack;
           $(".opponentSelection .damage").text(playground.userHealth);

        
       }
    },
    // -- Fight
  fight: function() {
    if (playground.gamePlaying) {

      // Attack
      playground.userDamage = playground.userDamage + playground.userSelection.damage;
      console.log(playground.userDamage);
      playground.opponentHealth = playground.opponentHealth - playground.userDamage;
      $(".opponentSelection .damage").text(playground.opponentHealth);

      // Counter Attack
      playground.userHealth = playground.userHealth - playground.opponentSelection.counterAttack;
      $(".userSelection .damage").text(playground.userHealth);

      // Display Stats
      playground.alertDanger(
        "You attacked " + playground.opponentSelection.name + 
        " for " + playground.userDamage + " damage.\n" + 
        playground.opponentSelection.name + " attacked you back for " + 
        playground.opponentSelection.counterAttack + " damage."
      );

      // Test for Dead
      if (playground.userHealth < 0) {
        // user has lost
				playground.alertDanger(playground.userSelection.name + " is DEAD. Hmm, you it was. " + playground.userSelection.pronoun + " family will be sad. Try again you must.");
				playground.resetGame();
      } else if (playground.opponentHealth < 0) {
        // opponent has lost
				playground.alertDanger(playground.opponentSelection.name + " is DEAD. " + playground.opponentSelection.pronoun +" family will be sad.");
				$(".opponentSelection").empty();
				playground.fightActive = false;
        playground.opponentHealth = 0;
        // Test for win
        if (playground.opponentsLeft === 0){
          playground.winScreen();
        }
      }
    } else {
      playground.alertDanger("Choose an opponent to fight first you must!");
    }
  },
  
  // -- For the win
  winScreen: function() {
    $('.win-screen').removeClass("hide");
    $('.messageArea').addClass('visually-hidden');
  },

	alertDanger: function(message) {
    $(".message").text(message).removeClass("visually-hidden");
  },

};


playground.makeArena();