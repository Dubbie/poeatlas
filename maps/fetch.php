<?php
  include_once '../inc/dependencies.php';

  // Main Variables
  $maps = array();
  $search = isset($_POST['search']) ? '%'.trim(mysqli_real_escape_string($conn, $_POST['search'])).'%' : '%%';

  $stmt = $conn->prepare('SELECT `id`, `name`, `bonus`, `tier`, `unique` FROM `map` WHERE `name` LIKE ?');
  $stmt->bind_param('s', $search);
  $stmt->bind_result($_id, $_name, $_bonus, $_tier, $_unique);
  $stmt->execute();
  while ($stmt->fetch()) {
    $ma = $_unique === 0 ? ' Map' : '';
    $map = array();

    $map['id'] = $_id;
    $map['name'] = $_name.$ma;
    $map['bonus'] = $_bonus;
    $map['tier'] = $_tier;
    $map['unique'] = $_unique;
    $maps[] = $map;
  }
  $stmt->close();

  echo json_encode($maps);
?>
