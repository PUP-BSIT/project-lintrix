<?php
include_once("database.php");
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if (isset($_SESSION['user'])) {
    $response = array('message' => 'active', 'user' => $_SESSION['user']);
} else {
    $response = array('message' => 'inactive');
}
echo json_encode($response);
?>
