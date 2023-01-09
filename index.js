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
let LastHit = "";
let LastOperator = "0";
let CurrentOperator = "";
let CurrentNumber = "";
let PreviousNumber = ""; //must stay empty or errors appear;
let MemoryNumber = 10; //displayed at top of screen
let LastInput = "";

function NumberPressed(x) {
  LastHit = "Number";

  CurrentNumber += x.innerHTML;
  LastOperator = CurrentOperator;
  RefreshUI();
}
function OperatorPressed(x) {
  LastHit = "Operator";
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
    console.log("Operator hit", LastOperator);
    PreviousNumber = parseFloat(CurrentNumber);
    CurrentNumber = "";
    RefreshUI();
  }
}

function operator(x) {
  CheckForValidInput(); //Catches empty input fields.
  if (LastOperator == "÷") { //divison
    if (CurrentNumber == 0 || CurrentNumber == "")
      Error("DivideByZero", CurrentNumber, PreviousNumber);
    else if (PreviousNumber == 0) {
      CurrentNumber = "";
      PreviousNumber = 0;
      RefreshUI();
    }
    else if (CurrentOperator != "") {
      PreviousNumber = (parseFloat(PreviousNumber) / parseFloat(CurrentNumber));
      CurrentNumber = ""; //removing this, repeats the same operation with the same 'current value'
      RefreshUI();
    }

  }
  else if (LastOperator == "x" && CurrentOperator != "") { //multiplication
    if (CurrentNumber == "") {
      return;
    }
    else {
      PreviousNumber = (parseFloat(CurrentNumber) * parseFloat(PreviousNumber));
      CurrentNumber = "";
      RefreshUI();
    }

  }
  else if (LastOperator == "-" && CurrentOperator != "") { //subtract
    PreviousNumber = (parseFloat(CurrentNumber) - parseFloat(PreviousNumber));
    CurrentNumber = "";
    RefreshUI();
  }
  else if (LastOperator == "+" && CurrentOperator != "") { //subtract
    PreviousNumber = (parseFloat(CurrentNumber) + parseFloat(PreviousNumber));
    CurrentNumber = "";
    RefreshUI();
  }
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
  console.log(CurrentNumber, "CurrentNumberRefresh");
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

function CheckForValidInput() {
  if (CurrentNumber == "") {
    console.log(CurrentNumber, "null");
    return;
  }
}


///event listeners--------------------------------------------------
ClearAll.addEventListener('click', function() {
  Total = "0", CurrentNumber = "", MemoryNumber = "0", PreviousNumber = "";//empty 
  RefreshUI();
});

Dot.addEventListener('click', function() {
  if (CurrentNumber.includes(".")) { //checks if period exists.
  }
  else {
    CurrentNumber += ".";
  }
  RefreshUI();
});

Backspace.addEventListener('click', function() {
  CurrentNumber = CurrentNumber.substring(0, CurrentNumber.length - 1);
  if (CurrentNumber == "-") {
    CurrentNumber = "";
  }
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
