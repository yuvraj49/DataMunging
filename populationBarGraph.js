var margin = {top: 20, right: 10, bottom: 100, left:50},
    width = 700 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;




var svg = d3.select(".sec1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);



var xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]);

//define x axis and y axis
//define the axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10);





    d3.json("population.json", function(error,data) {
  		if(error) console.log("Error: data not loaded!");


  		data.forEach(function(d) {
    		d.Country = d.Country;
    		d.Population2013 = +d.Population2013;       // try removing the + and see what the console prints
    		console.log(d.Population2013);   // use console.log to confirm
  		});

 
  		xScale.domain(data.map(function(d) { return d.Country; }) );
  yScale.domain([0, d3.max(data, function(d) { return d.Population2013; } ) ]);



svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(3000)
    .delay( function(d,i) { return i * 200; })
    // attributes can be also combined under one .attr
    .attr({
      "x": function(d) { return xScale(d.Country); },
      "y": function(d) { return yScale(d.Population2013); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.Population2013); }
    })
    .style("fill", function(d,i) { return 'rgb(20, 20, ' + ((i * 30) + 100) + ')'});


        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')



            .text(function(d){
                return d.Population2013;
            })
            .attr({
                "x": function(d){ return xScale(d.Country) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d.Population2013)+ 12; },
                "font-family": 'sans-serif',
                "font-size": '13px',
                "font-weight": 'bold',
                "fill": 'white',
                "text-anchor": 'middle'
            });







    // Draw xAxis and position the label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end")
        .attr("font-size", "10px")
        ..text("Country Names");


    // Draw yAxis and postion the label
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-3em")
        .style("text-anchor", "middle")
        .text("Population in million");
});




var svg2 = d3.select(".sec2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);



var xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]);

//define x axis and y axis
//define the axis
var xAxis = d3.svg2.axis()
    .scale(xScale)
    .orient("bottom")


var yAxis = d3.svg2.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10);





    d3.json("pp.json", function(error,data) {
        if(error) console.log("Error: data not loaded!");


        data.forEach(function(d) {
            d.Country = d.Country;
            d.PPP2013 = +d.PPP2013;      
            console.log(d.PPP2013);   // use console.log to confirm
        });

 
        xScale.domain(data.map(function(d) { return d.Country; }) );
        yScale.domain([0, d3.max(data, function(d) { return d.PPP2013; } ) ]);



svg2.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(3000)
    .delay( function(d,i) { return i * 200; })
    // attributes can be also combined under one .attr
    .attr({
      "x": function(d) { return xScale(d.Country); },
      "y": function(d) { return yScale(d.PPP2013); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.PPP2013); }
    })
    .style("fill", function(d,i) { return 'rgb(20, 20, ' + ((i * 30) + 100) + ')'});


        svg2.selectAll('text')
            .data(data)
            .enter()
            .append('text')



            .text(function(d){
                return d.PPP2013;
            })
            .attr({
                "x": function(d){ return xScale(d.Country) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d.PPP2013)+ 12; },
                "font-family": 'sans-serif',
                "font-size": '13px',
                "font-weight": 'bold',
                "fill": 'white',
                "text-anchor": 'middle'
            });







    // Draw xAxis and position the label
    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end")
        .attr("font-size", "10px");


    // Draw yAxis and postion the label
    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-3em")
        .style("text-anchor", "middle")
        .text("Population in million");
});









