let boxes = document.querySelectorAll(".box");
// here we are accessing the boxes buy taking all the contents ALL and then only taking boxes by their class

let resetButton = document.querySelector("#reset-btn"); //accessing the reset button

let outcomeText = document.querySelector("#outcome");

let turn0 = true; //setting the initial turn of 0

let msgContainer = document.querySelector(".msgContainer");

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];



const showWinner = (winner) => {
  outcomeText.innerHTML = `winner <h4>${winner}</h4> `  ;
  msgContainer.classList.remove("hide");
};

const showTie = () => {
  outcomeText.innerHTML = `It's a Tie!`;
  msgContainer.classList.remove("hide");
};

const disableBoxes = () =>  { 
    for ( let  box of boxes ) {
        box.disabled = true; //after a winner is declared, all boxes are disabled
    }

}

const enableBoxes = () =>  { 
    for ( let  box of boxes ) {
        box.disabled = false; //after reset button click , all boxes are enabled
        box.innerText=""; //this empties all the boxes text after reset button

    }

}



//defining a function to check  winner after every time a box is clicked
const checkWinner = (outcome) => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner is ", pos1Val);

        
        showWinner(pos1Val);
        disableBoxes(); //after a winner is declared, all boxes are disabled 
        return true;
      }
    }
    
  }
  return false; //if no winner found in all the winning patterns
};

const resetGame = () => { 
    enableBoxes(); 
    msgContainer.classList.add("hide");
}; 

const checkTie = () => {
  let isTie = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      isTie = false; // If there's an empty box, it's not a tie
      break;
    }
  }
  if (isTie) {
    showTie(); // Display the tie message
    disableBoxes(); // Disable boxes when it's a tie
  }
};

//below is the main code that executes the game
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box clicked");
    if (turn0) {
      box.innerText = "o";
      turn0 = false;
    } else {
      box.innerText = "x";
      turn0 = true;
    }
    box.disabled = true; //to prevent double click change of x,0 once a box is clicked
    if (!checkWinner()) {
      checkTie(); // If no winner, check for a tie
    }//after every click, it checks if any player has won
  });
});

resetButton.addEventListener("click", resetGame );


