export const js_long = `import * as d3 from "d3";

import { Draft, LocalData } from "auteur";

import coffee from "../coffee.json";

export const Vis = () => {

  const draft = new Draft();

  const data = coffee.slice(0, 110);
  const local = coffee.slice(110, 120);
  const newLocal = new LocalData(local);

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
            .text(d => d);

  let sizeScale = d3.scaleLinear()
                      .domain(d3.extent(local, d => d["Flavor"]))
                      .range([3, 10]);

  const styles = {"mark": {"fill":"none", "stroke": "red", "r": (d, i) => sizeScale(d.Flavor)}};

  newLocal.updateStyles(styles);

  draft.layer("#svg")
      .selection(scatterpoints)
      .x("Aroma", xScale)
      .y("Flavor", yScale)
      .exclude()
      .augment(newLocal.getAugs());

}
`