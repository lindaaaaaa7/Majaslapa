const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

let pan_x = 0;
let pan_y = 0;
let panWidth = 70;
let panHeight = 70;

let cakeWidth = 40;
let cakeHeight = 40;
let cake_x = Math.random() * (myCanvas.width - cakeWidth);
let cake_y = 0;

let score = 0;
let time_remaining = 20;

let PanImg = new Image();
PanImg.src = "https://cdn-icons-png.flaticon.com/128/10698/10698438.png";

let CakeImg = new Image();
CakeImg.src = "https://cdn-icons-png.flaticon.com/128/6366/6366141.png";

let hasCaught = false;

function MyKeyDownHandler(MyEvent) {
  if (time_remaining <= 0) return;

  if (MyEvent.keyCode === 37 && pan_x > 0) {
    pan_x -= 10;
  }
  if (MyEvent.keyCode === 39 && pan_x + panWidth < myCanvas.width) {
    pan_x += 10;
  }
}

addEventListener("keydown", MyKeyDownHandler);

function ImagesTouching(x1, y1, w1, h1, x2, y2, w2, h2) {
  return !(x1 + w1 < x2 || x1 > x2 + w2 || y1 + h1 < y2 || y1 > y2 + h2);
}

function Do_a_Frame() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
  ctx.fillText("Time Remaining: " + Math.round(time_remaining), 10, 45);

  pan_y = myCanvas.height - panHeight;
  ctx.drawImage(PanImg, pan_x, pan_y, panWidth, panHeight);

  if (time_remaining <= 0) {
    ctx.fillStyle = "white";
    ctx.font = "bold 50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", myCanvas.width / 2, myCanvas.height / 2);
    ctx.textAlign = "left";
    return;
  }

  time_remaining -= 1 / 40;

  cake_y += 3;
  if (cake_y > myCanvas.height) {
    cake_y = 0;
    cake_x = Math.random() * (myCanvas.width - cakeWidth);
    hasCaught = false;
  }

  ctx.drawImage(CakeImg, cake_x, cake_y, cakeWidth, cakeHeight);

  if (
    ImagesTouching(
      pan_x,
      pan_y,
      panWidth,
      panHeight,
      cake_x,
      cake_y,
      cakeWidth,
      cakeHeight
    )
  ) {
    if (!hasCaught) {
      score++;
      hasCaught = true;
      cake_y = -cakeHeight;
      cake_x = Math.random() * (myCanvas.width - cakeWidth);
    }
  } else {
    hasCaught = false;
  }
}

setInterval(Do_a_Frame, 25);
