// alert("hii");
// $("h1")
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // var audio = new Audio("sounds/"+randomChosenColour+".mp3");
  // audio.play();
  playSound(randomChosenColour);
  animatePress(randomChosenColour);


}
// nextSequence();
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
// console.log(userClickedPattern);
// var audio=new Audio("sounds/"+userChosenColour+".mp3");
// audio.play();
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;

  }
});
function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
  console.log("success");
  if(userClickedPattern.length===gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
else{
  console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  $("body").addClass("img");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game over press Any key to Restart the game");
  startOver();
}
}
function startOver(){
  level=0
  gamePattern=[];
  started=false;
}
