var words = ['trava', 'lebac', 'prozor', 'lampa', 'sijalica'];
document.getElementById('second').style.display= "none";
var answer = [];
var lives = 5;

	function insert() {
		var insertWord  = document.getElementById("insertWord").value;
		words.push(insertWord);
	}

	function search(){
		var searchWord  = document.getElementById("searchWord");
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
		document.getElementById('lives').innerHTML = "You have " +lives+ " lives!" ;
		
	}

	function check(){
		var letter = document.getElementById('letter').value;

		if(letter.length > 0){
			if (selectedWord.indexOf(letter) == -1){
				lives--;
			}
			else{
				for(var i = 0; i <selectedWord.length; i++){
					if(selectedWord[i] === letter){
						answer[i] = letter;
					}
				}
			}
			document.getElementById('displayWord').innerHTML =answer.join (' ');
			document.getElementById('lives').innerHTML =  "You have " +lives+ " lives!" ;
		}
		if(lives<1){
		document.getElementById('lives').innerHTML =  "Game over!" ;
		document.getElementById("displayWord").style.display = "none";
		}
		if(selectedWord === answer.join("")){
			var reverse ="";
			for (var i = selectedWord.length - 1; i >= 0; i--){
				reverse += selectedWord[i];
			}
			document.getElementById('displayWord').innerHTML = reverse;
		}		
	}


