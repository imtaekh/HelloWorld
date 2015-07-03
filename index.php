<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
  <meta<?php echo ($_COOKIE["yourName"])?" name='viewport' content='width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;'":""; ?>>
  <link rel="stylesheet" href="indexStyle.css.php">
<?php
$msg = "";
if(isset($_POST[loginErr])){
  if($_POST[loginErr]=="wrongName"){
    $msg = "Name should be 4~20 digit English alphabets/numbers.";
  } else if($_POST[loginErr]=="duplicatedName"){
    $msg = "Someone is already using the Name, please choose a different name.";
  } else if($_POST[loginErr]=="wrongInfo"){
    $msg = "wronginfo";
  }
}
if($_COOKIE["yourName"]){
	include 'acinf.php';
  $conn = new mysqli($servername, $username, $password, $dbname);
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  $sql = "SELECT * FROM `game1` WHERE name='{$_COOKIE["yourName"]}'";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $passcode = $row[passcode];
  $conn->close();
}
?>
	<title>HelloWorld</title>
</head>
<body>
<div id="signUpDiv">

<form action="signUp.php" method="post">
  <H2>Tell me your name :)</H2>
  <input type="text" class="signUp" name="yourName" value="" onblur="this.value=this.value.toUpperCase()"/>
  <input type="submit" class="signUp" name="submit" value="submit" />
</form>
</div>
<div id="logInDiv">
<form action="login.php" method="post">
  <p>or log in :
  <input type="text" class="logIn" name="yourName" placeholder="Name" onblur="this.value=this.value.toUpperCase()"/>
  <input type="text" class="logIn" name="passcode" placeholder="Passcode" onblur="this.value=this.value.toUpperCase()"/>
  <input type="submit" class="logIn" name="submit" value="submit" /></p>
</form>
</tr>
</table>
<p id="inputErr"><?php echo "{$msg}"?></p>
</div>
<script>
<?php
if(isset($_COOKIE["yourName"])){
	echo "var name = '{$_COOKIE["yourName"]}';";
  echo "var passcode = {$row[passcode]};";
}
?>
</script>
<?php
if(isset($_COOKIE["yourName"])){
  echo "<script src='helloworld.js'></script>";
  echo "<script src='wam/wam.js'></script>";
}
?>
</body>
</html>
