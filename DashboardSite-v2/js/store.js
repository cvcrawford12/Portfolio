function main() {
  var content;

  $('#teams-popover').popover({
    trigger: 'manual',
    title: function() {
      return '<button style="color:#fff; opacity:1;" class="close">&times</button>';
    },
    content: function() {
      return content;
    },
    html: true
   });

  $('#teams-popover').on('shown.bs.popover', function() {
      $('.close').on('click', function() {
        $('#teams-popover').popover('hide');
      });
  });


  var colors = {
    blue:"#38c0c9",
    orange: 'rgba(255, 159, 64, 1.0)',
    pink: 'rgba(255, 99, 132, 1.0)'
  };

  var borderColors = [colors.blue, colors.orange, colors.pink];
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  var testData1 = [21, 32, 38, 40, 38, 42];
  var testData2 = [26, 32, 21, 48, 50, 51];
  var testData3 = [12, 22, 41, 43, 54, 71];


  var data = {
    labels: months,
    datasets: [
      {
        label: 'Arsenal',
        data: testData1,
        backgroundColor:'transparent',
        borderColor: colors.blue,
        lineTension: 0,
        radius:0
      },
      {
        label: 'Manchester United',
        data: testData2,
        backgroundColor: 'transparent',
        borderColor: colors.orange,
        lineTension: 0,
        radius:0
      },
      {
        label: 'Chelsea FC',
        data: testData3,
        backgroundColor: 'transparent',
        borderColor: colors.pink,
        lineTension: 0,
        radius:0
      }
    ]
  }

  var options = {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              },
              gridLines: {
                color: 'lightgrey',
                lineWidth: 0.2
              },
              scaleLabel: {
                display:true,
                labelString: '# Of Purchases'
              }
            }],
          xAxes: [{
            gridLines: {
              display:false
            },
            scaleLabel: {
              display: true,
              labelString: 'Previous Six Months'
            }
          }]
        },
        legend: {
          labels: {
            boxWidth: 0.5
          }
        },

        responsive:true
        // maintainAspectRatio:false
    }


  // init chart
  var ctx = document.getElementById('store').getContext('2d');
  var storeChart = new Chart(ctx, {
    type:'line',
    data:data,
    options:options
  });

  document.querySelector('#filterShop').addEventListener('click', function(e) {
    removeData(storeChart, 'store');
    var labels = [];
    var checkedTeams = document.getElementById('teams').querySelectorAll('input[type="checkbox"]:checked');

    var numOfTeams = checkedTeams.length;

    if (numOfTeams > 3 || numOfTeams === 0) {
      if (numOfTeams === 0) {
        content = 'Please select at least one team';
      } else {
        content = 'Please select no more than three teams'
      }
      $("#teams-popover").popover('show');
      return;
    }

    var lenOfDatasets = storeChart.data.datasets.length;
    for (var i = 0; i < numOfTeams; i++) {
      labels.push(checkedTeams[i].parentNode.textContent);
      var dataToPush = {
          label: labels[i],
          data: getRandomData(months.length),
          backgroundColor: 'transparent',
          borderColor: borderColors[i],
          lineTension: 0,
          radius: 0
        }
        addData(storeChart, dataToPush);

    }
    storeChart.update();
  });

  $('#teams').on("click", function(e) {
    e.stopPropagation();
  });

  // call once to get default data
  getNumSelectedTeams('#teams', 'teamButton');
  // add filtering to shopChart
  getTeams('shopArea', 'leagueButton', 'teamButton', '#teams li', '#teams');

}

main();
