function main() {

  var helperFunctions = {
    round: function(num, precision) {
      var factor = Math.pow(10, precision);
      var tempNumber = num * factor;
      var tempRoundedNumber = Math.round(tempNumber);
      return tempRoundedNumber / factor;
    }
  }

  var chartData = [42, 21, 34];
  var colors = {
    blue:'#38c0c9',
    orange: 'rgba(255, 159, 64, 1.0)',
    pink: 'rgba(255, 99, 132, 1.0)'
  }
  var labels = ['Mobile', 'Tablet', 'PC'];
  var backgroundColors = [colors.blue, colors.orange, colors.pink];

  // grab sum of data to use for percentage calculation later
  var chartDataSum = chartData.reduce(function(sum, value) {
    return sum + value;
  });

  // percentages for each label
  for (var i = 0; i < labels.length; i++) {
    var dataValue = chartData[i];
    var labelExt = (dataValue / chartDataSum) * 100;
    labelExt = helperFunctions.round(labelExt, 1);
    labels[i] += " " + labelExt + "%";
  }


  var data = {
    labels: labels,
    datasets: [{
      data: chartData,
      backgroundColor: backgroundColors,
      borderColor: backgroundColors
    }]
  }

  var options = {
    tooltips: {
      callbacks: {
        // this chunk of code adds percentage to each tool tip
        label: function(tooltipItem, data) {
          //get the concerned dataset
          var dataset = data.datasets[tooltipItem.datasetIndex];
          //calculate the total of this data set
          var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
          });
          //get the current items value
          var currentValue = dataset.data[tooltipItem.index];
          //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
          var precentage = Math.floor(((currentValue/total) * 100)+0.5);

          return precentage + "%";
        }
      }
    }
  }



  var ctx = document.getElementById('deviceType').getContext('2d');
  var pieChart = new Chart(ctx, {
    type:'pie',
    data:data,
    options:options
  })

}

main();
