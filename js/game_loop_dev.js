const IS_TEST = false;

function weightedRandom(items, weights) {
    if (items.length !== weights.length) {
      throw new Error('Items and weights must be of the same size');
    }
    if (!items.length) {
      throw new Error('Items must not be empty');
    }
    // Preparing the cumulative weights array.
    // For example:
    // - weights = [1, 4, 3]
    // - cumulativeWeights = [1, 5, 8]
    const cumulativeWeights = [];
    for (let i = 0; i < weights.length; i += 1) {
      cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
    }
    // Getting the random number in a range of [0...sum(weights)]
    // For example:
    // - weights = [1, 4, 3]
    // - maxCumulativeWeight = 8
    // - range for the random number is [0...8]
    const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
    const randomNumber = maxCumulativeWeight * Math.random();
    // Picking the random item based on its weight.
    // The items with higher weight will be picked more often.
    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      if (cumulativeWeights[itemIndex] >= randomNumber) {
        return {
          item: items[itemIndex],
          index: itemIndex,
        };
      }
    }
  }
var count = 0;
var goals = 0;
var shots = 0;
var is_simulated = true;
// Function to be executed every second

let shot_outcome = ["goal","no goal"];
let shot_outcome_weight = [0.2,0.8];

let attempt_outcome = ["shot","no shot"];
let attempt_outcome_weight = [0.08,0.92];

function myFunction() {

    let attempt = weightedRandom(attempt_outcome,attempt_outcome_weight);
    let shot = weightedRandom(shot_outcome,shot_outcome_weight);
    if(attempt.item == "shot"){
        shots ++
        if(shot.item == "goal"){
            console.log(count,"SHOOTS","GOOOOAAALLLLLLLLLLL in off the post");
            document.getElementById('info').innerText = "SHOOOTS,      GOAL!!!!!!";

            goals ++
        }
        else
        {
            console.log(count,"SHOOTS","MISSED");
            document.getElementById('info').innerText = "SHOOOTS,      MISSED";
        }

    }
    else
    {
        console.log(count)
    }
    count ++
    document.getElementById('time').innerText = "Time elapsed: "+count;
    if(count == 90){
        finish();
        return;
    }
    if(is_simulated == false){
        myFunction();
    }
}
let intervalId
// Start the interval timer
if(is_simulated == true){
    intervalId = setInterval(myFunction, 1); // 1000 milliseconds = 1 second
}
else{
    myFunction();
}
function finish(){
    if(is_simulated){
      clearInterval(intervalId);
    }
  console.log('shots',shots, 'goals', goals);
  document.getElementById('info').innerText = "Shots "+shots + "   goals  " + goals;
}

let events = {
  attacking: {
    shoot: {
      goal: {
        actions: [
          [
            { text: "Here is a chance", delay: 25 },
            { text: "He shoots......", delay: 25 },
            { text: "GOOOALLLLLLL", type: "flash", delay: 25 },
            { text: "What a screamer from outside the area", delay: 25 }
          ],
          [
            { text: "A brilliant pass into the box", delay: 25 },
            { text: "He lines it up...", delay: 30 },
            { text: "GOAL!!!", type: "flash", delay: 20 },
            { text: "Unbelievable strike!", delay: 25 }
          ],
          [
            { text: "Quick one-two on the edge of the box", delay: 20 },
            { text: "He goes for the shot...", delay: 25 },
            { text: "GOAL!!!", type: "flash", delay: 25 },
            { text: "A perfectly placed finish into the bottom corner", delay: 25 }
          ],
          [
            { text: "A cross comes in from the wing", delay: 20 },
            { text: "He meets it with a header...", delay: 30 },
            { text: "GOAL!!!", type: "flash", delay: 20 },
            { text: "A powerful header leaves the keeper stranded", delay: 25 }
          ],
          [
            { text: "The ball breaks loose in the box", delay: 20 },
            { text: "He strikes it first-time...", delay: 25 },
            { text: "GOAL!!!", type: "flash", delay: 20 },
            { text: "What a finish under pressure!", delay: 25 }
          ]
        ]
      },
      miss: {
        actions: [
          [
            { text: "He finds himself in space...", delay: 25 },
            { text: "He shoots......", delay: 25 },
            { text: "It's wide of the post!", delay: 25 },
            { text: "The fans can't believe he missed that!", delay: 25 }
          ],
          [
            { text: "A fantastic opportunity in front of goal", delay: 25 },
            { text: "He takes the shot...", delay: 30 },
            { text: "But it's over the bar!", delay: 20 },
            { text: "A wasted chance", delay: 25 }
          ],
          [
            { text: "Great build-up play", delay: 20 },
            { text: "He pulls the trigger...", delay: 25 },
            { text: "And it's off the post!", delay: 25 },
            { text: "So close to scoring", delay: 25 }
          ],
          [
            { text: "A low cross into the box", delay: 20 },
            { text: "He tries to steer it in...", delay: 30 },
            { text: "But it's just wide!", delay: 20 },
            { text: "Agonizingly close!", delay: 25 }
          ],
          [
            { text: "A clever through ball", delay: 20 },
            { text: "He's in on goal...", delay: 25 },
            { text: "But the shot goes wide!", delay: 20 },
            { text: "A missed opportunity", delay: 25 }
          ]
        ]
      }
    }
  }
}

function show_event() {

}

// Function to pick a random action sequence
function getRandomActionSequence(actions) {
  const randomIndex = Math.floor(Math.random() * actions.length);
  return actions[randomIndex];
}

// Function to display the action sequence
function displayActionSequence(actionSequence) {
  actionSequence.forEach((action, index) => {
    setTimeout(() => {
      console.log(action.text);
      // Here you can also handle 'action.type' if needed
    }, index * action.delay * 75); // Adjust delay multiplier as needed
  });
}

// Pick and display a random action sequence
const randomActionSequence = getRandomActionSequence(events.attacking.shoot.goal.actions);
displayActionSequence(randomActionSequence);