
<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
//echo "console.log( 'Debug Objects: 111' );";


// TODO: create new table for user:
//$_SESSION['TS'] = time();
//$TS = $_SESSION['TS'];
//$TS = 'results';
//$create_table = "CREATE TABLE " . $TS . "(row INT NOT NULL AUTO_INCREMENT, user_code VARCHAR(20),
//block_num INT, trial_type INT, trial_num INT, long_2 INT, target_shown INT, reaction_type INT,
// reaction_time INT, interval_size int,  ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY ( row ))";
//
//$results = mysqli_query($connection,$create_table)or trigger_error("Query Failed! SQL: $create_table - Error: ".mysqli_error($connection), E_USER_ERROR);
//if (!$results) exit();
//echo "\n Table " .$TS. " created successfully\n";



// Squares experiment
require 'assets1/mainSCreen.html';
?>
