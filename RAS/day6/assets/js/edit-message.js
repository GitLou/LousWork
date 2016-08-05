var messageId = getQueryStringValue('messageId');

if (messageId) {
  messageId = parseInt(messageId, 10);
} else {
  alert("Sorry pal, you can't edit a message unless it's got an id!");
  window.location.href = './';
}

function getMessage() {  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState == 4 && xhttp.status > 200) {
      alert("Something went wrong. Please try again.");
      window.location.href = './';
    } else if(xhttp.readyState == 4 && xhttp.status == 200) {
      var response = JSON.parse(xhttp.responseText);
      document.getElementById("commentText").value = response.commentText;
      document.getElementById("isImportant").checked = response.isImportant;
    }
  }
  xhttp.open("GET", apiEndpointBase + "/comments/" + messageId, true);
  xhttp.send();
  return false;
}

function editMessage() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      alert("Your comment has been updated. Thank you.");
      window.location.href = './';
    } else if(xhttp.readyState == 4 && xhttp.status > 200) {
      alert("Something went wrong. Please try again.");
      return false;
    }
  }
  xhttp.open("PUT", apiEndpointBase + "/comments/" + messageId, true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({comment: {commentText:document.getElementById("commentText").value, isImportant:document.getElementById("isImportant").checked}}));
  return false;
}

getMessage();