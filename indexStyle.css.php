<?php header("Content-type: text/css; charset: UTF-8"); ?>
body {
  text-align: center;
  color: white;
  background-color: black;
  font-family: helvetica;
}
input.signUp {
  border: 0;
  padding: 10px;
  font-size: 18px;
}
input.signUp[type="submit"]{
  background: red;
  color: white;
}
input.logIn {
  border: 0;
  padding: 7px;
  font-size: 10px;
}
input.logIn[type="submit"]{
  border: 1px solid white;
  background: black;
  color: white;
}
p {
  font-size: 15px;
}
#signUpDiv{
	display:<?php echo ($_COOKIE["yourName"])?"none":"block";?>;
  margin: 0 auto;
	padding-top: 155px;
	width: 600px;
	height: 145px;
  background: url("src/name_bg.png");
 	background-size: cover;
  background-position: center;
}
#logInDiv{
  display: <?php echo ($_COOKIE["yourName"])?"none":"block";?>;
}
#inputErr{
  color : gray;
  display: <?php echo (isset($_POST[loginErr]))?"block":"none"; ?>
}
