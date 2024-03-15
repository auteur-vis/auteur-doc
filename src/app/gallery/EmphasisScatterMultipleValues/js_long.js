export const js_long = `import * as d3 from "d3";

import { Draft, Emphasis } from "auteur";

import coffee from "../coffee.json";

export const Vis = () => {

    let emphVal1 = "Other";
    let emphVal2 = "Bourbon";

    const draft = new Draft();
    const newEmphasis = new Emphasis("Variety", [emphVal1, emphVal2]);

    let emphOptions = Array.from(new Set(coffee.map(d => d.Variety)));

    let selectOne = document.getElementById("select1");
    for (let opt of emphOptions) {
      let option = document.createElement('option');
      option.value = opt;
      option.innerHTML = opt;
      selectOne.appendChild(option);
    }

    selectOne.addEventListener(
      'change',
      function(e) { updateEmphVal1(e); },
      false
    );

    let selectTwo = document.getElementById("select2");
    for (let opt of emphOptions) {
      let option = document.createElement('option');
      option.value = opt;
      option.innerHTML = opt;
      selectTwo.appendChild(option);
    }

    selectTwo.value = emphVal2;

    selectTwo.addEventListener(
      'change',
      function(e) { updateEmphVal2(e); },
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
                                .attr("cx", d => xScale(d["Aroma"]) + Math.random() * 8 - 4)
                                .attr("cy", d => yScale(d["Flavor"]) + Math.random() * 8 - 4)
                                .attr("r", d => 3)
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
              .text(d => d);

    let colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
                        .domain(d3.extent(data, d => d["Flavor"]));

    const styles = {"fill": {"fill": (d, i) => colorScale(d.Flavor)}};

    newEmphasis.selection(scatterpoints).updateStyles(styles);

    draft.layer("#svg")
        .x("Aroma", xScale)
        .y("Flavor", yScale)
        .exclude({"name":["label", "regression"]})
        .augment(newEmphasis.getAugs());

    function updateEmphVal1(e) {
        emphVal1 = e.target.value;
        let newEmphVals = [emphVal1, emphVal2];
        newEmphasis.updateVal(newEmphVals);
        
        let newAugs = newEmphasis.getAugs();
        draft.augment(newAugs);
    }

    function updateEmphVal2(e) {
        emphVal2 = e.target.value;
        let newEmphVals = [emphVal1, emphVal2];
        newEmphasis.updateVal(newEmphVals);
        
        let newAugs = newEmphasis.getAugs();
        draft.augment(newAugs);
    }
}
`