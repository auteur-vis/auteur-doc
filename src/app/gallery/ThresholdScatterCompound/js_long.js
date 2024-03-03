export const js_long = `import * as d3 from "d3";

import { Draft, Threshold } from "auteur";

import coffee from "../coffee.json";

export const Vis = () => {

  let xThreshold = 8.3;
  let yThreshold = 8.55;
  let mergeBy = "symmdiff";

  const draft = new Draft();
  const newXThreshold = new Threshold("Aroma", xThreshold, "leq");
  const newYThreshold = new Threshold("Flavor", yThreshold, "leq");

  let varSelectX = document.getElementById('selectX');
  varSelectX.addEventListener(
    'change',
    function(e) { updateX(e); },
    false
  );

  let varSelectY = document.getElementById('selectY');
  varSelectY.addEventListener(
    'change',
    function(e) { updateY(e); },
    false
  );

  let selectMerge = document.getElementById('mergeBy');
  selectMerge.value = mergeBy;
  selectMerge.addEventListener(
    'change',
    function(e) { updateMerge(e); },
    false
  );

  const data = coffee.slice(0, 20);

  let layout={"width":500,
             "height":500,
             "marginTop":50,
             "marginRight":50,
             "marginBottom":50,
             "marginLeft":50};

  function merge(threshold1, threshold2, mergeValue) {

      if (mergeValue === "union") {
          return threshold1.union(threshold2)
      } else if (mergeValue === "intersect") {
          return threshold1.intersect(threshold2)
      } else if (mergeValue === "difference") {
          return threshold1.difference(threshold2)
      } else if (mergeValue === "symmdiff") {
          return threshold1.symmdiff(threshold2)
      }

      return threshold1.getAugs().concat(threshold2.getAugs())

  }

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
                              .attr("cx", d => xScale(d["Aroma"]) + Math.random() * 8 - 4)
                              .attr("cy", d => yScale(d["Flavor"]) + Math.random() * 8 - 4)
                              .attr("r", d => 3);

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
        .augment(merge(newXThreshold, newYThreshold, mergeBy));

  function updateX(e) {
    xThreshold = e.target.value;

    newXThreshold.updateVal(xThreshold);
    let newAugs = merge(newXThreshold, newYThreshold, mergeBy);

    draft.augment(newAugs);
  }

  function updateY(e) {
    yThreshold = e.target.value;

    newYThreshold.updateVal(yThreshold);
    let newAugs = merge(newXThreshold, newYThreshold, mergeBy);

    draft.augment(newAugs);
  }

  function updateMerge(e) {
    mergeBy = e.target.value;
    let newAugs = merge(newXThreshold, newYThreshold, mergeBy);

    draft.augment(newAugs);
  }

}
`