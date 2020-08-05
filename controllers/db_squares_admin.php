

<?php
/**
 * Created by Ami Weil
 * Date: 03/08/2020
 * Time: 21:31
 */



/* vars for export */
//
//// database variables
//$hostname = "localhost";
//$user = "root";
//$password = "";
//$database = "squares1";
//$port = 3306;
//
//
//$conn = mysqli_connect($hostname, $user, $password, $database, $port);
//if (mysqli_connect_errno()) {
//    die("Failed to connect to MySQL: " . mysqli_connect_error());
//}

$tables = mysqli_query($connection, "show tables"); // run the query and assign the result to $result
while($table = mysqli_fetch_row($tables)) { // go through each row that was returned in $result


// filename for export
    $csv_filename = 'db_export_'.$table[0].'_'.date('Y-m-d').'.csv';


// create empty variable to be filled with export data
    $csv_export = '';

// query to get data from database
    $query = mysqli_query($connection, "SELECT * FROM ".$table[0]);
    $field = mysqli_field_count($connection);

// create line with field names
    for($i = 0; $i < $field; $i++) {
        $csv_export.= mysqli_fetch_field_direct($query, $i)->name.', ';
    }

// newline (seems to work both on Linux & Windows servers)
    $csv_export.= '
';

// loop through database query and fill export variable
    while($row = mysqli_fetch_array($query)) {
        // create line with field values
        for($i = 0; $i < $field; $i++) {
            $csv_export.= $row[mysqli_fetch_field_direct($query, $i)->name].', ';
        }
        $csv_export.= '
';
    }

// Export the data and prompt a csv file for download
    header('Content-Encoding: UTF-8');
    header('Content-type: text/csv; charset=UTF-8');
    header("Content-Disposition: attachment; filename=".$csv_filename."");
    echo "\xEF\xBB\xBF"; // UTF-8 BOM
    echo($csv_export);
}


//$output = fopen('php://output', 'w');
//fputcsv($output, array('sub_experiment_name', 'field_name', 'result', 'user_id'));
// // Export the data and prompt a csv file for download
//header("Content-type: text/x-csv");
//header("Content-Disposition: attachment; filename=".$csv_filename."");
//echo($csv_export);