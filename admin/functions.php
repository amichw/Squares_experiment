<?php
function redirect($to)
{
    // Redirect    
    header("Location: $to");
    exit;
}



function safe_encode($array)
{
	return base64_encode(serialize($array));	
}


function safe_decode($str)
{
	return unserialize(base64_decode($str));
}


// sends to DB, change table name and field names
function insert_results_squares($connection, $table, $user_code, $block_num, $trial_type, $trial_num, $long_2, $target_shown, $reaction_type, $reaction_time, $interval_size)
{
    echo "\nInsert_results_squares:  user code: " . $user_code . "\n" ;
    $tableName = $table;
    $insert = "INSERT INTO `{$tableName}`";
    $insert.= "(`user_code`, `block_num`, `trial_type`, `trial_num`, `long_2`, `target_shown`, `reaction_type`, `reaction_time`, `interval_size`) ";
    $insert.= "VALUES ";
    $insert.= "('{$user_code}', '{$block_num}', '{$trial_type}', '{$trial_num}', '{$long_2}', '{$target_shown}', '{$reaction_type}', '{$reaction_time}', '{$interval_size}')";

    echo "result: " . $insert . "\n" ;
    $results = mysqli_query($connection,$insert)or trigger_error("Query Failed! SQL: $insert - Error: ".mysqli_error($connection), E_USER_ERROR);;

    return $results ;
}
