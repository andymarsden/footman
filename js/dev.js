const myFunctions = require('./utils.js');

const teams = myFunctions.teams;


var fixtures = []
var league = []



function getGoals()
{

}

function match_engine(fixture)
{

}

function simulate_match(fixture)
{


  // let hs = myFunctions.weightedRandom(items,weights).item;
  // let as = myFunctions.weightedRandom(items,weights).item;


  //Attempt at relative strength 
  let h_strength = fixture.home.strength;
  let a_strength = fixture.away.strength;
  let strength_difference = Math.abs(h_strength - a_strength)

  if(h_strength > a_strength)
  {
    h_strength = h_strength * (1+strength_difference)
   // a_strength = a_strength * strength_difference
  }
  else
  {
  //  h_strength = h_strength * strength_difference
    a_strength = a_strength * (1+strength_difference)
  }

  let home_weights = myFunctions.adjustWeights(items,weights,h_strength);
  let away_weights = myFunctions.adjustWeights(items,weights,a_strength);

  // let home_weights = myFunctions.adjustWeights(items,weights,fixture.home.strength);
  // let away_weights = myFunctions.adjustWeights(items,weights,fixture.away.strength);



  let hs = myFunctions.weightedRandom(items,home_weights).item;
  let as = myFunctions.weightedRandom(items,away_weights).item;
  
  fixture.home_score = hs;
  fixture.away_score = as;

  fixture.home.played +=1;
  fixture.away.played +=1;

  fixture.home.goals_for += hs;
  fixture.home.goals_against += as;

  fixture.away.goals_for += as;
  fixture.away.goals_against += hs;

  if(hs>as)
  {
    fixture.home.points += 3;
    fixture.home.won +=1;
    fixture.away.lost +=1;
  }
  else if(hs == as)
  {
    fixture.home.points += 1;
    fixture.away.points += 1;
    fixture.home.draw +=1;
    fixture.away.draw +=1;
  }
  else
  {
    fixture.away.points += 3;
    fixture.away.won +=1;
    fixture.home.lost +=1;
  }

}

function update_league()
{
  
}

function process_week(round,index)
{
  round.forEach(simulate_match);
}

function gameweek()
{

}

  var items = [0,1,2,3,4,5,6,7,8]
  var weights = [0.27,0.30,0.25,0.03,0.03,0.01,0.007,0,0]
  //var weights = [0.17,0.28,0.25,0.16,0.06,0.03,0.007,0,0] <-- REAL ONE
  //var weights = [0.79,0.21,0.1,0,0,0,0,0,0]

  fixtures = myFunctions.generateFixtures(teams);

  fixtures.forEach(process_week)

  teams.sort((a, b) => b.points - a.points);

  console.table(teams)
  //debugger

  // for (let i = 0; i < 100; i++) {
  //   console.log(myFunctions.weightedRandom(items,weights).item,myFunctions.weightedRandom(items,weights).item)
  // }

  function calculateRelativeStrengthScore(rating1, rating2) {
    // Normalize the ratings between 0 and 1
    let normalizedRating1 = (rating1 - 1) / 99;
    let normalizedRating2 = (rating2 - 1) / 99;
    
    // Calculate the relative strength
    let strengthRatio = normalizedRating1 / normalizedRating2;
    
    // Map the relative strength to a score between 1 and 10
    let score = 1 + 9 * strengthRatio;
    
    // Ensure the score is within bounds (1 to 10)
    score = Math.max(1, Math.min(score, 10));
    
    return score;
}

// Example usage
let team1Rating = 99;
let team2Rating = 70;
let relativeStrengthScore = calculateRelativeStrengthScore(team1Rating, team2Rating);

console.log("Relative Strength Score:", relativeStrengthScore);