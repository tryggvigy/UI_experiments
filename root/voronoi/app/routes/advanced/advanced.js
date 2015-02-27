'use strict';

$(document).ready(function() {

  var padding = 10,
  width = 960,
  height = 500,
  DEFAULT_FILL = "#000",
  showGrid = true;

  var points = [];

  var arrows = [
  d3.select("#left_arrow_root"),
  d3.select("#right_arrow_root"),
  d3.select("#left_child1"),
  d3.select("#left_child2"),
  d3.select("#right_child1"),
  d3.select("#right_child2")
  ];

  arrows.forEach(function(i) {
    points.push(getCentroid(i));
  });

  var voronoi = d3.geom.voronoi()
  .clipExtent([[padding, padding], [width - padding, height - padding]]);

  var color = d3.scale.category10();

  var svg = d3.select("#root_svg")
  .attr("width", width)
  .attr("height", height);

  var overlay = svg.append("g")
  .attr("width", width)
  .attr("height", height)
  .attr("id", "polygon_container");

  var grid = overlay.selectAll("path")
  .data(voronoi(points))
  .enter().append("path")
  .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
  .attr("stroke", "black")
  .on("mouseenter", highlight)
  .on("mouseleave", unHighlight);

  var circles = overlay.selectAll("circle")
  .data(points)
  .enter().append("circle")
  .style("fill", function(d, i) { return color(i); })
  .attr("transform", function(d) { return "translate(" + d + ")"; })
  .attr("r", 4.5);

  $('.toggle_grid').click(function() {
    showGrid = !showGrid;
    if(showGrid) {
      grid.attr("stroke", "black");
      circles.style("display", "initial");
    } else {
      grid.attr("stroke", "");
      circles.style("display", "none");
    }
  });

  function highlight(d, i) {
    arrows[i].style("fill", color(i));
  }

  function unHighlight(d, i) {
    arrows[i].style("fill", DEFAULT_FILL);
  }

});

function getCentroid(selection) {
  // get the DOM element from a D3 selection
  // you could also use "this" inside .each()
  var element = selection.node(),
  // use the native SVG interface to get the bounding box
  bbox = element.getBBox();
  // return the center of the bounding box
  return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
}

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

d3.selection.prototype.moveToBack = function() {
  return this.each(function() {
    var firstChild = this.parentNode.firstChild;
    if (firstChild) {
      this.parentNode.insertBefore(this, firstChild);
    }
  });
};
