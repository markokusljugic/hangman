var sam = ['a', 'o', 'e', 'i', 'u'];
document.getElementById('second').style.display= "none";
var answerLetter = [];
var trueAnswersArray =[];
var selectedWord;
var points = 0;
var seconds = 0;
var reLetter = /\S+$/;
var totalPoints = 0;
var totalTime = 0;
var timeStarted;
var timeEnded;


users = JSON.parse(localStorage.getItem("insertUsersLS")) || [];
words = JSON.parse(localStorage.getItem("insertWordsLS")) || [];
score = JSON.parse(localStorage.getItem("scoreLS")) || [];


usersInScore = score.map(function(a) {return a.name;});
selectedUser = document.getElementById('searchUser').value;

console.log(users);
console.log(words);
console.log(score);

	function showUserScore(){
		
		showUser = document.getElementById('searchUser').value;
		var table = "";

		if(usersInScore.indexOf(showUser) > -1){
			document.getElementById('first').style.display= "none";
			for(var i=0; i<score.length; i++){
				if(score[i].name == showUser){
				document.getElementById('userScore').innerHTML += "<h1>" +score[i].name+ "</h1>";
				gamesInScore = score[i].games.map(function(a) {return a.game;});
					for(var j=0; j<gamesInScore.length;j++){
						document.getElementById('userScore').innerHTML += "<h2>Game #"+(j+1)+" ["+score[i].games[j].time.totalPoints+ " p] ["+score[i].games[j].time.totalTime+ " sec]</h2>" ;
				
						table = "<table><tbody><tr><th>Number</th><th>Word</th><th>Points</th><th>Time</th></tr>";
							for(var z=0; z<score[i].games[j].game.length; z++){
								num = z+1;
								table += "<tr><td>"+num+"</td><td>"+score[i].games[j].game[z].word+"</td><td>"+score[i].games[j].game[z].points+"</td><td>"+score[i].games[j].game[z].time+"</td></tr>" ;
							}
						table+= "</tbody> </table>";
						document.getElementById('userScore').innerHTML += table;
						document.getElementById('userScore').innerHTML += "<p>Game Started:"+score[i].games[j].time.gameStarted+"</p>" ;
						document.getElementById('userScore').innerHTML += "<p>Game Finished:"+score[i].games[j].time.gameFinished+"</p>" ;
					}
				}	
			}
		}
		else{
			document.getElementById('searchUser').style.borderColor= "red";
			document.getElementById('searchUser').value = "Noo scoreee!";
		}
	}

	function timer() {
		seconds ++;
    	document.getElementById("timer").innerHTML = "Your time: " +seconds+ " seconds!";
	}

	function insert() {	
		insertWord  = document.getElementById("insertWord").value;
		console.log(insertWord);
		if(words.indexOf(insertWord) == -1  && insertWord){
			words.push(insertWord);
			localStorage.setItem("insertWordsLS", JSON.stringify(words));
			location.reload();
		}
		else{
			document.getElementById('insertWord').style.borderColor= "red";
			document.getElementById('insertWord').value = "Insert new word!";
		}
	}

	function insertU(){
		insertUser  = document.getElementById("insertUser").value;
		if(users.indexOf(insertUser) == -1 && insertUser){
			users.push(insertUser);
			localStorage.setItem("insertUsersLS", JSON.stringify(users));
			location.reload();
		}
		else{
			document.getElementById('insertUser').style.borderColor= "red";
			document.getElementById('insertUser').value = "Insert new user!";
		}
	}

	function searchWords(){
		var input = searchWord.value.toUpperCase();
		var i =0 ;
		document.getElementById('listWords').innerHTML = "";	
			while (i < words.length) {
				if(words[i].toUpperCase().indexOf(input) > -1){	
					document.getElementById('listWords').innerHTML += "<option value='"+words[i]+"'></option>" ;	
				}
			i++;
			}
		
	}

	function searchUsers(){
		var input = searchUser.value.toUpperCase();
		var i =0 ;
		document.getElementById('listUsers').innerHTML = "";	
			while (i < users.length) {
				if(users[i].toUpperCase().indexOf(input) > -1){	
					document.getElementById('listUsers').innerHTML += "<option value='"+users[i]+"'></option>" ;	
				}
			i++;
			}
		
	}

	function deleteWordUser(){	
		deletedWord = document.getElementById('searchWord').value;
		deletedUser = document.getElementById('searchUser').value;
		if(words.indexOf(deletedWord) > -1){
			del = words.indexOf(deletedWord);
			words.splice(del, 1);
			localStorage.setItem("insertWordsLS", JSON.stringify(words));
			location.reload();
		}
		else if(users.indexOf(deletedUser) > -1){
			del = users.indexOf(deletedUser);
			users.splice(del, 1);
			localStorage.setItem("insertUsersLS", JSON.stringify(users));
			location.reload();
		}
	}

	
	
		
	function start(){
		document.getElementById('first').style.display= "none";
		document.getElementById('second').style.display= "block";
		selectedWord = document.getElementById('searchWord').value;
		selectedUser = document.getElementById('searchUser').value;
		timeStarted = new Date().toLocaleString();

		if(words.indexOf(selectedWord) == -1){
			document.getElementById('first').style.display= "block";
			document.getElementById('second').style.display= "none";
			document.getElementById('searchWord').style.borderColor= "red";
			document.getElementById('searchWord').value = "Please insert word!";
		}
		
		else if ( users.indexOf(selectedUser) == -1 ){
			document.getElementById('first').style.display= "block";
			document.getElementById('second').style.display= "none";
			document.getElementById('searchUser').style.borderColor= "red";
			document.getElementById('searchUser').value = "Please select user!";
		}
		else if (words.indexOf(selectedWord) > -1 && users.indexOf(selectedUser) > -1){
			for(var i=0; i < selectedWord.length; i++){
				answerLetter[i] = "_";
			}
			if(usersInScore.indexOf(selectedUser) == -1){
				score.push({'name': selectedUser, 'games' : [{'game': [], 'time':{'gameStarted': timeStarted}}]});
				localStorage.setItem("scoreLS", JSON.stringify(score));
			}
			else{
				for(var i = 0; i < score.length; i++) {
					if(score[i].name == selectedUser){
						score[i].games.push({'game': [], 'time':{'gameStarted': timeStarted}});
						localStorage.setItem("scoreLS", JSON.stringify(score));
					}
				}
			}
			document.getElementById("displayWord").textContent = answerLetter.join(" ");
			setInterval(timer, 1000);
		}
	}

	function next(){
		selectedWord = words[Math.floor(Math.random() * words.length)];
		trueWords = trueAnswersArray.map(function(a) {return a.word;});
			
			if (words.length > trueAnswersArray.length){
				if (trueWords.indexOf(selectedWord) > -1){
					next();
				}
			}
			else{
				document.getElementById("displayWord").style.display = "none";
				document.getElementById('letter').style.display = "none";
				document.getElementById('timer').style.display = "none";
				document.getElementById('score').innerHTML = "";
				document.getElementById('points').innerHTML = "";

				timeEnded = new Date().toLocaleString();
				for(var j= 0; j<score.length; j++){
				gamesInScore = score[j].games.map(function(a) {return a.game;});
				timeInScore = score[j].games.map(function(a) {return a.time;});
					for(var i=timeInScore.length-1; i<timeInScore.length;i++){
						if(score[j].name == selectedUser){
							score[j].games[i].time['totalPoints'] = totalPoints;
							score[j].games[i].time['totalTime'] = totalTime;
							score[j].games[i].time['gameFinished'] = timeEnded;			
							localStorage.setItem("scoreLS", JSON.stringify(score));
						}
					}
				}
				timeStarted = 0;
				timeEnded = 0;
			}  
			for(var j=0; j < selectedWord.length; j++){
				answerLetter[j] = "_";
			}
			document.getElementById("displayWord").textContent = answerLetter.join(" ");
	}

	function check(){
		var letter = document.getElementById('letter').value;	
		if(letter.length > 0 && answerLetter.indexOf(letter) == -1 && reLetter.test(letter)){
			if (selectedWord.indexOf(letter) == -1){
				points -= 0.25;
			}
			else{
				for(var i = 0; i <selectedWord.length; i++){
					if(selectedWord[i] === letter){
						answerLetter[i] = letter;
						if (sam.indexOf(letter) == -1){
							points += 0.25;
						}
						else{
							points += 0.50;
						}
					}
				}	
			}	
			document.getElementById('points').innerHTML = "You have " +points+ " points!"; 
			document.getElementById('displayWord').innerHTML =answerLetter.join (' ');
		}

		if(selectedWord === answerLetter.join("")){	
			totalPoints += points; 
			totalTime += seconds;
		
			gamesInScore = score[0].games.map(function(a) {return a.game;});
			trueAnswersArray.push({'word' :selectedWord});

			for(var j= 0; j<score.length; j++){
				gamesInScore = score[j].games.map(function(a) {return a.game;});
				for(var i=gamesInScore.length-1; i<gamesInScore.length;i++){
					if(score[j].name == selectedUser){
						score[j].games[i].game.push({'word': selectedWord, 'time': seconds, 'points': points});
						localStorage.setItem("scoreLS", JSON.stringify(score));
					}
				}
			}	
			points = 0;
			seconds = 0;
			answerLetter = [];		
			next();
		}	
	}