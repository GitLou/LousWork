<?php
  define('STEAM_WEB_API_KEY', 'B9D6EFF617D08B9D29660D56CA2E455D');
  
  define('SSH_SERVER_ADDR', '158.69.139.234');  // SSH Ip
  define('SSH_SERVER_PORT', 27022);             // SSH Port
  define('SSH_SERVER_USER', 'root');            // SSH Username
  define('SSH_SERVER_PASS', 'qaq3Gh');          // SSH Password
  
  define('RCON_SERVER_ADDR', '158.69.139.234'); // RCON IP
  define('RCON_SERVER_PORT', 27020);            // RCON Port
  define('RCON_SERVER_PASS', 'qaq3Gh');         // RCON Password
  define('RCON_SERVER_TIMEOUT', 3);             // RCON Timeout

  define('NOT_AUTH_MSG', "You are not authorized to view this page.<br />If you feel this is a mistake, contact the Game Server Admin to request access.<br /><br />Sorry for any inconvenience.");

  $admins = array(
		array("76561198067491378",'Lou'),
		array("76561198085135063",'Ginger'),
		array("76561198003963833",'Thodd')
	);
			
	$moderators = array(
		array("76561198067491378",'Lou'),
		array("76561198085135063",'Ginger'),
		array("76561198003963833",'Thodd'),
		array("76561198006554010",'Starmatske'),
		array("76561198171506171",'Hairy Horses "General"')
	);
/*  
  define('STEAM_WEB_API_KEY', '');          //Steam Web APi Key: http://steamcommunity.com/dev/registerkey

  define('SSH_SERVER_ADDR', '127.0.0.1');   // SSH Ip
  define('SSH_SERVER_PORT', 22);            // SSH Port
  define('SSH_SERVER_USER', '');            // SSH Username
  define('SSH_SERVER_PASS', '');            // SSH Password

  define('RCON_SERVER_ADDR', '127.0.0.1');  // RCON IP
  define('RCON_SERVER_PORT', 27020);        // RCON Port
  define('RCON_SERVER_PASS', '');           // RCON Password / ARK Admin Password
  define('RCON_SERVER_TIMEOUT', 3);         // RCON Timeout
	
	define('NOT_AUTH_MSG', "You are not authorized to view this page.<br />If you feel this is a mistake, contact the Game Server Admin to request access.<br /><br />Sorry for any inconvenience.");
	
	$admins = array(
		array("STEAM64ID",'Comment/Name'),
		array("STEAM64ID",'Comment/Name')
	);
			
	$moderators = array(
		array("STEAM64ID",'Comment/Name'),
		array("STEAM64ID",'Comment/Name')
	);
*/  
?>