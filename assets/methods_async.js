// rhythm : 75% target, 25% no target
// random : same but instead of 600MS between stimuli - random
// pairs : red-red, then white-green. intrapair-random 600/900 MS. interpair: random

//  COPIED FROM MATLAB:
// params.Time.cue=[0.6; 0.9]; % target intervals
// params.Time.ISI=[1.3 1.4 1.5 1.6 1.7; 1.95 2.1 2.25 2.4 2.55]; %inter-pair interval in interval condition
// params.Time.tarIntervalRand=[0.4 0.5 0.6 0.7 0.8; 0.6 0.75 0.9 1.05 1.2]; %target time randomization in random condition
// params.Time.cueJitter=[0.4 0.5 0.6 0.7 0.8; 0.6 0.75 0.9 1.05 1.2]; %cue time randomization in random condition
// params.Time.tar=0.15;
// params.Time.ITI=[0.8 1.1 1.4];


// TODO : training loop. what to do when train rhythmic75 ?

const BLOCK_LENGTH = 32;
"use strict";

let relativeTime = 0;
let currentVisibility = true;
let trialVisibility = true;
let isEndExperiment = false;
let isFullScreen = false;

let startTime = new Date().getTime();
let expectedTargetTime = -1;
let squareElement = document.getElementById('square');
let feedbackElement = document.getElementById('feedback');
let timerElement = document.getElementById('timerContainer');

const EARLY_SRC = 'assets/res/tooearly.jpg';
const ONLY_STIMULI_SRC = 'assets/res/resptarget.jpg';
const NO_RESPONSE_SRC = 'assets/res/noresp.jpg';
const PRACTICE_SRC = 'assets/res/practice.png';
const BLOCK_BEGIN_SRC = 'assets/res/begblock.jpg';
const RHYTHM_TARGET_SRC = 'assets/res/rhythm_target.svg';
const RHYTHM_SRC = 'assets/res/rhythm.jpg';
const RHYTHM_HELP_SRC = 'assets/res/srhythm.svg';
const INTERVAL_TARGET_SRC = 'assets/res/interval_target.svg';
const INTERVAL_SRC = 'assets/res/interval.jpg';
const INTERVAL_HELP_SRC = 'assets/res/sinterval.svg';
const RANDOM_TARGET_SRC = 'assets/res/random_target.jpg';
// const RANDOM_SRC = 'assets/res/random.jpg';
const RANDOM_SRC = 'assets/res/random.svg';
const RANDOM_HELP_SRC = 'assets/res/srandom.jpg';
const END_SRC = 'assets/res/end.jpg';
const OTHER_KEY_SRC = 'assets/res/other_key.jpg';
const HALF_SRC = 'assets/res/half.svg';
const HALF_START_SRC = 'assets/res/begin_second_part.jpg';
const INTRO_SRC = 'assets/res/intro.png';
const END_BLOCK_SRC = 'assets/res/end_block.png';
const TRAINING_MANDATORY_SRC = 'assets/res/practice_mandatory.png';

const MS_BETWEEN_TRIALS = 1000;
const MS_SHOW_TARGET = 3000;
const MS_SHOW_CUE = 100;
const MS_SHOW_FEEDBACK = 3000;
const TARGET_COLOR = '#ffffff';
const WHITE_COLOR = '#ffffff';
const REDS_COLOR = '#ffffff';
const LONG_TRAINING = 6;
const SHORT_TRAINING = 3;
const KEY_KUF = 'KeyE';
const KEY_MEM = 'KeyN';
const TIMER_DURATION = 5 * 60 * 1000 ; // 5 min.
const MOUSE_DURATION_TILL_DISAPPEAR = 5 *  1000 ; // 5 sec.
let targetShownTS = 0;
let timers = [];
let mouseShowing = true;
let mouseTimer;
let video = document.getElementById("vid");
const RHYTHMIC_VID_SRC = 'assets/res/rhythmic.mp4';
const RHYTHMIC_VID_A_SRC = 'assets/res/rhythmic_A.mp4';
const RHYTHMIC75_VID_SRC = 'assets/res/rhythmic75.mp4';
const RANDOM_VID_SRC = 'assets/res/random.mp4';
const RANDOM_VID_A_SRC = 'assets/res/random_A.mp4';
const RANDOM75_VID_SRC = 'assets/res/random75.mp4';
const INTERVAL_VID_SRC = 'assets/res/interval.mp4';
const INTERVAL_VID_A_SRC = 'assets/res/interval_A.mp4';
const INTERVAL75_VID_SRC = 'assets/res/interval75.mp4';

async function playVid(url) {
    //play vid
    video.src = url;
    video.style.display = 'block';
    video.play();
    return new Promise(resolve => {
        // setTimeout(() => {video.stop(); hideNow(video);console.log("The video has just ended!"); resolve(12345);}, 5000); // if no press, return.
        video.addEventListener("ended", function() {
            console.log("The video has just ended!");
            // Let's redirect now
            resolve('finished');
            hideNow(video);
        },  {once:true});
    });
}


function toggleMouseOff(){
    document.body.style.cursor = 'none'; // disappear mouse
    mouseShowing =false;
}


function toggleMouseOn(){
    document.body.style.cursor = 'auto'; // show mouse
    mouseShowing =true;
}


window.addEventListener("resize", resizeInstructions, false);
window.addEventListener('keyup', ev => {goFullScreen();}, {once:true}); // fullScreen on first press. (must use user interaction)
window.addEventListener('keyup', ev => {if (ev.code === 'Escape'){endExperiment();}}, {passive:true}); // doesn't capture fullScreen escape.
document.addEventListener("fullscreenchange", ev =>{
                            isFullScreen = !isFullScreen;
                            console.log('FullScreen: ', isFullScreen);
                            if (!isFullScreen){endExperiment();}} );

document.addEventListener("mousemove", ev =>{
    if (mouseTimer) {window.clearTimeout(mouseTimer);} // reset timer
    mouseTimer = setTimeout(toggleMouseOff, MOUSE_DURATION_TILL_DISAPPEAR);
    console.log('mouse move: ');
    if (!mouseShowing){ toggleMouseOn();}
    } );

const TrialType = Object.freeze({
    Rhythmic: Symbol("rhythmic"),
    Rhythmic75: Symbol("rhythmic75"),
    Interval: Symbol("interval"),
    Random: Symbol("random")
});


class Trial {
    constructor(reds, white, target, type, long = false, showTarget = true) {
        this.reds = reds;
        this.white = white;
        this.target = target;
        this.type = type;
        this.showTarget = showTarget;
        this.showTargetVal = showTarget ? 0 : 2;
        this.longVal = long ? 2 : 1;
        // this.col11 = long ? 54 : 36;
        this.col11 = Math.round((target - white) * 6 / 100);
        let val = 0;
        if (type === TrialType.Rhythmic) val = 1;
        else if (type === TrialType.Interval) val = 2;
        else val = 3;
        this.trialTypeVal = val;
    }
}

class OutputOrganizer {
    constructor(userNum) {
        this.results = [];
        this.trialNum = 0;
        this.blockNum = 0;
        this.userNum = userNum;
    }

    startingBlock() {
        this.blockNum++;
        this.trialNum = 0;
    }

    updateOutput(trial, reactionTime, reactionCode) {
        this.trialNum++;
        this.results.push({
            "1 - user code": this.userNum,
            '2 - block num': this.blockNum,
            '3 - trial type': trial.trialTypeVal,
            '4 - trial num': this.trialNum,
            '5': 5,
            '6': 6,
            '7 - long(2)': trial.longVal,
            '8 - target shown (0)': trial.showTargetVal,
            '9 - reaction type': reactionCode,
            '10 - reaction time': reactionTime,
            '11 - Pre target interval code': trial.col11,
            '12 - window visible' : trialVisibility
        });

        let row = {
            "user_code": this.userNum,
            'block_num': this.blockNum,
            'trial_type': trial.trialTypeVal,
            'trial_num': this.trialNum,
            'long_2': trial.longVal,
            'target_shown': trial.showTargetVal,
            'reaction_type': reactionCode,
            'reaction_time': reactionTime,
            'interval_size': trial.col11,
            'window_visible' : trialVisibility?'visible':'hidden'
        };
        add_to_db(row);

    }
}

class Block{
    constructor(instruction, help, trialType, vid='',dontShowTargetRatio=0, length=BLOCK_LENGTH){
        this.instruction = instruction;
        this.help = help;
        this.trialType = trialType;
        this.length = length;
        this.dontShowTargetRatio = dontShowTargetRatio;
        this.vid = vid;
    }
}


async function runBlock(block, outputObj) {

    toggleMouseOff();
    outputObj.startingBlock();
    // await showInstruction(BLOCK_BEGIN_SRC);
    await showInstruction(block.instruction);
    // if first time : training block:
    let trainingMandatory = false;
    if ((outputObj.blockNum-1)%6 < 3) {
        trainingMandatory = true;
        // play vid:
        console.log('playing VID!!');
        // await playVid(block.vid);
    }
    await runTrainingBlock(block.trialType, trainingMandatory);
    await showInstruction(block.help);

    let showTarget = getRandomRatioArray(block.length, block.dontShowTargetRatio);
    let longOrShort = getRandomRatioArray(block.length, 2);
    let trial = null;
    let trialNum = 0;
    let createFunc = null;
    switch (block.trialType){
        case TrialType.Random: createFunc = createRandomTrial; break;
        case TrialType.Interval: createFunc = createSingleIntervalTrial; break;
        case TrialType.Rhythmic: createFunc = createRhythmTrial; break;
    }
    while (trialNum < block.length) {
        trial = createFunc(longOrShort[trialNum] === 0, showTarget[trialNum] === 0);
        let reaction = await runTrial(trial.reds, trial.white, trial.target, trial.showTarget);
        if (reaction[0] !== null) {
            trialNum++;
            outputObj.updateOutput(trial, reaction[0], reaction[1]);

        }
    }
    await showInstruction(END_BLOCK_SRC);
}


async function showTrainingMenu() {
    feedbackElement.src = PRACTICE_SRC;
    feedbackElement.style.display = 'block';
    let k = await waitForSpaceKey(true);
    hideNow(feedbackElement);
    return k;
}


async function showInstruction(instructionURL) {
    if (isEndExperiment)throw new EndExp('OK');
    feedbackElement.src = instructionURL;
    feedbackElement.style.display = 'block';
    await waitForSpaceKey();
    hideNow(feedbackElement);
}


function isUpperCase(str) {
    return (/^[A-Z]+$/).test(str);
}


function isDisgits(num){
    return /^\d+$/.test(num);

}


/**
 * Validates user code
 * @returns {*[]} returns true to run 75% targets section first., user code
 */
function validateUserCode(){
    // get user code
    let userCode = "";
    let valid = false;
    while (!valid) {
        userCode = prompt("Please enter user code", "");
        console.log(userCode);
        if (userCode === null || userCode.length !== 10) continue;
        if (userCode[0]!=='A' && userCode[0]!=='B') continue;
        if (userCode[1]!=='_' || !isUpperCase(userCode.slice(2,6))|| !isDisgits(userCode.slice(6))) continue; // check digits, check C letters.
        valid = true;
    }
    let first = userCode[0]==='A';
    return [first, userCode];
}

/**
 *  Run the experiment
 * @param first - run 75% targets section first ('A' subjects)
 * @param userCode - user should get from admin
 * @param twice - run both parts.
 * @returns {Promise<boolean>}
 */
async function runExperiment(first, userCode, twice=true) {


    let r_vid = RANDOM_VID_SRC;
    let i_vid = INTERVAL_VID_SRC;
    let rhythmic_vid = RHYTHMIC_VID_SRC;
    if (first) { // different vids for subject A in second part:
        r_vid = RANDOM_VID_A_SRC;
        i_vid = INTERVAL_VID_A_SRC;
        rhythmic_vid = RHYTHMIC_VID_A_SRC;
    }
    let randomBlock = new Block(RANDOM_TARGET_SRC, RANDOM_HELP_SRC, TrialType.Random, r_vid);
    let randomBlock75 = new Block(RANDOM_SRC, RANDOM_HELP_SRC, TrialType.Random, RANDOM75_VID_SRC, 4);
    let intervalBlock = new Block(INTERVAL_TARGET_SRC, INTERVAL_HELP_SRC, TrialType.Interval, i_vid);
    let intervalBlock75 = new Block(INTERVAL_SRC, INTERVAL_HELP_SRC, TrialType.Interval, INTERVAL75_VID_SRC, 4);
    let rythmicBlock = new Block(RHYTHM_TARGET_SRC, RHYTHM_HELP_SRC, TrialType.Rhythmic, rhythmic_vid);
    let rythmicBlock75 = new Block(RHYTHM_SRC, RHYTHM_HELP_SRC, TrialType.Rhythmic, RHYTHMIC75_VID_SRC, 4);

    let blocks100 = [randomBlock, intervalBlock, rythmicBlock];
    let blocks75 = [randomBlock75, intervalBlock75, rythmicBlock75];

    // output object to save results
    let outputObj = new OutputOrganizer(userCode);

    try {
        hideNow(squareElement);
        hideNow(feedbackElement);
        resizeInstructions();
        await showInstruction(INTRO_SRC);

        // randomize first 6 blocks
        let one = [];
        let two = [];
        if (first) {
            one = shuffleArray(blocks75);
            two = shuffleArray(blocks75);
        }
        else {
            one = shuffleArray(blocks100);
            two = shuffleArray(blocks100);
        }

        // run 6 blocks
        for (let i = 0; i < one.length; i++) { await runBlock(one[i], outputObj);}
        for (let i = 0; i < two.length; i++) { await runBlock(two[i], outputObj);}


        // second half
        // feedbackElement.src = HALF_SRC;
        // feedbackElement.style.display = 'block';
        // showTimer(TIMER_DURATION);
        // await waitMS(TIMER_DURATION + 2000);
        await showInstruction(HALF_SRC);

        if (twice) {
            await showInstruction(HALF_START_SRC);
            if (first) {
                one = shuffleArray(blocks100);
                two = shuffleArray(blocks100);
            }
            else {
                one = shuffleArray(blocks75);
                two = shuffleArray(blocks75);
            }

            for (let i = 0; i < one.length; i++) {await runBlock(one[i], outputObj);}
            for (let i = 0; i < two.length; i++) { await runBlock(two[i], outputObj);}
        }
    }
    catch(exc){ if(exc instanceof EndExp) {console.log('caught END :)');} console.log(exc.toString()); /* current code here */ }


    endExperiment();
    // save results
    console.log("results", outputObj.results);
    return true;
}


async function trainingBlock(type, k=KEY_KUF){
    let longOrShort = [1, 0, 0, 1, 1, 0];
    let targetList = [0, 0, 0, 2, 0, 2];
    if (type === TrialType.Random) await showInstruction(RANDOM_HELP_SRC);
    else if (type === TrialType.Interval) await showInstruction(INTERVAL_HELP_SRC);
    else if (type === TrialType.Rhythmic || type === TrialType.Rhythmic75) await showInstruction(RHYTHM_HELP_SRC);
    let trial = null;
    let trialNum = 0;
    let trainingLength = k === KEY_MEM ? LONG_TRAINING : SHORT_TRAINING;
    while (trialNum < trainingLength) {
        // await waitForSpaceKey(); // wait for experimenter.
        if (type === TrialType.Random) trial = createRandomTrial(longOrShort[trialNum]);
        else if (type === TrialType.Interval) trial = createSingleIntervalTrial(longOrShort[trialNum]);
        else if (type === TrialType.Rhythmic) trial = createRhythmTrial(longOrShort[trialNum], true);
        else if (type === TrialType.Rhythmic75) trial = createRhythmTrial(longOrShort[trialNum], targetList[trialNum] === 0);
        let reaction = await runTrial(trial.reds, trial.white, trial.target, trial.showTarget);
        if (reaction[0] !== null) {
            trialNum++;
        }
    }
}


async function runTrainingBlock(type, mandatory) {
    if(mandatory) {
        // show intro training:
        await showInstruction(TRAINING_MANDATORY_SRC);
        await trainingBlock(type); // first time is mandatory.
    }
    let k = await showTrainingMenu();
    while (k === KEY_MEM || k === KEY_KUF) { //KEY_MEM is old remnant from long training
        await trainingBlock(type);
        // await waitForSpaceKey();
        k = await showTrainingMenu();
    }
}


/**
 * creates a single trial object of type Interval.
 * @returns {Trial} trial object.
 */
function createSingleIntervalTrial(long, showTarget=true) {
    let intervals = [];
    let cue = [600, 900][long ? 1 : 0];
    let ISIShort = [1.3, 1.4, 1.5, 1.6, 1.7];
    let ISILong = [1.95, 2.1, 2.25, 2.4, 2.55]; //inter-pair interval in interval condition
    let initial = 1;
    intervals.push(initial); // first red box.
    intervals.push(initial + cue); // second red box.
    let randomIndex = Math.floor(Math.random() * ISIShort.length);
    let randomOffset = ISIShort[randomIndex] * 1000;
    if (long) randomOffset = ISILong[randomIndex] * 1000;
    intervals.push(initial + cue + randomOffset);
    intervals.push(initial + cue + randomOffset + cue);

    return new Trial(intervals.slice(0, 2), intervals[2], intervals[3], TrialType.Interval, long, showTarget);
}


/**
 * creates a single trial object of type Random.

 * @returns {Trial} trial object.
 */
function createRandomTrial(long, showTarget=true) {
    let intervals = [];
    let ISIShort = [0.4, 0.5, 0.6, 0.7, 0.8];
    let ISILong = [0.6, 0.75, 0.9, 1.05, 1.2];
    let ISIs = long ? ISILong : ISIShort;

    let offset = 0;
    intervals.push(1);
    for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * ISIs.length);
        offset += ISIs[randomIndex] * 1000;
        intervals.push(offset);
    }

    return new Trial(intervals.slice(0, 3), intervals[3], intervals[4], TrialType.Random, long, showTarget);
}


/**
 * retun array of length 'size' full of zeros. with '2' once every 'factor'. shuffled randomly.
 * so for an array of length 20, with a quarter '2', do: getRandomRatioArray(20, 4);
 * @param size length of array
 * @param factor ratio: (1/factor)
 * @returns {Array} shuffled array
 */
function getRandomRatioArray(size, factor) {
    if (factor < 1) return Array(size).fill(0);

    let bucket = [];
    let result = [];
    for (let i = 0; i < size; i++) {
        if (i % factor === 0) bucket.push(2);
        else bucket.push(0);
    }

    for (let i = 0; i < size; i++) {
        let randomIndex = Math.floor(Math.random() * bucket.length);
        result.push(bucket.splice(randomIndex, 1)[0]);
    }
    return result;
}


/**
 * creates a single trial object of type Rhythmic.
 * @param long true for long intervals (9000)
 * @param showTarget true to show target
 * @returns {Trial} trial object.
 */
function createRhythmTrial(long, showTarget) {
    if (long) return new Trial([1, 900, 1800], 2700, 3600, TrialType.Rhythmic, long, showTarget);
    else return new Trial([1, 600, 1200], 1800, 2400, TrialType.Rhythmic, long, showTarget);
}


async function runTrial(reds, white, target, showTarget) {
    let response = -1;
    trialVisibility = !document.hidden && document.hasFocus(); // reset visible value
    await waitMS(MS_BETWEEN_TRIALS);
    setupTrial(reds, white, target, showTarget);
    if (isEndExperiment)throw new EndExp('in trial');
    let reactionTime = await timeReaction(target, MS_SHOW_TARGET);
    if (isEndExperiment)throw new EndExp('in trial');

    hideNow(squareElement);
    console.log("relative reaction: ", reactionTime);
    if (reactionTime !== null) {
        if (reactionTime < 0) {
            response = -1;
            await feedbackEarly();
        } // early.
        else if (reactionTime === MS_SHOW_TARGET) {
            response = 0;
            if (showTarget) await feedbackLate();
        } // late(didn't press)
        else {
            response = 1;
            if (!showTarget) {
                await feedbackNoTarget();
            }  // pressed even though no target:
        }
    }
    else { // pressed other key then space:
        await feedbackWrongKey();
        return [getMSRelativeToTarget(), 0]

    }
    return [reactionTime, response];
}


function setupTrial(reds, white, target, showTargetSquare = true) {
    hideNow(squareElement);
    console.log("starting trial..");
    reds.forEach(timing => timers.push(setTimeout(showStimuli, timing, squareElement, MS_SHOW_CUE, REDS_COLOR)));
    timers.push(setTimeout(showStimuli, white, squareElement, MS_SHOW_CUE, WHITE_COLOR));
    timers.push(setTimeout(showTarget, target, showTargetSquare));
    expectedTargetTime = getElapsedMS() + target;
}


function waitForSpaceHelper(resolve, train) {

    window.addEventListener('keydown', ev => {
        if (isEndExperiment)throw new EndExp('OK');
        if (ev.code === 'Space') {
            console.log('Space pressed, instructions');
            resolve(getElapsedMS());
        }
        else if (train && ev.code === 'KeyE') {
            resolve(KEY_KUF);
        }
        // else if (train && ev.code === 'KeyN') {
        //     resolve(KEY_MEM);
        // }
        else {
            console.log('Different Key pressed, instructions');
            waitForSpaceHelper(resolve, train);
        }
    }, {useCapture:true, once:true}); // remove after press
}

async function waitForSpaceKey(train = false) {
    return new Promise(resolve => {
        waitForSpaceHelper(resolve, train);
    });
}

/**
 * Waits for key press , or till stimuli should finish being shown.
 * Returns timing of keyPress, relative to stimuli event (can be a negative number.)
 *  (Can also be used to show instruction till key pressed, or for 'MSTillStimuli + MSShowStimuli' time.
 *  doesn't show things, only waits and records time.)
 * @param MSTillStimuli MS till stimuli will be shown
 * @param MSShowStimuli - MS to wait for user to react to stimuli.
 * @returns {Promise<int>} time relative to stimuli onset.
 */
function timeReaction(MSTillStimuli, MSShowStimuli) {
    return new Promise(resolve => {

        setTimeout(() => {
            resolve(MSShowStimuli);
        }, MSTillStimuli + MSShowStimuli); // if no press, return.

        window.addEventListener('keydown', ev => {
            resetState(); // don't show late msg..

            if (ev.code === 'Space') {
                console.log('Space pressed');
                resolve(getMSRelativeToTarget());
            }
            else { // other key: return false
                resolve(null);
            }
        }, {once: true}); // remove after press
    });
}


function resetState() {
    clearTimers();
}


function feedbackEarly() {
    resetState();
    feedbackElement.src = EARLY_SRC;
    showMS(feedbackElement, MS_SHOW_FEEDBACK);
    return waitMS(MS_SHOW_FEEDBACK);
}


function feedbackNoTarget() {
    resetState();
    feedbackElement.src = ONLY_STIMULI_SRC;
    showMS(feedbackElement, MS_SHOW_FEEDBACK);
    return waitMS(MS_SHOW_FEEDBACK);
}


function feedbackLate() {
    resetState();
    feedbackElement.src = NO_RESPONSE_SRC;
    showMS(feedbackElement, MS_SHOW_FEEDBACK);
    return waitMS(MS_SHOW_FEEDBACK);
}


function feedbackWrongKey() {
    resetState();
    feedbackElement.src = OTHER_KEY_SRC;
    showMS(feedbackElement, MS_SHOW_FEEDBACK);
    return waitMS(MS_SHOW_FEEDBACK);
}


function clearTimers() {
    timers.forEach(function (timer) {
        clearTimeout(timer);
    });
    timers = [];
}


//  shows stimuli if trial not aborted:
function showStimuli(object, MS, color) {
    showMS(object, MS, color);
}

function showTarget(show = true) {
    targetShownTS = getElapsedMS();
    console.log("expected minus actual", expectedTargetTime, targetShownTS, expectedTargetTime - targetShownTS);
    expectedTargetTime = getElapsedMS();
    if (show) showMS(squareElement, MS_SHOW_TARGET, TARGET_COLOR);
}


function getElapsedMS() {
    return new Date().getTime() - startTime;
}

function getMSRelativeToTarget() {
    return getElapsedMS() - expectedTargetTime;
}


function hideNow(object) {
    object.style.display = 'none';
}

// show object for MS milliseconds. optional: change color.
function showMS(object, MS, color) {
    if (typeof color !== 'undefined') {object.style.background = color;}
    object.style.display = 'block';
    console.log('stimulus', getElapsedMS() - relativeTime);
    relativeTime = getElapsedMS();
    setTimeout(hideNow, MS, object);
}


/**
 * like sleep(). pauses calling function for 'MS' MS..
 * @param MS
 * @returns
 */
function waitMS(MS) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, MS);
    });
}


function resizeInstructions() {
    let img = feedbackElement;
    let wid = Math.floor(window.innerWidth);
    img.style.width = wid + 'px';
    img.style.height = window.innerHeight + 'px';
    // img.style.maxWidth = wid + 'px';
    // img.style.maxHeight = window.innerHeight + 'px';
    img.style.position = 'center';
}


function shuffleArray(array) {
    let result = array.slice(0);
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}


function add_to_db(row) {
    // let xhr = new XMLHttpRequest();
    // try localhost/squares
    // xhr.open("POST", 'data_collector_squares', true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify(row));

    $.post('data_collector_squares', row, function (data) {
        console.log(data);
    });
}

/**
 * Updates visibility state, to know if user switched windows.
 */
let visibilityChange = (function (window) {
    let inView = false;
    return function (fn) {
        window.onfocus = window.onblur = window.onpageshow = window.onpagehide = function (e) {
            if ({focus:1, pageshow:1}[e.type]) {
                if (inView) return;
                fn("visible");
                inView = true;
            } else if (inView) {
                fn("hidden");
                inView = false;
            }
        };
    };
}(this));

visibilityChange(function (state) {
    currentVisibility = state === 'visible';
    if (!currentVisibility){trialVisibility = false;} // Only update trialVisibility if false.
    console.log('current', state);
});


function goFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement
        && !document.msFullscreenElement ) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
}


function exitFullScreen(){
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
}


function endExperiment() {
    // user pressed space:
    console.log('ending experiment');
    exitFullScreen();
    resetState();
    isEndExperiment = true;
    hideNow(video);
    video.pause();
    hideNow(squareElement);
    // hideNow(timerElement);
    feedbackElement.src = END_SRC;
    feedbackElement.style.display = 'block';
    toggleMouseOn();
}

function showTimer(duration) {
    showMS(timerElement , duration + 5000, '#ff00ff');
    let timeElement = document.getElementById('time');
    timeElement.style.fontSize = "xx-large";
    duration = duration / 1000; // MS to seconds
    let time = duration, minutes, seconds;

    let id = setInterval(function () {
        minutes = Math.floor(time / 60);
        seconds = time % 60;

        // add leading zero
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timeElement.textContent = minutes + ":" + seconds;

        if (--time < 0) {
           clearInterval(id);
            }
    }, 1000);
}




// actual run:
// let first = Math.random() > 0.5;
const [first, userCode] = validateUserCode();
// const [first, userCode] = [true, 'ASDN'];
function EndExp(){ Error.apply(this, arguments); this.name = "EndExp"; }
EndExp.prototype = Object.create(Error.prototype);
let finished = runExperiment(first, userCode);


