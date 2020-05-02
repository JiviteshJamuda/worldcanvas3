// Creating variable for creating an array 
// Creating variable for the clear button
var drawing = [], clear;
var database,painterCount;
var description,greeting,startButton;
var gameState = "formPage";

function updateCount(count){
  database.ref('/').update({
    painters : count
  });
}

function setup() {
  database = firebase.database();
  createCanvas(1360,620);

  greeting = createElement("h1","World Canvas");
  greeting.position(width/2-120,height/2-100);
  description = createElement("h3","The world is our canvas");
  description.position(width/2-115,height/2);
  startButton = createButton("Start painting");
  startButton.position(width/2-70,height/2-30);

  painterCount = database.ref('painters');
  painterCount.on('value',(data)=>{
    painterCount = data.val();
  });

  startButton.mousePressed(()=>{
    painterCount += 1;
    gameState = "draw";
    greeting.hide();
    description.hide();
    startButton.hide();
    updateCount(painterCount);
  });

  /*
  var saveRef = "artGallery/artist" + painterCount;
  database.ref(saveRef).set({
    drawing : drawing
  })
*/

}

function draw() {
  background(230);  

  if(gameState === "draw"){

    // Making a clear button
    clear = createButton("clear");
    clear.position(50,10);

    // Drawing the boundaries
    rectMode(CENTER);
    rect(600,100,5000,1);
    rect(600,619,5000,1);
    rect(1.5,300,1,6000);
    rect(1359,300,1,6000);

    // Creating an variable to store the x and y cordinates of the mouse when it is pressed
    // Then pushing the variable into the array
    if (mouseIsPressed && mouseY > 100){
      var Pos = {x:mouseX, y:mouseY};

    drawing.push(Pos);
    }

    // In case it stops drawing
    if(keyDown === UP_ARROW){
      drawing.push(Pos)
    };

    // Drawing on the canvas with vertex when mouse is pressed over the canvas
    beginShape();

    stroke(0);
    strokeWeight(4);
    fill(230);
    for(var i = 0; i < drawing.length; i++){
      vertex(drawing[i].x, drawing[i].y);
    }

    endShape();

    // Clearing the canvas on pressing the clear button
    clear.mousePressed(()=>{
      drawing = [];
    })

    // Just to indicate the artist about the clear button
    textSize(20)
    textAlign(CENTER);
    text("Press this to",80,55);
    text("Clear the canvas",80,80);
  }
  console.log(painterCount);
 
  drawSprites();
}