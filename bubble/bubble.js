var bubble={
  status: false,
	spriteSheet: undefined,
  backgroundSheet: undefined,
  gameMode:undefined,
  click: false,
  angleOriginal: undefined,
  angleTouchOffset: undefined,
  turnCount: undefined,
  numOfColumn: undefined,
  bubbleData: undefined,
  TargetPosition: {xPos:undefined, yPos:undefined, distance:undefined},
	powerOn: function(){
    gameOn = true;
    this.gameMode = "demoMode";
    this.gameOver.status = false;
    this.numOfColumn = null;
    this.bubbleData = null;
		this.status = true;
		this.menuGene("main");
	},
	isRectClick: function(x,y,width,height){
		if(this.click && mouse.x>x && mouse.y>y && mouse.x<x+width && mouse.y<y+height){
			this.click = false;
			return true;
		}
	},
	menu:{
		status:false,
    instruction: undefined,
		background: undefined,
    textAlign: undefined,
    instruction:{
			status:undefined,
			x:20,
			y:110,
			sx:282,
			sy:84,
			width:210,
			height:214,

      gameFrame: { x:230, y:346, sx:10, sy:84, width:148, height:12 },
      luncher: { x:230, y:278, sx:290, sy:482, width:148, height:68 },
      player: {
        score: undefined,
        arrow: { angle: 0, x:296, y:265, sx:216, sy:482, width:16, height:80 },
        borderLeft: 77,
        curBubble:{ isShow:true, num:1, x:304, y:308 },
        nextBubble:{ num:2, x:269, y:330 }
      },
      bubbleData: undefined,
    },
		title: {
			status:undefined,
			x:162,
			y:20,
			sx:0,
			sy:0,
			width:288,
			height:80
		}
	},
	menuGene: function(options) {
    this.menu.status = true;
    this.click = false;
    this.bubbleMove.status = false;
    this.menu.instruction.player.curBubble.num = this.bubbleGenerator();
    this.menu.instruction.player.nextBubble.num = this.bubbleGenerator();
    this.menu.instruction.player.arrow.angle = 0;
    switch(options){
      case "main":
        this.menu.background = true;
        this.menu.title.status = true;
        this.menu.instruction.status = true;
        this.gameMode="demoMode";
        this.menu.instruction.player.curBubble.isShow=true;
        this.menu.textAlign = "left";
        this.menu[1] = {status: true, x:390, y:165, width:180, height:25, string:"SINGLE PLAY"}; //siglePlay
        this.menu[2] = {status: true, x:390, y:255, width:180, height:25, string:"BATTLE MODE"}; //battleMode
        this.menu[3] = {status: true, x:390, y:210, width:180, height:25, string:"RANKS(SINGLE)"}; //ranks
        this.menu[4] = {status: true, x:390, y:300, width:80, height:25, string:"EXIT"}; //exit
        this.menu[5] = {status: false}; //main menu
        break;
      case "battleMode":
        this.menu.background = false;
        this.menu.title.status = false;
        this.menu.instruction.status = false;
        this.menu.textAlign = "center";
        this.menu[1] = {status: false}; //siglePlay
        this.menu[2] = {status: true, x:300, y:220, width:180, height:20, string:"PLAY AGAIN"}; //battleMode
        this.menu[3] = {status: false};//ranks
        this.menu[4] = {status: false};//exit
        this.menu[5] = {status: true, x:300, y:265, width:150, height:20, string:"MAIN MENU"}; //main menu
        break;
      case "singleMode":
        this.menu.background = false;
        this.menu.title.status = false;
        this.menu.instruction.status = false;
        this.menu.textAlign = "center";
        this.menu[1] = {status: true, x:300, y:220, width:180, height:20, string:"PLAY AGAIN"}; //siglePlay
        this.menu[2] = {status: false};//battleMode
        this.menu[3] = {status: true, x:300, y:265, width:150, height:20, string:"RANKS"};//ranks
        this.menu[4] = {status: false};//exit
        this.menu[5] = {status: true, x:300, y:310, width:150, height:20, string:"MAIN MENU"}; //main menu
        break;
      case "exitSingle":
        this.menu.background = false;
        this.menu.title.status = false;
        this.menu.instruction.status = false;
        this.menu.textAlign = "center";
        this.gameMode = "demoMode";
        this.menu[1] = {status: false}; //siglePlay
        this.menu[2] = {status: false};//battleMode
        this.menu[3] = {status: false};//ranks
        this.menu[4] = {status: false};//exit
        this.menu[5] = {status: true, x:380, y:325, width:50, height:25, string:"EXIT"}; //main menu
        break;
      case "exitBattle":
        this.menu.background = false;
        this.menu.title.status = false;
        this.menu.instruction.status = false;
        this.menu.textAlign = "center";
        this.gameMode = "demoMode";
        this.menu[1] = {status: false}; //siglePlay
        this.menu[2] = {status: false};//battleMode
        this.menu[3] = {status: false};//ranks
        this.menu[4] = {status: false};//exit
        this.menu[5] = {status: true, x:567, y:325, width:50, height:25, string:"EXIT"}; //main menu
        break;
    }
	},
	menuUpdate: function(){
		for(var i=1; i<=5; i++){
			if(this.menu[i].status){
        var textAlignOffset=0;
        if(this.menu.textAlign =="center"){
          textAlignOffset=-this.menu[i].width/2;
        }
        if(this.isRectClick(this.menu[i].x+textAlignOffset,this.menu[i].y-this.menu[i].height,this.menu[i].width,this.menu[i].height)){
        this.battle.status = false;
        this.single.status = false;
  				switch(i){
  					case 1: //siglePlay
              this.menuGene("exitSingle");
    					this.singleGene();
    					break;
  					case 2: //battleMode
    					this.menuGene("exitBattle");
    					this.battleGene();
    					break;
  					case 3: //ranks
              this.rankGene();
    					break;
  					case 4: //Game exit
    					this.exit();
              this.
    					break;
  					case 5: //Game exit
    					if(this.gameMode=="singleMode"){
                postInfo("bubble/saveScore.php",name,this.single.player.score);
              }
              this.gameOver.status = false;
              this.obstacleBubbleReset();
              this.bubbleFallingReset();
    					this.menuGene("main");
  					break;
          }
				}
			}
		}
    if(this.menu.instruction.status == true){
      this.control(this.menu.instruction.player);
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
		if(this.menu.instruction.status){
			ctx.drawImage(this.spriteSheet, this.menu.instruction.sx, this.menu.instruction.sy, this.menu.instruction.width, this.menu.instruction.height, this.menu.instruction.x, this.menu.instruction.y, this.menu.instruction.width, this.menu.instruction.height);
      ctx.drawImage(this.spriteSheet, this.menu.instruction.gameFrame.sx, this.menu.instruction.gameFrame.sy, this.menu.instruction.gameFrame.width, this.menu.instruction.gameFrame.height, this.menu.instruction.gameFrame.x, this.menu.instruction.gameFrame.y, this.menu.instruction.gameFrame.width, this.menu.instruction.gameFrame.height);
      ctx.drawImage(this.spriteSheet, this.menu.instruction.luncher.sx, this.menu.instruction.luncher.sy, this.menu.instruction.luncher.width, this.menu.instruction.luncher.height, this.menu.instruction.luncher.x, this.menu.instruction.luncher.y, this.menu.instruction.luncher.width, this.menu.instruction.luncher.height);
      ctx.translate(this.menu.instruction.player.arrow.x+8,this.menu.instruction.player.arrow.y+44);
      ctx.rotate(this.menu.instruction.player.arrow.angle*Math.PI/180);
      ctx.drawImage(this.spriteSheet, this.menu.instruction.player.arrow.sx, this.menu.instruction.player.arrow.sy, this.menu.instruction.player.arrow.width, this.menu.instruction.player.arrow.height, -8, -44, this.menu.instruction.player.arrow.width, this.menu.instruction.player.arrow.height);
      ctx.restore();
      if(this.menu.instruction.player.curBubble.isShow) {
        ctx.drawImage(this.spriteSheet, this.bubbles[this.menu.instruction.player.curBubble.num].sx, this.bubbles[this.menu.instruction.player.curBubble.num].sy, this.bubbles.width, this.bubbles.height, this.menu.instruction.player.curBubble.x-16, this.menu.instruction.player.curBubble.y-16, this.bubbles.width, this.bubbles.height);
      }
      ctx.drawImage(this.spriteSheet, this.bubbles[this.menu.instruction.player.nextBubble.num].sx, this.bubbles[this.menu.instruction.player.nextBubble.num].sy, this.bubbles.width, this.bubbles.height, this.menu.instruction.player.nextBubble.x-16, this.menu.instruction.player.nextBubble.y-16, this.bubbles.width, this.bubbles.height);
		}
		ctx.fillStyle="rgb(255,255,255)";
		ctx.strokeStyle="rgb(0,0,0)";
		ctx.lineWidth=5;
		for(var i = 1; i<= 5; i++){
      if(this.menu[i].status){
        ctx.textAlign=this.menu.textAlign;
  		  ctx.font = this.menu[i].height+"px Arial";
  			ctx.strokeText(this.menu[i].string, this.menu[i].x, this.menu[i].y);
  			ctx.fillText(this.menu[i].string, this.menu[i].x, this.menu[i].y);
      }
		}
		ctx.restore();
	},
	exit: function(){
    gameOn = true;
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
    99:{color: 99, sx:0, sy:590, special:"obstacle"},
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
      if(this.gameMode=="singleMode"){
        type=1;
        return 16;
      } else {
        type=2;
      }
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
      case "singleMode":
        this.single.player.curBubble.num=this.single.player.nextBubble.num;
        this.single.player.nextBubble.num=this.bubbleGenerator();
        this.single.player.curBubble.isShow=true;
        break;
      case "demoMode":
        this.menu.instruction.player.curBubble.num=this.menu.instruction.player.nextBubble.num;
        this.menu.instruction.player.nextBubble.num=this.bubbleGenerator();
        this.menu.instruction.player.curBubble.isShow=true;
        break;
    }

  },
  bubbleGlue: function(bubbleObj){
    if(this.bubbles[bubbleObj.num].special !== "bomb"){
      this.TargetPosition={xPos:null, yPos:null, distance:60};
      for(var i=0;i<this.bubbleData.length;i++){
        var offset=this.gapOffset(i);
        for(var j=0; j<this.numOfColumn+offset; j++){
          if(this.bubbleData[i][j].num===null){
            if(distance(this.bubbleData[i][j], bubbleObj, "both")<this.TargetPosition.distance){
              this.TargetPosition.distance =distance(this.bubbleData[i][j], bubbleObj, "both");
              this.TargetPosition.xPos=j;
              this.TargetPosition.yPos=i;
            }
          }
        }
      }
    }

    this.bubbleData[this.TargetPosition.yPos][this.TargetPosition.xPos].num = bubbleObj.num;
    this.bubbleData[this.TargetPosition.yPos][this.TargetPosition.xPos].obstacleChecked = false;
    this.bubbleAction(this.TargetPosition.yPos,this.TargetPosition.xPos);
  },
  bubbleGlueCheck: function(bubbleObj){
    for(var i=0;i<this.bubbleData.length;i++){
      var offset = this.gapOffset(i);
      for(var j=0; j<this.numOfColumn+offset; j++){
        if(this.bubbleData[i][j].num!==null){
          if(distance(this.bubbleData[i][j], bubbleObj, "both")<=20||(distance(this.bubbleData[i][j], bubbleObj, "both")<=30 && Math.abs(this.bubbleMove.xVelocity/this.bubbleMove.yVelocity-(this.bubbleMove.x-this.bubbleData[i][j].x)/(this.bubbleMove.y-this.bubbleData[i][j].y))<=0.7)){
//            dot(this.bubbleData[i][j].x,this.bubbleData[i][j].y,"blue");
//            dot(bubbleObj.x,bubbleObj.y,"red");
            this.TargetPosition.xPos=j;
            this.TargetPosition.yPos=i;
            glueIt(this);
            return;
          }
        }
      }
    }
    if(bubbleObj.y-16<=17){
      glueIt(this);
      return;
    }
    function glueIt(pointer){
      pointer.bubbleGlue(bubbleObj);
      if(bubbleObj.id !== undefined){
        delete pointer.obstacleBubble[bubbleObj.id];
      }else if(pointer.bubbleMove.status){
        pointer.turnOver();
      }
    }
  },
  turnOver: function(){
    this.bubbleMove.status=false;
    this.fallingCheck();
    this.bubbleReloader();
    this.turnCount++;
    var turnCicle = (this.gameMode=="battleMode")?9:5;
    if(this.turnCount !== 0 && (this.turnCount+3)%turnCicle === 0) {
      this.shakeGene(1, 5, 30);
    } else if(this.turnCount !== 0 && (this.turnCount+1)%turnCicle === 0) {
      this.shakeGene(1.5, 3, 50);
    } else if(this.turnCount !== 0 && this.turnCount%turnCicle === 0) {
      this.lineAdder();
      this.shake.status = false;
    }
    if(this.gameMode=="battleMode"){
      (this.battle.whoseTurn==1)?this.battle.whoseTurn=2:this.battle.whoseTurn=1;
      if(this.bubbleFalling.count>4){
        for(var i=0; i<(this.bubbleFalling.count-4)/4;i++){
          var xPos=this.battle.player[this.battle.whoseTurn].borderLeft+(Math.random()*220);
          this.obstacleBubbleGene(xPos);
        }
      }
    }
    if(this.gameMode=="singleMode"){
      if(Math.random()<0.3){
        var xPos=this.single.player.borderLeft+(Math.random()*220);
        this.obstacleBubbleGene(xPos);
      }
      this.single.player.score += this.bubbleFalling.count*100;
    }
    this.bubbleFalling.count=0;
    this.gameOverCheck();
    oneHit(KEY_SPACE);
    this.click = false;
  },
  bubbleAction:function(yOrigin,xOrigin){
    var bubbleColor= Math.floor(this.bubbleData[yOrigin][xOrigin].num/3)*3;
    switch (this.bubbles[this.bubbleData[yOrigin][xOrigin].num].special) {
      case "colorChange":
        var offset=this.gapOffset(yOrigin);
        for(var j=0;j<this.numOfColumn+offset;j++){
          if(j<xOrigin+4 && j > xOrigin-4){
            this.bubbleData[yOrigin][j].num=bubbleColor;
          }
        }
        break;
      case "bomb":
        this.bubbleData[yOrigin][xOrigin].isFalling=true;
        var around=this.getAroundPosInfo(yOrigin,xOrigin);
        for(var i =0; i<6; i++){
          if(around[i].y >=0 && around[i].y < 12 ){
            offset=this.gapOffset(i);
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
      case "obstacle":
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
          if(this.bubbleData[around[i].y][around[i].x].num==this.bubbleData[yOrigin][xOrigin].num && this.bubbleData[around[i].y][around[i].x].isFalling === false){
            this.bubbleCheck(around[i].y,around[i].x);
          }
        }
      }
    }
  },
  obstacleCheck:function(yOrigin,xOrigin){
    this.bubbleData[yOrigin][xOrigin].obstacleChecked=true;
    var around=this.getAroundPosInfo(yOrigin,xOrigin);

    for(var i =0; i<6; i++){
      if(around[i].y >=0 && around[i].y < 12 ){
        var offset=this.gapOffset(around[i].y);
        if(around[i].x >=0 && around[i].x < this.numOfColumn+offset){
          if(this.bubbleData[around[i].y][around[i].x].num==this.bubbleData[yOrigin][xOrigin].num && this.bubbleData[around[i].y][around[i].x].obstacleChecked === false){
            this.obstacleCheck(around[i].y,around[i].x);
          }
          if(this.bubbleData[around[i].y][around[i].x].num==99){
            this.bubbleData[around[i].y][around[i].x].isFalling=true;
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
      this.obstacleCheck(this.TargetPosition.yPos,this.TargetPosition.xPos);
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
    this.bubbleData[yOrigin][xOrigin].isFalling=false;
    var around=this.getAroundPosInfo(yOrigin,xOrigin);

    for(var i =0; i<6; i++){
      if(around[i].y >=0 && around[i].y < 12 ){
        var offset = this.gapOffset(around[i].y);
        if(around[i].x >=0 && around[i].x < this.numOfColumn+offset){
          if(this.bubbleData[around[i].y][around[i].x].num !==null && this.bubbleData[around[i].y][around[i].x].isFalling === true){
            this.unattachedCheckRecursive(around[i].y,around[i].x);
          }
        }
      }
    }
  },
  obstacleBubble: {},
  obstacleBubbleReset: function(){
    this.obstacleBubble = {};
  },
  obstacleBubbleGene: function(xOrigin){
    for(var i=0; i<100; i++){
      if(this.obstacleBubble[i]===undefined){
        this.obstacleBubble[i]={id:i,num:99,xOrigin:xOrigin,x:xOrigin,y:HEIGHT+30+(Math.random()*50-25),yValocity:-2,xValocity:(Math.random()*4-2)};
        break;
      }
    }
  },
  obstacleBubbleUpdate: function(){
    for(var i=0; i<100; i++){
      if(this.obstacleBubble[i]!==undefined){
        this.obstacleBubble[i].y+=this.obstacleBubble[i].yValocity;
        this.obstacleBubble[i].x+=this.obstacleBubble[i].xValocity;
        this.obstacleBubble[i].yValocity-=gravity*2;
        if(this.obstacleBubble[i].x<this.obstacleBubble[i].xOrigin-5 || this.obstacleBubble[i].x>this.obstacleBubble[i].xOrigin+5){
          this.obstacleBubble[i].xValocity*= -1;
        }
        this.bubbleGlueCheck(this.obstacleBubble[i]);
      }
    }
  },
  obstacleBubbleDraw: function(){
    for(var i=0; i<100; i++){
      if(this.obstacleBubble[i]!==undefined){
        ctx.drawImage(this.spriteSheet, this.bubbles[this.obstacleBubble[i].num].sx, this.bubbles[this.obstacleBubble[i].num].sy, this.bubbles.width, this.bubbles.height, this.obstacleBubble[i].x-16, this.obstacleBubble[i].y-16, this.bubbles.width, this.bubbles.height);
      }
    }
  },
  bubbleFalling: {count:0},
  bubbleFallingReset: function(){
    this.bubbleFalling = {count:0};
  },
  bubbleFallingGene: function(yOrigin, xOrigin, numOrigin){
    for(var i=0; i<100; i++){
      if(this.bubbleFalling[i]===undefined){
        this.bubbleFalling[i]={num:numOrigin,x:xOrigin,y:yOrigin,yValocity:-Math.random()*4,xValocity:Math.random()*6-3};
        this.bubbleFalling.count++;
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
  bubbleMoveGene: function(player){
    this.bubbleMove.status=true;
    this.bubbleMove.x = player.curBubble.x;
    this.bubbleMove.y = player.curBubble.y;
    this.bubbleMove.num = player.curBubble.num;
    this.bubbleMove.borderLeft = player.borderLeft;
    this.bubbleMove.borderRight = this.bubbleMove.borderLeft+238;
    this.bubbleMove.yVelocity=Number(Math.sin(player.arrow.angle*Math.PI/180-1/2*Math.PI)).toFixed(2)*this.bubbleMove.velocity;
    this.bubbleMove.xVelocity=Number(Math.cos(player.arrow.angle*Math.PI/180-1/2*Math.PI)).toFixed(2)*this.bubbleMove.velocity;
  },
  bubbleMoveUpdate: function(){
    if(this.menu.instruction.status){
      if(this.bubbleMove.y<0||this.bubbleMove.x<0||this.bubbleMove.x>WIDTH){
        this.bubbleMove.status=false;
        this.bubbleReloader();
      }
    }else {
      if(this.bubbleMove.x-16<this.bubbleMove.borderLeft){
        this.bubbleMove.x=this.bubbleMove.borderLeft+16;
        this.bubbleMove.xVelocity*=(-1);
      } else if(this.bubbleMove.x+16>this.bubbleMove.borderRight){
        this.bubbleMove.x=this.bubbleMove.borderRight-16;
        this.bubbleMove.xVelocity*=(-1);
      }
      this.bubbleGlueCheck(this.bubbleMove);
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
        this.bubbleData[i][j].y=y+i*28;
      }
    }
    this.bubbleData[0]={};
    if(this.bubbleData[1].isGap){
      this.bubbleData[0].isGap=false;
    } else{
      this.bubbleData[0].isGap=true;
      xPosOffset=16;
    }
    for(var j=0; j<this.numOfColumn+this.gapOffset(0); j++){
      this.bubbleData[0][j]={};
      if(j==13 && this.bubbleData[0].isGap){
        this.bubbleData[0][j].num=null;
      } else {
        this.bubbleData[0][j].num=Math.floor(Math.random()*this.bubbles.numberOfColor)*3;
      }
      this.bubbleData[0][j].obstacleChecked=false;
      this.bubbleData[0][j].isFalling=false;
      this.bubbleData[0][j].x=x+j*32+xPosOffset;
      this.bubbleData[0][j].y=y+i*28;
    }
    this.gameOverCheck();
  },
  gameOverCheck: function(){
    var lastRow=bubble.bubbleData.length-1;
      var offset=this.gapOffset(lastRow);
    switch(this.gameMode){
      case "battleMode":
        var isP1Lose=false, isP2Lose=false;
        for(var j=0; j<this.numOfColumn+offset; j++){
          if(this.bubbleData[lastRow][j].num !== null){
            if(j<7+offset){
              isP1Lose=true;
            }else if(j>6){
              isP2Lose=true;
            }
          }
        }
        if(isP1Lose&&isP2Lose){
          this.gameOverGene("Draw!");
        }else if(isP1Lose){
          this.gameOverGene("Player 2 Win!");
        }else if(isP2Lose){
          this.gameOverGene("Player 1 Win!");
        }
        break;
      case "singleMode":
        for(var j=0; j<this.numOfColumn+offset; j++){
          if(this.bubbleData[lastRow][j].num !== null){
          this.gameOverGene(this.single.player.score);
          }
        }
        break;
    }
  },
  gameOver:{
    count:undefined,
    COUNT_MAX:100,
    status:undefined,
    result:{
      status:undefined,
      string:undefined,
      x:300,
      y:150,
      size: undefined,
      transparent: undefined,
    },
    headLine:{
      string: "GAME OVER",
      x: 300,
      y: 100,
      size: undefined
    }
  },
  gameOverGene: function(str){
    this.gameOver.status = true;
    this.gameOver.result.status = false;
    this.gameOver.result.size = 0;
    this.gameOver.result.string = str;
    this.gameOver.headLine.size = 0;
    this.gameOver.count = 0;
    if(this.gameMode=="singleMode"){
      postInfo("bubble/saveScore.php",name,this.single.player.score);
    }
  },
  gameOverUpdate: function(){
    if(this.gameOver.count<this.gameOver.COUNT_MAX){
      this.gameOver.count++;
      this.gameOver.headLine.size=20+this.gameOver.count*0.3;
    }
    if(this.gameOver.count>29 && this.gameOver.count<81){
      if(this.gameOver.count<61){
        this.gameOver.result.transparent=1-(60-this.gameOver.count)/30;
      }
      this.gameOver.result.status=true;
      this.gameOver.result.size=30+this.gameOver.count*0.1;
    }
    if(this.gameOver.count ==70){
      this.click=false;
      this.menuGene(this.gameMode);
    }

  },
  gameOverDraw: function(){
    ctx.save();
		ctx.fillStyle="rgba(0,0,0,0.5)";
		ctx.fillRect(0,0,WIDTH,HEIGHT);
		ctx.textAlign="center";
		ctx.font=this.gameOver.headLine.size+"px Arial";
    ctx.strokeStyle="rgb(0,0,0)";
    ctx.lineWidth=5;
		ctx.strokeText(this.gameOver.headLine.string, this.gameOver.headLine.x, this.gameOver.headLine.y);
		ctx.fillStyle="rgb(255,255,255)";
		ctx.fillText(this.gameOver.headLine.string, this.gameOver.headLine.x, this.gameOver.headLine.y);
    if(this.gameOver.result.status){
      ctx.font=this.gameOver.result.size+"px Arial";
      ctx.strokeStyle="rgba(0,0,0,"+this.gameOver.result.transparent+")";
      ctx.lineWidth=5;
  		ctx.strokeText(this.gameOver.result.string, this.gameOver.result.x, this.gameOver.result.y);
      ctx.fillStyle="rgba(255,255,255,"+this.gameOver.result.transparent+")";
      ctx.fillText(this.gameOver.result.string, this.gameOver.result.x, this.gameOver.result.y);
    }
    ctx.restore();
  },
  shake:{
    status: false,
    offset: 0,
    count: undefined,
    power: undefined,
    duration: undefined,
    COUNT_MAX: 100
  },
  shakeGene: function(power, speed, duration){
    this.shake.status = true;
    this.shake.offset = 0;
    this.shake.power = power;
    this.shake.speed = speed;
    this.shake.duration = duration;
    this.shake.count = 100;
  },
  shakeUpdate: function(){
    if(this.shake.count>0){
      this.shake.count--;
    } else {
      this.shake.count = this.shake.COUNT_MAX;
    }
    if(this.shake.count>100-this.shake.duration && this.shake.count%this.shake.speed === 0){
      this.shake.offset=(this.shake.offset==this.shake.power)?(-this.shake.power):(this.shake.power);
    } else {
      this.shake.offset=0;
    }
  },
  battle: {
    status:false,
    background: {
      num: undefined,
      maxNum: 1,
      0:{ x:76, y:15, sx:0, sy:0, width:224, height:186 }
    },
    gameFrameLeft: { x:64, y:3, sx:0, sy:84, width:236, height:394 },
    gameFrameRight: { x:300, y:3, sx:44, sy:84, width:236, height:394 },
    luncherLeft: { x:76, y:317, sx:252, sy:482, width:224, height:68 },
    luncherRight: { x:300, y:317, sx:252, sy:482, width:224, height:68 },
    whoseTurn: undefined,
    whoHasControl: undefined,
    leftButtonToggle: undefined,
    rightButtonToggle: undefined,
    player: {
      1:{
        score: undefined,
        arrow: { angle: 0, x:180, y:304, sx:216, sy:482, width:16, height:80 },
        borderLeft: 77,
        curBubble:{ isShow:true, num:undefined, x:188, y:347 },
        nextBubble:{ num:undefined, x:153, y:365+4 }
      },
      2:{
        score: undefined,
        arrow: { angle: 0, x:404, y:299+4, sx:216, sy:482, width:16, height:80 },
        borderLeft: 285,
        curBubble:{ isShow:true, num:undefined, x:412, y:347 },
        nextBubble:{ num:undefined, x:377, y:365+4 }
      },
      bubbleData:undefined,
    }
  },
  battleGene: function(){
    this.battle.status = true;
    this.gameMode = "battleMode";
    this.numOfColumn = 14;
    this.turnCount = 0;
    this.shake.status = false;
    this.gameOver.status = false;
    this.angleOriginal = 0;
    this.angleTouchOffset = 0;
    this.battle.whoseTurn = 1;
    this.battle.whoHasControl = 1;
    this.battle.leftButtonToggle = false;
    this.battle.rightButtonToggle = false;
    this.battle.background.num=Math.floor(Math.random()*this.battle.background.maxNum);
    this.battle.player[1].curBubble.num=this.bubbleGenerator();
    this.battle.player[1].nextBubble.num=this.bubbleGenerator();
    this.battle.player[1].score=0;
    this.battle.player[1].arrow.angle=0
    this.battle.player[2].curBubble.num=this.bubbleGenerator();
    this.battle.player[2].nextBubble.num=this.bubbleGenerator();
    this.battle.player[2].score=0;
    this.battle.player[2].arrow.angle=0;
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
      if(i<3){
        for(var j=0; j<14; j++){
          this.battle.bubbleData[i][j]={};
          if(j==13 && this.battle.bubbleData[i].isGap){
            this.battle.bubbleData[i][j].num=null;
          } else {
            this.battle.bubbleData[i][j].num=Math.floor(Math.random()*this.bubbles.numberOfColor)*3;
          }
          this.battle.bubbleData[i][j].isFalling=false;
          this.battle.bubbleData[i][j].x=x+j*32+xPosOffset;
          this.battle.bubbleData[i][j].y=y+i*28;
          this.battle.bubbleData[i][j].obstacleChecked=false;
        }
      } else{
        for(var j=0; j<14; j++){
          this.battle.bubbleData[i][j]={};
          this.battle.bubbleData[i][j].num=null;
          this.battle.bubbleData[i][j].isFalling=false;
          this.battle.bubbleData[i][j].x=x+j*32+xPosOffset;
          this.battle.bubbleData[i][j].y=y+i*28;
          this.battle.bubbleData[i][j].obstacleChecked=false;
        }
      }
      this.bubbleData = this.battle.bubbleData;
    }
    oneHit(KEY_SPACE);
  },
  battleDraw: function(){
    //black background & gamebBackground & stage frame
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    ctx.drawImage(this.backgroundSheet, this.battle.background[this.battle.background.num].sx, this.battle.background[this.battle.background.num].sy, this.battle.background[this.battle.background.num].width, this.battle.background[this.battle.background.num].height, this.battle.background[this.battle.background.num].x, this.battle.background[this.battle.background.num].y, this.battle.background[this.battle.background.num].width*2, this.battle.background[this.battle.background.num].height*2);
    ctx.drawImage(this.spriteSheet, this.battle.gameFrameLeft.sx, this.battle.gameFrameLeft.sy, this.battle.gameFrameLeft.width, this.battle.gameFrameLeft.height, this.battle.gameFrameLeft.x, this.battle.gameFrameLeft.y, this.battle.gameFrameLeft.width, this.battle.gameFrameLeft.height);
    ctx.drawImage(this.spriteSheet, this.battle.gameFrameRight.sx, this.battle.gameFrameRight.sy, this.battle.gameFrameRight.width, this.battle.gameFrameRight.height, this.battle.gameFrameRight.x, this.battle.gameFrameRight.y, this.battle.gameFrameRight.width, this.battle.gameFrameRight.height);
    ctx.drawImage(this.spriteSheet, this.battle.luncherLeft.sx, this.battle.luncherLeft.sy, this.battle.luncherLeft.width, this.battle.luncherLeft.height, this.battle.luncherLeft.x, this.battle.luncherLeft.y, this.battle.luncherLeft.width, this.battle.luncherLeft.height);
    ctx.drawImage(this.spriteSheet, this.battle.luncherRight.sx, this.battle.luncherRight.sy, this.battle.luncherRight.width, this.battle.luncherRight.height, this.battle.luncherRight.x, this.battle.luncherRight.y, this.battle.luncherRight.width, this.battle.luncherRight.height);
    //gameBubbles
    var shakeOffset=0;
    if(this.shake.status && this.gameOver.status !== true){
      shakeOffset=this.shake.offset;
    }
    for(var i=0;i<this.battle.bubbleData.length;i++){
      var offset = this.gapOffset(i);
      for(var j=0; j<14+offset; j++){
        if(this.battle.bubbleData[i][j].num!==null){
          ctx.drawImage(this.spriteSheet, this.bubbles[this.battle.bubbleData[i][j].num].sx, this.bubbles[this.battle.bubbleData[i][j].num].sy, this.bubbles.width, this.bubbles.height, this.battle.bubbleData[i][j].x-16+shakeOffset, this.battle.bubbleData[i][j].y-16, this.bubbles.width, this.bubbles.height);
        }
      }
    }
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

    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect((this.battle.whoseTurn == 1)?(316):(76), 15, 208, 370)
  },
  battleUpdate: function(){
    this.bubbleFallingDraw();
    this.bubbleFallingUpdate();
    this.obstacleBubbleDraw();
    this.obstacleBubbleUpdate();
    if(bubble.gameOver.status !== true){
      this.control(this.battle.player[this.battle.whoHasControl]);
    }
  },
  control: function(player){
    if(touch.status){
      this.angleTouchOffset=(touch.endX - touch.startX)/5;
      player.arrow.angle = this.angleTouchOffset+this.angleOriginal;
    } else {
      this.angleOriginal = player.arrow.angle;
    }
    if(keystate[KEY_LEFT]){
      player.arrow.angle-=1;
    }
    if(keystate[KEY_RIGHT]){
      player.arrow.angle+=1;
    }
    if(this.bubbleMove.status===false &&(oneHit(KEY_SPACE) || this.click)){
      this.click=false;
      player.curBubble.isShow=false;
      this.bubbleMoveGene(player);
      if(this.gameMode=="battleMode"){
        (this.battle.whoHasControl==1)?this.battle.whoHasControl=2:this.battle.whoHasControl=1;
      }
    }
    if(player.arrow.angle > 75){
      player.arrow.angle = 75;
      this.angleOriginal = 75-this.angleTouchOffset;
    }
    if(player.arrow.angle < -75){
      player.arrow.angle = -75;
      this.angleOriginal = -75-this.angleTouchOffset;
    }
  },
  single: {
    status:false,
    background: {
      num: undefined,
      maxNum: 1,
      0:{ x:76, y:15, sx:35, sy:0, width:128, height:186 }
    },
    gameFrame: { x:64, y:3, sx:0, sy:84, width:280, height:394 },
    luncher: { x:76, y:317, sx:236, sy:482, width:256, height:68 },
    player: {
      score: undefined,
      arrow: { angle: 0, x:196, y:304, sx:216, sy:482, width:16, height:80 },
      borderLeft: 77,
      curBubble:{ isShow:true, num:undefined, x:204, y:347 },
      nextBubble:{ num:undefined, x:169, y:365+4 }
    },
    bubbleData: undefined,
  },
  timer:{
    string:"TIME :",
    stringX: 360,
    stringY: 40,
    timeMax: 60,
    timeLeft: undefined,
    timeLeftX: 360+110,
    timeLeftY: 40,
    strtingTime: undefined,
    currentTime: undefined
  },
  timerGene: function(){
    var time = new Date();
    this.timer.startingTime = time.getTime();
  },
  timerUpdate: function(){
    var time = new Date();
    this.timer.timeLeft = this.timer.timeMax-Math.round((time.getTime()-this.timer.startingTime)/1000);
  },
  timerDraw: function(){
    ctx.save()
		ctx.font="25px Arial";
    ctx.strokeStyle="rgb(0,0,0)";
    ctx.lineWidth=5;
		ctx.fillStyle="rgb(255,255,255)";
		ctx.textAlign="left";
    ctx.strokeText(this.timer.string, this.timer.stringX, this.timer.stringY);
		ctx.fillText(this.timer.string, this.timer.stringX, this.timer.stringY);
		ctx.textAlign="right";
    ctx.strokeText(this.timer.timeLeft, this.timer.timeLeftX, this.timer.timeLeftY);
		ctx.fillText(this.timer.timeLeft, this.timer.timeLeftX, this.timer.timeLeftY);
    ctx.restore();
  },
  singleGene: function(){
    this.single.status = true;
    this.countdown.status = false;
    this.gameMode = "singleMode";
    this.numOfColumn = 8;
    this.turnCount = 0;
    this.shake.status = false;
    this.gameOver.status = false;
    this.single.score = 0;
    this.single.leftButtonToggle = false;
    this.single.rightButtonToggle = false;
    this.single.background.num=Math.floor(Math.random()*this.single.background.maxNum);
    this.single.player.curBubble.num=this.bubbleGenerator();
    this.single.player.nextBubble.num=this.bubbleGenerator();
    this.single.player.arrow.angle=0;
    this.single.player.score=0;
    this.single.bubbleData=new Array(12);
    for(var i=0;i<this.single.bubbleData.length;i++){
      this.single.bubbleData[i]={};
      var gapOffset=0;
      var xPosOffset=0;
      if(i%2 === 0){
        this.single.bubbleData[i].isGap=false;
      } else {
        this.single.bubbleData[i].isGap=true;
        xPosOffset=16;
      }
      var x=76+16;
      var y=15+16;
      if(i<3){
        for(var j=0; j<this.numOfColumn; j++){
          this.single.bubbleData[i][j]={};
          if(j==13 && this.single.bubbleData[i].isGap){
            this.single.bubbleData[i][j].num=null;
          } else {
            this.single.bubbleData[i][j].num=Math.floor(Math.random()*this.bubbles.numberOfColor)*3;
          }
          this.single.bubbleData[i][j].isFalling=false;
          this.single.bubbleData[i][j].x=x+j*32+xPosOffset;
          this.single.bubbleData[i][j].y=y+i*28;
          this.single.bubbleData[i][j].obstacleChecked=false;
        }
      } else{
        for(var j=0; j<this.numOfColumn; j++){
          this.single.bubbleData[i][j]={};
          this.single.bubbleData[i][j].num=null;
          this.single.bubbleData[i][j].isFalling=false;
          this.single.bubbleData[i][j].x=x+j*32+xPosOffset;
          this.single.bubbleData[i][j].y=y+i*28;
          this.single.bubbleData[i][j].obstacleChecked=false;
        }
      }
      this.bubbleData = this.single.bubbleData;
    }
    oneHit(KEY_SPACE);
    this.timerGene();
  },
  singleDraw: function(){
    ctx.save();
    //black background & gamebBackground & stage frame
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    ctx.drawImage(this.backgroundSheet, this.single.background[this.single.background.num].sx, this.single.background[this.single.background.num].sy, this.single.background[this.single.background.num].width, this.single.background[this.single.background.num].height, this.single.background[this.single.background.num].x, this.single.background[this.single.background.num].y, this.single.background[this.single.background.num].width*2, this.single.background[this.single.background.num].height*2);
    ctx.drawImage(this.spriteSheet, this.single.gameFrame.sx, this.single.gameFrame.sy, this.single.gameFrame.width, this.single.gameFrame.height, this.single.gameFrame.x, this.single.gameFrame.y, this.single.gameFrame.width, this.single.gameFrame.height);
    ctx.drawImage(this.spriteSheet, this.single.luncher.sx, this.single.luncher.sy, this.single.luncher.width, this.single.luncher.height, this.single.luncher.x, this.single.luncher.y, this.single.luncher.width, this.single.luncher.height);
    //gameBubbles
    var shakeOffset=0;
    if(this.shake.status && this.gameOver.status !== true){
      shakeOffset=this.shake.offset;
    }
    for(var i=0;i<this.single.bubbleData.length;i++){
      var offset = this.gapOffset(i);
      for(var j=0; j<this.numOfColumn+offset; j++){
        if(this.single.bubbleData[i][j].num!==null){
          ctx.drawImage(this.spriteSheet, this.bubbles[this.single.bubbleData[i][j].num].sx, this.bubbles[this.single.bubbleData[i][j].num].sy, this.bubbles.width, this.bubbles.height, this.single.bubbleData[i][j].x-16+shakeOffset, this.single.bubbleData[i][j].y-16, this.bubbles.width, this.bubbles.height);
        }
      }
    }
    //player arrow & bubbles
    ctx.save();
    ctx.translate(this.single.player.arrow.x+8,this.single.player.arrow.y+44);
    ctx.rotate(this.single.player.arrow.angle*Math.PI/180);
    ctx.drawImage(this.spriteSheet, this.single.player.arrow.sx, this.single.player.arrow.sy, this.single.player.arrow.width, this.single.player.arrow.height, -8, -44, this.single.player.arrow.width, this.single.player.arrow.height);
    ctx.restore();
    if(this.single.player.curBubble.isShow) ctx.drawImage(this.spriteSheet, this.bubbles[this.single.player.curBubble.num].sx, this.bubbles[this.single.player.curBubble.num].sy, this.bubbles.width, this.bubbles.height, this.single.player.curBubble.x-16, this.single.player.curBubble.y-16, this.bubbles.width, this.bubbles.height);
    ctx.drawImage(this.spriteSheet, this.bubbles[this.single.player.nextBubble.num].sx, this.bubbles[this.single.player.nextBubble.num].sy, this.bubbles.width, this.bubbles.height, this.single.player.nextBubble.x-16, this.single.player.nextBubble.y-16, this.bubbles.width, this.bubbles.height);
    //score
		ctx.font="25px Arial";
    ctx.strokeStyle="rgb(0,0,0)";
    ctx.lineWidth=5;
		ctx.fillStyle="rgb(255,255,255)";
		ctx.textAlign="left";
    ctx.strokeText("YOUR SCORE", 360, 80);
		ctx.fillText("YOUR SCORE", 360, 80);
		ctx.textAlign="right";
    ctx.strokeText(this.single.player.score, 570, 120);
		ctx.fillText(this.single.player.score, 570, 120);
    ctx.restore();
  },
  singleUpdate: function(){
    this.bubbleFallingDraw();
    this.bubbleFallingUpdate();
    this.obstacleBubbleDraw();
    this.obstacleBubbleUpdate();
    this.timerDraw();
    if(this.timer.timeLeft<6&&this.timer.timeLeft != this.countdown.string){
      this.countdownGene(this.timer.timeLeft);
    }
    if(this.gameOver.status !== true){
      this.timerUpdate();
    }
    if(this.countdown.status){
      this.countdownDraw();
      this.countdownUpdate();
    }
    if(this.timer.timeLeft==0 && this.gameOver.status !== true){
      this.gameOverGene(this.single.player.score);
    }
    if(bubble.gameOver.status !== true){
      this.control(this.single.player);
    }
  },
	countdown: {
		string: "",
		status: false,
		gap: 40,
		x: 200,
		y: 220,
		stringNum: 0,
		count: undefined,
	},
	countdownGene: function(num){
		this.countdown.status = true;
		this.countdown.count = 30;
		this.countdown.string = num;
	},
	countdownUpdate: function(){
		if(this.countdown.count>0) this.countdown.count--;
	},
	countdownDraw: function(){
		var scaleOffset = (1-(this.countdown.count)/this.countdown.gap)*30+100;
		var alphaOffset = (1-(this.countdown.count)/this.countdown.gap)*0.5;
		ctx.save();
		ctx.textAlign="center";
		ctx.font = scaleOffset+"px Arial";
		ctx.fillStyle = "rgba(0,0,0,"+alphaOffset+")";
		ctx.fillText(this.countdown.string, this.countdown.x, this.countdown.y);
		ctx.restore();
	},
	rank:{
		status:false,
		scoreDiv: undefined,
		scoreIframe: undefined,
		menu: {x:380, y:320, width:80, height:25, string:"RETURN"}
	},
	rankGene: function(){
		this.gameOver.status=false;
  	this.menu.status=false;
		this.rank.status=true;
		this.rank.scoreDiv=document.createElement("div");
		this.rank.scoreDiv.style.position="absolute";
		this.rank.scoreDiv.style.top=canvas.offsetTop+canvas.offsetHeight*0.1+"px";
		this.rank.scoreDiv.style.left=canvas.offsetLeft+canvas.offsetWidth*0.1+"px";
		this.rank.scoreDiv.style.width=canvas.offsetWidth*0.5+"px";
		this.rank.scoreDiv.style.height=canvas.offsetHeight*0.8+"px";
  		document.body.appendChild(this.rank.scoreDiv);
  		this.rank.scoreDiv.innerHTML="<br>Loading.. It may take 3~5 seconds.";

		this.rank.scoreIframe=document.createElement("iframe");
		this.rank.scoreIframe.src="bubble/listScore.php"
		this.rank.scoreIframe.style.position="absolute";
		this.rank.scoreIframe.style.top=canvas.offsetTop+canvas.offsetHeight*0.1+"px";
		this.rank.scoreIframe.style.left=canvas.offsetLeft+canvas.offsetWidth*0.1+"px";
		this.rank.scoreIframe.style.width=canvas.offsetWidth*0.5+"px";
		this.rank.scoreIframe.style.height=canvas.offsetHeight*0.8+"px";

  		document.body.appendChild(this.rank.scoreIframe);
	},
	rankUpdate: function(){
		if(this.isRectClick(this.rank.menu.x,this.rank.menu.y-this.rank.menu.height,this.rank.menu.width,this.rank.menu.height)){
			this.rank.status=false;
			this.rank.scoreDiv.remove();
			this.rank.scoreIframe.remove();
      this.menuGene("main");
		}
	},
	rankDraw: function(){
		ctx.save();
		ctx.fillStyle = "rgba(0,0,0,0.7)";
		ctx.fillRect(0,0,WIDTH,HEIGHT);
		ctx.font = this.rank.menu.height+"px Arial";
		ctx.strokeStyle="rgb(0,0,0)"
		ctx.lineWidth=5;
		ctx.fillStyle="rgb(255,255,255)";
		ctx.strokeText(this.rank.menu.string, this.rank.menu.x, this.rank.menu.y);
		ctx.fillText(this.rank.menu.string, this.rank.menu.x, this.rank.menu.y);
		ctx.restore();
	},
};
var bubbleGame =  new Thing("src/things.png", 600, 250, 98, 98, null, 70);
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
      bubble.menuUpdate();
    }
		if(bubble.battle.status){
			bubble.battleDraw();
			bubble.battleUpdate();
		}
		if(bubble.single.status){
			bubble.singleDraw();
			bubble.singleUpdate();
		}
		if(bubble.shake.status){
			bubble.shakeUpdate();
		}
		if(bubble.gameOver.status){
			bubble.gameOverDraw();
			bubble.gameOverUpdate();
		}
		if(bubble.menu.status){
			bubble.menuDraw();
      bubble.menuUpdate();
		}
		if(bubble.bubbleMove.status){
			bubble.bubbleMoveDraw();
			bubble.bubbleMoveUpdate();
		}
		if(bubble.rank.status){
			bubble.rankDraw();
			bubble.rankUpdate();
		}
	}
	thingObj.update.call(this);
};
bubbleGame.action = function(){
  bubble.powerOn();
};
