
/**
 * Picks the random item based on its weight.
 * The items with higher weight will be picked more often (with a higher probability).
 *
 * For example:
 * - items = ['banana', 'orange', 'apple']
 * - weights = [0, 0.2, 0.8]
 * - weightedRandom(items, weights) in 80% of cases will return 'apple', in 20% of cases will return
 * 'orange' and it will never return 'banana' (because probability of picking the banana is 0%)
 *
 * @param {any[]} items
 * @param {number[]} weights
 * @returns {{item: any, index: number}}
 */
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

  //use map to add a property

  var teams = [
    {id: 1, name: "Aston Villa", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 99999},
    {id: 2, name: "Manchester United", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 10},
    {id: 3, name: "Liverpool", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 8},
    {id: 4, name: "Chelsea", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 7},
    {id: 5, name: "Arsenal", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 15},
    {id: 6, name: "Manchester City", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength:100},
    {id: 7, name: "Tottenham Hotspur", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 91},
    {id: 8, name: "Leicester City", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 0.001},
    {id: 9, name: "Everton", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 0.5},
    {id: 10, name: "West Ham United", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 2},
    {id: 11, name: "Wolverhampton Wanderers", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 0.001},
    {id: 12, name: "Leeds United", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 0.001},
    {id: 13, name: "Southampton", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 0.001},
    {id: 14, name: "Crystal Palace", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 0.001},
    {id: 15, name: "Newcastle United", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 0.001},
    {id: 16, name: "Brighton & Hove Albion", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 0.001},
    {id: 17, name: "Burnley", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 0.100},
    {id: 18, name: "Sheffield United", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 0.001},
    {id: 19, name: "Fulham", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 0.001},
    {id: 20, name: "West Bromwich Albion", points:0, played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0, strength: 0.001}
];

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

// var t = shuffleArray(teams)

function generateFixtures(t) {
  t = shuffleArray(t)
  let fixtures = [];
  let rounds = (teams.length - 1) * 2;  // Number of rounds (2 because of home and away)
  let halfSize = teams.length / 2;

  // Generate round-robin for the first half (home and away)
  for (let round = 0; round < rounds; round++) {
      let roundFixtures = [];
      for (let i = 0; i < halfSize; i++) {
          let home = teams[i];
          let away = teams[teams.length - 1 - i];

          if (round % 2 === 0) {
            roundFixtures.push({ home_score:0,away_score:0, status: 'upcoming',home: home, away: away,  });
        } else {
            roundFixtures.push({ home_score:0,away_score:0, status: 'upcoming', home: away, away: home });
        }
      }
      fixtures.push(roundFixtures);

      // Rotate teams (except the first one)
      let last = teams.pop();
      teams.splice(1, 0, last);
  }

  return fixtures;
}

function adjustWeights(items, weights, strength) {
  // Step 1: Apply the strength to increase weights of larger items
  const adjustedWeights = weights.map((weight, index) => {
      return weight * (1 + strength * (items[index] / Math.max(...items)));
  });

  // Step 2: Calculate the total of adjusted weights
  const totalWeight = adjustedWeights.reduce((acc, weight) => acc + weight, 0);

  // Step 3: Normalize the weights to ensure they sum to 1
  const normalizedWeights = adjustedWeights.map(weight => weight / totalWeight);

  return normalizedWeights;
}

module.exports = {
  weightedRandom,
  teams,
  generateFixtures,
  adjustWeights
}

