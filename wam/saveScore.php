<?php
if(isset($_POST[name])!=null){
  include '../acinf.php';
  $conn = new mysqli($servername, $username, $password, $dbname);
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  $sql = "SELECT * FROM `game1` WHERE name='{$_POST[name]}'";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  if($result->num_rows>0 && $_POST[score]>$row[score]){
  	$sql = "UPDATE game1 SET score={$_POST[score]} WHERE name='{$_POST[name]}'";
  	if ($conn->query($sql) === TRUE) {
  	} else {
  	   echo "Error updating record: " . $conn->error;
  	}
  }
}
$conn->close();
?>
