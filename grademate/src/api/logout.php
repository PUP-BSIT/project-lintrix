<?php

header("Access-Control-Allow-Origin: *");

header('Content-Type: text/plain');
session_start();
session_unset();
session_destroy();

echo 'You are logged out.'
?>
