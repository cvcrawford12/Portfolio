// init test data
var premierLeague = ["Arsenal", "Manchester United", "Chelsea FC", "Everton", "Southhampton", "Manchester City"];
var bundesligaLeague = ["FC Bayern", "FC Schalke", "Borussia Dortmund"];
var laLigaLeague = ["FC Barcelona", "Real Madrid", "Atlético Madrid", "Sevilla"];
var championsLeague = ["Real Madrid", "FC Barcelona", "Juventus", "FC Bayern"];

// dictionary of all the leagues and their corresponding teams
var leagues = {
  "premier league": premierLeague,
  "bundesliga": bundesligaLeague,
  "la liga": laLigaLeague,
  'champions league': championsLeague
}


function removeData(chart, chartId) {
  chart.data.datasets.length = 0;
  if (chartId === 'eventsChart') {
    chart.data.labels.length = 0;
  }
}

function addData(chart, data) {
  chart.data.datasets.push(data);
}

function getNumSelectedTeams(id, teamBtnId) {
  var teams = document.querySelector(id).querySelectorAll('li a');

  teams.forEach(function(team) {
    // for each team add an event listener to check if checked or not
    team.addEventListener('click', function() {
      var input = this.querySelector('input');
      checkInputs(input, teams, id, teamBtnId);

    });
  });
}

function getRandomData(numOfTeams) {
  var data = [];
  var randomNumber;
  for (var i = 0; i < numOfTeams; i++) {
    randomNumber = Math.floor((Math.random() * 100) + 1);
    data.push(randomNumber);
  }
  return data;
}

// Main function for handling the text for the filter buttons
function checkInputs(input, teams, teamListId, teamButtonId) {
  var numOfTeams;
  var queriedTeams = document.querySelector(teamListId);
  var teamsButton = document.getElementById(teamButtonId);
  if (input.checked === false) {
    input.checked = true;
    numOfTeams = queriedTeams.querySelectorAll('input[type="checkbox"]:checked').length;

  } else {
    teams[teams.length - 1].checked = false;
    input.checked = false;
    numOfTeams = queriedTeams.querySelectorAll('input[type="checkbox"]:checked').length;
  }
  teamsButton.textContent = numOfTeams + " Teams";
}

function getTeams(chart, leagueBtnId, teamBtnId, teamsListQuery, teamListId) {
  var dropdownItems = document.getElementById(chart).querySelectorAll('li a');
  dropdownItems.forEach(function(item) {
    item.addEventListener('click', function() {
      if (item.parentNode.parentNode.id === 'leagues') {
        league = item.textContent;

        document.getElementById(leagueBtnId).textContent = league;
        document.getElementById(teamBtnId).textContent = "Teams";

        // remove previous teams and append new teams
        $(teamsListQuery).remove();
        var leagueKey = league.toLowerCase();
        leagues[leagueKey].forEach(function(team) {
          // dynamically add teams to the list
          $(teamListId).append("<li><a><input data-value=" + team + " type='checkbox'> " + team + "</a></li>");
        });
        getNumSelectedTeams(teamListId, teamBtnId);
      }
    });
  });
}
