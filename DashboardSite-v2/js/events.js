function main() {
  var content;
  var labels = ['Ticket Revenue', 'Tours Revenue', 'Camps Revenue']

  $('#events-popover').popover({
    trigger: 'manual',
    title: function() {
      return '<button style="color:#fff; opacity:1;" class="close">&times</button>';
    },
    content: function() {
      return content;
    },
    html: true
   });

  $('#events-popover').on('shown.bs.popover', function() {
      $('.close').on('click', function() {
        $('#events-popover').popover('hide');
      });
  });

  var colors = {
    blue:"#38c0c9",
    orange: 'rgba(255, 159, 64, 1.0)',
    pink: 'rgba(255, 99, 132, 1.0)'
  };

  var backgroundColors = [colors.blue, colors.orange, colors.pink];

  var options = {
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
          categoryPercentage: 0.6,
          barThickness: 25
        }]

      },
      responsive:true,
      // maintainAspectRatio:false
  }

  var ctx = document.getElementById("eventsChart").getContext('2d');
  var eventsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Arsenal', 'Real Madrid', 'Espanyol'],
        datasets: [{
            label: 'Tickets Revenue',
            data: [10, 25, 32],
            backgroundColor: colors.blue,
            borderColor: colors.blue,
            borderWidth: 1
        }, {
            label: 'Tours Revenue',
            data: [10, 20, 30],
            backgroundColor: colors.orange,
            borderColor: colors.orange,
            borderWidth: 1
        }, {
            label: 'Camps Revenue',
            data: [10, 20, 30],
            backgroundColor: colors.pink,
            borderColor: colors.pink,
            borderWidth: 1
        }]
    },
    // Chart options for custom styling
    options: options
  });

  document.getElementById('filterEvents').addEventListener('click', function(e) {
    removeData(eventsChart, 'eventsChart');
    var checkedTeams = document.getElementById('eventsTeams').querySelectorAll('input[type="checkbox"]:checked');
    var numOfTeams = checkedTeams.length;

    if (numOfTeams > 3 || numOfTeams === 0) {
      if (numOfTeams === 0) {
        content = 'Please select at least one team'
      } else {
        content = 'Please select no more than three teams'
      }
      $("#events-popover").popover('show');
      return;
    }

    for (var i = 0; i < labels.length; i++) {
      var color = backgroundColors[i];
      if (i < numOfTeams) {
        var label = (checkedTeams[i].parentNode.textContent);
        eventsChart.data.labels[i] = label;
      }
      var dataToPush = {
        label: labels[i],
        data: getRandomData(numOfTeams),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1
      }



      addData(eventsChart, dataToPush);
    }
    eventsChart.update();
  });

  $('#eventsTeams').on('click', function(e) {
    e.stopPropagation();
  });


  // call to add listeners to filter buttons and change the teams which will be displayed
  getNumSelectedTeams('#eventsTeams', 'eventsTeamBtn');
  getTeams('eventArea', 'eventsLeagueBtn', 'eventsTeamBtn', '#eventsTeams li', '#eventsTeams');
}

main();
