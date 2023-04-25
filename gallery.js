// Colour Change//
function pickMeroon() {
  document.body.style.backgroundColor = '#9c2826';
}

function pickBlue() {
  document.body.style.backgroundColor = '#438adf';
}

function pickGreen() {
  document.body.style.backgroundColor = '#27622a';
}

function pickYellow() {
  document.body.style.backgroundColor = '#ffca28';
}

//Color Picker
function generateColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
  document.querySelector(".color").style.backgroundColor = "#" + randomColor;
}

function changeColor() {
  var selectedColor = document.querySelector(".color-picker input").value;
  document.body.style.backgroundColor = selectedColor;
  document.querySelector(".color").style.backgroundColor = selectedColor;
}


//Font Size Change
function largeSize() {
  document.getElementById("des").style.fontSize = "20px";
  document.getElementById("imgtext").style.fontSize = "20px";

  for (let i = 1; i < 9; i++) {
    document.getElementById("des" + i).style.fontSize = "20px";
  }
}

function normalSize() {
  document.getElementById("des").style.fontSize = "18px";
  document.getElementById("imgtext").style.fontSize = "18px";

  for (let i = 1; i < 9; i++) {
    document.getElementById("des" + i).style.fontSize = "18px";
  }
}

function smallSize() {
  document.getElementById("des").style.fontSize = "16px";
  document.getElementById("imgtext").style.fontSize = "16px";

  for (let i = 1; i < 9; i++) {
    document.getElementById("des" + i).style.fontSize = "16px";
  }
}


//image expand
function myFunction(imgs) {
  var expandImg = document.getElementById("expandedImg");
  var imgText = document.getElementById("imgtext");
  expandImg.src = imgs.src;
  imgText.innerHTML = imgs.alt;
  expandImg.parentElement.style.display = "block";
}


