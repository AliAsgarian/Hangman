var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
                'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


var topics;             //Topics Array
var selectedTopic;     
var word;               // Selected word
var guess;              // Geuss
var geusses = [ ];      // Stored geusses
var numLives ;          // Lives
var correctCounter ;    // Count correct geusses
var numSpaces;          // Number of spaces in word '-'


// Get elements
var showLives = document.getElementById("lives");
var showClue = document.getElementById("clue");



// create alphabet ul
var createButtons = function () {
  letterButtons = document.getElementById('buttons');
  letters = document.createElement('ul'); //create a list

  for (var i = 0; i < alphabet.length; i++) {
    letters.id = 'alphabet';
    list = document.createElement('li'); //create list elements
    list.id = 'letter';
    list.innerHTML = alphabet[i];
    clickedButtons();
    letterButtons.appendChild(letters); //update buttons
    letters.appendChild(list); //add element to list
  }
  
}



var selectCat = function () {
  if (selectedTopic === topics[0]) {
    topicName.innerHTML = "The Chosen Category Is Football Teams";
  } 
  else if (selectedTopic === topics[1]) {
    topicName.innerHTML = "The Chosen Category Is Films";
  } 
  else if (selectedTopic === topics[2]) {
    topicName.innerHTML = "The Chosen Category Is Cities";
  }
}

  
// Create geusses ul
result = function () {
wordHolder = document.getElementById('hold');
correct = document.createElement('ul');

for (var i = 0; i < word.length; i++) {
  correct.setAttribute('id', 'my-word');
  guess = document.createElement('li');
  guess.setAttribute('class', 'guess');
  if (word[i] === "-") {
    guess.innerHTML = "-";
    numSpaces = 1;
  } else {
    guess.innerHTML = "_";
  }

  geusses.push(guess);
  wordHolder.appendChild(correct);
  correct.appendChild(guess);
}
}
    
// Show lives
lifeDisplay = function () {
showLives.innerHTML = numLives + " lives remaining";
if (numLives < 1) {
  showLives.innerHTML = "Game Over, the correct answer is " + word;
}
for (var i = 0; i < geusses.length; i++) {
  if (correctCounter + numSpaces === geusses.length) {
    showLives.innerHTML = "You Win!";
  }
}
}
  
// OnClick Function
clickedButtons = function () {
list.onclick = function () {
  var geuss = (this.innerHTML);
  this.setAttribute("class", "active"); //sets button as active so color change
  this.onclick = null; //makes it so nothing happens when button is clicked
  for (var i = 0; i < word.length; i++) {
    if (word[i] === geuss) {
      geusses[i].innerHTML = geuss; //makes it so new correct letter appears
      correctCounter++; //updates the number of letters found
    } 
  }
  if (word.indexOf(geuss) === -1) { //check to see if the letter exists in the word, if it doesnt, decreases life
    numLives--;
  } 
  lifeDisplay(); //updates life counter display
}
}

  
// Play
play = function () {
  topics = [
      ["EVERTON", "LIVERPOOL", "ARSENAL", "CHELSEA", "REAL-MADRID", "MANCHESTER-CITY", "FC-BARCELONA"],
      ["ALIEN", "HARRY-POTTER", "GLADIATOR", "FINDING-NEMO", "JAWS", "SUPERBAD"],
      ["MANCHESTER", "MILAN", "MADRID", "AMSTARDAM", "PRAGUE", "CHICAGO"]
  ];

  selectedTopic = topics[Math.floor(Math.random() * topics.length)];
  word = selectedTopic[Math.floor(Math.random() * selectedTopic.length)];
  word = word.replace(/\s/g, "-");
  // console.log(word);
  createButtons();

  geusses = [ ];
  numLives = 10;
  correctCounter = 0;
  numSpaces = 0;
  result();
  lifeDisplay();
  selectCat();
}

play();

// Hint

  hint.onclick = function() {

    hints = [
      ["Based in Mersyside", "6 Time Champions League Winners", "Invincibles", "Owned by A russian Billionaire", "Galacticos", "2013 FA Cup runners up", "Catalan Club"],
      ["Science-Fiction horror film", "Wizards", "Historical drama", "Anamated Fish", "Giant great white shark", "Origin of Mclovin meme"],
      ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital", "Home of the Bulls"]
  ];

  var topicIndex = topics.indexOf(selectedTopic);
  var hintIndex = selectedTopic.indexOf(word);
  showClue.innerHTML = "Clue: - " +  hints [topicIndex][hintIndex];
  
};

  // Reset

document.getElementById('reset').onclick = function() {
  correct.parentNode.removeChild(correct);
  letters.parentNode.removeChild(letters);
  showClue.innerHTML = "";
  play();
}
