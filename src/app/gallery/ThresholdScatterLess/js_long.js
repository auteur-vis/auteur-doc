export const js_long = `import * as d3 from "d3";

import { Draft, Threshold } from "auteur";

import coffee from "../coffee.json";

export const Vis = () => {

  let yThreshold = 8;

  const draft = new Draft();
  const newYThreshold = new Threshold("Flavor", yThreshold, "leq");

  let quantity = document.getElementById('selectQuantity');
  quantity.addEventListener(
    'change',
    function(e) { updateY(e); },
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
                              .join("rect")
                              .attr("class", "scatterpoint")
                              .attr("x", d => xScale(d["Aroma"]) - 3)
                              .attr("y", d => yScale(d["Flavor"]) - 3)
                              .attr("width", 6)
                              .attr("height", 6)
                              .attr("opacity", 0.3)

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

  let colorScale = d3.scaleSequential(d3.interpolateViridis)
                      .domain(d3.extent(data, d => d["Aroma"]));

  const styles = {"fill": {"fill": (d, i) => colorScale(d.Aroma)}};

  newYThreshold.updateStyles(styles);

  draft.layer("#svg")
        .selection(scatterpoints)
        .x("Aroma", xScale)
        .y("Flavor", yScale)
        .include({"name":["line", "fill", "stroke", "opacity", "text"]})
        .augment(newYThreshold.getAugs());

  function updateY(e) {
    yThreshold = e.target.value;
    newYThreshold.updateVal(yThreshold);
    let newAug2 = newYThreshold.getAugs();
    
    draft.augment(newAug2);
  }

}
`