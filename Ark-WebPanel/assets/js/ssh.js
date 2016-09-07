$().ready(function() {
  var scriptSpeedInSeconds = 30;
  var p = 0;
});

function scriptHash(sID) {
  var cmd;
  switch (sID) {
    case 1:
      cmd = "./reboot.sh%200";
      break;
  }
  return cmd;
}

function runSSHScript(scriptID, timeout) {

  var datetime = getCurrentTime();
  datetime += " > ";
  datetime += "Executing: ";
  datetime += scriptHash(scriptID).replace('%20', ' ');
  $("#groupConsole").append('<li class="list-group-item">' + datetime + '</li>');

  var logg, progressTimer,
    progressbar = $("#progressbar"),
    progressLabel = $(".progress-label");

  $("#sshProgress").dialog({
    autoOpen: true,
    closeOnEscape: false,
    resizable: false,
    modal:true,
    buttons: {
      Close: function() {
        $("#sshProgress").dialog("close");
        progressbar.progressbar({
          value: 0
        });
      }
    },
    open: function() {
      console.log("SSH Command Sent.");
      $("#sshLog").load("assets/lib/ssh/?cmd=" + scriptHash(scriptID) + "&timeout=" + timeout + " pre", function(response, status, xhr) {
        if (status === "success") {
          logg = $("#sshLog > pre").html().replace('%20', ' ');
          console.log(logg);
          logNormal(logg);
        }
        if (status === "error") {
          logg = $("#sshLog > pre").html().replace('%20', ' ');
          console.log(logg);
          logDanger(logg);
        }
      });
      progressTimer = setTimeout(progress, 2000);
    }
  });

  progressbar.progressbar({
    value: false,
    change: function() {
      progressLabel.text("Current Progress: " + progressbar.progressbar("value") + "%");
    },
    complete: function() {
      progressLabel.text("Complete!");
      $(".ui-dialog button").last().trigger("focus");
      $("#sshProgress").dialog("close");
      progressbar.progressbar({
        value: 0
      });
    }
  });

  function progress() {
    var val = progressbar.progressbar("value") || 0;

    progressbar.progressbar("value", val + Math.floor(Math.random() * 3));

    if (val <= 99) {
      progressTimer = setTimeout(progress, 250);
    }
  }
}