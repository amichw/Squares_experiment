<div class="h row">
    <div class="col-md-9">
        
        <!-- Main title -->
        <h1>Welcome to my visual experiment</h1>
        
        <!-- Paragraph element -->
        <p id="warning" class="alert <?php if (isset($message) && isset($message['style'] ) ) echo $message['style']; ?>">
        	<?php if (isset($message) && isset($message['text'] ) ) echo $message['text']; ?></p>
    </div>
</div>

<div class='inputs row'>
    <div class="col-md-9">
        <!-- Form element -->
        <form action="#" method="POST" role="form">
            
            <div class="form-group">
                <label for="workerID">WorkerId*:</label>
                <input type="text" name="workerID" value="<?php if (isset($workerId))echo $workerId; ?>" id = "workerID"  class="form-control">
            </div>
            
            <div class="form-group">
                <label for="age">Age*: </label>
                <input type="number" name="age" value="<?php if (isset($age))echo $age; ?>" id = "age" placeholder="In numbers 0-99 years" class="form-control">
            </div>
            
            <div class="form-group">
                <label for="gender">Sex*: 
                female <input type="radio" name="gender" value="female" <?php if (isset($gender)&&($gender=="female")) echo "checked"; ?>> 
                male <input type="radio" name="gender" value="male" <?php if (isset($gender)&&($gender=="male")) echo "checked"; ?>> 
                </label>
            </div>

            <div id="consent_text" class="form-group">
                <p>By checking the box below, you indicate your agreement to participate in this task. Your participation is voluntary and you may quit at any time by closing the browser window.</p>
                <p>No identifying information will be used and your personal information will be kept confidential.<br>For further questions, please contact: ppca1611@gmail.com</p>
                <p>Please indicate, by checking the box below, that you understand and agree to participate in this task.</p>
                </div>

            <div class="form-group">
                <label for="consent">* 
                I consent <input type="radio" name="consent" value="yes" <?php if (isset($consent)) echo "checked"; ?>> 
                </label>
            </div>
            
            <input type="hidden" name="honeypot" value="">
            
            <!-- Submit button -->
            <input type="submit" name="submit" value="Submit" id="sub" class="btn btn-primary">
        </form>
    </div>
</div>