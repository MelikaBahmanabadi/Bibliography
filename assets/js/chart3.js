                  // set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    }))
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("chart3.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([1975, 2020])
    .range([ 0, width]);
 svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([500, 11000])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
  var tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "#b3e8ef")
    .style("border", "#e0fbff solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("position", "absolute")



  // A function that change this tooltip when the user hover a point.
  // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
  }

  var mousemove = function(d) {
    tooltip
      .html("<span id ='booktitle'>" + d.Title + "</span>" + " : " + "<span id='bookdownload'>" + d.Download + "</span>")
      .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      .style("top", (d3.mouse(this)[1]) + "px")
  }

  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleave = function(d) {
    tooltip
      .transition()
      .duration(20)
      .style("opacity", 0)
  }

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data.filter(function(d,i){return i<10000})) // the .filter part is just to keep a few dots on the chart, not all of them
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Year); } )
      .attr("cy", function (d) { return y(d.Download); } )
      .attr("r", 3)
      .style("fill", "#6af500")
      .style("opacity", 0.3)
      .style("stroke", "white")
    .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )
})