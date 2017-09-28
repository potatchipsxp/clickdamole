<?php
	$data = $_POST['dataString'];
	$f = "mydata.txt"
	$myfile = fopen($f, "a") or die("Unable to open file!");
	fwrite($myfile, "\n".$data);
	fclose($myfile);
?>
