function main() {
  // variables which will hold filter criteria for searching database
  var league,
      team,
      player,
      brand,
      product;
  // allow the sub-menu to popout when its parent is clicked
  $('.menu-item').on('click', function(e) {
    e.stopPropagation();
  });

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  var colors = {
    normal: 'rgba(56,192,201,1)',
    faded: 'rgba(56,192,201,0.8)'
  };

  // construct data in an array format
  // number of sales for each month for the filtered product
  var data = {
    labels: months,
    datasets: [{
      label: 'Sales',
      data: getRandomData(months.length),
      backgroundColor: colors.faded,
      borderColor: colors.normal,
      borderWidth: 1
    }]
  };

  var options = {
    scales: {
      yAxes: [{
        ticks: {
          minRotation:0,
          maxRotation: 55
        },
        scaleLabel: {
          display: true,
          labelString: 'Previous Six Months'
        },
        gridLines: {
          display:false
        }
      }],
      xAxes: [{
        gridLines: {
          color: 'lightgrey',
          lineWidth: 0.2
        },
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  // init chart
  var ctx = document.getElementById('shopBreakdown').getContext('2d');
  var shopBreakdownChart = new Chart(ctx, {
    type:'horizontalBar',
    data:data,
    options:options
  });

  var shopTypes = document.getElementById('shopTypes').querySelectorAll('li a');
  var shopTypeBtn = document.getElementById('shopTypeBtn');
  shopTypes.forEach(function(type) {
    type.addEventListener('click', function() {
      removeData(shopBreakdownChart, 'shopBreakdown');
      var typeName = type.textContent;
      shopTypeBtn.textContent = typeName;

      var newData = {
        label: typeName,
        data: getRandomData(months.length),
        backgroundColor: colors.faded,
        borderColor: colors.normal
      };

      addData(shopBreakdownChart, newData);
      shopBreakdownChart.update();
    })
  });


  function getFilterCriteria() {
    // id's for parent dropdown
    var leagueId = 'shopLeagues',
        teamsId = 'shopTeams',
        playersId = 'shopPlayers',
        brandsId = 'shopBrands',
        productsId = 'shopProducts';
    var idList = [leagueId, teamsId, playersId, brandsId, productsId];

    // all dropdown items which we will iterate through and add listeners
    var shopBreakdownArea = document.getElementById('shopBreakdownArea');
    var filterItems = shopBreakdownArea.querySelectorAll('li a');

    filterItems.forEach(function(item) {
      item.addEventListener('click', function(e) {
        var parentId = item.parentNode.parentNode.id;
        // check to see what id the clicked parents id mathches
        // set filter criteria here according to which item was clicked on
        if (parentId === leagueId) {
          league = item.textContent;
        } else if (parentId === teamsId) {
          team = item.textContent;
        } else if (parentId === playersId) {
          player = item.textContent;
        } else if (parentId === brandsId) {
          brand = item.textContent;
        } else {
          return;
        }
        // change the text on the dropdown button according to the item clicked
        document.getElementById(parentId + 'Btn').textContent = item.textContent;

      });
    });
  }

  function filterProducts() {
    var productItems = document.getElementById('shopProducts').querySelectorAll('li a');
    // products dropdown is special
    // must toggle the sub-menu's parent menu when item is clicked
    productItems.forEach(function(item) {
      item.addEventListener('click', function() {
        // resize the length of the name so the button doesn't expand too much
        var productName = item.textContent;
        product = productName;
        var maxTextLength = 15;
        if (productName.length > maxTextLength) {
          productName = productName.slice(0, maxTextLength) + '...'
        }

        // close the sub-menu's parent menu
        // change dropdown button to products name
        document.getElementById('shopProductsBtn').textContent = productName;
        $('#shopProducts').dropdown('toggle');
      });
    });
  }

  function filter() {
    var shopFilterBtn = document.getElementById('filterShopBreakdown');
    var shopChartType = document.getElementById('shopTypeBtn').textContent;
    shopFilterBtn.addEventListener('click', function() {
      removeData(shopBreakdownChart, 'shopBreakdown');
      var filteredProduct = product != null ? product : 'No Product Given';
      console.log(filteredProduct);
      // construct new data
      // Call function to query data here
      // something like queriedData = queryData(team, player, brand, product)
      var queriedData = getRandomData(months.length);
      var newData = {
        label: shopChartType,
        data: queriedData,
        backgroundColor: colors.faded,
        borderColor: colors.normal,
      }
      addData(shopBreakdownChart, newData);
      shopBreakdownChart.update();
    });
  }
  getFilterCriteria();
  filterProducts();
  filter();

}

main();
