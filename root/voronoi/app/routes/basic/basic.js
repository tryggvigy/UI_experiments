'use strict';
var padding = 10,
width = 960,
height = 500;

var points = [
[200, 200],
[760, 300],
[500, 400]
];

var voronoi = d3.geom.voronoi()
.clipExtent([[padding, padding], [width - padding, height - padding]]);

var color = d3.scale.category10();

var svg = d3.select("#voronoi_test").append("svg")
.attr("width", width)
.attr("height", height);

svg.selectAll("path")
.data(voronoi(points))
.enter().append("path")
.style("fill", function(d, i) { return color(i); })
.attr("d", function(d) { return "M" + d.join("L") + "Z"; });

svg.selectAll("circle")
.data(points)
.enter().append("circle")
.style("fill", function(d, i) { return color(i); })
.attr("transform", function(d) { return "translate(" + d + ")"; })
.attr("r", 4.5);
