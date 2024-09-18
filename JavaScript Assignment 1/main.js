onload = Reset;

function Add()
{   
    var firstNumber = Number(document.getElementById("firstNumber").value);
    document.getElementById("firstNumber").value = null;
    var secondNumber = Number(document.getElementById("secondNumber").value);
    document.getElementById("secondNumber").value = null;
    var calc = firstNumber + secondNumber;

    ErrorCheck(calc);
}

function Subtract()
{   
    var firstNumber = Number(document.getElementById("firstNumber").value);
    document.getElementById("firstNumber").value = null;
    var secondNumber = Number(document.getElementById("secondNumber").value);
    document.getElementById("secondNumber").value = null;
    var calc = firstNumber - secondNumber;

    ErrorCheck(calc);
}

function Times()
{   
    var firstNumber = Number(document.getElementById("firstNumber").value);
    document.getElementById("firstNumber").value = null;
    var secondNumber = Number(document.getElementById("secondNumber").value);
    document.getElementById("secondNumber").value = null;
    var calc = firstNumber * secondNumber;

    ErrorCheck(calc);
}

function Divide()
{   
    var firstNumber = Number(document.getElementById("firstNumber").value);
    document.getElementById("firstNumber").value = null;
    var secondNumber = Number(document.getElementById("secondNumber").value);
    document.getElementById("secondNumber").value = null;
    var calc = firstNumber / secondNumber;

    ErrorCheck(calc);
}

function ErrorCheck(calc) 
{
    if (calc % 1 != 0)
    {
        calc = calc.toFixed(2);
    }

    if (calc > 99999999 || calc < -99999999)
    {
        document.getElementById("result").innerHTML = "Error";
    }

    else 
    {
        document.getElementById("result").innerHTML = calc;
    }
}

function Reset()
{
    document.getElementById("result").innerHTML = "0.00";
}


