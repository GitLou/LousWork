<!doctype html>
<html class="no-js" lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title> ARK WebPanel | Powered By: PayneGaming </title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="assets/css/vendor.css">
  <link rel="stylesheet" href="assets/css/app.css">
  <link rel="stylesheet" href="assets/css/custom.css">
  <style type="text/css">
    .ui-widget-overlay {
      background: repeating-linear-gradient( 45deg, #CCC, #CCC 10px, #AAA 10px, #AAA 20px);
      background-color: #333;
      opacity: 0.5;
      filter: Alpha(Opacity=50);
      /* support: IE8 */
    }
  </style>
  <script type="text/javascript">
    var steamUserName = '<?=$personaName?>';
  </script>
</head>

<body>
  <div class="main-wrapper">
    <div class="app" id="app">
      <header class="header">
        <div class="header-block header-block-collapse hidden-lg-up"> <button class="collapse-btn" id="sidebar-collapse-btn">
    			<i class="fa fa-bars"></i>
    		</button> </div>
        <div class="header-block header-block-nav">
          <ul class="nav-profile">
            <li class="profile dropdown">
              <a class="nav-link" href="<?php echo $userProfile ?>" target="_blank">
                <div class="img" style="background-image: url('<?php echo $avatarURL ?>')"></div>
                <span class="name"><?php if($accessLevel == 1){echo $personaName." (Moderator)";}if($accessLevel == 2){echo $personaName." (Admin)";} ?></span>
              </a>
            </li>
          </ul>
        </div>
      </header>
      <aside class="sidebar">
        <div class="sidebar-container">
          <div class="sidebar-header">
            <div class="brand">
              <i class="fa fa-cubes fa-2x"></i>&nbsp;&nbsp;ARK WebPanel <sub><?=$siteVersion?></sub>
            </div>
          </div>
          <nav class="menu">
            <ul class="nav metismenu" id="sidebar-menu">
              <?php if($accessLevel < 2) { ?>
              <li class="active">
                <a href="#"> <i class="fa fa-rocket"></i> Basic </a>
              </li>
              <?php } else { ?>
              <li class="active">
                <a href="#"> <i class="fa fa-terminal"></i> Advanced </a>
              </li>
              <?php } ?>
              <li>
                <a href="http://ark.gamepedia.com/ARK_Survival_Evolved_Wiki" target="blank"><i class="fa fa-wikipedia-w" aria-hidden="true"></i> ARK GamePedia </a>
              </li>
              <li>
                <a href="http://steamcommunity.com/app/346110" target="blank"><i class="fa fa-steam" aria-hidden="true"></i> ARK Communiuty Hub </a>
              </li>
              <li><a><i class="fa fa-link" aria-hidden="true"></i> More Links Soon<sup><i class="fa fa-trademark" aria-hidden="true"></i></sup></a></li>
            </ul>
          </nav>
        </div>
        <div id="sshProgress" title="Executing Command">
        <div class="progress-label">Please wait while the command finishes...</div>
        <div id="progressbar"></div>
      </div>
      <div id="sshLog"></div>
      </aside>
      
      <div class="sidebar-overlay" id="sidebar-overlay"></div>
      <article class="content hidden basic-page">
        <section class="section">
          <div class="row sameheight-container">
            <div class="col col-xs-12 col-sm-12 col-md-8 col-lg-8 console">
              <div class="card tasks sameheight-item" data-exclude="xs,sm">
                <div class="card-header bordered">
                  <div class="header-block">
                    <h3 class="title">
                           <?php if($accessLevel > 1) { echo 'Advanced ';} ?>Console
                    </h3>
                  </div>
                </div>
                <div class="card-block">
                  <ul class="list-group" id="groupConsole">
                  </ul>
                  <div class="row">
                    <hr />
                    <div class="col-md-6 col-lg-6">
                      <label style="padding-top: 1%; float:left;"><input type="checkbox" id="chkAutoScroll" checked="true" > Auto scroll</label>
                    </div>
                    <div class="col-md-6 col-lg-6">
                      <button type="button" class="btn btn-primary" tabindex="0" id="btnClearLog" style="float:right;"><span class="fa fa-remove"></span> Clear Console</button>
                    </div>
                  </div>
                </div>
              </div>
              <?php if($accessLevel > 1) { ?>
              <div class="input-group">
                <input type="text" class="form-control" id="txtCommand">
                <div class="input-group-btn">
                  <button type="button" class="btn btn-primary" tabindex="-1" id="btnSend"><span class="fa fa-arrow-right"></span> Send</button>
                </div>
              </div>
              <?php } ?>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 commands">
              <div class="card tasks sameheight-item" data-exclude="xs,sm">
                <div class="card-header bordered">
                  <div class="header-block">
                    <h3 class="title">
                           RCON Commands
                    </h3>
                  </div>
                </div>
                <div class="card-block">
                  <div class="row sameheight-container">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                      <button type="button" class="btn btn-info btn-lg btn-block" onclick="sendCommand('SaveWorld');">Save The World</button>
                    </div>
                  </div>
                  <div class="row sameheight-container">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                      <?php
                        if($accessLevel < 2){
                          echo '<button type="button" class="btn btn-info btn-lg btn-block disabled">Destroy Wild Dinos</button>'; 
                        } else { 
                          echo '<button type="button" class="btn btn-info btn-lg btn-block" onclick="sendCommand(\'DestroyWildDinos\');">Destroy Wild Dinos</button>';
                        }
                      ?>
                    </div>
                  </div>
                  <div class="row sameheight-container">
                    <div class="col-sm-8 col-md-8 col-lg-8">
                      <input type="text" class="form-control" style="width:100%" id="broadcastMsg">
                    </div>
                    <div class="col-sm-4 col-md-4 col-lg-4">
                      <button type="button" class="btn btn-warning pull-right" onclick="sendCommand('Broadcast '+$('#brodcastMsg').val()); $('#broadcastMsg').val('').focus();">Broadcast Message</button>
                    </div>
                  </div>
                  <div class="row sameheight-container">
                    <div class="col-sm-8 col-md-8 col-lg-8">
                      <input type="text" class="form-control" style="width:100%" id="chatMsg">
                    </div>
                    <div class="col-sm-4 col-md-4 col-lg-4">
                      <button type="button" class="btn btn-warning pull-right"onclick="sendCommand('ServerChat '+steamUserName+': '+$('#chatMsg').val()); $('#chatMsg').val('').focus();">Server Chat Message</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 scripts">
              <div class="card tasks sameheight-item" data-exclude="xs,sm">
                <div class="card-header bordered">
                  <div class="header-block">
                    <h3 class="title">
                           Scripts
                    </h3>
                  </div>
                </div>
                <div class="card-block">
                  <div class="row sameheight-container">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                      <button id="gracefullReboot" type="button" onclick="javascript:runSSHScript(1, 55);" class="btn btn-success btn-lg btn-block"><i class="fa fa-power-off" aria-hidden="true"></i> Reboot Server</button>
                    </div>
                  </div>
                <?php if($accessLevel == 2) { ?>
                  <div class="row sameheight-container">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                      <button id="gracefullRestart "type="button" class="btn btn-success btn-lg btn-block disabled">Restart Game Server</button>
                    </div>
                  </div>
                  
                  <div class="row sameheight-container">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                      <button id="updateGame" type="button" class="btn btn-warning btn-lg btn-block disabled">Update Server</button>
                    </div>
                  </div>
                  
                  <div class="row sameheight-container">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                      <button id="updateMods" type="button" class="btn btn-warning btn-lg btn-block disabled">Update Mods</button>
                    </div>
                  </div>
                <?php } ?>  
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
      <footer class="footer">
        <div class="footer-block buttons"></div>
        <div class="footer-block author">
          <ul>
            <li> powered by <a href="http://paynegaming.org">PayneGaming</a> </li>
            <li>
              <a href="https://twitter.com/PayneGamingYT" target="_blank" title="Twitter" style="color:cyan"><i class="fa fa-twitter fa-2x"></i></a>
              <a href="https://youtube.com/c/PayneGamingCommunity" target="_blank" title="YouTube" style="color:red"><i class="fa fa-youtube fa-2x"></i></a>
              <a href="https://twitch.tv/TeamPayne" target="_blank" title="Twitch" style="color:purple"><i class="fa fa-twitch fa-2x"></i></a>
              <a href="https://reddit.com/r/paynegaming" target="_blank" title="Sub-Reddit" style="color:black"><i class="fa fa-reddit-alien fa-2x"></i></a>
              <a href="https://paypal.me/PayneGaming" target="_blank" title="Donate" style="color:blue"><i class="fa fa-paypal fa-2x"></i></a>
              <a href="http://www.piedpiper.com/" target="_blank" title="Pied Piper" style="color:limegreen"><i class="fa fa-pied-piper fa-2x"></i></a>
            </li>
          </ul>
        </div>
      </footer>
      <!--<script src="assets/js/vendor.js"></script>-->
      <script src="https://code.jquery.com/jquery-3.1.0.min.js" integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s=" crossorigin="anonymous"></script>
      <script src="http://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
      <script src="assets/js/app.js"></script>
      <script src="assets/js/rcon.js"></script>
      <script src="assets/js/ssh.js"></script>
      <script src="assets/js/custom.js"></script>
</body>
    
</html>