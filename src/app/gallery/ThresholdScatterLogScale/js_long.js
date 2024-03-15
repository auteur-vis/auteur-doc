export const js_long = `import * as d3 from "d3";

import { Draft, Threshold } from "auteur";

import coffee from "../coffee.json";

export const Vis = () => {

  let yThreshold = 8;

  const draft = new Draft();
  const newYThreshold = new Threshold("Aroma", yThreshold, "geq");

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
                      .domain(d3.extent(data, d => d["Flavor"]))
                      .range([layout.marginLeft, layout.width - layout.marginRight]);

  let yScale = d3.scaleLog()
                      .domain(d3.extent(data, d => d["Aroma"]))
                      .range([layout.height - layout.marginBottom, layout.marginTop]);

  let sizeScale = d3.scaleLinear()
                      .domain(d3.extent(data, d => d["Aroma"]))
                      .range([3, 6]);

  let scatterpoints = svgElement.select("#mark")
                              .selectAll(".scatterpoint")
                              .data(data)
                              .join("circle")
                              .attr("class", "scatterpoint")
                              .attr("cx", d => xScale(d["Flavor"]))
                              .attr("cy", d => yScale(d["Aroma"]))
                              .attr("r", 3)
                              .attr("opacity", 0.3)

  svgElement.select("#xAxis")
            .call(d3.axisBottom(xScale).ticks(5))
            .attr("transform", ${"`"}translate(0, ${"$"}{layout.height - layout.marginBottom})${"`"});

  svgElement.select("#xAxis").selectAll("#xTitle")
            .data(["Flavor"])
            .join("text")
            .attr("id", "xTitle")
            .attr("text-anchor", "middle")
            .attr("transform", ${"`"}translate(${"$"}{layout.width/2}, 30)${"`"})
            .attr("fill", "black")
            .text(d => d);

  svgElement.select("#yAxis")
            .call(d3.axisLeft(yScale))
            .attr("transform", ${"`"}translate(${"$"}{layout.marginLeft}, 0)${"`"});

  svgElement.select("#yAxis").selectAll("#yTitle")
            .data(["Aroma"])
            .join("text")
            .attr("id", "yTitle")
            .attr("text-anchor", "middle")
            .attr("transform", ${"`"}translate(0, 40)${"`"})
            .attr("fill", "black")
            .text(d => d);

  let colorScale = d3.scaleSequential(d3.interpolateViridis)
                      .domain(d3.extent(data, d => d["Aroma"]));

  const styles = {"fill": {"fill": (d, i) => colorScale(d.Aroma)}};

  newYThreshold.selection(scatterpoints).updateStyles(styles);

  draft.layer("#svg")
      .x("Flavor", xScale)
      .y("Aroma", yScale)
      .exclude({"name":["label"]})
      .augment(newYThreshold.getAugs());

  function updateY(e) {
    yThreshold = e.target.value;
    newYThreshold.updateVal(yThreshold);
    let newAug2 = newYThreshold.getAugs();
    
    draft.augment(newAug2);
  }

}
`