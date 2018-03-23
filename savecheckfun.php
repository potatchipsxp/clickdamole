<?php
	session_start();
	$data = $_POST['checkFunData'];
	$f = $_SESSION['fname'];
	if ($f == '') {
		echo "session var didnt work";
		$f = $_POST['fname'];
	}
	if ($f == '') {
		echo "post didnt work";
	}

	$myfile = fopen($f, "a") or die("Unable to open file!");
	fwrite($myfile, "\n".$data);
	fclose($myfile);
?>
