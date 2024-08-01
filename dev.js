const myFunctions = require('./utils.js');

const teams = myFunctions.teams;


var fixtures = []
var league = []



function getGoals()
{

}

function simulate_match(fixture)
{
  let hs = myFunctions.weightedRandom(items,weights).item;
  let as = myFunctions.weightedRandom(items,weights).item;
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

function print_league(team)
{
  console.log(team.name,team.points, team.goals_for, team.goals_against);

}


  var items = [0,1,2,3,4,5,6,7,8]
  var weights = [0.178947368,0.286842105,0.255263158,0.165789474,0.068421053,0.036842105,0.007894737,0,0]

  fixtures = myFunctions.generateFixtures(teams);

  fixtures.forEach(process_week)

  teams.sort((a, b) => b.points - a.points);
  teams.forEach(print_league)

  console.table(teams)
  //debugger

  // for (let i = 0; i < 100; i++) {
  //   console.log(myFunctions.weightedRandom(items,weights).item,myFunctions.weightedRandom(items,weights).item)
  // }