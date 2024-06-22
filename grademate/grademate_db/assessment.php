<?php
class Assessment {
    private $userId;
    private $type;
    private $name;
    private $grade;
    private $weight;

    public function __construct($userId, $type, $name, $grade, $weight) {
        $this->userId = $userId;
        $this->type = $type;
        $this->name = $name;
        $this->grade = $grade;
        $this->weight = $weight;
    }

    public static function findByUserId($userId) {
        $db = new mysqli('localhost', 'username', 'password', 'database');
        $stmt = $db->prepare('SELECT * FROM assessments WHERE user_id = ?');
        $stmt->bind_param('i', $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $assessments = $result->fetch_all(MYSQLI_ASSOC);
        $stmt->close();
        $db->close();
        return $assessments;
    }

    public function save() {
        $db = new mysqli('localhost', 'username', 'password', 'database');
        $stmt = $db->prepare('INSERT INTO assessments (user_id, type, name, grade, weight) VALUES (?, ?, ?, ?, ?)');
        $stmt->bind_param('issdd', $this->userId, $this->type, $this->name, $this->grade, $this->weight);
        $stmt->execute();
        $this->id = $stmt->insert_id;
        $stmt->close();
        $db->close();
        return $this;
    }
}
?>
