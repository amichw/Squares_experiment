<?php
// Must be at the top.
session_start(); // Data stored in the $_SESSION array will only be available after the session is started
// Functions.
require 'admin/functions.php';
require 'admin/config.php';

$experiment_id = '2';

// for table name:
$table = 'results';
//if (isset($_SESSION['TS'])) $TS = $_SESSION['TS'];
//else $TS  = 1;
// Open connection
$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME);

// Validate connection.
if(mysqli_connect_errno($connection))
   exit("Fail to connect to db:" . mysqli_connect_error());
//echo "Host information: " . mysqli_get_host_info($connection) . PHP_EOL."\n";

// utf8 support
mysqli_set_charset($connection,"utf-8");

if(isset($_SERVER['REQUEST_URI'])) 

//$_SERVER['REQUEST_URI'] returns the URI which 
//was given in order to access this page; for instance, '/index.html'.

{
    // Extract the path from REQUEST_URI.
    $requestPath = preg_replace('#[^a-zA-Z0-9_/\-\=\&.]#i', '', $_SERVER['REQUEST_URI']);
  
    // Unescape and strip from base path.
    $basePathLen = strlen(rtrim(dirname($_SERVER['SCRIPT_NAME']), '\/'));	
    $path = trim(substr(urldecode($requestPath), $basePathLen + 1),'/');


  // The routing itself   
//    var_dump($path);

     // TODO : Squares, this routes to save to DB
	if($path == "data_collector_squares")
    {
        echo "console.log( 'in IF data_collector_squares' );";

        $title   = "data_collector_squares";
        $content = 'controllers/insert_data_squares.php';
        require $content;
        exit();
    }
    elseif($path == 'download_squares_db')
    {
        $title   = "Download_squares DB";
        $content = 'controllers/download_squares_db.php';
        require $content;
        exit();
}
    elseif($path == 'test')
    {
//		var_dump(safe_decode('YToyOntzOjExOiJleHBlcmltZW50cyI7YToxOntpOjA7aToxO31zOjM6ImlwcyI7czozOiI6OjEiO30='));
//    	$userId = 65;
//    	var_dump($userId);
		//update_user_complete($userId,$connection,$experiment_id);
		exit();
    }
    else 
    {
        http_response_code(404);                
        $title   = "404 error";
        $content = 'errors/404.php';
    }
}


// TODO: squares  I think this all i need. in index.php ill link all project files
require 'index.php';