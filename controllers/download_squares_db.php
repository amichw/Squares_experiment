<?php
/**
 * Created by Ami Weil
 * Date: 05/08/2020
 * Time: 15:32
 */

//$table = 'results';

// filename for export
$csv_filename = 'db_export_' . $table . '_' . date('Y-m-d') . '.csv';


// create empty variable to be filled with export data
$csv_export = '';

// query to get data from database
$query = mysqli_query($connection, "SELECT * FROM " . $table);
$field = mysqli_field_count($connection);

// create line with field names
for ($i = 0; $i < $field; $i++) {
    $csv_export .= mysqli_fetch_field_direct($query, $i)->name . ', ';
}

// newline (seems to work both on Linux & Windows servers)
$csv_export .= '
';

// loop through database query and fill export variable
while ($row = mysqli_fetch_array($query)) {
    // create line with field values
    for ($i = 0; $i < $field; $i++) {
        $csv_export .= $row[mysqli_fetch_field_direct($query, $i)->name] . ', ';
    }
    $csv_export .= '
';
}

// Export the data and prompt a csv file for download
header('Content-Encoding: UTF-8');
header('Content-type: text/csv; charset=UTF-8');
header("Content-Disposition: attachment; filename=" . $csv_filename . "");
echo "\xEF\xBB\xBF"; // UTF-8 BOM
echo($csv_export);

