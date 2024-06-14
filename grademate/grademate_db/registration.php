<?php
include_once("database.php");
session_start();
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    $first_name = trim($request->first_name);
    $last_name = trim($request->last_name);
    $username = trim($request->username);
    $email = mysqli_real_escape_string($mysqli, trim($request->email));
    $birthday = trim($request->birthday);
    $sex = trim($request->sex);
    $password = mysqli_real_escape_string($mysqli, trim($request->password));
    $confirmPassword = mysqli_real_escape_string($mysqli, trim($request->confirmPassword));
    $university = trim($request->university);

    if ($password !== $confirmPassword) {
        $data = array('message'=>'password_mismatch');
        echo json_encode($data);
        exit;
    }

    $sql = "INSERT INTO users (
        first_name,
        last_name,
        username,
        email,
        birthday,
        sex,
        password,
        university
    ) VALUES (
    '$first_name',
    '$last_name',
    '$username',
    '$email',
    '$birthday',
    '$sex',
    '$password',
    '$university')";

    if ($mysqli->query($sql)) {
        $_SESSION['user'] = $email;
        $data = array('message'=>'success');
        echo json_encode($data);
    }
    else {
        $data = array('message'=>'failed');
        echo json_encode($data);
    }
}

?>
