export const js_long = `import * as d3 from "d3";

import { Draft, Range } from "auteur";

import coffee from "../coffee.json";

export const Vis = () => {

  const style = {"fill":{"fill":"steelblue"},
                "line":{"stroke-dasharray":"2px 5px 5px 5px"}};
  
  const data = coffee.slice(0, 10);

  let maxThreshold = 8.5;
  let minThreshold = 8;
  let newRange = new Range("Flavor", [minThreshold, maxThreshold], "closed", style);

  let layout={"width":900,
             "height":500,
             "marginTop":50,
             "marginRight":50,
             "marginBottom":50,
             "marginLeft":50};

  let selectMin = document.getElementById('selectMin');
  selectMin.addEventListener(
    'change',
    function(e) { updateMin(e); },
    false
  );

  let selectMax = document.getElementById('selectMax');
  selectMax.addEventListener(
    'change',
    function(e) { updateMax(e); },
    false
  );

  let svgElement = d3.select("#svg");

  svgElement.attr("width", layout.width)
          .attr("height", layout.height);

  let xScale = d3.scaleBand()
                  .domain(data.map(d => d["FIELD1"]))
                  .range([layout.marginLeft, layout.width - layout.marginRight]);

  let yScale = d3.scaleLinear()
                  .domain([d3.min(data, d => d.Flavor) - 0.5, d3.max(data, d => d["Flavor"])])
                  .range([layout.height - layout.marginBottom, layout.marginTop]);

  let bars = svgElement.select("#mark")
                      .selectAll(".bar")
                      .data(data)
                      .join("rect")
                      .attr("class", "bar")
                      .attr("x", d => xScale(d["FIELD1"]) + 1)
                      .attr("y", d => yScale(d["Flavor"]))
                      .attr("width", xScale.bandwidth() - 2)
                      .attr("height", d => layout.height - layout.marginBottom - yScale(d["Flavor"]))
                      .attr("fill", "steelblue")
                      .attr("opacity", "0.5");

  svgElement.select("#xAxis")
              .call(d3.axisBottom(xScale))
              .attr("transform", ${"`"}translate(0, ${"$"}{layout.height - layout.marginBottom})${"`"});

  svgElement.select("#yAxis")
              .call(d3.axisLeft(yScale).ticks(5))
              .attr("transform", ${"`"}translate(${"$"}{layout.marginLeft}, 0)${"`"});

  let xAxis = svgElement.select("#xAxis")
              .call(d3.axisBottom(xScale))
              .attr("transform", ${"`"}translate(0, ${"$"}{layout.height - layout.marginBottom})${"`"});

  svgElement.select("#xAxis").selectAll("#xTitle")
              .data(["FIELD1 (ID)"])
              .join("text")
              .attr("id", "xTitle")
              .attr("text-anchor", "middle")
              .attr("transform", ${"`"}translate(${"$"}{layout.width/2}, 30)${"`"})
              .attr("fill", "black")
              .text(d => d);

  let yAxis = svgElement.select("#yAxis")
              .call(d3.axisLeft(yScale).ticks(5))
              .attr("transform", ${"`"}translate(${"$"}{layout.marginLeft}, 0)${"`"});

  svgElement.select("#yAxis").selectAll("#yTitle")
              .data(["Flavor"])
              .join("text")
              .attr("id", "yTitle")
              .attr("text-anchor", "middle")
              .attr("transform", ${"`"}translate(0, 40)${"`"})
              .attr("fill", "black")
              .text(d => d);

  newRange.selection(bars);

  let newAugs = newRange.getAugs();

  const draft = new Draft();

  draft.layer("#svg")
      .x("FIELD1", xScale)
      .y("Flavor", yScale)
      .exclude({"name":["label", "regression", "text"]})
      .augment(newAugs);

  function updateMax(e) {
    maxThreshold = e.target.value;

    newRange.updateVal([minThreshold, maxThreshold]);
    let newAugs = newRange.getAugs();
    draft.augment(newAugs);
  }

  function updateMin(e) {
    minThreshold = e.target.value;

    newRange.updateVal([minThreshold, maxThreshold]);
    let newAugs = newRange.getAugs();
    draft.augment(newAugs);
  }

}
`