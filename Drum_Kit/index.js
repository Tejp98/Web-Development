for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {

  document.querySelectorAll(".drum")[i].addEventListener("click", function() {

    makeSound(this.innerHTML);
    animation(this.innerHTML);

  });
}

document.addEventListener("keydown", function(event) {

  makeSound(event.key);
  animation(event.key);

});

function makeSound(keyValue) {
  var audioSource = new Audio("sounds/" + keyValue + ".mp3");
  audioSource.play();

}

function animation(keyValue) {

  document.querySelector("." + keyValue).classList.add("pressed");

  setTimeout(function() {
    document.querySelector("." + keyValue).classList.remove("pressed");
  }, 100);

}
