<?php
  include_once 'inc/dependencies.php';
  if (isset($_SESSION['logged_in'])) {
    unset($_SESSION['logged_in']);
  }

  header('Location: dashboard.php');
?>
