//v0.7.0
createHead();
setBodyStyle();
createTop();
makeStudyListButtons();
let listOfLists = getStudyList(null);
let currentStudyList = shuffle(listOfLists[listOfLists.length - 1][1]);	//Initial list to be studied
let changeStudyList = displayCurrentStudyList();
createStudyButton();
let changePrompt = displayPrompt();
let getInputBox = createInputBox();
let getPopup = displayPopup();

let inputBoxDiv = document.createElement("DIV");
inputBoxDiv.appendChild(getInputBox());
inputBoxDiv.appendChild(getPopup());
inputBoxDiv.id = "inputBox";
document.body.appendChild(inputBoxDiv);

displayReaction();
displayWordsToStudy();
createWordsToStudyButton();
displayWordsStudying();
runProgram(currentStudyList);

/**
* This function creates the HTML in the <head>
**/
function createHead(){
	changeToHTTPS();
	createTitle("Nosce Lingua Latina ē wadsworth.tech");
	createLinks("/favicons/faviconBlue-32x32.png");

	/**
	* This function changes the page protocol to https
	**/
	function changeToHTTPS(){
		if (location.protocol != 'https:')
	    {
	        location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
	    }
	}

	/**
	* This function creates and appends the page title as a child of <head>
	**/
	function createTitle(titleText){
		let title = document.createElement("title");
		title.appendChild(document.createTextNode(titleText));
		document.head.appendChild(title);
	}

	/**
	* This function creates the google fonts link and the favicon link
	**/
	function createLinks(faviconLink){
		//Google Fonts link for Lato
		let font = document.createElement("link");
		font.rel = "stylesheet";
		font.href = "https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900";
		document.head.appendChild(font);

		//Favicon link
		let favicon = document.createElement("link");
		favicon.rel = "icon";
		favicon.type = "image/png";
		favicon.href = faviconLink;
		favicon.sizes = "32x32";
		document.head.appendChild(favicon);
	}
}

/**
* This function sets the common style for the entire body
**/
function setBodyStyle(){
	document.body.style.backgroundColor = "#F2F2F2";
	document.body.style.fontFamily = "'Lato', sans-serif";
}

/**
* This function creates the HTML for the "top" div - the intro text at the top of the page
**/
function createTop(){
	//Div element for this group of elements
	let topDiv = document.createElement("DIV");
	topDiv.class = "top";
	document.body.appendChild(topDiv);
	
	//Very top text
	let topHeader = document.createElement("h1");
    topHeader.appendChild(document.createTextNode("Nosce Verba Latina!"));
    topDiv.appendChild(topHeader);

    //Paragraph just below the top
    let subHeader = document.createElement("p");
    subHeader.appendChild(document.createTextNode("This page is now a vocabulary studying app."));
    subHeader.style.marginBottom = "0px";
    topDiv.appendChild(subHeader);

    //Complement element to subHeader - links to wadsworth.tech/main
    let linkToMain = document.createElement("a");
    linkToMain.href = "/main/";
    linkToMain.appendChild(document.createTextNode("Click here to continue to wadsworth.tech proper."));
    topDiv.appendChild(linkToMain);

    //Display Roman date
    let latinDate = document.createElement("p");
    latinDate.appendChild(document.createTextNode(getRomanDate()));
    latinDate.style.fontSize = "30px";
    latinDate.style.marginBottom = "0px";
    topDiv.appendChild(latinDate);

    //Attribute Roman date to Akshay
    let akshay = document.createElement("p");
    akshay.appendChild(document.createTextNode("Thanks to Akshay for the Roman date"));
    akshay.style.fontSize = "10px";
    akshay.style.marginTop = "0px";
    topDiv.appendChild(akshay);

    //Style
    topDiv.style.textAlign = "center";
}

/**
* Creates the button HTML elements that toggle which word list
* is to be studied.
**/
function makeStudyListButtons(){
	let chapters = getStudyList(null);

	//Adds the study list buttons
	for (let chaptersIndex = 0; chaptersIndex < chapters.length; chaptersIndex++){
	    let currentButton = createButton(chapters[chaptersIndex][1], "#555", "2px solid #F2F2F2");
	    document.body.appendChild(currentButton);
	    
	    currentButton.onclick = function(){
	        for (let i = 0; i < chapters.length; i++){
	            //Changes studied word list to that associated with this button
	            if (currentButton.id == chapters[i][1]){
	                currentStudyList = shuffle(chapters[i][0]);
	                changeStudyList(chapters[i][1]);
	                changePrompt(0, true);
	                document.getElementById("reaction").innerText = "";
	                document.getElementById("shouldStudy").innerText = "";
	                document.getElementById("study").innerText = "";
	                document.getElementById("Study these words").style.display = "none";
	            }
	        }
	        runProgram(currentStudyList);
	    };
	}
}

/**
*
**/
function displayCurrentStudyList(){
	let currentListName = document.createElement("p");
	changeList(currentStudyList);

	//Style
	currentListName.style.color = "#555";

	document.body.appendChild(currentListName);

	function changeList(newName){
		currentListName.innerText = newName;
		currentStudyList = shuffle(getStudyList(newName)[0]);
	}

	return changeList;
}

/**
* 
**/
function createStudyButton(){
	let studyButton = createButton("Study This Chapter", "DarkViolet", "2px solid #F2F2F2");

	//style
	studyButton.style.marginTop = "0px";
	
	studyButton.onclick = function(){
		let chapterWords = currentStudyList;
		let chapterAsString = "";

        for (let i = 0; i < chapterWords.length; i++)
        {
            chapterAsString += chapterWords[i][0] + ": " + chapterWords[i][1] + "\n";
        }

        if (document.getElementById("study").innerText == chapterAsString)
        {
            document.getElementById("study").innerText = "";
        }
        else
        {
            document.getElementById("study").innerText = chapterAsString;
        }
	}

	document.body.appendChild(studyButton);
}

/**
* I think to correctly write this youll need to make the current study list a global variable
**/
function displayPrompt(){
	let prompt = document.createElement("p");

	prompt.style.fontSize = "32px";
	prompt.style.marginTop = "24px";
	prompt.style.marginBottom = "16px";

	changePrompt(0, true);

	document.body.appendChild(prompt);

	function changePrompt(listIndex, isIndex){
		if (isIndex){
			prompt.innerText = currentStudyList[listIndex][0];
		}
		else{
			prompt.innerText = listIndex;
		}
	}

	return changePrompt;

}

/**
*
**/
function createInputBox(){
	let inputBox = document.createElement("INPUT");
	inputBox.placeholder = "Answer";
	inputBox.autocomplete = "off";
	inputBox.autocorrect = "off";
	inputBox.autocaptalize = "off";
	inputBox.spellcheck = false;

	//Style for Input Box
	inputBox.style.width = "400px";
	inputBox.style.padding = "12px 20px";
	inputBox.style.margin = "0px 0";
	inputBox.style.marginBottom = "4px";
	inputBox.style.border = "1px solid #ccc";
	inputBox.style.borderRadius = "4px";
	inputBox.style.boxSizing = "border-box";
	inputBox.style.fontSize = "18px";
	inputBox.style.backgroundColor = "#F2F2F2";

	inputBox.onfocus = function(){
		inputBox.style.border = "3px solid #555";
		inputBox.style.marginBottom = "2px";
		inputBox.style.outline = "0";
		inputBox.style.paddingTop = "10px";
		inputBox.style.paddingLeft = "18px";
	}

	inputBox.onblur = function(){
		inputBox.style.border = "1px solid #ccc";
		inputBox.style.marginBottom = "4px";
		inputBox.style.outline = "0";
		inputBox.style.paddingTop = "12px";
		inputBox.style.paddingLeft = "20px";
	}

	return function(){
		return inputBox;
	}
}

function displayPopup(){
	let span = document.createElement("span");
	let infoIcon = document.createElement("IMG");
	let popup = document.createElement("span");

	span.style.position = "relative";
	span.style.cursor = "pointer";
	span.style.userSelect = "none";
	span.id = "popupSpan";

	popup.style.visibility = "hidden";
	popup.style.width = "160px";
	popup.style.backgroundColor = "#555";
	popup.style.color = "#fff";
	popup.style.textAlign = "center";
	popup.style.borderRadius = "6px";
	popup.style.padding = "8px 0";
	popup.style.position = "absolute";
	popup.style.zIndex = "1";
	popup.style.bottom = "125%";
	popup.style.left = "50%";
	popup.style.marginLeft = "-80px";

	popup.style.marginBottom = "8px";
	popup.style.marginLeft = "18px";
	popup.style.width = "400px";
	popup.style.opacity = "0.5";

	popup.innerText = "To get the answer correct, you must input at least one correct English meaning.\nExamples:Prompt: \"emō\" Enter: \"emere, ēmī, emptum: to buy\"\nPrompt: \"finēs\" Enter: \"finium, n pl: territory\"";

	let toggled = false;
	
	infoIcon.src = "info.ico";
	infoIcon.width = "16";
	infoIcon.height = "16";
	infoIcon.style.marginBottom = "16px";
	infoIcon.style.paddingLeft = "4px";

	infoIcon.onclick = function(){
		if (!toggled){
			popup.style.visibility = "visible";
			toggled = true;
		}
		else {
			popup.style.visibility = "hidden";
			toggled = false;
		}
	}

	popup.onclick = function(){
		popup.style.visibility = "hidden";
		toggled = false;
	}

	span.appendChild(infoIcon);
	span.appendChild(popup);

	return function(){
		return span;
	}
}

function displayReaction(){
	let reaction = document.createElement("p");
	reaction.id = "reaction";

	//style
	reaction.style.marginTop = "32px";

	document.body.appendChild(reaction);
}

function displayWordsToStudy(){
	let wordsToStudy = document.createElement("p");
	wordsToStudy.id = "shouldStudy";

	//style
	wordsToStudy.style.marginTop = "32px";

	document.body.appendChild(wordsToStudy);
}

function createWordsToStudyButton(){
	let studyWordsButton = createButton("Study these words", "#DE0000", "2px solid #555");
    document.body.appendChild(studyWordsButton);

    //style
    studyWordsButton.style.display = "none";
}

function displayWordsStudying(){
	let wordsStudying = document.createElement("p");
	wordsStudying.id = "study";

	document.body.appendChild(wordsStudying);
}

/**
* Creates a button HTML element with fixed style and animation attributes.
* Parameters:
*   value: the text to be displayed in the button and the button id.
*   backgroundColor: the color of the button
* Returns:
*   The button HTML element
**/
function createButton(value, backgroundColor, borderOnHover){
	//Create button with text
	var button = document.createElement("BUTTON");
	var text = document.createTextNode(value);
    button.appendChild(text);
    button.id = value;

    //Dynamic button style
    button.style.backgroundColor = backgroundColor;

    //Fixed button style
    button.style.border = "none";
    button.style.marginRight = "8px";
    button.style.color = "white";
    button.style.height = "32px";
    button.style.marginTop = "16px";
    button.style.borderRadius = "20px";

    //Fixed button animation
    button.onmouseover = function(){
        button.style.border = borderOnHover;
        button.style.padding = "2px 4px 3px";
    };
    button.onmouseout = function(){
        button.style.border = "none";
        button.style.padding = "2px 6px 3px";
    };
    button.onfocus = function(){
    	button.style.outline = "0";
    };

    return button;
}

/**
* This function actually processes the input and coordinates a response
**/
function runProgram(words)
{
    let i = 0;

    let termsWrong = new Array();

    removeIWasRightButton();

    let entered = false;

    getInput(i);

    function getInput(i)
    {
        changePrompt(i, true);
        getInputBox().value = "";
        getInputBox().onkeydown = function(e){
        	let key = e.keyCode || e.which;
        	if (key == 13){
        		useInput();
        	}
        };

        function useInput()
        {
            if (!entered)
            {
                let response = getInputBox().value;
                
                entered = true;

                let definitionWords = getDefinitionWords(i);

                let correctDefinition = false;

                removeIWasRightButton();

                for (let ind = 0; ind < definitionWords.length; ind++)
                {
                    if ((response.substring(response.indexOf(":") + 1)).indexOf(definitionWords[ind]) != -1)
                    {
                        correctDefinition = true;
                    }
                }
                
                if (response.substring(0, response.indexOf(":")) == words[i][1].substring(0, words[i][1].indexOf(":")) && correctDefinition)
                {
                    document.getElementById("reaction").innerText = "Good job! \n You said: " + words[i][0] + ": " + response;
                    document.getElementById("reaction").style.color = "green";
                }
                else
                {
                    document.getElementById("reaction").innerText = "Incorrect. \n You said: " + words[i][0] + ": " + response + "\nCorrect: " + words[i][0] + ": " + words[i][1];
                    document.getElementById("reaction").style.color = "#DE0000";
                    termsWrong.push(words[i][0] + ": " + words[i][1]);

                    let thisButton = createButton("I was actually right", "green", "2px solid #555");

                    document.getElementById("inputBox").appendChild(thisButton);
                    
                    thisButton.style.marginLeft = "8px";
                    thisButton.style.marginTop = "0px";

                    thisButton.onclick = function(){
                        termsWrong.pop();
                        document.getElementById("reaction").innerText = "Good job! \n You said: " + words[i][0] + ": " + response;
                        document.getElementById("reaction").style.color = "green";
                        inputBox.removeChild(thisButton);
                        if (document.getElementById("shouldStudy").innerText.length > 0)
                      	{
                            termsWrongToString();
                        }
                        else
                        {
                        	document.getElementById("Study these words").style.display = "none";
                        }
                    };
                }
                
                entered = false;
                
                if (i < words.length - 1)
                {
                    getInput(i + 1);
                }
                else
                {
                    changePrompt("You are done.", false);
                    getInputBox().value = "";
                    entered = true;

                    termsWrongToString();
                }

                function termsWrongToString()
                {
                    let termsWrongString = "";
                    for (let wrongI = 0; wrongI < termsWrong.length; wrongI++)
                    {
                        termsWrongString += termsWrong[wrongI] + "\n";
                    }
                    if (termsWrongString.length > 0)
                    {
                        document.getElementById("shouldStudy").innerText = "You got the following words wrong: \n \n" + termsWrongString;
                    
                        let studyWordsButton = document.getElementById("Study these words");

                        studyWordsButton.style.display = "initial";

                        studyWordsButton.onclick = function(){
					        let termsWrongCorrectFormat = new Array();

					        for (let i = 0; i < termsWrong.length; i++){
					            let thisWord = new Array();
					            thisWord[0] = termsWrong[i].substring(0, termsWrong[i].indexOf(": "));
					            thisWord[1] = termsWrong[i].substring(termsWrong[i].indexOf(": ") + ": ".length);
					            termsWrongCorrectFormat.push(thisWord);
					        }
					        
					        currentStudyList = shuffle(termsWrongCorrectFormat);
					        runProgram(currentStudyList);

					        studyWordsButton.style.display = "none";
					        document.getElementById("reaction").innerText = "";
					        document.getElementById("shouldStudy").innerText = "";
					        document.getElementById("study").innerText = "";
					    };
                    }
                    else
                    {
                        document.getElementById("shouldStudy").innerText = "Well done. You got no words wrong!"
                        document.getElementById("Study these words").style.display = "none";
                    }
                }    
            }
        };
    }

    function removeIWasRightButton()
    {
        if (document.getElementById("I was actually right") != null)
        {
            document.getElementById("inputBox").removeChild(document.getElementById("I was actually right"));
        }
    }

    /**
    *   Parses the English definition of the Latin and inserts each parsed word
    *   of the English into an array.  Returns the array.
    *
    *   parameter i: the index of the current vocab in the 2D array called words
    **/
    function getDefinitionWords(i)
    {
        let correctWords = new Array(); //The array to contain the English words
        
        let correctDef = words[i][1].substring((words[i][1].indexOf(":") + 1)); //The full correct English definition

        //Cuts out words from right to left until the definition has length 0
        while (correctDef.length > 0)
        {
        	let currentWord;
            //Handles the case where a comma comes after the word or where the current word is the last
            if (correctDef.indexOf(",") != -1)
            {
                currentWord = correctDef.substring(0, correctDef.indexOf(",")); //The current English word
                
                //Removes "to" from before verbs
                if (currentWord.indexOf(" to") != -1)
                {
                    currentWord = currentWord.substring(currentWord.indexOf(" to") + 3);
                }

                //Removes spaces from before words
                while (currentWord.indexOf(" ") == 0)
                {
                    currentWord = currentWord.substring(1);
                }
                correctDef = correctDef.substring(correctDef.indexOf(",") + 1); //Cuts the current word from the definition
            }
            else
            {
                currentWord = correctDef;   //This is the last word so no splicing is necessary
                correctDef = "";            //Makes definition of length 0
                if (currentWord.indexOf(" to") != -1)
                {
                    currentWord = currentWord.substring(currentWord.indexOf(" to") + 3);
                }

                while (currentWord.indexOf(" ") == 0)
                {
                    currentWord = currentWord.substring(1);
                }
            } 
                correctWords.push(currentWord);
        }
        return correctWords;
    }
}

/**
* Returns the "chapters" Array if parameter is null or the
* array of words and definitions that matches the parameter.
* Returns null if the parameter does not match any word list
* and is not null.
**/
function getStudyList(chapterID)
{
	let bk4ch25 = [
	  ["cūnctor","1: to delay"],
	  ["dēdecus","dēdecoris, n: dishonor, disgrace"],
	  ["funda","fundae, f: sling"],
	  ["obtestor","1: to call to witness, beseech, entreat"],
	  ["pedem referō","referre, rettulī, relātum: to retreat"],
	  ["prōdō","prōdere, prōdidī, prōditum: to betray, reveal"]
	];

	let bk4ch25SansMacrons = [
	  ["cunctor","1: to delay"],
	  ["dedecus","dedecoris, n: dishonor, disgrace"],
	  ["funda","fundae, f: sling"],
	  ["obtestor","1: to call to witness, beseech, entreat"],
	  ["pedem refero","referre, rettuli, relatum: to retreat"],
	  ["prodo","prodere, prodidi, proditum: to betray, reveal"]
	];

	let bk4ch27 = [
	  ["arcessō", "arcessere, arcessīvī, arcessītum: to summon, send for, invite"],
	  ["obses", "obsidis, c: hostage; pledge, security"],
	  ["polliceor", "pollicērī, pollicitus sum: to promise, offer"],
	  ["queror", "querī, questus sum: to complain, bewail, lament"],
	  ["ultrō", "voluntarily; besides, moreover"],
	  ["vinculum","vinculī, n: chain"]
	];

	let bk4ch27SansMacrons = [
	  ["arcesso", "arcessere, arcessivi, arcessitum: to summon, send for, invite"],
	  ["obses", "obsidis, c: hostage; pledge, security"],
	  ["polliceor", "polliceri, pollicitus sum: to promise, offer"],
	  ["queror", "queri, questus sum: to complain, bewail, lament"],
	  ["ultro", "voluntarily; besides, moreover"],
	  ["vinculum","vinculi, n: chain"]
	];

	let bk4ch32 = [
	    ["cōnfertus","cōnferta, cōnfertum: dense, thick, compact, stuffed"],
	    ["cōnfestim","hastily, at once, immediately"],
	    ["dēlitēscō","dēlitēscere, dēlituī: to hide oneself, lurk, (note: no 4th part)"],
	    ["essedum","essedī, n: two wheeled British war chariot"],
	    ["in statiōne esse","to be on guard"],
	    ["interpōnō","interpōnere, interposuī, interpositum: to interpose, allege, cause"]
	];

	let bk4ch32SansMacrons = [
	    ["confertus","conferta, confertum: dense, thick, compact, stuffed"],
	    ["confestim","hastily, at once, immediately"],
	    ["delitesco","delitescere, delitui: to hide oneself, lurk, (note: no 4th part)"],
	    ["essedum","essedi, n: two wheeled British war chariot"],
	    ["in statione esse","to be on guard"],
	    ["interpono","interponere, interposui, interpositum: to interpose, allege, cause"]
	];

	let bk4ch35 = [
		["aciēs","aciēī, f: battle line"],
		["impetus","impetūs, m: attack"],
		["nancīscor","nancīscī, nactus sum: to get, obtain possession of, meet with, find"],
		["pellō","pellere, pepulī, pulsum: to defeat, rout"],
		["terga vertō","vertere, vertī, versum: to flee"]
	];

	let bk4ch35SansMacrons = [
		["acies","aciei, f: battle line"],
		["impetus","impetus, m: attack"],
		["nanciscor","nancisci, nactus sum: to get, obtain possession of, meet with, find"],
		["pello","pellere, pepuli, pulsum: to defeat, rout"],
		["terga verto","vertere, verti, versum: to flee"]
	];

	let bk5ch25 = [
	    ["maiōrēs","maiōrum, m: ancestors"],
	    ["nāscor","nāscī, nātus sum: to be born, be produced, rise, spring up, be raised, be found"],
	    ["operam dō","dare, dedī, datum: to give attention, take pains"],
	    ["palam","openly, publicly"],
	    ["vereor","verērī, veritus sum: to revere, fear, dread, be afraid of"]
	];

	let bk5ch25SansMacrons = [
	    ["maiores","maiorum, m: ancestors"],
	    ["nascor","nasci, natus sum: to be born, be produced, rise, spring up, be raised, be found"],
	    ["operam do","dare, dedi, datum: to give attention, take pains"],
	    ["palam","openly, publicly"],
	    ["vereor","vereri, veritus sum: to revere, fear, dread, be afraid of"]
	];

	let bk5ch26 = [
	    ["lignātor","lignātoris, m: wood-forager"],
	    ["minuō","minuere, minuī, minūtum: to lessen, impair, diminish, settle"],
	    ["opprimō","opprimere, oppressī, oppressum: to press down, destroy, surprise"],
	    ["repentīnus","repentīna, repentīnum: sudden, unexpected, hasty"],
	    ["vāllum","vāllī, n: wall, rampart, entrenchments, earthworks"]
	];

	let bk5ch26SansMacrons = [
	    ["lignator","lignatoris, m: wood-forager"],
	    ["minuo","minuere, minui, minutum: to lessen, impair, diminish, settle"],
	    ["opprimo","opprimere, oppressi, oppressum: to press down, destroy, surprise"],
	    ["repentinus","repentina, repentinum: sudden, unexpected, hasty"],
	    ["vallum","valli, n: wall, rampart, entrenchments, earthworks"]
	];

	let bk5ch28 = [
		["ignōbilis","ignōbile: unknown, undistinguished"],
		["iniussū","without command or order"],
		["rēs frūmentāria","reī frūmentāriae, f: grain supply, provisions"],
		["spontis or sponte","of one's own accord, willingly"],
		["turpis","turpe: ugly, unseemly, shameful, disgraceful, dishonorable"]
	];

	let bk5ch28SansMacrons = [
		["ignōbilis","ignōbile: unknown, undistinguished"],
		["iniussū","without command or order"],
		["rēs frūmentāria","reī frūmentāriae, f: grain supply, provisions"],
		["spontis or sponte","of one's own accord, willingly"],
		["turpis","turpe: ugly, unseemly, shameful, disgraceful, dishonorable"]
	];

	let chapters = [
	    [bk4ch25, "De Bello Gallico Book 4 Chapter 25"],
	    [bk4ch25SansMacrons, "De Bello Gallico Book 4 Chapter 25: No Macrons"],
	    [bk4ch27, "De Bello Gallico Book 4 Chapter 27"],
	    [bk4ch27SansMacrons, "De Bello Gallico Book 4 Chapter 27: No Macrons"],
	    [bk4ch32, "De Bello Gallico Book 4 Chapter 32"],
	    [bk4ch32SansMacrons, "De Bello Gallico Book 4 Chapter 32: No Macrons"],
	    [bk4ch35, "De Bello Gallico Book 4 Chapter 35"],
	    [bk4ch35SansMacrons, "De Bello Gallico Book 4 Chapter 35: No Macrons"],
	    [bk5ch25, "De Bello Gallico Book 5 Chapter 25"],
	    [bk5ch25SansMacrons, "De Bello Gallico Book 5 Chapter 25: No Macrons"],
	    [bk5ch26, "De Bello Gallico Book 5 Chapter 26"],
	    [bk5ch26SansMacrons, "De Bello Gallico Book 5 Chapter 26: No Macrons"],
	    [bk5ch28, "De Bello Gallico Book 5 Chapter 28"],
	    [bk5ch28SansMacrons, "De Bello Gallico Book 5 Chapter 28: No Macrons"]
	];

	if (chapterID == null)
	{
		return chapters;
	}
	else
	{
		for (let i = 0; i < chapters.length; i++)
		{
			if (chapters[i][1] == chapterID)
			{
				return chapters[i];
			}
		}
		return null;	//If chapter with given ID does not exist
	}
}

/**
* Returns the current Romanized date in Latin.  Written by Akshay Srivatsan.
**/
function getRomanDate(){
    var months_accusative = ['', 'Ianuarias', 'Februarias', 'Martias', 'Apriles', 'Maias', 'Iunias', 'Iulias', 'Augustas', 'Septembres', 'Octobres', 'Novembres', 'Decembres', 'Ianuarias']
    var months_ablative = ['', 'Ianuariis', 'Februariis', 'Martiis', 'Aprilibus', 'Maiis', 'Iuniis', 'Iuliis', 'Augustis', 'Septembribus', 'Octobribus', 'Novembribus', 'Decembribus', 'Ianuariis']

    var numbers_accusative = ['nihil', 'primum', 'secundum', 'tertium', 'quartum', 'quintum', 'sextum', 'septimum', 'octavum', 'nonum', 'decimum', 'undecimum', 'duodecimum', 'tertium decimum', 'quartum decimum', 'quintum decimum', 'sextum decimum', 'septimum decimum', 'duodevicesimum', 'undevicesimum', 'vicesimum']

    function romanDate(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getYear();

        var lastDayOfMonth = new Date(year, month, 0).getDate()

        var kalends = 1;
        var nones = 5;
        var ides = 13;
        if ([3, 5, 7, 10].indexOf(month) != -1) {
            nones = 7;
            ides = 15;
        }

        if (day == kalends) {
            return 'Kalendis ' + months_ablative[month];
        }

        if (day > kalends && day < (nones - 1)) {
            return 'ante diem ' + numbers_accusative[nones - day + 1] + ' Nonas ' + months_accusative[month];
        }

        if (day == nones - 1) {
            return 'pridie Nonas ' + months_accusative[month];
        }

        if (day == nones) {
            return 'Nonis ' + months_ablative[month];
        }

        if (day > nones && day < (ides - 1)) {
            return 'ante diem ' + numbers_accusative[ides - day + 1] + ' Idus ' + months_accusative[month];
        }

        if (day == ides - 1) {
            return 'pridie Idus ' + months_accusative[month];
        }

        if (day == ides) {
            return 'Idibus ' + months_ablative[month];
        }

        if (day > ides && day < lastDayOfMonth) {
            return 'ante diem ' + numbers_accusative[(lastDayOfMonth + 1) - day + 1] + ' Kalendas ' + months_accusative[month + 1];
        }

        if (day == lastDayOfMonth) {
            return 'pridie Kalendas ' + months_accusative[month + 1];
        }
    }

    function romanize(string) {
        return string.replace(new RegExp('U', 'g'), 'V').replace(new RegExp('v', 'g'), 'u');
    }

    var date = new Date();
    return (romanize(romanDate(date)));
}

function shuffle(array){
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}