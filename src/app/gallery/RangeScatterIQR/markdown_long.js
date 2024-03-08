export const markdown_long = `import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Range } from "auteur";

import coffee from "../coffee.json";

export default function Vis() {

    const style = {"fill":{"fill":"steelblue"},
                   "line":{"stroke-dasharray":"2px 5px 5px 5px"}};

    const ref = useRef("IQR");
    const draft = useRef(new Draft());
    const newRange = useRef(new Range("Flavor", ["Q1", "Q3"], "closed", style));

    const [data, setData] = React.useState(coffee);

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
                                    .attr("opacity", 0.25);

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

        draft.current.layer(ref.current)
                    .selection(scatterpoints)
                    .x("Aroma", xScale)
                    .y("Flavor", yScale)
                    .exclude({"name":["opacity", "regression", "label"]})
                    .augment(newRange.current.getAugs());

    }, [data])

    return (
        <div>
            <svg id="less" ref={ref}>
                <g id="mark" />
                <g id="xAxis" />
                <g id="yAxis" />
                <g id="augmentations" />
            </svg>
        </div>
    )
}
`