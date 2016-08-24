<?php
  include_once(__DIR__ . '/../../../config.php');
  include_once( __DIR__ . '/Net/SSH2.php');
  include_once( __DIR__ . '/File/ANSI.php');
  
  /*if(isset($_POST['cmd'])){
    define('SSH_CMD', $_POST['cmd']);
  } elseif (isset($_GET['cmd'])) {*/
    define('SSH_CMD', $_GET['cmd']);
    define('SSH_CMD_TIMEOUT', $_GET['timeout'] + 5);
  /*} else {
    exit("Fatal Error: No command specified.");
  }*/
  
  $ssh = new Net_SSH2(SSH_SERVER_ADDR, SSH_SERVER_PORT, SSH_CMD_TIMEOUT);
  if (!$ssh->login(SSH_SERVER_USER, SSH_SERVER_PASS)) {
    exit('Login Failed');
  }
  $ansi = new File_ANSI();
  $ssh->enablePTY();
  $ansi->appendString("");
  $ssh->exec(SSH_CMD."\n");
  $ansi->appendString($ssh->read());
  $ansi->appendString("Done.\n");
  
  echo $ansi->getScreen();
?>