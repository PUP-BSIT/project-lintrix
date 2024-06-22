<?php
require 'authMiddleware.php';
require 'course.php';
require 'assessment.php';

header('Content-Type: application/json');
session_start();
// Get user's courses
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/courses') {
    verifyToken();
    $userId = $_SESSION['user_id'];
    $courses = Course::findByUserId($userId);
    echo json_encode($courses);
}

// Add a new course
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/courses') {
    verifyToken();
    $userId = $_SESSION['user_id'];
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $newCourse = new Course($userId, $name);
    $newCourse->save();
    echo json_encode($newCourse);
}

// Get user's assessments
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/assessments') {
    verifyToken();
    $userId = $_SESSION['user_id'];
    $assessments = Assessment::findByUserId($userId);
    echo json_encode($assessments);
}

// Add a new assessment
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/assessments') {
    verifyToken();
    $userId = $_SESSION['user_id'];
    $data = json_decode(file_get_contents('php://input'), true);
    $type = $data['type'];
    $name = $data['name'];
    $grade = $data['grade'];
    $weight = $data['weight'];
    $newAssessment = new Assessment($userId, $type, $name, $grade, $weight);
    $newAssessment->save();
    echo json_encode($newAssessment);
}
?>
