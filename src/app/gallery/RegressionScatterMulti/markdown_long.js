export const markdown_long = `import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Regression } from "auteur";

import iris from "../iris.json";

export default function Vis() {

    const ref = useRef("regressionMulti");
    const draft = useRef(new Draft());
    const mainRegression = useRef(new Regression());

    const [data, setData] = React.useState(iris);
    const speciesNames = Array.from((new Set(iris.map(d => d["species"]))));

    let layout={"width":500,
               "height":500,
               "marginTop":50,
               "marginRight":50,
               "marginBottom":50,
               "marginLeft":50};

    useEffect(() => {

        let svgElement = d3.select(ref.current);

        svgElement.attr("width", layout.width)
                .attr("height", layout.height);

        let xScale = d3.scaleLinear()
                            .domain(d3.extent(data, d => d["sepalLength"]))
                            .range([layout.marginLeft, layout.width - layout.marginRight]);

        let yScale = d3.scaleLinear()
                            .domain(d3.extent(data, d => d["petalLength"]))
                            .range([layout.height - layout.marginBottom, layout.marginTop]);

        let colorScale = d3.scaleOrdinal(d3.schemeTableau10)
                            .domain(speciesNames);

        let scatterpoints = svgElement.select("#mark")
                                    .selectAll(".scatterpoint")
                                    .data(data)
                                    .join("circle")
                                    .attr("class", "scatterpoint")
                                    .attr("class", d => d["species"])
                                    .attr("cx", d => xScale(d["sepalLength"]))
                                    .attr("cy", d => yScale(d["petalLength"]))
                                    .attr("r", d => 3)
                                    .attr("fill", d => colorScale(d["species"]));

        svgElement.select("#xAxis")
                  .call(d3.axisBottom(xScale).ticks(5))
                  .attr("transform", ${"`"}translate(0, ${"$"}{layout.height - layout.marginBottom})${"`"});

        svgElement.select("#xAxis").selectAll("#xTitle")
                  .data(["sepalLength"])
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
                  .data(["petalLength"])
                  .join("text")
                  .attr("id", "yTitle")
                  .attr("text-anchor", "middle")
                  .attr("transform", ${"`"}translate(0, 40)${"`"})
                  .attr("fill", "black")
                  .text(d => d);

        function alignY(d, i) {
            return yScale(d["petalLength"])
        }

        function getText(d, i) {
            return ${"`"}produced in ${"$"}{d.Country}${"`"}
        }

        const styles = {"text": {"text-anchor":"end", "x": 490, "y":alignY, "text": getText}};

        mainRegression.current.updateStyles(styles);

        draft.current.chart(ref.current)
                    .selection(scatterpoints)
                    .x("sepalLength", xScale)
                    .y("petalLength", yScale)
                    .exclude({"name":["text"]})
                    .augment(mainRegression.current.getAugs());

        let species = Array.from(new Set(data.map(d => d.species)));

        for (let s of species) {

            let speciesSelection = svgElement.selectAll(${"`"}.${"$"}{s}${"`"});
            const speciesStyle = {"line": {"stroke": colorScale(s), "stroke-width": "2px"}};

            let speciesRegression = new Regression(speciesStyle);
            speciesRegression.selection(speciesSelection);

            draft.current.augment(speciesRegression.getAugs());

        }

    }, [data])

    let controlStyle = {"display":"flex"};
    let paragraphStyle = {"margin":"3px"};

    return (
        <div>
            <svg id="less" ref={ref}>
                <g id="mark" />
                <g id="xAxis" />
                <g id="yAxis" />
            </svg>
        </div>
    )
}
`