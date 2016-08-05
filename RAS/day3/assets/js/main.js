var currentNumber = 0,
  lastNumber = 0,
  operand = 'NaN';

document.onkeydown = captureKeyPress;

function captureKeyPress(e) {
  e = e || window.event;
  var keyCode = e.keyCode;
  if (!!e.shiftKey) {
    switch (keyCode) {
      // Add
      case 187:
        operation('add');
        break;

        //Multiply
      case 56:
        operation('multiply');
        break;

        //Percent
      case 53:
        percent();
        break;

      case 16:
        break;

      default:
        console.log("SHIFT + " + String.fromCharCode(keyCode) + " is not a valid key.");
    }
  } else {
    switch (keyCode) {
      //Backspace
      case 46:
        backspace();
        break;
        //Number 1
      case 49:
      case 97:
        insertNumber('1');
        break;

        //Number 2
      case 50:
      case 98:
        insertNumber('2');
        break;

        //Number 3
      case 51:
      case 99:
        insertNumber('3');
        break;

        //Number 4
      case 52:
      case 100:
        insertNumber('4');
        break;

        //Number 5
      case 53:
      case 101:
        insertNumber('5');
        break;

        //Number 6
      case 54:
      case 102:
        insertNumber('6');
        break;

        //Number 7
      case 55:
      case 103:
        insertNumber('7');
        break;

        //Number 8
      case 56:
      case 104:
        insertNumber('8');
        break;

        //Number 9
      case 57:
      case 105:
        insertNumber('9');
        break;

        //Number 0
      case 48:
      case 96:
        insertNumber('0');
        break;

        //Decimal
      case 190:
      case 110:
        insertNumber('.');
        break;

        //Multiply
      case 106:
        operation('multiply');
        break;

        //Divide
      case 191:
      case 111:
        operation('divide');
        break;

        //Minus
      case 189:
      case 109:
        operation('minus');
        break;

        //Add
      case 107:
        operation('add');
        break;

        //Enter
      case 187:
      case 13:
        operation('total');
        break;

        //clear calc on Esc
        case 27:
        clearCalc();

      default:
        console.log(String.fromCharCode(keyCode) + " is not a valid key.");
    }
  }

}

function backspace() {
  if (currentNumber.length > 1) {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  } else {
    currentNumber = 0;
  }
  document.getElementById("result").innerHTML = parseFloat(currentNumber);
}

function clearCalc() {
  currentNumber = 0;
  lastNumber = 0;
  operand = 'NaN';
  document.getElementById("result").innerHTML = 0;
  var x = document.getElementsByClassName("operator");
  for (var i, i = 0; i < x.length; i++) {
    x[i].style.border = "thin solid #0A0A0A";
  }
  document.getElementById("clear").innerHTML = "AC";
}

function insertNumber(num) {
  currentNumber += num;
  document.getElementById("result").innerHTML = "";
  document.getElementById("result").innerHTML = parseFloat(currentNumber);
  document.getElementById("clear").innerHTML = "C";
}

function invertNum() {
  currentNumber *= -1;
  document.getElementById("result").innerHTML = parseFloat(currentNumber);
}

function percent() {
  lastNumber = parseFloat(currentNumber) / 100;
  currentNumber = '0';
  document.getElementById("result").innerHTML = parseFloat(lastNumber);
}

function operation(op) {
  var x = document.getElementsByClassName("operator");
  for (var i, i = 0; i < x.length; i++) {
    x[i].style.border = "1px solid #0A0A0A";
    x[i].style.boxSizing = "border-box";
  }
  switch (op) {
    case 'divide':
      lastNumber = currentNumber;
      currentNumber = 0;
      operand = '/';
      document.getElementById("division").style.border = "2px solid #151515";
      document.getElementById("division").style.borderWidth = "4px";
      break;
    case 'multiply':
      lastNumber = currentNumber;
      currentNumber = 0;
      operand = '*';
      document.getElementById("multiplication").style.border = "2px solid #151515";
      document.getElementById("multiplication").style.borderWidth = "4px";
      break;
    case 'subtract':
      lastNumber = currentNumber;
      currentNumber = 0;
      operand = '-';
      document.getElementById("subtraction").style.border = "2px solid #151515";
      document.getElementById("subtraction").style.borderWidth = "4px";
      break;
    case 'add':
      lastNumber = currentNumber;
      currentNumber = 0;
      operand = '+';
      document.getElementById("addition").style.border = "2px solid #151515";
      document.getElementById("addition").style.borderWidth = "4px";
      break;
    case 'total':
      
      
      
      switch (operand) {
        case '/':
          currentNumber = parseFloat(lastNumber) / parseFloat(currentNumber);
          if (!isFinite(currentNumber)) currentNumber = "NaN";
          break;
        case '*':
          currentNumber = parseFloat(lastNumber) * parseFloat(currentNumber);
          break;
        case '-':
          currentNumber = parseFloat(lastNumber) - parseFloat(currentNumber);
          break;
        case '+':
          currentNumber = parseFloat(lastNumber) + parseFloat(currentNumber);
          break;
        default:
          currentNumber = operand;
      }
      
      
      
      
      
      
      
      document.getElementById("result").innerHTML = currentNumber;
      break;
    default:
      console.log("Invalid Case: ".op);
  }
}