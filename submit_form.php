<?php
include 'db_connection.php';

// Function to sanitize input data
function sanitizeData($data) {
    // Remove whitespace from the beginning and end of the string
    $data = trim($data);
    // Remove backslashes
    $data = stripslashes($data);
    // Convert special characters to HTML entities
    $data = htmlspecialchars($data);
    return $data;
}

$name = sanitizeData($_POST['name']);
$number = sanitizeData($_POST['number']);
$maths_marks = intval($_POST['maths_marks']); // Convert to integer
$science_marks = intval($_POST['science_marks']); // Convert to integer
$telugu_marks = intval($_POST['telugu_marks']); // Convert to integer
$hindi_marks = intval($_POST['hindi_marks']); // Convert to integer

// Perform calculations
$ms = $maths_marks * $science_marks;
$th = $telugu_marks * $hindi_marks;
$grade = $ms * 0.58 + 0.1 * $th;
$pass_fail_distinction = '';

if ($maths_marks >= 75 && $science_marks >= 75 && $telugu_marks >= 75 && $hindi_marks >= 75 && $grade >= 60) {
    $pass_fail_distinction = 'Distinction';
} elseif ($maths_marks >= 35 && $science_marks >= 35 && $telugu_marks >= 35 && $hindi_marks >= 35) {
    $pass_fail_distinction = 'Pass';
} else {
    $pass_fail_distinction = 'Fail';
}
$class_promotion = 'Not Possible';
if ($pass_fail_distinction !== 'Fail') {
    // Calculate class promotion based on the provided formula
    $class_promotion_value = $grade * 0.5 - 0.1 * $th;
    if ($class_promotion_value >= 35) {
        $class_promotion = 'Possible';
    }
}


$sql = "INSERT INTO students (name, number, maths_marks, science_marks, telugu_marks, hindi_marks, grade, pass_fail_distinction, class_promotion) 
        VALUES ('$name', '$number', $maths_marks, $science_marks, $telugu_marks, $hindi_marks, $grade, '$pass_fail_distinction' , '$class_promotion')";

if ($conn->query($sql) === TRUE) {
    echo "Data submitted successfully" ;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
