const f = require('./utils.js');

var count = 0;
var goals = 0;
var shots = 0;
var is_simulated = false;
// Function to be executed every second

let shot_outcome = ["goal","no goal"];
let shot_outcome_weight = [0.4,0.6];

let attempt_outcome = ["shot","no shot"];
let attempt_outcome_weight = [0.1,0.9];

function myFunction() {
    
    let attempt = f.weightedRandom(attempt_outcome,attempt_outcome_weight);
    let shot = f.weightedRandom(shot_outcome,shot_outcome_weight);
    if(attempt.item == "shot")
    {
        shots ++
        if(shot.item == "goal")
        {
            console.log(count,"SHOOTS","GOOOOAAALLLLLLLLLLL");
            goals ++
        }
        else
        {
            console.log(count,"SHOOTS","MISSED");
        }

    }
    else
    {
        console.log(count)
    }
    count ++

    if(count == 90)
    {


        finish();
        return;
    }
    
    if(is_simulated == false)
    {
        myFunction();
    }

   // console.log(attempt);
    // Add any logic you want to execute repeatedly here
}
let intervalId
// Start the interval timer
if(is_simulated == true)
{
    intervalId = setInterval(myFunction, 1); // 1000 milliseconds = 1 second
}
else
{
    myFunction();
}


// To stop the interval after a certain condition, you can use clearInterval

//clearInterval(intervalId); // Uncomment this line to stop the interval

function finish(){
    if(is_simulated)
        {
            clearInterval(intervalId);
        }
    console.log('shots',shots, 'goals', goals);
}