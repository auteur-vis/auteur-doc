export const js_long = `import * as d3 from "d3";

import { Draft, Threshold } from "auteur";

import coffee from "../coffee.json";

export const Vis = () => {

  let group = d3.group(coffee, d => d["Country"]);
  let groupedData = [...group.entries()].map(d => { return {"Country":d[0], "entries":d[1], "count":d[1].length} }).sort((a, b) => a.count - b.count);
  
  let barThreshold = 150;
  let barOperation = "leq";

  const draft = new Draft();
  const newBarThreshold = new Threshold("count", barThreshold, barOperation);

  let selectQuantity = document.getElementById('selectQuantity');
  selectQuantity.addEventListener(
    'change',
    function(e) { updateY(e); },
    false
  );

  let selectType = document.getElementById('selectType');
  selectType.addEventListener(
    'change',
    function(e) { updateOperation(e); },
    false
  );

  const data = groupedData;

  let layout={"width":900,
             "height":500,
             "marginTop":50,
             "marginRight":50,
             "marginBottom":50,
             "marginLeft":50};

  let svgElement = d3.select("#svg");

  svgElement.attr("width", layout.width)
          .attr("height", layout.height);

  let xScale = d3.scaleBand()
                  .domain(data.map(d => d["Country"]))
                  .range([layout.marginLeft, layout.width - layout.marginRight]);

  let yScale = d3.scaleLog()
                  .domain([5, d3.max(data, d => d["count"])])
                  .range([layout.height - layout.marginBottom, layout.marginTop]);

  let bars = svgElement.select("#mark")
                      .selectAll(".bar")
                      .data(data)
                      .join("rect")
                      .attr("class", "bar")
                      .attr("x", d => xScale(d["Country"]) + 1)
                      .attr("y", d => yScale(d["count"]))
                      .attr("width", xScale.bandwidth() - 2)
                      .attr("height", d => yScale(5) - yScale(d["count"]))
                      .attr("fill", "steelblue");

  svgElement.select("#xAxis")
            .call(d3.axisBottom(xScale).ticks(5))
            .attr("transform", ${"`"}translate(0, ${"$"}{layout.height - layout.marginBottom})${"`"});

  svgElement.select("#xAxis").selectAll("#xTitle")
            .data(["Country"])
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
            .data(["Count"])
            .join("text")
            .attr("id", "yTitle")
            .attr("text-anchor", "middle")
            .attr("transform", ${"`"}translate(0, 40)${"`"})
            .attr("fill", "black")
            .text(d => d)

  draft.layer("#svg")
      .selection(bars)
      .x("Country", xScale)
      .y("count", yScale)
      .exclude({"name":["label", "regression", "fill", "stroke"]})
      .augment(newBarThreshold.getAugs());

  function updateY(e) {
    barThreshold = e.target.value;

    newBarThreshold.updateVal(barThreshold);
    let newAug2 = newBarThreshold.getAugs();

    draft.augment(newAug2);
  }

  function updateOperation(e) {
    barOperation = e.target.value;

    newBarThreshold.updateType(barOperation);
    let newAugs = newBarThreshold.getAugs();

    draft.augment(newAugs);
  }

}
`