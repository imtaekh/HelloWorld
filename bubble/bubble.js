var bubble={
  status: false,
	spriteSheet: undefined,
  backgroundSheet: undefined,
  gameMode:undefined,
  click: false,
  numOfColumn: undefined,
  bubbleData: undefined,
	powerOn: function(){
    gameOn = true;
    this.gameMode = null;
    this.numOfColumn = null;
    this.bubbleData = null;
		this.status = true;
		this.menuGene();
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
  bubbles: {
    numberOfColor:4, width:32, height:32,
    0:{color: 0, sx:0, sy:482, special:null},
    1:{color: 0, sx:0, sy:518, special:"bomb"},
    2:{color: 0, sx:0, sy:554, special:"colorChange"},
    3:{color: 1, sx:36, sy:482, special:null},
    4:{color: 1, sx:36, sy:518, special:"bomb"},
    5:{color: 1, sx:36, sy:554, special:"colorChange"},
    6:{color: 2, sx:72, sy:482, special:null},
    7:{color: 2, sx:72, sy:518, special:"bomb"},
    8:{color: 2, sx:72, sy:554, special:"colorChange"},
    9:{color: 3, sx:108, sy:482, special:null},
    10:{color: 3, sx:108, sy:518, special:"bomb"},
    11:{color: 3, sx:108, sy:554, special:"colorChange"},
    12:{color: 4, sx:144, sy:482, special:null},
    13:{color: 4, sx:144, sy:518, special:"bomb"},
    14:{color: 4, sx:144, sy:554, special:"colorChange"},
    15:{color: 5, sx:180, sy:482, special:null},
    16:{color: 5, sx:180, sy:518, special:"bomb"},
    17:{color: 5, sx:180, sy:554, special:"colorChange"},
  },
  bubbleGenerator: function(){
    var randNum=Math.random();
    var type;
    if(randNum<0.9){
      type=0;
    } else if(randNum<0.95){
      type=1;
      return 16;
    } else {
      type=2;
    }
    return (Math.floor(Math.random()*this.bubbles.numberOfColor)*3+type);
  },
  bubbleReloader: function(){
    switch(this.gameMode){
      case "battleMode":
      this.battle.player[this.battle.whoseTurn].curBubble.num=this.battle.player[this.battle.whoseTurn].nextBubble.num;
      this.battle.player[this.battle.whoseTurn].nextBubble.num=this.bubbleGenerator();
      this.battle.player[this.battle.whoseTurn].curBubble.isShow=true;
      break;
      default:
    }
  },
  bubbleGlue: function(){
    var shortest={xPos:null, yPos:null, distance:60};
    for(var i=0;i<this.bubbleData.length;i++){
      var offset=this.gapOffset(i);
      for(var j=0; j<this.numOfColumn+offset; j++){
        if(this.bubbleData[i][j].num===null){
          if(distance(this.bubbleData[i][j], this.bubbleMove, "both")<shortest.distance){
            shortest.distance =distance(this.bubbleData[i][j], this.bubbleMove, "both");
            shortest.xPos=j;
            shortest.yPos=i;
          }
        }
      }
    }
    dot(this.bubbleMove.x,this.bubbleMove.y,"blue");
    dot(this.bubbleData[shortest.yPos][shortest.xPos].x,this.bubbleData[shortest.yPos][shortest.xPos].y,"blue");
    this.bubbleData[shortest.yPos][shortest.xPos].num = this.bubbleMove.num;
    this.bubbleMove.status=false;
    this.bubbleAction(shortest.yPos,shortest.xPos);
    this.fallingCheck();
    this.bubbleReloader();
    (this.battle.whoseTurn==1)?this.battle.whoseTurn=2:this.battle.whoseTurn=1;
  },
  bubbleAction:function(yOrigin,xOrigin){
    var bubbleColor= Math.floor(this.bubbleData[yOrigin][xOrigin].num/3)*3;
    switch (this.bubbles[this.bubbleData[yOrigin][xOrigin].num].special) {
      case "colorChange":
        var offset=this.gapOffset(yOrigin);
        for(var j=0;j<this.numOfColumn+offset;j++){
          this.bubbleData[yOrigin][j].num=bubbleColor;
        }
        break;
      case "bomb":
        this.bubbleData[yOrigin][xOrigin].isFalling=true;
        var around=this.getAroundPosInfo(yOrigin,xOrigin);
        for(var i =0; i<6; i++){
          if(around[i].y >=0 && around[i].y < 12 ){
            var offset=this.gapOffset(i);
            if(around[i].x >=0 && around[i].x < this.numOfColumn+offset){
              if(this.bubbleData[around[i].y][around[i].x].num!== null){
                this.bubbleData[around[i].y][around[i].x].num =15;
                this.bubbleData[around[i].y][around[i].x].isFalling = true;
              }
            }
            this.fallingProvoke();
            this.unattachedCheck();
          }
        }
        break;
      default:
      this.bubbleCheck(yOrigin,xOrigin);
    }
  },
  getAroundPosInfo: function(yOrigin,xOrigin){
    var around={
      0:{y:yOrigin, x:xOrigin-1},
      3:{y:yOrigin, x:xOrigin+1},
      };

    if(this.bubbleData[yOrigin].isGap){
      around[1]={y:yOrigin-1, x:xOrigin};
      around[2]={y:yOrigin-1, x:xOrigin+1};
      around[4]={y:yOrigin+1, x:xOrigin+1};
      around[5]={y:yOrigin+1, x:xOrigin};
    } else {
      around[1]={y:yOrigin-1, x:xOrigin-1};
      around[2]={y:yOrigin-1, x:xOrigin};
      around[4]={y:yOrigin+1, x:xOrigin};
      around[5]={y:yOrigin+1, x:xOrigin-1};
    }
    return around;
  },
  bubbleCheck:function(yOrigin,xOrigin){
    this.bubbleData[yOrigin][xOrigin].isFalling=true;
    var around=this.getAroundPosInfo(yOrigin,xOrigin);

    for(var i =0; i<6; i++){
      if(around[i].y >=0 && around[i].y < 12 ){
        var offset=this.gapOffset(around[i].y);
        if(around[i].x >=0 && around[i].x < this.numOfColumn+offset){
          dot(this.bubbleData[around[i].y][around[i].x].x,this.bubbleData[around[i].y][around[i].x].y,"yellow");
          if(this.bubbleData[around[i].y][around[i].x].num==this.bubbleData[yOrigin][xOrigin].num && this.bubbleData[around[i].y][around[i].x].isFalling === false){
            this.bubbleCheck(around[i].y,around[i].x);
          }
        }
      }
    }
  },
  fallingProvoke: function(){
    for(i=0;i<this.bubbleData.length;i++){
      var offset=this.gapOffset(i);
      for(var j=0; j<this.numOfColumn+offset; j++){
        if(this.bubbleData[i][j].num !== null && this.bubbleData[i][j].isFalling === true){
          this.bubbleFallingGene(this.bubbleData[i][j].y,this.bubbleData[i][j].x,this.bubbleData[i][j].num);
          this.bubbleData[i][j].num = null;
          this.bubbleData[i][j].isFalling = false;
        }
      }
    }
  },
  fallingCheck: function(){
    var count=0;

    for(var i=0;i<this.bubbleData.length;i++){
      var offset=this.gapOffset(i);
      for(var j=0; j<this.numOfColumn+offset; j++){
        if(this.bubbleData[i][j].num !== null && this.bubbleData[i][j].isFalling === true){
          count++;
        }
      }
    }
    if(count>3){
      this.fallingProvoke();
      this.unattachedCheck();
    } else {
      for(var i=0;i<this.bubbleData.length;i++){
        var offset=this.gapOffset(i);
        for(var j=0; j<this.numOfColumn+offset; j++){
          if(this.bubbleData[i][j].num !== null && this.bubbleData[i][j].isFalling === true){
            this.bubbleData[i][j].isFalling = false;
          }
        }
      }
    }
  },
  unattachedCheck: function(){
    for(var i=0;i<this.bubbleData.length;i++){
      var offset=this.gapOffset(i);
      for(var j=0; j<this.numOfColumn+offset; j++){
        if(this.bubbleData[i][j].num !== null && this.bubbleData[i][j].isFalling === false){
           this.bubbleData[i][j].isFalling=true;
        }
      }
    }
    var offset=this.gapOffset(0);
    for(var j=0; j<this.numOfColumn+offset; j++){
      if(this.bubbleData[0][j].num !== null && this.bubbleData[0][j].isFalling === true){
        this.unattachedCheckRecursive(0,j);
      }
    }
    this.fallingProvoke();
  },
  unattachedCheckRecursive: function(yOrigin,xOrigin){
    dot(this.bubbleData[yOrigin][xOrigin].x,this.bubbleData[yOrigin][xOrigin].y,"blue");

    this.bubbleData[yOrigin][xOrigin].isFalling=false;
    var around=this.getAroundPosInfo(yOrigin,xOrigin);

    for(var i =0; i<6; i++){
      if(around[i].y >=0 && around[i].y < 12 ){
        var offset = this.gapOffset(0);
        if(around[i].x >=0 && around[i].x < this.numOfColumn+offset){
          if(this.bubbleData[around[i].y][around[i].x].num !==null && this.bubbleData[around[i].y][around[i].x].isFalling === true){
            this.unattachedCheckRecursive(around[i].y,around[i].x);
          }
        }
      }
    }
  },
  bubbleFalling: {},
  bubbleFallingGene: function(yOrigin, xOrigin, numOrigin){
    for(var i=0; i<100; i++){
      if(this.bubbleFalling[i]===undefined){
        this.bubbleFalling[i]={num:numOrigin,x:xOrigin,y:yOrigin,yValocity:-Math.random()*4,xValocity:Math.random()*6-2};
        break;
      }
    }
  },
  bubbleFallingUpdate: function(){
    for(var i=0; i<100; i++){
      if(this.bubbleFalling[i]!==undefined){
        this.bubbleFalling[i].y+=this.bubbleFalling[i].yValocity;
        this.bubbleFalling[i].x+=this.bubbleFalling[i].xValocity;
        this.bubbleFalling[i].yValocity+=gravity;
        if(this.bubbleFalling[i].y>WIDTH+16){
          delete this.bubbleFalling[i];
        }
      }
    }
  },
  bubbleFallingDraw: function(){
    for(var i=0; i<100; i++){
      if(this.bubbleFalling[i]!==undefined){
        ctx.drawImage(this.spriteSheet, this.bubbles[this.bubbleFalling[i].num].sx, this.bubbles[this.bubbleFalling[i].num].sy, this.bubbles.width, this.bubbles.height, this.bubbleFalling[i].x-16, this.bubbleFalling[i].y-16, this.bubbles.width, this.bubbles.height);
      }
    }
  },
  bubbleMove:{
    status: false,
    x: undefined,
    y: undefined,
    num: undefined,
    velocity: 10,
    xVelocity: undefined,
    yVelocity: undefined,
    borderLeft: undefined,
    borderRight: undefined
  },
  bubbleMoveGene: function(){
    this.bubbleMove.status=true;
    switch(this.gameMode){
      case "battleMode":
      this.bubbleMove.x = this.battle.player[this.battle.whoseTurn].curBubble.x;
      this.bubbleMove.y = this.battle.player[this.battle.whoseTurn].curBubble.y;
      this.bubbleMove.num = this.battle.player[this.battle.whoseTurn].curBubble.num;
      if(this.battle.whoseTurn==1){
        this.bubbleMove.borderLeft = 77;
      } else {
        this.bubbleMove.borderLeft = 285;
      }
      this.bubbleMove.borderRight = this.bubbleMove.borderLeft+238;
      this.bubbleMove.yVelocity=Number(Math.sin(bubble.battle.player[this.battle.whoseTurn].arrow.angle*Math.PI/180-1/2*Math.PI)).toFixed(2)*this.bubbleMove.velocity;
      this.bubbleMove.xVelocity=Number(Math.cos(bubble.battle.player[this.battle.whoseTurn].arrow.angle*Math.PI/180-1/2*Math.PI)).toFixed(2)*this.bubbleMove.velocity;
      break;
      default:
    }
  },
  bubbleMoveUpdate: function(){
    if(this.bubbleMove.x-16<this.bubbleMove.borderLeft){
      this.bubbleMove.x=this.bubbleMove.borderLeft+16;
      this.bubbleMove.xVelocity*=(-1);
    } else if(this.bubbleMove.x+16>this.bubbleMove.borderRight){
      this.bubbleMove.x=this.bubbleMove.borderRight-16;
      this.bubbleMove.xVelocity*=(-1);
    }
    for(var i=0;i<this.battle.bubbleData.length;i++){
      var offset = this.gapOffset(i);
      for(var j=0; j<14+offset; j++){
        if(this.battle.bubbleData[i][j].num!==null){
          if(distance(this.battle.bubbleData[i][j], this.bubbleMove, "both")<=30){
            this.bubbleGlue();
            return;
          }
        }
      }
    }
    if(this.bubbleMove.y-16<=17){
      this.bubbleGlue();
      return;
    }
    this.bubbleMove.x+=this.bubbleMove.xVelocity;
    this.bubbleMove.y+=this.bubbleMove.yVelocity;
  },
  bubbleMoveDraw: function(){
    ctx.drawImage(this.spriteSheet, this.bubbles[this.bubbleMove.num].sx, this.bubbles[this.bubbleMove.num].sy, this.bubbles.width, this.bubbles.height, this.bubbleMove.x-16, this.bubbleMove.y-16, this.bubbles.width, this.bubbles.height);
  },
  gapOffset: function(lineNum){
    var offset=0;
    if (this.bubbleData[lineNum].isGap){
      offset= -1;
    }
    return offset;
  },
  lineAdder: function(){
    var x=76+16;
    var y=15+16;
    var xPosOffset=0;
    for(var i=this.bubbleData.length-1; i>0; i--){
      this.bubbleData[i]=this.bubbleData[i-1];
      var offset = this.gapOffset(i);
      for(var j=0;j<this.numOfColumn+offset;j++){
        this.battle.bubbleData[i][j].y=y+i*28;
      }
    }
    this.bubbleData[0]={};
    if(this.bubbleData[1].isGap){
      this.bubbleData[0].isGap=false;
    } else{
      this.bubbleData[0].isGap=true;
      xPosOffset=16;
    }
    var offset = this.gapOffset(0);
    for(var j=0; j<this.numOfColumn+offset; j++){
      this.battle.bubbleData[0][j]={};
      if(j==13 && this.battle.bubbleData[0].isGap){
        this.battle.bubbleData[0][j].num=null
      } else {
        this.battle.bubbleData[0][j].num=Math.floor(Math.random()*this.bubbles.numberOfColor)*3;
      }
      this.battle.bubbleData[0][j].isFalling=false;
      this.battle.bubbleData[0][j].x=x+j*32+xPosOffset;
      this.battle.bubbleData[0][j].y=y+i*28;
    }
  },
  battle: {
    status:false,
    background: {
      num: undefined,
      maxNum: 1,
      0:{ x:76, y:15, sx:0, sy:0, width:224, height:186 }
    },
    gameFrame: { x:64, y:3, sx:0, sy:84, width:472, height:394 },
    whoseTurn:1,
    whoHasControl:1,
    clickCount:0,
    clickSpeed:1,
    player: {
      1:{
        arrow: { angle: 0, x:180, y:299, sx:216, sy:482, width:16, height:80 },
        buttonLeft:{ x:82, y:345, sx:236, sy:482, width:38, height:28 },
        buttonRight:{ x:254, y:345, sx:278, sy:482, width:38, height:28 },
        buttonShoot:{ x:204, y:340, sx:320, sy:482, width:26, height:38 },
        curBubble:{ isShow:true, num:undefined, x:188, y:342 },
        nextBubble:{ num:undefined, x:153, y:365 }
      },
      2:{
        arrow: { angle: 0, x:404, y:299, sx:216, sy:482, width:16, height:80 },
        buttonLeft:{ x:306, y:345, sx:236, sy:482, width:38, height:28 },
        buttonRight:{ x:478, y:345, sx:278, sy:482, width:38, height:28 },
        buttonShoot:{ x:428, y:340, sx:320, sy:482, width:26, height:38 },
        curBubble:{ isShow:true, num:undefined, x:412, y:342 },
        nextBubble:{ num:undefined, x:377, y:365 }
      },
      bubbleData:undefined,
    }
  },
  battleGene: function(){
    this.battle.status = true;
    this.gameMode = "battleMode";
    this.numOfColumn = 14;
    this.battle.background.num=Math.floor(Math.random()*this.battle.background.maxNum);
    this.battle.player[1].curBubble.num=this.bubbleGenerator();
    this.battle.player[1].nextBubble.num=this.bubbleGenerator();
    this.battle.player[2].curBubble.num=this.bubbleGenerator();
    this.battle.player[2].nextBubble.num=this.bubbleGenerator();
    this.battle.bubbleData=new Array(12);
    for(var i=0;i<this.battle.bubbleData.length;i++){
      this.battle.bubbleData[i]={};
      var gapOffset=0;
      var xPosOffset=0;
      if(i%2 === 0){
        this.battle.bubbleData[i].isGap=false;
      } else {
        this.battle.bubbleData[i].isGap=true;
        xPosOffset=16;
      }
      var x=76+16;
      var y=15+16;
      if(i<5){
        for(var j=0; j<14; j++){
          this.battle.bubbleData[i][j]={};
          if(j==13 && this.battle.bubbleData[i].isGap){
            this.battle.bubbleData[i][j].num=null
          } else {
            this.battle.bubbleData[i][j].num=Math.floor(Math.random()*this.bubbles.numberOfColor)*3;
          }
          this.battle.bubbleData[i][j].isFalling=false;
          this.battle.bubbleData[i][j].x=x+j*32+xPosOffset;
          this.battle.bubbleData[i][j].y=y+i*28;
        }
      } else{
        for(var j=0; j<14; j++){
          this.battle.bubbleData[i][j]={};
          this.battle.bubbleData[i][j].num=null;
          this.battle.bubbleData[i][j].isFalling=false;
          this.battle.bubbleData[i][j].x=x+j*32+xPosOffset;
          this.battle.bubbleData[i][j].y=y+i*28;
        }
      }
      this.bubbleData = this.battle.bubbleData;
    }
  },
  battleDraw: function(){
    //black background & gamebBackground
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    ctx.drawImage(this.backgroundSheet, this.battle.background[this.battle.background.num].sx, this.battle.background[this.battle.background.num].sy, this.battle.background[this.battle.background.num].width, this.battle.background[this.battle.background.num].height, this.battle.background[this.battle.background.num].x, this.battle.background[this.battle.background.num].y, this.battle.background[this.battle.background.num].width*2, this.battle.background[this.battle.background.num].height*2);
    (this.battle.whoseTurn == 1)?
    ctx.drawImage(this.spriteSheet, 474, 96, 2, 370, 315, 15, 2, 370):
    ctx.drawImage(this.spriteSheet, 478, 96, 2, 370, 283, 15, 2, 370);
    //gameBubbles
    for(var i=0;i<this.battle.bubbleData.length;i++){
      var offset = this.gapOffset(i);
      for(var j=0; j<14+offset; j++){
        if(this.battle.bubbleData[i][j].num!==null){
          ctx.drawImage(this.spriteSheet, this.bubbles[this.battle.bubbleData[i][j].num].sx, this.bubbles[this.battle.bubbleData[i][j].num].sy, this.bubbles.width, this.bubbles.height, this.battle.bubbleData[i][j].x-16, this.battle.bubbleData[i][j].y-16, this.bubbles.width, this.bubbles.height);
        }
      }
    }
    //stage setting
    ctx.drawImage(this.spriteSheet, this.battle.gameFrame.sx, this.battle.gameFrame.sy, this.battle.gameFrame.width, this.battle.gameFrame.height, this.battle.gameFrame.x, this.battle.gameFrame.y, this.battle.gameFrame.width, this.battle.gameFrame.height);
    //player[1] arrow & bubbles
    ctx.save();
    ctx.translate(this.battle.player[1].arrow.x+8,this.battle.player[1].arrow.y+44);
    ctx.rotate(this.battle.player[1].arrow.angle*Math.PI/180);
    ctx.drawImage(this.spriteSheet, this.battle.player[1].arrow.sx, this.battle.player[1].arrow.sy, this.battle.player[1].arrow.width, this.battle.player[1].arrow.height, -8, -44, this.battle.player[1].arrow.width, this.battle.player[1].arrow.height);
    ctx.restore();
    if(this.battle.player[1].curBubble.isShow) ctx.drawImage(this.spriteSheet, this.bubbles[this.battle.player[1].curBubble.num].sx, this.bubbles[this.battle.player[1].curBubble.num].sy, this.bubbles.width, this.bubbles.height, this.battle.player[1].curBubble.x-16, this.battle.player[1].curBubble.y-16, this.bubbles.width, this.bubbles.height);
    ctx.drawImage(this.spriteSheet, this.bubbles[this.battle.player[1].nextBubble.num].sx, this.bubbles[this.battle.player[1].nextBubble.num].sy, this.bubbles.width, this.bubbles.height, this.battle.player[1].nextBubble.x-16, this.battle.player[1].nextBubble.y-16, this.bubbles.width, this.bubbles.height);
    //player[2] arrow & bubble
    ctx.save();
    ctx.translate(this.battle.player[2].arrow.x+8,this.battle.player[2].arrow.y+44);
    ctx.rotate(this.battle.player[2].arrow.angle*Math.PI/180);
    ctx.drawImage(this.spriteSheet, this.battle.player[2].arrow.sx, this.battle.player[2].arrow.sy, this.battle.player[2].arrow.width, this.battle.player[2].arrow.height, -8, -44, this.battle.player[2].arrow.width, this.battle.player[2].arrow.height);
    ctx.restore();
    if(this.battle.player[2].curBubble.isShow) ctx.drawImage(this.spriteSheet, this.bubbles[this.battle.player[2].curBubble.num].sx, this.bubbles[this.battle.player[2].curBubble.num].sy, this.bubbles.width, this.bubbles.height, this.battle.player[2].curBubble.x-16, this.battle.player[2].curBubble.y-16, this.bubbles.width, this.bubbles.height);
    ctx.drawImage(this.spriteSheet, this.bubbles[this.battle.player[2].nextBubble.num].sx, this.bubbles[this.battle.player[2].nextBubble.num].sy, this.bubbles.width, this.bubbles.height, this.battle.player[2].nextBubble.x-16, this.battle.player[2].nextBubble.y-16, this.bubbles.width, this.bubbles.height);
    //player[whoseTurn] buttons
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
    if(keystate[KEY_LEFT]){
      this.battle.player[this.battle.whoHasControl].arrow.angle-=this.battle.clickSpeed;
      if(this.battle.player[this.battle.whoHasControl].arrow.angle < -67) this.battle.player[this.battle.whoHasControl].arrow.angle = -67;
    }
    if(keystate[KEY_RIGHT]||this.isRectClick(this.battle.player[this.battle.whoHasControl].buttonRight.x,this.battle.player[this.battle.whoHasControl].buttonRight.y,this.battle.player[this.battle.whoHasControl].buttonRight.width,this.battle.player[this.battle.whoHasControl].buttonRight.height)){
      this.battle.player[this.battle.whoHasControl].arrow.angle+=this.battle.clickSpeed;
      if(this.battle.player[this.battle.whoHasControl].arrow.angle > 67) this.battle.player[this.battle.whoHasControl].arrow.angle = 67;
    }
    if(this.isRectClick(this.battle.player[this.battle.whoHasControl].buttonLeft.x,this.battle.player[this.battle.whoHasControl].buttonLeft.y,this.battle.player[this.battle.whoHasControl].buttonLeft.width,this.battle.player[this.battle.whoHasControl].buttonLeft.height)){
      this.battle.player[this.battle.whoHasControl].arrow.angle-=this.battle.clickSpeed;
      if(this.battle.player[this.battle.whoHasControl].arrow.angle < -67) this.battle.player[this.battle.whoHasControl].arrow.angle = -67;
      this.battle.clickCount=20;
      this.battle.clickSpeed++;
    }
    if(this.isRectClick(this.battle.player[this.battle.whoHasControl].buttonRight.x,this.battle.player[this.battle.whoHasControl].buttonRight.y,this.battle.player[this.battle.whoHasControl].buttonRight.width,this.battle.player[this.battle.whoHasControl].buttonRight.height)){
      this.battle.player[this.battle.whoHasControl].arrow.angle+=this.battle.clickSpeed;
      if(this.battle.player[this.battle.whoHasControl].arrow.angle > 67) this.battle.player[this.battle.whoHasControl].arrow.angle = 67;
      this.battle.clickCount=20;
      this.battle.clickSpeed++;
    }
    if(this.bubbleMove.status===false &&(keystate[KEY_SPACE]|| this.isRectClick(this.battle.player[this.battle.whoHasControl].buttonShoot.x,this.battle.player[this.battle.whoHasControl].buttonShoot.y,this.battle.player[this.battle.whoHasControl].buttonShoot.width,this.battle.player[this.battle.whoHasControl].buttonShoot.height))){
      this.battle.player[this.battle.whoHasControl].curBubble.isShow=false;
      this.bubbleMoveGene();
      (this.battle.whoHasControl==1)?this.battle.whoHasControl=2:this.battle.whoHasControl=1;
    }
  }
};
var bubbleGame =  new Thing("src/things.png", 100, 250, 98, 98, null, 70);
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
      bubble.bubbleFallingDraw();
      bubble.bubbleFallingUpdate();
		}
		if(bubble.bubbleMove.status){
			bubble.bubbleMoveDraw();
			bubble.bubbleMoveUpdate();
		}
	}
	thingObj.update.call(this);
};
bubbleGame.action = function(){
  bubble.powerOn();
};
