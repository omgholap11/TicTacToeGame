let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newbtn = document.querySelector(".newgame");
let winner = document.querySelector(".winner");
let switchmode = document.querySelector("#switch");
let turn = true; 
const winPattern = [
[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[6,4,2],[0,4,8]];

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

function checkTie() {
    let isTied = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isTied = false;
        }
    });
    return isTied && !checker();
}

function displayTie() {
    let leftDisplay = document.querySelector("#left");
    let rightDisplay = document.querySelector("#right");
    
   
    leftDisplay.innerText = "Game Tied!";
    
    rightDisplay.innerText = "";
    
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
  
 
  if (!checker() && checkTie()) {
    displayTie();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => handler(box));
});
