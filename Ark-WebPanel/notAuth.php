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
                <span class="name"><?php echo $personaName ?></span>
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
        </div>
      </aside>
      <div id='sshProgress'>
        <div>
          Loading Control Panel...
        </div>
        <div id='progressBar'></div>
      </div>
      <div class="sidebar-overlay" id="sidebar-overlay"></div>
      <article class="content hidden basic-page">
        <section class="section">
          <div class="row sameheight-container">
            <div class="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
              You are not authorized to view this page.<br /> If you feel this is a mistake, contact the Game Server Admin to request access.<br />
              <br /> Sorry for any inconvenience.
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
      <script src="https://code.jquery.com/jquery-3.1.0.min.js" integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s=" crossorigin="anonymous"></script>
      <script src="http://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
      <script src="assets/js/custom.js"></script>
</body>

</html>