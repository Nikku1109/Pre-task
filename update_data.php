<?php
// Include database connection
include 'db_connection.php';
// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect the updated data from the POST parameters
    $ID=$_POST['id'];
    $name = $_POST['name'];
    $number = $_POST['number'];
    $maths_marks = $_POST['maths_marks'];
    $science_marks = $_POST['science_marks'];
    $telugu_marks = $_POST['telugu_marks'];
    $hindi_marks = $_POST['hindi_marks'];

    // Update the data in the database table
    $sql = "UPDATE students SET
                name = '$name',
                number = '$number',
                maths_marks = '$maths_marks',
                science_marks = '$science_marks',
                telugu_marks = '$telugu_marks',
                hindi_marks = '$hindi_marks'
            WHERE
                id = '$ID'";

    if ($conn->query($sql) === TRUE) {
        // If the update is successful, return a success message
        echo "Data updated successfully";
    } else {
        // If there is an error, return an error message
        echo "Error updating data: " . $conn->error;
    }
} else {
    // If the request method is not POST, return an error message
    echo "Invalid request method";
}

// Close database connection
$conn->close();
?>
