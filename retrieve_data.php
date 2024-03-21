<?php
// Include database connection
include 'db_connection.php';

// Fetch data from the database table
$sql = "SELECT * FROM students ORDER BY grade DESC";
$result = $conn->query($sql);

// Check if data is available
if ($result->num_rows > 0) {
    // Fetch data as associative array
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // Convert data to JSON and output
    echo json_encode($data);
} else {
    echo "No data found";
}

// Close database connection
$conn->close();
?>
