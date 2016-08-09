function addMessage() {
  // TODO: your solution goes here
  //alert("New Comment Submitted.");
  
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      alert("Your comment has been submitted. Thank you.");
      window.location.href = './';
    } else if(xhttp.readyState == 4 && xhttp.status > 200) {
      alert("Something went wrong. Please try again.");
      return false;
    }
  }
  xhttp.open("POST", apiEndpointBase + "/comments", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({comment: {createdBy:document.getElementById("createdBy").value, commentText:document.getElementById("commentText").value, isImportant:document.getElementById("isImportant").checked}}));
  
  
  return false;
}

/*

{
  "comment": {
    "createdBy": "",
    "commentText": "",
    "isImportant": false
  }
}

*/