<?php
	$siteVersion = "v1.0.1";
  include('config.php');
  require("./assets/lib/steam/SteamSignIn.php");

	$accessLevel = 0;

  $steam64ID = SteamSignIn::validate();
  
	if($steam64ID == ""){
		echo "<meta http-equiv=\"refresh\" content=\"0;URL=".SteamSignIn::genUrl()."\">";
	} else {
    
    $userProfile = 'http://steamcommunity.com/profiles/'.$steam64ID;
	  $scrape = file_get_contents($userProfile);
	
	  $scrapePersonaName1 = explode("<span class=\"actual_persona_name\">", $scrape);
	  $scrapePersonaName2 = explode("</span>", $scrapePersonaName1[1]);
	  $personaName = trim($scrapePersonaName2[0]);
  
    $scrapeAvatar1 = explode("<link rel=\"image_src\" href=\"", $scrape);
	  $scrapeAvatar2 = explode("\">", $scrapeAvatar1[1]);
	  $avatarURL = $scrapeAvatar2[0];
    
    $scriptHashJS = "//None";
		
		for ($row = 0; $row < count($moderators); $row++) {
			if($moderators[$row][0] == $steam64ID){
				$accessLevel = 1;
			}
		}
		
		for ($row = 0; $row < count($admins); $row++) {
			if($admins[$row][0] == $steam64ID){
				$accessLevel = 2;
			}
		}
		
    if($accessLevel > 0) {
    	include("panel.php");
		} else {
      include("notAuth.php");
  	}
  }
?>