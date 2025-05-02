let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newbtn = document.querySelector(".newgame");
let winner = document.querySelector(".winner");
let switchmode = document.querySelector("#switch");
let turn = true; //player1 or player 2 tuen   let true == player 1 turn with 0
//we will store winning patterns in 2Darray
const winPattern = [
[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[6,4,2],[0,4,8]];

//to add event listener when we click on box
let flag = true;
let handler1 = ()=>{
    if(flag)
    {
        let window = document.querySelector("body");
        window.style.backgroundColor = "black";
        let header = document.querySelector("#heading");
        header.style.color = "white";
    }
    else
    {
        let window = document.querySelector("body");
    window.style.backgroundColor = "bisque";
    let header = document.querySelector("#heading");
    header.style.color = "black";
    }
    flag = !flag;
};
switchmode.addEventListener("click",()=>handler1());
function enable()
{
    boxes.forEach((box) => {
        box.disabled = false;
    });
}
function disable()
{
    boxes.forEach((box) => {
        box.disabled = true;
    });
}



let newgame = ()=>{
    winner.classList.add("keephide");
    enable();
    boxes.forEach(box => {
        box.innerText = "";
    });
}

let resetgame = () =>{
    winner.classList.add("keephide");
    enable();
    boxes.forEach(box => {
        box.innerText = "";
    });
}

newbtn.addEventListener("click",()=>newgame());
resetbtn.addEventListener("click",()=>resetgame());


function checker(){
    for(let pattern of winPattern)
    {
        let box1 = boxes[pattern[0]].innerText;
        let box2 = boxes[pattern[1]].innerText;
        let box3 = boxes[pattern[2]].innerText;
        if(box1!="" && box2!="" && box3!="" && box1===box2 && box2===box3)
        {
           return true;
        }
    }
    return false;
};

function displayWinner(player)
{
    let displaybox = document.querySelector("#right");
    if(player == true)
    {
        displaybox.innerText = "O";
    }
    else
    {
        displaybox.innerText = "X";
    }
    winner.classList.remove("keephide");
    disable();
};

// Function to check if the game is tied
function checkTie() {
    let isTied = true;
    // Check if all boxes are filled
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isTied = false;
        }
    });
    // If all boxes are filled and no winner, it's a tie
    return isTied && !checker();
}

// Function to display tie message
function displayTie() {
    let leftDisplay = document.querySelector("#left");
    let rightDisplay = document.querySelector("#right");
    
    // Change the text to show it's a tie
    leftDisplay.innerText = "Game Tied!";
    rightDisplay.innerText = "";
    
    // Make winner display visible
    winner.classList.remove("keephide");
    disable();
}


let handler = (box) => {
  if (turn) {
    box.innerText = "O";
    box.style.fontSize = "100px";
    if(checker() == true)
    {
      displayWinner(turn);
    }
  } 
  else {
    box.innerText = "X";
    box.style.fontSize = "100px";
    if(checker() == true)
        {
          displayWinner(turn);
        }
  }
  turn = !turn;
  box.disabled = true;
  
  // Check for tie after each move if no winner is found
  if (!checker() && checkTie()) {
    displayTie();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => handler(box));
});
