var started = false;
var level = 1;
var colorName = ["green","red","yellow","blue"];
var pattern = [];
var counter = 0;
var gameOver = false;


$(document).keypress(function(event){

  if(started == true && gameOver==true){
    startOver();
    $("h1").text("Level 1");
    pattern.push(patternGenerator());
    // nextLevel();
  }
  else if(event.key == "a"){
    started = true;
    $("h1").text("Level  "+level);
    pattern.push(patternGenerator());

  }

});

function playSound(colorValue){
  var audio = new Audio("sounds/"+colorValue+".mp3");
  audio.play();
}

function animation(colorValue){
  $("#"+colorValue).addClass("pressed");
    setTimeout(function () {
  $("#"+colorValue).removeClass("pressed");
   }, 100);
}


function  nextLevel(){
  setTimeout(function(){
    counter = 0;
    level++;
    $("h1").text("Level  "+level);
    pattern.push(patternGenerator());
  }, 500);



}



function patternGenerator(){

  var num = Math.floor((Math.random()*4));

  animation(colorName[num]);
  playSound(colorName[num]);
  return colorName[num];
}


$(".btn").click(function(){
  animation($(this).attr("id"));
  playSound($(this).attr("id"));
  if(started==true){
    if(($(this).attr("id")) == pattern[counter]){
      counter++;
      console.log(counter);
      console.log(pattern.length);
      if(counter == pattern.length){
        nextLevel();
      }
    }
    else{
      playSound("wrong");
      startOver();
  }
}
  else{
    playSound("wrong");
    startOver();
  }

});

function startOver(){
    $("h1").text("Game Over. Press Any Key to Start Again");
    level = 0;
    pattern = [];
    gameOver = true;

}

// function checkPattern(pattern){
//   var counter = 0;
//      // for(var i=0; i<pattern.length; i++){
//
//      return true;
//        // $("btn").on("click", function(){
//        //   console.log(this);
//        //   if($(this).hasClass(pattern[i])){
//        //     console.log("nice");
//        //     continue;
//        //   }
//        //   else{
//        //     alert("false");
//        //     // return false;
//        //   }
//        // });
//        // if(pattern[i] == "green"){
//        //
//        //   $("#green").click()
//        // }
//        // else{
//        //   return false;
//        // }
//
//      // }
//
//
//
// }
