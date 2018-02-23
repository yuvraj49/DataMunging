
// set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 70, left: 80},
    width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);


// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
// add the SVG element
var svg3 = d3.select(".sec3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("gdp.json", function(error, data) {

    data.forEach(function(d) {
        d.Country = d.Country;
        d.GDP2013 = +d.GDP2013;
    });
    
  // scale the range of the data
  x.domain(data.map(function(d) { return d.Country; }));
  y.domain([0, d3.max(data, function(d) { return d.GDP2013; })]);

  // add axis
  svg3.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-80)");

 svg3.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-6em")
        .style("text-anchor", "middle")
        .text("GDP(Country)");


  // Add bar chart
  svg3.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      //.transition().duration(3000)
      .attr("x", function(d) { return x(d.Country); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.GDP2013); })
      .attr("height", function(d) { return height - y(d.GDP2013); })
      .style("fill", function(d,i) { return 'rgb(20, 20, ' + ((i * 30) + 100) + ')'});

});



// svg1.selectAll('rect')
//     .data(data)
//     .enter()
//     .append('rect')
//     .attr("height", 0)
//     .attr("y", height)
//     .transition().duration(3000)
//     .delay( function(d,i) { return i * 200; })
//     // attributes can be also combined under one .attr
//     .attr({
//       "x": function(d) { return xScale(d.Country); },
//       "y": function(d) { return yScale(d.Population2013); },
//       "width": xScale.rangeBand(),
//       "height": function(d) { return  height - yScale(d.Population2013); }
//     })
//     .style("fill", function(d,i) { return 'rgb(20, 20, ' + ((i * 30) + 100) + ')'});


//         svg2.selectAll('text')
//             .data(data)
//             .enter()
//             .append('text')



//             .text(function(d){
//                 return d.Population2013;
//             })
//             .attr({
//                 "x": function(d){ return xScale(d.Country) +  xScale.rangeBand()/2; },
//                 "y": function(d){ return yScale(d.Population2013)+ 12; },
//                 "font-family": 'sans-serif',
//                 "font-size": '13px',
//                 "font-weight": 'bold',
//                 "fill": 'white',
//                 "text-anchor": 'middle'
//            });
















