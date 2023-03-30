var Ball, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  Ball = createSprite(250,250,10,10);
  Ball.shapeColor = "red";

  var BallPosition = database.ref('ball/position');
  BallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+5);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x,
    'y': position.x + y

 })

}

function readPosition(data){
  position = data.val();

  Ball.x = position.x;
  Ball.y = position.y;
}

function showError(){
  console.log("Error al escribir en la base de datos");
}
