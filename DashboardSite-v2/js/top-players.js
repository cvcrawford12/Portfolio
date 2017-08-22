function main() {
  var players;
  var datasetLabels;
  var backgroundColors;

  players = ["Messie", "Neymar", "Reus", "Aguero", "Falcao", "Muller", "Hulk"];
  datasetLabels = ["Posts", "Comments", "Retweets"];
  backgroundColors = {
    "posts": {
      normal: "rgba(56,192,201,1)",
      faded: "rgba(56,192,201,0.4)"
    },
    "retweets": {
      normal: "rgba(255,153,0,1)",
      faded: "rgba(255,153,0,0.4)"
    },
    "comments": {
      normal: 'rgba(255, 99, 132, 1.0)',
      faded: 'rgba(255, 99, 132, 0.4)'
    }
  }

  var data = {
    labels: players,
    datasets: [{
      label: datasetLabels[0],
      backgroundColor: backgroundColors.posts.faded,
      borderColor: backgroundColors.posts.normal,
      pointBorderColor: '#fff',
      pointBackgroundColor: backgroundColors.posts.normal,
      data: [12, 19, 3, 17, 8, 24, 7]
    }, {
      label: datasetLabels[1],
      backgroundColor: backgroundColors.comments.faded,
      borderColor: backgroundColors.comments.normal,
      pointBorderColor: '#fff',
      pointBackgroundColor: backgroundColors.comments.normal,
      data: [20, 29, 5, 5, 20, 3, 10]
    }, {
      label: datasetLabels[2],
      backgroundColor: backgroundColors.retweets.faded,
      borderColor: backgroundColors.retweets.normal,
      pointBorderColor: '#fff',
      pointBackgroundColor: backgroundColors.retweets.normal,
      data: [9, 29, 32, 21, 28, 19, 4]
    }]
  };

  var radarChartOptions = {
    scale: {
      gridLines: {
        color: "#fff",
        lineWidth: 0.5
      },
      angleLines: {
        display: false
      },
      ticks: {
        display:true,
        beginAtZero: true,
        stepSize: 5,
        backdropColor: 'transparent',
        fontSize: 10
      }
    }
  };

  // INITIALIZE CHART
  var radarCtx = document.getElementById("radarChart").getContext("2d");
  var myRadarChart = new Chart(radarCtx, {
    type: 'radar',
    data: data,
    options: radarChartOptions
  });

}

main();
