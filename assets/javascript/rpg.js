//global variables defined:

var selectionText = $("#makeSelectionText").text("To begin, select your fighter.");
var oldManJenkinsHealth = 80;
var mrsramirezHealth = 130;
var hipsterbroHealth = 100;
var highschoolerHealth = 110;
var oldManJenkins = $("#CharacterAScore").html("Health: " + oldManJenkinsHealth);
var mrsramirez = $("#CharacterBScore").html("Health: " + mrsramirezHealth);
var hipsterbro = $("#CharacterCScore").html("Health: " + hipsterbroHealth);
var highschooler = $("#CharacterDScore").html("Health: " + highschoolerHealth);


// $("attackButton").click(function(){
//     $(this).data("clicked", true);
//   });

// if($("#attackButton").data('clicked')) {
//     //clicked element, do-some-stuff
// } else {
//     //run function2
// }

function characterSelection() {

    var character = $("#yourSelectionBox");
    var opponent = $("#opponentSelectionBox");

   if ($("#characterABox").on("click", function () {
        console.log("Old Man Jenkins will fight...");
        $("#yourSelectionBox").replaceWith($("#characterABox"));
        $(selectionText).text("Now select your opponent.");
        opponentSelection();
    }));
    
    else if ($("#characterBBox").on("click", function () {
        console.log("Mrs. Ramirez will fight...");
        $("#yourSelectionBox").replaceWith($("#characterBBox"));
        $(selectionText).text("Now select your opponent.");
        opponentSelection();
    }));
    
    else if ($("#characterCBox").on("click", function () {
        console.log("Hipster Bro will fight...");
        $("#yourSelectionBox").replaceWith($("#characterCBox"));
        $(selectionText).text("Now select your opponent.");
        opponentSelection();
    }));
    
    else if ($("#characterDBox").on("click", function () {
        console.log("High Schooler will fight...");
        $("#yourSelectionBox").replaceWith($("#characterDBox"));
        $(selectionText).text("Now select your opponent.");
        opponentSelection();
    }));
}

function opponentSelection() {
    
    $("#characterABox").on("click", function () {
        console.log("against Old Man Jenkins!");
        $("#opponentSelectionBox").replaceWith($(this));
        $(selectionText).html("<h2>" + "Fight!" + "</h2>");
        $("#characterSelectionArea").hide();
        console.log("Ready? Fight!");
        fightScenario();
    });
    
    $("#characterBBox").on("click", function () {
        console.log("against Mrs. Ramirez!");
        $("#opponentSelectionBox").replaceWith(this);
        $(selectionText).html("<h2>" + "Fight!" + "</h2>");
        $("#characterSelectionArea").hide();
        console.log("Ready? Fight!");
        fightScenario();        
    });
    
    $("#characterCBox").on("click", function () {
        console.log("against Hipster Bro!");
        $("#opponentSelectionBox").replaceWith(this);
        $(selectionText).html("<h2>" + "Fight!" + "</h2>");
        $("#characterSelectionArea").hide();
        console.log("Ready? Fight!");
        fightScenario();
    });
    
    $("#characterDBox").on("click", function () {
        console.log("against High Schooler!");
        $("#opponentSelectionBox").replaceWith(this);
        $(selectionText).html("<h2>" + "Fight!" + "</h2>");
        $("#characterSelectionArea").hide();
        fightScenario();
        console.log("Ready? Fight!");
    });

}

function fightScenario() {
    //Make HTML IDs equal to variables
    var character = $("#yourSelectionBox");
    var opponent = $("#opponentSelectionBox");
    var characterScore = $("#characterScore");
    var opponentScore = $("#opponentScore");


    

    //on click event of attack button
    $("#attackButton").on("click", function() {
        
        //Create randomization for damage selectors
        characterDamage = Math.floor(Math.random() * 25);
        opponentDamage = Math.floor(Math.random() * 25);
        
        //Update alert message with damage amount for both character and opponent
        $("#yourAlertMessage").text("You attacked your opponent for " + characterDamage + " damage!");
        $("#opponentAlertMessage").text("Your opponent attacked you for " + opponentDamage + " damage!");
        oldManJenkinsHealth = oldManJenkinsHealth - opponentDamage;
        hipsterbroHealth = hipsterbroHealth - characterDamage;
        $("#CharacterAScore").text("Health: " + oldManJenkinsHealth);
        $("#CharacterCScore").text("Health: " + hipsterbroHealth);
        console.log("Your opponent attacked you for " + opponentDamage + " damage!");
        console.log("Your health is " + oldManJenkinsHealth);
        console.log("You attacked your opponent for " + characterDamage + " damage");
        console.log("Your opponent's health is " + hipsterbroHealth);
    })
}


characterSelection();



//Code for selecting the first character and moving it to the appropriate box.

// $("#characterSelectionBoxes").on("click", function() {
//     $("#yourSelectionBox").html(this);
//     $("#makeSelectionText").text("Now select your opponent.");
// })