<!-- ======================================= HTML======================================== -->

<!-- title -->
<h3 id="title1">Visual perception</h3>

<!-- ############### passButtons class ################ -->

<input type="button" id="next_set_size" class = "passButtons" value="Next"  />

<input type="button" id="next_prepare" class = "passButtons" value="Next"  />

<input type="button" id="next1" class = "passButtons" value="Next"  />

<input type="button" id="next_demo" class = "passButtons" value="Next"  />

<input type="button" id="next2" class = "passButtons" value="Next"  />

<input type="button" id="next3" class = "passButtons" value="Next"  />

<input type="button" id="next_inst_train" class = "passButtons" value="Next"  />

<input type="button" id="next_training" class = "passButtons" value="Next"  />

<input type="button" id="next_test" class = "passButtons" value="Next"  />

<input type="button" id="next_continue_train" class = "passButtons" value="Next"  />

<input type="button" id="next_break" class = "passButtons" value="Next"  />

<!-- ############### inst class ################ -->

<!-- inst_welcome - a nice introduction to the experiment -->
<div id="inst_welcome" class="inst">
<p>Welcome to the visual experiment. I am a researcher in an academic lab, studying how the mind works.</p>
<p><strong>Thank you for helping me!</strong></p>
<p>In order for you to be able to do the task, we need to make sure that you can clearly see your screen and the images that will be displayed on it. In the next pages I will explain what you need to do.</p>
<p>This process may take a couple of minutes, but it's an important part of the task, so please pay attention and follow the instructions. I will highly appreciate it!</p>
<p><br>Press <b>next</b> to continue. To exit the experiment, simply close the tab.</p>
</div>

<!-- inst_set_size - instructions on how to calibrate the screen size -->
<div id="inst_set_size" class="inst">
<p>First, let’s find out what your monitor size is.</p>             
<p>Please use <b>a standard sheet of paper</b> for scale. It can be an A4, a US letter or a US legal sheet.</p>
<p>Now our goal is for the paper to fit exactly in the blue frame below:</p>
<p>1. Hold the sheet onto the screen <b>with the shorter side facing up</b>.</p>
<p>2. Adjust the slider below until the top part of the paper is in the <b>exact same size</b> as the blue frame.</p>                
<p>(If you don't have access to a standard sheet of paper, you can use a ruler to measure image width of 21 cm or 8.3 inch.)</p>
<div id="sheet_slider" class="sheet"></div>
<br>
<img id="sheet" src="assets/img/A4_paper.jpg" style="width: 60%" class="sheet">
</div>
<div id="inst_set_size_part2" class="inst">
<p>After you set the slider to the correct location, check the box below. Then, press <b>next</b> to continue.<br></p>
<input type="checkbox" id="confirm_set_size" name="finish" value="finish">
  <label for="confirm_set_size">I confirm that the blue frame is now in the same size as the top part of the paper.</label><br>
</div>

<!-- inst_prepare - instructions on room lighting and distance from screen -->
<div id="inst_prepare" class="inst">
<p>Now let's set your environment:</p>
<p>1. Please sit in a <b>dimly lit room</b> - if possible, dim the lights and close the shades or curtains. Do not do this task outdoors.</p>
<p>2. Please make sure <strong>you are seated comfortably about 40 cm (16 inch) from the screen</strong>. This is around twice the width of the standard sheet you used earlier (see image below).</p>
</div>
<img type="image" id="instImage"  class = "instImage" src="assets/img/distance_from_screen.jpg" alt="distance from screen">
<div id="inst_prepare_part2" class="inst">
<p>When you are prepared, press <b>next</b> to continue.</p>
</div>

<!-- inst1 - general instructions on how the task works  -->
<div id="inst1" class="inst">
<p>In our lab we study visual perception.</p>
<p>In this task I will show you two images of horizontal stripes on each trial/question.</p>
<p>Then I will ask you which of the two has denser stripes.</p>
<p><br>Press <b>next</b> to continue.</p>
</div>

<!-- demo -->
<div id="inst_demo" class="inst">
<p>What do I mean by "denser stripes"? </p>
<p>Let's get a feeling of "more dense" and "less dense" stripes by looking at these images.</p>
<p>The stripes <strong>increase</strong> in density from left to right, so that <strong>the rightmost image has the densest stripes</strong> - look at it and make sure you understand!</p>
</div>
<img type="image" id="Dimage1"  class = "Dimages" src="assets/img/demo_0.5.jpg" alt="image1">
<img type="image" id="Dimage2" class = "Dimages" src="assets/img/demo_0.8.jpg" alt="image2">
<img type="image" id="Dimage3" class = "Dimages" src="assets/img/demo_1.1.jpg" alt="image3">
<img type="image" id="Dimage4" class = "Dimages" src="assets/img/demo_1.4.jpg" alt="image4">
<div id="inst_demo_part2" class="inst">
<p><br><br><br><br>Got it? Great - press <b>next</b> to continue.</p>
</div>

<!-- inst2 -->
<div id="inst2" class="inst">
<p>The task:</p>
<p>On each trial (question), two images will be displayed consecutively: image 1 --> image 2</p>
<p>Each image will be displayed for a very short period of time.</p>
<p>Then I ask: which of the two images had denser stripes? </p>
<p><strong>If the first image had denser stripes - press 1, otherwise press 2</strong></p>
<p><br>Press <b>next</b> to continue.</p>
</div>

<!-- inst3 -->
<div id="inst3" class="inst">
<p>After you will choose your answer, you will hear one of two sounds that will indicate if your choice was correct or incorrect.</p>
<p>Click now on these buttons to familiarize yourself with the sounds, and make sure you can hear them well. Adjust the volume of your computer accordingly.<br><br></p>
</div>
<!-- sound demo buttons-->
<input type="button" id="DbuttonOk" class = "Dbuttons" name = "buttonOk" value="correct answer"  />
<input type="button"  id="DbuttonFail" class = "Dbuttons" name = "buttonFail" value="incorrect answer"  />
<div id="inst3_part2" class="inst">
<p>When you're ready, press <b>next</b> to continue.</p>
</div>

<!-- inst_train -->
<div id="inst_train" class="inst">
<p>We will begin with a short training session that will take 1-3 minutes.</p>
<p>You must perform well in this part in order to continue to the next part.</p>
<p><b>Remember: if the first image had denser stripes - press 1, otherwise press 2</b></p>
<p><br>Press <b>next</b> to start the task.</p>
</div>

<!-- inst_test-->
<div id="inst_test" class="inst">
<p>Good job, now we can start the real task.</p>
<p>The task will take about 20 minutes. Three times in the middle, you will see a message inviting you to take a break of 1-2 minutes.</p>
<p><strong>Note:</strong> Trials will be much harder now. If you dont know the answer - that's ok, just guess.</p>
<p><br>Press <b>next</b> to start the task.</p>
</div>

<!-- stop_message-->
<div id="stop_message" class="inst">
<p><strong>Sorry, you can not continue this task since you had too many errors.</strong></p>
<p>Thank you for your time!</p>
</div>

<!-- break1-->
<div  id="break1" class="inst">
<p>Great! You have finished the first block, three more to go!</p>
<p>Take a minute or two to freshen up.</p>
</div>

<!-- break2-->
<div  id="break2" class="inst">
<p>Two more blocks to go!</p>
<p>Before continuing, maybe take a minute or two to freshen up.</p>
</div>

<!-- break3-->
<div  id="break3" class="inst">
<p>One more block to go!</p>
<p>Before continuing, maybe take a minute or two to freshen up.</p>
</div>

<p id="blockFeed" class="inst"> </p>

<!-- ############### OTHER CLASSES ################ -->

<!-- thanks-->
<div  id="thanks" class="thanks">
<p>That's it!</p>
<p>Many thanks for participating.</p>
<p>M-turk password: serenity now</p>
<p>You may close this window now.</p>
</div>

<!-- Loading -->
<div  class="loading">
<p>Loading....</p>
<p>This may take 1-2 minutes to complete, please be patient.</p>
<p>If for some reason loading does not finish, refresh the page</p>
</div>

<!-- Prgress bar-->
<div id="progressbarPre"></div>

<!-- ############### Canvases ################ -->

<!-- experiment trials -->
<canvas id='trial' class='screen'></canvas>

<!-- fixation -->
<canvas id='fixation' class='screen'></canvas>

<!-- wait -->
<canvas id='wait' class='screen'></canvas>

<script>
$('.inst').hide();
$('.passButtons').hide();
$('.Dbuttons').hide();
$('.Dimages').hide();
$('.feedback').hide();
$('#blockFeed').hide();
$('#inst_keys').hide();
$('#title1').hide();
$('#instImage').hide();
$('.thanks').hide();
$('.screen').hide();
$('.sheet').hide();
</script>



