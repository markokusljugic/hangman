var words = ['trava', 'lebac', 'prozor', 'sijalica', 'bigi'];
var sam = ['a', 'o', 'e', 'i', 'u'];
document.getElementById('second').style.display= "none";
var answer = [];
var trueWordsArray =[];
var selectedWord;
var points = 0;

	function insert() {
		var insertWord  = document.getElementById("insertWord").value;
		words.push(trueWord.points);
		console.log(trueWord.points);
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
		letterNum = selectedWord.length;

		for(var i=0; i < letterNum; i++){
			answer[i] = "_";
		}
		document.getElementById("displayWord").textContent = answer.join(" ");
	}

	function next(){
			selectedWord = words[Math.floor(Math.random() * words.length)];
			if (words.length > Object.keys(trueWordsArray).length){
				if (Object.keys(trueWordsArray).indexOf(selectedWord) > -1){
					next();
				}
			}
			else{
				document.getElementById("displayWord").style.display = "none";
				document.getElementById('letter').style.display = "none";
			}

			letterNum = selectedWord.length;

			for(var j=0; j < letterNum; j++){
				answer[j] = "_";
			}
			document.getElementById("displayWord").textContent = answer.join(" ");
	}

	function check(){
		var letter = document.getElementById('letter').value;
		if(letter.length > 0){
			if (selectedWord.indexOf(letter) == -1){
				points -= 0.25;
			}
			else{
				for(var i = 0; i <selectedWord.length; i++){
					if(selectedWord[i] === letter){
						answer[i] = letter;
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
			document.getElementById('displayWord').innerHTML =answer.join (' ');
		}
		if(selectedWord === answer.join("")){

			document.getElementById('score').innerHTML = "";
			trueWordsArray.push({word: selectedWord, point: points });
			points = 0;
			answer = [];
			for(var i=0	; i < trueWordsArray.length; i++){
				document.getElementById('score').innerHTML += "<li>" +trueWordsArray[i].word+" ("+trueWordsArray[i].point+"points)</li>";
			}
			next();
		}		
	}