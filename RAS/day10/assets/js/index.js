var messagesContainer = $('#messagesContainer');
var type = "";
var perPage = 7;
var msgId;
var apiUpdate;

function updateCommentsShown(pageNum) {
  if ($("#creatorName").html().indexOf('<i class="glyphicon glyphicon-user" aria-hidden="true">') != -1 || $("#creatorName").html().indexOf('<i class="glyphicon glyphicon-user" aria-hidden="true"></i> All Authors') != -1) {
    if ($("#isImportant").is(':checked')) {
      loadComments("allImportant", pageNum);
    } else {
      loadComments("all", pageNum);
    }
  } else {
    if ($("#isImportant").is(':checked')) {
      loadComments("byCreatorImportant", pageNum);
    } else {
      loadComments("byCreator", pageNum);
    }
  }
}

function updateDropdown(selectedName) {
  $("#creatorName").html(selectedName + '&nbsp;<span class="caret"></span>');
}

function filterComments(jsonString, filterBy) {
  var byName, tmpJson, tmp;
  var destringify = JSON.parse(jsonString);
  //byName ="Lou";
  switch (filterBy) {
    case "allImportant":
      notyAlert('info', 'Showing All Important Messages');

      //v1
      /*response = $(destringify).filter(function(i, n) {
        return n.isImportant !== false;
      });*/

      //v2 recommended by w3schools
      response = [];
      for (var i = 0; i < destringify.length; i++) {
        if (destringify[i].isImportant) {
          response.push(destringify[i]);
        }
      }
      break;
    case "byCreator":
      byName = $("#creatorName").html().slice(0, -33);
      notyAlert('info', 'Showing Messages by ' + byName + '.');

      //v1
      /*response = $(destringify).filter(function(i, n) {
        return n.createdBy === byName;
      });*/

      //v2 recommended by w3schools
      response = [];
      for (var i = 0; i < destringify.length; i++) {
        if (destringify[i].createdBy === byName) {
          response.push(destringify[i]);
        }
      }
      break;
    case "byCreatorImportant":
      byName = $("#creatorName").html().slice(0, -33);
      notyAlert('info', 'Showing All Important Messages by ' + byName + '.');

      //v1 following above format
      /*response = $(destringify).filter(function(i, n){
        return   n.createdBy === byName && n.isImportant !== false;
      });*/

      //v2 recommended by w3schools
      response = [];
      for (var i = 0; i < destringify.length; i++) {
        if (destringify[i].createdBy === byName && destringify[i].isImportant) {
          response.push(destringify[i]);
        }
      }
      break;
    default:
      notyAlert('info', 'Showing All Messages.');
      response = destringify;

  }

  tmp = '[';
  $.each(response, function(i, v) {
    tmp += '{';
    tmp += '"commentText": "' + response[i].commentText + '", ';
    tmp += '"createdAt": "' + response[i].createdAt + '", ';
    tmp += '"createdBy": "' + response[i].createdBy + '", ';
    tmp += '"id": ' + response[i].id + ', ';
    tmp += '"isImportant": ' + response[i].isImportant + ', ';
    tmp += '"updatedAt": "' + response[i].updatedAt + '"';
    tmp += '},';
  });
  tmp = tmp.substring(0, tmp.length - 1);
  tmp += ']';

  return (tmp);
}

function loadComments(action, pageNum) {
  var callType, byName, z;
  if (apiUpdate) {
    console.log("Using API Return values.");
    z = filterComments(apiUpdate, action);
    showMessages(JSON.parse(z), pageNum);
  } else {
    console.log("New call to server.");
    $.get(apiEndpointBase + '/comments', function(response, status) {
      if (status === 'success') {
        apiUpdate = JSON.stringify(response);
        //z = filterComments(apiUpdate, action);
        showMessages(response, pageNum);
        toggleSpinner(false);
      }
    });
  }
  
}

function addMessage() {
  toggleSpinner(true);
  var myData = {
    comment: {
      createdBy: $("#createdBy")[0].value,
      commentText: $("#commentText")[0].value,
      isImportant: $("#isImportant")[0].checked
    }
  };
  myData = JSON.stringify(myData);

  var jqxhr = $.ajax({
    url: apiEndpointBase + "/comments",
    type: "POST",
    data: myData,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(result) {
      apiUpdate = JSON.stringify(result);
      updateCommentsShown(1);
      notyAlert('success', 'Your new message has been added to the board.');
      toggleSpinner(false);
    },
    error: function() {
      notyAlert('error', 'Failed to add message, please try again.');
      toggleSpinner(false);
    }
  });
}

function getMessage(messageId) {
  msgId = messageId;
  $.get(apiEndpointBase + "/comments/" + msgId, function(response, status) {
    if (status === "success") {
      $("textarea#editCommentText.form-control").val(response.commentText);
      $("input#editIsImportant").prop("checked", response.isImportant);
    }
  });
}

function editMessage() {
  toggleSpinner(true);

  var myData = {
    comment: {
      commentText: $("#editCommentText").val(),
      isImportant: $("#editIsImportant").prop("checked")
    }
  };
  myData = JSON.stringify(myData);

  var jqxhr = $.ajax({
    url: apiEndpointBase + "/comments/" + msgId,
    type: "PUT",
    data: myData,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(result) {
      apiUpdate = JSON.stringify(result);
      updateCommentsShown(1);
      notyAlert('success', 'Messsage has been updated.');
      toggleSpinner(false);
    },
    error: function(xhr, status, error) {
      notyAlert('error', 'Failed to update message, please try again.');
      console.log(xhr.responseText);
      toggleSpinner(false);
    }
  });
}

function deleteMessage(messageId) {
  toggleSpinner(true);
  var result = confirm("Are you sure you want to delete this comment?\r\nPress OK to delete or Cancel.");
  if (result === true) {
    $.ajax({
      url: apiEndpointBase + '/comments/' + messageId,
      type: 'DELETE',
      success: function(result) {
        apiUpdate = JSON.stringify(result);
        updateCommentsShown(1);
        notyAlert('success', 'Message has been deleted.');
        toggleSpinner(false);
      },
      error: function() {
        notyAlert('error', 'Failed to delete message, please try again.');
        toggleSpinner(false);
      }
    });
  }
}

function toggleSpinner(isVisible) {
  document.getElementById("loading").classList[isVisible ? 'add' : 'remove']('visible');
}

function showMessages(messages, pageNum) {
  var i, message, n, x, y, h1, h2, h3, c1, c2, c3, t1, t2, t3, messageData, msgDate, maxLen, totalShown, maxVis;

  if (!pageNum) {
    pageNum = 0;
  }
  if (typeof messages === 'string') {
    messages = JSON.parse(messages);
  }

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
  
  if(messages.length % perPage){
        maxLen = messages.length;
        
      } else {
         maxLen = pageNum * perPage;
      }

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

      for (i = ((pageNum * perPage) - perPage); i < maxLen; i++) {
        message = messages[i];

        if (message.createdAt === message.updatedAt) {
          msgDate = 'Created ' + moment(message.createdAt).fromNow();
        } else {
          msgDate = 'Last updated ' + moment(message.updatedAt).fromNow();
        }

        y = $('<tr id="r' + i + '"></tr>');
        $('#messageTable').append(y);

        c1 = $('<td class="comment col-lg-6"></td>').html((message.isImportant ? '<span class="label label-danger">IMPORTANT</span>&ensp;' : '') + message.commentText);
        c2 = $('<td class="author col-lg-4"></td>').html(message.createdBy + '<br />' + msgDate);
        c3 = $('<td class="actions col-lg-2"></td>').html('<button class="btn btn-primary" id="editMessage' + message.id + '"><i class="glyphicon glyphicon-pencil"></i></button>' + '<button class="btn btn-danger" id="deleteMessage' + message.id + '"><i class="glyphicon glyphicon-trash"></i></button>');
        $("#r" + i).append(c1, c2, c3);

        var v = message.id;
        $("#editMessage" + message.id).click(
          (function(v) {
            return function() {
              createModalDialog('./editMsg.html', 'edit');
              getMessage(v);
            }
          })(v)
        );
        $("#deleteMessage" + message.id).click(
          (function(v) {
            return function() {
              deleteMessage(v);
            }
          })(v)
        );
      }
      break;

    default:
      for (i = ((pageNum * perPage) - perPage); i < maxLen; i++) {
        message = messages[i];
        var messageDiv = $('<div class="message"></div>'); //document.createElement("div");
        var messageTextDiv = $('<div></div>'); //document.createElement("div");
        var messageDateDiv = $('<p class="date"></p>'); //document.createElement("p");

        // message header
        var messageHtml = '<p>' + message.createdBy + (message.isImportant ? '&#160;<span class="label label-danger">IMPORTANT</span>' : '') +
          '<button class="btn btn-danger pull-right" id="deleteMessage' + message.id + '"><i class="glyphicon glyphicon-trash"></i>' +
          '</button><button class="btn btn-primary pull-right" id="editMessage' + message.id + '"><i class="glyphicon glyphicon-pencil"></i></button></p>';

        // message text
        messageTextDiv.html(message.commentText);

        // message date
        if (message.createdAt === message.updatedAt) {
          messageDateDiv.html('Created ' + moment(message.createdAt).fromNow());
        } else {
          messageDateDiv.html('Last updated ' + moment(message.updatedAt).fromNow());
        }

        // update message div
        $(messageDiv).html(messageHtml);
        $(messageDiv).append(messageTextDiv);
        $(messageDiv).append(messageDateDiv);

        $("#messagesContainer").append(messageDiv);
        var u = message.id;
        $("#editMessage" + message.id).click(
          (function(u) { //Imediately Invoked Function Expression
            return function() {
              createModalDialog('./editMsg.html', 'edit');
              getMessage(u);
            }
          })(u)
        );
        $("#deleteMessage" + message.id).click(
          (function(u) {
            return function() {
              deleteMessage(u);
            }
          })(u)
        );
      }
  }
  
  if(messages.length % perPage){
    totalShown = messages.length;
    maxVis = 1;
  } else {
    totalShown = messages.length / perPage;
    maxVis = 5;
  }
  
  $('#page-selection').bootpag({
    total: totalShown,
    maxVisible: maxVis,
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
  }).on("page", function(event, num) {
    updateCommentsShown(num);
  });
}

function createModalDialog(url, type) {
  $('body').css("overflow", "hidden");
  $("#dialog").load(url, function(response, status, xhr) {
    if (status === "success") {
      $("#dialog").dialog({
        autoOpen: true,
        width: 800,
        modal: true,
        buttons: {
          Submit: function() {
            switch (type) {
              case 'edit':
                editMessage();
                break;
              default:
                addMessage();
            }
            $(this).dialog("close");
            $('body').css("overflow", "visible");
          },
          Cancel: function() {
            $(this).dialog("close");
            $('body').css("overflow", "visible");
          }
        }
      });
      switch (type) {
        case 'edit':
          $('#dialog').dialog('option', 'title', 'Edit message');
          break;
        default:
          $('#dialog').dialog('option', 'title', 'Add a message');
      }
    }
  });

}

$(function() {
  var startPage;
  var action = new RegExp('[^/]+$', 'i'); // Regex for grabbing characters after the last / in a string
  var host = new RegExp('(^.*)(?=\#)', 'i'); // Regex for grabbing character before the # in a string
  var string = action.exec(window.location.href); // Using above RegEx to strip out the navigation
  var hostname = host.exec(window.location.href); // Using the above RegEx to strip out the hostname

  toggleSpinner(true);

  $('#setView').bootstrapToggle('off');
  $('#isImportant').bootstrapToggle('off');

  $("#addMessage").click(function() {
    createModalDialog('./addMsg.html', 'add');
  });

  if (string) { // If there is a query string to extract
    startPage = string[0].substring(1);
    if (startPage < 1) {
      startPage = 1;
    }
  } else {
    startPage = 1;
  }

  $('#isImportant').change(function() {
    updateCommentsShown(startPage);
  });

  $.get(apiEndpointBase + "/comments-created-by-names", function(response, status) {
    if (status === "success") {
      $("#creatorList").prepend('<li><a id="name0" href="#"><i class="glyphicon glyphicon-user" aria-hidden="true"></i> All Authors</a></li><li class="divider"></li>');
      $("#name0").on("click", function() {
        updateDropdown('<i class="glyphicon glyphicon-user" aria-hidden="true"></i>');
        updateCommentsShown(startPage);
      });
      $.each(response, function(index, value) {
        index += 1;
        $("#creatorList").append("<li><a id='name" + index + "' href='#'>" + value + "</a></li>");
        $("#name" + index).on("click", function(event) {
          updateDropdown($(this).html());
          updateCommentsShown(startPage);
        });
      });
      updateCommentsShown(startPage);
    }
  });

  $("#setView").change(function() {
    if (this.checked) {
      type = "table";
      notyAlert('info', 'Displaying as a table.');
    } else {
      type = "original";
      notyAlert('info', 'Displaying in the original format.');
    }
    updateCommentsShown(startPage);
  });

  $("body").append($('<div id="dialog"></div>'));
});