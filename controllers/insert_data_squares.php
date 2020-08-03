<?php

    echo "console.log( in insert data squares' );";

ob_start();  
// var_dump("post variables in php file($_POST)");
 print "insert data squares!";
$out = ob_get_clean();  
echo $out; 
// TODO: change to relevant fields in DB
//
//if (isset($_POST['postFreq1']) &&  isset($_POST['postFreq2']) &&  isset($_POST['postResponse']) &&
//	isset($_POST['postAcc']) && isset($_POST['postRT']) &&
//	isset($_POST['postFeedback']) && isset($_POST['postRT_break']) && isset($_POST['postTypeTrials']) &&
//	isset($_POST['postFreq1Train']) &&  isset($_POST['postFreq2Train']) &&  isset($_POST['postResponseTrain']) &&
// 	isset($_POST['postAccTrain']) && isset($_POST['postRTTrain']) &&
// 	isset($_POST['postFeedbackTrain']) && isset($_POST['postDifficulty']) && isset($_POST['postVersion1']) && isset($_POST['postVersion2'])) {
 
	 // test variables
    $user_code = $_POST['user_code'];
    $block_num = $_POST['block_num'];
    $trial_type = $_POST['trial_type'];
    $trial_num = $_POST['trial_num'];
    $long_2 = $_POST['long_2'];
    $target_shown = $_POST['target_shown'];
    $reaction_type = $_POST['reaction_type'];
    $reaction_time = $_POST['reaction_time'];
    $interval_size = $_POST['interval_size'];

//    $user_code = safe_encode($user_code);
//    $block_num = safe_encode($block_num);
//    $trial_type = safe_encode($trial_type);
//    $trial_num = safe_encode($trial_num);
//    $long_2 = safe_encode($long_2);
//    $target_shown = safe_encode($target_shown);
//    $reaction_type = safe_encode($reaction_type);
//    $reaction_time = safe_encode($reaction_time);
//    $interval_size = safe_encode($interval_size);


	// train variables
//	$freq1_train = $_POST['postFreq1Train'];
//	$freq2_train = $_POST['postFreq2Train'];
//	$response_train = $_POST['postResponseTrain'];
//	$acc_train = $_POST['postAccTrain'];
//	$RT_train = $_POST['postRTTrain'];
//	$feedback_train = $_POST['postFeedbackTrain'];
//
//	$freq1_train = safe_encode($freq1_train);
//	$freq2_train = safe_encode($freq2_train);
//	$response_train = safe_encode($response_train);
//	$acc_train = safe_encode($acc_train);
//	$RT_train = safe_encode($RT_train);
//	$feedback_train = safe_encode($feedback_train);

    insert_results_squares($connection, $TS, $user_code, $block_num, $trial_type, $trial_num,
        $long_2, $target_shown, $reaction_type, $reaction_time, $interval_size);



        // TODO  is this needed ?
//	update_user_complete($userId,$connection,$experiment_id);
//	exit;
//}

?>