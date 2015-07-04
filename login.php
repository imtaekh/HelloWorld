<?php
if(isset($_POST[yourName])==false){
	exit;
}

$yourName = $_POST[yourName];
$msg = "wrongName";

include 'acinf.php';
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT * FROM `game1` WHERE name='{$yourName}'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$conn->close();

if($row[name]&&$_POST[passcode]==$row[passcode]){
    $expire = time() + (60*60*24)*365;
	setcookie("yourName", $yourName, $expire);
	header("Location:index.php");
	exit;
} else {
	$msg = "wrongInfo";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Tell me your name:)</title>
<style>
	body{
		background-color: black;
	}
	form{
		display:none;
	}
</style>
</head>
<body>
<script>
function postInfo(to,name,value) {
	var myForm =document.createElement('form');
	myForm.action=to;
	myForm.method="post";

	var myInput =document.createElement('input');
	myInput.name=name;
	myInput.value=value;
	myForm.appendChild(myInput);
	myForm.submit();
}
postInfo("index.php","loginErr",<?php echo "'{$msg}'"; ?>);
</script>
</body>
</html>
