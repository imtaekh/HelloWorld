<?php
if(isset($_POST[yourName])==false){
	exit;
}
$yourName = $_POST[yourName];
$msg = "wrongName";
if(strlen($yourName)>=4 && strlen($yourName)<=20){
	$result = preg_replace("/[^a-zA-Z0-9' ']+/", "", $yourName);

	if(strcmp($yourName, $result)==0){
		include 'acinf.php';
		$conn = new mysqli($servername, $username, $password, $dbname);
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}
		$sql = "SELECT * FROM `game1` WHERE name='{$yourName}'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
		    // output data of each row
		    $msg = "duplicatedName";
		} else {
		  $expire = time() + (60*60*24)*365;
			setcookie("yourName", $yourName, $expire);
			$seed = str_split('123456789');
			shuffle($seed);
			$passcode = '';
			foreach (array_rand($seed, 5) as $k) $passcode .= $seed[$k];
			$sql  = "INSERT INTO game1 (name, passcode, score) VALUES ( '{$yourName}',$passcode, 0)";
			if ($conn->query($sql) === TRUE) {
			} else {
			   die( "Error updating record: " . $conn->error);
			}
			header("Location:index.php");
			exit;
		}
		$conn->close();
	}
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
