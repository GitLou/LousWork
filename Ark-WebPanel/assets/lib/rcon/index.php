<?php

include_once('rcon.php');
include_once(__DIR__ . '/../../../config.php');

$rcon = new Rcon(RCON_SERVER_ADDR, RCON_SERVER_PORT, RCON_SERVER_PASS, RCON_SERVER_TIMEOUT);

if(!isset($_POST['cmd'])){
	if(!isset($_GET['cmd'])){
		die("Error: No command received.");
	} else {
		$rconCMD = $_GET['cmd'];
	}
} else {
	$rconCMD = $_POST['cmd'];
}


if ($rcon->connect()){
	$rcon->send_command($rconCMD);
	echo preg_replace("/§./", "", $rcon->get_response());
} else {
	echo "Server unresponsive. It may be down.";
}

?>