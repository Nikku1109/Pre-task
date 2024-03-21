<?php
include 'db_connection.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
        echo "Data updated successfully";
    } else {
        echo "Error updating data: " . $conn->error;
    }
} else {
    echo "Invalid request method";
}

$conn->close();
?>
