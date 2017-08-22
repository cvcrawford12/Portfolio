function main() {

  var yLabelClicks = "Average Clicks";
  var yLabelPages = 'Average Page Visits';
  var clickLabel = 'Average Clicks By Session Length';
  var pageLabel = "Average Page Visits By Session Length";
  var clickData = [0, 4, 2, 6, 8, 6, 9, 13, 9, 11, 15, 17, 21, 24, 27, 29, 29];
  var pageData = [0, 1, 5, 9, 12, 17, 22, 27, 31, 34, 35, 36, 36, 40, 45, 50, 51];

  var options =
  {
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
                labelString: yLabelClicks
              }
            }],
          xAxes: [{
            gridLines: {
              display:false
            },
            scaleLabel: {
              display: true,
              labelString: 'Minutes'
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

  var ctx = document.getElementById("activityChart").getContext('2d');
  var mixedChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
            label: clickLabel,
            data: clickData,
            backgroundColor: 'transparent',
            borderColor: '#38c0c9',
            radius:0
          }],
      labels: ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8']
    },
    options: options
  });

  var filterItems = document.getElementById("activityArea").querySelectorAll("li a");
  filterItems.forEach(function(item) {
    item.addEventListener('click', function() {
      if(item.textContent.toLowerCase() === 'clicks') {
        updateChart(item, clickData, clickLabel, yLabelClicks);
      } else {
        updateChart(item, pageData, pageLabel, yLabelPages);
      }

    });
  });

  function updateChart(item, data, chartLabel, yLabel) {
    var filterBtn = document.getElementById('activityFilterBtn');
    filterBtn.textContent = item.textContent;
    mixedChart.data.datasets[0].data = data;
    mixedChart.data.datasets[0].label = chartLabel;
    mixedChart.options.scales.yAxes[0].scaleLabel.labelString = yLabel;
    mixedChart.update();
  }

}
main();
