// Creating variable for creating an array 
// Creating variable for the clear button
var drawing = [], clear, saveButton;
var database,painterCount;
var description,greeting,startButton;
var gameState = "formPage";
var nameBar,playerName,suggestion;
var paintings = 0;

function updateCount(count){
  database.ref('/').update({
    painters : count
  });
}

function getCurrentPainting(){
  var currentPaintingRef = "currentPainting";
  database.ref(currentPaintingRef).set({
    painting : drawing
  });

  drawing = database.ref('currentPainting/painting');
  drawing.on("value",(data)=>{
    drawing = data.val();
  });
  
}

function setup() {
  database = firebase.database();
  createCanvas(1360,620);

  greeting = createElement("h1","World Canvas");
  greeting.position(width/2-120,height/2-330);
  description = createElement("h2","The world is our canvas");
  description.position(width/2-150,height/2);
  startButton = createButton("Start painting");
  startButton.position(width/2-70,height/2-230);
  nameBar = createInput("name");
  nameBar.position(width/2-110,height/2-260);
  suggestion = createElement("h3","please enter the name so that it is easy to find your painting");
  suggestion.position(450,120);

  painterCount = database.ref('painters');
  painterCount.on('value',(data)=>{
    painterCount = data.val();
  });

  startButton.mousePressed(()=>{
    gameState = "draw";
    playerName = nameBar.value();
    nameBar.hide();
    greeting.hide();
    description.hide();
    startButton.hide();   
    suggestion.hide();
    painterCount += 1;
    updateCount(painterCount);
  });

}

function draw() {
  background(230);  

  if(gameState === "draw"){

    getCurrentPainting();
    //paintCurrentPainting();

    // Making a clear button
    clear = createButton("clear");
    clear.position(50,10);
    saveButton = createButton("save");
    saveButton.position(200,10);

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
    });

    saveButton.mousePressed(()=>{     
      paintings += 1;
      var saveRef = "artGallery/artist -" + playerName + paintings;
      database.ref(saveRef).set({
      drawing : drawing
      });

    });

    // Just to indicate the artist about the clear button
    textSize(20)
    textAlign(CENTER);
    text("Press this to",80,55);
    text("Clear the canvas",80,80);

    
  }

  drawSprites();
}