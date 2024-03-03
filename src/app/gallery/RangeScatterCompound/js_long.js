export const js_long = `import * as d3 from "d3";

import { Draft, Range } from "auteur";

import coffee from "../coffee.json";

export const Vis = () => {

  let minXThreshold = 7.5;
  let maxXThreshold = 8;

  let minYThreshold = 6.5;
  let maxYThreshold = 7.5;

  const draft = new Draft();
  const newXRange = new Range("Aroma", [minXThreshold, maxXThreshold], "open");
  const newYRange = new Range("Flavor", [minYThreshold, maxYThreshold], "closed");

  let selectMinX = document.getElementById('selectMinX');
  selectMinX.addEventListener(
    'change',
    function(e) { updateXMin(e); },
    false
  );

  let selectMaxX = document.getElementById('selectMaxX');
  selectMaxX.addEventListener(
    'change',
    function(e) { updateXMax(e); },
    false
  );

  let selectMinY = document.getElementById('selectMinY');
  selectMinY.addEventListener(
    'change',
    function(e) { updateYMin(e); },
    false
  );

  let selectMaxY = document.getElementById('selectMaxY');
  selectMaxY.addEventListener(
    'change',
    function(e) { updateYMax(e); },
    false
  );

  const data = coffee;

  let layout={"width":500,
             "height":500,
             "marginTop":50,
             "marginRight":50,
             "marginBottom":50,
             "marginLeft":50};

  let svgElement = d3.select("#svg");

  svgElement.attr("width", layout.width)
          .attr("height", layout.height);

  let xScale = d3.scaleLinear()
                      .domain(d3.extent(data, d => d["Aroma"]))
                      .range([layout.marginLeft, layout.width - layout.marginRight]);

  let yScale = d3.scaleLinear()
                      .domain(d3.extent(data, d => d["Flavor"]))
                      .range([layout.height - layout.marginBottom, layout.marginTop]);

  let sizeScale = d3.scaleLinear()
                      .domain(d3.extent(data, d => d["Flavor"]))
                      .range([3, 6]);

  let scatterpoints = svgElement.select("#mark")
                              .selectAll(".scatterpoint")
                              .data(data)
                              .join("circle")
                              .attr("class", "scatterpoint")
                              .attr("cx", d => xScale(d["Aroma"]))
                              .attr("cy", d => yScale(d["Flavor"]))
                              .attr("r", d => 3)
                              .attr("opacity", 0.25);

  svgElement.select("#xAxis")
            .call(d3.axisBottom(xScale).ticks(5))
            .attr("transform", ${"`"}translate(0, ${"$"}{layout.height - layout.marginBottom})${"`"});

  svgElement.select("#xAxis").selectAll("#xTitle")
            .data(["Aroma"])
            .join("text")
            .attr("id", "xTitle")
            .attr("text-anchor", "middle")
            .attr("transform", ${"`"}translate(${"$"}{layout.width/2}, 30)${"`"})
            .attr("fill", "black")
            .text(d => d);

  svgElement.select("#yAxis")
            .call(d3.axisLeft(yScale).ticks(5))
            .attr("transform", ${"`"}translate(${"$"}{layout.marginLeft}, 0)${"`"});

  svgElement.select("#yAxis").selectAll("#yTitle")
            .data(["Flavor"])
            .join("text")
            .attr("id", "yTitle")
            .attr("text-anchor", "middle")
            .attr("transform", ${"`"}translate(0, 40)${"`"})
            .attr("fill", "black")
            .text(d => d)

  draft.chart("#svg")
      .selection(scatterpoints)
      .x("Aroma", xScale)
      .y("Flavor", yScale)
      .exclude({"name":["regression", "label", "text"]})
      .augment(newXRange.union(newYRange));

  function updateXMax(e) {
    maxXThreshold = e.target.value;

    newXRange.updateVal([minXThreshold, maxXThreshold]);
    let newAugs = newXRange.union(newYRange);

    draft.augment(newAugs);
  }

  function updateXMin(e) {
    minXThreshold = e.target.value;

    newXRange.updateVal([minXThreshold, maxXThreshold]);
    let newAugs = newXRange.union(newYRange);

    draft.augment(newAugs);
  }

  function updateYMax(e) {
    maxYThreshold = e.target.value;

    newYRange.updateVal([minYThreshold, maxYThreshold]);
    let newAugs = newXRange.union(newYRange);

    draft.augment(newAugs);
  }

  function updateYMin(e) {
    minYThreshold = e.target.value;

    newYRange.updateVal([minYThreshold, maxYThreshold]);
    let newAugs = newXRange.union(newYRange);

    draft.augment(newAugs);
  }

}
`