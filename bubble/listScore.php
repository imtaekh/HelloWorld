<?php
include '../acinf.php';
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("mysql server is down now (" . $conn->connect_error) . ")";
}
$sql = "SELECT * FROM game1 ORDER BY bubble_score DESC";

$result = $conn->query($sql);
$num = 0;
?>
<html>
<style>
	body{
		background-color: white;
	}
	table{
		width:100%;
	}
	.topRow{
		color: #2db82e;
    	font-weight: bold;
	}
</style>
<table style="width:100%">
<tr class="topRow"><td>Rank</td><td>Name</td><td>Score</td></tr>
<?php
if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$num += 1;
	        echo "<tr><td>". $num . "</td><td>" . $row[name]. "</td><td>" . $row[bubble_score]. "</td></tr>";
	    }
	} else {
	    echo "0 results";
}
$conn->close();
?>
</table>
<p><small>** These datas are subject to delete without any notice.</small></p>
</html>
