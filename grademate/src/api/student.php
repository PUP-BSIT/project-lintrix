<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

require './db_connection.php';

header('Content-Type: application/json');

session_start();
if (!isset($_SESSION['token'])) {
	http_response_code(401);
	$response['error_message'] = 'Not logged in';
	echo json_encode($response);
	exit();
}

$mysql = db_connect();
$stmt = $mysql->prepare('SELECT user_id FROM user_token WHERE token = ?');
$stmt->bind_param('s', $_SESSION['token']);
$stmt->execute();
$result = $stmt->get_result();
if (!$result->num_rows) {
	http_response_code(401);
	$response['error_message'] = 'Invalid token';
	echo json_encode($response);
	exit();
}

$record = $result->fetch_assoc();
$id = $record['user_id'];

$mysql->close();

$request_method = $_SERVER['REQUEST_METHOD'];
switch ($request_method) {
case 'GET':
	echo show($id);
	exit();

case 'POST':
	$data = file_get_contents('php://input');
	echo store($data);
	exit();

case 'PUT':
	$data = file_get_contents('php://input');
	echo update($id, $data);
	exit();

case 'DELETE':
	$data = file_get_contents('php://input');
	echo destroy($id);
	exit();

default:
	echo 'error';
}

function show($id) {
	$mysql = db_connect();
	$stmt = $mysql->prepare('SELECT * FROM student WHERE id = ?');
	$stmt->bind_param('i', $id);
	$stmt->execute();
	$result = $stmt->get_result();
	$data = $result->fetch_assoc();
	$mysql->close();
	if (!$data) {
		http_response_code(404);
		return '{}';
	}
	return json_encode($data);
}

function index() {
	$mysql = db_connect();
	$stmt = $mysql->prepare('SELECT * FROM student');
	$stmt->execute();
	$result = $stmt->get_result();
	if (!$result->num_rows) {
		http_response_code(404);
		return json_encode([]);
	}
	$data = [];
	while ($row = $result->fetch_assoc()) {
		array_push($data, $row);	
	}
	$mysql->close();
	return json_encode($data);
}

function store($data) {
	$data = json_decode($data);
	if (!$data) {
		http_response_code(400);
		$response['error_message'] = 'Invalid JSON';
		return json_encode($response);
	}

	$required_fields = ['first_name', 'middle_name', 'surname', 'email', 
		'birthdate', 'gender', 'password', 'university', 'academic_level', 'username']; 
	foreach ($required_fields as $field) {
		if (!property_exists($data, $field)) {
			http_response_code(400);
			$response['error_message'] = 'Missing required fields';
			return json_encode($response);
		}
	}

	$data->password  = password_hash($data->password, PASSWORD_BCRYPT);

	$mysql = db_connect();
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
		http_response_code(400);
		$response['error_message'] = 'Invalid field values';
		return json_encode($response);
	}
	$stmt->close();
	$stmt = $mysql->prepare('SELECT LAST_INSERT_ID() as id');
	$stmt->execute();
	$result = $stmt->get_result();
	$response = $result->fetch_assoc();
	$mysql->close();
	http_response_code(201);
	return json_encode($response);
}

function update($id, $data) {
	$data = json_decode($data, true);
	if (!$data) {
		http_response_code(400);
		return '{}';
	}
	
	$mysql = db_connect();
	$stmt = $mysql->prepare('SELECT * FROM student WHERE id = ?');
	$stmt->bind_param('i', $id);
	$stmt->execute();
	$result = $stmt->get_result();
	if (!$result->num_rows) {
			$mysql->close();
			http_response_code(404);
			return '{}';
	}
	$stmt->close();

	$fields = [
		[
			'name' => 'first_name', 
			'type' => 's'
		],
		[
			'name' => 'middle_name', 
			'type' => 's'
		],
		[
			'name' => 'surname', 
			'type' => 's'
		],
		[
			'name' => 'email', 
			'type' => 's'
		],
		[
			'name' => 'birthdate', 
			'type' => 's'
		],
		[
			'name' => 'gender', 
			'type' => 's'
		],
		[
			'name' => 'password', 
			'type' => 's'
		],
		[
			'name' => 'university', 
			'type' => 's'
		],
		[
			'name' => 'academic_level',
			'type' => 'i',
		]
	]; 

	foreach ($fields as $field) {
		if (!array_key_exists($field['name'], $data)) continue; 

		$stmt = $mysql->prepare('UPDATE student SET ' . $field['name'] . 
			' = ? WHERE id = ?');
		$stmt->bind_param($field['type'] . 'i', $data[$field['name']], 
			$id);
		$result = $stmt->execute();
		if (!$result) {
			$mysql->close();
			http_response_code(400);
			return '{}';
		}
		$stmt->close();
		$response[$field['name']] = $data[$field['name']];
	}

	$mysql->close();
	http_response_code(201);
	return json_encode($response);
}

function destroy($id) {
	$data = json_decode($data, true);
	
	$mysql = db_connect();
	$stmt = $mysql->prepare('SELECT * FROM student WHERE id = ?');
	$stmt->bind_param('i', $id);
	$stmt->execute();
	$result = $stmt->get_result();
	if (!$result->num_rows) {
			$mysql->close();
			http_response_code(404);
			return '{}';
	}
	$stmt->close();

	$stmt = $mysql->prepare('DELETE FROM student WHERE id = ?');
	$stmt->bind_param('i', $id);
	$stmt->execute();
	$mysql->close();
	http_response_code(200);
	return json_encode($response);	
}

?>
