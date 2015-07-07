var bubble={
  status: false,
	spriteSheet: undefined,
  backgroundSheet: undefined,
  click: false,
	powerOn: function(){
		this.status = true;
//		this.main.status = false;
		this.menuGene();
//		this.reset();
	},
  reset: function(){

  },
	isRectClick: function(x,y,width,height){
		if(this.click &&mouse.x>x && mouse.y>y && mouse.x<x+width && mouse.y<y+height){
			this.click = false;
			return true;
		}
	},
	menu:{
		status:false,
		background: undefined,
		title: {
			status:undefined,
			x:88,
			y:30,
			sx:0,
			sy:0,
			width:288,
			height:80
		}
	},
	menuGene: function() {
    this.menu.status = true;
    this.menu.background = true;
    this.menu[1] = {x:120, y:165, width:180, height:25, string:"SINGLE PLAY"};
    this.menu[2] = {x:120, y:255, width:180, height:25, string:"BATTLE MODE"};
    this.menu[3] = {x:120, y:210, width:180, height:25, string:"RANKS(SINGLE)"};
    this.menu[4] = {x:120, y:300, width:180, height:25, string:"EXIT"};
    this.menu.title.status=true;
	},
	menuUpdate: function(){
		for(var i=1; i<=4; i++){
			if(this.isRectClick(this.menu[i].x,this.menu[i].y-this.menu[i].height,this.menu[i].width,this.menu[i].height)){
				switch(i){
					case 1: //sigle play
					console.log("single not yet");
					break;
					case 2: // battle mode
          this.menu.status = false;
					this.battleGene();
					break;
					case 3: // ranks
					console.log("rank not yet");
					break;
					case 4: //exit
          this.menu.status = false;
					this.exit();
					break;
				}
			}
		}
	},
	menuDraw: function(){
		ctx.save();
		if(this.menu.background){
			ctx.fillStyle = "rgba(0,0,0,0.7)";
			ctx.fillRect(0,0,WIDTH,HEIGHT);
		}
		if(this.menu.title.status){
			ctx.drawImage(this.spriteSheet, this.menu.title.sx, this.menu.title.sy, this.menu.title.width, this.menu.title.height, this.menu.title.x, this.menu.title.y, this.menu.title.width, this.menu.title.height);
		}
		ctx.fillStyle="rgb(255,255,255)";
		ctx.font = this.menu[1].height+"px Arial";
		ctx.strokeStyle="rgb(0,0,0)";
		ctx.lineWidth=5;
		for(var i = 1; i<= 4; i++){
			ctx.strokeText(this.menu[i].string, this.menu[i].x, this.menu[i].y);
			ctx.fillText(this.menu[i].string, this.menu[i].x, this.menu[i].y);
		}
		ctx.restore();
	},
	exit: function(){
		this.status = false;
	},
  bubbles: [
    {color: 0, sx:0, sy:482, width:32, height:32, special:null},
    {color: 0, sx:0, sy:518, width:32, height:32, special:"bomb"},
    {color: 0, sx:0, sy:554, width:32, height:32, special:"colorChange"},
    {color: 1, sx:36, sy:482, width:32, height:32, special:null},
    {color: 1, sx:36, sy:518, width:32, height:32, special:"bomb"},
    {color: 1, sx:36, sy:554, width:32, height:32, special:"colorChange"},
    {color: 2, sx:72, sy:482, width:32, height:32, special:null},
    {color: 2, sx:72, sy:518, width:32, height:32, special:"bomb"},
    {color: 2, sx:72, sy:554, width:32, height:32, special:"colorChange"},
    {color: 3, sx:108, sy:482, width:32, height:32, special:null},
    {color: 3, sx:108, sy:518, width:32, height:32, special:"bomb"},
    {color: 3, sx:108, sy:554, width:32, height:32, special:"colorChange"},
    {color: 4, sx:144, sy:482, width:32, height:32, special:null},
    {color: 4, sx:144, sy:518, width:32, height:32, special:"bomb"},
    {color: 4, sx:144, sy:554, width:32, height:32, special:"colorChange"},
    {color: 5, sx:180, sy:482, width:32, height:32, special:null},
    {color: 5, sx:180, sy:518, width:32, height:32, special:"bomb"},
    {color: 5, sx:180, sy:554, width:32, height:32, special:"colorChange"},
  ],
  bubbleGenerator: function(){
    var randNum=Math.random();
    var type;
    if(randNum<0.9){
      type=0;
    } else if(randNum<0.95){
      type=1;
    } else {
      type=2;
    }
    return (Math.floor(Math.random()*6)*3+type);
  },
  battle: {
    status:false,
    background: {
      num: undefined,
      maxNum: 1,
      0:{ x:76,
  			y:15,
  			sx:0,
  			sy:0,
  			width:224,
  			height:186
  		}
    },
    gameFrame: {
      x:64,
      y:3,
      sx:0,
      sy:84,
      width:472,
      height:394
    },
    whoseTurn:1,
    clickCount:0,
    clickSpeed:1,
    player: {
      1:{
        arrow: {
          angle: 0,
          x:180,
          y:299,
          sx:216,
          sy:482,
          width:16,
          height:80
        },
        buttonLeft:{
          x:82,
          y:345,
          sx:236,
          sy:482,
          width:38,
          height:28
        },
        buttonRight:{
          x:254,
          y:345,
          sx:278,
          sy:482,
          width:38,
          height:28
        },
        buttonShoot:{
          x:204,
          y:340,
          sx:320,
          sy:482,
          width:26,
          height:38
        },
        curBubble:{
          num:undefined,
          x:188,
          y:342,
          xDefault:188,
          yDefault:342
        },
        nextBubble:{
          num:undefined,
          x:153,
          y:365
        }
      },
      2:{
        arrow: {
          angle: 0,
          x:404,
          y:299,
          sx:216,
          sy:482,
          width:16,
          height:80
        },
        buttonLeft:{
          x:306,
          y:345,
          sx:236,
          sy:482,
          width:38,
          height:28
        },
        buttonRight:{
          x:478,
          y:345,
          sx:278,
          sy:482,
          width:38,
          height:28
        },
        buttonShoot:{
          x:428,
          y:340,
          sx:320,
          sy:482,
          width:26,
          height:38
        },
        curBubble:{
          num:undefined,
          x:412,
          y:342,
          xDefault:412,
          yDefault:342
        },
        nextBubble:{
          num:undefined,
          x:377,
          y:365
        }
      }
    }
  },
  battleGene: function(){
    this.battle.status = true;
    this.battle.background.num=Math.floor(Math.random()*this.battle.background.maxNum);
    this.battle.player[1].curBubble.num=this.bubbleGenerator();
    this.battle.player[1].nextBubble.num=this.bubbleGenerator();
    this.battle.player[2].curBubble.num=this.bubbleGenerator();
    this.battle.player[2].nextBubble.num=this.bubbleGenerator();
  },
  battleDraw: function(){
     //black background
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    //stage setting
    ctx.drawImage(this.backgroundSheet, this.battle.background[this.battle.background.num].sx, this.battle.background[this.battle.background.num].sy, this.battle.background[this.battle.background.num].width, this.battle.background[this.battle.background.num].height, this.battle.background[this.battle.background.num].x, this.battle.background[this.battle.background.num].y, this.battle.background[this.battle.background.num].width*2, this.battle.background[this.battle.background.num].height*2);
    ctx.drawImage(this.spriteSheet, this.battle.gameFrame.sx, this.battle.gameFrame.sy, this.battle.gameFrame.width, this.battle.gameFrame.height, this.battle.gameFrame.x, this.battle.gameFrame.y, this.battle.gameFrame.width, this.battle.gameFrame.height);
    //player[1] arrow & bubbles
    ctx.save();
    ctx.translate(this.battle.player[1].arrow.x+8,this.battle.player[1].arrow.y+44);
    ctx.rotate(this.battle.player[1].arrow.angle*Math.PI/180);
    ctx.drawImage(this.spriteSheet, this.battle.player[1].arrow.sx, this.battle.player[1].arrow.sy, this.battle.player[1].arrow.width, this.battle.player[1].arrow.height, -8, -44, this.battle.player[1].arrow.width, this.battle.player[1].arrow.height);
    ctx.restore();



    ctx.drawImage(this.spriteSheet, this.bubbles[this.battle.player[1].curBubble.num].sx, this.bubbles[this.battle.player[1].curBubble.num].sy, this.bubbles[this.battle.player[1].curBubble.num].width, this.bubbles[this.battle.player[1].curBubble.num].height, this.battle.player[1].curBubble.x-16, this.battle.player[1].curBubble.y-16, this.bubbles[this.battle.player[1].curBubble.num].width, this.bubbles[this.battle.player[1].curBubble.num].height);
    ctx.drawImage(this.spriteSheet, this.bubbles[this.battle.player[1].nextBubble.num].sx, this.bubbles[this.battle.player[1].nextBubble.num].sy, this.bubbles[this.battle.player[1].nextBubble.num].width, this.bubbles[this.battle.player[1].nextBubble.num].height, this.battle.player[1].nextBubble.x-16, this.battle.player[1].nextBubble.y-16, this.bubbles[this.battle.player[1].nextBubble.num].width, this.bubbles[this.battle.player[1].nextBubble.num].height);
    //player[2] arrow & bubble
    ctx.save();
    ctx.translate(this.battle.player[2].arrow.x+8,this.battle.player[2].arrow.y+44);
    ctx.rotate(this.battle.player[2].arrow.angle*Math.PI/180);
    ctx.drawImage(this.spriteSheet, this.battle.player[2].arrow.sx, this.battle.player[2].arrow.sy, this.battle.player[2].arrow.width, this.battle.player[2].arrow.height, -8, -44, this.battle.player[2].arrow.width, this.battle.player[2].arrow.height);
    ctx.restore();
    ctx.drawImage(this.spriteSheet, this.bubbles[this.battle.player[2].curBubble.num].sx, this.bubbles[this.battle.player[2].curBubble.num].sy, this.bubbles[this.battle.player[2].curBubble.num].width, this.bubbles[this.battle.player[2].curBubble.num].height, this.battle.player[2].curBubble.x-16, this.battle.player[2].curBubble.y-16, this.bubbles[this.battle.player[2].curBubble.num].width, this.bubbles[this.battle.player[2].curBubble.num].height);
    ctx.drawImage(this.spriteSheet, this.bubbles[this.battle.player[2].nextBubble.num].sx, this.bubbles[this.battle.player[2].nextBubble.num].sy, this.bubbles[this.battle.player[2].nextBubble.num].width, this.bubbles[this.battle.player[2].nextBubble.num].height, this.battle.player[2].nextBubble.x-16, this.battle.player[2].nextBubble.y-16, this.bubbles[this.battle.player[2].nextBubble.num].width, this.bubbles[this.battle.player[2].nextBubble.num].height);
    //player[whosTurn] buttons
    ctx.drawImage(this.spriteSheet, this.battle.player[this.battle.whoseTurn].buttonLeft.sx, this.battle.player[this.battle.whoseTurn].buttonLeft.sy, this.battle.player[this.battle.whoseTurn].buttonLeft.width, this.battle.player[this.battle.whoseTurn].buttonLeft.height, this.battle.player[this.battle.whoseTurn].buttonLeft.x, this.battle.player[this.battle.whoseTurn].buttonLeft.y, this.battle.player[this.battle.whoseTurn].buttonLeft.width, this.battle.player[this.battle.whoseTurn].buttonLeft.height);
    ctx.drawImage(this.spriteSheet, this.battle.player[this.battle.whoseTurn].buttonRight.sx, this.battle.player[this.battle.whoseTurn].buttonRight.sy, this.battle.player[this.battle.whoseTurn].buttonRight.width, this.battle.player[this.battle.whoseTurn].buttonRight.height, this.battle.player[this.battle.whoseTurn].buttonRight.x, this.battle.player[this.battle.whoseTurn].buttonRight.y, this.battle.player[this.battle.whoseTurn].buttonRight.width, this.battle.player[this.battle.whoseTurn].buttonRight.height);
    ctx.drawImage(this.spriteSheet, this.battle.player[this.battle.whoseTurn].buttonShoot.sx, this.battle.player[this.battle.whoseTurn].buttonShoot.sy, this.battle.player[this.battle.whoseTurn].buttonShoot.width, this.battle.player[this.battle.whoseTurn].buttonShoot.height, this.battle.player[this.battle.whoseTurn].buttonShoot.x, this.battle.player[this.battle.whoseTurn].buttonShoot.y, this.battle.player[this.battle.whoseTurn].buttonShoot.width, this.battle.player[this.battle.whoseTurn].buttonShoot.height);
  },
  battleUpdate: function(){
    if(this.battle.clickCount>0){
      this.battle.clickCount--;
    } else {
      this.battle.clickSpeed=1;
    }
    if(this.isRectClick(this.battle.player[this.battle.whoseTurn].buttonLeft.x,this.battle.player[this.battle.whoseTurn].buttonLeft.y,this.battle.player[this.battle.whoseTurn].buttonLeft.width,this.battle.player[this.battle.whoseTurn].buttonLeft.height)){
      this.battle.player[this.battle.whoseTurn].arrow.angle-=this.battle.clickSpeed;
      if(this.battle.player[this.battle.whoseTurn].arrow.angle < -67) this.battle.player[this.battle.whoseTurn].arrow.angle = -67;
      this.battle.clickCount=20;
      this.battle.clickSpeed++;
    }
    if(this.isRectClick(this.battle.player[this.battle.whoseTurn].buttonRight.x,this.battle.player[this.battle.whoseTurn].buttonRight.y,this.battle.player[this.battle.whoseTurn].buttonRight.width,this.battle.player[this.battle.whoseTurn].buttonRight.height)){
      this.battle.player[this.battle.whoseTurn].arrow.angle+=this.battle.clickSpeed;
      if(this.battle.player[this.battle.whoseTurn].arrow.angle > 67) this.battle.player[this.battle.whoseTurn].arrow.angle = 67;
      this.battle.clickCount=20;
      this.battle.clickSpeed++;
    }
    if(this.isRectClick(this.battle.player[this.battle.whoseTurn].buttonShoot.x,this.battle.player[this.battle.whoseTurn].buttonShoot.y,this.battle.player[this.battle.whoseTurn].buttonShoot.width,this.battle.player[this.battle.whoseTurn].buttonShoot.height)){
      console.log("buttonShoot");
    }
  }

};
var bubbleGame =  new Thing("src/things.png", 100, 250, 98, 98, null, 70); //xpos 520
bubble.spriteSheet = new Image();
bubble.spriteSheet.src = "bubble/bubble.png";
bubble.backgroundSheet = new Image();
bubble.backgroundSheet.src = "bubble/background.png";
bubbleGame.standing = function(){
	this.drawData.frameTotNum = 2;
	this.drawData.frame[1] = {x: 200, y: 500};
	this.drawData.frame[2] = {x: 300, y: 500};
};
bubbleGame.update = function(){
	if(bubble.status){
		if(mouse.status){
			mouse.status = false;
			bubble.click = true;
		}
		if(bubble.menu.status){
			bubble.menuDraw();
			bubble.menuUpdate();
		}
		if(bubble.battle.status){
			bubble.battleDraw();
			bubble.battleUpdate();
		}
	}
	thingObj.update.call(this);
};
bubbleGame.action = function(){
  bubble.powerOn();
};
