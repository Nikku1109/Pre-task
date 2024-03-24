$(document).ready(function() {
    $('#search-box').submit(function(event){
        event.preventDefault();
        let searchValue = $('#search').val();
        $.ajax({
            type: 'POST',
            url: 'search.php',
            data: { name: searchValue },
            success: function(response){
                    var data = JSON.parse(response);
                    populateTable(data);// Show success/failure message
            },
            error: function(xhr, status, error) {
                console.error('Error searching records:', error);
            }

            
        });
    });
    $('.view-records-button').click(function() {
        // Redirect to records.html page
        window.location.href = 'records.html';
    });
     // Fetch student records and populate the table
     fetchStudentRecords();

     // Function to fetch student records from the server
     function fetchStudentRecords() {
         $.ajax({
             type: 'GET',
             url: 'retrieve_data.php',
             success: function(response) {
                 // Parse the JSON response
                 var data = JSON.parse(response);
                 // Call function to populate the table
                 populateTable(data);
             },
             error: function(xhr, status, error) {
                 console.error('Error fetching records:', error);
             }
         });
     }
 
     // Function to populate the table with student records
     function populateTable(data) {
         var tableBody = $('#recordsTable tbody');
         // Clear existing rows
         tableBody.empty();
         // Loop through records and append rows to the table
         data.forEach(function(student, index) {
             var row = '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td style="display:none">' + student.id + '</td>' +
                         '<td>' + student.name + '</td>' +
                         '<td>' + student.number + '</td>' +
                         '<td>' + student.maths_marks + '</td>' +
                         '<td>' + student.science_marks + '</td>' +
                         '<td>' + student.telugu_marks + '</td>' +
                         '<td>' + student.hindi_marks + '</td>' +
                         '<td>' + student.pass_fail_distinction + '</td>' +
                         '<td>' + student.class_promotion + '</td>' +
                         
                         '<td><button class="update-btn">Update</button></td>' +
                         '<td><button class="download-btn">Download</button></td> '+
                       '</tr>';
             tableBody.append(row);
         });
         $('.download-btn').click(function() {
            // Get the corresponding row data
            var rowData = $(this).closest('tr').find('td:not(:last-child)').map(function() {
                return $(this).text();
            }).get();

            // Prepare the content for download (e.g., student's name and marks)
            var content = "Student Name: " + rowData[2] + "\n" +
                          "Number: " + rowData[3] + "\n" +
                          "Maths Marks: " + rowData[4] + "\n" +
                          "Science Marks: " + rowData[5] + "\n" +
                          "Telugu Marks: " + rowData[6] + "\n" +
                          "Hindi Marks: " + rowData[7]+ "\n" +
                          "Hindi Marks: " + rowData[8]+ "\n" +
                          "Hindi Marks: " + rowData[9];

            // Create a Blob containing the content
            var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
            // Create a temporary anchor element
            var anchor = document.createElement("a");
            // Set the href attribute of the anchor to a URL representing the Blob
            anchor.href = window.URL.createObjectURL(blob);
            // Set the download attribute of the anchor
            anchor.download = rowData[2] +"_results.txt";
            // Simulate a click on the anchor to trigger the download
            anchor.click();
        });
         tableBody.on('click', '.update-btn', function() {
            var rowData = $(this).closest('tr').find('td:not(:last-child)').map(function() {
                return $(this).text();
            }).get();
            $('#updateStudentId').val(rowData[1]);
            $('#updateName').val(rowData[2]);
            $('#updateNumber').val(rowData[3]);
            $('#updateMathsMarks').val(rowData[4]);
            $('#updateScienceMarks').val(rowData[5]);
            $('#updateTeluguMarks').val(rowData[6]);
            $('#updateHindiMarks').val(rowData[7]);

            $('#updateFormPopup').show();
        });
    }

    $('.close').click(function() {
        $('#updateFormPopup').hide();
    });

    // Form submission handler
    $('#updateStudentForm').submit(function(event) {
        event.preventDefault();

        // Get the updated form data
        var updatedData = $(this).serialize();

        // Send updated data to the server for database update
        $.ajax({
            type: 'POST',
            url: 'update_data.php',
            data: updatedData,
            success: function(response) {
                console.log('Data updated successfully:', response);
                $('#updateFormPopup').hide();
                fetchStudentRecords();
            },
            error: function(xhr, status, error) {
                console.error('Error updating data:', error);
            }
        });
    });

    
    fetchDataAndDisplayChart();

// Function to fetch data from the server and display chart
    function fetchDataAndDisplayChart() {
        $.ajax({
            type: 'GET',
            url: 'retrieve_data.php',
            success: function(response) {
                // Parse the JSON response
                var data = JSON.parse(response);
                // Call displayChart function with the parsed data
                displayChart(data);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    // Function to display chart using Chart.js
    function displayChart(data) {
        // Extract required data for the chart (e.g., names, grades, pass/fail statuses, etc.)
        const names = data.map(student => student.name);
        const grades = data.map(student => student.grade);
        const passFailDistinction = data.map(student => student.pass_fail_distinction);

        const colors = passFailDistinction.map(status => {
            if (status === 'Pass') return 'green'; // Green for Pass
            else if (status === 'Fail') return 'red'; // Red for Fail
            else return 'rgba(255, 206, 86, 0.2)'; // Yellow for Distinction
        });

        // Create chart using Chart.js
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [{
                    label: 'Grades',
                    data: grades,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                annotation: {
                    annotations: data.map((student, index) => {
                        return {
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y-axis-0',
                            value: index + 0.5,
                            borderColor: 'black',
                            borderWidth: 1,
                            label: {
                                content: 'Show Data',
                                enabled: true
                            },
                            onClick: function(e) {
                                // Handle button click here
                                console.log('Button clicked for student: ' + data[index].name);
                            }
                        };
                    })
                }
            }
        });
    }

   
    // Form submission handler
    $('#studentForm').submit(function(event) {
        event.preventDefault();

        // Validate form data
        if (!validateForm()) {
            return; // Exit if validation fails
        }

        // Collect form data
        let formData = $(this).serialize();

        // Send data to submit_form.php using AJAX
        $.ajax({
            type: 'POST',
            url: 'submit_form.php',
            data: formData,
            success: function(response) {
                alert(response); // Show success/failure message
                location.reload();
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });

    // Function to validate form data
    function validateForm() {
        let isValid = true;
        // Validation code here
        return isValid;
    }
});
