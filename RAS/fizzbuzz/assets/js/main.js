(function(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState == 4 && xhttp.status > 200) {
      alert("Something went wrong. Please try again.");
      window.location.href = './';
    } else if(xhttp.readyState == 4 && xhttp.status == 200) {
      document.querySelector("PRE").innerHTML = xhttp.responseText;
    }
  }
  xhttp.open("GET", "assets/js/fizzbuzz.js", true);
  xhttp.send();
})();

document.getElementById("runFizzBuzz").onclick = runScript;

function runScript(){
  var maxLen = document.getElementById("maxLength").value;
  var output = FizzBuzz(maxLen);
  document.querySelector("#scriptOutput").innerHTML = output;
}
