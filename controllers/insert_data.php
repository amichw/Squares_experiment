<?php


ob_start();  
// var_dump("post variables in php file($_POST)");  
$out = ob_get_clean();  
echo $out; 
// TODO: change to relevant fields in DB

if (isset($_POST['postFreq1']) &&  isset($_POST['postFreq2']) &&  isset($_POST['postResponse']) &&
	isset($_POST['postAcc']) && isset($_POST['postRT']) && 
	isset($_POST['postFeedback']) && isset($_POST['postRT_break']) && isset($_POST['postTypeTrials']) &&
	isset($_POST['postFreq1Train']) &&  isset($_POST['postFreq2Train']) &&  isset($_POST['postResponseTrain']) &&  
 	isset($_POST['postAccTrain']) && isset($_POST['postRTTrain']) && 
 	isset($_POST['postFeedbackTrain']) && isset($_POST['postDifficulty']) && isset($_POST['postVersion1']) && isset($_POST['postVersion2'])) {
 
	 // test variables
	$freq1 = $_POST['postFreq1'];
	$freq2 = $_POST['postFreq2'];
	$response = $_POST['postResponse'];
	$acc = $_POST['postAcc'];
	$RT = $_POST['postRT'];
	$feedback = $_POST['postFeedback'];
	$RT_break = $_POST['postRT_break'];
	$type_trials = $_POST['postTypeTrials'];
	$difficulty = $_POST['postDifficulty'];
	$version1 = $_POST['postVersion1'];
	$version2 = $_POST['postVersion2'];

	$freq1 = safe_encode($freq1);
	$freq2 = safe_encode($freq2);
	$response = safe_encode($response);
	$acc = safe_encode($acc);
	$RT = safe_encode($RT);
	$feedback = safe_encode($feedback);
	$RT_break = safe_encode($RT_break);
	$type_trials = safe_encode($type_trials);
	$difficulty = safe_encode($difficulty);
	$version1 = safe_encode($version1);
	$version2 = safe_encode($version2);

	// train variables
	$freq1_train = $_POST['postFreq1Train'];
	$freq2_train = $_POST['postFreq2Train'];
	$response_train = $_POST['postResponseTrain'];
	$acc_train = $_POST['postAccTrain'];
	$RT_train = $_POST['postRTTrain'];
	$feedback_train = $_POST['postFeedbackTrain'];

	$freq1_train = safe_encode($freq1_train);
	$freq2_train = safe_encode($freq2_train);
	$response_train = safe_encode($response_train);
	$acc_train = safe_encode($acc_train);
	$RT_train = safe_encode($RT_train);
	$feedback_train = safe_encode($feedback_train);

	insert_results($freq1,$userId,$connection,23);
	insert_results($freq2,$userId,$connection,24);
	insert_results($response,$userId,$connection,25);
	insert_results($acc,$userId,$connection,26);
	insert_results($RT,$userId,$connection,27);
	insert_results($feedback,$userId,$connection,28);
	insert_results($RT_break,$userId,$connection,29);
	insert_results($type_trials,$userId,$connection,30);
	insert_results($freq1_train,$userId,$connection,31);
	insert_results($freq2_train,$userId,$connection,32);
	insert_results($response_train,$userId,$connection,33);
	insert_results($acc_train,$userId,$connection,34);
	insert_results($RT_train,$userId,$connection,35);
	insert_results($feedback_train,$userId,$connection,36);
	insert_results($difficulty,$userId,$connection,37);
	insert_results($version1,$userId,$connection,38);
	insert_results($version2,$userId,$connection,39);


	update_user_complete($userId,$connection,$experiment_id);
	
			
	exit;
}

?>