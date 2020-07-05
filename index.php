<?php
//require 'partials/scripts.php';
?>

<?php 
// Individual scripts. CONTROLLER == LOGIC
//require 'controllers/' . $content;
?>

<?php // VIEW == DISPLAY == TEMPLATE
// Shared html head.
//require 'partials/head.php';
?>

<?php 
// Individual content.
//require 'pages/' . $content;
?>

<?php 
// Shared html footer.
//require 'partials/footer.php';
?>


<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
echo "console.log( 'Debug Objects: 111' );";


// Squares experiment
require 'assets1/mainSCreen.html';
?>
