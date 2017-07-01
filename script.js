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


users = JSON.parse(localStorage.getItem("insertUsersLS")) || [];
words = JSON.parse(localStorage.getItem("insertWordsLS")) || [];
score = JSON.parse(localStorage.getItem("scoreLS")) || [];




console.log(users);
console.log(words);
console.log(score);

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

	function deleteWord(){	
		deletedWord = document.getElementById('searchWord').value;
		if(words.indexOf(deletedWord) > -1){
			del = words.indexOf(deletedWord);
			words.splice(del, 1);
			localStorage.setItem("insertWordsLS", JSON.stringify(words));
			location.reload();
		}
	}
	
		
	function start(){		
		document.getElementById('first').style.display= "none";
		document.getElementById('second').style.display= "block";
		selectedWord = document.getElementById('searchWord').value;
		selectedUser = document.getElementById('searchUser').value;
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
			document.getElementById("displayWord").textContent = answerLetter.join(" ");
			setInterval(timer, 1000);
		}
	}

	function next(){
			selectedWord = words[Math.floor(Math.random() * words.length)];
			trueWords = trueAnswersArray.map(function(a) {return a.word;});
			usersInScore = score.map(function(a) {return a.user;});

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

				if(usersInScore.indexOf(selectedUser) == -1){
					score.push({"user":selectedUser, "totalTime": totalTime, "totalPoints": totalPoints});
					localStorage.setItem("scoreLS", JSON.stringify(score));
				}
				else{
					for(var i = 0; i < score.length; i++) {
					    if(score[i].user == selectedUser) {
					        score.splice(i, 1);
					        score.push({"user":selectedUser, "totalTime": totalTime, "totalPoints": totalPoints});
							localStorage.setItem("scoreLS", JSON.stringify(score));
					    }
					}
				}
				for(var i=0	; i < score.length; i++){
					document.getElementById('score').innerHTML += "<table> <tr><th>Player name</th><th>Total points</th><th>Total Time</th></tr><tr><td>"+score[i].user+"</td><td>"+score[i].totalPoints+"</td><td>"+score[i].totalTime+"</td></tr></table>";
				}
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
			selectedUser = document.getElementById('searchUser').value;
			trueAnswersArray.push({'word' :selectedWord});
			points = 0;
			seconds = 0;
			answerLetter = [];		
			next();
		}	
	}