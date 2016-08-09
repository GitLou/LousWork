var messagesContainer = $('#messagesContainer');
var type="";
var perPage = 7;

function updateCommentsShown(pageNum) {
  messagesContainer.html("");
  if($("#creatorName").html().indexOf('<i class="glyphicon glyphicon-user" aria-hidden="true">') != -1 || $("#creatorName").html().indexOf('<i class="glyphicon glyphicon-user" aria-hidden="true"></i> All Authors') != -1) {
    if($("#isImportant").is(':checked')){
      console.log("Show only important comments by all creators.");
      loadComments("allImportant", pageNum);
    } else {
      console.log("Show all comments by all creators.");
      loadComments("all", pageNum);
    }
  } else {
    if($("#isImportant").is(':checked')){
      console.log("Show only important comments created by " + $("#creatorName").html().slice(0,-33));
      loadComments("byCreatorImportant", pageNum);
    } else {
      console.log("Show all comments created by " + $("#creatorName").html().slice(0,-33));
      loadComments("byCreator", pageNum);
    }
  }
}

function updateDropdown(selectedName){$("#creatorName").html(selectedName + '&nbsp;<span class="caret"></span>');}

function loadComments(action, pageNum) {
  toggleSpinner(true);
  var callType, byName;
  switch (action) {
    case "allImportant":
      callType = "/important-comments";
      break;
    case "byCreator":
      byName = $("#creatorName").html().slice(0,-33);
      callType ="/comments-by-name/" + byName;
      break;
    case "byCreatorImportant":
      byName = $("#creatorName").html().slice(0,-33);
      callType ="/important-comments/" + byName;
      break;
    default:
      callType = "/comments";
  }
  $.get(apiEndpointBase + callType, function(response, status){
    if(status === "success"){
      toggleSpinner(false);
      showMessages(response, pageNum);
    }
  });
}

function addMessage() {
  window.location.href = './add-message.html';
}

function editMessage(messageId) {
  window.location.href = './edit-message.html?messageId=' + messageId;
}

function deleteMessage(messageId) {
  var result = confirm("Are you sure you want to delete this comment?\r\nPress OK to delete or Cancel.");
  if (result === true) {
    $.ajax({
      url: apiEndpointBase + '/comments/' + messageId,
      type: 'DELETE',
      success: function(){
        console.log("Deleting comment.");
        updateCommentsShown();
      }
    });
  }
}

function toggleSpinner(isVisible) {document.getElementById("loading").classList[isVisible ? 'add' : 'remove']('visible');}

function showMessages(messages, pageNum) {
  var i, message, n, x, y, h1, h2, h3,c1, c2, c3, t1, t2, t3, messageData, msgDate;
  if(!pageNum){
    pageNum = 0;
  }
  if (typeof messages === 'string') {
    messages = JSON.parse(messages);
  }

  // reverse sort so last updated is first!
  messages.sort(function(a, b) {
    if (a.updatedAt > b.updatedAt) {
      return -1;
    }
    
    if (a.updatedAt < b.updatedAt) {
      return 1;
    }

    return 0;
  });

  messagesContainer.html("");
  
  $('#page-selection').bootpag({
    total: messages.length / perPage,
    maxVisible: 5,
    page: pageNum,
    href: "#{{number}}",
    leaps: true,
    firstLastUse: true,
    first: 'First',
    last: 'Last',
    wrapClass: 'pagination',
    activeClass: 'active',
    disabledClass: 'disabled',
    nextClass: 'next',
    prevClass: 'prev',
    lastClass: 'last',
    firstClass: 'first'
  }).on("page", function(event, num){
    updateCommentsShown(num);
  });
  
  switch (type) {
    case "table":
      x = $('<table id="messageTable" class="col-lg-12"></table>)');
      $("#messagesContainer").append(x);
      
      y = $('<tr id="headRow"></tr>');
      $('#messageTable').append(y);
      
      h1 = $('<th class="col-lg-6">Message</th>');
      h2 = $('<th class="col-lg-4">Author</th>');
      h3 = $('<th class="col-lg-2">Actions</th>');
      $('#headRow').append(h1, h2, h3);
      
      n = 1;
      for(i=((pageNum * perPage)-perPage); i < (pageNum * perPage); i++) {
        message = messages[i];
        
        if (message.createdAt === message.updatedAt) {
          msgDate = 'Created ' + moment(message.createdAt).fromNow();
        } else {
          msgDate = 'Last updated ' + moment(message.updatedAt).fromNow();
        }
      
        y = x.insertRow(n);
        y.setAttribute("id", "r"+i);
        
        c1 = y.insertCell(0);
        c2 = y.insertCell(1);
        c3 = y.insertCell(2);
        
        c1.setAttribute("class", "comment col-lg-6");
        c2.setAttribute("class", "author col-lg-4");
        c3.setAttribute("class", "actions col-lg-2");
        
        c1.innerHTML = (message.isImportant ? '<span class="label label-danger">IMPORTANT</span>&ensp;' : '') + message.commentText;
        c2.innerHTML = message.createdBy + '<br />' + msgDate;
        c3.innerHTML = '<button class="btn btn-primary" onclick="editMessage(' + message.id + ')"><i class="glyphicon glyphicon-pencil"></i></button>' +
                        '<button class="btn btn-danger" onclick="deleteMessage(' + message.id + ')"><i class="glyphicon glyphicon-trash"></i></button>';
        
        n++;
      }
      break;
        
    default:
      console.log("Print as default");
      //messages.forEach(function(message) {
      for(i=((pageNum * perPage)-perPage); i < (pageNum * perPage); i++) {
        message = messages[i];
        var messageDiv = document.createElement("div");
        var messageTextDiv = document.createElement("div");
        var messageDateDiv = document.createElement("p");

          // message header
        var messageHtml = '<p>' + message.createdBy + (message.isImportant ? '&#160;<span class="label label-danger">IMPORTANT</span>' : '') + 
            '<button class="btn btn-danger pull-right" onclick="deleteMessage(' + message.id + ')"><i class="glyphicon glyphicon-trash"></i>' +
            '</button><button class="btn btn-primary pull-right" onclick="editMessage(' + message.id + ')"><i class="glyphicon glyphicon-pencil"></i></button></p>';
        
          // message text
        messageTextDiv.innerHTML = message.commentText;

          // message date
        if (message.createdAt === message.updatedAt) {
          messageDateDiv.innerHTML = 'Created ' + moment(message.createdAt).fromNow();
        } else {
          messageDateDiv.innerHTML = 'Last updated ' + moment(message.updatedAt).fromNow();
        }

        messageDateDiv.classList.add('date');

          // update message div
        messageDiv.classList.add('message');
        messageDiv.innerHTML = messageHtml;
        messageDiv.appendChild(messageTextDiv);
        messageDiv.appendChild(messageDateDiv);

        messagesContainer.append(messageDiv);
      }
    }
}

$(function(){
  var startPage;
  var action = new RegExp('[^/]+$', 'i' ); // Regex for grabbing characters after the last / in a string
  var host = new RegExp('(^.*)(?=\#)', 'i'); // Regex for grabbing character before the # in a string
  var string = action.exec(window.location.href); // Using above RegEx to strip out the navigation
  var hostname = host.exec(window.location.href); // Using the above RegEx to strip out the hostname
  
  if(string){ // If there is a query string to extract
    console.log(string[0].substring(1)); //set goTo to the first item in array
    startPage = string[0].substring(1);
  } else {
    startPage = 1;
  }
    
    $('#isImportant').change(function(){
      updateCommentsShown(startPage);
    });
  
    $.get(apiEndpointBase + "/comments-created-by-names", function (response, status){
      if(status === "success") {
        console.log("Populating creator list.");
        $("#creatorList").prepend('<li><a id="name0" href="#"><i class="glyphicon glyphicon-user" aria-hidden="true"></i> All Authors</a></li><li class="divider"></li>');
        $("#name0").on("click", function(){
          updateDropdown('<i class="glyphicon glyphicon-user" aria-hidden="true"></i>');
          updateCommentsShown(startPage);
        });
        $.each(response, function(index, value){
          index += 1;
          $("#creatorList").append("<li><a id='name"+index+"' href='#'>"+value+"</a></li>");
          $("#name"+index).on("click", function(event){
            updateDropdown($(this).html());
            updateCommentsShown(startPage);
          });
        });
        updateCommentsShown(startPage);
      }
    });
  
    $("#setView").change(function(){
      if(this.checked){
        type="table";
      } else {
        type="original";
      }
      updateCommentsShown(startPage);
    });
  });
