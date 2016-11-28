<?php
  include_once '../inc/dependencies.php';

  if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true) {
    var_dump($_POST);
    $name = mysqli_real_escape_string($conn, trim($_POST['name']));
    $tier = intval($_POST['tier']);
    $bonus = mysqli_real_escape_string($conn, trim($_POST['bonus']));
    $unique = isset($_POST['unique']) ? 1 : 0;

    $stmt = $conn->prepare('INSERT INTO `map` (`name`, `tier`, `bonus`, `unique`) VALUES (?, ?, ?, ?)');
    $stmt->bind_param('sisi', $name, $tier, $bonus, $unique);
    $stmt->execute();
    $stmt->close();
  }

  header('Location: ../dashboard.php');
?>
