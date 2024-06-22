<?php

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$hostname = 'localhost';
$username = 'root';
$password = '';
$database = 'grademate';

/*
$hostname = '127.0.0.1';
$username = 'u133652963_lintrix';
$password = 'Labanlangmakakapasatayo!1';
$database = 'u133652963_grademate';
*/

$mysqli = new mysqli($hostname, $username, $password, $database);

if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_error .') '. $mysqli->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
?>
