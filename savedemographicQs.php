<?php
	session_start();
	$data = $_POST['dataString'];
	$f = $_POST['fname'];
	$_SESSION['fname'] = $f;
	$myfile = fopen($f, "w") or die("Unable to open file!");
	fwrite($myfile, "\n".$data);
	fclose($myfile);
?>
