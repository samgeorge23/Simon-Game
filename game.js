buttonColors = ["red","blue","green","yellow"];
gamePattern = new Array();
userClickedPattern = new Array();
var started=false;
var clickStarted = false;
level = 0;

$(document).keydown(function (){
    if(!started){
        setTimeout(function (){nextSequence();},500);   
    }
    
});


function nextSequence(){
    // make interface to restart from start
    level++;
    $("h1").text("level "+level);
    userClickedPattern = [];
    userCount=0;
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    
    
    $("#"+randomChosenColour).addClass("hide");
    playSound(randomChosenColour);
    setTimeout(function(){
        $("#"+randomChosenColour).removeClass("hide");
    },100);
    if(!started && !clickStarted){
        for(button of buttonColors){
            $("#"+button).click(clickedButton);
        }
        started=true;
        clickStarted = true;
    }
    
}

function clickedButton(){
    animatePress(this.id);
    userClickedPattern.push(this.id);
    userCount+=1;
    
    
    gameLength = gamePattern.length;
    userLength = userClickedPattern.length;
    // check the color entry when not equal in length
    if(userLength<gameLength){
        if(!checkAnswer(userCount)){
            gameOver();
        }
    }
    else if(gameLength==userLength){
        if(checkAnswer(level)){                       
            $("h1").text("level "+level);
            setTimeout(function (){nextSequence();},1000);
        }
        else{
            gameOver();
        }
    }
}

function playSound(name){
    audio1 = new Audio("sounds/"+name+".mp3");
    audio1.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    playSound(currentColour);
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    for(let i=0;i<currentLevel;i++){
        if(gamePattern[i]!=userClickedPattern[i]){
            console.log(userClickedPattern[i]);
            console.log(gamePattern[i]);
            return false;
        }
    }
    return true;
    
}

function gameOver(){
    audio = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    audio.play();
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern=[];
    started=false;
}

