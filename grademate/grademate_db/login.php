<?php
include_once("database.php");
session_start();

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    $email = mysqli_real_escape_string($mysqli, trim($request->email));
    $password = mysqli_real_escape_string($mysqli, trim($request->password));

    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = mysqli_query($mysqli, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $_SESSION['user'] = $email;
        // Set the session cookie explicitly
        setcookie(session_name(), session_id(), [
            'expires' => time() + 3600,
            'path' => '/',
            'domain' => 'localhost:4200', // Replace with your domain
            'secure' => true, // Ensure secure flag is set
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
        $data = array('message' => 'success');
        echo json_encode($data);
    } else {
        $data = array('message' => 'failed');
        echo json_encode($data);
    }
} else {
    $data = array('message' => 'Invalid request');
    echo json_encode($data);
}
?>
