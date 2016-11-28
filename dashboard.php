<?php
  include_once 'inc/dependencies.php';

  // Simple login...
  if (isset($_POST['password']) && password_verify($_POST['password'], $pwHashed)) {
    $_SESSION['logged_in'] = true;
  }
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="css/dashboard.min.css" media="screen">
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <h1 class="text-center">Dashboard</h1>
        <?php if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true): ?>
          <div class="box">
            <div class="box-content">
              <h2>Maps</h2>
            </div>
            <div id="toolbar-container">
              <div id="toolbar">
                <span id="new-map-button" class="toolbar-button green" data-tooltip-text="Add new map"><i class="fa fa-plus-circle" aria-hidden="true"></i></span>
                <span id="remove-maps-button" class="toolbar-button red" data-tooltip-text="Remove selected maps"><i class="fa fa-times-circle" aria-hidden="true"></i></span>
                <a href="logout.php" class="toolbar-button" data-tooltip-text="Log out"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
              </div>
            </div>
            <form id="new-map-form" class="box hidden" action="maps/add.php" method="post">
              <div class="box-content">
                <div class="input-group">
                  <label for="name">Name</label>
                  <input type="text" id="name" name="name" class="long">
                </div>
                <div class="input-group">
                  <label for="tier">Tier</label>
                  <input type="number" id="tier" name="tier">
                </div>
                <div class="input-group">
                  <label for="bonus">Bonus</label>
                  <select name="bonus">
                    <?php
                      $stmt = $conn->prepare('SELECT DISTINCT `bonus` FROM `map` ORDER BY `bonus` ASC');
                      $stmt->bind_result($_bonus);
                      $stmt->execute();
                      while ($stmt->fetch()) {
                        echo "<option value='$_bonus'>$_bonus</option>";
                      }
                      $stmt->close();
                    ?>
                  </select>
                </div>
                <div class="input-group">
                  <label class="checkbox-label"><input type="checkbox" id="unique" name="unique">Unique</label>
                </div>
                <div class="input-group text-center">
                  <button type="submit" class="btn">Add map</button>
                </div>
              </div>
            </form>
            <form>
              <div class="input-group full">
                <label for="q">Search</label>
                <input type="text" id="q" name="q" placeholder="Search for maps here" class="long">
              </div>
            </form>
            <form id="maps-form" action="maps/remove.php" method="post">
              <table>
                <thead>
                  <tr>
                    <td></td>
                    <td class="text-right">id</td>
                    <td>name</td>
                    <td class="text-right">tier</td>
                    <td>bonus</td>
                    <td>unique</td>
                  </tr>
                </thead>
                <tbody>
                  <?php
                    $stmt = $conn->prepare('SELECT `id`, `name`, `tier`, `bonus`, `unique` FROM `map` ORDER BY `tier` ASC');
                    $stmt->bind_result($_id, $_name, $_tier, $_bonus, $_unique);
                    $stmt->execute();
                    while ($stmt->fetch()) {
                      $unique = $_unique == 1 ? 'Yes' : 'No';
                      echo "<tr class='map'><td><input type='checkbox' name='remove[]' value='$_id'/></td><td class='text-right'>$_id</td><td>$_name</td><td class='text-right'>$_tier</td><td>$_bonus</td><td>$unique</td></tr>";
                    }
                    $stmt->close();
                  ?>
                </tbody>
              </table>
            </form>
          </div>
          <script src="js/dashboard.js" async></script>
        <?php else: ?>
          <form method="post" id="login-form" class="box">
            <div class="box-content">
              <div class="input-group">
                <label for="password">Password</label>
                <input type="password" name="password" value="" class="long">
              </div>
              <div class="input-group text-center">
                <button type="submit" class="btn">Login</button>
              </div>
            </div>
          </form>
        <?php endif; ?>
      </div>
    </div>
    <script src="js/utilities.js" async></script>
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
  </body>
</html>
