$(document).ready(function() {

	var lastCommand = "";

	$("#txtCommand").bind("enterKey", function(e) {
		lastCommand = $("#txtCommand").val();
		sendCommand(lastCommand);
	});

	$("#txtCommand").keyup(function(e) {
		if (e.keyCode == 13) {
			$(this).trigger("enterKey");
			$(this).val("");
		}
		if (e.keyCode == 38) {
			$(this).val(lastCommand);
		}
	});

	$("#btnSend").click(function() {
		if ($("#txtCommand").val() !== "") $("#btnSend").prop('disabled', true);
		sendCommand($("#txtCommand").val());
		if ($("#chkAutoScroll").is(':checked')) scrollLogsDown();
	});

	$("#btnClearLog").click(function() {
		$("#groupConsole").empty();
	});
	
	(function(){
		var datetime = getCurrentTime();
		datetime += " > ";
		datetime += "Connecting...";
		$("#groupConsole").append('<li class="list-group-item list-group-item-info">Welcome to ARK RCON Console.</li>');
		$("#groupConsole").append('<li class="list-group-item list-group-item-warning"><b>Warning:</b> This console is only configured to show results of commands.</li>');
		$("#groupConsole").append('<li class="list-group-item list-group-item-success">' + datetime + '</li>');
		setTimeout(function(){
			logSuccess("Connected")
		}, 1500);
	})();

});

function logNormal(log) {
	log = log.replace("%20", " ");
	datetime = getCurrentTime();
	datetime += " < ";
	var fullLog = datetime + log;
	$("#groupConsole").append('<li class="list-group-item">' + fullLog + '</li>');
	$("#btnSend").prop('disabled', false);
	clearOldLogs();
}

function logSuccess(log) {
	log = log.replace("%20", " ");
	datetime = getCurrentTime();
	datetime += " < ";
	var fullLog = datetime + log;
	$("#groupConsole").append('<li class="list-group-item list-group-item-success">' + fullLog + '</li>');
	$("#btnSend").prop('disabled', false);
	clearOldLogs();
}

function logInfo(log) {
	log = log.replace("%20", " ");
	datetime = getCurrentTime();
	datetime += " < ";
	var fullLog = datetime + log;
	$("#groupConsole").append('<li class="list-group-item list-group-item-info">' + fullLog + '</li>');
	$("#btnSend").prop('disabled', false);
	clearOldLogs();
}

function logWarning(log) {
	log = log.replace("%20", " ");
	datetime = getCurrentTime();
	datetime += " < ";
	var fullLog = datetime + log;
	$("#groupConsole").append('<li class="list-group-item list-group-item-warning">' + fullLog + '</li>');
	$("#btnSend").prop('disabled', false);
	clearOldLogs();
}

function logDanger(log) {
	log = log.replace("%20", " ");
	datetime = getCurrentTime();
	datetime += " < ";
	var fullLog = datetime + log;
	$("#groupConsole").append('<li class="list-group-item list-group-item-danger">' + fullLog + '</li>');
	$("#btnSend").prop('disabled', false);
	clearOldLogs();
}

function sendCommand(command) {
	console.log("Command: "+command);
	if (command === "") {
		return;
	}
	var datetime = getCurrentTime();
	datetime += " > ";
	datetime += command;

	$("#groupConsole").append('<li class="list-group-item">' + datetime + '</li>');
	clearOldLogs();
	$.get("./assets/lib/rcon/index.php?cmd="+command).done(function(data) {
		console.log("Data: " + data);
		if (data.indexOf("Unknown command") != -1) {
			logDanger(data);
			clearOldLogs();
			if ($("#chkAutoScroll").is(':checked')) scrollLogsDown();
			return;
		} else if (data.indexOf("Usage") != -1) {
			logWarning(data);
			if ($("#chkAutoScroll").is(':checked')) scrollLogsDown();
			return;
		} else {
			logNormal(data);
		}
		$("#btnSend").prop('disabled', false);
		clearOldLogs();
		if ($("#chkAutoScroll").is(':checked')) scrollLogsDown();
	}).fail(function() {
		datetime = getCurrentTime();
		datetime += " < ";
		datetime += "Error!";
		$("#groupConsole").append('<li class="list-group-item list-group-item-danger">' + datetime + '</li>');
		$("#btnSend").prop('disabled', false);
		clearOldLogs();
		if ($("#chkAutoScroll").is(':checked')) scrollLogsDown();
	});
	if ($("#chkAutoScroll").is(':checked')) scrollLogsDown();
}

function clearOldLogs() {
	var logItemSize = $("#groupConsole li").length;
	if (logItemSize > 50) {
		$('#groupConsole li:first').remove();
	}
}

function scrollLogsDown() {
	$("#groupConsole").scrollTop($("#groupConsole").get(0).scrollHeight);
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getCurrentTime() {
	var currentdate = new Date();
	var datetime = addZero(currentdate.getHours()) + ":" +
		addZero(currentdate.getMinutes()) + ":" +
		addZero(currentdate.getSeconds());
	return datetime;
}