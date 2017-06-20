var words = ['trava', 'lebac', 'prozor', 'sijalica', 'bigi'];
var sam = ['a', 'o', 'e', 'i', 'u'];
document.getElementById('second').style.display= "none";
var answerLetter = [];
var trueWordsArray =[];
var selectedWord;
var points = 0;
var seconds = 0;
	
	function timer() {
		seconds ++;
    	document.getElementById("timer").innerHTML = "Your time: " +seconds+ " seconds!";
	}

	function insert() {
		var insertWord  = document.getElementById("insertWord").value;
		words.push(insertWord);
	}

	function search(){
		var input = searchWord.value.toUpperCase();
		var i =0 ;
		document.getElementById('list').innerHTML = "words";	
			while (i < words.length) {
				if(words[i].toUpperCase().indexOf(input) > -1){	
					document.getElementById('list').innerHTML += "<option value='"+words[i]+"'></option>";	
				}
			i++;
			}
	}

	function start(){		
		document.getElementById('first').style.display= "none";
		document.getElementById('second').style.display= "block";
		selectedWord = document.getElementById('searchWord').value;

		if(words.indexOf(selectedWord) > -1){
			for(var i=0; i < selectedWord.length; i++){
				answerLetter[i] = "_";
			}
			document.getElementById("displayWord").textContent = answerLetter.join(" ");
			setInterval(timer, 1000);
		}
		else{	
			document.getElementById('first').style.display= "block";
			document.getElementById('second').style.display= "none";
			document.getElementById('searchWord').style.color= "red";
		}
	}

	function next(){
			selectedWord = words[Math.floor(Math.random() * words.length)];
			trueWordJson = JSON.stringify(trueWordsArray);
			if (words.length > trueWordsArray.length){
				if (trueWordJson.indexOf(selectedWord) > -1){
					next();
				}
			}
			else{
				document.getElementById("displayWord").style.display = "none";
				document.getElementById('letter').style.display = "none";
				document.getElementById('points').style.display = "none";
				document.getElementById('timer').style.display = "none";
			}


			for(var j=0; j < selectedWord.length; j++){
				answerLetter[j] = "_";
			}
			document.getElementById("displayWord").textContent = answerLetter.join(" ");
	}

	function check(){
		var letter = document.getElementById('letter').value;
		if(letter.length > 0 && answerLetter.indexOf(letter) == -1){
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

			document.getElementById('score').innerHTML = "";
			trueWordsArray.push({'word': selectedWord, 'point': points, 'time' : seconds });
			points = 0;
			seconds = 0;
			answerLetter = [];
			for(var i=0	; i < trueWordsArray.length; i++){
				document.getElementById('score').innerHTML += "<li>" +trueWordsArray[i].word+" ("+trueWordsArray[i].point+"points, " +trueWordsArray[i].time+ "seconds)</li>";
			}
			next();
		}		
	}