var teams = [
    {id: 1, name: "Aston Villa", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 2, name: "Manchester United", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 3, name: "Liverpool", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 4, name: "Chelsea", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 5, name: "Arsenal", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 6, name: "Manchester City", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 7, name: "Tottenham Hotspur", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 8, name: "Leicester City", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 9, name: "Everton", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 10, name: "West Ham United", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 11, name: "Wolverhampton Wanderers", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 12, name: "Leeds United", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 13, name: "Southampton", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 14, name: "Crystal Palace", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 15, name: "Newcastle United", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 16, name: "Brighton & Hove Albion", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 17, name: "Burnley", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 18, name: "Sheffield United", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 19, name: "Fulham", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0},
    {id: 20, name: "West Bromwich Albion", played: 0, won: 0, lost: 0, draw: 0, goals_for: 0, goals_against: 0}
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
                roundFixtures.push({ home_score:0,home: home, away: away,  });
            } else {
                roundFixtures.push({ home_score:0, home: away, away: home });
            }
        }
        fixtures.push(roundFixtures);

        // Rotate teams (except the first one)
        let last = teams.pop();
        teams.splice(1, 0, last);
    }

    return fixtures;
}

let fixtures = generateFixtures(teams);
console.log(fixtures);