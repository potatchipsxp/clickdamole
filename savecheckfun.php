<?php
	session_start();
	$data = $_POST['dataString'];
	$f = $_SESSION['fname'];
	$myfile = fopen($f, "a") or die("Unable to open file!");
	fwrite($myfile, "\n".$data);
	fclose($myfile);
?>
