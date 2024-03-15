export const js_long = `import * as d3 from "d3";

import { Draft, Threshold } from "auteur";

import climate from "../climate.json";

export const Vis = () => {

  const xThreshold = new Date(2006, 3, 10);

  const draft = new Draft();
  const newXThreshold = new Threshold("date", xThreshold, "eq");

  const data = climate;

  let layout={"width":900,
             "height":500,
             "marginTop":50,
             "marginRight":50,
             "marginBottom":50,
             "marginLeft":50};

  let svgElement = d3.select("#svg");

  const dataTime = data.map((d) => {
      let dateSplit = d.dt.split("-");
      let formatDate = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
      d.date = formatDate;
      return d;
  })

  let grouped = d3.group(dataTime, d => d.City);

  svgElement.attr("width", layout.width)
          .attr("height", layout.height);

  let xScale = d3.scaleTime()
              .domain(d3.extent(dataTime, d => d["date"]))
              .range([layout.marginLeft, layout.width - layout.marginRight]);

  let yScale = d3.scaleLinear()
                      .domain(d3.extent(dataTime, d => d["AverageTemperature"]))
                      .range([layout.height - layout.marginBottom, layout.marginTop]);

  let sizeScale = d3.scaleLinear()
                      .domain(d3.extent(dataTime, d => d["AverageTemperature"]))
                      .range([3, 6]);

  let colorScale = d3.scaleOrdinal(d3.schemeTableau10)
                      .domain(['Chicago', 'Los Angeles', 'New York']);

  let lineFunction = d3.line()
                       .x(d => xScale(d["date"]))
                       .y(d => yScale(d["AverageTemperature"]));

  let flattenGroup = [...grouped].map(d => {
      return d[1].map(di => {di.City = d[0]; return di});
      return d[1]
  });

  let lines = svgElement.select("#mark")
                              .selectAll(".climateLine")
                              .data(flattenGroup)
                              .join("path")
                              .attr("class", "climateLine")
                              .attr('fill', 'none')
                              .attr('stroke-width', 1)
                              .attr('stroke', "black")
                              .attr("d", d => {
                                  return lineFunction(d)
                              })

  svgElement.select("#xAxis")
            .call(d3.axisBottom(xScale).ticks(5))
            .attr("transform", ${"`"}translate(0, ${"$"}{layout.height - layout.marginBottom})${"`"});

  svgElement.select("#xAxis").selectAll("#xTitle")
            .data(["date"])
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
            .data(["Average Temperature"])
            .join("text")
            .attr("id", "yTitle")
            .attr("text-anchor", "middle")
            .attr("transform", ${"`"}translate(0, 40)${"`"})
            .attr("fill", "black")
            .text(d => d)

  const styles = {"line": {"stroke": (d, i) => "red", "stroke-width": "2px"}};

  newXThreshold.selection(lines).updateStyles(styles);

  draft.layer("#svg")
        .x("date", xScale)
        .y("AverageTemperature", yScale)
        .include({"name":["line"]})
        .augment(newXThreshold.getAugs());

}
`