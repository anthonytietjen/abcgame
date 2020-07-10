var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
var pictures = ["apple", "banana", "carrot", "", "", "", "grape", "", "", "", "", "", "money", "", "orange", "pear", "", "", "", "tomato", "", "", "", "", "", ""]
var keyCodes = [];
var audioclips = [];
var clickedCount = 0;
var clipsLoadedCount = 0;

function play(letter){
	var audioClip = audioclips[letter];
	var button = document.getElementById('Button_' + letter);
	var picture = document.getElementById('Picture_' + letter);
	var alreadyClicked = button.getAttribute("data-alreadyClicked");
	var backgroundColor_Original;
	
	if(alreadyClicked != null && eval(alreadyClicked) == false){
		// Wait to play the sound so it doesn't happen immediately after the click sound of the mouse click on the laptop.
		setTimeout(function(){
			audioClip.play();
		}, 300);
		
		//button.style.backgroundColor = "#444";
		backgroundColor_Original = button.style.backgroundColor;
		button.style.backgroundColor = 'yellow';
		setTimeout(function(){
			button.style.backgroundColor = backgroundColor_Original;
		}, 1500);
		button.setAttribute("data-alreadyClicked", true);
		button.disabled = true;
		if(picture != null){
			picture.style.opacity = .3;
		}
		clickedCount++;
	}
	
	if(clickedCount == 26){
		//setTimeout(function(){document.location.href = document.location.href;}, 2000);
		setTimeout(function(){
			reset();
		}, 
		
		4000);
	}
}

function reset(){
	// Reset all the buttons
	var loopLetter;
	var loopButton;
	var loopPicture;
	for(var x=0; x<alphabet.length; x++){
		loopLetter = alphabet[x];
		loopButton = document.getElementById('Button_' + loopLetter);
		loopPicture = document.getElementById('Picture_' + loopLetter);
		
		if(loopPicture != null){
			loopPicture.style.opacity = 1;
		}
		loopButton.setAttribute("data-alreadyClicked", false);
		//button.style.backgroundColor = "";
		loopButton.disabled = false;
	}
	clickedCount = 0;
	
	// Play the alphabet song
	audioClip = document.createElement("AUDIO");
	audioClip.src = "sounds/abc_song.ogg";
	audioClip.play();
}
         
function clipHasLoaded(letter){
	var button = document.getElementById('Button_' + letter);
	
	button.disabled = false;
	
	clipsLoadedCount++;
	if(clipsLoadedCount == 26){
		
	}      
}
         
function init(){
	var buttonTemplate = '<button id="Button_{Letter}" onclick="play(\'{Letter}\'); return false;" data-alreadyClicked="false" disabled>{Letter}</button>';
	var pictureTemplate = '<img id="Picture_{Letter}" src="pictures/{Picture}.jpg" onclick="play(\'{Letter}\'); return false;" />';
	
	var buttonsHTML = "";
	var picturesHTML = "";
	var buttonsCanvas = document.getElementById('ButtonsCanvas');
	var picturesCanvas = document.getElementById('PicturesCanvas');
	var audioPlayers = document.getElementById('AudioPlayers');
	
	var loopLetter;
	var audioClip;
	var keyCode = 97;
	for(var i=0; i<alphabet.length; i++){
		loopLetter = alphabet[i];
		loopPicture = pictures[i];
		keyCodes["key_" + keyCode] = loopLetter.toLowerCase();
		audioClip = document.createElement("AUDIO");
		audioClip.src = "sounds/" + loopLetter + ".ogg";
		audioClip.setAttribute("autobuffer", "yes");
		audioClip.setAttribute("data-letter", loopLetter);
		audioClip.addEventListener("canplaythrough", function(){clipHasLoaded(this.getAttribute("data-letter"))}, false);
		audioclips[loopLetter] = audioClip;
		
		buttonsHTML += buttonTemplate.replace(/{Letter}/g, loopLetter);
		if(loopPicture != ""){
			picturesHTML += pictureTemplate.replace(/{Picture}/g, loopPicture).replace(/{Letter}/g, loopLetter);
		}
		audioPlayers.appendChild(audioClip);  
		keyCode++;
	}
	
	buttonsCanvas.innerHTML = buttonsHTML;
	picturesCanvas.innerHTML = picturesHTML;
};