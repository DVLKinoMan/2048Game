var matrix=new Array();
var oldmatrix=new Array();
for(var i=0;i<4;i++)
	matrix[i]=new Array(0,0,0,0);
for(var i=0;i<4;i++)
	oldmatrix[i]=new Array(0,0,0,0);
var score=0;
var bestScore=0;
var undoScore;
var left;
var right;
var down;
var up;
var resumeGame=false;//if play is resuming
var won=false;
var lose=false;
var pause=false;
var arrayOfReachScores=new Array(2,4,8,16,32,64,128,256,512,1024,2048);
var startGameTime=new Date().getTime();
var GameTime = -1;

function leftMove(m,scoreCounter)
        {
            for (var i = 0; i < 4; i++)
            {
                var k = 0;
                for (var j = 0; j < 4; j++)
                {
                    if (m[i][j] != 0)
                    {
                        if (j!=k)
                        {
                            m[i][k] = m[i][j];
                            m[i][j] = 0;
                            k++;
                        }
                        else k++;
                    }
                }
                for (var j = 1; j < 4; j++)
                {
					var j2=j;
                    if (m[i][j] == m[i][j - 1] && m[i][j]!=0)
                    {
						if(scoreCounter==true)
						score += (m[i][j]*2);
                        m[i][j - 1] += m[i][j];
                        while (j <= 3)
                        {
                            if (j != 3)
                                m[i][j] = m[i][j + 1];
                            else m[i][j] = 0;
                            j++;
                        }
                    }
					j=j2;
                }
            }
}

function rightMove(m,scoreCounter)
        {
            for (var i = 0; i < 4; i++)
            {
                var k=3;
                for (var j = 3; j >= 0; j--)
                {
                    if (m[i][j] != 0)
                    {
                        if (j != k)
                        {
                            m[i][k] = m[i][j];
                            m[i][j] = 0;
                            k--;
                        }
                        else k--;
                    }
                }
                for (var j = 2; j >= 0; j--)
                {
					var j2=j;
                    if (m[i][j] == m[i][j + 1] && m[i][j]!=0)
                    {
						if(scoreCounter==true)
						score += (m[i][j]*2);
                        m[i][j + 1] += m[i][j];
                        m[i][j] = 0;
                        while (j >= 0)
                        {
                            if (j > 0)
                                m[i][j] = m[i][j - 1];
                            else m[i][j] = 0;
                            j--;
                        }
                    }
					j=j2;
                }
            }
}

function upMove(m,scoreCounter)
        {
            for (var j = 0; j < 4; j++)
            {
                var k = 0;
                for (var i = 0; i < 4; i++)
                {
                    if (m[i][j] != 0)
                    {
                        if (i != k)
                        {
                            m[k][j] = m[i][j];
                            m[i][j] = 0;
                            k++;
                        }
                        else k++;
                    }
                }
                for (var i = 1; i < 4; i++)
                {
					var i2=i;
                    if (m[i][j] == m[i - 1][j] && m[i][j]!=0)
                    {
						if(scoreCounter==true)
						score += (m[i][j]*2);
                        m[i - 1][j] += m[i][j];
                        while (i <= 3)
                        {
                            if (i != 3)
                                m[i][j] = m[i + 1][j];
                            else m[i][j] = 0;
                            i++;
                        }
                    }
					i=i2;
                }
            }
}

function downMove(m,scoreCounter)
        {
          for (var j = 0; j < 4; j++)
            {
                var k = 3;
                for (var i = 3; i >= 0; i--)
                {
                    if (m[i][j] != 0)
                    {
                        if (i != k)
                        {
                            m[k][j] = m[i][j];
                            m[i][j] = 0;
                            k--;
                        }
                        else k--;
                    }
                }
                for (var i = 2; i >= 0; i--)
                {
					var i2=i;
                    if (m[i][j] == m[i + 1][j] && m[i][j]!=0)
                    {
						if(scoreCounter==true)
						score += (m[i][j]*2);
                        m[i + 1][j] += m[i][j];
                        while (i >= 0)
                        {
                            if (i != 0)
                                m[i][j] = m[i - 1][j];
                            else m[i][j] = 0;
                            i--;
                        }
						i=i2;
                    }
                }
		
			}
		}

var randomNumbers=new Array(2,4);
//returns random number 2 or 4
function randNumber(){
	var procent4=Math.floor(Math.random() * 10);
	var procent2=Math.floor(Math.random() * 10+5);
	if(procent2>procent4)
		return randomNumbers[0];
	else
		return randomNumbers[1];
}

//adds randNumber in random place
function addRandomizeNumber(){
	if(isEmpty(matrix)==true){
		var r1=randNumber();
		var r2=randNumber();
	    var x1 = Math.floor(Math.random() * 100)%16;
		var x2 = Math.floor(Math.random() * 100)%16;
		while(x2==x1)
			x2 = Math.floor(Math.random() * 100)%16;
		matrix[Math.floor(x1/4)][x1%4]=r1;
		matrix[Math.floor(x2/4)][x2%4]=r2;
		paintMatrix();
	}
	else{
		if(resumeGame!=true){
			var r=randNumber();
			var x = Math.floor(Math.random() * 100)%16;
			while(matrix[Math.floor(x/4)][x%4]!=0)
			x = Math.floor(Math.random() * 100)%16;
			matrix[Math.floor(x/4)][x%4]=r;	
		}
			paintMatrix();
	}
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
	var c=document.cookie;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function deleteCookie(cname){
	setCookie(cname,"deleted",360);
}

function checkCookie() {
    var best=getCookie("bestScore");
    if (best != "") {
        bestScore=best;
    }
	var m=getCookie("matrix");
	if(m!=""){
		var ma=m.split(',');
		var k=0;
		for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			matrix[i][j]=parseInt(ma[k]);
			k++;
		}
		score=parseInt(getCookie("score"));
		resumeGame=true;
	}
	var t=getCookie("Game Time");
	if(t!=""){
		if(GameTime==-1)
		   GameTime=parseInt(t);
		else 
			GameTime+=parseInt(t);
	}
}

function paintMatrix(){
	var k=1;
	for(var i=0;i<4;i++)
	for(var j=0;j<4;j++){
		var x=matrix[i][j];
		if(x!=0)
		document.images["box"+k].src="Photos//"+x.toString()+".jpg";
	    else 	
			document.images["box"+k].src="Photos//empty.jpg";
		k++;
	}
	document.getElementById("labelScore").innerHTML=score;
	if(score>bestScore){
		bestScore=score;
		setCookie("bestScore", bestScore,360);
	}
	setCookie("matrix",matrixToString(matrix),360);
	setCookie("score",score,360);
	if(GameTime==-1)
	   setCookie("Game Time",(new Date().getTime()-startGameTime).toString(),360);
    else setCookie("Game Time",(new Date().getTime()-startGameTime+GameTime).toString(),360);
	document.getElementById("labelBestScore").innerHTML=bestScore;
}

function myKeyDownEvent(e){
		var key=e.keyCode;
	if(!pause){
		availableMoves(matrix);
		if(key=='38' && up){
			resumeGame=false;
			copy(matrix,oldmatrix);
			undoScore=score;
			upMove(matrix,true);
			addRandomizeNumber();
			paintMatrix();
			reachScoresPainter();
			if(won==false && win()==true){
				setTimeout(gamePauseWon,500);
				pause=true;
				won=true;
				return;
			}
		}
		if(key=='37' && left){
			resumeGame=false;
			copy(matrix,oldmatrix);
			undoScore=score;
			leftMove(matrix,true);
			addRandomizeNumber();
			paintMatrix();
			reachScoresPainter();
			if(won==false && win()==true){
				setTimeout(gamePauseWon,500);
				pause=true;
				won=true;
				return;
			}
		}
		if(key=='39' && right){
			resumeGame=false;
			copy(matrix,oldmatrix);
			undoScore=score;
			rightMove(matrix,true);
			addRandomizeNumber();
			paintMatrix();
			reachScoresPainter();
			if(won==false && win()==true){
				setTimeout(gamePauseWon,500);
				pause=true;
				won=true;
				return;
			}
		}
		if(key=='40' && down){
			resumeGame=false;
			copy(matrix,oldmatrix);
			undoScore=score;
			downMove(matrix,true);
			addRandomizeNumber();
			paintMatrix();
	        reachScoresPainter();
			if(won==false && win()==true){
				setTimeout(gamePauseWon,500);
				pause=true;
				won=true;
				return;
			}
		}
	}
	if(key=='90')
		backMove();
	if(key=='82')
		newGame();
	if(!availableMove() && !lose){
		setTimeout(gamePauseLose,500);
		pause=true;
		lose=true;
	}
}
	
function reachScoresPainter(){
		if(arrayOfReachScores.length==11){
			var h=document.createElement("h1");
			document.getElementById("reachScoresDiv").appendChild(h);
			h.innerHTML="Reach Scores Time";
		}
		var max = maxInMatrix(matrix);
		if(arrayOfReachScores.indexOf(max)!=-1){
		    for (var i = 0; i <= arrayOfReachScores.indexOf(max) ; i++) {
		        var score = arrayOfReachScores[i];
		        var img = document.createElement("img");
		        img.src = "Photos//" + score.toString() + ".jpg";
		        document.getElementById("reachScoresDiv").appendChild(img);

		        var t = document.createElement("h2");
		        var t2;
		        document.getElementById("reachScoresDiv").appendChild(t);
		        var timeCookie = getCookie(score.toString() + " Gain in");
		        if (timeCookie == "" || timeCookie == "deleted") {
		            if (GameTime == -1)
		                t2 = new Date().getTime() - startGameTime;
		            else t2 = new Date().getTime() - startGameTime + GameTime;
		            t.innerHTML = timeInString(t2);
		            setCookie(score.toString() + " Gain in", t.innerHTML, 360);
		        }
		        else {
		            t.innerHTML = timeCookie;
		        }
		    }
		    arrayOfReachScores.splice(0, arrayOfReachScores.indexOf(max) + 1);
		}
}

//returns max element from matrix
function maxInMatrix(m) {
    var max = 0;
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (m[i][j] > max)
                max = m[i][j];
    return max;
}

function timeInString(t2) {
    var sec = Math.floor(t2 / 1000) % 60;
    var minute = Math.floor(t2 / 60000);
    var hour = Math.floor(t2 / 3600000);
    if (sec != 0 && minute != 0 && hour != 0) {
        return hour.toString() + " hours " + minute.toString() + " minutes " + sec.toString() + " seconds";
    }
    else {
        if (sec != 0 && minute != 0) {
            return minute.toString() + " minutes " + sec.toString() + " seconds";
        }
        else {
            if (minute != 0 && hour != 0) {
                return hour.toString() + " hours " + minute.toString() + " minutes";
            }
            else {
                if (sec != 0 && hour != 0) {
                    return hour.toString() + " hours " + sec.toString() + " seconds";
                }
                else {
                    if (sec != 0) {
                         return sec.toString() + " seconds";
                    }
                    else {
                        if (minute != 0) {
                            return sec.toString() + " seconds";
                        }
                        else {
                            return sec.toString() + " seconds";
                        }
                    }
                }
            }
        }
    }
}

//returns m matrix string
function matrixToString(m) {
    var str = "";
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            str += m[i][j] + ",";
    return str;
}

//returns true if matrix is empty
function isEmpty(m) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (m[i][j] != 0)
                return false;
    return true;
}

//copy from m1 to m2
function copy(m1, m2) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            m2[i][j] = m1[i][j];
}

//if m1=m2 returns true
function isEqual(m1, m2) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (m1[i][j] != m2[i][j])
                return false;
    return true;
}

function availableMoves(m) {
    var matrix2 = new Array();
    for (var i = 0; i < 4; i++)
        matrix2[i] = new Array(0, 0, 0, 0);
    copy(m, matrix2);
    leftMove(matrix2, false);
    if (isEqual(m, matrix2))
        left = false;
    else left = true;

    copy(m, matrix2);
    rightMove(matrix2, false);
    if (isEqual(m, matrix2))
        right = false;
    else right = true;

    copy(m, matrix2);
    downMove(matrix2, false);
    if (isEqual(m, matrix2))
        down = false;
    else down = true;

    copy(m, matrix2);
    upMove(matrix2, false);
    if (isEqual(m, matrix2))
        up = false;
    else up = true;
}

//returns true if you have any move
function availableMove() {
    for (var q = 0; q < 4; q++)
        for (var w = 0; w < 4; w++)
            if (matrix[q][w] == 0)
                return true;
    var i = 0, j = 0;
    while (true) {
        if (i - 1 >= 0)
            if (matrix[i - 1][j] == matrix[i][j]) return true;
        if (i + 1 <= 3)
            if (matrix[i][j] == matrix[i + 1][j]) return true;
        if (j + 1 <= 3)
            if (matrix[i][j] == matrix[i][j + 1]) return true;
        if (j - 1 >= 0)
            if (matrix[i][j] == matrix[i][j - 1]) return true;
        j++;
        if (j > 3) {
            j = 0;
            if (i != 3)
                i++;
            else return false;
        }
    }
}

//starts new game
function newGame(){
	gameResume();
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			matrix[i][j]=0;
			oldmatrix[i][j]=0;
		}
		deleteCookie("Game Time");
		var d=document.getElementById("reachScoresDiv")
		while (d.hasChildNodes())
			d.removeChild(d.firstChild);
		score=0;
		undoScore=0;
		won=false;
		lose=false;
		addRandomizeNumber();
		arrayOfReachScores=new Array(2,4,8,16,32,64,128,256,512,1024,2048);
		for(var i=0;i<11;i++){
			var str=arrayOfReachScores[i].toString()+" Gain in";
			deleteCookie(str);
		}
		startGameTime=new Date().getTime();
		GameTime=-1;
	    reachScoresPainter();
}

//undo move
function backMove() {
	if(!isEmpty(oldmatrix)){
		copy(oldmatrix,matrix);
	    score=undoScore;
		gameResume();
		lose=false;
	    paintMatrix();
	}
}

//function call when body is loading
function whenLoadBody(){
	checkCookie();
	addRandomizeNumber();
	reachScoresPainter();
	$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();   
	});
}

function whenUnLoadBody() {
    if (GameTime == -1)
        setCookie("Game Time", (new Date().getTime() - startGameTime).toString(), 360);
    else setCookie("Game Time", (new Date().getTime() - startGameTime + GameTime).toString(), 360);
}

function win(){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
			if(matrix[i][j]==2048)
				return true;
			return false;
}

function gamePauseLose(){
	var b="box";
	for(var i=1;i<=16;i++){
		document.getElementById(b+i).style.zIndex="-1";
	}
	document.getElementById("GameContent").style.opacity="0.4";
    document.getElementById("GameContent").style.filter='alpha(opacity=40)';
	document.getElementById("gameText").innerHTML="You Lose!!!";
	document.getElementById("continue").style.zIndex="1";
    document.getElementById("retry").style.zIndex="1";
}

function gamePauseWon(){
	var b="box";
	for(var i=1;i<=16;i++){
		document.getElementById(b+i).style.zIndex="-1";
	}
	document.getElementById("gameText").innerHTML="You Won!!!";
	document.getElementById("GameContent").style.opacity="0.4";
    document.getElementById("GameContent").style.filter='alpha(opacity=40)';
	document.getElementById("continue").style.zIndex="1";
    document.getElementById("retry").style.zIndex="1";
}

function gameResume(){
	pause=false;
	var b="box";
	for(var i=1;i<=16;i++){
		document.getElementById(b+i).style.zIndex="1";
	}
	document.getElementById("GameContent").style.opacity="1";
    document.getElementById("GameContent").style.filter='alpha(opacity=0)';
	document.getElementById("gameText").innerHTML="";
	document.getElementById("continue").style.zIndex="-1";
	document.getElementById("retry").style.zIndex="-1";
}