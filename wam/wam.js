var wam = {
	spriteSheet: undefined,
	status: false,
	click: false,
	startingTime: null,
	score: undefined,
	timeCount: undefined,
	timeMax: undefined,
	COUNT_MAX: 100,
	ANI_COUNT_MAX: 20,
	powerOn: function(){
		this.status = true;
		gameOn = true;
		this.main.status = false;
		this.menuGene("gameStart");
		this.reset();
	},
	reset: function(){
		this.timeMax = 60;
		this.timeCount = 60;
		this.startingTime = null;
		this.click = false;
		this.main.speed = 1;
		this.score = 0;
		for(var i = 0; i<4; i++){
			for(var j= 0; j<4; j++){
				this.hole[i][j].status = false;
			}
		}
		this.spark.status = false;
		this.hammer.status = false;
		this.item.status = false;
		this.countdown.status = false;
		this.gameOver.status = false;
		this.mole.geneCount = 0;
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
			sy:446,
			width:424,
			height:70
		},
		instruction: {
			status:undefined,
			x:120,
			y:110,
			sx:1032,
			sy:0,
			width:204,
			height:230
		}
	},
	menuGene: function(type) {
		this.menu.status = true;
		switch(type){
			case "gameStart":
			this.menu.background = true;
			this.menu[1] = {x:380, y:165, width:80, height:25, string:"PLAY"};
			this.menu[2] = {x:380, y:210, width:80, height:25, string:"RANKS"};
			this.menu[3] = {x:380, y:255, width:80, height:25, string:"EXIT"};
			this.menu.title.status=true;
			this.menu.instruction.status=true;
			break;
			case "gameOver":
			this.menu.background = false;
			this.menu[1] = {x:450, y:100, width:120, height:25, string:"PLAY AGAIN"};
			this.menu[2] = {x:462, y:145, width:80, height:25, string:"RANKS"};
			this.menu[3] = {x:477, y:190, width:80, height:25, string:"EXIT"};
			this.menu.title.status=false;
			this.menu.instruction.status=false;
			break;
		}
	},
	menuUpdate: function(){
		for(var i=1; i<=3; i++){
			if(this.isRectClick(this.menu[i].x,this.menu[i].y-this.menu[i].height,this.menu[i].width,this.menu[i].height)){
				switch(i){
					case 1:
					this.reset();
					this.menu.status = false;
					this.main.menu.status = true;
					this.readyGene();
					break;
					case 2:
					this.rankGene();
					break;
					case 3:
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
		if(this.menu.instruction.status){
			ctx.drawImage(this.spriteSheet, this.menu.instruction.sx, this.menu.instruction.sy, this.menu.instruction.width, this.menu.instruction.height, this.menu.instruction.x, this.menu.instruction.y, this.menu.instruction.width, this.menu.instruction.height);
		}
		ctx.fillStyle="rgb(255,255,255)";
		ctx.font = this.menu[1].height+"px Arial";
		ctx.strokeStyle="rgb(0,0,0)"
		ctx.lineWidth=5;
		for(var i = 1; i<= 3; i++){
			ctx.strokeText(this.menu[i].string, this.menu[i].x, this.menu[i].y);
			ctx.fillText(this.menu[i].string, this.menu[i].x, this.menu[i].y);
		}
		ctx.restore();
	},
	exit: function(){
		gameOn = false;
		this.status = false;
	},
	rank:{
		status:false,
		scoreDiv: undefined,
		scoreIframe: undefined,
		menu: {x:380, y:320, width:80, height:25, string:"RETURN"}
	},
	rankGene: function(){
		this.menu.status=false;
		this.gameOver.status=false;
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
		this.rank.scoreIframe.src="wam/listScore.php"
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
			this.menuGene("gameStart");
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
	ready: {
		status: false,
		gap: 40,
		x: 280,
		y: 220,
		string: "",
		stringNum: 0,
		count: undefined,
	},
	readyGene: function(){
		this.ready.status = true;
		this.ready.count = 160;
		this.ready.string = "";
	},
	readyUpdate: function(){
		if(this.ready.count>=0) this.ready.count--;
		if(this.ready.count>=this.ready.gap*3) this.ready.string = "3";
		else if(this.ready.count>=this.ready.gap*2) this.ready.string = "2";
		else if(this.ready.count>=this.ready.gap*1) this.ready.string = "1";
		else if(this.ready.count>=this.ready.gap*0) this.ready.string = "START!!";
		else {
			this.main.status = true;
			this.ready.status = false;
		}
		if(this.isRectClick(this.main.menu.x,this.main.menu.y-this.main.menu.height,this.main.menu.width,this.main.menu.height)){
			this.main.status=false;
			this.ready.status=false;
			this.menuGene("gameStart");
		}
		if(this.click){
			this.click = false;
			this.hammerGene();
		}
		this.hammerUpdate();
	},
	readyDraw: function(){
		var scaleOffset = (1-(this.ready.count%this.ready.gap)/this.ready.gap)*30+100;
		var alphaOffset = 1-(this.ready.count%this.ready.gap)/this.ready.gap;
		this.mainDraw();
		ctx.save();
		ctx.textAlign="center";
		ctx.font = scaleOffset+"px Arial";
		ctx.fillStyle = "rgba(255,255,255,"+alphaOffset+")";
		ctx.fillText(this.ready.string, this.ready.x, this.ready.y);
		ctx.restore();
	},
	main:{
		status: false,
		speed: undefined,
		menu: {status:undefined, x:500, y:320, width:80, height:25, string:"QUIT"}
	},
	mainUpdate: function(){
		this.timeUpdate();
		this.moleUpdate();
		for(var i=0; i<4;i++){
			for(var j=0; j<4; j++){
				if(this.hole[i][j].status) this.holeUpdate(this.hole[i],this.hole[i][j]);
			}
		}
		if(this.isRectClick(this.main.menu.x,this.main.menu.y-this.main.menu.height,this.main.menu.width,this.main.menu.height)){
			this.main.status=false;
			this.menuGene("gameStart");
		}
		if(this.hammer.status) this.hammerUpdate();
		if(this.spark.status) this.sparkUpdate();
		if(this.item.status) this.itemUpdate();
		if(this.countdown.status) this.countdownUpdate();
		if(this.timeCount<=5 && this.timeCount!=this.countdown.string) this.countdownGene();

		if(this.click){
			this.click = false;
			this.hammerGene();
		}
		if(this.timeCount == 0){
			this.main.status = false;
			this.main.menu.status = false;
			this.mainDraw();
			this.gameOver.status = true;
			postInfo("wam/saveScore.php",name,this.score);
			this.menuGene("gameOver");
		}
	},
	mainDraw: function(){
		ctx.save();
		ctx.fillStyle = "rgba(0,0,0,0.5)";
		ctx.fillRect(0,0,WIDTH,HEIGHT);
		if(this.main.menu.status){
			ctx.font = this.main.menu.height+"px Arial";
			ctx.strokeStyle="rgb(0,0,0)"
			ctx.lineWidth=5;
			ctx.fillStyle="rgb(255,255,255)";
			ctx.strokeText(this.main.menu.string, this.main.menu.x, this.main.menu.y);
			ctx.fillText(this.main.menu.string, this.main.menu.x, this.main.menu.y);
		}
		for(var i=0; i<4;i++){
			switch(i){
				case 0:
				ctx.drawImage(this.spriteSheet,  0,  0,488,127,  0,  0,487,127);
				break;
				case 1:
				ctx.drawImage(this.spriteSheet,  0,130,488, 56,  0,120,487, 56);
				break;
				case 2:
				ctx.drawImage(this.spriteSheet,  0,188,488, 61,  0,168,487, 61);
				break;
				case 3:
				ctx.drawImage(this.spriteSheet,  0,252,488, 69,  0,220,487, 69);
				break;
			}
			for(var j=0; j<4; j++){
				if(this.hole[i][j].status) this.moleDraw (i,this.hole[i][j]);
			}
		}
		ctx.drawImage(this.spriteSheet,  0,324,488,119,  0,280,487,119);
		this.timeDraw();
		this.scoreDraw();

		if(this.hammer.status) this.hammerDraw();
		if(this.spark.status) this.sparkDraw();
		if(this.item.status) this.itemDraw();
		if(this.countdown.status) this.countdownDraw();

		ctx.restore();
	},
	mole: {
		width:68,
		height:76,
		1:{ 0:{ sx:892, sy:0},
			1:{ sx:962, sy:0},
			score: 100
		},
		2:{ 0:{ sx:892, sy:80},
			1:{ sx:962, sy:80},
			score: 500
		},
		3:{ 0:{ sx:892, sy:160},
			1:{ sx:962, sy:160},
			score: 100
		},
		4:{ 0:{ sx:892, sy:240},
			1:{ sx:962, sy:240},
			score: -300
		},
		5:{ 0:{ sx:892, sy:320},
			1:{ sx:962, sy:320}
		},
		geneCount: 0
	},
	moleUpdate: function(){
		if(this.mole.geneCount > 0) this.mole.geneCount--;
		else {
			this.mole.geneCount = 50-20*(1-(this.timeCount/60));
			this.moleGene();
		}
	},
	moleGene: function(){
		var alias = {}
		var totalNum = -1;
		for(var i = 0; i<4; i++){
			for(var j= 0; j<4; j++){
				if(!this.hole[i][j].status){
					totalNum++;
					alias[totalNum]=this.hole[i][j];
				}
			}
		}
		if(totalNum>=0){
			var holeNum=Math.round(Math.random()*totalNum);
			var typeNum;
			var randNum=Math.random();
			if      (randNum<0.05) typeNum=2;
			else if (randNum<0.1) typeNum=3;
			else if (randNum<0.15) typeNum=4;
			else                  typeNum=1;
			alias[holeNum].status = true;
			alias[holeNum].type = typeNum;
			alias[holeNum].aniCount = this.ANI_COUNT_MAX;
			alias[holeNum].count = this.COUNT_MAX;
			alias[holeNum].yOffset = 70;
			alias[holeNum].hit = false;
		}
		var randNum=Math.random();
		if(randNum<0.3) this.moleGene();
	},
	moleDraw : function(lineNum, hole){
		ctx.drawImage(this.spriteSheet,this.mole[hole.type][hole.aniNum].sx,this.mole[hole.type][hole.aniNum].sy, this.mole.width, this.mole.height, hole.x, this.hole[lineNum].y+hole.yOffset, this.hole[lineNum].width, this.hole[lineNum].height);
	},
	hole: {
		0:{ y:80, width:57.2, height:63.9,
			0: { x:92, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
			1: { x:176, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
			2: { x:260, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
			3: { x:344, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
		},
		1:{ y:123, width:60.3, height:67.4,
			0: { x:81, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
			1: { x:170, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
			2: { x:260, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
			3: { x:348, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
		},
		2:{ y:176, width:63.4, height:70.8,
			0: { x:69, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
			1: { x:165, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
			2: { x:262, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
			3: { x:357, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
		},
		3:{ y:230, width:68, height:76,
			0: { x:58, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
			1: { x:160, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
			2: { x:262, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
			3: { x:364, yOffset: 0, type: 1, status: false, hit:false, count: 0, aniNum:0, aniCount:0 },
		}
	},
	holeUpdate: function(holeY, holeX){
		if(holeX.aniCount>0) holeX.aniCount--;
		else {
			holeX.aniCount = this.ANI_COUNT_MAX;
			holeX.aniNum = (holeX.aniNum==0)?1:0;
		}
		if(holeX.count>0){
			this.main.speed = 1+(60-this.timeCount)/60;
			holeX.count -= this.main.speed;
		} else {
			holeX.status=false;
		}
		if(holeX.count>20 && holeX.count<85){
			if(this.isRectClick(holeX.x,holeY.y,holeY.width,holeY.height*0.8)){
				holeX.hit = true;
				holeX.count = 25;
				mouse.x = holeX.x+holeY.width/2;
				mouse.y = holeY.y+10;
				this.hammerGene();
				this.sparkGene();
				this.itemGene(holeX.type);
				this.score+=this.mole[holeX.type].score;
			}
		}
		if(holeX.count>85){
			holeX.yOffset = holeY.height*(1-(100-holeX.count)/15);
		}else if(holeX.count>20){
			holeX.yOffset = 0;
		}else {
			if(holeX.hit) holeX.type = 5;
			holeX.yOffset = holeY.height*(1-holeX.count/20);
		}
	},
	item:{
		status: false,
		x:0,
		y:0,
		xOffset: 30,
		yOffset: 25,
		2: {sx: 892, sy: 398},
		3: {sx: 926, sy: 398},
		4: {sx: 960, sy: 398},
		width: 32,
		height: 40,
		imgNum: 2,
		count: 20
	},
	itemGene: function(type){
		this.item.status = true;
		this.item.count = this.ANI_COUNT_MAX
		this.item.imgNum = type;
		this.item.x = mouse.x-this.item.xOffset;
		this.item.y = mouse.y-this.item.yOffset;
		switch(type){
			case 2:
			break;
			case 3:
			this.timeMax += 3;
			break;
			case 4:
			for(var i=0; i<4;i++){
				for(var j=0; j<4; j++){
					if(this.hole[i][j].status) this.hole[i][j].status=false;
				}
			}
			break;
			default:
			this.item.status=false;
		}
	},
	itemUpdate: function(){
		if(this.item.count>0){
			this.item.count--;
			this.item.y--;
		}
		else this.item.status=false;
	},
	itemDraw: function(){
		ctx.save();

		if(this.item.count<10){
			ctx.globalAlpha = this.item.count/10;
		}
		ctx.drawImage(this.spriteSheet,this.item[this.item.imgNum].sx,this.item[this.item.imgNum].sy, this.item.width, this.item.height, this.item.x, this.item.y, this.item.width*2, this.item.height*2);
		ctx.restore();
	},
	hammer: {
		status: false,
		xOffset: 37,
		yOffset: 224,
		0: {sx: 490, sy: 0},
		1: {sx: 490, sy: 226},
		width: 200,
		height: 224,
		imgNum: 1,
		count: 20
	},
	hammerGene: function(){
		this.hammer.status = true;
		this.hammer.count = this.ANI_COUNT_MAX;
		this.hammer.imgNum = 1;
	},
	hammerUpdate: function(){
		if(this.hammer.count>0) this.hammer.count--;
		if(this.hammer.count>17) this.hammer.imgNum=1;
		else if(this.hammer.count>0) this.hammer.imgNum=0;
		else this.hammer.status=false;
	},
	hammerDraw: function(){
		ctx.drawImage(this.spriteSheet,this.hammer[this.hammer.imgNum].sx,this.hammer[this.hammer.imgNum].sy, this.hammer.width, this.hammer.height, mouse.x-this.hammer.xOffset, mouse.y-this.hammer.yOffset, this.hammer.width, this.hammer.height);
	},
	spark: {
		status: false,
		xOffset: 98,
		yOffset: 85,
		0: {sx: 693, sy: 0},
		1: {sx: 693, sy: 150},
		2: {sx: 693, sy: 300},
		width: 196,
		height: 148,
		imgNum: 0,
		count: 20
	},
	sparkGene: function(){
		this.spark.status = true;
		this.spark.count = this.ANI_COUNT_MAX;
		this.spark.imgNum = Math.round(Math.random()*2);
	},
	sparkUpdate: function(){
		if(this.spark.count>0) this.spark.count--;
		else this.spark.status=false;
	},
	sparkDraw:function(){
			ctx.drawImage(this.spriteSheet,this.spark[this.spark.imgNum].sx,this.spark[this.spark.imgNum].sy, this.spark.width, this.spark.height, mouse.x-this.spark.xOffset, mouse.y-this.spark.yOffset, this.spark.width, this.spark.height);
	},
	countdown: {
		string: "",
		status: false,
		gap: 40,
		x: 245,
		y: 220,
		stringNum: 0,
		count: undefined,
	},
	countdownGene: function(){
		this.countdown.status = true;
		this.countdown.count = 30;
		this.countdown.string = this.timeCount;
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
		ctx.fillStyle = "rgba(255,255,255,"+alphaOffset+")";
		ctx.fillText(this.countdown.string, this.countdown.x, this.countdown.y);
		ctx.restore();
	},
	gameOver:{
		status: false
	},
	gameOverUpdate: function(){
		if(this.countdown.count>0) this.countdownUpdate();
		else this.countdown.status = false;
	},
	gameOverDraw: function(){
		this.mainDraw();
		ctx.save()
		ctx.fillStyle="rgba(0,0,0,0.7)";
		ctx.fillRect(0,0,WIDTH,HEIGHT);
		ctx.fillStyle="rgb(200,200,200)";
		ctx.font="30px Arial";
		ctx.fillText("YOUR SCORE :", 100, 100);
		ctx.fillStyle="rgb(255,255,255)";
		ctx.font="50px Arial";
		ctx.textAlign="end";
		ctx.fillText(this.score, 400, 150);
		ctx.restore();
	},
	timeUpdate:function(){
		if(this.startingTime==null){
			var d = new Date();
			this.startingTime = d.getTime();
		} else {
			var d = new Date();
			this.timeCount = this.timeMax-Math.round((d.getTime()-this.startingTime)/1000);
		}
	},
	timeDraw: function(){
		ctx.fillStyle="rgb(100,100,100)";
		ctx.font = "35px Arial";
		ctx.textAlign="end";
		ctx.fillText(this.timeCount, 160, 65);
	},
	scoreDraw: function(){
		ctx.fillStyle="rgb(100,100,100)";
		ctx.font = "35px Arial";
		ctx.textAlign="end";
		ctx.fillText(this.score, 404, 65);
	}
}

var wamGame =  new Thing("src/things.png", 520, 250, 98, 98, null, 70); //xpos 520
wam.spriteSheet = new Image();
wam.spriteSheet.src = "wam/wam.png";
wamGame.standing = function(){
	this.drawData.frameTotNum = 2;
	this.drawData.frame[1] = {x: 0, y: 500};
	this.drawData.frame[2] = {x: 100, y: 500};
}
wamGame.update = function(){
	if(wam.status){
		if(mouse.status){
			mouse.status = false;
			wam.click = true;
		}
		if(wam.rank.status){
			wam.rankDraw();
			wam.rankUpdate();
		}
		if(wam.ready.status){
			wam.readyDraw();
			wam.readyUpdate();
		}
		if(wam.main.status){
			wam.mainDraw();
			wam.mainUpdate();
		}
		if(wam.gameOver.status){
			wam.gameOverDraw();
			wam.gameOverUpdate();
		}
		if(wam.menu.status){
			wam.menuDraw();
			wam.menuUpdate();
		}
	}
	thingObj.update.call(this);
}
wamGame.action = function(){
	wam.powerOn();
}
