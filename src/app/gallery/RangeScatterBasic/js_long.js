export const js_long = `import * as d3 from "d3";

import { Draft, Range } from "auteur";

import coffee from "../coffee.json";

export const Vis = () => {

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
                              .attr("opacity", 0.25)
                              .attr("fill", "steelblue");

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

  const range = new Range("Flavor", [6.5, 7.5]);

  let colorScale = d3.scaleSequential(d3.interpolateTurbo)
      .domain(d3.extent(data, d => d["Aroma"]));

  const styles = {"fill": {
      "fill": d => colorScale(d.Aroma) }};

  range.selection(scatterpoints).updateStyles(styles);

  const draft = new Draft();

  draft.layer("#svg")
      .x("Aroma", xScale)
      .y("Flavor", yScale)
      .include({"name":["rect", "fill", "stroke"]})
      .augment(range.getAugs());

}
`