<?php
class Course {
    private $userId;
    private $name;

    public function __construct($userId, $name) {
        $this->userId = $userId;
        $this->name = $name;
    }

    public static function findByUserId($userId) {
        $db = new mysqli('localhost', 'username', 'password', 'database');
        $stmt = $db->prepare('SELECT * FROM courses WHERE user_id = ?');
        $stmt->bind_param('i', $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $courses = $result->fetch_all(MYSQLI_ASSOC);
        $stmt->close();
        $db->close();
        return $courses;
    }

    public function save() {
        $db = new mysqli('localhost', 'username', 'password', 'database');
        $stmt = $db->prepare('INSERT INTO courses (user_id, name) VALUES (?, ?)');
        $stmt->bind_param('is', $this->userId, $this->name);
        $stmt->execute();
        $this->id = $stmt->insert_id;
        $stmt->close();
        $db->close();
        return $this;
    }
}
?>
