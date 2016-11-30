<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>PoE - Atlas progression</title>

    <!-- Meta stuff -->
    <meta charset="utf-8">
    <meta name="author" content="Mihó Dániel">
    <meta name="description" content="A project to help people keep up with their atlas in a game called Path of Exile">
    <meta name="keywords" content="poe, path, of, exile, atlas, map, mapping, help, aid, path of exile">
    <meta name="robots" content="index">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96">

    <!-- Critical CSS -->
    <style media="screen">
      .version,a{font-weight:700}*{box-sizing:border-box}body,html{margin:0;padding:0}html{overflow-y:scroll}body{color:#ccc;background:#171717;font-family:Roboto,sans-serif}.wrapper{max-width:600px;margin:0 auto;padding-top:100px}.container{padding:0 5%}.text-center{text-align:center}a{color:#fff;text-decoration:none;border-bottom:1px solid transparent}header{position:relative}header .floating{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#1d1d1d;font-size:8em;z-index:-1}header h1{color:#fff;margin:0}header p{margin:0 0 2em}.version{font-size:12px;vertical-align:top;padding:.25em .5em;color:#fff;background:#264fe8}.input-group{display:block;margin-bottom:2em}.input-group label{display:block;font-size:.9em;font-weight:400;margin-bottom:.5em;color:#7d7d7d;font-weight:700;}.input-group input{background:#111;color:gray;font-size:1em;padding:.5em 1em;width:100%;border:1px solid #313131;border-top-left-radius:2px;border-top-right-radius:2px}#toolbar-container,#toolbar-container #toolbar .toolbar-button:first-of-type{border-top-left-radius:2px}#loader,.dd-container .dd,.input-group input.rounded{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.dd-container{z-index:99;position:relative}.dd-container .dd{position:absolute;left:0;top:100%;width:100%;color:#171717;background:#d9d9d9;box-shadow:0 2px 5px rgba(0,0,0,.5)}.dd-container .dd.hidden{display:none}#atlas-container{background:#000;position:fixed;top:0;left:0;width:100%;z-index:999}#atlas-container #atlas-numbers{font-size:12px;color:#fff;font-weight:700;position:absolute;top:5px;padding:.5em 0 1em;left:0;width:100%;text-align:center;text-shadow:1px 1px 2px #171717;background:linear-gradient(180deg,rgba(0,0,0,.75),transparent)}#atlas-container #atlas-bar{width:0;background:#589536;height:5px}#toolbar-container{background:#fff;color:#575757;border-top-right-radius:2px;box-shadow:0 2px 10px #171717}#toolbar-container #toolbar{display:flex;justify-content:center}#toolbar-container #toolbar .toolbar-button{position:relative;display:block;padding:.5em 1em;border-right:1px solid #e6e6e6}#toolbar-container #toolbar .toolbar-button:last-of-type{border-top-right-radius:2px;border-right:0}#toolbar-container #toolbar .toolbar-button:after{display:none;content:attr(data-tooltip-text);position:absolute;bottom:110%;left:50%;transform:translateX(-50%);color:#fff;background:rgba(0,0,0,.5);padding:.25em .5em;white-space:nowrap}#toolbar-container .red{color:#f33}#toolbar-container .green{color:#589536}#loader{background:#fff;color:#171717;border-top:1px solid #e6e6e6;padding:1em}footer{padding:2em 0 5em;font-size:.75em}footer p{margin:0 0 .5em}footer .footer-list{margin:0;padding:0}footer .footer-list li{display:inline-block}footer .footer-list li:after{content:"•";margin:0 .5em}footer .footer-list li:last-child:after{display:none}#top-button.hidden{opacity: 0}
    </style>

    <!-- Async loading of CSS files -->
    <link rel="stylesheet" href="css/master.min.css" media="none" onload="if(media!='all')media='all'">
    <noscript><link rel="stylesheet" href="css/master.min.css"></noscript>
  </head>
  <body>
    <div id="atlas-container">
      <div id="atlas-numbers">
        <span id="atlas-counter" class="atlas-number">0</span> / <span id="atlas-total" class="atlas-number">0</span>
      </div>
      <div id="atlas-bar"></div>
    </div>
    <span id="top-button" class="hidden">To the top</span>
    <div id="top" class="wrapper">
      <div class="container">
        <header class="text-center">
          <span class="floating"><i class="fa fa-globe" aria-hidden="true"></i></span>
          <h1>Atlas progression <span class="version">Beta</span></h1>
          <p>Choose your maps that you've completed in your atlas below.</p>
        </header>
        <form id="search-form" method="post">
          <div class="input-group dd-container">
            <label for="search-input">Search</label>
            <input type="text" class="dd-input rounded" id="search-input" name="search-input">
            <div class="dd hidden"></div>
          </div>
        </form>
        <div id="toolbar-container">
          <div id="toolbar">
            <span id="reset" class="toolbar-button" data-tooltip-text="Reset completed maps"><i class="fa fa-times red" aria-hidden="true"></i></span>
            <span id="complete" class="toolbar-button" data-tooltip-text="Complete all maps"><i class="fa fa-check green" aria-hidden="true"></i></span>
            <span id="expand" class="toolbar-button" data-tooltip-text="Expand tiers"><i class="fa fa-expand" aria-hidden="true"></i></span>
            <span id="toggle-incomplete" class="toolbar-button" data-tooltip-text="Show incomplete only"><i class="fa fa-filter" aria-hidden="true"></i></span>
          </div>
        </div>
        <div id="maps-container">
          <div id="loader">Loading maps...</div>
        </div>
      </div>
      <footer>
        <div class="container">
          <p>This site is fan-made and not affiliated with Grinding Gear Games in any way.</p>
          <ul class="footer-list">
            <li><a href="mailto:dev.mihodaniel@gmail.com">Contact me</a>, if you've found a bug or would like to request a feature</li>
          </ul>
        </div>
      </footer>
    </div>

    <!-- webpack script loader -->
    <script src="js/scripts.min.js"></script>
    <!-- FontAwesome -->
    <script src="https://use.fontawesome.com/2e1e27e45d.js"></script>
    <!-- WebFont -->
    <script type="text/javascript">
      WebFontConfig = {
        google: { families: [ 'Roboto:400,700' ] }
      };

      (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();
    </script>
    <!-- GoogleAnalytics -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-78843908-1', 'auto');
      ga('send', 'pageview');
    </script>
  </body>
</html>
