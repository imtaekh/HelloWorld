var WIDTH = 600;
var MAX_WIDTH =800;
var WIDTH_END = 800;
var HEIGHT = 400;
var MAX_HEIGHT = 533;
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_RIGHT = 39;
var KEY_LEFT = 37;
var KEY_SPACE = 32;
var PI = Math.PI;
var gravity = 0.25;
var gameOn = false;
var inputAllowed ="true";
var offsetX = 0, offsetY = 0;
var mouse = {
	status : false,
	x : null,
	y : null
};
var canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.border = "black 1px solid";
canvas.style.width = "100%";
canvas.style.maxWidth = MAX_WIDTH+"px";
document.body.appendChild(canvas);
var copyright = document.createElement('p');
copyright.style.margin="30px";
copyright.innerHTML="ⓒ 2015. Imtaek Hong All Rights Reserved.";
document.body.appendChild(copyright);
var ctx = canvas.getContext("2d");

if(window.innerHeight>window.innerWidth){
	alert("Please rotate your device to landscape mode");
}
function oneHit(key){
	if(keystateOneHit[key]){
		delete keystateOneHit[key];
		return true;
	}
	return false;
}
var keystate = {};
var keystateOneHit = {};
document.addEventListener("keydown", function(e){

	(keystate[e.keyCode])?keystateOneHit[e.keyCode]:keystateOneHit[e.keyCode] = true;

	if(inputAllowed) keystate[e.keyCode] = true;
	if(instruction.isOn) instruction.isOn = false;
});
document.addEventListener("keyup", function(e){
	delete keystate[e.keyCode];
});
var event = (navigator.platform.toString()[0]=="i") ? "touchstart" : "click";
document.addEventListener(event,function(e){
	if(instruction.isOn) instruction.isOn = false;
    var x, y;
    switch(e.type){
      case "click":
      x=e.pageX;
      y=e.pageY;
      break;
      case "touchstart":
      var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
      x = parseInt(touchobj.pageX); // get x position of touch point relative to left edge of browser
      y = parseInt(touchobj.pageY);
      break;
    }
	mouse.x = WIDTH * (x-canvas.offsetLeft)/(canvas.offsetWidth);
	mouse.y = HEIGHT * (y-canvas.offsetTop)/(canvas.offsetHeight);
	if(inputAllowed&&mouse.x<WIDTH&&mouse.x>0&&mouse.y>0&&mouse.y<HEIGHT) {
		mouse.status=true;
	}
});
function distance(A, B, option){
	switch(option){
		case "x" :
		return Math.sqrt(Math.pow((A.x-B.x),2));
		case "y" :
		return Math.sqrt(Math.pow((A.y-B.y),2));
		case "both" :
		return Math.sqrt(Math.pow((A.x-B.x),2)+Math.pow((A.y-B.y),2));
		case "center" :
		return Math.sqrt(Math.pow((A.x-B.x),2)+Math.pow((A.y-B.y+B.height/2),2));
		default :
		return Math.sqrt(Math.pow((A-B),2));
	}
}
function dot(x,y,color){
	ctx.save();
	ctx.beginPath();
	ctx.arc(x, y, 2, 0, 2 * Math.PI);
	ctx.strokeStyle=color;
	ctx.stroke();
	ctx.restore();
}
var spaceKey = {
	COUNT_MAX: 10,
	count: 0,
	delay: function(){
		if(this.count>0) this.count--;
	},
	isDown: function(){
		if(this.count === 0 && keystate[KEY_SPACE] && gameOn==false){
			this.count= this.COUNT_MAX;
			return true;
		}
	}
};
window.onload = function(){
	setInterval(mainLoop, 20);
};
function checkWindowSize(){
	if((window.innerWidth<MAX_WIDTH||window.innerHeight<MAX_HEIGHT)&&window.innerWidth/window.innerHeight>MAX_WIDTH/MAX_HEIGHT){
		canvas.style.height=window.innerHeight+"px";
		canvas.style.width=window.innerHeight*MAX_WIDTH/MAX_HEIGHT+"px";
	} else if((window.innerWidth<MAX_WIDTH||window.innerHeight<MAX_HEIGHT)&&window.innerHeight/window.innerWidth>MAX_HEIGHT/MAX_WIDTH){
		canvas.style.width=window.innerWidth-5+"px";
		canvas.style.height=(window.innerWidth-5)*MAX_HEIGHT/MAX_WIDTH+"px";
	} else {
		canvas.style.width=MAX_WIDTH;
		canvas.style.height=MAX_HEIGHT;
	}
}
function mainLoop(){
	checkWindowSize();
	spaceKey.delay();
	draw();
	update();
}
function instruction(){
	ctx.save();
	var img = new Image();
	img.src = "src/instruction.png";
	ctx.drawImage(img,0,0);
	ctx.font = "15px Arial";
	ctx.fillStyle = "#fff";
	ctx.textAlign="center";
	ctx.fillText("Infomation to log in to on other devices", WIDTH/2,280);
	ctx.fillText("Name: "+name, WIDTH/2,300);
	ctx.fillText("Passcode: "+passcode, WIDTH/2,320);
	ctx.restore();
}
instruction.isOn = true;
function draw(){
	ctx.save();
	ctx.fillStyle = "#fff";
	ctx.fillRect(0,0,WIDTH,HEIGHT);
	drawPattern("src/background.png",200,0,100,100,0,50,WIDTH+offsetX,200,false);
	drawPattern("src/background.png",100,0,50,50,0,250,WIDTH+offsetX,50,false);
	drawPattern("src/background.png",0,100,200,100,196,128,114,63,true);
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,WIDTH,50);
	ctx.fillRect(0,350,WIDTH,50);
	ctx.restore();

	window01.draw();
	table1.draw();
	refrigerator.draw();
	cat.draw();
	photoframe01.draw();
	photoframe02.draw();
	photoframe03.draw();
	girl1.draw();
	wamGame.draw();
	bubbleGame.draw();
	if(mainMessage.count>0) mainMessage.draw();
	if(offsetX>0) screenArrowLeft.draw();
	if(WIDTH+offsetX<WIDTH_END) screenArrowRight.draw();
	if(instruction.isOn) instruction();
	player.draw();
}
function update(){
	window01.update();
	table1.update();
	cat.update();
	refrigerator.update();
	photoframe01.update();
	photoframe02.update();
	photoframe03.update();
	girl1.update();
	screenArrowLeft.update();
	screenArrowRight.update();
	wamGame.update();
	bubbleGame.update();

	player.update();
}
function postInfo(to,name,value){
  var myIframe =document.createElement('iframe');
  myIframe.name = "myIframe";
  myIframe.width = 0;
  myIframe.style.border = "0";
  myIframe.height = 0;
  document.body.appendChild(myIframe);

  var myForm =document.createElement('form');
  myForm.action=to;
  myForm.method="post";
  myForm.target="myIframe";

  var nameInput =document.createElement('input');
  nameInput.name="name";
  nameInput.value=name;
  myForm.appendChild(nameInput);

  var scoreInput =document.createElement('input');
  scoreInput.name="score";
  scoreInput.value=value;
  myForm.appendChild(scoreInput);

  myForm.submit();
}
var mainMessage = {
	x : 50,
	y : 285,
	outputText : null,
	line : 0,
	count : 0,
	makeOutputText : function(string){
		this.outputText = [];
		this.line = -1;
		var offset = 0;
		do{
			this.line++;
			this.outputText[this.line] = "";
			for(var i = 0 ; i<50 ; i++){
				if(!string[i+offset]) break;
				this.outputText[this.line] += string[i+offset];
			}
			offset+=50;
		}
		while(string[offset] !== undefined);
	},
	draw : function(){
		this.count--;

		var stringX = this.x;
		var stringY = this.y;
		ctx.save();
		ctx.fillStyle="rgb(100,100,100)";
		ctx.font = "20px Arial";
		for(var i=0;i<=this.line;i++){
			ctx.fillText(this.outputText[i], stringX, stringY);
			stringY+=25;
		}
		ctx.restore();
	}
};
function drawPattern(src,sx,sy,swidth,sheight,x,y,width,height,isfixed){
	var backgroundPatten = document.createElement('canvas');
	backgroundPatten.width = swidth;
	backgroundPatten.height = sheight;
	var texture = new Image();
	texture.src = src;
	PattenCtx=backgroundPatten.getContext("2d");
	PattenCtx.drawImage(texture,sx,sy,swidth,sheight,0,0,swidth,sheight);
	var pat = ctx.createPattern(backgroundPatten,"repeat");
	ctx.save();
	ctx.fillStyle = pat;
	if(isfixed){
		ctx.translate(x, y);
		ctx.fillRect(0-offsetX,0-offsetY,width,height);
	} else {
		ctx.translate(x-offsetX, y-offsetY);
		ctx.fillRect(0,0,width,height);
	}
	ctx.restore();
}
var Thing = function(src,x,y,imgWidth,imgHeight,status,height){
	this.abX = x;
	this.abY = y;
	this.x = x;
	this.y = y;
	this.height= height;
	this.imgX0 = this.x-imgWidth/2;
	this.imgY0 = this.y-imgHeight;
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.status = status;
	this.isClicked = false;
	this.readyToStand = true;
	this.img = new Image();
	this.img.src = src;
	this.drawData ={ count: 0, COUNT_MAX: 30, frameTotNum: 2, frameCount: 1, frame :{}};
	this.drawData.count = Math.floor((Math.random() * 30) + 1);
	this.messageData = {count: 0, num: -1,repeat: 0};
	this.attention = "north";
};
Thing.prototype.update = function(){
	this.x = this.abX - offsetX;
	this.y = this.abY - offsetY;
	if(distance(player.x,this.x)<40  && (spaceKey.isDown()||(distance(mouse,this,"center")<40 &&mouse.status === true))){
		mouse.status = false;
		player.forcedWalking = true;
		inputAllowed = false;
		this.isClicked = true;
	}
	if(this.isClicked){
		if(this.getCloser()) this.action();
	}
};
Thing.prototype.getCloser = function(){

	if(player.x>this.x+2){
		player.walk("left");
		return false;
	}else if(player.x<this.x-2){
		player.walk("right");
		return false;
	}else{
		inputAllowed=true;
		player.lookingAt=this.attention;
		this.isClicked=false;
		player.forcedWalking = false;
		return true;
	}
};
Thing.prototype.action = function(){
};
Thing.prototype.talk = function(){
	if(this.messageData.num<this.messageData.string.length-1){
		this.messageData.num++;
	} else {
		this.messageData.num = this.messageData.repeat;
	}
	this.messageData.count=this.messageData.time[this.messageData.num];
};
Thing.prototype.mainMessage = function(){
	if(this.messageData.num<this.messageData.string.length-1){
		this.messageData.num++;
	} else {
		this.messageData.num = this.messageData.repeat;
	}
	mainMessage.count=this.messageData.time[this.messageData.num];
	mainMessage.makeOutputText(this.messageData.string[this.messageData.num]);
};
Thing.prototype.drawTalk = function(){
	var string = this.messageData.string[this.messageData.num];
	var text = [];
	var line = -1;
	var offset = 0;
	if (this.messageData.count>0) {
		this.messageData.count--;
		do{
			line++;
			text[line] = "";
			for(var i = 0 ; i<30 ; i++){
				if(!string[i+offset]) break;
				text[line] += string[i+offset];
			}
			offset+=30;
		}
		while(string[offset] !== undefined);

		var boxWidth = text[0].length*10+20;
		var boxHeight = line*25+40;
		var boxX = this.x-boxWidth/2;
		var boxY = this.y-80-boxHeight;
		var stringX = boxX+10;
		var stringY = boxY+25;
		ctx.save();
		ctx.beginPath();
		ctx.rect(boxX,boxY,boxWidth,boxHeight);
		ctx.closePath();
		ctx.fillStyle="rgba(255,255,255,0.9)";
		ctx.fill();
		ctx.strokeStyle="#000";
		ctx.stroke();
		ctx.fillStyle="rgb(222,135,52)";
		ctx.font = "20px Arial";
		for(var i=0; i<=line; i++){
			ctx.fillText(text[i], stringX, stringY);
			stringY+=25;
		}
		ctx.restore();
	}
};
Thing.prototype.draw = function(){
	this.imgX0 = this.x-this.imgWidth/2;
	this.imgY0 = this.y-this.imgHeight;

	this.standing();
	if(this.drawData.count-- <0){
		this.drawData.count = this.drawData.COUNT_MAX;
		if(this.drawData.frameCount<this.drawData.frameTotNum) this.drawData.frameCount++;
		else this.drawData.frameCount=1;
	}
	if(this.drawData.frame[this.drawData.frameCount]!==undefined)
	ctx.drawImage(this.img,this.drawData.frame[this.drawData.frameCount].x,this.drawData.frame[this.drawData.frameCount].y,this.imgWidth,this.imgHeight,this.imgX0,this.imgY0,this.imgWidth,this.imgHeight);
};
Thing.prototype.standing = function(){
	this.drawData.frameTotNum = 2; // num of frame;
	this.drawData.frame[1] = {x: 0, y: 0};
	this.drawData.frame[2] = {x: 100, y: 0};
};
var Human = function(src,x,y,imgWidth,imgHeight,status,lookingAt,height){
	Thing.call(this,src,x,y,imgWidth,imgHeight,status,height);
	this.lookingAt = lookingAt;
};
Human.prototype = Object.create(Thing.prototype);
Human.prototype.constructor = Human;

Human.prototype.draw = function(){
	this.imgX0 = this.x-this.imgWidth/2;
	this.imgY0 = this.y-this.imgHeight;

	switch(this.status){
		case "walking":
		this.walking();
		break;

		case "sittingOnChair":
		this.sittingOnChair();
		break;

		default:
		this.standing();
	}

	if(this.drawData.count-- <0){
		this.drawData.count = this.drawData.COUNT_MAX;
		if(this.drawData.frameCount<this.drawData.frameTotNum) this.drawData.frameCount++;
		else this.drawData.frameCount=1;
	}
	ctx.drawImage(this.img,this.drawData.frame[this.drawData.frameCount].x,this.drawData.frame[this.drawData.frameCount].y,this.imgWidth,this.imgHeight,this.imgX0,this.imgY0,this.imgWidth,this.imgHeight);
};
Human.prototype.standing = function(){
	this.drawData.frameTotNum = 2; // num of frame;
	switch(this.lookingAt){
		case "right":
		this.drawData.frame[1] = {x: 0, y: 0};
		this.drawData.frame[2] = {x: 100, y: 0};
		break;

		case "left":
		this.drawData.frame[1] = {x: 200, y: 0};
		this.drawData.frame[2] = {x: 300, y: 0};
		break;

		case "north":
		this.drawData.frame[1] = {x: 0, y: 300};
		this.drawData.frame[2] = {x: 100, y: 300};
		break;
	}
};
Human.prototype.walk= function(toward){
	if(this.status!="walking") this.drawData.count=0;
	this.status="walking";
	this.readyToStand=true;
	this.lookingAt=toward;

	switch(toward){
		case "right":
		player.x+=2;
		break;

		case "left":
		player.x-=2;
		break;
	}
};
Human.prototype.walking = function(){
	this.drawData.frameTotNum = 2; // num of frame;
	switch(this.lookingAt){
		case "right":
		this.drawData.frame[1] = {x: 0, y: 100};
		this.drawData.frame[2] = {x: 100, y: 100};
		break;

		case "left":
		this.drawData.frame[1] = {x: 200, y: 100};
		this.drawData.frame[2] = {x: 300, y: 100};
		break;
	}
};

Human.prototype.sitOnChair = function(x,y,lookingAt){
	this.drawData.count=0;
	if(this.status=="sittingOnChair"){
		this.readyToStand=true;
	}
	else{
		this.status="sittingOnChair";
		this.x=x;
		this.y=y;
		this.lookingAt=lookingAt;
		this.readyToStand=false;
	}
};
Human.prototype.sittingOnChair = function(){
	this.drawData.frameTotNum = 2; // num of frame;
	switch(this.lookingAt){
		case "right":
		this.drawData.frame[1] = {x: 0, y: 200};
		this.drawData.frame[2] = {x: 100, y: 200};
		break;

		case "left":
		this.drawData.frame[1] = {x: 200, y: 200};
		this.drawData.frame[2] = {x: 300, y: 200};
		break;
	}
};
var thingObj = new Thing("src/things.png");

var player = new Human("src/player.png",100,250,98,98,"standing","right",65);
player.forcedWalking = false;
player.update = function(){
	if(keystate[KEY_RIGHT]&&gameOn==false){
		player.walk("right");
	}
	if(keystate[KEY_LEFT]&&gameOn==false){
		player.walk("left");
	}
//*
	if(mouse.status === true){
		this.forcedWalking = true;
		if(mouse.y<280&&mouse.y>100){
			if(player.x<mouse.x){
				player.walk("right");
			}
			if(player.x>mouse.x){
				player.walk("left");
			}
			if(distance(player,mouse, "x")<2){
				mouse.status=false;
				this.forcedWalking = false;
			}
		}
		else{
			mouse.status=false;
			this.forcedWalking = false;
		}
	}
//*/
	if(player.x>WIDTH-200 && WIDTH+offsetX<WIDTH_END){
		offsetX++;
		player.x--;
		mouse.x--;
	}
	if(player.x>WIDTH-20) player.x--;
	if(player.x<200 && offsetX>0){
		offsetX--;
		player.x++;
		mouse.x++;
	}
	if(player.x<20) player.x++;
/*
	if(keystate[KEY_DOWN]){
		player.y++
		if(player.y>HEIGHT-30 && offsetY<100){
			offsetY++;
			player.y--;
		}
		if(player.y>HEIGHT-10) player.y--;
	}
	if(keystate[KEY_UP]){
		player.y--;
		if(player.y<200 && offsetY>0){
			offsetY--;
			player.y++;
		}
		if(player.y<80) player.y++;
	}
*/
	if(player.readyToStand === true){
		if(keystate[KEY_LEFT] === undefined && keystate[KEY_RIGHT] === undefined && this.forcedWalking === false) player.status="standing";
	}
};

var Table1 = function(src,x,y,imgWidth,imgHeight,status,height){
	Thing.call(this,src,x,y,imgWidth,imgHeight,status,height);
	this.leftChair = { x: this.x-61, y: this.y, occupied:false};
	this.rightChair = { x: this.x+61, y: this.y, occupied:false};
	this.attention="north";
};
Table1.prototype = Object.create(Thing.prototype);
Table1.prototype.constructor = Thing;

Table1.prototype.update = function(){
	thingObj.update.call(this);
	this.leftChair.x=this.x-61;
	this.leftChair.y=this.y;
	this.rightChair.x=this.x+61;
	this.rightChair.y=this.y;
	if(!this.leftChair.occupied && distance(player,this.leftChair,"both")< 20 && (spaceKey.isDown()||(distance(mouse,this.leftChair,"x")<20 &&mouse.status === true))){
		player.sitOnChair(this.x-55,player.y, "right");
		mouse.status = false;
		player.forcedWalking = false;
	}
	if(!this.rightChair.occupied && distance(player,this.rightChair,"both")< 20 && (spaceKey.isDown()||(distance(mouse,this.rightChair,"x")<20 &&mouse.status === true))){
		player.sitOnChair(this.x+55,player.y, "left");
		mouse.status = false;
		player.forcedWalking = false;
	}
};
var table1 = new Table1("src/things.png",253,250,198,98,null,70);
table1.rightChair.occupied=true;
table1.standing = function(){
	this.drawData.frameTotNum = 1;
	this.drawData.frame[1] = {x: 0, y: 0};
};
table1.action = function(){
	this.mainMessage();
};
table1.messageData.time = [100,100];
table1.messageData.string = ["There is a yellow flower on the table.", "What kind of flower is it?"];

var refrigerator = new Thing("src/things.png",390,250,98,98,null,90);
refrigerator.standing = function(){
	this.drawData.frameTotNum = 1;
	this.drawData.frame[1] = {x: 200, y: 0};
};
refrigerator.action = function(){
	this.mainMessage();
};
refrigerator.messageData.time = [150];
refrigerator.messageData.string = ["A note on the refrigerator : 'do not open someone else's refrigerator, that's rude.'"];

var cat = new Thing("src/things.png",390,166,98,98,null,30);
cat.standing = function(){

	this.drawData.frameTotNum = 2;
	this.drawData.frame[1] = {x: 0, y: 100};
	this.drawData.frame[2] = {x: 100, y: 100};
};
cat.action = function(){
	this.mainMessage();
};
cat.messageData.repeat = 4;
cat.messageData.time = [100,100,120,120,100,100];
cat.messageData.string = ["A cat is sleeping..","Let's not wake him up.","...Becuase I don't want to draw the animaitons..","...What did I just say?","A cat is sleeping..","Let's not wake him up."];

var photoframe01 = new Thing("src/things.png",713,191,98,98,null,45);
photoframe01.standing = function(){
	this.drawData.frameTotNum = 1;
	this.drawData.frame[1] = {x: 200, y: 100};
};
photoframe01.action = function(){
	this.mainMessage();
};
photoframe01.messageData.time = [100,100];
photoframe01.messageData.string = ["There are some happy pictures on the wall.","Who are they?"];

var photoframe02 = new Thing("src/things.png",700,143,98,98,null,60);
photoframe02.standing = function(){
	this.drawData.frameTotNum = 1;
	this.drawData.frame[1] = {x: 300, y: 0};
};
photoframe02.action = function(){
	photoframe01.mainMessage();
};

var photoframe03 = new Thing("src/things.png",770,160,98,98,null,75);
photoframe03.standing = function(){
	this.drawData.frameTotNum = 1;
	this.drawData.frame[1] = {x: 300, y: 100};
};
photoframe03.action = function(){
	photoframe01.mainMessage();
};

var window01 = new Thing("src/things.png",250,250,198,198,null);
window01.standing = function(){
	this.drawData.frameTotNum = 2;
	this.drawData.frame[1] = {x: 0, y: 200};
	this.drawData.frame[2] = {x: 200, y: 200};
};
window01.attention=player.lookingAt;
window01.update = function(){
	this.x = this.abX - offsetX;
	this.y = this.abY - offsetY;
};

var girl1 = new Thing("src/things.png",308,250,98,98,null,70);
girl1.attention = "right";
girl1.standing = function(){
	this.drawData.frameTotNum = 2;
	this.drawData.frame[1] = {x: 0, y: 400};
	this.drawData.frame[2] = {x: 100, y: 400};
};
girl1.update = function(){
	this.x = this.abX - offsetX;
	this.y = this.abY - offsetY;
	if(distance(player.x,this.x)<40  && (spaceKey.isDown()||(distance(mouse,this,"center")<40 &&mouse.status === true))){
		mouse.status = false;
		player.forcedWalking = true;
		inputAllowed = false;
		this.isClicked = true;
	}
	if(this.isClicked){
		if(this.getCloser()) this.action();
	}
	this.drawTalk();
};
girl1.getCloser = function(){
	if(player.x>this.x-38){
		player.walk("left");
		return false;
	}else if(player.x<this.x-42){
		player.walk("right");
		return false;
	}else{
		inputAllowed = true;
		player.lookingAt = "right";
		this.isClicked = false;
		player.forcedWalking = false;
		return true;
	}
};
girl1.action = function(){
	this.talk();
};
girl1.messageData.repeat = 1;
girl1.messageData.time = [100,200,50];
girl1.messageData.string = ["Hello, "+name+"! How are you?","Just in case you are curious  what I'm drinking, It's a strawberry smoothie.", "It's so yummy!"];

var screenArrowLeft = new Thing("src/things.png",40,250,48,98,null);
screenArrowLeft.standing = function(){
	this.drawData.frameTotNum = 2;
	this.drawData.frame[1] = {x: 200, y: 400};
	this.drawData.frame[2] = {x: 300, y: 400};
};
screenArrowLeft.attention=null;
screenArrowLeft.update = function(){
	screenArrowLeft.drawData.count=(player.drawData.count+10)%30-1;
};
var screenArrowRight = new Thing("src/things.png",560,250,48,98,null);
screenArrowRight.standing = function(){
	this.drawData.frameTotNum = 2;
	this.drawData.frame[1] = {x: 250, y: 400};
	this.drawData.frame[2] = {x: 350, y: 400};
};
screenArrowRight.attention=null;
screenArrowRight.update = function(){
	screenArrowRight.drawData.count=(player.drawData.count+10)%30-1;
};
