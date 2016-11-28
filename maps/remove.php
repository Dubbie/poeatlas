<?php
  include_once '../inc/dependencies.php';

  if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true) {
    // Go through each ID
    $q = 'DELETE FROM `map` WHERE `id` IN (';

    foreach ($_POST['remove'] as $i => $id) {
      if ($i > 0) {
        $q .= ', ' . $id;
      } else {
        $q .= $id;
      }
    }

    $q .= ')';

    $stmt = $conn->prepare($q);
    $stmt->execute();
    $stmt->close();
  }

  header('Location: ../dashboard.php');
?>
