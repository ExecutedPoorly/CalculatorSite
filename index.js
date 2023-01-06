//operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
//const testy = document.getElementsByClassName("number");
//[id^='number-']
const Numbers = document.querySelectorAll("[id^='number-']");
const Operators = document.querySelectorAll("[id^='operator-']");
const ClearAll = document.querySelector("#clearall");
const ScreenTop = document.querySelector("#ScreenTop");
const ScreenBtm = document.querySelector("#ScreenBtm");
const Equals = document.querySelector("#equalall");
const Backspace = document.querySelector("#backspace");
const Dot = document.querySelector("#dot");

let LastOperator = "0";
let CurrentOperator = "0";
let CurrentNumber = "0";
let PreviousNumber = ""; //must stay empty or errors appear;
let MemoryNumber = 10; //displayed at top of screen
let LastInput = 
///event listeners--------------------------------------------------
ClearAll.addEventListener('click', function() {
  Total = "0", CurrentNumber = "0", MemoryNumber = "0", PreviousNumber = "";//empty 
  RefreshUI();
});

Dot.addEventListener('click', function() {
  if (CurrentNumber.includes(".")){
    console.log("periodss");
  }
  else{
    CurrentNumber+= ".";
  }
  RefreshUI();
});

Backspace.addEventListener('click', function() {
  if (CurrentNumber)
  CurrentNumber = CurrentNumber.substring(0, CurrentNumber.length - 1);
  console.log(CurrentNumber);
  RefreshUI();
});

Equals.addEventListener('click', function() {
  operator();
});

Numbers.forEach((NumberButton) =>
  NumberButton.addEventListener('click', function() {
    NumberPressed(NumberButton);
  }));

Operators.forEach((OperatorButton) =>
  OperatorButton.addEventListener('click', function() {
    OperatorPressed(OperatorButton);
  }));
///event listeners ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

function NumberPressed(x) {

  CurrentNumber += x.innerHTML;
  LastOperator = CurrentOperator;
  RefreshUI();
}
function OperatorPressed(x) {

  CurrentOperator = x.innerHTML;
  if (x.innerHTML === "+/-") {
    if (CurrentNumber == 0) {
      Error("Enter a value");
    }
    else {
      SwapNegative();
    }
  }    
  else if (PreviousNumber != "" || LastOperator == "÷") {
    operator(x.innerHTML, "idk");
  }
    
  else {
    console.log("ERROR ERROR ERROR", LastOperator);
    PreviousNumber = parseFloat(CurrentNumber);
    CurrentNumber = "0";
    RefreshUI();
  }
}

function operator(x) {

  if (LastOperator == "÷") { //divison
    if (CurrentNumber == 0)
      Error("DivideByZero");
    else if (PreviousNumber == 0) {
      CurrentNumber = "";
      PreviousNumber = 0;
      RefreshUI();
    }
    else {
      console.log("divvy");
      PreviousNumber = (parseFloat(PreviousNumber) / parseFloat(CurrentNumber));
      RefreshUI();
    }

  }
  else if (LastOperator == "x") { //multiplication
    PreviousNumber = (CurrentNumber * PreviousNumber);
    CurrentNumber = 0;
    RefreshUI();
  }
  else if (LastOperator == "-") { //subtract
    PreviousNumber = (PreviousNumber - CurrentNumber);
    CurrentNumber = 0;
    RefreshUI();
  }
  else if (LastOperator == "+") { //subtract
    PreviousNumber = (PreviousNumber + CurrentNumber);
    CurrentNumber = 0;
    RefreshUI();
  }
  // else if (x=="x"){
  //   PreviousNumber = (parseInt(PreviousNumber) * parseInt(CurrentNumber));
  //   CurrentNumber = "";
  //   RefreshUI();
  // }
  // else {
  //   pass;
  // }
}
function SwapNegative() {
  CurrentNumber = (parseFloat(CurrentNumber) * -1).toString();
  console.log(typeof CurrentNumber);
  RefreshUI();
}

function RefreshUI() {
  //console.log("ran", PreviousNumber, CurrentNumber );
  ScreenTop.innerHTML = PreviousNumber;
  ScreenBtm.innerHTML = CurrentNumber;
  console.log(CurrentNumber);
}

function Error(x) {
  if (x == "DivideByZero") {
    alert("Can not Divide by Zero!");
    CurrentNumber = "";
    CurrentOperator = "÷";
  }
  else if (x == "Enter a value") {
    alert("Enter a value first");
    CurrentNumber = "";
    RefreshUI();
  }
}
function RemoveHyphen(){
    if (CurrentNumber=="-") {
      console.log("ddddddddddd");
      CurrentNumber="";
      RefreshUI();}
    else if (PreviousNumber=="-") {
      console.log("ddddddddddd");
      PreviousNumber = "";
      RefreshUI();
    }  
}

