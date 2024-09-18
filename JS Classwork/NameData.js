const names = new Array;

let Add = () => 
{
    names.push(document.getElementById("textInput").value);
    document.getElementById("textInput").value = null;
}

let Show = () =>
{
    document.getElementById("result").innerHTML = "Names: " + names;
}