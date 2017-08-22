var series = [
    ["BLR",75],["BLZ",43],["RUS",50],["RWA",88],["SRB",21],["TLS",43],
    ["REU",21],["TKM",19],["TJK",60],["ROU",4],["TKL",44],["GNB",38],
    ["GUM",67],["GTM",2],["SGS",95],["GRC",60],["GNQ",57],["GLP",53],
    ["JPN",59],["GUY",24],["GGY",4],["GUF",21],["GEO",42],["GRD",65],
    ["GBR",14],["GAB",47],["SLV",15],["GIN",19],["GMB",63],["GRL",56],
    ["ERI",57],["MNE",93],["MDA",39],["MDG",71],["MAF",16],["MAR",8],
    ["MCO",25],["UZB",81],["MMR",21],["MLI",95],["MAC",33],["MNG",93],
    ["MHL",15],["MKD",52],["MUS",19],["MLT",69],["MWI",37],["MDV",44],
    ["MTQ",13],["MNP",21],["MSR",89],["MRT",20],["IMN",72],["UGA",59],
    ["TZA",62],["MYS",75],["MEX",80],["ISR",77],["FRA",54],["IOT",56],
    ["SHN",91],["FIN",51],["FJI",22],["FLK",4],["FSM",69],["FRO",70],
    ["NIC",66],["NLD",53],["NOR",7],["NAM",63],["VUT",15],["NCL",66],
    ["NER",34],["NFK",33],["NGA",45],["NZL",96],["NPL",21],["NRU",13],
    ["NIU",6],["COK",19],["XKX",32],["CIV",27],["CHE",65],["COL",64],
    ["CHN",16],["CMR",70],["CHL",15],["CCK",85],["CAN",76],["COG",20],
    ["CAF",93],["COD",36],["CZE",77],["CYP",65],["CXR",14],["CRI",31],
    ["CUW",67],["CPV",63],["CUB",40],["SWZ",58],["SYR",96],["SXM",31]];
// Datamaps expect data in format:
// { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
//   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }
var dataset = {};
var mapContainer = $('#map');
// We need to colorize every country based on "numberOfWhatever"
// colors should be uniq for every value.
// For this purpose we create palette(using min/max series-value)
var onlyValues = series.map(function(obj){ return obj[1]; });
var minValue = Math.min.apply(null, onlyValues),
        maxValue = Math.max.apply(null, onlyValues);
// create color palette function
// color can be whatever you wish
var paletteScale = d3.scale.linear()
        .domain([minValue,maxValue])
        .range(['#CFF0F2', '#30A8B0']);
        // .range(['#8FDBE0', '#164C50']);
        // .range(["#f2ff42", "#ff5042"]);


function sizeChange() {
    // d3.select("g").attr("transform", "scale(" + $("#map").width()/1200 + ")");
    // $("svg").height($("#map").width()*0.618);
    d3.select('g').attr('transform', 'scale(' + $('.container').width() / 1200 + ")");
    $("svg").height($(".container").width()*0.618);
    $("#map").height($(".container").width()*0.618);
    // console.log($('svg').height());
}

// fill dataset in appropriate format
series.forEach(function(item){ //
    // item example value ["USA", 70]
    var iso = item[0],
            value = item[1];
    dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
});
// // render map
var map = new Datamap({
    element: document.getElementById('map'),
    projection: 'mercator', // big world map
    // countries don't listed in dataset will be painted with this color
    // '#CFF0F2'
    fills: { defaultFill: '#EFFAFB'},
    responsive: true,
    data: dataset,
    geographyConfig: {
        borderColor: '#000',
        highlightBorderWidth: 2,
        // don't change color on mouse hover
        highlightFillColor: function(geo) {
            return geo['fillColor'] || '#CFF0F2';
        },
        // only change border
        highlightBorderColor: '#B7B7B7',
        // show desired information in tooltip
        popupTemplate: function(geo, data) {
            // don't show tooltip if country don't present in dataset
            if (!data) { return ; }
            // tooltip content
            return ['<div class="hoverinfo">',
                '<strong>', geo.properties.name, '</strong>',
                '<br>Count: <strong>', data.numberOfThings, '</strong>',
                '</div>'].join('');
        }
    }
});

function redraw(){

    // Extract the width and height that was computed by CSS.
    var width = mapContainer.clientWidth;
    var height = mapContainer.clientHeight;

    // Use the extracted size to set the size of an SVG element.
    $('svg')
      .attr("width", width)
      .attr("height", height);

      map.updateChoropleth();
      map.resize();

    // Draw an X to show that the size is correct.
    // var lines = $('svg').selectAll("line").data([
    //   {x1: 0, y1: 0, x2: width, y2: height},
    //   {x1: 0, y1: height, x2: width, y2: 0}
    // ]);
    // lines
    //   .enter().append("line")
    //     .style("stroke-width", 50)
    //     .style("stroke-opacity", 0.4)
    //     .style("stroke", "black")
    //   .merge(lines)
    //     .attr("x1", function (d) { return d.x1; })
    //     .attr("y1", function (d) { return d.y1; })
    //     .attr("x2", function (d) { return d.x2; })
    //     .attr("y2", function (d) { return d.y2; })
    //  ;
  }

  // Redraw based on the new size whenever the browser window is resized.
  window.addEventListener("resize", redraw);


function resize() {
  map.updateChoropleth();
  map.resize;
}
