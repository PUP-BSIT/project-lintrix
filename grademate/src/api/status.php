<?php
header('Content-Type: text/plain');
session_start();
if (!isset($_SESSION['count'])) {
	echo 'Please login first to save your visit count.';
	exit();
}
$_SESSION['count']++;
echo 'You visited this page ' . ($_SESSION['count'] === 1 ? 
	'for the first time.' : $_SESSION['count'] . ' times.');

?>
