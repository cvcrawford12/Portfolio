function main() {
  var content;

  $('#leagueTeams-popover').popover({
    trigger: 'manual',
    title: function() {
      return '<button style="color:#fff; opacity:1;" class="close">&times</button>';
    },
    content: function() {
      return content;
    },
    html: true
   });

   $('#leagueTeams-popover').on('shown.bs.popover', function() {
     $('.close').on('click', function() {
       $('#leagueTeams-popover').popover('hide');
     });
   });

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

  var premierTestData = [40, 20, 10, 19, 12, 17];
  var bundesligaTestData = [20, 30, 72, 19, 12];
  var backgroundColors = {
    'facebook': {
        normal: "rgba(59, 89, 152, 1.0)",
        faded: "rgba(59, 89, 152, 0.8)"
    },
    'twitter': {
        normal: 'rgba(0, 172, 237, 1.0)',
        faded: 'rgba(0, 172, 237, 0.8)'
    },
    'pinterest': {
      normal: 'rgba(201,34,40,1.0)',
      faded: 'rgba(201,34,40, 0.8)'
    },
    'youtube': {
      normal: 'rgba(204,24,30,1.0)',
      faded: 'rgba(204,24,30,0.8)'
    },
    'instagram': {
      normal: 'rgba(252, 204, 99, 1.0)',
      faded: 'rgba(252, 204, 99, 0.8)'
    },
    'all': {
      normal: 'rgba(56,192,201,1)',
      faded: 'rgba(56,192,201,0.8)'
      // normal: [
      //     'rgba(255, 99, 132, 1.0)',
      //     'rgba(54, 162, 235, 1.0)',
      //     'rgba(255, 206, 86, 1.0)',
      //     'rgba(75, 192, 192, 1.0)',
      //     'rgba(153, 102, 255, 1.0)',
      //     'rgba(255, 159, 64, 1.0)'
      // ],
      // faded: [
      //     'rgba(255, 99, 132, 0.8)',
      //     'rgba(54, 162, 235, 0.8)',
      //     'rgba(255, 206, 86, 0.8)',
      //     'rgba(75, 192, 192, 0.8)',
      //     'rgba(153, 102, 255, 0.8)',
      //     'rgba(255, 159, 64, 0.8)'
      // ]
    }
    // '9inesports'
  }


  // initialize chart
  var ctx = document.getElementById("barChart").getContext('2d');
  var barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Arsenal", "Manchester United", "Chelsea FC", "Everton", "Southhampton", "Manchester City"],
        datasets: [{
            label: '# of Posts',
            data: premierTestData,
            backgroundColor: backgroundColors.all.faded,
            borderColor: backgroundColors.all.normal,
            borderWidth: 1
        }]
    },
    // Chart options for custom styling
    options: {
        layout: {
          padding: {
            top: 20
          }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                gridLines: {
                  color: 'lightgrey',
                  lineWidth: 0.2
                }
              }],
            xAxes: [{
              gridLines: {
                display:false
              },
              ticks: {
                minRotation: 15,
                maxRotation: 55
              },
              barThickness: 40
            }]

          },
          responsive:true,
          maintainAspectRatio:false
      }
  });

  // init variables to keep track of current league, teams, and the network for the filter
  var league;
  var teams;
  var network;

  // grab each dropdown item league bar chart
  var dropdownItems = document.getElementById("barArea").querySelectorAll("li a");
  dropdownItems.forEach(function(item) {
    // add a listener and check which category (league, team, or network)
    item.addEventListener("click", function() {
      if (item.parentNode.parentNode.id === "league") {
        // if league category then change button textContent
        // remove teams from team dropdown
        league = item.textContent

        // reset the button texts to proper text (defaults for Teams and Network)
        document.querySelector('#leagueBtn').textContent = league;
        document.querySelector('#teamBtn').textContent = "Teams";
        document.querySelector('#networkBtn').textContent = 'Network'

        $("#team li").remove();
        // get league key and grab teams that are in that league
        // append the teams to the team dropdown
        var leagueKey = league.toLowerCase();
        leagues[leagueKey].forEach(function(team) {
          $("#team").append("<li><a><input data-value=" + team + " type='checkbox'> " + team + "</a></li>");
        });
        // see how many teams are selected
        getNumSelectedTeams();

      } else if (item.parentNode.parentNode.id === 'network') {
        // grab the network the user clicked on and change the btn textContent
        var network = document.querySelector('#networkBtn');
        if (item.firstChild.id != undefined) {
          network.textContent = item.firstChild.id;
        } else {
          network.textContent = "All";
        }
      }
    });
  });

  // Main function for handling the text for the filter buttons
  function checkInputs(input, teams) {
    var numOfTeams;
    var teamsBtn = document.querySelector('#teamBtn');
    if (input.checked === false) {
      input.checked = true;
      numOfTeams = document.getElementById("team").querySelectorAll('input[type="checkbox"]:checked').length;
    } else {
        // otherwise just uncheck the clicked checkbox
        teams[teams.length - 1].checked = false;
        input.checked = false;
        numOfTeams = document.getElementById("team").querySelectorAll('input[type="checkbox"]:checked').length;
    }
    teamsBtn.textContent = numOfTeams + " Teams"
  }

  document.querySelector("#filter").addEventListener("click", function() {
    // init label array
    // get all checked teams
    var labels = [];
    var network = document.querySelector('#networkBtn').textContent.toLowerCase();
    if (network === 'network') {
      network = 'all';
    }
    var teams = document.getElementById('team').querySelectorAll('input[type="checkbox"]:checked');
    // number of teams will be used to get the data
    numOfTeams = teams.length;

    if (numOfTeams > 6 || numOfTeams === 0) {
      if (numOfTeams === 0) {
        content = 'Please select at least one team';
      } else {
        content = 'Please select no more than six teams'
      }
      $("#leagueTeams-popover").popover('show');
      return;
    }

    for (var i = 0; i < numOfTeams; i++) {
      labels.push(teams[i].parentNode.textContent);
    }

    // update chart data
    barChart.data.datasets[0].data = getRandomData(numOfTeams);
    barChart.data.labels = labels;
    barChart.data.datasets[0].backgroundColor = backgroundColors[network].faded;
    barChart.data.datasets[0].borderColor = backgroundColors[network].normal;
    if (network === 'all') {
      barChart.data.datasets[0].label = "# of posts for all networks";
    } else {
      barChart.data.datasets[0].label = "# of " + network.capitalize() + " posts";
    }
    barChart.update();
  });



  // HELPER FUNCTIONS

  function getRandomData(numOfTeams) {
    var data = [];
    var randomNumber;
    for (var i = 0; i < numOfTeams; i++) {
      randomNumber = Math.floor((Math.random() * 100) + 1);
      data.push(randomNumber);
    }
    return data;
  }

  function getNumSelectedTeams() {
    teams = document.getElementById('team').querySelectorAll('li a');

    teams.forEach(function(team) {
      // for each team add an event listener to check if checked or not
      team.addEventListener('click', function() {
        var input = this.querySelector('input');
        checkInputs(input, teams);

      });
    });
  }
  // call once to get the default league's teams
  getNumSelectedTeams();

  // Override bootstrap js to allow for multiple selections on team
  $('#team').on("click", function(e) {
    e.stopPropagation();
  });

  // helper function to capitalize strings
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  var windowSize = window.screen.width;
  if (windowSize < 800) {
    Chart.defaults.global.defaultFontSize = 10;
    barChart.update(0);
  }


  $(window).on('resize', function() {
    if (window.screen.width > 700) {
      Chart.defaults.global.defaultFontSize = 12;
    } else {
      Chart.defaults.global.defaultFontSize = 10;
    }
    barChart.resize();
  });

}
main();
