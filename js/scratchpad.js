const DEBUG = false;
let events = {
  attacking: {
    shoot: {
      goal: {
        actions: [
          [
            { text: "Here is a chance", delay: 5 },
            { text: "He shoots......", delay: 5 },
            { text: "GOOOALLLLLLL", type: "flash", delay: 50 },
            { text: "What a screamer from outside the area", delay: 25 }
          ],
          [
            { text: "A brilliant pass into the box", delay: 5 },
            { text: "He lines it up...", delay: 10 },
            { text: "GOAL!!!", type: "flash", delay: 50 },
            { text: "Unbelievable strike!", delay: 25 }
          ],
          [
            { text: "Quick one-two on the edge of the box", delay: 5 },
            { text: "He goes for the shot...", delay: 10 },
            { text: "GOAL!!!", type: "flash", delay: 50 },
            { text: "A perfectly placed finish into the bottom corner", delay: 25 }
          ],
          [
            { text: "A cross comes in from the wing", delay: 5 },
            { text: "He meets it with a header...", delay: 10 },
            { text: "GOAL!!!", type: "flash", delay: 50 },
            { text: "A powerful header leaves the keeper stranded", delay: 25 }
          ],
          [
            { text: "The ball breaks loose in the box", delay: 5 },
            { text: "He strikes it first-time...", delay: 10 },
            { text: "GOAL!!!", type: "flash", delay: 50 },
            { text: "What a finish under pressure!", delay: 25 }
          ]
        ]
      },
      miss: {
        actions: [
          [
            { text: "He finds himself in space...", delay: 5 },
            { text: "He shoots......", delay: 25 },
            { text: "It's wide of the post!", delay: 25 },
            { text: "The fans can't believe he missed that!", delay: 25 }
          ],
          [
            { text: "A fantastic opportunity in front of goal", delay: 5 },
            { text: "He takes the shot...", delay: 30 },
            { text: "But it's over the bar!", delay: 20 },
            { text: "A wasted chance", delay: 25 }
          ],
          [
            { text: "Great build-up play", delay: 5 },
            { text: "He pulls the trigger...", delay: 25 },
            { text: "And it's off the post!", delay: 25 },
            { text: "So close to scoring", delay: 25 }
          ],
          [
            { text: "A low cross into the box", delay: 5 },
            { text: "He tries to steer it in...", delay: 30 },
            { text: "But it's just wide!", delay: 20 },
            { text: "Agonizingly close!", delay: 25 }
          ],
          [
            { text: "A clever through ball", delay: 5 },
            { text: "He's in on goal...", delay: 25 },
            { text: "But the shot goes wide!", delay: 20 },
            { text: "A missed opportunity", delay: 25 }
          ]
        ]
      }
    }
  }
}

let flash = 0;
function flash_event(message) {
  console.log('FLASH')
    document.getElementById('info').innerText = message;
}


function show_event(message, type) {
  if (DEBUG) {
    console.log(message)
  }
  else {
    if (type == "flash") {
      flash_event(message);

      var element = document.getElementById("info");
      element.classList.add("blink-css");



    }
    else {
      var element = document.getElementById("info");
      element.classList.remove("blink-css");
      element.innerText = message;
    }
  }
}

function update_clock(time) {
  if (DEBUG) {
    console.log(time)
  }
  else {
    document.getElementById('time').innerText = time;
  }
}

// Function to pick a random action sequence
function getRandomActionSequence(actions) {
  const randomIndex = Math.floor(Math.random() * actions.length);
  return actions[randomIndex];
}

// Function to display the action sequence and call a callback when done
function displayActionSequenceWithCallback(actionSequence, callback) {
  let totalDelay = 0;

  actionSequence.forEach((action, index) => {
    totalDelay += action.delay * 75;
    setTimeout(() => {

      show_event(action.text, action.type);

      // Here you can also handle 'action.type' if needed
      if (index === actionSequence.length - 1) {
        callback(); // Call the callback after the last action
      }
    }, totalDelay);
  });
}

// Pick and display a random action sequence
const randomActionSequence = getRandomActionSequence(events.attacking.shoot.goal.actions);
//displayActionSequence(randomActionSequence);

let interupt = 4;
let time = 0;
let intervalId = setInterval(gameclock, 1000);


function gameclock() {
  time++;
  if (time == interupt) {
    clearTimeout(intervalId);
    displayActionSequenceWithCallback(randomActionSequence, () => {
      intervalId = setInterval(gameclock, 1000);
    });
  }
  update_clock(time);

}
