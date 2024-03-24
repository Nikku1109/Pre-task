<?php
include 'db_connection.php';

$searchValue = $_POST['name'];

$sql = "SELECT * FROM students WHERE name = '$searchValue'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo "No data found";
}
$conn->close();
?>
