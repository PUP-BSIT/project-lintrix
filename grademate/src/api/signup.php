<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or if you want to restrict it to certain domains
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

require './db_connection.php';

header('Content-Type: application/json');

$request_method = $_SERVER['REQUEST_METHOD'];
if ($request_method !== 'POST') {
    http_response_code(405); // Method Not Allowed
    exit();
}

$data = file_get_contents('php://input');
echo store($data);
exit();

function store($data) {
    $data = json_decode($data);
    if (!$data) {
        http_response_code(400); // Bad Request
        $response['error_message'] = 'Invalid JSON';
        return json_encode($response);
    }

    $required_fields = ['first_name', 'middle_name', 'surname', 'email', 
        'birthdate', 'gender', 'password', 'university', 'academic_level', 
        'username']; 
    foreach ($required_fields as $field) {
        if (!property_exists($data, $field)) {
            http_response_code(400); // Bad Request
            $response['error_message'] = 'Missing required fields';
            return json_encode($response);
        }
    }

    $data->password = password_hash($data->password, PASSWORD_BCRYPT);

    $mysql = db_connect();

    // Check if email or username already exists
    $stmt = $mysql->prepare('SELECT id FROM student WHERE email = ? OR username = ?');
    $stmt->bind_param('ss', $data->email, $data->username);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->close();
        $mysql->close();
        http_response_code(409); // Conflict
        $response['error_message'] = 'Username or email already exists';
        return json_encode($response);
    }
    $stmt->close();

    $stmt = $mysql->prepare('INSERT INTO student(first_name, middle_name, 
        surname, email, birthdate, gender, password, university, 
        academic_level, username)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->bind_param('ssssssssis', $data->first_name, $data->middle_name, 
        $data->surname, $data->email, $data->birthdate, $data->gender, 
        $data->password, $data->university, $data->academic_level, 
        $data->username);
    $result = $stmt->execute();
    if (!$result) {
        $mysql->close();
        http_response_code(400); // Bad Request
        $response['error_message'] = 'Invalid field values';
        return json_encode($response);
    }
    $stmt->close();

    $stmt = $mysql->prepare('SELECT LAST_INSERT_ID() as id');
    $stmt->execute();
    $result = $stmt->get_result();
    $response = $result->fetch_assoc();
    $stmt->close();
    $mysql->close();

    http_response_code(201); // Created
    return json_encode($response);
}
?>
