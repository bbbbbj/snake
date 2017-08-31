var dir = 3;
	var dirLin = 1;
	var oWidth = 600;
	var oHeight = 600;
	var radius = oWidth/60-1;
	var speed = 1;
	var speedId = document.getElementById('speed');
	var markId = document.getElementById('mark');
	var highId = document.getElementById('high');
	var mark = 0;
	var oFood = true;
	var m = 0;
	var n = 0;
	var k = 1;
	var ji = null;
	var oStart = true;
	var oStop = false;
	var addSpeed = true;
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var high = 0;

	var balls = new Array(30);
		for(var i = 0;i<30;i++){
			balls[i] = new Array(30);
			for(var j = 0;j<30;j++){
				balls[i][j] = 0;
			}
		}
	var snakes = [
					[0,0],
					[0,1],
					[0,2]
	];
	window.onload = function(){
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');

		canvas.width = oWidth;
		canvas.height = oHeight;
		
		update(context);
	}
	//键盘按下事件
	function doKeyDown(event){
		switch(event.keyCode){
			case 37://左键
			case 65:
				dirLin = 1;
				if(dirLin === dir){
					speed = speed + 1;
				}
				break;
			case 38://上键
			case 87:
				dirLin = 2;
				if(dirLin === dir){
					speed = speed + 1;
				}
				break;
			case 39://右键
			case 68:
				dirLin = 3;
				if(dirLin === dir){
					speed = speed + 1;
				}
				break;
			case 40://下键
			case 83:
				dirLin = 4;
				if(dirLin === dir){
					speed = speed + 1;
				}
				break;
			case 32:
			console.log('空格');
				console.log(snakes[0]);
				if(oStart){
					moveStart();
					food();
				}else if(oStop){
					oStop = false;
					moveStart();
				}else{
					oStop = true;
					gameOver();
				}
				break;
			case 13:
				reset();
		}
	}
	window.addEventListener('keydown', doKeyDown,true);

	// //清除小球
	// function ballsClear(){
	// 	for(var i=0;i<balls.length;i++){
	// 		for(var j=0;j<balls[i].length;j++){
	// 			balls[i][j] = 0;
	// 		}
	// 	}
	// }
	//更新小球
	function reset(){
		clearTimeout(ji);
		for(var i=0;i<balls.length;i++){
			for(var j=0;j<balls.length;j++){
				balls[i][j] = 0;
			}
		}
		snakes = [
			[0,0],
			[0,1],
			[0,2]
		]
		speed = 1;
		mark = 0;
		update(context);
		markId.innerHTML = '成绩：'+mark;
	}
	function update(cxt){
		speedId.innerHTML = 'speed: ' + parseInt(speed);
		cxt.clearRect(0,0,600,600);
		balls[snakes[0][0]][snakes[0][1]] = 1;
		for(var a=1;a<snakes.length-1;a++){
			balls[snakes[a][0]][snakes[a][1]] = 2;
		}
		balls[snakes[snakes.length-1][0]][snakes[snakes.length-1][1]] = 3;
		for(var i=0;i<balls.length;i++){
			for(var j=0;j<balls.length;j++){
				cxt.beginPath();
				cxt.arc((radius+1)*j*2+radius+1,(radius+1)*i*2+radius+1,radius,0,2*Math.PI);
				cxt.closePath();

				if(balls[i][j] === 1){
					cxt.fillStyle = '#ccc';
					cxt.fill();
				}
				if(balls[i][j] === 2){
					cxt.fillStyle = 'green';
					cxt.fill();
				}
				if(balls[i][j] === 3){
					cxt.fillStyle = 'red';
					cxt.fill();
				}
				if(balls[i][j] == 4){
					cxt.fillStyle = 'blue';
					cxt.fill();
				}
			}
		}
	}
	//小球移动位置更换
	function moveStart(){
		oStart = false;
		if(dirLin === 1 && dir !=3){
			dir = dirLin;
		}
		if(dirLin === 2 && dir !=4){
			dir = dirLin;
		}
		if(dirLin === 3 && dir !=1){
			dir = dirLin;
		}
		if(dirLin === 4 && dir !=2){
			dir = dirLin;
		}
		if(k % 10 === 0 && addSpeed == true){
			speed++;
			addSpeed = false;
		}

		if(dir === 1){
			if(eatSelf()){//没吃自己
				if(snakes[snakes.length-1][1]-1>=0){//没撞墙
					balls[snakes[snakes.length-1][0]][snakes[snakes.length-1][1]] = 0;
					if(snakes[snakes.length-1][0] === m && snakes[snakes.length-1][1]-1 === n){
						eatFood();
					}else{
						balls[snakes[0][0]][snakes[0][1]] = 0;
						for(var i=0;i<snakes.length-1;i++){
							snakes[i][0] = snakes[i+1][0];
							snakes[i][1] = snakes[i+1][1];
						}
						snakes[snakes.length-1][1]--;
					}
					ji = setTimeout('moveStart()',500 / speed);
					update(context);

				}else{
					gameOverA();
				}
			}else{
				gameOverB();
			}
		}
		if(dir === 2){
			if(eatSelf()){//没吃自己
				if(snakes[snakes.length-1][0]-1>=0){//没撞墙
					balls[snakes[snakes.length-1][0]][snakes[snakes.length-1][1]] = 0;
					if(snakes[snakes.length-1][0]-1 === m && snakes[snakes.length-1][1] === n){
						eatFood();
					}else{
						balls[snakes[0][0]][snakes[0][1]] = 0;
						for(var i=0;i<snakes.length-1;i++){
							snakes[i][0] = snakes[i+1][0];
							snakes[i][1] = snakes[i+1][1];
						}
						snakes[snakes.length-1][0]--;
					}
					ji = setTimeout('moveStart()',500 / speed);
					update(context);

				}else{
					gameOverA();
				}
			}else{
				gameOverB();
			}
		}
		if(dir === 3){
			console.log('3');
			if(eatSelf()){//没吃自己
				console.log('4');
				if(snakes[snakes.length-1][1]+1<=balls.length-1){//没撞墙
					balls[snakes[snakes.length-1][0]][snakes[snakes.length-1][1]] = 0;
					if(snakes[snakes.length-1][0] === m && snakes[snakes.length-1][1]+1 === n){
						eatFood();
					}else{
						balls[snakes[0][0]][snakes[0][1]] = 0;
						for(var i=0;i<snakes.length-1;i++){
							snakes[i][0] = snakes[i+1][0];
							snakes[i][1] = snakes[i+1][1];
						}
						snakes[snakes.length-1][1]++;
					}
					ji = setTimeout('moveStart()',500 / speed);
					update(context);

				}else{
					gameOverA();
				}
			}else{
				gameOverB();
			}
		}
		if(dir === 4){
			if(eatSelf()){//没吃自己
				if(snakes[snakes.length-1][0]+1<=balls.length-1){//没撞墙
					balls[snakes[snakes.length-1][0]][snakes[snakes.length-1][1]] = 0;
					if(snakes[snakes.length-1][0]+1 === m && snakes[snakes.length-1][1] === n){
						eatFood();
					}else{
						balls[snakes[0][0]][snakes[0][1]] = 0;
						for(var i=0;i<snakes.length-1;i++){
							snakes[i][0] = snakes[i+1][0];
							snakes[i][1] = snakes[i+1][1];
						}
						snakes[snakes.length-1][0]++;
					}
					ji = setTimeout('moveStart()',500 / speed);
					update(context);

				}else{
					gameOverA();
				}
			}else{
				gameOverB();
			}
		}
	}
	function eatSelf(){
		var self = true;
		for(var i=0;i<snakes.length-1;i++){
			if(snakes[i][0] === 0 && snakes[i][1] ===2){
				self = true;
				console.log(self);
				break;
			}
		}
		return self;
		// 	}else if(snakes[snakes.length-1][0]<0 || snakes[snakes.length-1][0]>balls.length-1 ||
		// 			snakes[snakes.length-1][1]<0 || snakes[snakes.length-1][1]>balls[0].length-1){
		// 		clearInterval(ji);
		// 		alert('撞墙啦'+mark);
		// 	}else if(snakes[snakes.length-1][0] === m && snakes[snakes.length-1][1] === n){
		// 		snakes[i][0] = m;
		// 		snakes[i][1] = n;
		// 		food();
		// 	}
		// }

	}
	function gameOver(){
		if(ji != null){
			clearTimeout(ji);
		}
		if(mark > high){
			high = mark;
		}
		highId.innerHTML = '最高分：'+high;
	}
	function gameOverA(){
		gameOver();
		alert('撞墙啦! 最终得分：'+mark);
	}
	function gameOverB(){
		gameOver();
		alert('吃自己啦! 最终得分：'+mark);
	}
	function food(){
		oFood = false;
		m = Math.floor(Math.random() * balls.length);
		n = Math.floor(Math.random() * balls[0].length);
		if(balls[m][n] === 0){
			balls[m][n] = 4;
			update(context);

		}else{
			food();
		}
	}
	function eatFood(){
		snakes.push([m,n]);
		mark++;
		k++;
		if(!addSpeed){
			addSpeed = true;
		}
		markId.innerHTML = '成绩'+mark;
		food();
		update(context);
	}