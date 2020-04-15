// Creating variable for creating an array 
// Creating variable for the clear button
var drawing = [], clear;

function setup() {
  createCanvas(1350,600);
  // Making a clear button
  clear = createSprite(80,25,50,20);
}

function draw() {
  background(230);  

  // Drawing the boundaries
  rectMode(CENTER);
  rect(600,100,5000,1);
  rect(600,599,5000,1);
  rect(1.5,300,1,600);
  rect(1349,300,1,600);
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
  if(mousePressedOver(clear)){
    drawing = [];
  };

  // Just to indicate the artist about the clear button
  textSize(20)
  textAlign(CENTER);
  text("Press this to",80,55);
  text("Clear the canvas",80,80);
 
  

  drawSprites();
}