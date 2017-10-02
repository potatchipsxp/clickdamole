<?php
	$data = $_POST['jsonString'];
	// $f = $_POST['fname'];
	$f = localStorage.getItem('fname');
	$myfile = fopen($f, "a") or die("Unable to open file!");
	fwrite($myfile, "\n".$data);
	fclose($myfile);
?>