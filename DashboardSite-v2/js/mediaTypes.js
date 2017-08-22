function main() {

  // helper functions
  var helperFunctions = {
    round: function(num, precision) {
      var factor = Math.pow(10, precision);
      var tempNumber = num * factor;
      var tempRoundedNumber = Math.round(tempNumber);
      return tempRoundedNumber / factor;
    }
  }

  // init some data
  var donutData = [20, 18, 12];
  var labels = ['Videos', 'Images', 'Posts'];

  // color object for the donut
  var colors = {
    blue:"#38c0c9",
    orange: 'rgba(255, 159, 64, 1.0)',
    pink: 'rgba(255, 99, 132, 1.0)'
  }

  var backgroundColors = [colors.blue, colors.orange, colors.pink];

  // grab sum of data to use for percentage calculation later
  var donutDataSum = donutData.reduce(function(sum, value) {
    return sum + value;
  });

  // percentages for each label
  for (var i = 0; i < labels.length; i++) {
    var dataValue = donutData[i];
    var labelExt = (dataValue / donutDataSum) * 100;
    labelExt = helperFunctions.round(labelExt, 1);
    labels[i] += " " + labelExt + "%";
  }

  // donuts inner text (percentage of highest data point)
  var maxDataValue = Math.max(...donutData);
  var dataIndex = donutData.indexOf(maxDataValue);
  var innerText = (maxDataValue / donutDataSum) * 100;
  innerText = helperFunctions.round(innerText, 1);

  // data object for the Chart
  var data = {
    labels: labels,
    datasets: [{
      data: donutData,
      backgroundColor: backgroundColors,
      borderColor: backgroundColors
    }]
  };


  var canvas = document.getElementById('mediaTypeChart');
  var ctx = canvas.getContext('2d');
  var donut = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: 'top'
      },
      // layout: {
      //   padding: {
      //     top:35,
      //     bottom:35
      //   }
      //
      // },
      animation: {
        // onAnimationComplete: addPercentage(canvas, ctx)
      },
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
      },
      elements: {
          center: {
          text: innerText + "%",
          color: backgroundColors[dataIndex], //Default black
          fontStyle: 'Oswald', //Default Arial
          sidePadding: 25 //Default 20 (as a percentage)
        }
      }
    }
  });

  Chart.pluginService.register({
    beforeDraw: function (chart) {
      if (chart.config.options.elements.center) {
        //Get ctx from string
        var ctx = chart.chart.ctx;

        //Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Oswald';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#fff';
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
        //Start with a base font of 30px
        ctx.font = "40px " + fontStyle;

        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight);

        //Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse+"px " + fontStyle;
        ctx.fillStyle = color;

        //Draw text in center
        ctx.fillText(txt, centerX, centerY);
      }
    }
  });


  function addPercentage(canvas, ctx) {
    var cx=canvas.width/2;
    var cy=canvas.height/2;
    // horizontally align text around the specified point (cx)
    ctx.textAlign='center';

    // vertically align text around the specified point (cy)
    ctx.textBaseline='middle';

    // draw the text
    ctx.font='14px Oswald';
    ctx.fillStyle='#fff';
    ctx.fillText("Text Here",cx,cy);
  }
}

main()
